#!/bin/bash

# Function to update component page with DocumentationTab
update_component_page() {
    local component=$1
    local page_file=""
    
    # Find the correct page file
    if [ "$component" = "backtop" ]; then
        page_file="/home/prachwal/src/preact-nebula-ui/src/pages/backtop/BackTopPage.tsx"
    else
        page_file="/home/prachwal/src/preact-nebula-ui/src/pages/$component/${component^}Page.tsx"
    fi
    
    if [ ! -f "$page_file" ]; then
        echo "❌ Page file not found for $component: $page_file"
        return 1
    fi
    
    echo "📝 Updating $component ($page_file)"
    
    # Check if DocumentationTab is already imported
    if grep -q "DocumentationTab" "$page_file"; then
        echo "✅ $component already has DocumentationTab"
        return 0
    fi
    
    # Create backup
    cp "$page_file" "$page_file.bak"
    
    # Add import if not exists
    if ! grep -q "import.*DocumentationTab" "$page_file"; then
        sed -i '/import.*DemoTabs/a import { DocumentationTab } from '\''../../components/DocumentationTab'\''' "$page_file"
    fi
    
    # Add documentation tab to tabs array (find the closing bracket and add before it)
    sed -i '/{ key: '\''props'\''.*label: '\''Props'\'' }/a \    { key: '\''documentation'\'', label: '\''Documentation'\'' }' "$page_file"
    
    # Add documentation case to switch/if statements
    if grep -q "case 'props':" "$page_file"; then
        sed -i '/case '\''props'\'':/,/break/a \      case '\''documentation'\'':\n        return <DocumentationTab componentName="'$component'" />' "$page_file"
    elif grep -q "activeDemo === 'props'" "$page_file"; then
        sed -i '/activeDemo === '\''props'\''/a \          {activeDemo === '\''documentation'\'' && <DocumentationTab componentName="'$component'" />}' "$page_file"
    fi
    
    echo "✅ Updated $component"
}

# Update each component
for component in anchor backtop stack affix label; do
    update_component_page "$component"
    echo "---"
done
