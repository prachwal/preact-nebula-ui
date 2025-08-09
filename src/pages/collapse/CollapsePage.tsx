import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { DocumentationTab } from '../../components/DocumentationTab'
import { usePathTabPage, PathTabPageConfigs } from '../../hooks'
import {
  BasicUsageSection,
  AccordionSection,
  NestedSection,
  CustomizationSection,
  PropsDocumentation
} from './sections'

interface CollapsePageProps {
  path?: string
}

export function CollapsePage(_props: Readonly<CollapsePageProps>) {
  const { activeTab, setActiveTab, tabs } = usePathTabPage(
    PathTabPageConfigs.withDocumentation('/collapse', [
      { key: 'accordion', label: 'Accordion' },
      { key: 'nested', label: 'Nested' },
      { key: 'customization', label: 'Customization' }
    ])
  )

  const renderSection = () => {
    switch (activeTab) {
      case 'basic':
        return <BasicUsageSection />
      case 'accordion':
        return <AccordionSection />
      case 'nested':
        return <NestedSection />
      case 'customization':
        return <CustomizationSection />
      case 'props':
        return <PropsDocumentation />
      case 'documentation':
        return <DocumentationTab componentName="collapse" />
      default:
        return <BasicUsageSection />
    }
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Collapse"
        description="Hide and show content sections with smooth expanding and collapsing animations"
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
