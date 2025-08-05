import { useState } from 'preact/hooks'
import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import {
  BasicUsageSection,
  SizesSection,
  HalfStarsSection,
  CustomIconsSection,
  StatesSection,
  ValueDisplaySection,
  PropsDocumentation
} from './sections'

interface PageProps {
  path?: string
}

export function RatingPage(_props: PageProps) {
  const tabs = [
    { key: 'basic', label: 'Basic Usage' },
    { key: 'sizes', label: 'Sizes' },
    { key: 'half-stars', label: 'Half Stars' },
    { key: 'custom-icons', label: 'Custom Icons' },
    { key: 'states', label: 'States' },
    { key: 'value-display', label: 'Value Display' },
    { key: 'props', label: 'Props' }
  ]

  const [activeTab, setActiveTab] = useState('basic')

  const renderSection = () => {
    switch (activeTab) {
      case 'basic':
        return <BasicUsageSection />
      case 'sizes':
        return <SizesSection />
      case 'half-stars':
        return <HalfStarsSection />
      case 'custom-icons':
        return <CustomIconsSection />
      case 'states':
        return <StatesSection />
      case 'value-display':
        return <ValueDisplaySection />
      case 'props':
        return <PropsDocumentation />
      default:
        return <BasicUsageSection />
    }
  }

  return (
    <div className="p-6">
      <PageHeader
        title="Rating"
        description="A rating component that allows users to provide star ratings with support for half stars, custom icons, and various states."
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