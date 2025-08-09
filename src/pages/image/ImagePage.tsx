import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { DocumentationTab } from '../../components/DocumentationTab'
import { usePathTabPage, PathTabPageConfigs } from '../../hooks'
import {
  BasicUsageSection,
  SizesSection,
  LazyLoadingSection,
  ZoomSection,
  ErrorHandlingSection,
  ResponsiveSection,
  PropsDocumentation
} from './sections'

interface PageProps {
  path?: string
}

export function ImagePage(_props: Readonly<PageProps>) {
  const { activeTab, setActiveTab, tabs } = usePathTabPage(
    PathTabPageConfigs.withDocumentation('/image', [
      { key: 'sizes', label: 'Sizes' },
      { key: 'lazy', label: 'Lazy Loading' },
      { key: 'zoom', label: 'Zoom' },
      { key: 'error', label: 'Error Handling' },
      { key: 'responsive', label: 'Responsive' }
    ])
  )

  const renderSection = () => {
    switch (activeTab) {
      case 'basic':
        return <BasicUsageSection />
      case 'sizes':
        return <SizesSection />
      case 'lazy':
        return <LazyLoadingSection />
      case 'zoom':
        return <ZoomSection />
      case 'error':
        return <ErrorHandlingSection />
      case 'responsive':
        return <ResponsiveSection />
      case 'props':
        return <PropsDocumentation />
      case 'documentation':
        return <DocumentationTab componentName="image" />
      default:
        return <BasicUsageSection />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageHeader
          title="🖼️ Image Component"
          description="Advanced image component with lazy loading, zoom functionality, progressive enhancement, and comprehensive error handling. Features intersection observer-based lazy loading, interactive zoom controls, responsive image support, and graceful fallbacks."
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
}
