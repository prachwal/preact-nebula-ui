import { DemoTabs } from '../../components/DemoTabs'
import { BasicUsageSection } from './sections/BasicUsageSection'
import { ThemeSection } from './sections/ThemeSection'
import { LocaleSection } from './sections/LocaleSection'
import { ComponentDefaultsSection } from './sections/ComponentDefaultsSection'
import { PropsDocumentationSection } from './sections/PropsDocumentationSection'

export function ConfigProviderPage() {
  const tabs = [
    {
      id: 'basic',
      label: 'Basic Usage',
      content: <BasicUsageSection />
    },
    {
      id: 'theme',
      label: 'Theme',
      content: <ThemeSection />
    },
    {
      id: 'locale',
      label: 'Internationalization',
      content: <LocaleSection />
    },
    {
      id: 'defaults',
      label: 'Component Defaults',
      content: <ComponentDefaultsSection />
    },
    {
      id: 'api',
      label: 'API Reference',
      content: <PropsDocumentationSection />
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          ConfigProvider
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Global configuration provider for theme, locale, and component defaults.
        </p>
      </div>

      <DemoTabs tabs={tabs} />
    </div>
  )
}
