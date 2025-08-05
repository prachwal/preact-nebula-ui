import { useState } from 'preact/hooks'
import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { SizesSection, VariantsSection, IconsSection, StatesSection, PropsDocumentation } from './sections'

type DemoType = 'sizes' | 'variants' | 'icons' | 'states' | 'props'

interface Tab {
  key: DemoType
  label: string
}

interface PageProps {
  path?: string
}

export function InputPage(_props: PageProps) {
  const [activeDemo, setActiveDemo] = useState<DemoType>('sizes')

  const tabs: Tab[] = [
    { key: 'sizes', label: 'Sizes' },
    { key: 'variants', label: 'Variants' },
    { key: 'icons', label: 'With Icons' },
    { key: 'states', label: 'States' },
    { key: 'props', label: 'Props' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageHeader
          title=" Input Component"
          description="Text input component with multiple variants, sizes, and states for form interactions"
        />
        
        <DemoTabs
          tabs={tabs} 
          activeTab={activeDemo} 
          onTabChange={(tab) => setActiveDemo(tab as DemoType)} 
        />

        <div className="mt-8">
          {activeDemo === 'sizes' && <SizesSection />}
          {activeDemo === 'variants' && <VariantsSection />}
          {activeDemo === 'icons' && <IconsSection />}
          {activeDemo === 'states' && <StatesSection />}
          {activeDemo === 'props' && <PropsDocumentation />}
        </div>
      </div>
    </div>
  )
}

export default InputPage
