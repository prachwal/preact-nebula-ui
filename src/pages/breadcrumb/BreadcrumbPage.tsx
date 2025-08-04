import { 
  getExampleData
} from './ExampleData'
import {
  BasicExample,
  SeparatorVariants,
  HomeIconExample,
  ResponsiveCollapse,
  IconsExample,
  EdgeCases,
  PropsDocumentation
} from './sections'

interface PageProps {
  path?: string
}

export function BreadcrumbPage({}: PageProps) {
  const { basicItems, longItems, itemsWithIcons } = getExampleData()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Breadcrumb
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Hierarchical navigation component showing the current page's location.
        </p>
      </div>

      <div className="space-y-12">
        <BasicExample items={basicItems} />
        <SeparatorVariants items={basicItems} />
        <HomeIconExample items={basicItems} />
        <ResponsiveCollapse items={longItems} />
        <IconsExample items={itemsWithIcons} />
        <EdgeCases />
        <PropsDocumentation />
      </div>
    </div>
  )
}
