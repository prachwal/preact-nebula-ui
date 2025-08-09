import { useState } from 'preact/hooks'
import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { DocumentationTab } from '../../components/DocumentationTab'
import { BasicUsageSection, VariantsSection, SizesSection, StatesSection, FeaturesSection, ExamplesSection, PropsDocumentation } from './sections'

type DemoType = 'basic' | 'variants' | 'sizes' | 'states' | 'features' | 'examples' | 'props' | 'docs'

interface Tab {
  key: DemoType
  label: string
}

interface PageProps {
  readonly path?: string
}

export function TextareaPage(_props: PageProps) {
  const [activeDemo, setActiveDemo] = useState<DemoType>('basic')

  const tabs: Tab[] = [
    { key: 'basic', label: 'Basic Usage' },
    { key: 'variants', label: 'Variants' },
    { key: 'sizes', label: 'Sizes' },
    { key: 'states', label: 'States' },
    { key: 'features', label: 'Features' },
    { key: 'examples', label: 'Examples' },
    { key: 'props', label: 'Props' },
    { key: 'docs', label: 'Documentation' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageHeader
          title=" Textarea Component"
          description="Multi-line text input with validation, sizing, and advanced features"
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
          {activeDemo === 'states' && <StatesSection />}
          {activeDemo === 'features' && <FeaturesSection />}
          {activeDemo === 'examples' && <ExamplesSection />}
          {activeDemo === 'props' && <PropsDocumentation />}
          {activeDemo === 'docs' && <DocumentationTab componentName="textarea" />}
        </div>
      </div>
    </div>
  )
}

export default TextareaPage
