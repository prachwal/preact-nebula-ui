import { useState } from 'preact/hooks'
import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { DocumentationTab } from '../../components/DocumentationTab'
import {
  BasicUsageSection,
  VariantsSection,
  InteractiveSection,
  AccessibilitySection,
  PropsDocumentation,
  type DemoType
} from './sections'

type ExtendedDemoType = DemoType | 'documentation'

interface Tab {
  key: ExtendedDemoType
  label: string
}

interface PageProps {
  readonly path?: string
}

export function PaginationPage(_props: PageProps) {
  const [activeDemo, setActiveDemo] = useState<ExtendedDemoType>('basic')

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
          title="📄 Pagination Component"
          description="Navigation component for breaking large datasets into manageable pages with intuitive controls and accessibility features."
        />

        <DemoTabs
          tabs={tabs}
          activeTab={activeDemo}
          onTabChange={(tab) => setActiveDemo(tab as ExtendedDemoType)}
        />        <div className="mt-8">
          {activeDemo === 'basic' && <BasicUsageSection />}
          {activeDemo === 'variants' && <VariantsSection />}
          {activeDemo === 'interactive' && <InteractiveSection />}
          {activeDemo === 'accessibility' && <AccessibilitySection />}
          {activeDemo === 'props' && <PropsDocumentation />}
          {activeDemo === 'documentation' && <DocumentationTab componentName="pagination" />}
        </div>
      </div>
    </div>
  )
}
