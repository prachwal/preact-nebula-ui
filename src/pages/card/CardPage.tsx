import { useState } from 'preact/hooks'
import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { BasicUsageSection, VariantsSection, StructureSection, ExamplesSection, PropsDocumentation } from './sections'

type DemoType = 'basic' | 'variants' | 'structure' | 'examples' | 'props'

interface Tab {
  key: DemoType
  label: string
}

interface PageProps {
  path?: string
}

export function CardPage(_props: PageProps) {
  const [activeDemo, setActiveDemo] = useState<DemoType>('basic')

  const tabs: Tab[] = [
    { key: 'basic', label: 'Basic Usage' },
    { key: 'variants', label: 'Card Variants' },
    { key: 'structure', label: 'Card Structure' },
    { key: 'examples', label: 'Real Examples' },
    { key: 'props', label: 'Props' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageHeader
          title="🃏 Card Component"
          description="Content container with header, body, and footer sections for organized layouts"
        />
        
        <DemoTabs
          tabs={tabs} 
          activeTab={activeDemo} 
          onTabChange={(tab) => setActiveDemo(tab as DemoType)} 
        />

        <div className="mt-8">
          {activeDemo === 'basic' && <BasicUsageSection />}
          {activeDemo === 'variants' && <VariantsSection />}
          {activeDemo === 'structure' && <StructureSection />}
          {activeDemo === 'examples' && <ExamplesSection />}
          {activeDemo === 'props' && <PropsDocumentation />}
        </div>
      </div>
    </div>
  )
}

export default CardPage
