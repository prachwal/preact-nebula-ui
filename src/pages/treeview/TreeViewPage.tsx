import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { DocumentationTab } from '../../components/DocumentationTab'
import { usePathTabPage, PathTabPageConfigs } from '../../hooks'
import { BasicUsageSection, SearchSection, SizesSection, AccessibilitySection } from './sections'

interface PageProps {
  path?: string
}

export function TreeViewPage(_props: Readonly<PageProps>) {
  const { activeTab, setActiveTab, tabs } = usePathTabPage(
    PathTabPageConfigs.withDocumentation('/treeview', [
      { key: 'icons', label: 'Custom Icons' },
      { key: 'selection', label: 'Selection' },
      { key: 'lazy', label: 'Lazy Loading' }
    ])
  )

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
      case 'documentation':
        return <DocumentationTab componentName="treeview" />
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
