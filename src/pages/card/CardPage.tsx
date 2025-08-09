import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { DocumentationTab } from '../../components/DocumentationTab'
import { usePathTabPage, PathTabPageConfigs } from '../../hooks'
import { BasicUsageSection, VariantsSection, StructureSection, ExamplesSection, PropsDocumentation } from './sections'

interface PageProps {
  readonly path?: string
}

export function CardPage(_props: PageProps) {
  const { activeTab, setActiveTab, tabs } = usePathTabPage(
    PathTabPageConfigs.withDocumentation('/card', [
      { key: 'variants', label: 'Card Variants' },
      { key: 'structure', label: 'Card Structure' },
      { key: 'examples', label: 'Real Examples' }
    ])
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageHeader
          title="🃏 Card Component"
          description="Content container with header, body, and footer sections for organized layouts"
        />

        <DemoTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <div className="mt-8">
          {activeTab === 'basic' && <BasicUsageSection />}
          {activeTab === 'variants' && <VariantsSection />}
          {activeTab === 'structure' && <StructureSection />}
          {activeTab === 'examples' && <ExamplesSection />}
          {activeTab === 'props' && <PropsDocumentation />}
          {activeTab === 'documentation' && <DocumentationTab componentName="card" />}
        </div>
      </div>
    </div>
  )
}

export default CardPage
