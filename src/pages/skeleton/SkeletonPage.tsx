import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { DocumentationTab } from '../../components/DocumentationTab'
import { usePathTabPage, PathTabPageConfigs } from '../../hooks'
import { BasicUsageSection, AnimationSection, ShapesAndSizesSection, InteractiveSection, PropsDocumentation } from './sections'

interface PageProps {
  readonly path?: string
}

export function SkeletonPage(_props: PageProps) {
  const { activeTab, setActiveTab, tabs } = usePathTabPage(
    PathTabPageConfigs.withDocumentation('/skeleton', [
      { key: 'animation', label: 'Animation' },
      { key: 'shapes', label: 'Shapes & Sizes' },
      { key: 'interactive', label: 'Interactive' }
    ])
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageHeader
          title="💀 Skeleton Component"
          description="Skeleton loading placeholders provide visual feedback to users while content is being loaded. They maintain the layout structure and give users an indication of what type of content to expect, improving perceived performance and user experience during loading states."
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
      case 'basic':
        return <BasicUsageSection />
      case 'animation':
        return <AnimationSection />
      case 'shapes':
        return <ShapesAndSizesSection />
      case 'interactive':
        return <InteractiveSection />
      case 'props':
        return <PropsDocumentation />
      case 'documentation':
        return <DocumentationTab componentName="skeleton" />
      default:
        return <BasicUsageSection />
    }
  }
}
