import { useState } from 'preact/hooks'
import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { DocumentationTab } from '../../components/DocumentationTab'
import { BasicUsageSection, AnimationSection, ShapesAndSizesSection, InteractiveSection, PropsDocumentation } from './sections'

type DemoType = 'basic' | 'animation' | 'shapes' | 'interactive' | 'props' | 'documentation'

interface Tab {
  key: DemoType
  label: string
}

interface PageProps {
  readonly path?: string
}

export function SkeletonPage(_props: PageProps) {
  const [activeDemo, setActiveDemo] = useState<DemoType>('basic')

  const tabs: Tab[] = [
    { key: 'basic', label: 'Basic Usage' },
    { key: 'animation', label: 'Animation' },
    { key: 'shapes', label: 'Shapes & Sizes' },
    { key: 'interactive', label: 'Interactive' },
    { key: 'props', label: 'Props' },
    { key: 'documentation', label: 'Documentation' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageHeader
          title="💀 Skeleton Component"
          description="Skeleton loading placeholders provide visual feedback to users while content is being loaded. They maintain the layout structure and give users an indication of what type of content to expect, improving perceived performance and user experience during loading states."
        />

        <DemoTabs
          tabs={tabs}
          activeTab={activeDemo}
          onTabChange={(tab) => setActiveDemo(tab as DemoType)}
        />

        <div className="mt-8">
          {activeDemo === 'basic' && <BasicUsageSection />}
          {activeDemo === 'animation' && <AnimationSection />}
          {activeDemo === 'shapes' && <ShapesAndSizesSection />}
          {activeDemo === 'interactive' && <InteractiveSection />}
          {activeDemo === 'props' && <PropsDocumentation />}
          {activeDemo === 'documentation' && <DocumentationTab componentName="skeleton" />}
        </div>
      </div>
    </div>
  )
}
