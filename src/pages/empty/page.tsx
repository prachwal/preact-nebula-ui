import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { DocumentationTab } from '../../components/DocumentationTab'
import { usePathTabPage, PathTabPageConfigs } from '../../hooks'
import { BasicUsageSection } from './sections/BasicUsageSection'
import { VariantsSection } from './sections/VariantsSection'
import { SizesSection } from './sections/SizesSection'
import { PropsDocumentationSection } from './sections/PropsDocumentationSection'

interface PageProps {
  path?: string
}

export function EmptyPage(_props: Readonly<PageProps>) {
  const { activeTab, setActiveTab, tabs } = usePathTabPage(
    PathTabPageConfigs.withDocumentation('/empty', [
      { key: 'variants', label: 'Variants' },
      { key: 'sizes', label: 'Sizes' }
    ])
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'basic':
        return <BasicUsageSection />
      case 'variants':
        return <VariantsSection />
      case 'sizes':
        return <SizesSection />
      case 'props':
        return <PropsDocumentationSection />
      case 'documentation':
        return <DocumentationTab componentName="empty" />
      default:
        return <BasicUsageSection />
    }
  }

  return (
    <div className="empty-page">
      <PageHeader
        title="📭 Empty"
        description="Display meaningful empty states with customizable illustrations and actions."
      />
      <DemoTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="demo-content">
        {renderContent()}
      </div>
    </div>
  )
}
