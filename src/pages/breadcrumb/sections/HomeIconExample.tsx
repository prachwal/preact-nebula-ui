import { Breadcrumb } from '../../../../nebula/components'
import type { BreadcrumbItem } from '../../../../nebula/components'

interface HomeIconExampleProps {
  items: BreadcrumbItem[]
}

export function HomeIconExample({ items }: HomeIconExampleProps) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Home Icon
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Add a home icon at the beginning of the breadcrumb.
        </p>
      </div>
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 space-y-4">
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">With home icon</p>
          <Breadcrumb items={items} showHome />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Custom home URL</p>
          <Breadcrumb items={items} showHome homeHref="/dashboard" />
        </div>
      </div>
    </section>
  )
}
