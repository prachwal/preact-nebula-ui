import { useState } from 'preact/hooks'
import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { SizesSection, PaddingSection, CenteringSection, CombinationsSection, PropsDocumentation } from './sections'

type DemoType = 'sizes' | 'padding' | 'centering' | 'combinations' | 'props'

interface Tab {
  key: DemoType
  label: string
}

interface PageProps {
  path?: string;
}

export default function ContainerPage(_props: PageProps) {
  const [activeDemo, setActiveDemo] = useState<DemoType>('sizes')

  const tabs: Tab[] = [
    { key: 'sizes', label: 'Sizes' },
    { key: 'padding', label: 'Padding' },
    { key: 'centering', label: 'Centering' },
    { key: 'combinations', label: 'Combinations' },
    { key: 'props', label: 'Props' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageHeader
          title="Container Component"
          description="Layout container with configurable sizing, padding, and centering options."
        />
        
        <DemoTabs
          tabs={tabs} 
          activeTab={activeDemo} 
          onTabChange={(tab) => setActiveDemo(tab as DemoType)} 
        />

        <div className="mt-8">
          {activeDemo === 'sizes' && <SizesSection />}
          {activeDemo === 'padding' && <PaddingSection />}
          {activeDemo === 'centering' && <CenteringSection />}
          {activeDemo === 'combinations' && <CombinationsSection />}
          {activeDemo === 'props' && <PropsDocumentation />}
        </div>
      </div>
    </div>
  );
}
