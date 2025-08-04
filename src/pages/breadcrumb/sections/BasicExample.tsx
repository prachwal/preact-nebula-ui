import { Breadcrumb } from '../../../../nebula/components'
import type { BreadcrumbItem } from '../../../../nebula/components'

interface BasicExampleProps {
  items: BreadcrumbItem[]
}

export function BasicExample({ items }: BasicExampleProps) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Basic Usage
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Simple breadcrumb with navigation path.
        </p>
      </div>
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <Breadcrumb items={items} />
      </div>
      <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
        <pre className="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
{`const items = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Electronics', href: '/products/electronics' },
  { label: 'Laptops', current: true }
]

<Breadcrumb items={items} />`}
        </pre>
      </div>
    </section>
  )
}
