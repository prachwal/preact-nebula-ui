import { useState } from 'preact/hooks'
import {
  DirectionAndSpacing,
  SpacingVariants,
  AlignmentOptions,
  LayoutExamples
} from './sections'
import { PageHeader, NavigationTabs, type DemoType } from '.'

interface PageProps {
  path?: string
}

export function StackPage(_props: PageProps) {
  const [activeDemo, setActiveDemo] = useState<DemoType>('direction')

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <PageHeader 
            title="Stack Component" 
            description="Vertical and horizontal layout with consistent spacing and alignment control"
          />
          <NavigationTabs activeDemo={activeDemo} onDemoChange={setActiveDemo} />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeDemo === 'direction' && <DirectionAndSpacing />}
        {activeDemo === 'spacing' && <SpacingVariants />}
        {activeDemo === 'alignment' && <AlignmentOptions />}
        {activeDemo === 'examples' && <LayoutExamples />}
      </div>
    </div>
  )
}
