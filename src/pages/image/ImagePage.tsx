import { useState } from 'preact/hooks'
import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { 
  BasicUsageSection,
  SizesSection,
  LazyLoadingSection,
  ZoomSection,
  ErrorHandlingSection,
  ResponsiveSection,
  PropsDocumentation
} from './sections'

type DemoType = 'basic' | 'sizes' | 'lazy' | 'zoom' | 'error' | 'responsive' | 'props'

interface PageProps {
  path?: string
}

export function ImagePage(_props: PageProps) {
  const [activeTab, setActiveTab] = useState<DemoType>('basic')

  const tabs = [
    { key: 'basic', label: 'Basic Usage' },
    { key: 'sizes', label: 'Sizes' },
    { key: 'lazy', label: 'Lazy Loading' },
    { key: 'zoom', label: 'Zoom' },
    { key: 'error', label: 'Error Handling' },
    { key: 'responsive', label: 'Responsive' },
    { key: 'props', label: 'Props' }
  ]

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
          onTabChange={(tab) => setActiveTab(tab as DemoType)}
        />

        <div className="mt-8">
          {activeTab === 'basic' && <BasicUsageSection />}
          {activeTab === 'sizes' && <SizesSection />}
          {activeTab === 'lazy' && <LazyLoadingSection />}
          {activeTab === 'zoom' && <ZoomSection />}
          {activeTab === 'error' && <ErrorHandlingSection />}
          {activeTab === 'responsive' && <ResponsiveSection />}
          {activeTab === 'props' && <PropsDocumentation />}
        </div>
      </div>
    </div>
  )
}
