import { useState } from 'preact/hooks'
import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { BasicUsageSection, VariantsSection, SizesSection, InteractiveSection, PropsDocumentation } from './sections'

type DemoType = 'basic' | 'variants' | 'sizes' | 'interactive' | 'props'

interface Tab {
  key: DemoType
  label: string
}

interface PageProps {
  path?: string
}

export function AlertPage(_props: PageProps) {
  const [activeDemo, setActiveDemo] = useState<DemoType>('basic')

  const tabs: Tab[] = [
    { key: 'basic', label: 'Basic Usage' },
    { key: 'variants', label: 'Variants' },
    { key: 'sizes', label: 'Sizes' },
    { key: 'interactive', label: 'Interactive' },
    { key: 'props', label: 'Props' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageHeader
          title="🚨 Alert Component"
          description="Contextual feedback messages for user actions with support for dismissal and custom actions"
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
          {activeDemo === 'interactive' && <InteractiveSection />}
          {activeDemo === 'props' && <PropsDocumentation />}
        </div>
      </div>
    </div>
  )
}

export default AlertPage
