import { useState } from 'preact/hooks'
import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { DocumentationTab } from '../../components/DocumentationTab'
import {
  BasicUsageSection,
  SizesSection,
  OrientationSection,
  StatusSection,
  PropsDocumentation
} from './sections'

type TabType = 'basic' | 'sizes' | 'orientation' | 'status' | 'props' | 'documentation'

interface StepsPageProps {
  readonly path?: string
}

export function StepsPage(_props: StepsPageProps) {
  const [activeTab, setActiveTab] = useState<TabType>('basic')

  const tabs = [
    { key: 'basic', id: 'basic', label: 'Basic Usage' },
    { key: 'sizes', id: 'sizes', label: 'Sizes' },
    { key: 'orientation', id: 'orientation', label: 'Orientation' },
    { key: 'status', id: 'status', label: 'Status' },
    { key: 'props', id: 'props', label: 'Props' },
    { key: 'documentation', id: 'documentation', label: 'Documentation' }
  ]

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
        onTabChange={(tab) => setActiveTab(tab as TabType)}
      />

      <div className="mt-8">
        {renderSection()}
      </div>
    </div>
  )
}
