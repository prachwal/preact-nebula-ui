import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { DocumentationTab } from '../../components/DocumentationTab'
import { usePathTabPage, PathTabPageConfigs } from '../../hooks'
import { BasicUsageSection, VariantsSection, SizesAndShapesSection, ExamplesSection, PropsDocumentation } from './sections'

interface PageProps {
  readonly path?: string
}

export function BadgePage(_props: PageProps) {
  const { activeTab, setActiveTab, tabs } = usePathTabPage(
    PathTabPageConfigs.withDocumentation('/badge', [
      { key: 'variants', label: 'Variants' },
      { key: 'sizes', label: 'Sizes & Shapes' },
      { key: 'examples', label: 'Examples' }
    ])
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageHeader
          title="🏷️ Badge Component"
          description="Small status indicators and count displays for labels and notifications"
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

  function renderSection() {
    switch (activeTab) {
      case 'basic':
        return <BasicUsageSection />
      case 'variants':
        return <VariantsSection />
      case 'sizes':
        return <SizesAndShapesSection />
      case 'examples':
        return <ExamplesSection />
      case 'props':
        return <PropsDocumentation />
      case 'documentation':
        return <DocumentationTab componentName="badge" />
      default:
        return <BasicUsageSection />
    }
  }
}
