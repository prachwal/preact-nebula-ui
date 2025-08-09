import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { DocumentationTab } from '../../components/DocumentationTab'
import { usePathTabPage, PathTabPageConfigs } from '../../hooks'
import {
  BasicUsageSection,
  SizesSection,
  OrientationSection,
  StatusSection,
  PropsDocumentation
} from './sections'

interface StepsPageProps {
  readonly path?: string
}

export function StepsPage(_props: StepsPageProps) {
  const { activeTab, setActiveTab, tabs } = usePathTabPage(
    PathTabPageConfigs.withDocumentation('/steps', [
      { key: 'sizes', label: 'Sizes' },
      { key: 'orientation', label: 'Orientation' },
      { key: 'status', label: 'Status' }
    ])
  )

  const renderSection = () => {
    switch (activeTab) {
      case 'basic':
        return <BasicUsageSection />
      case 'sizes':
        return <SizesSection />
      case 'orientation':
        return <OrientationSection />
      case 'status':
        return <StatusSection />
      case 'props':
        return <PropsDocumentation />
      case 'documentation':
        return <DocumentationTab componentName="steps" />
      default:
        return <BasicUsageSection />
    }
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Steps"
        description="Navigation component that guides users through a sequence of steps"
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
