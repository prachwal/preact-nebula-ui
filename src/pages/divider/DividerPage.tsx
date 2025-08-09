import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { DocumentationTab } from '../../components/DocumentationTab'
import { usePathTabPage, PathTabPageConfigs } from '../../hooks'
import { OrientationSection, VariantsSection, TextSection, PropsDocumentation } from './sections'

interface PageProps {
  readonly path?: string
}

export function DividerPage(_props: Readonly<PageProps>) {
  const { activeTab, setActiveTab, tabs } = usePathTabPage(
    PathTabPageConfigs.withDocumentation('/divider', [
      { key: 'orientation', label: 'Orientation' },
      { key: 'variants', label: 'Line Variants' },
      { key: 'text', label: 'With Text' }
    ])
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageHeader
          title="Divider Component"
          description="Visual separator with horizontal/vertical orientations and text support."
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

  function renderSection() {
    switch (activeTab) {
      case 'orientation':
        return <OrientationSection />
      case 'variants':
        return <VariantsSection />
      case 'text':
        return <TextSection />
      case 'props':
        return <PropsDocumentation />
      case 'documentation':
        return <DocumentationTab componentName="divider" />
      default:
        return <OrientationSection />
    }
  }
}
