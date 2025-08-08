# 🚀 NPM Deployment Script for Nebula UI (PowerShell)
# This script handles the complete deployment process to NPM

param(
    [string]$VersionType = "",
    [string]$CustomVersion = "",
    [switch]$SkipTests = $false,
    [switch]$DryRun = $false
)

# Colors for output
function Write-ColorOutput($ForegroundColor) {
    $fc = $host.UI.RawUI.ForegroundColor
    $host.UI.RawUI.ForegroundColor = $ForegroundColor
    if ($args) {
        Write-Output $args
    } else {
        $input | Write-Output
    }
    $host.UI.RawUI.ForegroundColor = $fc
}

Write-ColorOutput Blue "🌟 Nebula UI - NPM Deployment Script"
Write-Output "=================================================="

# Check if we're in the right directory
if (!(Test-Path "package.json")) {
    Write-ColorOutput Red "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
}

# Check if we're on the main branch
$currentBranch = git branch --show-current
if ($currentBranch -ne "master" -and $currentBranch -ne "main") {
    Write-ColorOutput Yellow "⚠️  Warning: You're not on the main branch (current: $currentBranch)"
    $continue = Read-Host "Do you want to continue? (y/n)"
    if ($continue -ne "y" -and $continue -ne "Y") {
        exit 1
    }
}

# Check for uncommitted changes
$gitStatus = git status --porcelain
if ($gitStatus) {
    Write-ColorOutput Yellow "⚠️  Warning: You have uncommitted changes"
    $continue = Read-Host "Do you want to continue? (y/n)"
    if ($continue -ne "y" -and $continue -ne "Y") {
        exit 1
    }
}

# Get current version from package.json
$currentVersion = node -p "require('./package.json').version"
Write-ColorOutput Blue "📦 Current version: $currentVersion"

# Handle version bumping
if ($VersionType -eq "" -and $CustomVersion -eq "") {
    Write-ColorOutput Yellow "🔢 Select version bump type:"
    Write-Output "1) patch (1.1.0 -> 1.1.1) - Bug fixes"
    Write-Output "2) minor (1.1.0 -> 1.2.0) - New features"
    Write-Output "3) major (1.1.0 -> 2.0.0) - Breaking changes"
    Write-Output "4) custom - Enter custom version"
    Write-Output "5) skip - Keep current version"
    
    $choice = Read-Host "Enter your choice (1-5)"
    
    switch ($choice) {
        "1" { $VersionType = "patch" }
        "2" { $VersionType = "minor" }
        "3" { $VersionType = "major" }
        "4" { 
            $CustomVersion = Read-Host "Enter custom version (e.g., 1.2.0-beta.1)"
            $VersionType = "custom"
        }
        "5" { $VersionType = "skip" }
        default {
            Write-ColorOutput Red "❌ Invalid choice. Exiting."
            exit 1
        }
    }
}

# Bump version if not skipping
if ($VersionType -ne "skip") {
    try {
        if ($VersionType -eq "custom") {
            npm version $CustomVersion --no-git-tag-version
        } else {
            npm version $VersionType --no-git-tag-version
        }
        $newVersion = node -p "require('./package.json').version"
        Write-ColorOutput Green "✅ Version updated to: $newVersion"
    }
    catch {
        Write-ColorOutput Red "❌ Error updating version: $_"
        exit 1
    }
} else {
    $newVersion = $currentVersion
    Write-ColorOutput Yellow "⏭️  Keeping current version: $newVersion"
}

# Clean previous builds
Write-ColorOutput Blue "🧹 Cleaning previous builds..."
if (Test-Path "dist") { Remove-Item -Recurse -Force "dist" }
if (Test-Path "coverage") { Remove-Item -Recurse -Force "coverage" }

# Install dependencies
Write-ColorOutput Blue "📦 Installing dependencies..."
try {
    npm ci
    if ($LASTEXITCODE -ne 0) { throw "npm ci failed" }
}
catch {
    Write-ColorOutput Red "❌ Error installing dependencies: $_"
    exit 1
}

# Run linting
Write-ColorOutput Blue "🔍 Running linter..."
try {
    npm run lint
    if ($LASTEXITCODE -ne 0) { throw "Linting failed" }
}
catch {
    Write-ColorOutput Red "❌ Linting failed: $_"
    exit 1
}

# Run type checking
Write-ColorOutput Blue "📝 Running type checks..."
try {
    npm run type-check
    if ($LASTEXITCODE -ne 0) { throw "Type checking failed" }
}
catch {
    Write-ColorOutput Red "❌ Type checking failed: $_"
    exit 1
}

# Run tests (unless skipped)
if (!$SkipTests) {
    Write-ColorOutput Blue "🧪 Running tests..."
    try {
        npm run test
        if ($LASTEXITCODE -ne 0) { throw "Tests failed" }
    }
    catch {
        Write-ColorOutput Red "❌ Tests failed: $_"
        exit 1
    }
} else {
    Write-ColorOutput Yellow "⏭️  Skipping tests as requested"
}

# Build the library
Write-ColorOutput Blue "🏗️  Building library..."
try {
    npm run build:lib
    if ($LASTEXITCODE -ne 0) { throw "Build failed" }
}
catch {
    Write-ColorOutput Red "❌ Build failed: $_"
    exit 1
}

# Check if dist directory was created
if (!(Test-Path "dist")) {
    Write-ColorOutput Red "❌ Error: Build failed - dist directory not found"
    exit 1
}

# Show build contents
Write-ColorOutput Blue "📂 Build contents:"
Get-ChildItem "dist" | Format-Table Name, Length, LastWriteTime

# Dry run to check what will be published
Write-ColorOutput Blue "🔍 Running dry run..."
try {
    npm publish --dry-run
    if ($LASTEXITCODE -ne 0) { throw "Dry run failed" }
}
catch {
    Write-ColorOutput Red "❌ Dry run failed: $_"
    exit 1
}

if ($DryRun) {
    Write-ColorOutput Yellow "🔍 Dry run completed successfully. Exiting without publishing."
    exit 0
}

# Ask for confirmation
Write-ColorOutput Yellow "🚀 Ready to publish version $newVersion to NPM"
Write-ColorOutput Yellow "⚠️  This will make the package publicly available"
$confirm = Read-Host "Do you want to proceed with publishing? (y/n)"

if ($confirm -ne "y" -and $confirm -ne "Y") {
    Write-ColorOutput Yellow "⏹️  Publishing cancelled"
    exit 0
}

# Publish to NPM
Write-ColorOutput Blue "🚀 Publishing to NPM..."
try {
    npm publish --access public
    if ($LASTEXITCODE -ne 0) { throw "Publishing failed" }
}
catch {
    Write-ColorOutput Red "❌ Publishing failed: $_"
    exit 1
}

# Create git tag and commit if version was changed
if ($VersionType -ne "skip") {
    Write-ColorOutput Blue "📝 Creating git tag and commit..."
    try {
        git add package.json
        git commit -m "chore: bump version to $newVersion"
        git tag "v$newVersion"
        
        $pushGit = Read-Host "📤 Push changes to git? (y/n)"
        if ($pushGit -eq "y" -or $pushGit -eq "Y") {
            git push origin $currentBranch
            git push origin "v$newVersion"
            Write-ColorOutput Green "✅ Changes pushed to git"
        }
    }
    catch {
        Write-ColorOutput Yellow "⚠️  Warning: Git operations failed: $_"
    }
}

# Success message
Write-Output ""
Write-ColorOutput Green "🎉 SUCCESS! Nebula UI v$newVersion has been published to NPM"
Write-ColorOutput Green "📦 Package URL: https://www.npmjs.com/package/preact-nebula-ui"
Write-ColorOutput Green "🔧 Install with: npm install preact-nebula-ui@$newVersion"
Write-Output ""
Write-ColorOutput Blue "📊 Next steps:"
Write-Output "1. Update documentation if needed"
Write-Output "2. Create GitHub release"
Write-Output "3. Announce on social media"
Write-Output "4. Update examples and demos"
Write-Output ""
Write-ColorOutput Green "✨ Deployment complete!"
