import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { DocumentationTab } from '../../components/DocumentationTab'
import { usePathTabPage, PathTabPageConfigs } from '../../hooks'
import { BasicUsageSection, VariantsSection, SizesSection, StatesSection, FeaturesSection, ExamplesSection, PropsDocumentation } from './sections'

interface PageProps {
  readonly path?: string
}

export function TextareaPage(_props: PageProps) {
  const { activeTab, setActiveTab, tabs } = usePathTabPage(
    PathTabPageConfigs.withDocumentation('/textarea', [
      { key: 'variants', label: 'Variants' },
      { key: 'sizes', label: 'Sizes' },
      { key: 'states', label: 'States' },
      { key: 'features', label: 'Features' },
      { key: 'examples', label: 'Examples' }
    ])
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageHeader
          title=" Textarea Component"
          description="Multi-line text input with validation, sizing, and advanced features"
        />

        <DemoTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <div className="mt-8">
          {activeTab === 'basic' && <BasicUsageSection />}
          {activeTab === 'variants' && <VariantsSection />}
          {activeTab === 'sizes' && <SizesSection />}
          {activeTab === 'states' && <StatesSection />}
          {activeTab === 'features' && <FeaturesSection />}
          {activeTab === 'examples' && <ExamplesSection />}
          {activeTab === 'props' && <PropsDocumentation />}
          {activeTab === 'documentation' && <DocumentationTab componentName="textarea" />}
        </div>
      </div>
    </div>
  )
}

export default TextareaPage
