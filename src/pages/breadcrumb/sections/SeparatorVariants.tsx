import { Breadcrumb } from '../../../../nebula/components'
import type { BreadcrumbItem } from '../../../../nebula/components'

interface SeparatorVariantsProps {
  items: BreadcrumbItem[]
}

export function SeparatorVariants({ items }: SeparatorVariantsProps) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Separator Variants
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Different separator styles for breadcrumb navigation.
        </p>
      </div>
      <div className="space-y-4">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Arrow (default)</p>
            <Breadcrumb items={items} separator="arrow" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Slash</p>
            <Breadcrumb items={items} separator="slash" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Chevron</p>
            <Breadcrumb items={items} separator="chevron" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Custom</p>
            <Breadcrumb items={items} separator={<span className="text-blue-500">•</span>} />
          </div>
        </div>
      </div>
    </section>
  )
}
