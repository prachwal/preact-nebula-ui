#!/bin/bash

# 🚀 Smart NPM Publishing Script for Nebula UI
# Automatically checks NPM version and suggests version bumps

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${BLUE}🌟 Nebula UI - Smart NPM Publishing Script${NC}"
echo "======================================================"

# Check if we're in the right directory
if [[ ! -f "package.json" ]]; then
    echo -e "${RED}❌ Error: package.json not found. Please run this script from the project root.${NC}"
    exit 1
fi

# Check if npm is logged in
if ! npm whoami > /dev/null 2>&1; then
    echo -e "${RED}❌ Error: You are not logged in to npm. Please run 'npm login' first.${NC}"
    exit 1
fi

# Get package name and current version
PACKAGE_NAME=$(node -p "require('./package.json').name")
CURRENT_VERSION=$(node -p "require('./package.json').version")

echo -e "${BLUE}📦 Package: $PACKAGE_NAME${NC}"
echo -e "${BLUE}📋 Current local version: $CURRENT_VERSION${NC}"

# Check NPM registry for published version
echo -e "${CYAN}🔍 Checking NPM registry...${NC}"

# Get published version from NPM
NPM_VERSION=$(npm view $PACKAGE_NAME version 2>/dev/null || echo "not-published")

if [[ "$NPM_VERSION" == "not-published" ]]; then
    echo -e "${YELLOW}📦 Package not yet published on NPM${NC}"
    SUGGESTED_VERSION=$CURRENT_VERSION
    PUBLISH_NEEDED=true
else
    echo -e "${GREEN}🌐 NPM published version: $NPM_VERSION${NC}"
    
    # Compare versions using node
    VERSION_COMPARISON=$(node -e "
        const semver = require('semver');
        const local = '$CURRENT_VERSION';
        const npm = '$NPM_VERSION';
        
        if (semver.gt(local, npm)) {
            console.log('local_newer');
        } else if (semver.eq(local, npm)) {
            console.log('equal');
        } else {
            console.log('npm_newer');
        }
    " 2>/dev/null || echo "comparison_failed")
    
    # If semver is not available, use a simple version comparison
    if [[ "$VERSION_COMPARISON" == "comparison_failed" ]]; then
        if [[ "$CURRENT_VERSION" == "$NPM_VERSION" ]]; then
            VERSION_COMPARISON="equal"
        else
            VERSION_COMPARISON="unknown"
        fi
    fi
    
    case $VERSION_COMPARISON in
        "local_newer")
            echo -e "${GREEN}✅ Local version is newer than NPM version${NC}"
            SUGGESTED_VERSION=$CURRENT_VERSION
            PUBLISH_NEEDED=true
            ;;
        "equal")
            echo -e "${YELLOW}⚠️  Local version equals NPM version - version bump needed${NC}"
            
            # Generate suggested versions
            IFS='.' read -ra VERSION_PARTS <<< "$CURRENT_VERSION"
            MAJOR=${VERSION_PARTS[0]}
            MINOR=${VERSION_PARTS[1]}
            PATCH=${VERSION_PARTS[2]}
            
            PATCH_VERSION="$MAJOR.$MINOR.$((PATCH + 1))"
            MINOR_VERSION="$MAJOR.$((MINOR + 1)).0"
            MAJOR_VERSION="$((MAJOR + 1)).0.0"
            
            echo -e "${PURPLE}🔢 Suggested version bumps:${NC}"
            echo "  1) patch: $CURRENT_VERSION → $PATCH_VERSION (bug fixes)"
            echo "  2) minor: $CURRENT_VERSION → $MINOR_VERSION (new features)"
            echo "  3) major: $CURRENT_VERSION → $MAJOR_VERSION (breaking changes)"
            echo "  4) custom: Enter your own version"
            echo "  5) cancel: Exit without publishing"
            
            read -p "Select version bump (1-5): " BUMP_CHOICE
            
            case $BUMP_CHOICE in
                1)
                    SUGGESTED_VERSION=$PATCH_VERSION
                    BUMP_TYPE="patch"
                    ;;
                2)
                    SUGGESTED_VERSION=$MINOR_VERSION
                    BUMP_TYPE="minor"
                    ;;
                3)
                    SUGGESTED_VERSION=$MAJOR_VERSION
                    BUMP_TYPE="major"
                    ;;
                4)
                    read -p "Enter custom version: " CUSTOM_VERSION
                    SUGGESTED_VERSION=$CUSTOM_VERSION
                    BUMP_TYPE="custom"
                    ;;
                5)
                    echo -e "${YELLOW}⏹️  Publishing cancelled${NC}"
                    exit 0
                    ;;
                *)
                    echo -e "${RED}❌ Invalid choice. Exiting.${NC}"
                    exit 1
                    ;;
            esac
            
            PUBLISH_NEEDED=true
            VERSION_BUMP_NEEDED=true
            ;;
        "npm_newer")
            echo -e "${RED}❌ NPM version ($NPM_VERSION) is newer than local version ($CURRENT_VERSION)${NC}"
            echo -e "${YELLOW}💡 Please pull the latest changes or bump your local version${NC}"
            exit 1
            ;;
        *)
            echo -e "${YELLOW}⚠️  Could not compare versions automatically${NC}"
            echo -e "${YELLOW}💡 Please verify versions manually${NC}"
            SUGGESTED_VERSION=$CURRENT_VERSION
            PUBLISH_NEEDED=true
            ;;
    esac
fi

# If version bump is needed, update package.json
if [[ "${VERSION_BUMP_NEEDED:-false}" == "true" ]]; then
    echo -e "${BLUE}📝 Updating package.json version to $SUGGESTED_VERSION${NC}"
    
    if [[ "$BUMP_TYPE" == "custom" ]]; then
        npm version $SUGGESTED_VERSION --no-git-tag-version
    else
        npm version $BUMP_TYPE --no-git-tag-version
    fi
    
    echo -e "${GREEN}✅ Version updated to $SUGGESTED_VERSION${NC}"
fi

if [[ "$PUBLISH_NEEDED" == "true" ]]; then
    echo -e "${CYAN}🚀 Ready to publish version $SUGGESTED_VERSION${NC}"
    
    # Check for uncommitted changes
    if [[ -n $(git status --porcelain) ]]; then
        echo -e "${YELLOW}⚠️  Warning: You have uncommitted changes${NC}"
        git status --short
        echo
        read -p "Continue with uncommitted changes? (y/n): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi
    
    # Pre-publish checks
    echo -e "${BLUE}🔍 Running pre-publish checks...${NC}"
    
    # Clean previous builds
    echo "  🧹 Cleaning previous builds..."
    rm -rf dist/ coverage/ || true
    
    # Install dependencies
    echo "  📦 Installing dependencies..."
    npm ci --silent
    
    # Run linting
    echo "  🔍 Running linter..."
    npm run lint --silent
    
    # Run type checking
    echo "  📝 Running type checks..."
    npm run type-check --silent
    
    # Run tests
    echo "  🧪 Running tests..."
    npm run test --silent
    
    # Build the library
    echo "  🏗️  Building library..."
    npm run build:lib --silent
    
    # Check if dist directory was created
    if [[ ! -d "dist" ]]; then
        echo -e "${RED}❌ Error: Build failed - dist directory not found${NC}"
        exit 1
    fi
    
    # Show build contents
    echo -e "${GREEN}✅ Build successful! Contents:${NC}"
    ls -la dist/
    
    # Show what will be published
    echo -e "${BLUE}📋 Package contents preview:${NC}"
    npm publish --dry-run | head -20
    
    # Final confirmation
    echo ""
    echo -e "${YELLOW}🚀 Ready to publish $PACKAGE_NAME@$SUGGESTED_VERSION${NC}"
    echo -e "${YELLOW}⚠️  This will make the package publicly available on NPM${NC}"
    
    read -p "Proceed with publishing? (y/n): " -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        # Publish to NPM
        echo -e "${BLUE}🚀 Publishing to NPM...${NC}"
        npm publish --access public
        
        # Create git tag and commit if version was changed
        if [[ "${VERSION_BUMP_NEEDED:-false}" == "true" ]]; then
            echo -e "${BLUE}📝 Creating git commit and tag...${NC}"
            git add package.json package-lock.json 2>/dev/null || git add package.json
            git commit -m "chore: bump version to $SUGGESTED_VERSION"
            git tag "v$SUGGESTED_VERSION"
            
            echo -e "${YELLOW}📤 Push changes to git repository? (y/n):${NC}"
            read -p "" -n 1 -r
            echo
            if [[ $REPLY =~ ^[Yy]$ ]]; then
                CURRENT_BRANCH=$(git branch --show-current)
                git push origin $CURRENT_BRANCH
                git push origin "v$SUGGESTED_VERSION"
                echo -e "${GREEN}✅ Changes pushed to git${NC}"
            fi
        fi
        
        # Success message
        echo ""
        echo -e "${GREEN}🎉 SUCCESS! $PACKAGE_NAME v$SUGGESTED_VERSION published to NPM${NC}"
        echo -e "${GREEN}📦 Package URL: https://www.npmjs.com/package/$PACKAGE_NAME${NC}"
        echo -e "${GREEN}🔧 Install with: npm install $PACKAGE_NAME@$SUGGESTED_VERSION${NC}"
        echo ""
        echo -e "${BLUE}📊 Next steps:${NC}"
        echo "  • Update documentation if needed"
        echo "  • Create GitHub release"
        echo "  • Announce the update"
        echo "  • Update examples and demos"
        echo ""
        echo -e "${GREEN}✨ Smart deployment complete!${NC}"
        
    else
        echo -e "${YELLOW}⏹️  Publishing cancelled${NC}"
        exit 0
    fi
else
    echo -e "${GREEN}✅ No publishing needed - versions are up to date${NC}"
fi
