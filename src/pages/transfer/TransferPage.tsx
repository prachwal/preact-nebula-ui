import { useState } from 'preact/hooks'
import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { DocumentationTab } from '../../components/DocumentationTab'
import { BasicUsageSection, SizesSection } from './sections'

interface PageProps {
  path?: string
}

const tabs = [
  { key: 'basic', label: 'Basic Usage' },
  { key: 'sizes', label: 'Sizes' },
  { key: 'documentation', label: 'Documentation' }
]

export function TransferPage(_props: Readonly<PageProps>) {
  const [activeTab, setActiveTab] = useState('basic')

  const renderContent = () => {
    switch (activeTab) {
      case 'basic':
        return <BasicUsageSection />
      case 'sizes':
        return <SizesSection />
      case 'documentation':
        return <DocumentationTab componentName="transfer" />
      default:
        return <BasicUsageSection />
    }
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Transfer"
        description="Dual-list component for selecting and moving items between lists. Perfect for file management, user permissions, and bulk operations with search and filtering capabilities."
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
