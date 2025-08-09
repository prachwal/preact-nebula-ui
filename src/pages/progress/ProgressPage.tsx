import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { DocumentationTab } from '../../components/DocumentationTab'
import { usePathTabPage, PathTabPageConfigs } from '../../hooks'
import { BasicUsageSection, VariantsSection, SizesSection, InteractiveSection, PropsDocumentation } from './sections'

interface PageProps {
  readonly path?: string
}

export function ProgressPage(_props: PageProps) {
  const { activeTab, setActiveTab, tabs } = usePathTabPage(
    PathTabPageConfigs.withDocumentation('/progress', [
      { key: 'variants', label: 'Variants' },
      { key: 'sizes', label: 'Sizes' },
      { key: 'interactive', label: 'Interactive' }
    ])
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageHeader
          title="📊 Progress Component"
          description="Progress indicators show the completion status of ongoing processes, giving users feedback about the current state and expected duration of operations. The Progress component supports both linear and circular variants with customizable colors, sizes, and label display options."
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
        return <SizesSection />
      case 'interactive':
        return <InteractiveSection />
      case 'props':
        return <PropsDocumentation />
      case 'documentation':
        return <DocumentationTab componentName="progress" />
      default:
        return <BasicUsageSection />
    }
  }
}
