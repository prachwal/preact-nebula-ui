import { Empty, Button } from '../../../../nebula/components'

export function VariantsSection() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Variants
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Different visual styles for various empty state scenarios.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Available Variants
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4 text-center">
                Default
              </h4>
              <Empty variant="default" description="Default empty state" />
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4 text-center">
                Simple
              </h4>
              <Empty variant="simple" description="Simple empty state" />
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4 text-center">
                Search
              </h4>
              <Empty variant="search" description="No search results found" />
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4 text-center">
                Error
              </h4>
              <Empty variant="error" description="Something went wrong" />
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4 text-center">
                Network
              </h4>
              <Empty variant="network" description="Network connection failed" />
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4 text-center">
                Data
              </h4>
              <Empty variant="data" description="No data to display" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            With Actions
          </h3>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg border border-gray-200 dark:border-gray-700">
            <Empty 
              variant="search"
              description="No search results found"
            >
              <div className="flex gap-2 mt-4">
                <Button size="sm">Clear Filters</Button>
                <Button size="sm" variant="outline">Try Different Keywords</Button>
              </div>
            </Empty>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Code Examples
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                Different Variants
              </h4>
              <div className="bg-slate-800 dark:bg-gray-950 text-gray-100 dark:text-gray-200 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-800">
                <pre className="text-sm">
                  <code>{`// Different semantic variants
<Empty variant="default" description="No items found" />
<Empty variant="search" description="No search results" />
<Empty variant="error" description="Something went wrong" />
<Empty variant="network" description="Connection failed" />
<Empty variant="data" description="No data available" />`}</code>
                </pre>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                With Action Buttons
              </h4>
              <div className="bg-slate-800 dark:bg-gray-950 text-gray-100 dark:text-gray-200 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-800">
                <pre className="text-sm">
                  <code>{`<Empty 
  variant="error"
  description="Failed to load data"
>
  <div className="flex gap-2 mt-4">
    <Button onClick={retryLoad}>Try Again</Button>
    <Button variant="outline" onClick={goHome}>Go Home</Button>
  </div>
</Empty>`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
