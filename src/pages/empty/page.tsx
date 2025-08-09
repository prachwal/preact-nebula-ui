import { DemoTabs } from '../../components/DemoTabs'
import { DocumentationTab } from '../../components/DocumentationTab'
import { BasicUsageSection } from './sections/BasicUsageSection'
import { VariantsSection } from './sections/VariantsSection'
import { SizesSection } from './sections/SizesSection'
import { PropsDocumentationSection } from './sections/PropsDocumentationSection'

interface PageProps {
  path?: string
}

export function EmptyPage(_props: Readonly<PageProps>) {
  const tabs = [
    {
      id: 'basic',
      label: 'Basic Usage',
      content: <BasicUsageSection />
    },
    {
      id: 'variants',
      label: 'Variants',
      content: <VariantsSection />
    },
    {
      id: 'sizes',
      label: 'Sizes',
      content: <SizesSection />
    },
    {
      id: 'api',
      label: 'API Reference',
      content: <PropsDocumentationSection />
    },
    {
      id: 'documentation',
      label: 'Documentation',
      content: <DocumentationTab componentName="empty" />
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          📭 Empty
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Display meaningful empty states with customizable illustrations and actions.
        </p>
      </div>

      <DemoTabs tabs={tabs} />
    </div>
  )
}
