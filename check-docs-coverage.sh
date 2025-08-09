#!/bin/bash
# Documentation Coverage Checker

echo "=== NEBULA UI DOCUMENTATION COVERAGE REPORT ==="
echo "Generated on: $(date)"
echo ""

# Get all components
components=$(find nebula/components -name "index.ts" | sed 's|nebula/components/||g' | sed 's|/index.ts||g' | grep -v "^index.ts$" | sort)

# Get existing documentation files  
docs=$(find docs -name "*DOCUMENTATION.md" | sed 's|docs/||g' | sed 's|_DOCUMENTATION.md||g' | tr '[:upper:]' '[:lower:]' | sort)

echo "📊 TOTAL COMPONENTS: $(echo "$components" | wc -l)"
echo "📚 DOCUMENTED COMPONENTS: $(echo "$docs" | wc -l)"
echo ""

echo "✅ COMPONENTS WITH DOCUMENTATION:"
echo "$components" | while read component; do
  lower_component=$(echo "$component" | tr '[:upper:]' '[:lower:]')
  if echo "$docs" | grep -qi "^$lower_component$"; then
    echo "  ✓ $component"
  fi
done

echo ""
echo "❌ COMPONENTS MISSING DOCUMENTATION:"
echo "$components" | while read component; do
  lower_component=$(echo "$component" | tr '[:upper:]' '[:lower:]')
  if ! echo "$docs" | grep -qi "^$lower_component$"; then
    echo "  ✗ $component"
  fi
done

echo ""
echo "📋 ALL COMPONENTS LIST:"
echo "$components" | while read component; do
  lower_component=$(echo "$component" | tr '[:upper:]' '[:lower:]')
  if echo "$docs" | grep -qi "^$lower_component$"; then
    echo "  ✓ $component - DOCUMENTED"
  else
    echo "  ✗ $component - MISSING DOCS"
  fi
done
