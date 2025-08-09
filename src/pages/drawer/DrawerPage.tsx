import { useState } from 'preact/hooks'
import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { DocumentationTab } from '../../components/DocumentationTab'
import {
  BasicUsageSection,
  VariantsSection,
  InteractiveSection,
  AccessibilitySection,
  PropsDocumentation
} from './sections'

type DemoType = 'basic' | 'variants' | 'interactive' | 'accessibility' | 'props' | 'documentation'

interface Tab {
  key: DemoType
  label: string
}

interface PageProps {
  readonly path?: string
}

export function DrawerPage(_props: Readonly<PageProps>) {
  const [activeDemo, setActiveDemo] = useState<DemoType>('basic')

  const tabs: Tab[] = [
    { key: 'basic', label: 'Basic Usage' },
    { key: 'variants', label: 'Variants' },
    { key: 'interactive', label: 'Interactive' },
    { key: 'accessibility', label: 'Accessibility' },
    { key: 'props', label: 'Props' },
    { key: 'documentation', label: 'Documentation' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageHeader
          title="📱 Drawer Component"
          description="Sliding panels with smooth animations, focus management, and responsive behavior. Perfect for navigation, filters, and contextual content."
        />

        <DemoTabs
          tabs={tabs}
          activeTab={activeDemo}
          onTabChange={(tab) => setActiveDemo(tab as DemoType)}
        />

        <div className="mt-8">
          {activeDemo === 'basic' && <BasicUsageSection />}
          {activeDemo === 'variants' && <VariantsSection />}
          {activeDemo === 'interactive' && <InteractiveSection />}
          {activeDemo === 'accessibility' && <AccessibilitySection />}
          {activeDemo === 'props' && <PropsDocumentation />}
          {activeDemo === 'documentation' && <DocumentationTab componentName="drawer" />}
        </div>
      </div>
    </div>
  )
}
