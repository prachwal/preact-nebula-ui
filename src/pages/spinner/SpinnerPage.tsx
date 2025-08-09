import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { DocumentationTab } from '../../components/DocumentationTab'
import { SizesSection, ColorsSection, UsageSection, AccessibilitySection, PropsDocumentation } from './sections'
import { usePathTabPage, PathTabPageConfigs } from '../../hooks'

interface PageProps {
  readonly path?: string
}

export function SpinnerPage(_props: PageProps) {
  const { activeTab, setActiveTab, tabs } = usePathTabPage(
    PathTabPageConfigs.withDocumentation('/spinner', [
      { key: 'sizes', label: 'Sizes' },
      { key: 'colors', label: 'Colors' },
      { key: 'usage', label: 'Usage' },
      { key: 'accessibility', label: 'Accessibility' }
    ])
  )

  const renderSection = () => {
    switch (activeTab) {
      case 'basic':
        return <SizesSection />
      case 'sizes':
        return <SizesSection />
      case 'colors':
        return <ColorsSection />
      case 'usage':
        return <UsageSection />
      case 'accessibility':
        return <AccessibilitySection />
      case 'props':
        return <PropsDocumentation />
      case 'documentation':
        return <DocumentationTab componentName="spinner" />
      default:
        return <SizesSection />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageHeader
          title=" Spinner Component"
          description="Loading indicator component with customizable sizes and colors"
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
