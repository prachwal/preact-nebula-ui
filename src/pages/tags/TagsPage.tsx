import { useState } from 'preact/hooks'
import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import {
  BasicUsageSection,
  ColorsSection,
  SizesSection,
  VariantsSection,
  PropsDocumentation
} from './sections'

interface TagsPageProps {
  path?: string
}

export function TagsPage(_props: TagsPageProps) {
  const [activeTab, setActiveTab] = useState('basic')

  const tabs = [
    { key: 'basic', id: 'basic', label: 'Basic Usage' },
    { key: 'colors', id: 'colors', label: 'Colors' },
    { key: 'sizes', id: 'sizes', label: 'Sizes' },
    { key: 'variants', id: 'variants', label: 'Variants' },
    { key: 'props', id: 'props', label: 'Props' }
  ]

  const renderSection = () => {
    switch (activeTab) {
      case 'basic':
        return <BasicUsageSection />
      case 'colors':
        return <ColorsSection />
      case 'sizes':
        return <SizesSection />
      case 'variants':
        return <VariantsSection />
      case 'props':
        return <PropsDocumentation />
      default:
        return <BasicUsageSection />
    }
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Tags"
        description="Compact elements used for labeling, categorizing, and organizing content"
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
