import { useState } from 'preact/hooks'
import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { OrientationSection, VariantsSection, TextSection, PropsDocumentation } from './sections'

type DemoType = 'orientation' | 'variants' | 'text' | 'props'

interface Tab {
  key: DemoType
  label: string
}

interface PageProps {
  path?: string
}

export function DividerPage(_props: PageProps) {
  const [activeDemo, setActiveDemo] = useState<DemoType>('orientation')

  const tabs: Tab[] = [
    { key: 'orientation', label: 'Orientation' },
    { key: 'variants', label: 'Line Variants' },
    { key: 'text', label: 'With Text' },
    { key: 'props', label: 'Props' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageHeader
          title="Divider Component"
          description="Visual separator with horizontal/vertical orientations and text support."
        />
        
        <DemoTabs
          tabs={tabs} 
          activeTab={activeDemo} 
          onTabChange={(tab) => setActiveDemo(tab as DemoType)} 
        />

        <div className="mt-8">
          {activeDemo === 'orientation' && <OrientationSection />}
          {activeDemo === 'variants' && <VariantsSection />}
          {activeDemo === 'text' && <TextSection />}
          {activeDemo === 'props' && <PropsDocumentation />}
        </div>
      </div>
    </div>
  )
}
