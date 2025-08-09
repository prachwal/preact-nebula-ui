# 🚀 NPM Deployment Guide

## Quick Deploy Commands

### Linux/macOS (Bash)
```bash
# Interactive deployment with version selection
npm run deploy

# Dry run (test without publishing)
npm run deploy:dry

# Direct script execution
./scripts/deploy-npm.sh
```

### Windows (PowerShell)
```powershell
# Interactive deployment with version selection
npm run deploy:win

# Dry run (test without publishing)
npm run deploy:win:dry

# Direct script execution
.\scripts\deploy-npm.ps1

# With parameters
.\scripts\deploy-npm.ps1 -VersionType patch
.\scripts\deploy-npm.ps1 -CustomVersion "1.2.0-beta.1"
.\scripts\deploy-npm.ps1 -DryRun
```

## Deployment Process

The deployment script automatically:

1. **🔍 Pre-flight Checks**
   - Verifies correct directory
   - Checks git branch (warns if not main/master)
   - Detects uncommitted changes

2. **🔢 Version Management**
   - Interactive version bump selection
   - Support for patch/minor/major/custom versions
   - Option to skip version changes

3. **🧹 Clean & Prepare**
   - Removes previous builds
   - Fresh dependency installation
   - Code quality checks

4. **🔍 Quality Assurance**
   - ESLint code linting
   - TypeScript type checking
   - Full test suite execution
   - Library build process

5. **📦 Publishing**
   - Dry run verification
   - User confirmation prompt
   - NPM package publishing
   - Git tagging and commits

6. **✅ Post-deployment**
   - Success confirmation
   - Next steps guidance

## Version Types

- **patch** (1.1.0 → 1.1.1): Bug fixes, small improvements
- **minor** (1.1.0 → 1.2.0): New features, backward compatible
- **major** (1.1.0 → 2.0.0): Breaking changes
- **custom**: Any specific version (e.g., 1.2.0-beta.1)
- **skip**: Keep current version

## Safety Features

- **Dry Run Support**: Test the entire process without publishing
- **Git Integration**: Automatic tagging and optional pushing
- **Quality Gates**: All tests and checks must pass before publishing
- **User Confirmation**: Manual approval required before actual publishing
- **Rollback Ready**: Git commits and tags for easy version tracking

## Prerequisites

1. **NPM Account**: Logged into NPM (`npm login`)
2. **Git Repository**: Clean working directory recommended
3. **Permissions**: Publishing rights to `preact-nebula-ui` package
4. **Dependencies**: All dev dependencies installed

## Troubleshooting

### Common Issues

**"Not logged into NPM"**
```bash
npm login
```

**"Build directory not found"**
- Ensure `npm run build:lib` works independently
- Check vite.config.ts configuration

**"Tests failing"**
- Run `npm test` independently to debug
- Use `--skip-tests` flag if needed (not recommended)

**"Permission denied"**
```bash
chmod +x ./scripts/deploy-npm.sh
```

### Manual Deployment (Emergency)

If the script fails, manual deployment:

```bash
# 1. Version bump
npm version patch  # or minor/major

# 2. Build
npm run build:lib

# 3. Test
npm test

# 4. Publish
npm publish --access public

# 5. Git operations
git push origin master
git push origin v1.1.1  # replace with actual version
```

## Post-Deployment Checklist

- [ ] Verify package on [npmjs.com](https://www.npmjs.com/package/preact-nebula-ui)
- [ ] Test installation: `npm install preact-nebula-ui@latest`
- [ ] Update GitHub releases
- [ ] Update documentation if needed
- [ ] Announce new version

---

*For questions or issues, check the [GitHub Issues](https://github.com/PRachwal/preact-nebula-ui/issues)*
