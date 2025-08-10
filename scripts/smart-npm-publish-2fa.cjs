#!/usr/bin/env node

/**
 * 🚀 Smart NPM Publishing Tool with 2FA Support
 * Automatically checks NPM version and handles 2FA authentication
 */

const { execSync } = require('child_process');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Simple console colors
const log = {
    info: (msg) => console.log(`\x1b[34mℹ ${msg}\x1b[0m`),
    success: (msg) => console.log(`\x1b[32m✅ ${msg}\x1b[0m`),
    warn: (msg) => console.log(`\x1b[33m⚠️  ${msg}\x1b[0m`),
    error: (msg) => console.log(`\x1b[31m❌ ${msg}\x1b[0m`),
    title: (msg) => console.log(`\x1b[36m🚀 ${msg}\x1b[0m`),
    highlight: (msg) => console.log(`\x1b[35m🔐 ${msg}\x1b[0m`)
};

function exec(command, silent = false) {
    try {
        return execSync(command, { encoding: 'utf8' }).trim();
    } catch (error) {
        if (!silent) throw error;
        return null;
    }
}

function question(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

function parseVersion(version) {
    const parts = version.split('.').map(Number);
    return { major: parts[0] || 0, minor: parts[1] || 0, patch: parts[2] || 0 };
}

function bumpVersion(version, type) {
    const v = parseVersion(version);
    switch (type) {
        case 'major': return `${v.major + 1}.0.0`;
        case 'minor': return `${v.major}.${v.minor + 1}.0`;
        case 'patch': return `${v.major}.${v.minor}.${v.patch + 1}`;
        default: return version;
    }
}

async function publishWithOTP(packageName, version, maxRetries = 3) {
    let attempt = 0;

    while (attempt < maxRetries) {
        try {
            if (attempt === 0) {
                log.info('Publishing to NPM...');
                // First attempt without OTP
                exec('npm publish --access public');
                return true;
            } else {
                // Subsequent attempts with OTP
                log.highlight('NPM requires 2FA authentication');
                console.log('Check your authenticator app or SMS for the 6-digit code');

                const otp = await question('Enter your 2FA code (6 digits): ');

                if (!/^\d{6}$/.test(otp.trim())) {
                    log.warn('Invalid OTP format. Please enter 6 digits.');
                    attempt++;
                    continue;
                }

                log.info(`Publishing with 2FA code... (attempt ${attempt}/${maxRetries})`);
                exec(`npm publish --access public --otp=${otp.trim()}`);
                return true;
            }

        } catch (error) {
            const errorMessage = error.message.toLowerCase();

            if (errorMessage.includes('eotp') || errorMessage.includes('one-time password')) {
                log.warn('2FA code required or invalid');
                attempt++;

                if (attempt >= maxRetries) {
                    log.error('Maximum 2FA attempts reached');
                    throw new Error('2FA authentication failed after multiple attempts');
                }

                if (attempt > 1) {
                    log.warn('Previous code was invalid or expired. Please try again.');
                }
                continue;

            } else if (errorMessage.includes('forbidden') && errorMessage.includes('code 403')) {
                throw new Error('Publishing forbidden - check your NPM permissions or package name');

            } else if (errorMessage.includes('you cannot publish over the previously published versions')) {
                throw new Error(`Version ${version} already exists on NPM`);

            } else {
                throw error;
            }
        }
    }

    return false;
}

async function main() {
    log.title('Smart NPM Publishing Tool with 2FA Support');
    console.log('='.repeat(50));

    // Validate environment
    if (!fs.existsSync('package.json')) {
        log.error('package.json not found');
        process.exit(1);
    }

    if (!exec('npm whoami', true)) {
        log.error('Not logged in to NPM. Run: npm login');
        process.exit(1);
    }

    // Get package info
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const packageName = pkg.name;
    const currentVersion = pkg.version;

    log.info(`Package: ${packageName}`);
    log.info(`Local version: ${currentVersion}`);

    // Check NPM version
    const npmVersion = exec(`npm view ${packageName} version`, true);

    if (!npmVersion) {
        log.info('Package not published yet');
        await publishPackage(packageName, currentVersion, false);
        return;
    }

    log.info(`NPM version: ${npmVersion}`);

    // Compare versions
    const local = parseVersion(currentVersion);
    const remote = parseVersion(npmVersion);

    const isNewer = local.major > remote.major ||
        (local.major === remote.major && local.minor > remote.minor) ||
        (local.major === remote.major && local.minor === remote.minor && local.patch > remote.patch);

    const isSame = local.major === remote.major &&
        local.minor === remote.minor &&
        local.patch === remote.patch;

    if (isNewer) {
        log.success('Local version is newer');
        await publishPackage(packageName, currentVersion, false);
    } else if (isSame) {
        log.warn('Versions are equal - bump needed');
        await handleVersionBump(packageName, currentVersion);
    } else {
        log.error(`NPM version (${npmVersion}) is newer than local (${currentVersion})`);
        log.warn('Please update your local version or pull latest changes');
        process.exit(1);
    }
}

async function handleVersionBump(packageName, currentVersion) {
    const patchVersion = bumpVersion(currentVersion, 'patch');
    const minorVersion = bumpVersion(currentVersion, 'minor');
    const majorVersion = bumpVersion(currentVersion, 'major');

    console.log('\nVersion bump options:');
    console.log(`1. patch: ${currentVersion} → ${patchVersion} (bug fixes)`);
    console.log(`2. minor: ${currentVersion} → ${minorVersion} (new features)`);
    console.log(`3. major: ${currentVersion} → ${majorVersion} (breaking changes)`);
    console.log(`4. custom: Enter your own version`);
    console.log(`5. cancel: Exit without publishing`);

    const choice = await question('\nSelect option (1-5): ');

    let newVersion;
    let bumpType;

    switch (choice.trim()) {
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
            newVersion = await question('Enter version: ');
            bumpType = 'custom';
            break;
        case '5':
            log.warn('Cancelled');
            rl.close();
            return;
        default:
            log.error('Invalid choice');
            rl.close();
            return;
    }

    // Update version
    log.info(`Updating version to ${newVersion}`);

    if (bumpType === 'custom') {
        exec(`npm version ${newVersion} --no-git-tag-version`);
    } else {
        exec(`npm version ${bumpType} --no-git-tag-version`);
    }

    log.success(`Version updated to ${newVersion}`);

    await publishPackage(packageName, newVersion, true);
}

async function publishPackage(packageName, version, wasVersionBumped) {
    // Check git status
    const gitStatus = exec('git status --porcelain', true);
    if (gitStatus) {
        log.warn('Uncommitted changes detected');
        console.log(gitStatus);
        const proceed = await question('Continue anyway? (y/n): ');
        if (proceed.toLowerCase() !== 'y') {
            rl.close();
            return;
        }
    }

    // Pre-publish steps
    log.info('Running pre-publish checks...');

    try {
        console.log('  Cleaning build...');
        exec('rm -rf dist/ coverage/');

        console.log('  Installing dependencies...');
        exec('npm ci');

        console.log('  Running tests...');
        exec('npm run test');

        console.log('  Building...');
        exec('npm run build:lib');

        if (!fs.existsSync('dist')) {
            throw new Error('Build failed - no dist directory');
        }

        log.success('Pre-publish checks passed');

    } catch (error) {
        log.error(`Pre-publish failed: ${error.message}`);
        rl.close();
        return;
    }

    // Show what will be published
    console.log('\nPackage preview:');
    try {
        const preview = exec('npm publish --dry-run');
        const lines = preview.split('\n');
        const filesList = lines.slice(0, Math.min(15, lines.length));
        console.log(filesList.join('\n'));
    } catch (error) {
        log.warn('Could not show preview');
    }

    // Final confirmation
    console.log(`\n🚀 Ready to publish ${packageName}@${version}`);
    log.highlight('Note: This package may require 2FA authentication');
    const confirm = await question('Publish to NPM? (y/n): ');

    if (confirm.toLowerCase() !== 'y') {
        log.warn('Publishing cancelled');
        rl.close();
        return;
    }

    // Publish with 2FA support
    try {
        const published = await publishWithOTP(packageName, version);

        if (published) {
            log.success('Published successfully!');

            // Git operations
            if (wasVersionBumped) {
                try {
                    log.info('Creating git commit and tag...');
                    exec('git add package.json');
                    exec(`git commit -m "chore: bump version to ${version}"`);
                    exec(`git tag "v${version}"`);

                    const pushGit = await question('Push to git? (y/n): ');
                    if (pushGit.toLowerCase() === 'y') {
                        const branch = exec('git branch --show-current');
                        exec(`git push origin ${branch}`);
                        exec(`git push origin "v${version}"`);
                        log.success('Changes pushed to git');
                    }
                } catch (error) {
                    log.warn(`Git operations failed: ${error.message}`);
                }
            }

            // Success summary
            console.log('\n🎉 SUCCESS!');
            console.log(`📦 Package: https://www.npmjs.com/package/${packageName}`);
            console.log(`🔧 Install: npm install ${packageName}@${version}`);
            console.log('\nNext steps:');
            console.log('• Update documentation');
            console.log('• Create GitHub release');
            console.log('• Announce the update\n');
        }

    } catch (error) {
        log.error(`Publishing failed: ${error.message}`);

        // Provide helpful hints for common errors
        if (error.message.includes('2FA authentication failed')) {
            console.log('\n💡 2FA Troubleshooting:');
            console.log('• Make sure your authenticator app is synced');
            console.log('• Wait for a fresh code (codes expire every 30 seconds)');
            console.log('• Try running the command again');
        } else if (error.message.includes('already exists')) {
            console.log('\n💡 Version already exists:');
            console.log('• Run the script again to bump the version');
            console.log('• Or manually update package.json version');
        }
    }

    rl.close();
}

// Handle interruptions
process.on('SIGINT', () => {
    log.warn('\nProcess interrupted');
    rl.close();
    process.exit(0);
});

// Run
main().catch(error => {
    log.error(`Unexpected error: ${error.message}`);
    rl.close();
    process.exit(1);
});
