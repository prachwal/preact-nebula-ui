import { useState } from 'preact/hooks'
import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { DocumentationTab } from '../../components/DocumentationTab'
import {
  BasicUsageSection,
  VariantsSection,
  SizesSection,
  ToastManagerSection,
  FeaturesSection,
  AccessibilitySection,
  PropsDocumentation
} from './sections'

type DemoType = 'basic' | 'variants' | 'sizes' | 'manager' | 'features' | 'accessibility' | 'props' | 'documentation'

interface Tab {
  key: DemoType
  label: string
}

interface PageProps {
  readonly path?: string
}

export function ToastPage(_props: PageProps) {
  const [activeDemo, setActiveDemo] = useState<DemoType>('basic')

  const tabs: Tab[] = [
    { key: 'basic', label: 'Basic Usage' },
    { key: 'variants', label: 'Variants' },
    { key: 'sizes', label: 'Sizes' },
    { key: 'manager', label: 'Toast Manager' },
    { key: 'features', label: 'Features' },
    { key: 'accessibility', label: 'Accessibility' },
    { key: 'props', label: 'Props' },
    { key: 'documentation', label: 'Documentation' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageHeader
          title="🔔 Toast Notifications"
          description="Temporary notifications that provide feedback about actions or system status."
        />

        <DemoTabs
          tabs={tabs}
          activeTab={activeDemo}
          onTabChange={(tab) => setActiveDemo(tab as DemoType)}
        />

        <div className="mt-8">
          {activeDemo === 'basic' && <BasicUsageSection />}
          {activeDemo === 'variants' && <VariantsSection />}
          {activeDemo === 'sizes' && <SizesSection />}
          {activeDemo === 'manager' && <ToastManagerSection />}
          {activeDemo === 'features' && <FeaturesSection />}
          {activeDemo === 'accessibility' && <AccessibilitySection />}
          {activeDemo === 'props' && <PropsDocumentation />}
          {activeDemo === 'documentation' && <DocumentationTab componentName="toast" />}
        </div>
      </div>
    </div>
  )
}
