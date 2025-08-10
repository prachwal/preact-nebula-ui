#!/usr/bin/env node

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

function run(command, silent = false, timeout = 300000) {
    try {
        const result = execSync(command, {
            encoding: 'utf8',
            timeout: timeout,
            stdio: silent ? 'pipe' : 'inherit',
            env: { ...process.env, NPM_CONFIG_BROWSER: 'false' } // Disable browser opening
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

async function publishWithManual2FA() {
    print.auth('Manual 2FA Publishing');
    console.log('This method avoids browser authentication issues.');
    console.log('');

    try {
        // Get 2FA code first
        const otp = await ask('Enter your 2FA code from authenticator app: ');

        if (!/^\d{6}$/.test(otp.trim())) {
            throw new Error('Invalid 2FA code format. Must be exactly 6 digits.');
        }

        print.step('📤 Publishing with 2FA code...');

        // Try publishing with OTP
        run(`npm publish --access public --otp=${otp.trim()}`, false, 180000);

        print.ok('Package published successfully!');
        return true;

    } catch (error) {
        const msg = error.message.toLowerCase();

        if (msg.includes('eotp') || msg.includes('one-time password')) {
            throw new Error('Invalid or expired 2FA code. Please try again.');
        }

        if (msg.includes('cannot publish over')) {
            throw new Error('Version already published. Bump version first.');
        }

        throw error;
    }
}

async function main() {
    print.title('NPM Publisher - No Browser Authentication');
    console.log('='.repeat(50));
    console.log('');

    // Check if logged in
    const npmUser = run('npm whoami', true);
    if (!npmUser || npmUser.length === 0) {
        print.error('Not logged in to NPM. Run: npm login');
        process.exit(1);
    }

    print.info(`Logged in as: ${npmUser}`);

    // Get package info
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const local = pkg.version;
    const remote = run(`npm view ${pkg.name} version`, true) || '0.0.0';

    print.info(`Package: ${pkg.name}`);
    print.info(`Local: ${local}`);
    print.info(`NPM: ${remote}`);

    // Check if we have something to publish
    if (local === remote) {
        print.warn('No new version to publish');
        process.exit(0);
    }

    console.log('');
    print.info('This script assumes your package is already built and ready.');
    print.warn('Make sure you ran: npm run build:lib');
    console.log('');

    const proceed = await ask('Ready to publish? (y/N): ');

    if (proceed.toLowerCase() !== 'y') {
        print.info('Publishing cancelled');
        process.exit(0);
    }

    try {
        await publishWithManual2FA();

        console.log('');
        print.ok(`Successfully published ${pkg.name}@${local}!`);
        print.info(`View at: https://www.npmjs.com/package/${pkg.name}`);

    } catch (error) {
        console.log('');
        print.error(`Publishing failed: ${error.message}`);

        console.log('');
        console.log('💡 Troubleshooting tips:');
        console.log('  • Make sure your 2FA app is synced correctly');
        console.log('  • Try generating a new 2FA code');
        console.log('  • Check your network connection');
        console.log('  • Verify NPM permissions for this package');

        process.exit(1);
    } finally {
        rl.close();
    }
}

// Handle process signals
process.on('SIGINT', () => {
    console.log('\n');
    print.warn('Publishing cancelled by user');
    rl.close();
    process.exit(1);
});

process.on('SIGTERM', () => {
    rl.close();
    process.exit(1);
});

main().catch(error => {
    console.error('Unexpected error:', error);
    rl.close();
    process.exit(1);
});
