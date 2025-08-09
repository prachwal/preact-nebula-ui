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

type DemoType = 'basic' | 'variants' | 'interactive' | 'accessibility' | 'props' | 'docs'

interface Tab {
  key: DemoType
  label: string
}

interface PageProps {
  readonly path?: string
}

export function TooltipPage(_props: PageProps) {
  const [activeDemo, setActiveDemo] = useState<DemoType>('basic')

  const tabs: Tab[] = [
    { key: 'basic', label: 'Basic Usage' },
    { key: 'variants', label: 'Variants' },
    { key: 'interactive', label: 'Interactive' },
    { key: 'accessibility', label: 'Accessibility' },
    { key: 'props', label: 'Props' },
    { key: 'docs', label: 'Documentation' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageHeader
          title="💬 Tooltip Component"
          description="Contextual information display with intelligent positioning, multiple trigger options, and rich content support. Perfect for providing helpful hints and detailed information."
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
          {activeDemo === 'docs' && <DocumentationTab componentName="tooltip" />}
        </div>
      </div>
    </div>
  )
}
