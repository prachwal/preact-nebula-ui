#!/bin/bash

# 🚀 NPM Deployment Script for Nebula UI
# This script handles the complete deployment process to NPM

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🌟 Nebula UI - NPM Deployment Script${NC}"
echo "=================================================="

# Check if we're in the right directory
if [[ ! -f "package.json" ]]; then
    echo -e "${RED}❌ Error: package.json not found. Please run this script from the project root.${NC}"
    exit 1
fi

# Check if we're on the main branch
CURRENT_BRANCH=$(git branch --show-current)
if [[ "$CURRENT_BRANCH" != "master" && "$CURRENT_BRANCH" != "main" ]]; then
    echo -e "${YELLOW}⚠️  Warning: You're not on the main branch (current: $CURRENT_BRANCH)${NC}"
    read -p "Do you want to continue? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Check for uncommitted changes
if [[ -n $(git status --porcelain) ]]; then
    echo -e "${YELLOW}⚠️  Warning: You have uncommitted changes${NC}"
    read -p "Do you want to continue? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Get current version from package.json
CURRENT_VERSION=$(node -p "require('./package.json').version")
echo -e "${BLUE}📦 Current version: $CURRENT_VERSION${NC}"

# Ask for version type
echo -e "${YELLOW}🔢 Select version bump type:${NC}"
echo "1) patch (1.1.0 -> 1.1.1) - Bug fixes"
echo "2) minor (1.1.0 -> 1.2.0) - New features"
echo "3) major (1.1.0 -> 2.0.0) - Breaking changes"
echo "4) custom - Enter custom version"
echo "5) skip - Keep current version"

read -p "Enter your choice (1-5): " VERSION_CHOICE

case $VERSION_CHOICE in
    1)
        VERSION_TYPE="patch"
        ;;
    2)
        VERSION_TYPE="minor"
        ;;
    3)
        VERSION_TYPE="major"
        ;;
    4)
        read -p "Enter custom version (e.g., 1.2.0-beta.1): " CUSTOM_VERSION
        VERSION_TYPE="custom"
        ;;
    5)
        VERSION_TYPE="skip"
        ;;
    *)
        echo -e "${RED}❌ Invalid choice. Exiting.${NC}"
        exit 1
        ;;
esac

# Bump version if not skipping
if [[ "$VERSION_TYPE" != "skip" ]]; then
    if [[ "$VERSION_TYPE" == "custom" ]]; then
        npm version $CUSTOM_VERSION --no-git-tag-version
    else
        npm version $VERSION_TYPE --no-git-tag-version
    fi
    NEW_VERSION=$(node -p "require('./package.json').version")
    echo -e "${GREEN}✅ Version updated to: $NEW_VERSION${NC}"
else
    NEW_VERSION=$CURRENT_VERSION
    echo -e "${YELLOW}⏭️  Keeping current version: $NEW_VERSION${NC}"
fi

# Clean previous builds
echo -e "${BLUE}🧹 Cleaning previous builds...${NC}"
rm -rf dist/
rm -rf coverage/

# Install dependencies
echo -e "${BLUE}📦 Installing dependencies...${NC}"
npm ci

# Run linting
echo -e "${BLUE}🔍 Running linter...${NC}"
npm run lint

# Run type checking
echo -e "${BLUE}📝 Running type checks...${NC}"
npm run type-check

# Run tests
echo -e "${BLUE}🧪 Running tests...${NC}"
npm run test

# Build the library
echo -e "${BLUE}🏗️  Building library...${NC}"
npm run build:lib

# Check if dist directory was created
if [[ ! -d "dist" ]]; then
    echo -e "${RED}❌ Error: Build failed - dist directory not found${NC}"
    exit 1
fi

# Show build contents
echo -e "${BLUE}📂 Build contents:${NC}"
ls -la dist/

# Dry run to check what will be published
echo -e "${BLUE}🔍 Running dry run...${NC}"
npm publish --dry-run

# Ask for confirmation
echo -e "${YELLOW}🚀 Ready to publish version $NEW_VERSION to NPM${NC}"
echo -e "${YELLOW}⚠️  This will make the package publicly available${NC}"
read -p "Do you want to proceed with publishing? (y/n): " -n 1 -r
echo

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}⏹️  Publishing cancelled${NC}"
    exit 0
fi

# Publish to NPM
echo -e "${BLUE}🚀 Publishing to NPM...${NC}"
npm publish --access public

# Create git tag and commit if version was changed
if [[ "$VERSION_TYPE" != "skip" ]]; then
    echo -e "${BLUE}📝 Creating git tag and commit...${NC}"
    git add package.json
    git commit -m "chore: bump version to $NEW_VERSION"
    git tag "v$NEW_VERSION"
    
    echo -e "${YELLOW}📤 Push changes to git? (y/n):${NC}"
    read -p "" -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git push origin $CURRENT_BRANCH
        git push origin "v$NEW_VERSION"
        echo -e "${GREEN}✅ Changes pushed to git${NC}"
    fi
fi

# Success message
echo ""
echo -e "${GREEN}🎉 SUCCESS! Nebula UI v$NEW_VERSION has been published to NPM${NC}"
echo -e "${GREEN}📦 Package URL: https://www.npmjs.com/package/preact-nebula-ui${NC}"
echo -e "${GREEN}🔧 Install with: npm install preact-nebula-ui@$NEW_VERSION${NC}"
echo ""
echo -e "${BLUE}📊 Next steps:${NC}"
echo "1. Update documentation if needed"
echo "2. Create GitHub release"
echo "3. Announce on social media"
echo "4. Update examples and demos"
echo ""
echo -e "${GREEN}✨ Deployment complete!${NC}"
