import { useState } from 'preact/hooks'
import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { BasicUsageSection } from './sections/BasicUsageSection'
import { SizesSection } from './sections/SizesSection'
import { PositioningSection } from './sections/PositioningSection'
import { ScrollTargetsSection } from './sections/ScrollTargetsSection'
import { PropsDocumentation } from './sections/PropsDocumentation'

interface PageProps {
  path?: string
}

export function AnchorPage(_props: PageProps) {
  const [activeTab, setActiveTab] = useState('basic')

  const tabs = [
    { id: 'basic', label: 'Basic Usage', key: 'basic' },
    { id: 'sizes', label: 'Sizes', key: 'sizes' },
    { id: 'positioning', label: 'Positioning', key: 'positioning' },
    { id: 'targets', label: 'Scroll Targets', key: 'targets' },
    { id: 'props', label: 'Props', key: 'props' }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basic':
        return <BasicUsageSection />
      case 'sizes':
        return <SizesSection />
      case 'positioning':
        return <PositioningSection />
      case 'targets':
        return <ScrollTargetsSection />
      case 'props':
        return <PropsDocumentation />
      default:
        return <BasicUsageSection />
    }
  }

  return (
    <div className="anchor-page">
      <PageHeader
        title="Anchor"
        description="Page anchor navigation with smooth scrolling and active link highlighting"
      />
      
      <DemoTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      <div className="tab-content">
        {renderTabContent()}
      </div>
    </div>
  )
}
