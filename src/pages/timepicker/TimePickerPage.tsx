import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { DocumentationTab } from '../../components/DocumentationTab'
import { usePathTabPage, PathTabPageConfigs } from '../../hooks'
import {
  BasicUsageSection,
  SizesSection,
  StatesSection,
  ConfigurationSection,
  PropsDocumentation
} from './sections'

interface PageProps {
  path?: string
}

export function TimePickerPage(_props: Readonly<PageProps>) {
  const { activeTab, setActiveTab, tabs } = usePathTabPage(
    PathTabPageConfigs.withDocumentation('/timepicker', [
      { key: 'format', label: 'Time Format' },
      { key: 'validation', label: 'Validation' },
      { key: 'sizes', label: 'Sizes' }
    ])
  )

  const renderSection = () => {
    switch (activeTab) {
      case 'basic':
        return <BasicUsageSection />
      case 'sizes':
        return <SizesSection />
      case 'states':
        return <StatesSection />
      case 'configuration':
        return <ConfigurationSection />
      case 'props':
        return <PropsDocumentation />
      case 'documentation':
        return <DocumentationTab componentName="timepicker" />
      default:
        return <BasicUsageSection />
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="TimePicker"
        description="Time selection component with customizable format, precision, and validation options"
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
