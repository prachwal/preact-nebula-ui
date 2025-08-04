export function PropsDocumentation() {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Props
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">Prop</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">Type</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">Default</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <tr>
              <td className="px-4 py-3 text-sm font-mono text-gray-900 dark:text-gray-100">items</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">BreadcrumbItem[]</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">-</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Array of breadcrumb items to display</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-sm font-mono text-gray-900 dark:text-gray-100">separator</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">'arrow' | 'slash' | 'chevron' | ReactNode</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">'arrow'</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Separator between items</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-sm font-mono text-gray-900 dark:text-gray-100">maxItems</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">number</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">0</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Maximum items before collapse (0 = no limit)</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-sm font-mono text-gray-900 dark:text-gray-100">showHome</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">boolean</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">false</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Show home icon at the beginning</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-sm font-mono text-gray-900 dark:text-gray-100">homeHref</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">string</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">'/'</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">URL for home icon link</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-sm font-mono text-gray-900 dark:text-gray-100">className</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">string</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">-</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Additional CSS classes</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}
