#!/bin/bash

# Lista komponentów do konwersji
COMPONENTS=(
  "breadcrumb:BreadcrumbPage"
  "tabs:TabsPage"
  "badge:BadgePage"
  "progress:ProgressPage"
  "skeleton:SkeletonPage"
  "spinner:SpinnerPage" 
  "toast:ToastPage"
  "avatar:AvatarPage"
  "drawer:DrawerPage"
  "popover:PopoverPage"
  "table:TablePage"
  "divider:DividerPage"
  "stack:StackPage"
  "label:LabelPage"
)

echo "🚀 Starting batch conversion of remaining simple pages..."
echo ""

for component_info in "${COMPONENTS[@]}"; do
  IFS=':' read -r component_name page_name <<< "$component_info"
  
  # Znajdź plik komponentu
  if [ -f "src/pages/$component_name/${page_name}.tsx" ]; then
    page_file="src/pages/$component_name/${page_name}.tsx"
  elif [ -f "src/pages/${page_name}/${page_name}.tsx" ]; then
    page_file="src/pages/${page_name}/${page_name}.tsx"
  else
    echo "❌ File not found for component: $component_name"
    continue
  fi

  echo "🔄 Converting $component_name..."

  # Sprawdź czy już konwertowane
  if grep -q "usePathTabPage" "$page_file"; then
    echo "✅ $component_name already converted"
    continue
  fi

  # Backup original file
  cp "$page_file" "$page_file.backup"

  # Wykonaj konwersję używając sed
  sed -i "s/import { useState } from 'preact\/hooks'/\/\/ useState removed by conversion/" "$page_file"
  sed -i "s/import { PageHeader } from '..\/..\/components\/layout\/PageHeader'/import { PageHeader } from '..\/..\/components\/layout\/PageHeader'\nimport { usePathTabPage, PathTabPageConfigs } from '..\/..\/hooks'/" "$page_file"
  sed -i "/type DemoType = /d" "$page_file"
  sed -i "/interface Tab {/,/}/d" "$page_file"
  sed -i "s/const \[activeDemo, setActiveDemo\] = useState<DemoType>('basic')/const { activeTab, setActiveTab, tabs } = usePathTabPage(PathTabPageConfigs.withDocumentation('\/$component_name', []))/" "$page_file"
  sed -i "/const tabs: Tab\[\] = \[/,/\]/d" "$page_file"
  sed -i "s/activeDemo/activeTab/g" "$page_file"
  sed -i "s/setActiveDemo/setActiveTab/g" "$page_file"
  sed -i "s/(tab) => setActiveTab(tab as DemoType)/setActiveTab/g" "$page_file"
  sed -i "s/'docs'/'documentation'/g" "$page_file"

  # Check if file compiles
  if npx tsc --noEmit --skipLibCheck "$page_file" 2>/dev/null; then
    echo "✅ $component_name converted successfully"
    rm "$page_file.backup"
  else
    echo "❌ $component_name conversion failed, reverting..."
    mv "$page_file.backup" "$page_file"
    continue
  fi

  # Update app.tsx routing
  if grep -q "path=\"/$component_name\"" src/app.tsx; then
    sed -i "s/path=\"\/$component_name\"/path=\"\/$component_name\/:tab\"/g" src/app.tsx
    echo "✅ $component_name routing updated"
  fi
  
  echo ""
done

echo "✨ Batch conversion completed!"
echo "🧪 Running build test..."
npm run build
