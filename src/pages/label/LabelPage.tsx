import { useState } from 'preact/hooks'
import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { DocumentationTab } from '../../components/DocumentationTab'
import { BasicSection, RequiredSection, SizingSection, ExamplesSection, PropsDocumentation } from './sections'

type DemoType = 'basic' | 'required' | 'sizing' | 'examples' | 'props' | 'documentation'

interface Tab {
  key: DemoType
  label: string
}

interface PageProps {
  path?: string
}

export function LabelPage(_props: PageProps) {
  const [activeDemo, setActiveDemo] = useState<DemoType>('basic')

  const tabs: Tab[] = [
    { key: 'basic', label: 'Basic Usage' },
    { key: 'required', label: 'Required Labels' },
    { key: 'sizing', label: 'Sizing' },
    { key: 'examples', label: 'Examples' },
    { key: 'props', label: 'Props' },
    { key: 'documentation', label: 'Documentation' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageHeader
          title=" Label Component"
          description="Form label component with accessibility features and flexible styling"
        />

        <DemoTabs
          tabs={tabs}
          activeTab={activeDemo}
          onTabChange={(tab) => setActiveDemo(tab as DemoType)}
        />

        <div className="mt-8">
          {activeDemo === 'basic' && <BasicSection />}
          {activeDemo === 'required' && <RequiredSection />}
          {activeDemo === 'sizing' && <SizingSection />}
          {activeDemo === 'examples' && <ExamplesSection />}
          {activeDemo === 'props' && <PropsDocumentation />}
          {activeDemo === 'documentation' && <DocumentationTab componentName="label" />}
        </div>
      </div>
    </div>
  )
}

export default LabelPage
