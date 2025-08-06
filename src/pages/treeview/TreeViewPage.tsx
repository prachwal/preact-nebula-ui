import { useState } from 'preact/hooks'
import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { BasicUsageSection, SearchSection, SizesSection, AccessibilitySection } from './sections'

interface PageProps {
  path?: string
}

const tabs = [
  { key: 'basic', label: 'Basic Usage' },
  { key: 'search', label: 'Search' },
  { key: 'sizes', label: 'Sizes' },
  { key: 'accessibility', label: 'Accessibility' }
]

export function TreeViewPage(_props: PageProps) {
  const [activeTab, setActiveTab] = useState('basic')

  const renderContent = () => {
    switch (activeTab) {
      case 'basic':
        return <BasicUsageSection />
      case 'search':
        return <SearchSection />
      case 'sizes':
        return <SizesSection />
      case 'accessibility':
        return <AccessibilitySection />
      default:
        return <BasicUsageSection />
    }
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="TreeView"
        description="Hierarchical data display with expand/collapse, selection, and search capabilities. Perfect for file systems, navigation menus, and organizational structures."
      />
      
      <DemoTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      <div className="space-y-8">
        {renderContent()}
      </div>
    </div>
  )
}
