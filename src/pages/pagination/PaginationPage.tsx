import { useState } from 'preact/hooks'
import {
  BasicUsageSection,
  VariantsSection,
  InteractiveSection,
  AccessibilitySection,
  type DemoType
} from './sections'
import { PageHeader, NavigationTabs } from '.'

interface PageProps {
  path?: string
}

export function PaginationPage(_props: PageProps) {
  const [activeDemo, setActiveDemo] = useState<DemoType>('basic')

  const renderActiveSection = () => {
    switch (activeDemo) {
      case 'basic':
        return <BasicUsageSection />
      case 'variants':
        return <VariantsSection />
      case 'interactive':
        return <InteractiveSection />
      case 'accessibility':
        return <AccessibilitySection />
      default:
        return <BasicUsageSection />
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <PageHeader />
      <NavigationTabs activeDemo={activeDemo} onDemoChange={setActiveDemo} />
      {renderActiveSection()}
    </div>
  )
}
