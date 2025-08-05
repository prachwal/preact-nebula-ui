import { useState } from 'preact/hooks'
import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import {
  BasicUsageSection,
  SizesSection,
  StatesSection,
  ValidationSection,
  PropsDocumentation
} from './sections'

interface PageProps {
  path?: string
}

export function DatePickerPage(_props: PageProps) {
  const tabs = [
    { key: 'basic', label: 'Basic Usage' },
    { key: 'sizes', label: 'Sizes' },
    { key: 'states', label: 'States' },
    { key: 'validation', label: 'Validation' },
    { key: 'props', label: 'Props' }
  ]

  const [activeTab, setActiveTab] = useState('basic')

  const renderSection = () => {
    switch (activeTab) {
      case 'basic':
        return <BasicUsageSection />
      case 'sizes':
        return <SizesSection />
      case 'states':
        return <StatesSection />
      case 'validation':
        return <ValidationSection />
      case 'props':
        return <PropsDocumentation />
      default:
        return <BasicUsageSection />
    }
  }

  return (
    <div className="p-6">
      <PageHeader
        title="DatePicker"
        description="A date selection component with calendar interface, validation, and flexible configuration options."
      />
      
      <DemoTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      <div className="mt-6">
        {renderSection()}
      </div>
    </div>
  )
}
