import { useState } from 'preact/hooks'
import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { DocumentationTab } from '../../components/DocumentationTab'
import { SizesSection, ColorsSection, UsageSection, AccessibilitySection, PropsDocumentation } from './sections'

type DemoType = 'sizes' | 'colors' | 'usage' | 'accessibility' | 'props' | 'documentation'

interface Tab {
  key: DemoType
  label: string
}

interface PageProps {
  readonly path?: string
}

export function SpinnerPage(_props: PageProps) {
  const [activeDemo, setActiveDemo] = useState<DemoType>('sizes')

  const tabs: Tab[] = [
    { key: 'sizes', label: 'Sizes' },
    { key: 'colors', label: 'Colors' },
    { key: 'usage', label: 'Usage' },
    { key: 'accessibility', label: 'Accessibility' },
    { key: 'props', label: 'Props' },
    { key: 'documentation', label: 'Documentation' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageHeader
          title=" Spinner Component"
          description="Loading indicator component with customizable sizes and colors"
        />

        <DemoTabs
          tabs={tabs}
          activeTab={activeDemo}
          onTabChange={(tab) => setActiveDemo(tab as DemoType)}
        />

        <div className="mt-8">
          {activeDemo === 'sizes' && <SizesSection />}
          {activeDemo === 'colors' && <ColorsSection />}
          {activeDemo === 'usage' && <UsageSection />}
          {activeDemo === 'accessibility' && <AccessibilitySection />}
          {activeDemo === 'props' && <PropsDocumentation />}
          {activeDemo === 'documentation' && <DocumentationTab componentName="spinner" />}
        </div>
      </div>
    </div>
  )
}
