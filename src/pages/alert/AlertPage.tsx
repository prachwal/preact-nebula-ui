import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { DocumentationTab } from '../../components/DocumentationTab'
import { usePathTabPage, PathTabPageConfigs } from '../../hooks'
import { BasicUsageSection, VariantsSection, SizesSection, InteractiveSection, PropsDocumentation } from './sections'

type DemoType = 'basic' | 'variants' | 'sizes' | 'interactive' | 'props' | 'documentation'

interface PageProps {
  readonly path?: string
}

export function AlertPage(_props: PageProps) {
  const tabConfig = PathTabPageConfigs.withDocumentation('/alert', [
    { key: 'variants', label: 'Variants' },
    { key: 'sizes', label: 'Sizes' },
    { key: 'interactive', label: 'Interactive' }
  ])

  const { activeTab, setActiveTab, tabs } = usePathTabPage(tabConfig)
  const activeDemo = activeTab as DemoType

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageHeader
          title="🚨 Alert Component"
          description="Contextual feedback messages for user actions with support for dismissal and custom actions"
        />

        <DemoTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <div className="mt-8">
          {activeDemo === 'basic' && <BasicUsageSection />}
          {activeDemo === 'variants' && <VariantsSection />}
          {activeDemo === 'sizes' && <SizesSection />}
          {activeDemo === 'interactive' && <InteractiveSection />}
          {activeDemo === 'props' && <PropsDocumentation />}
          {activeDemo === 'documentation' && <DocumentationTab componentName="alert" />}
        </div>
      </div>
    </div>
  )
}

export default AlertPage
