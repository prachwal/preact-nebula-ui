export function PropsDocumentation() {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Drawer Props
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Complete reference for all available Drawer component properties.
        </p>
      </div>
      
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
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">false</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Controls whether the drawer is visible</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-sm font-mono text-gray-900 dark:text-white">onClose</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">() =&gt; void</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">-</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Callback fired when the drawer should close</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-sm font-mono text-gray-900 dark:text-white">position</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">'left' | 'right' | 'top' | 'bottom'</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">'right'</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Position from which the drawer slides in</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-sm font-mono text-gray-900 dark:text-white">size</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">'sm' | 'md' | 'lg' | 'xl' | 'full'</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">'md'</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Size of the drawer (width for left/right, height for top/bottom)</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-sm font-mono text-gray-900 dark:text-white">closeOnEscape</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">boolean</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">true</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Whether pressing Escape closes the drawer</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-sm font-mono text-gray-900 dark:text-white">closeOnOverlayClick</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">boolean</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">true</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Whether clicking the overlay closes the drawer</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-sm font-mono text-gray-900 dark:text-white">className</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">string</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">-</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Additional CSS classes for the drawer content</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-sm font-mono text-gray-900 dark:text-white">children</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">ReactNode</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">-</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Content to render inside the drawer</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Size Dimensions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Horizontal Drawers (left/right)</h4>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <li><code>sm</code>: 320px width</li>
              <li><code>md</code>: 480px width</li>
              <li><code>lg</code>: 640px width</li>
              <li><code>xl</code>: 768px width</li>
              <li><code>full</code>: 100% width</li>
            </ul>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Vertical Drawers (top/bottom)</h4>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <li><code>sm</code>: 200px height</li>
              <li><code>md</code>: 300px height</li>
              <li><code>lg</code>: 400px height</li>
              <li><code>xl</code>: 500px height</li>
              <li><code>full</code>: 100% height</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
