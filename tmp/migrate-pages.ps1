$pagesToMigrate = @(
    @{ Path = "src\pages\container\ContainerPage.tsx"; Sections = @("BasicUsageSection", "SizesSection", "ResponsiveSection", "ExamplesSection"); Tabs = @("basic", "sizes", "responsive", "examples"); Labels = @("Basic Usage", "Sizes", "Responsive", "Examples"); Title = "📦 Container Component"; Description = "Layout wrapper component with responsive breakpoints and flexible sizing options" },
    @{ Path = "src\pages\divider\DividerPage.tsx"; Sections = @("OrientationSection", "VariantsSection", "TextSection"); Tabs = @("orientation", "variants", "text"); Labels = @("Orientation", "Variants", "Text"); Title = "➖ Divider Component"; Description = "Visual separator with horizontal/vertical orientations and text support" },
    @{ Path = "src\pages\field-error\FieldErrorPage.tsx"; Sections = @("BasicUsageSection", "VariantsSection", "IntegrationSection"); Tabs = @("basic", "variants", "integration"); Labels = @("Basic Usage", "Variants", "Integration"); Title = "❌ Field Error Component"; Description = "Form validation error display with styling variants and accessibility features" }
)

foreach ($page in $pagesToMigrate) {
    Write-Host "Migracja: $($page.Path)" -ForegroundColor Yellow
    
    $sections = $page.Sections -join ", "
    $tabs = ($page.Tabs | ForEach-Object { "{ key: '$_', label: '$($page.Labels[$page.Tabs.IndexOf($_)])' }" }) -join ",`n    "
    $conditionals = ($page.Tabs | ForEach-Object { 
        $index = $page.Tabs.IndexOf($_)
        "          {activeDemo === '$_' && <$($page.Sections[$index]) />}"
    }) -join "`n"
    
    $demoType = "'" + ($page.Tabs -join "' | '") + "'"
    
    $newContent = @"
import { useState } from 'preact/hooks'
import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { $sections } from './sections'

type DemoType = $demoType

interface Tab {
  key: DemoType
  label: string
}

interface PageProps {
  path?: string
}

export function $($page.Path.Split('\')[-1].Replace('.tsx', ''))(_props: PageProps) {
  const [activeDemo, setActiveDemo] = useState<DemoType>('$($page.Tabs[0])')

  const tabs: Tab[] = [
    $tabs
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageHeader
          title="$($page.Title)"
          description="$($page.Description)"
        />
        
        <DemoTabs
          tabs={tabs} 
          activeTab={activeDemo} 
          onTabChange={(tab) => setActiveDemo(tab as DemoType)} 
        />

        <div className="mt-8">
$conditionals
        </div>
      </div>
    </div>
  )
}
"@

    $newContent | Out-File -FilePath $page.Path -Encoding UTF8
    Write-Host "✅ Zakończono: $($page.Path)" -ForegroundColor Green
}
