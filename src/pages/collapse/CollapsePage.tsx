import { useState } from 'preact/hooks'
import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { DocumentationTab } from '../../components/DocumentationTab'
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

export function CollapsePage(_props: CollapsePageProps) {
  const [activeTab, setActiveTab] = useState('basic')

  const tabs = [
    { key: 'basic', id: 'basic', label: 'Basic Usage' },
    { key: 'accordion', id: 'accordion', label: 'Accordion' },
    { key: 'nested', id: 'nested', label: 'Nested' },
    { key: 'customization', id: 'customization', label: 'Customization' },
    { key: 'props', id: 'props', label: 'Props' },
    { key: 'documentation', id: 'documentation', label: 'Documentation' }
  ]

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
