export function PropsDocumentation() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Props Documentation</h2>
      <p className="text-gray-600 dark:text-gray-400">
        Complete reference for Modal component properties.
      </p>
      
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 dark:border-gray-700 rounded-lg">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">Prop</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">Type</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">Default</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <tr>
              <td className="px-4 py-3 text-sm font-mono text-gray-900 dark:text-white">isOpen</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">boolean</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">-</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Whether the modal is open</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-sm font-mono text-gray-900 dark:text-white">onClose</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">(reason: ModalCloseReason) =&gt; void</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">-</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Callback fired when modal should close</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-sm font-mono text-gray-900 dark:text-white">size</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">'sm' | 'md' | 'lg' | 'xl' | 'full'</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">'md'</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Size variant of the modal</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-sm font-mono text-gray-900 dark:text-white">backdrop</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">boolean | 'static'</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">true</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Backdrop behavior (clickable/static/none)</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-sm font-mono text-gray-900 dark:text-white">keyboard</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">boolean</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">true</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Whether to close on Escape key</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-sm font-mono text-gray-900 dark:text-white">scrollable</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">boolean</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">false</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Whether modal content is scrollable</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-sm font-mono text-gray-900 dark:text-white">centered</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">boolean</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">true</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Whether to center modal vertically</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}
