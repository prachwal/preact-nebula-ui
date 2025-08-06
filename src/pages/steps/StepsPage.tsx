import { useState } from 'preact/hooks'
import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import {
  BasicUsageSection,
  SizesSection,
  OrientationSection,
  StatusSection,
  PropsDocumentation
} from './sections'

interface StepsPageProps {
  path?: string
}

export function StepsPage(_props: StepsPageProps) {
  const [activeTab, setActiveTab] = useState('basic')

  const tabs = [
    { key: 'basic', id: 'basic', label: 'Basic Usage' },
    { key: 'sizes', id: 'sizes', label: 'Sizes' },
    { key: 'orientation', id: 'orientation', label: 'Orientation' },
    { key: 'status', id: 'status', label: 'Status' },
    { key: 'props', id: 'props', label: 'Props' }
  ]

  const renderSection = () => {
    switch (activeTab) {
      case 'basic':
        return <BasicUsageSection />
      case 'sizes':
        return <SizesSection />
      case 'orientation':
        return <OrientationSection />
      case 'status':
        return <StatusSection />
      case 'props':
        return <PropsDocumentation />
      default:
        return <BasicUsageSection />
    }
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Steps"
        description="Navigation component that guides users through a sequence of steps"
      />
      
      <DemoTabs 
        tabs={tabs} 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
      
      <div className="mt-8">
        {renderSection()}
      </div>
    </div>
  )
}
