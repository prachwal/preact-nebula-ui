import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { DocumentationTab } from '../../components/DocumentationTab'
import { usePathTabPage, PathTabPageConfigs } from '../../hooks'
import {
  BasicUsageSection,
  PositionSection,
  TargetSection,
  OffsetSection,
  AdvancedSection,
  PropsDocumentationSection
} from './sections'

interface PageProps {
  path?: string
}

export function AffixPage(_props: Readonly<PageProps>) {
  const { activeTab, setActiveTab, tabs } = usePathTabPage(
    PathTabPageConfigs.withDocumentation('/affix', [
      { key: 'position', label: 'Position' },
      { key: 'target', label: 'Target' },
      { key: 'offset', label: 'Offset' },
      { key: 'advanced', label: 'Advanced' }
    ])
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'basic':
        return <BasicUsageSection />
      case 'position':
        return <PositionSection />
      case 'target':
        return <TargetSection />
      case 'offset':
        return <OffsetSection />
      case 'advanced':
        return <AdvancedSection />
      case 'props':
        return <PropsDocumentationSection />
      case 'documentation':
        return <DocumentationTab componentName="affix" />
      default:
        return <BasicUsageSection />
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <PageHeader
        title="Affix"
        description="A component that keeps content fixed to the viewport during scroll, useful for navigation menus, toolbars, and other UI elements that should remain visible."
      />

      <div className="mx-auto max-w-7xl px-4 py-12">
        <DemoTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <div className="mt-8">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}
