export function PropsDocumentation() {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Props Documentation
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Complete API reference for all Tabs components.
        </p>
      </div>
      
      <div className="space-y-8">
        {/* Tabs Props */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Tabs Props</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Prop</th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Type</th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Default</th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">defaultValue</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">string</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">-</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Default selected tab (uncontrolled)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">value</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">string</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">-</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Selected tab value (controlled)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">onChange</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">(value: string) =&gt; void</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">-</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Callback when tab selection changes</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">orientation</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">'horizontal' | 'vertical'</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">'horizontal'</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Tab list orientation</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">variant</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">'line' | 'enclosed' | 'soft-rounded'</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">'line'</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Visual style variant</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">size</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">'sm' | 'md' | 'lg'</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">'md'</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Size of the tabs</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">colorScheme</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">'primary' | 'secondary' | 'success' | 'warning' | 'error'</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">'primary'</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Color theme</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Tab Props */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Tab Props</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Prop</th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Type</th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Default</th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">value</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">string</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">required</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Unique identifier for the tab</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">disabled</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">boolean</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">false</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Whether the tab is disabled</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* TabPanel Props */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">TabPanel Props</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Prop</th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Type</th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Default</th>
                  <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">value</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">string</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">required</td>
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Corresponding tab value</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
