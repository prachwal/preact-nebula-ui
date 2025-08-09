import { PageHeader } from '../../components/layout/PageHeader'
import { usePathTabPage, PathTabPageConfigs } from '../../hooks'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { DocumentationTab } from '../../components/DocumentationTab'
import { SizesSection, PaddingSection, CenteringSection, CombinationsSection, PropsDocumentation } from './sections'

interface PageProps {
  path?: string
}

export default function ContainerPage(_props: Readonly<PageProps>) {
  const { activeTab, setActiveTab, tabs } = usePathTabPage(
    PathTabPageConfigs.withDocumentation('/container', [
      { key: 'sizes', label: 'Sizes' },
      { key: 'padding', label: 'Padding' },
      { key: 'centering', label: 'Centering' },
      { key: 'combinations', label: 'Combinations' }
    ])
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageHeader
          title="Container Component"
          description="Layout container with configurable sizing, padding, and centering options."
        />

        <DemoTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <div className="mt-8">
          {activeTab === 'sizes' && <SizesSection />}
          {activeTab === 'padding' && <PaddingSection />}
          {activeTab === 'centering' && <CenteringSection />}
          {activeTab === 'combinations' && <CombinationsSection />}
          {activeTab === 'props' && <PropsDocumentation />}
          {activeTab === 'documentation' && <DocumentationTab componentName="container" />}
        </div>
      </div>
    </div>
  );
}
