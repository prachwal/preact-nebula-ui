# NPM Publishing Script for Preact Nebula UI v1.0.0
# Run this script to publish the package to NPM

Write-Host "🚀 Nebula UI v1.0.0 Publishing Script" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan

# Check if we're in the correct directory
if (!(Test-Path "package.json")) {
    Write-Host "❌ Error: package.json not found. Make sure you're in the project root directory." -ForegroundColor Red
    exit 1
}

# Verify package.json version
$packageJson = Get-Content "package.json" | ConvertFrom-Json
if ($packageJson.version -ne "1.0.0") {
    Write-Host "❌ Error: Package version is not 1.0.0. Current version: $($packageJson.version)" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Version check passed: v$($packageJson.version)" -ForegroundColor Green

# Run tests
Write-Host "🧪 Running tests..." -ForegroundColor Yellow
npm test
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error: Tests failed. Cannot publish." -ForegroundColor Red
    exit 1
}
Write-Host "✅ All tests passed!" -ForegroundColor Green

# Build the library
Write-Host "🔨 Building library..." -ForegroundColor Yellow
npm run build:lib
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error: Build failed. Cannot publish." -ForegroundColor Red
    exit 1
}
Write-Host "✅ Build completed successfully!" -ForegroundColor Green

# Verify dist folder exists
if (!(Test-Path "dist")) {
    Write-Host "❌ Error: dist folder not found after build." -ForegroundColor Red
    exit 1
}

# Check what will be published
Write-Host "📦 Checking package contents..." -ForegroundColor Yellow
npm pack --dry-run

# Ask for confirmation
Write-Host "`n🤔 Ready to publish to NPM?" -ForegroundColor Cyan
Write-Host "This will publish @prp/nebula-ui@1.0.0 to the NPM registry." -ForegroundColor Cyan
$confirmation = Read-Host "Type 'yes' to continue, or anything else to cancel"

if ($confirmation.ToLower() -ne "yes") {
    Write-Host "❌ Publishing cancelled by user." -ForegroundColor Yellow
    exit 0
}

# Check NPM authentication
Write-Host "🔐 Checking NPM authentication..." -ForegroundColor Yellow
npm whoami
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error: Not logged in to NPM. Run 'npm login' first." -ForegroundColor Red
    exit 1
}

# Publish to NPM
Write-Host "🚀 Publishing to NPM..." -ForegroundColor Green
npm publish --access public
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error: Publishing failed." -ForegroundColor Red
    exit 1
}

Write-Host "`n🎉 SUCCESS! Nebula UI v1.0.0 has been published to NPM!" -ForegroundColor Green
Write-Host "📦 Package URL: https://www.npmjs.com/package/@prp/nebula-ui" -ForegroundColor Cyan
Write-Host "🔧 Install with: npm install @prp/nebula-ui" -ForegroundColor Cyan

# Tag the release in git
Write-Host "`n🏷️  Creating git tag..." -ForegroundColor Yellow
git tag -a "v1.0.0" -m "Release v1.0.0 - Production ready Preact Nebula UI"
git push origin "v1.0.0"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Git tag v1.0.0 created and pushed!" -ForegroundColor Green
} else {
    Write-Host "⚠️  Warning: Failed to create/push git tag. You may need to do this manually." -ForegroundColor Yellow
}

Write-Host "`n🎊 All done! Preact Nebula UI v1.0.0 is now live!" -ForegroundColor Green
