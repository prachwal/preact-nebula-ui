import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { DocumentationTab } from '../../components/DocumentationTab'
import { usePathTabPage, PathTabPageConfigs } from '../../hooks'
import {
  BasicUsageSection,
  VariantsSection,
  SizesSection,
  ToastManagerSection,
  FeaturesSection,
  AccessibilitySection,
  PropsDocumentation
} from './sections'

interface PageProps {
  readonly path?: string
}

export function ToastPage(_props: PageProps) {
  const { activeTab, setActiveTab, tabs } = usePathTabPage(
    PathTabPageConfigs.withDocumentation('/toast', [
      { key: 'variants', label: 'Variants' },
      { key: 'sizes', label: 'Sizes' },
      { key: 'manager', label: 'Toast Manager' },
      { key: 'features', label: 'Features' },
      { key: 'accessibility', label: 'Accessibility' }
    ])
  )

  const renderSection = () => {
    switch (activeTab) {
      case 'basic':
        return <BasicUsageSection />
      case 'variants':
        return <VariantsSection />
      case 'sizes':
        return <SizesSection />
      case 'manager':
        return <ToastManagerSection />
      case 'features':
        return <FeaturesSection />
      case 'accessibility':
        return <AccessibilitySection />
      case 'props':
        return <PropsDocumentation />
      case 'documentation':
        return <DocumentationTab componentName="toast" />
      default:
        return <BasicUsageSection />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageHeader
          title="🔔 Toast Notifications"
          description="Temporary notifications that provide feedback about actions or system status."
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
