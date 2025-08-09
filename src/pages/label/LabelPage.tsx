import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { DocumentationTab } from '../../components/DocumentationTab'
import { usePathTabPage, PathTabPageConfigs } from '../../hooks'
import { BasicSection, RequiredSection, SizingSection, ExamplesSection, PropsDocumentation } from './sections'

interface PageProps {
  readonly path?: string
}

export function LabelPage(_props: Readonly<PageProps>) {
  const { activeTab, setActiveTab, tabs } = usePathTabPage(
    PathTabPageConfigs.withDocumentation('/label', [
      { key: 'required', label: 'Required Labels' },
      { key: 'sizing', label: 'Sizing' },
      { key: 'examples', label: 'Examples' }
    ])
  )

  const renderSection = () => {
    switch (activeTab) {
      case 'basic':
        return <BasicSection />
      case 'required':
        return <RequiredSection />
      case 'sizing':
        return <SizingSection />
      case 'examples':
        return <ExamplesSection />
      case 'props':
        return <PropsDocumentation />
      case 'documentation':
        return <DocumentationTab componentName="label" />
      default:
        return <BasicSection />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageHeader
          title=" Label Component"
          description="Form label component with accessibility features and flexible styling"
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
    </div>
  )
}

export default LabelPage
