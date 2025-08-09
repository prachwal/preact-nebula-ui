import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { DocumentationTab } from '../../components/DocumentationTab'
import { usePathTabPage, PathTabPageConfigs } from '../../hooks'
import {
  BasicUsageSection,
  SizeVariantsSection,
  BackdropBehaviorSection,
  PositionVariantsSection,
  ScrollableContentSection,
  PropsDocumentation
} from './sections'

type DemoType = 'basic' | 'sizes' | 'backdrop' | 'position' | 'scrollable' | 'props' | 'documentation'

interface PageProps {
  readonly path?: string
}

export function ModalPage(_props: PageProps) {
  const tabConfig = PathTabPageConfigs.withDocumentation('/modal', [
    { key: 'sizes', label: 'Size Variants' },
    { key: 'backdrop', label: 'Backdrop Behavior' },
    { key: 'position', label: 'Position Variants' },
    { key: 'scrollable', label: 'Scrollable Content' }
  ])

  const { activeTab, setActiveTab, tabs } = usePathTabPage(tabConfig)
  const activeDemo = activeTab as DemoType

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageHeader
          title="🪟 Modal Component"
          description="Overlay dialogs for focused interactions, confirmations, and detailed content presentation."
        />

        <DemoTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <div className="mt-8">
          {activeDemo === 'basic' && <BasicUsageSection />}
          {activeDemo === 'sizes' && <SizeVariantsSection />}
          {activeDemo === 'backdrop' && <BackdropBehaviorSection />}
          {activeDemo === 'position' && <PositionVariantsSection />}
          {activeDemo === 'scrollable' && <ScrollableContentSection />}
          {activeDemo === 'props' && <PropsDocumentation />}
          {activeDemo === 'documentation' && <DocumentationTab componentName="modal" />}
        </div>
      </div>
    </div>
  )
}
