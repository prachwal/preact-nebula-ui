# Nebula UI Build Script
# Windows PowerShell script for building the component library

Write-Host "🚀 Building Nebula UI Component Library..." -ForegroundColor Cyan

# Clean previous build
Write-Host "🧹 Cleaning previous build..." -ForegroundColor Yellow
if (Test-Path "dist") {
    Remove-Item -Recurse -Force "dist"
    Write-Host "✅ Cleaned dist folder" -ForegroundColor Green
}

# Type check
Write-Host "🔍 Running type check..." -ForegroundColor Yellow
npm run type-check
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Type check failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Type check passed" -ForegroundColor Green

# Run tests
Write-Host "🧪 Running tests..." -ForegroundColor Yellow
npm run test -- --run
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Tests failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Tests passed" -ForegroundColor Green

# Build library
Write-Host "📦 Building library..." -ForegroundColor Yellow
npm run build:lib
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Build completed successfully" -ForegroundColor Green

# Show build results
Write-Host "📊 Build Results:" -ForegroundColor Cyan
if (Test-Path "dist") {
    Get-ChildItem -Path "dist" -Recurse | ForEach-Object {
        $size = if ($_.PSIsContainer) { "DIR" } else { "{0:N0} bytes" -f $_.Length }
        Write-Host "  $($_.FullName.Replace((Get-Location).Path + '\', '')) - $size" -ForegroundColor Gray
    }
}

Write-Host "🎉 Nebula UI build completed successfully!" -ForegroundColor Green
Write-Host "📁 Files are ready in ./dist/ folder" -ForegroundColor Cyan
