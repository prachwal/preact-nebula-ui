#!/usr/bin/env node

/**
 * 🚀 Simple NPM Publisher with 2FA Support
 * Handles version checking and 2FA authentication seamlessly
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
    auth: (msg) => console.log(`${colors.purple}🔐 ${msg}${colors.reset}`)
};

function run(command, silent = false) {
    try {
        return execSync(command, { encoding: 'utf8' }).trim();
    } catch (error) {
        if (silent) return null;
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
                print.info('Publishing to NPM...');
                run('npm publish --access public');
                return true;
            } else {
                print.auth('NPM requires 2FA authentication');
                const otp = await ask('Enter your 2FA code (6 digits): ');

                if (!/^\d{6}$/.test(otp.trim())) {
                    print.warn('Invalid format. Need 6 digits.');
                    continue;
                }

                print.info(`Publishing with 2FA... (${i}/${retries - 1})`);
                run(`npm publish --access public --otp=${otp.trim()}`);
                return true;
            }
        } catch (error) {
            const msg = error.message.toLowerCase();

            if (msg.includes('eotp') || msg.includes('one-time password')) {
                print.warn(i === 0 ? '2FA required' : 'Code invalid/expired');
                if (i === retries - 1) {
                    throw new Error('2FA failed after multiple attempts');
                }
                continue;
            }

            if (msg.includes('cannot publish over')) {
                throw new Error('Version already published - use version bump');
            }

            if (msg.includes('forbidden')) {
                throw new Error('Permission denied - check NPM access');
            }

            throw error;
        }
    }
    return false;
}

async function main() {
    print.title('NPM Publisher with 2FA Support');
    console.log('='.repeat(35));

    // Validations
    if (!fs.existsSync('package.json')) {
        print.error('No package.json found');
        process.exit(1);
    }

    if (!run('npm whoami', true)) {
        print.error('Not logged in. Run: npm login');
        process.exit(1);
    }

    // Get versions
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const local = pkg.version;
    const remote = run(`npm view ${pkg.name} version`, true);

    print.info(`Package: ${pkg.name}`);
    print.info(`Local: ${local}`);

    if (!remote) {
        print.info('Not published yet');
    } else {
        print.info(`NPM: ${remote}`);

        const comparison = compareVersions(local, remote);

        if (comparison < 0) {
            print.error(`NPM version (${remote}) > local (${local})`);
            print.warn('Update local version or pull changes');
            process.exit(1);
        }

        if (comparison === 0) {
            print.warn('Same version - bump needed');

            const patch = bumpVer(local, 'patch');
            const minor = bumpVer(local, 'minor');
            const major = bumpVer(local, 'major');

            console.log(`\n1. patch: ${local} → ${patch}`);
            console.log(`2. minor: ${local} → ${minor}`);
            console.log(`3. major: ${local} → ${major}`);
            console.log(`4. custom version`);
            console.log(`5. cancel`);

            const choice = await ask('\nChoice (1-5): ');
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
                    print.warn('Cancelled');
                    rl.close();
                    return;
                default:
                    print.error('Invalid choice');
                    rl.close();
                    return;
            }

            print.info(`Bumping to ${newVer}`);

            if (bumpType === 'custom') {
                run(`npm version ${newVer} --no-git-tag-version`);
            } else {
                run(`npm version ${bumpType} --no-git-tag-version`);
            }

            print.ok(`Version updated to ${newVer}`);
        } else {
            print.ok('Local version is newer');
        }
    }

    // Pre-publish
    print.info('Pre-publish checks...');

    try {
        console.log('  🧹 Cleaning build directories...');
        run('rm -rf dist/ coverage/');

        console.log('  📦 Installing dependencies...');
        run('npm ci');

        console.log('  🧪 Running tests...');
        run('npm run test');

        console.log('  🏗️  Building library...');
        run('npm run build:lib:fast');

        if (!fs.existsSync('dist')) {
            throw new Error('Build failed - no dist directory');
        }

        print.ok('Pre-publish checks passed');
    } catch (error) {
        print.error(`Pre-publish checks failed: ${error.message}`);
        rl.close();
        return;
    }

    // Confirm publish
    const finalVersion = JSON.parse(fs.readFileSync('package.json', 'utf8')).version;
    console.log(`\n🚀 Ready: ${pkg.name}@${finalVersion}`);

    const confirm = await ask('Publish? (y/n): ');
    if (confirm.toLowerCase() !== 'y') {
        print.warn('Cancelled');
        rl.close();
        return;
    }

    // Publish
    try {
        await publishToNPM();
        print.ok('Published successfully!');

        // Git
        try {
            run('git add package.json');
            run(`git commit -m "chore: version ${finalVersion}"`);
            run(`git tag "v${finalVersion}"`);

            const pushGit = await ask('Push to git? (y/n): ');
            if (pushGit.toLowerCase() === 'y') {
                const branch = run('git branch --show-current');
                run(`git push origin ${branch}`);
                run(`git push origin "v${finalVersion}"`);
                print.ok('Pushed to git');
            }
        } catch (error) {
            print.warn('Git failed (not a repo?)');
        }

        console.log(`\n🎉 SUCCESS!`);
        console.log(`📦 https://www.npmjs.com/package/${pkg.name}`);
        console.log(`🔧 npm install ${pkg.name}@${finalVersion}`);

    } catch (error) {
        print.error(`Failed: ${error.message}`);

        if (error.message.includes('2FA')) {
            console.log('\n💡 2FA Tips:');
            console.log('• Use fresh code from authenticator');
            console.log('• Check app time sync');
            console.log('• Try again');
        }
    }

    rl.close();
}

process.on('SIGINT', () => {
    print.warn('\nInterrupted');
    rl.close();
    process.exit(0);
});

main().catch(error => {
    print.error(error.message);
    rl.close();
    process.exit(1);
});
