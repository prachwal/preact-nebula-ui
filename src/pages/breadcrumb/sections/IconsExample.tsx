import { Breadcrumb } from '../../../../nebula/components'
import type { BreadcrumbItem } from '../../../../nebula/components'

interface IconsExampleProps {
  items: BreadcrumbItem[]
}

export function IconsExample({ items }: IconsExampleProps) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          With Icons
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Add icons to breadcrumb items for better visual hierarchy.
        </p>
      </div>
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <Breadcrumb items={items} />
      </div>
      <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
        <pre className="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
{`const itemsWithIcons = [
  { 
    label: 'Dashboard', 
    href: '/dashboard',
    icon: <span className="text-blue-500">📊</span>
  },
  { 
    label: 'Projects', 
    href: '/projects',
    icon: <span className="text-green-500">📁</span>
  },
  { 
    label: 'Current Project', 
    current: true,
    icon: <span className="text-purple-500">🚀</span>
  }
]`}
        </pre>
      </div>
    </section>
  )
}
