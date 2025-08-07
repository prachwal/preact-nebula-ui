import { Empty } from '../../../../nebula/components'

export function SizesSection() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Sizes
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Different sizes for various layout contexts.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Size Comparison
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4 text-center">
                Small
              </h4>
              <Empty size="small" description="Small empty state" />
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4 text-center">
                Default
              </h4>
              <Empty size="default" description="Default empty state" />
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4 text-center">
                Large
              </h4>
              <Empty size="large" description="Large empty state" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            When to Use Each Size
          </h3>
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                Small Size
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Use in compact spaces like cards, sidebars, or table cells where vertical space is limited.
              </p>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">
                Default Size
              </h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                Perfect for most use cases including list views, content areas, and modal dialogs.
              </p>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2">
                Large Size
              </h4>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                Ideal for full-page empty states, landing pages, or when the empty state is the primary content.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Code Example
          </h3>
          <div className="bg-slate-800 dark:bg-gray-950 text-gray-100 dark:text-gray-200 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-800">
            <pre className="text-sm">
              <code>{`import { Empty } from 'nebula-ui'

function MyComponent() {
  return (
    <div>
      {/* Small for compact spaces */}
      <Empty size="small" description="No items" />
      
      {/* Default for most use cases */}
      <Empty size="default" description="No data available" />
      
      {/* Large for full-page states */}
      <Empty size="large" description="Welcome! Start by adding content." />
    </div>
  )
}`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
