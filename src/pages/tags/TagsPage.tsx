import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { DocumentationTab } from '../../components/DocumentationTab'
import { usePathTabPage, PathTabPageConfigs } from '../../hooks'
import {
  BasicUsageSection,
  ColorsSection,
  SizesSection,
  VariantsSection,
  PropsDocumentation
} from './sections'

interface TagsPageProps {
  path?: string
}

export function TagsPage(_props: Readonly<TagsPageProps>) {
  const { activeTab, setActiveTab, tabs } = usePathTabPage(
    PathTabPageConfigs.withDocumentation('/tags', [
      { key: 'colors', label: 'Colors' },
      { key: 'sizes', label: 'Sizes' },
      { key: 'variants', label: 'Variants' }
    ])
  )

  const renderSection = () => {
    switch (activeTab) {
      case 'basic':
        return <BasicUsageSection />
      case 'colors':
        return <ColorsSection />
      case 'sizes':
        return <SizesSection />
      case 'variants':
        return <VariantsSection />
      case 'props':
        return <PropsDocumentation />
      case 'documentation':
        return <DocumentationTab componentName="tags" />
      default:
        return <BasicUsageSection />
    }
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Tags"
        description="Compact elements used for labeling, categorizing, and organizing content"
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
