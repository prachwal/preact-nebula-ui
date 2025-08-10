#!/usr/bin/env node

/**
 * 🚀 Fast NPM Publisher with 2FA Support
 * Improved version with better progress reporting and timeout handling
 */

const { execSync } = require('child_process');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Console utilities
const colors = {
    red: '\x1b[31m', green: '\x1b[32m', yellow: '\x1b[33m',
    blue: '\x1b[34m', purple: '\x1b[35m', cyan: '\x1b[36m', reset: '\x1b[0m'
};

const print = {
    info: (msg) => console.log(`${colors.blue}ℹ ${msg}${colors.reset}`),
    ok: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
    warn: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
    error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
    title: (msg) => console.log(`${colors.cyan}🚀 ${msg}${colors.reset}`),
    auth: (msg) => console.log(`${colors.purple}🔐 ${msg}${colors.reset}`),
    step: (msg) => console.log(`${colors.blue}  ${msg}${colors.reset}`)
};

function run(command, silent = false, timeout = 300000) { // 5 min timeout
    try {
        const result = execSync(command, {
            encoding: 'utf8',
            timeout: timeout,
            stdio: silent ? 'pipe' : 'inherit'
        });
        return result ? result.trim() : '';
    } catch (error) {
        if (silent) return '';
        if (error.status === null) {
            throw new Error(`Command timed out: ${command}`);
        }
        throw error;
    }
}

function ask(question) {
    return new Promise(resolve => rl.question(question, resolve));
}

function compareVersions(local, remote) {
    const parseVer = (v) => v.split('.').map(Number);
    const [lMaj, lMin, lPat] = parseVer(local);
    const [rMaj, rMin, rPat] = parseVer(remote);

    if (lMaj > rMaj) return 1;
    if (lMaj < rMaj) return -1;
    if (lMin > rMin) return 1;
    if (lMin < rMin) return -1;
    if (lPat > rPat) return 1;
    if (lPat < rPat) return -1;
    return 0;
}

function bumpVer(version, type) {
    const [maj, min, pat] = version.split('.').map(Number);
    switch (type) {
        case 'major': return `${maj + 1}.0.0`;
        case 'minor': return `${maj}.${min + 1}.0`;
        case 'patch': return `${maj}.${min}.${pat + 1}`;
        default: return version;
    }
}

async function publishToNPM(retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            if (i === 0) {
                print.step('📤 Publishing to NPM...');
                // First try without OTP - if 2FA is required, NPM will tell us
                run('npm publish --access public', false, 120000); // 2 min timeout for publish
                return true;
            } else {
                print.auth('NPM requires 2FA authentication');
                console.log('💡 Check your authenticator app for the 6-digit code');
                console.log('💡 If browser opened, you can close it and enter code here instead');
                const otp = await ask('Enter your 2FA code: ');

                if (!/^\d{6}$/.test(otp.trim())) {
                    print.warn('Invalid format. Need exactly 6 digits.');
                    continue;
                }

                print.step(`📤 Publishing with 2FA... (attempt ${i}/${retries - 1})`);
                // Use --otp flag to avoid browser authentication
                run(`npm publish --access public --otp=${otp.trim()}`, false, 120000);
                return true;
            }
        } catch (error) {
            const msg = error.message.toLowerCase();

            if (msg.includes('eotp') || msg.includes('one-time password') ||
                msg.includes('eio') || msg.includes('setrawmode')) {
                print.warn(i === 0 ? '🔐 2FA authentication required' : '⏰ Code invalid or expired');
                if (i === retries - 1) {
                    throw new Error('2FA authentication failed after multiple attempts');
                }
                continue;
            }

            if (msg.includes('cannot publish over')) {
                throw new Error('Version already exists - run script again to bump version');
            }

            if (msg.includes('forbidden')) {
                throw new Error('Publishing forbidden - check NPM permissions');
            }

            if (msg.includes('timed out')) {
                throw new Error('Publishing timed out - check network connection');
            }

            throw error;
        }
    }
    return false;
}

async function runPrePublishChecks() {
    print.info('Running pre-publish checks...');

    try {
        print.step('🧹 Cleaning build directories...');
        run('rm -rf dist/ coverage/', true);

        print.step('📦 Installing fresh dependencies...');
        run('npm ci', false, 120000); // 2 min timeout

        print.step('🧪 Running test suite...');
        run('npm run test', false, 180000); // 3 min timeout

        print.step('📚 Building documentation...');
        run('npm run build-docs', false, 60000); // 1 min timeout

        print.step('🏗️  Building library...');
        run('npx vite build --mode lib', false, 120000); // 2 min timeout

        print.step('📄 Copying documentation...');
        run('npm run copy-docs-to-dist', false, 30000); // 30 sec timeout

        if (!fs.existsSync('dist')) {
            throw new Error('Build failed - no dist directory created');
        }

        if (!fs.existsSync('dist/index.js')) {
            throw new Error('Build incomplete - missing main library file');
        }

        print.ok('All pre-publish checks passed');
        return true;

    } catch (error) {
        print.error(`Pre-publish checks failed: ${error.message}`);
        return false;
    }
}

async function main() {
    print.title('Fast NPM Publisher with 2FA Support');
    console.log('='.repeat(45));

    // Validations
    if (!fs.existsSync('package.json')) {
        print.error('No package.json found');
        process.exit(1);
    }

    const npmUser = run('npm whoami', true);
    if (!npmUser || npmUser.length === 0) {
        print.error('Not logged in to NPM. Run: npm login');
        process.exit(1);
    }

    print.info(`Logged in as: ${npmUser}`);

    // Get versions
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const local = pkg.version;
    const remote = run(`npm view ${pkg.name} version`, true) || '0.0.0';

    print.info(`Package: ${pkg.name}`);
    print.info(`Local: ${local}`);

    if (!remote) {
        print.info('Package not published yet - first publication');
    } else {
        print.info(`NPM: ${remote}`);

        const comparison = compareVersions(local, remote);

        if (comparison < 0) {
            print.error(`NPM version (${remote}) > local (${local})`);
            print.warn('Please update local version or pull latest changes');
            process.exit(1);
        }

        if (comparison === 0) {
            print.warn('Same version detected - version bump required');

            const patch = bumpVer(local, 'patch');
            const minor = bumpVer(local, 'minor');
            const major = bumpVer(local, 'major');

            console.log(`\nVersion bump options:`);
            console.log(`1. patch: ${local} → ${patch} (bug fixes)`);
            console.log(`2. minor: ${local} → ${minor} (new features)`);
            console.log(`3. major: ${local} → ${major} (breaking changes)`);
            console.log(`4. custom: Enter custom version`);
            console.log(`5. cancel: Exit without publishing`);

            const choice = await ask('\nSelect option (1-5): ');
            let newVer, bumpType;

            switch (choice.trim()) {
                case '1': newVer = patch; bumpType = 'patch'; break;
                case '2': newVer = minor; bumpType = 'minor'; break;
                case '3': newVer = major; bumpType = 'major'; break;
                case '4':
                    newVer = await ask('Enter version: ');
                    bumpType = 'custom';
                    break;
                case '5':
                    print.warn('Publishing cancelled by user');
                    rl.close();
                    return;
                default:
                    print.error('Invalid choice - exiting');
                    rl.close();
                    return;
            }

            print.info(`Updating version to ${newVer}`);

            try {
                if (bumpType === 'custom') {
                    run(`npm version ${newVer} --no-git-tag-version`);
                } else {
                    run(`npm version ${bumpType} --no-git-tag-version`);
                }
                print.ok(`Version successfully updated to ${newVer}`);
            } catch (error) {
                print.error(`Version update failed: ${error.message}`);
                rl.close();
                return;
            }
        } else {
            print.ok('Local version is newer - ready to publish');
        }
    }

    // Pre-publish checks
    const checksPass = await runPrePublishChecks();
    if (!checksPass) {
        print.error('Cannot proceed - pre-publish checks failed');
        rl.close();
        return;
    }

    // Confirm publish
    const finalVersion = JSON.parse(fs.readFileSync('package.json', 'utf8')).version;
    console.log(`\n🚀 Ready to publish: ${pkg.name}@${finalVersion}`);
    print.warn('This will publish the package to NPM registry');

    const confirm = await ask('Proceed with publishing? (y/n): ');
    if (confirm.toLowerCase() !== 'y') {
        print.warn('Publishing cancelled by user');
        rl.close();
        return;
    }

    // Publish
    try {
        await publishToNPM();
        print.ok('Package published successfully!');

        // Git operations
        try {
            print.step('📝 Creating git commit and tag...');
            run('git add package.json package-lock.json', true);
            run(`git commit -m "chore: release version ${finalVersion}"`);
            run(`git tag "v${finalVersion}"`);

            const pushGit = await ask('Push changes to git repository? (y/n): ');
            if (pushGit.toLowerCase() === 'y') {
                const branch = run('git branch --show-current');
                run(`git push origin ${branch}`);
                run(`git push origin "v${finalVersion}"`);
                print.ok('Changes pushed to git repository');
            }
        } catch (error) {
            print.warn(`Git operations failed: ${error.message}`);
            print.info('You may need to commit and push manually');
        }

        // Success summary
        console.log(`\n${'='.repeat(50)}`);
        console.log(`🎉 SUCCESS! Published ${pkg.name}@${finalVersion}`);
        console.log(`📦 NPM: https://www.npmjs.com/package/${pkg.name}`);
        console.log(`🔧 Install: npm install ${pkg.name}@${finalVersion}`);
        console.log(`${'='.repeat(50)}`);

        console.log('\n📋 Next steps:');
        console.log('• Update documentation if needed');
        console.log('• Create GitHub release');
        console.log('• Announce the update');
        console.log('• Test installation in other projects');

    } catch (error) {
        print.error(`Publishing failed: ${error.message}`);

        // Provide helpful troubleshooting
        if (error.message.includes('2FA')) {
            console.log('\n💡 2FA Troubleshooting:');
            console.log('• Ensure authenticator app time is synchronized');
            console.log('• Wait for a fresh code (codes expire every 30 seconds)');
            console.log('• Try logging out and back in: npm logout && npm login');
        } else if (error.message.includes('already exists')) {
            console.log('\n💡 Version already exists:');
            console.log('• Run this script again to bump the version');
            console.log('• Or manually update package.json version');
        } else if (error.message.includes('timeout')) {
            console.log('\n💡 Timeout issues:');
            console.log('• Check your internet connection');
            console.log('• NPM registry might be slow - try again');
        }
    }

    rl.close();
}

// Handle process termination gracefully
process.on('SIGINT', () => {
    print.warn('\n⏹️  Process interrupted by user');
    rl.close();
    process.exit(0);
});

process.on('SIGTERM', () => {
    print.warn('\n⏹️  Process terminated');
    rl.close();
    process.exit(0);
});

// Run main function with error handling
main().catch(error => {
    print.error(`Unexpected error: ${error.message}`);
    console.error(error.stack);
    rl.close();
    process.exit(1);
});
