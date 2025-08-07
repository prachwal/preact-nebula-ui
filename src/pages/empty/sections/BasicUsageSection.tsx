import { Empty } from '../../../../nebula/components'

export function BasicUsageSection() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Basic Usage
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          The Empty component displays an empty state with customizable illustration and description.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Default Empty State
          </h3>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg border border-gray-200 dark:border-gray-700">
            <Empty />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            With Custom Description
          </h3>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg border border-gray-200 dark:border-gray-700">
            <Empty description="No data available" />
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
      {/* Basic empty state */}
      <Empty />
      
      {/* With custom description */}
      <Empty description="No data available" />
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
