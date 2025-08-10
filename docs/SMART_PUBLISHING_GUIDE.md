# 🚀 Smart NPM Publishing Guide with 2FA Support

## Overview

The Nebula UI project now includes intelligent NPM publishing scripts that automatically:

- ✅ Check current NPM registry version vs local version
- ✅ Prevent publishing duplicate versions
- ✅ Suggest appropriate version bumps (patch/minor/major)
- ✅ **Handle 2FA authentication seamlessly** 🔐
- ✅ Run comprehensive pre-publish checks
- ✅ Handle git tagging and commits
- ✅ Provide clear feedback and confirmations

## Available Scripts

### 🎯 Primary Publishing Script (with 2FA Support)

```bash
npm run publish:npm
```

**Features:**
- Compares local vs NPM registry versions
- Automatically suggests version bumps when needed
- **Handles 2FA/OTP authentication automatically** 🔐
- Runs full test suite and build process
- Interactive prompts for safety
- Git integration (commits, tags, push)

### 🔧 Alternative Scripts

```bash
# Simple NPM publish (legacy)
npm run publish:simple

# NPM dry run (preview what will be published)
npm run publish:dry

# Advanced 2FA script (detailed version)
npm run publish:2fa

# Legacy smart publish (no 2FA support)
npm run publish:legacy

# Full deployment script (bash)
npm run deploy
```

## How It Works

### 1. Version Detection

The script automatically detects:

```
📦 Package: preact-nebula-ui
ℹ Local version: 1.2.1
ℹ NPM version: 1.2.1
```

### 2. Intelligent Version Comparison

- **Local > NPM**: ✅ Ready to publish
- **Local = NPM**: ⚠️  Version bump needed
- **Local < NPM**: ❌ Error - update local version

### 3. Version Bump Suggestions

When versions are equal, you get options:

```
Version bump options:
1. patch: 1.2.1 → 1.2.2 (bug fixes)
2. minor: 1.2.1 → 1.3.0 (new features)  
3. major: 1.2.1 → 2.0.0 (breaking changes)
4. custom: Enter your own version
5. cancel: Exit without publishing
```

### 4. Pre-publish Checks

Automatically runs:
- ✅ Clean build directories
- ✅ Install dependencies (`npm ci`)
- ✅ Run tests (`npm run test`)
- ✅ Build library (`npm run build:lib`)
- ✅ Validate dist directory

### 5. Git Integration

After successful publish:
- Creates commit: `"chore: bump version to X.X.X"`
- Creates tag: `"vX.X.X"`
- Optional push to remote repository

## Usage Examples

### Example 1: First Time Publishing

```bash
npm run publish:npm
```

Output:
```
🚀 Smart NPM Publishing Tool
========================================
ℹ Package: preact-nebula-ui
ℹ Local version: 1.0.0
ℹ Package not published yet
ℹ Running pre-publish checks...
✅ Pre-publish checks passed
🚀 Ready to publish preact-nebula-ui@1.0.0
Publish to NPM? (y/n): y
✅ Published successfully!
```

### Example 2: Version Already Published

```bash
npm run publish:npm
```

Output:
```
🚀 NPM Publisher with 2FA Support
===================================
ℹ Package: preact-nebula-ui
ℹ Local: 1.2.1
ℹ NPM: 1.2.1
⚠️  Same version - bump needed

1. patch: 1.2.1 → 1.2.2
2. minor: 1.2.1 → 1.3.0
3. major: 1.2.1 → 2.0.0
4. custom version
5. cancel

Choice (1-5): 1
ℹ Bumping to 1.2.2
✅ Version updated to 1.2.2
```

### Example 3: 2FA Authentication Required

```bash
npm run publish:npm
```

Output:
```
🚀 Ready: preact-nebula-ui@1.2.2
Publish? (y/n): y
ℹ Publishing to NPM...
🔐 NPM requires 2FA authentication
Enter your 2FA code (6 digits): 123456
ℹ Publishing with 2FA... (1/2)
✅ Published successfully!
```

### Example 3: Local Version Newer

```bash
npm run publish:npm
```

Output:
```
ℹ Local version: 1.2.2
ℹ NPM version: 1.2.1
✅ Local version is newer
ℹ Running pre-publish checks...
✅ Published successfully!
```

## Safety Features

### 1. 2FA Authentication Support 🔐
- ✅ Automatically detects when 2FA is required
- ✅ Prompts for authenticator code when needed
- ✅ Validates 6-digit OTP format
- ✅ Retries on invalid/expired codes (up to 3 attempts)
- ✅ Clear error messages and troubleshooting tips

### 2. Pre-flight Checks
- ✅ Validates `package.json` exists
- ✅ Checks NPM authentication (`npm whoami`)
- ✅ Prevents duplicate version publishing

### 3. Git Safety
- ⚠️  Warns about uncommitted changes
- 🔍 Shows git status before proceeding
- 🤔 Asks for confirmation before git operations

### 4. Build Validation
- 🧹 Cleans previous builds
- 🧪 Runs complete test suite
- 🏗️  Validates successful build
- 📦 Shows package contents preview

### 5. Interactive Confirmations
- 🤝 Confirms version bumps
- 🚀 Confirms publishing
- 📤 Confirms git push operations

## Error Handling

### Common Scenarios

**Not logged in to NPM:**
```
❌ Not logged in to NPM. Run: npm login
```

**NPM version is newer:**
```
❌ NPM version (1.3.0) is newer than local (1.2.1)
⚠️  Please update your local version or pull latest changes
```

**2FA authentication errors:**
```
❌ Failed: 2FA failed after multiple attempts
```

**Package already exists:**
```
❌ Failed: Version already published - use version bump
```

## Manual Override

If you need to bypass the smart script:

```bash
# Traditional NPM publish
npm run publish:simple

# Or directly
npm publish --access public
```

## Best Practices

### 1. Version Strategy
- **Patch (X.X.+1)**: Bug fixes, documentation updates
- **Minor (X.+1.0)**: New components, new features (backwards compatible)
- **Major (+1.0.0)**: Breaking changes, API changes

### 2. Pre-publish Workflow
```bash
# 1. Ensure clean working directory
git status

# 2. Run tests locally
npm test

# 3. Build locally
npm run build:lib

# 4. Use smart publish
npm run publish:npm
```

### 3. Release Process
1. ✅ Test all changes locally
2. ✅ Update documentation/README
3. ✅ Run smart publish script
4. ✅ Create GitHub release
5. ✅ Update live demo
6. ✅ Announce release

## Troubleshooting

### Script Issues

**2FA Authentication Problems:**
```bash
# If 2FA keeps failing
npm logout
npm login
# Make sure authenticator app time is synced
```

**ES Module errors:**
The script uses `.cjs` extension to avoid ES module conflicts.

**Permission errors:**
```bash
chmod +x scripts/npm-publish-2fa.cjs
```

**NPM registry issues:**
```bash
npm login
npm config list
```

### Version Conflicts

**Local behind NPM:**
```bash
git pull origin main
npm install
```

**Package.json out of sync:**
```bash
git checkout package.json
npm run publish:npm
```

## Implementation Details

The smart publish script (`scripts/npm-publish-2fa.cjs`) provides:

- **Zero dependencies**: Uses only Node.js built-ins
- **Cross-platform**: Works on Windows, macOS, Linux
- **2FA Support**: Seamless handling of NPM 2FA authentication
- **Error resilient**: Handles network issues, git problems, build failures
- **User-friendly**: Clear messages, colors, progress indicators
- **Atomic operations**: Fails fast, doesn't leave partial state

### 2FA Authentication Flow

1. **First attempt**: Try publishing without OTP
2. **2FA detected**: NPM returns EOTP error code
3. **Prompt user**: Ask for 6-digit authenticator code
4. **Validate format**: Ensure code is 6 digits
5. **Retry with OTP**: Use `--otp` flag with npm publish
6. **Handle errors**: Invalid/expired codes trigger retry
7. **Max attempts**: Fail after 3 attempts with helpful message

This ensures reliable, predictable publishing with comprehensive safety checks and seamless 2FA support.
