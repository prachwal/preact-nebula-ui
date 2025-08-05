import { useState } from 'preact/hooks'
import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { getExampleData } from './ExampleData'
import {
  BasicExample,
  SeparatorVariants,
  HomeIconExample,
  ResponsiveCollapse,
  IconsExample,
  EdgeCases,
  PropsDocumentation
} from './sections'

type DemoType = 'basic' | 'separators' | 'homeIcon' | 'responsive' | 'icons' | 'edgeCases' | 'props'

interface Tab {
  key: DemoType
  label: string
}

interface PageProps {
  path?: string
}

export function BreadcrumbPage(_props: PageProps) {
  const [activeDemo, setActiveDemo] = useState<DemoType>('basic')
  const { basicItems, longItems, itemsWithIcons } = getExampleData()

  const tabs: Tab[] = [
    { key: 'basic', label: 'Basic Usage' },
    { key: 'separators', label: 'Separators' },
    { key: 'homeIcon', label: 'Home Icon' },
    { key: 'responsive', label: 'Responsive' },
    { key: 'icons', label: 'Icons' },
    { key: 'edgeCases', label: 'Edge Cases' },
    { key: 'props', label: 'Props' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageHeader
          title=" Breadcrumb Component"
          description="Hierarchical navigation component showing the current page's location within the site structure."
        />
        
        <DemoTabs
          tabs={tabs} 
          activeTab={activeDemo} 
          onTabChange={(tab) => setActiveDemo(tab as DemoType)} 
        />

        <div className="mt-8">
          {activeDemo === 'basic' && <BasicExample items={basicItems} />}
          {activeDemo === 'separators' && <SeparatorVariants items={basicItems} />}
          {activeDemo === 'homeIcon' && <HomeIconExample items={basicItems} />}
          {activeDemo === 'responsive' && <ResponsiveCollapse items={longItems} />}
          {activeDemo === 'icons' && <IconsExample items={itemsWithIcons} />}
          {activeDemo === 'edgeCases' && <EdgeCases />}
          {activeDemo === 'props' && <PropsDocumentation />}
        </div>
      </div>
    </div>
  )
}
