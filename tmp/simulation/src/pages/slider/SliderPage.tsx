import { useState } from 'preact/hooks'
import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { 
  BasicUsageSection, 
  SizesSection, 
  RangeSection, 
  MarksSection, 
  OrientationSection,
  AdvancedSection,
  PropsDocumentation 
} from './sections'

type DemoType = 'basic' | 'sizes' | 'range' | 'marks' | 'orientation' | 'advanced' | 'props'

interface Tab {
  key: DemoType
  label: string
}

interface PageProps {
  path?: string
}

export function SliderPage(_props: PageProps) {
  const [activeDemo, setActiveDemo] = useState<DemoType>('basic')

  const tabs: Tab[] = [
    { key: 'basic', label: 'Basic Usage' },
    { key: 'sizes', label: 'Sizes' },
    { key: 'range', label: 'Range' },
    { key: 'marks', label: 'Marks & Tooltip' },
    { key: 'orientation', label: 'Orientation' },
    { key: 'advanced', label: 'Advanced' },
    { key: 'props', label: 'Props' }
  ]

  const renderActiveDemo = () => {
    switch (activeDemo) {
      case 'basic':
        return <BasicUsageSection />
      case 'sizes':
        return <SizesSection />
      case 'range':
        return <RangeSection />
      case 'marks':
        return <MarksSection />
      case 'orientation':
        return <OrientationSection />
      case 'advanced':
        return <AdvancedSection />
      case 'props':
        return <PropsDocumentation />
      default:
        return <BasicUsageSection />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageHeader
          title="Slider"
          description="Range input component with single and dual handles, step marks, and tooltips"
          version="1.0.0"
          status="planned"
        />
        
        <DemoTabs
          tabs={tabs}
          activeTab={activeDemo}
          onTabChange={setActiveDemo}
        />
        
        <div className="mt-8">
          {renderActiveDemo()}
        </div>
      </div>
    </div>
  )
}


