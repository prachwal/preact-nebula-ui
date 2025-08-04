import { Breadcrumb } from '../../../../nebula/components'

export function EdgeCases() {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Edge Cases
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Various edge cases and special configurations.
        </p>
      </div>
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 space-y-4">
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Single item</p>
          <Breadcrumb items={[{ label: 'Current Page', current: true }]} />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Non-clickable items</p>
          <Breadcrumb items={[
            { label: 'Category' },
            { label: 'Subcategory' },
            { label: 'Current', current: true }
          ]} />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Mixed clickable and non-clickable</p>
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Category' },
            { label: 'Products', href: '/products' },
            { label: 'Current', current: true }
          ]} />
        </div>
      </div>
    </section>
  )
}
