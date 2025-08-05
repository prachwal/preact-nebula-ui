import { useState } from 'preact/hooks'
import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import {
  BasicUsageSection,
  SizesSection,
  StatesSection,
  ConfigurationSection,
  PropsDocumentation
} from './sections'

interface PageProps {
  path?: string
}

export function TimePickerPage(_props: PageProps) {
  const tabs = [
    { key: 'basic', label: 'Basic Usage' },
    { key: 'sizes', label: 'Sizes' },
    { key: 'states', label: 'States' },
    { key: 'configuration', label: 'Configuration' },
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
      case 'configuration':
        return <ConfigurationSection />
      case 'props':
        return <PropsDocumentation />
      default:
        return <BasicUsageSection />
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="TimePicker"
        description="Time selection component with customizable format, precision, and validation options"
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
