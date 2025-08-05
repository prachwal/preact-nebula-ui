import { useState } from 'preact/hooks'
import {
  DirectionAndSpacing,
  SpacingVariants,
  AlignmentOptions,
  LayoutExamples,
  PropsDocumentation
} from './sections'
import { PageHeader, DemoTabs, type Tab } from '../../components/layout'

interface PageProps {
  path?: string
}

type DemoType = 'direction' | 'spacing' | 'alignment' | 'examples' | 'props'

export function StackPage(_props: PageProps) {
  const [activeDemo, setActiveDemo] = useState<DemoType>('direction')

  const tabs: Tab[] = [
    { key: 'direction', label: 'Direction & Spacing' },
    { key: 'spacing', label: 'Spacing Variants' },
    { key: 'alignment', label: 'Alignment Options' },
    { key: 'examples', label: 'Layout Examples' },
    { key: 'props', label: 'Props' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <PageHeader 
            title="Stack Component" 
            description="Vertical and horizontal layout with consistent spacing and alignment control"
          />
          <DemoTabs 
            tabs={tabs} 
            activeTab={activeDemo} 
            onTabChange={(tab) => setActiveDemo(tab as DemoType)} 
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeDemo === 'direction' && <DirectionAndSpacing />}
        {activeDemo === 'spacing' && <SpacingVariants />}
        {activeDemo === 'alignment' && <AlignmentOptions />}
        {activeDemo === 'examples' && <LayoutExamples />}
        {activeDemo === 'props' && <PropsDocumentation />}
      </div>
    </div>
  )
}
