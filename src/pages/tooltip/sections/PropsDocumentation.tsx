export function PropsDocumentation() {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Props Documentation
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Complete API reference for the Tooltip component.
        </p>
      </div>
      
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
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">content</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">ComponentChildren</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">required</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Content to display in the tooltip</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">position</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">TooltipPosition</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">'top'</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Position relative to trigger element</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">trigger</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">'hover' | 'focus' | 'click' | 'manual'</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">'hover'</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">How the tooltip is triggered</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">delay</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">number</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">100</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Delay before showing (ms)</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">closeDelay</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">number</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">100</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Delay before hiding (ms)</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">disabled</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">boolean</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">false</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Whether tooltip is disabled</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">hasArrow</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">boolean</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">true</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Whether to show arrow pointer</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">size</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">'sm' | 'md' | 'lg'</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">'md'</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Size of the tooltip</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">colorScheme</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">'gray' | 'primary' | 'secondary' | 'success' | 'warning' | 'error'</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">'gray'</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Color theme</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">offset</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">number</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">8</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Distance from trigger (px)</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">flip</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">boolean</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">true</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Auto-flip when constrained</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">shift</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">boolean</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">true</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Auto-shift to stay in viewport</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">maxWidth</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">string</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">'320px'</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Maximum width of tooltip</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}
