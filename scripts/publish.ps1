# Nebula UI NPM Publish Script
# Windows PowerShell script for publishing to NPM

param(
    [switch]$DryRun,
    [switch]$Force
)

Write-Host "📦 Nebula UI NPM Publish Script" -ForegroundColor Cyan

# Check if user is logged in to NPM
Write-Host "🔐 Checking NPM authentication..." -ForegroundColor Yellow
$npmUser = npm whoami 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ You are not logged in to NPM!" -ForegroundColor Red
    Write-Host "Please run: npm login" -ForegroundColor Yellow
    exit 1
}
Write-Host "✅ Logged in as: $npmUser" -ForegroundColor Green

# Check if package.json exists
if (-not (Test-Path "package.json")) {
    Write-Host "❌ package.json not found!" -ForegroundColor Red
    exit 1
}

# Get package info
$packageJson = Get-Content "package.json" | ConvertFrom-Json
$packageName = $packageJson.name
$packageVersion = $packageJson.version

Write-Host "📋 Package Details:" -ForegroundColor Cyan
Write-Host "  Name: $packageName" -ForegroundColor Gray
Write-Host "  Version: $packageVersion" -ForegroundColor Gray

# Run build first unless forced to skip
if (-not $Force) {
    Write-Host "🔨 Running build first..." -ForegroundColor Yellow
    & "$PSScriptRoot\build.ps1"
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Build failed! Cannot publish." -ForegroundColor Red
        exit 1
    }
}

# Check if dist folder exists
if (-not (Test-Path "dist")) {
    Write-Host "❌ dist folder not found! Run build first." -ForegroundColor Red
    exit 1
}

if ($DryRun) {
    Write-Host "🔍 Running dry run..." -ForegroundColor Yellow
    npm publish --dry-run --access public
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Dry run successful! Package is ready for publishing." -ForegroundColor Green
        Write-Host "To publish for real, run: .\scripts\publish.ps1" -ForegroundColor Cyan
    } else {
        Write-Host "❌ Dry run failed!" -ForegroundColor Red
        exit 1
    }
} else {
    # Confirm publication
    Write-Host "⚠️  About to publish $packageName@$packageVersion to NPM" -ForegroundColor Yellow
    $confirmation = Read-Host "Are you sure you want to continue? (y/N)"
    
    if ($confirmation -ne 'y' -and $confirmation -ne 'Y') {
        Write-Host "❌ Publication cancelled." -ForegroundColor Yellow
        exit 0
    }
    
    # Publish to NPM
    Write-Host "🚀 Publishing to NPM..." -ForegroundColor Yellow
    npm publish --access public
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "🎉 Successfully published $packageName@$packageVersion to NPM!" -ForegroundColor Green
        Write-Host "📦 Package URL: https://www.npmjs.com/package/$packageName" -ForegroundColor Cyan
        Write-Host "📥 Install with: npm install $packageName" -ForegroundColor Cyan
    } else {
        Write-Host "❌ Publication failed!" -ForegroundColor Red
        exit 1
    }
}
