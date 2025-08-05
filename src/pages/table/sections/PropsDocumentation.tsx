const Section = ({ title, description, children }: { title: string, description: string, children: any }) => (
  <section className="mb-12">
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
    {children}
  </section>
)

export function PropsDocumentation() {
  return (
    <Section
      title="Props Reference"
      description="Complete reference for Table component properties."
    >
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Prop
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Default
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Description
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">variant</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">'default' | 'striped' | 'bordered' | 'compact'</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">'default'</td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Visual style of the table</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">size</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">'sm' | 'md' | 'lg'</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">'md'</td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Size of table cells and padding</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">caption</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">string</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">-</td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Table caption for accessibility</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">stickyHeader</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">boolean</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">false</td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Whether table header should stick to top when scrolling</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">sortable</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">boolean</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">false</td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Enable sorting functionality</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">onSort</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{'(column: string, direction: "asc" | "desc") => void'}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">-</td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Callback fired when column is sorted</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">loading</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">boolean</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">false</td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Show loading state with skeleton rows</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">emptyState</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">ReactNode</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">-</td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Content to show when table has no data</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">TableHead Props</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Prop
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Default
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">sortable</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">boolean</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">false</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Enable sorting for this column</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">sortKey</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">string</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">-</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Key to use for sorting this column</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">width</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">string | number</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">-</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Fixed width for the column</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">TableCell Props</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Prop
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Default
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">align</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">'left' | 'center' | 'right'</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">'left'</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Text alignment within the cell</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">colspan</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">number</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">1</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Number of columns this cell spans</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">rowspan</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">number</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">1</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Number of rows this cell spans</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  )
}
