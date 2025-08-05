export function PropsDocumentation() {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Props Documentation
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Complete API reference for the Popover component.
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
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">trigger</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">ComponentChildren</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">required</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Element that triggers the popover</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">children</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">ComponentChildren</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">required</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Content to display in the popover</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">position</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">PopoverPosition</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">'bottom'</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Position relative to trigger</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">triggerOn</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">'click' | 'hover' | 'focus' | 'manual'</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">'click'</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">How the popover is triggered</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">withArrow</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">boolean</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">true</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Whether to show arrow pointing to trigger</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">closeOnClickOutside</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">boolean</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">true</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Whether clicking outside closes popover</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">closeOnEscape</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">boolean</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">true</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Whether escape key closes popover</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">openDelay</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">number</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">0</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Delay before showing (hover trigger)</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">closeDelay</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">number</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">0</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Delay before hiding (hover trigger)</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">offset</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">number</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">8</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Distance from trigger element</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}
