#!/bin/bash

echo "🔍 Component Documentation Coverage Report"
echo "==========================================="

# Get all component directories
COMPONENT_DIRS=$(find nebula/components -mindepth 1 -maxdepth 1 -type d | sort)
TOTAL_COMPONENTS=0
DOCUMENTED_COMPONENTS=0
MISSING_DOCS=()

echo ""
echo "📊 Checking component documentation coverage..."
echo ""

for dir in $COMPONENT_DIRS; do
    COMPONENT_NAME=$(basename "$dir")
    TOTAL_COMPONENTS=$((TOTAL_COMPONENTS + 1))
    
    # Check if documentation exists
    DOC_FILE="docs/${COMPONENT_NAME^^}_DOCUMENTATION.md"
    
    if [ -f "$DOC_FILE" ]; then
        DOCUMENTED_COMPONENTS=$((DOCUMENTED_COMPONENTS + 1))
        echo "✅ $COMPONENT_NAME - Documentation exists"
    else
        MISSING_DOCS+=("$COMPONENT_NAME")
        echo "❌ $COMPONENT_NAME - Missing documentation ($DOC_FILE)"
    fi
done

echo ""
echo "📈 Coverage Summary:"
echo "===================="
echo "Total Components: $TOTAL_COMPONENTS"
echo "Documented: $DOCUMENTED_COMPONENTS"
echo "Missing: $((TOTAL_COMPONENTS - DOCUMENTED_COMPONENTS))"

COVERAGE_PERCENT=$((DOCUMENTED_COMPONENTS * 100 / TOTAL_COMPONENTS))
echo "Coverage: $COVERAGE_PERCENT%"

if [ ${#MISSING_DOCS[@]} -eq 0 ]; then
    echo ""
    echo "🎉 100% DOCUMENTATION COVERAGE ACHIEVED!"
else
    echo ""
    echo "📋 Missing Documentation Files:"
    echo "==============================="
    for component in "${MISSING_DOCS[@]}"; do
        echo "- docs/${component^^}_DOCUMENTATION.md"
    done
fi

echo ""
echo "🔗 Available Documentation Files:"
echo "================================="
find docs -name "*_DOCUMENTATION.md" | sort | while read -r file; do
    echo "✓ $file"
done
