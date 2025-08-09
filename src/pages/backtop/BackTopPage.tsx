import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { DocumentationTab } from '../../components/DocumentationTab'
import { usePathTabPage, PathTabPageConfigs } from '../../hooks'
import { BasicUsageSection } from './sections/BasicUsageSection'
import { VariantsSection } from './sections/VariantsSection'
import { VisibilitySection } from './sections/VisibilitySection'
import { CustomTargetsSection } from './sections/CustomTargetsSection'
import { PropsDocumentation } from './sections/PropsDocumentation'

interface PageProps {
  path?: string
}

export function BackTopPage(_props: PageProps) {
  const { activeTab, setActiveTab, tabs } = usePathTabPage(
    PathTabPageConfigs.withDocumentation('/backtop', [
      { key: 'variants', label: 'Variants' },
      { key: 'visibility', label: 'Visibility' },
      { key: 'targets', label: 'Custom Targets' }
    ])
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basic':
        return <BasicUsageSection />
      case 'variants':
        return <VariantsSection />
      case 'visibility':
        return <VisibilitySection />
      case 'targets':
        return <CustomTargetsSection />
      case 'props':
        return <PropsDocumentation />
      case 'documentation':
        return <DocumentationTab componentName="backtop" />
      default:
        return <BasicUsageSection />
    }
  }

  return (
    <div className="backtop-page">
      <PageHeader
        title="BackTop"
        description="Back to top button with smooth scrolling and visibility threshold"
      />

      <DemoTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="tab-content">
        {renderTabContent()}
      </div>
    </div>
  )
}
