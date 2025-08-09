import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { DocumentationTab } from '../../components/DocumentationTab'
import { usePathTabPage, PathTabPageConfigs } from '../../hooks'
import {
  BasicUsageSection,
  SizesSection,
  HalfStarsSection,
  CustomIconsSection,
  StatesSection,
  ValueDisplaySection,
  PropsDocumentation
} from './sections'

interface PageProps {
  readonly path?: string
}

export function RatingPage(_props: Readonly<PageProps>) {
  const { activeTab, setActiveTab, tabs } = usePathTabPage(
    PathTabPageConfigs.withDocumentation('/rating', [
      { key: 'sizes', label: 'Sizes' },
      { key: 'half-stars', label: 'Half Stars' },
      { key: 'custom-icons', label: 'Custom Icons' },
      { key: 'states', label: 'States' },
      { key: 'value-display', label: 'Value Display' }
    ])
  )

  const renderSection = () => {
    switch (activeTab) {
      case 'basic':
        return <BasicUsageSection />
      case 'sizes':
        return <SizesSection />
      case 'half-stars':
        return <HalfStarsSection />
      case 'custom-icons':
        return <CustomIconsSection />
      case 'states':
        return <StatesSection />
      case 'value-display':
        return <ValueDisplaySection />
      case 'props':
        return <PropsDocumentation />
      case 'documentation':
        return <DocumentationTab componentName="rating" />
      default:
        return <BasicUsageSection />
    }
  }

  return (
    <div className="p-6">
      <PageHeader
        title="Rating"
        description="A rating component that allows users to provide star ratings with support for half stars, custom icons, and various states."
      />

      <DemoTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="mt-6">
        {renderSection()}
      </div>
    </div>
  )
}