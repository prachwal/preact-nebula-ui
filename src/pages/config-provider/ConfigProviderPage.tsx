import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { DocumentationTab } from '../../components/DocumentationTab'
import { usePathTabPage, PathTabPageConfigs } from '../../hooks'
import {
  BasicUsageSection,
  ThemeSection,
  LocaleSection,
  ComponentDefaultsSection,
  PropsDocumentationSection
} from './sections'

interface PageProps {
  path?: string
  tab?: string
}

export function ConfigProviderPage(_props: PageProps) {
  const tabConfig = PathTabPageConfigs.withDocumentation('/config-provider', [
    { key: 'theme', label: 'Theme' },
    { key: 'locale', label: 'Locale' },
    { key: 'defaults', label: 'Component Defaults' }
  ])

  const { activeTab, setActiveTab, tabs } = usePathTabPage(tabConfig)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageHeader
          title="🔧 ConfigProvider Component"
          description="Global configuration provider for theme management, internationalization, and component defaults across your entire application."
        />

        <DemoTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <div className="mt-8">
          {activeTab === 'basic' && <BasicUsageSection />}
          {activeTab === 'theme' && <ThemeSection />}
          {activeTab === 'locale' && <LocaleSection />}
          {activeTab === 'defaults' && <ComponentDefaultsSection />}
          {activeTab === 'props' && <PropsDocumentationSection />}
          {activeTab === 'documentation' && <DocumentationTab componentName="configprovider" />}
        </div>
      </div>
    </div>
  )
}
