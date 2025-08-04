import { Breadcrumb } from '../../../../nebula/components'
import type { BreadcrumbItem } from '../../../../nebula/components'

interface ResponsiveCollapseProps {
  items: BreadcrumbItem[]
}

export function ResponsiveCollapse({ items }: ResponsiveCollapseProps) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Responsive Collapse
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Automatically collapse long breadcrumbs with ellipsis.
        </p>
      </div>
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 space-y-4">
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full breadcrumb (7 items)</p>
          <Breadcrumb items={items} />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Collapsed to 4 items</p>
          <Breadcrumb items={items} maxItems={4} />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Collapsed to 3 items</p>
          <Breadcrumb items={items} maxItems={3} />
        </div>
      </div>
    </section>
  )
}
