import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { DocumentationTab } from '../../components/DocumentationTab'
import { usePathTabPage, PathTabPageConfigs } from '../../hooks'
import { BasicUsageSection, VariantsSection, InteractiveSection, AccessibilitySection, PropsDocumentation } from './sections'

interface PageProps {
  path?: string
}

export function SelectPage(_props: Readonly<PageProps>) {
  const { activeTab, setActiveTab, tabs } = usePathTabPage(
    PathTabPageConfigs.withDocumentation('/select', [
      { key: 'variants', label: 'Variants' },
      { key: 'interactive', label: 'Interactive' },
      { key: 'accessibility', label: 'Accessibility' }
    ])
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageHeader
          title=" Select Component"
          description="Dropdown selection component with search and multi-select capabilities"
        />

        <DemoTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <div className="mt-8">
          {activeTab === 'basic' && <BasicUsageSection />}
          {activeTab === 'variants' && <VariantsSection />}
          {activeTab === 'interactive' && <InteractiveSection />}
          {activeTab === 'accessibility' && <AccessibilitySection />}
          {activeTab === 'props' && <PropsDocumentation />}
          {activeTab === 'documentation' && <DocumentationTab componentName="select" />}
        </div>
      </div>
    </div>
  )
}
