import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { DocumentationTab } from '../../components/DocumentationTab'
import { usePathTabPage, PathTabPageConfigs } from '../../hooks'
import { getExampleData } from './ExampleData'
import {
  BasicExample,
  SeparatorVariants,
  HomeIconExample,
  ResponsiveCollapse,
  IconsExample,
  EdgeCases,
  PropsDocumentation
} from './sections'

interface PageProps {
  readonly path?: string
}

export function BreadcrumbPage(_props: PageProps) {
  const { activeTab, setActiveTab, tabs } = usePathTabPage(
    PathTabPageConfigs.withDocumentation('/breadcrumb', [
      { key: 'separators', label: 'Separators' },
      { key: 'homeIcon', label: 'Home Icon' },
      { key: 'responsive', label: 'Responsive' },
      { key: 'icons', label: 'Icons' },
      { key: 'edgeCases', label: 'Edge Cases' }
    ])
  )
  const { basicItems, longItems, itemsWithIcons } = getExampleData()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageHeader
          title=" Breadcrumb Component"
          description="Hierarchical navigation component showing the current page's location within the site structure."
        />

        <DemoTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <div className="mt-8">
          {activeTab === 'basic' && <BasicExample items={basicItems} />}
          {activeTab === 'separators' && <SeparatorVariants items={basicItems} />}
          {activeTab === 'homeIcon' && <HomeIconExample items={basicItems} />}
          {activeTab === 'responsive' && <ResponsiveCollapse items={longItems} />}
          {activeTab === 'icons' && <IconsExample items={itemsWithIcons} />}
          {activeTab === 'edgeCases' && <EdgeCases />}
          {activeTab === 'props' && <PropsDocumentation />}
          {activeTab === 'documentation' && <DocumentationTab componentName="breadcrumb" />}
        </div>
      </div>
    </div>
  )
}
