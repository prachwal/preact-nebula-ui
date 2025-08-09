import {
  DirectionAndSpacing,
  SpacingVariants,
  AlignmentOptions,
  LayoutExamples,
  PropsDocumentation
} from './sections'
import { PageHeader, DemoTabs } from '../../components/layout'
import { DocumentationTab } from '../../components/DocumentationTab'
import { usePathTabPage, PathTabPageConfigs } from '../../hooks'

interface PageProps {
  readonly path?: string
}

export function StackPage(_props: Readonly<PageProps>) {
  const { activeTab, setActiveTab, tabs } = usePathTabPage(
    PathTabPageConfigs.withDocumentation('/stack', [
      { key: 'spacing', label: 'Spacing Variants' },
      { key: 'alignment', label: 'Alignment Options' },
      { key: 'examples', label: 'Layout Examples' }
    ])
  )

  const renderSection = () => {
    switch (activeTab) {
      case 'basic':
        return <DirectionAndSpacing />
      case 'direction':
        return <DirectionAndSpacing />
      case 'spacing':
        return <SpacingVariants />
      case 'alignment':
        return <AlignmentOptions />
      case 'examples':
        return <LayoutExamples />
      case 'props':
        return <PropsDocumentation />
      case 'documentation':
        return <DocumentationTab componentName="stack" />
      default:
        return <DirectionAndSpacing />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <PageHeader
            title="Stack Component"
            description="Vertical and horizontal layout with consistent spacing and alignment control"
          />
          <DemoTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderSection()}
      </div>
    </div>
  )
}
