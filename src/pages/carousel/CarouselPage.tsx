import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { DocumentationTab } from '../../components/DocumentationTab'
import { usePathTabPage, PathTabPageConfigs } from '../../hooks'

// Import sections
import {
  BasicUsageSection,
  SizesSection,
  AutoplaySection,
  InfiniteSection,
  NavigationSection,
  MultipleSlideSection,
  PropsDocumentationSection
} from './sections'

interface CarouselPageProps {
  path?: string
}

export function CarouselPage(_props: Readonly<CarouselPageProps>) {
  const { activeTab, setActiveTab, tabs } = usePathTabPage(
    PathTabPageConfigs.withDocumentation('/carousel', [
      { key: 'sizes', label: 'Sizes' },
      { key: 'autoplay', label: 'Autoplay' },
      { key: 'infinite', label: 'Infinite Loop' },
      { key: 'navigation', label: 'Navigation' },
      { key: 'multiple', label: 'Multiple Slides' }
    ])
  )

  const renderSection = () => {
    switch (activeTab) {
      case 'basic':
        return <BasicUsageSection />
      case 'sizes':
        return <SizesSection />
      case 'autoplay':
        return <AutoplaySection />
      case 'infinite':
        return <InfiniteSection />
      case 'navigation':
        return <NavigationSection />
      case 'multiple':
        return <MultipleSlideSection />
      case 'props':
        return <PropsDocumentationSection />
      case 'documentation':
        return <DocumentationTab componentName="carousel" />
      default:
        return <BasicUsageSection />
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <PageHeader
        title="Carousel"
        description="A responsive carousel component for displaying slides with navigation controls, autoplay, and touch support."
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
