import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { DocumentationTab } from '../../components/DocumentationTab'
import { usePathTabPage, PathTabPageConfigs } from '../../hooks'
import { BasicUsageSection } from './sections/BasicUsageSection'
import { ResponsiveSection } from './sections/ResponsiveSection'
import { SpanningSection } from './sections/SpanningSection'
import { AlignmentSection } from './sections/AlignmentSection'
import { PropsDocumentation } from './sections/PropsDocumentation'

interface PageProps {
  readonly path?: string
}

export function GridPage(_props: Readonly<PageProps>) {
  const { activeTab, setActiveTab, tabs } = usePathTabPage(
    PathTabPageConfigs.withDocumentation('/grid', [
      { key: 'responsive', label: 'Responsive' },
      { key: 'spanning', label: 'Column Spanning' },
      { key: 'gutter', label: 'Gutter & Spacing' }
    ])
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basic':
        return <BasicUsageSection />
      case 'responsive':
        return <ResponsiveSection />
      case 'spanning':
        return <SpanningSection />
      case 'alignment':
        return <AlignmentSection />
      case 'props':
        return <PropsDocumentation />
      case 'documentation':
        return <DocumentationTab componentName="grid" />
      default:
        return <BasicUsageSection />
    }
  }

  return (
    <div className="grid-page">
      <PageHeader
        title="Grid"
        description="Advanced grid system with responsive breakpoints, gutters, and auto-layout"
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
