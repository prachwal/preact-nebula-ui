#!/usr/bin/env node

/**
 * 🚀 Smart NPM Publishing Tool for Nebula UI
 * Automatically checks NPM version and suggests version bumps
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const readline = require('readline');

// Colors for console output
const colors = {
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    purple: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    reset: '\x1b[0m'
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Utility functions
function log(message, color = 'white') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function execCommand(command, options = {}) {
    try {
        return execSync(command, { encoding: 'utf8', ...options }).trim();
    } catch (error) {
        if (!options.silent) {
            throw error;
        }
        return null;
    }
}

function question(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

// Version comparison (simple semver-like comparison)
function compareVersions(v1, v2) {
    const parts1 = v1.split('.').map(Number);
    const parts2 = v2.split('.').map(Number);

    for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
        const part1 = parts1[i] || 0;
        const part2 = parts2[i] || 0;

        if (part1 > part2) return 1;
        if (part1 < part2) return -1;
    }

    return 0;
}

function bumpVersion(version, type) {
    const parts = version.split('.').map(Number);
    const [major, minor, patch] = parts;

    switch (type) {
        case 'major': return `${major + 1}.0.0`;
        case 'minor': return `${major}.${minor + 1}.0`;
        case 'patch': return `${major}.${minor}.${patch + 1}`;
        default: return version;
    }
}

async function main() {
    log('🌟 Nebula UI - Smart NPM Publishing Tool', 'blue');
    log('='.repeat(50), 'blue');

    // Check if package.json exists
    if (!fs.existsSync('package.json')) {
        log('❌ Error: package.json not found. Please run this script from the project root.', 'red');
        process.exit(1);
    }

    // Read package.json
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const packageName = packageJson.name;
    const currentVersion = packageJson.version;

    log(`📦 Package: ${packageName}`, 'blue');
    log(`📋 Current local version: ${currentVersion}`, 'blue');

    // Check if user is logged in to npm
    try {
        execCommand('npm whoami');
    } catch (error) {
        log('❌ Error: You are not logged in to npm. Please run \'npm login\' first.', 'red');
        process.exit(1);
    }

    // Check NPM registry
    log('🔍 Checking NPM registry...', 'cyan');

    let npmVersion;
    try {
        npmVersion = execCommand(`npm view ${packageName} version`, { silent: true });
    } catch (error) {
        npmVersion = null;
    }

    if (!npmVersion) {
        log('📦 Package not yet published on NPM', 'yellow');
        log(`✅ Ready to publish initial version: ${currentVersion}`, 'green');
    } else {
        log(`🌐 NPM published version: ${npmVersion}`, 'green');

        const comparison = compareVersions(currentVersion, npmVersion);

        if (comparison > 0) {
            log('✅ Local version is newer than NPM version', 'green');
        } else if (comparison === 0) {
            log('⚠️  Local version equals NPM version - version bump needed', 'yellow');

            const patchVersion = bumpVersion(currentVersion, 'patch');
            const minorVersion = bumpVersion(currentVersion, 'minor');
            const majorVersion = bumpVersion(currentVersion, 'major');

            log('🔢 Suggested version bumps:', 'purple');
            console.log(`  1) patch: ${currentVersion} → ${patchVersion} (bug fixes)`);
            console.log(`  2) minor: ${currentVersion} → ${minorVersion} (new features)`);
            console.log(`  3) major: ${currentVersion} → ${majorVersion} (breaking changes)`);
            console.log(`  4) custom: Enter your own version`);
            console.log(`  5) cancel: Exit without publishing`);

            const choice = await question('Select version bump (1-5): ');

            let newVersion;
            let bumpType;

            switch (choice) {
                case '1':
                    newVersion = patchVersion;
                    bumpType = 'patch';
                    break;
                case '2':
                    newVersion = minorVersion;
                    bumpType = 'minor';
                    break;
                case '3':
                    newVersion = majorVersion;
                    bumpType = 'major';
                    break;
                case '4':
                    newVersion = await question('Enter custom version: ');
                    bumpType = 'custom';
                    break;
                case '5':
                    log('⏹️  Publishing cancelled', 'yellow');
                    rl.close();
                    return;
                default:
                    log('❌ Invalid choice. Exiting.', 'red');
                    rl.close();
                    return;
            }

            // Update package.json version
            log(`📝 Updating package.json version to ${newVersion}`, 'blue');

            if (bumpType === 'custom') {
                execCommand(`npm version ${newVersion} --no-git-tag-version`);
            } else {
                execCommand(`npm version ${bumpType} --no-git-tag-version`);
            }

            log(`✅ Version updated to ${newVersion}`, 'green');

        } else {
            log(`❌ NPM version (${npmVersion}) is newer than local version (${currentVersion})`, 'red');
            log('💡 Please pull the latest changes or bump your local version', 'yellow');
            rl.close();
            return;
        }
    }

    // Check for uncommitted changes
    try {
        const gitStatus = execCommand('git status --porcelain');
        if (gitStatus) {
            log('⚠️  Warning: You have uncommitted changes', 'yellow');
            console.log(gitStatus);

            const continueChoice = await question('Continue with uncommitted changes? (y/n): ');
            if (continueChoice.toLowerCase() !== 'y') {
                rl.close();
                return;
            }
        }
    } catch (error) {
        // Git not available or not a git repository
    }

    // Pre-publish checks
    log('🔍 Running pre-publish checks...', 'blue');

    try {
        // Clean previous builds
        console.log('  🧹 Cleaning previous builds...');
        execCommand('rm -rf dist/ coverage/', { silent: true });

        // Install dependencies
        console.log('  📦 Installing dependencies...');
        execCommand('npm ci');

        // Run linting
        console.log('  🔍 Running linter...');
        execCommand('npm run lint');

        // Run type checking
        console.log('  📝 Running type checks...');
        execCommand('npm run type-check');

        // Run tests
        console.log('  🧪 Running tests...');
        execCommand('npm run test');

        // Build the library
        console.log('  🏗️  Building library...');
        execCommand('npm run build:lib');

        // Check if dist directory was created
        if (!fs.existsSync('dist')) {
            log('❌ Error: Build failed - dist directory not found', 'red');
            rl.close();
            return;
        }

        log('✅ Build successful!', 'green');

        // Show package contents preview
        log('📋 Package contents preview:', 'blue');
        try {
            const dryRunOutput = execCommand('npm publish --dry-run');
            console.log(dryRunOutput.split('\n').slice(0, 20).join('\n'));
        } catch (error) {
            log('Could not generate preview', 'yellow');
        }

    } catch (error) {
        log(`❌ Pre-publish checks failed: ${error.message}`, 'red');
        rl.close();
        return;
    }

    // Final confirmation
    console.log('');
    const finalVersion = JSON.parse(fs.readFileSync('package.json', 'utf8')).version;
    log(`🚀 Ready to publish ${packageName}@${finalVersion}`, 'yellow');
    log('⚠️  This will make the package publicly available on NPM', 'yellow');

    const publishChoice = await question('Proceed with publishing? (y/n): ');

    if (publishChoice.toLowerCase() === 'y') {
        try {
            // Publish to NPM
            log('🚀 Publishing to NPM...', 'blue');
            execCommand('npm publish --access public');

            // Create git commit and tag
            try {
                log('📝 Creating git commit and tag...', 'blue');
                execCommand('git add package.json package-lock.json || git add package.json', { silent: true });
                execCommand(`git commit -m "chore: bump version to ${finalVersion}"`);
                execCommand(`git tag "v${finalVersion}"`);

                const pushChoice = await question('📤 Push changes to git repository? (y/n): ');
                if (pushChoice.toLowerCase() === 'y') {
                    const currentBranch = execCommand('git branch --show-current');
                    execCommand(`git push origin ${currentBranch}`);
                    execCommand(`git push origin "v${finalVersion}"`);
                    log('✅ Changes pushed to git', 'green');
                }
            } catch (error) {
                log('⚠️  Could not create git commit/tag (not a git repository?)', 'yellow');
            }

            // Success message
            console.log('');
            log(`🎉 SUCCESS! ${packageName} v${finalVersion} published to NPM`, 'green');
            log(`📦 Package URL: https://www.npmjs.com/package/${packageName}`, 'green');
            log(`🔧 Install with: npm install ${packageName}@${finalVersion}`, 'green');
            console.log('');
            log('📊 Next steps:', 'blue');
            console.log('  • Update documentation if needed');
            console.log('  • Create GitHub release');
            console.log('  • Announce the update');
            console.log('  • Update examples and demos');
            console.log('');
            log('✨ Smart deployment complete!', 'green');

        } catch (error) {
            log(`❌ Publishing failed: ${error.message}`, 'red');
        }
    } else {
        log('⏹️  Publishing cancelled', 'yellow');
    }

    rl.close();
}

// Handle process termination
process.on('SIGINT', () => {
    log('\n⏹️  Process interrupted', 'yellow');
    rl.close();
    process.exit(0);
});

// Run the main function
main().catch(error => {
    log(`❌ Unexpected error: ${error.message}`, 'red');
    rl.close();
    process.exit(1);
});
