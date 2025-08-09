import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { DocumentationTab } from '../../components/DocumentationTab'
import { usePathTabPage, PathTabPageConfigs } from '../../hooks'
import {
  BasicUsageSection,
  VariantsSection,
  InteractiveSection,
  AccessibilitySection,
  PropsDocumentation
} from './sections'

interface PageProps {
  readonly path?: string
}

export function TablePage(_props: Readonly<PageProps>) {
  const { activeTab, setActiveTab, tabs } = usePathTabPage(
    PathTabPageConfigs.withDocumentation('/table', [
      { key: 'variants', label: 'Variants' },
      { key: 'interactive', label: 'Interactive' },
      { key: 'accessibility', label: 'Accessibility' }
    ])
  )

  const renderSection = () => {
    switch (activeTab) {
      case 'basic':
        return <BasicUsageSection />
      case 'variants':
        return <VariantsSection />
      case 'interactive':
        return <InteractiveSection />
      case 'accessibility':
        return <AccessibilitySection />
      case 'props':
        return <PropsDocumentation />
      case 'documentation':
        return <DocumentationTab componentName="table" />
      default:
        return <BasicUsageSection />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageHeader
          title="📊 Table Component"
          description="Structured data presentation with semantic HTML table elements and flexible styling."
        />

        <DemoTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <div className="mt-8">
          {renderSection()}
        </div>
      </div>
    </div>
  )
}

export default TablePage
