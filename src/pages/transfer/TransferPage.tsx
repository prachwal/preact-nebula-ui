import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { DocumentationTab } from '../../components/DocumentationTab'
import { usePathTabPage, PathTabPageConfigs } from '../../hooks'
import { BasicUsageSection, SizesSection } from './sections'

interface PageProps {
  path?: string
}

export function TransferPage(_props: Readonly<PageProps>) {
  const { activeTab, setActiveTab, tabs } = usePathTabPage(
    PathTabPageConfigs.withDocumentation('/transfer', [
      { key: 'sizes', label: 'Sizes' },
      { key: 'search', label: 'Search & Filter' },
      { key: 'advanced', label: 'Advanced' }
    ])
  )

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
