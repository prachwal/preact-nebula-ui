import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { DocumentationTab } from '../../components/DocumentationTab'
import { usePathTabPage, PathTabPageConfigs } from '../../hooks'
import { BasicUsageSection } from './sections/BasicUsageSection'
import { SizesSection } from './sections/SizesSection'
import { PositioningSection } from './sections/PositioningSection'
import { ScrollTargetsSection } from './sections/ScrollTargetsSection'
import { PropsDocumentation } from './sections/PropsDocumentation'

interface PageProps {
  path?: string
}

export function AnchorPage(_props: Readonly<PageProps>) {
  const { activeTab, setActiveTab, tabs } = usePathTabPage(
    PathTabPageConfigs.withDocumentation('/anchor', [
      { key: 'sizes', label: 'Sizes' },
      { key: 'positioning', label: 'Positioning' },
      { key: 'targets', label: 'Scroll Targets' }
    ])
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basic':
        return <BasicUsageSection />
      case 'sizes':
        return <SizesSection />
      case 'positioning':
        return <PositioningSection />
      case 'targets':
        return <ScrollTargetsSection />
      case 'props':
        return <PropsDocumentation />
      case 'documentation':
        return <DocumentationTab componentName="anchor" />
      default:
        return <BasicUsageSection />
    }
  }

  return (
    <div className="anchor-page">
      <PageHeader
        title="Anchor"
        description="Page anchor navigation with smooth scrolling and active link highlighting"
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
