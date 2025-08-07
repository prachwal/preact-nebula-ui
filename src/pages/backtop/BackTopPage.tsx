import { useState } from 'preact/hooks'
import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { BasicUsageSection } from './sections/BasicUsageSection'
import { VariantsSection } from './sections/VariantsSection'
import { VisibilitySection } from './sections/VisibilitySection'
import { CustomTargetsSection } from './sections/CustomTargetsSection'
import { PropsDocumentation } from './sections/PropsDocumentation'

interface PageProps {
  path?: string
}

export function BackTopPage(_props: PageProps) {
  const [activeTab, setActiveTab] = useState('basic')

  const tabs = [
    { id: 'basic', label: 'Basic Usage', key: 'basic' },
    { id: 'variants', label: 'Variants', key: 'variants' },
    { id: 'visibility', label: 'Visibility', key: 'visibility' },
    { id: 'targets', label: 'Custom Targets', key: 'targets' },
    { id: 'props', label: 'Props', key: 'props' }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basic':
        return <BasicUsageSection />
      case 'variants':
        return <VariantsSection />
      case 'visibility':
        return <VisibilitySection />
      case 'targets':
        return <CustomTargetsSection />
      case 'props':
        return <PropsDocumentation />
      default:
        return <BasicUsageSection />
    }
  }

  return (
    <div className="backtop-page">
      <PageHeader
        title="BackTop"
        description="Back to top button with smooth scrolling and visibility threshold"
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
