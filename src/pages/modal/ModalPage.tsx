import { useState } from 'preact/hooks'
import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { DocumentationTab } from '../../components/DocumentationTab'
import {
  BasicUsageSection,
  SizeVariantsSection,
  BackdropBehaviorSection,
  PositionVariantsSection,
  ScrollableContentSection,
  PropsDocumentation
} from './sections'

type DemoType = 'basic' | 'sizes' | 'backdrop' | 'position' | 'scrollable' | 'props' | 'docs'

interface Tab {
  key: DemoType
  label: string
}

interface PageProps {
  readonly path?: string
}

export function ModalPage(_props: PageProps) {
  const [activeDemo, setActiveDemo] = useState<DemoType>('basic')

  const tabs: Tab[] = [
    { key: 'basic', label: 'Basic Usage' },
    { key: 'sizes', label: 'Size Variants' },
    { key: 'backdrop', label: 'Backdrop Behavior' },
    { key: 'position', label: 'Position Variants' },
    { key: 'scrollable', label: 'Scrollable Content' },
    { key: 'props', label: 'Props' },
    { key: 'docs', label: 'Documentation' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageHeader
          title="🪟 Modal Component"
          description="Overlay dialogs for focused interactions, confirmations, and detailed content presentation."
        />

        <DemoTabs
          tabs={tabs}
          activeTab={activeDemo}
          onTabChange={(tab) => setActiveDemo(tab as DemoType)}
        />

        <div className="mt-8">
          {activeDemo === 'basic' && <BasicUsageSection />}
          {activeDemo === 'sizes' && <SizeVariantsSection />}
          {activeDemo === 'backdrop' && <BackdropBehaviorSection />}
          {activeDemo === 'position' && <PositionVariantsSection />}
          {activeDemo === 'scrollable' && <ScrollableContentSection />}
          {activeDemo === 'props' && <PropsDocumentation />}
          {activeDemo === 'docs' && <DocumentationTab componentName="modal" />}
        </div>
      </div>
    </div>
  )
}
