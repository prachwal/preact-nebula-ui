import { useState } from 'preact/hooks'
import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { BasicUsageSection } from './sections/BasicUsageSection'
import { ResponsiveSection } from './sections/ResponsiveSection'
import { SpanningSection } from './sections/SpanningSection'
import { AlignmentSection } from './sections/AlignmentSection'
import { PropsDocumentation } from './sections/PropsDocumentation'

interface PageProps {
  path?: string
}

export function GridPage(_props: PageProps) {
  const [activeTab, setActiveTab] = useState('basic')

  const tabs = [
    { id: 'basic', label: 'Basic Usage', key: 'basic' },
    { id: 'responsive', label: 'Responsive', key: 'responsive' },
    { id: 'spanning', label: 'Spanning', key: 'spanning' },
    { id: 'alignment', label: 'Alignment', key: 'alignment' },
    { id: 'props', label: 'Props', key: 'props' }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basic':
        return <BasicUsageSection />
      case 'responsive':
        return <ResponsiveSection />
      case 'spanning':
        return <SpanningSection />
      case 'alignment':
        return <AlignmentSection />
      case 'props':
        return <PropsDocumentation />
      default:
        return <BasicUsageSection />
    }
  }

  return (
    <div className="grid-page">
      <PageHeader
        title="Grid"
        description="Advanced grid system with responsive breakpoints, gutters, and auto-layout"
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
