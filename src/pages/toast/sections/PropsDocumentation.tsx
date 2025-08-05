import { Section } from './Section'

export function PropsDocumentation() {
  return (
    <Section
      title="Props Documentation"
      description="Complete reference for Toast component properties."
    >
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
              <td className="px-4 py-3 text-sm font-mono text-gray-900 dark:text-white">variant</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">'default' | 'success' | 'warning' | 'error' | 'info'</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">'default'</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Visual style and semantic meaning</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-sm font-mono text-gray-900 dark:text-white">size</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">'sm' | 'md' | 'lg'</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">'md'</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Size of the toast notification</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-sm font-mono text-gray-900 dark:text-white">title</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">string</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">-</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Title of the toast notification</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-sm font-mono text-gray-900 dark:text-white">children</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">ReactNode</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">-</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Content of the toast notification</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-sm font-mono text-gray-900 dark:text-white">dismissible</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">boolean</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">true</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Whether the toast can be manually dismissed</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-sm font-mono text-gray-900 dark:text-white">duration</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">number</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">5000</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Auto-dismiss duration in milliseconds</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-sm font-mono text-gray-900 dark:text-white">icon</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">ReactNode | boolean</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">true</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Custom icon or boolean to show/hide</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-sm font-mono text-gray-900 dark:text-white">onDismiss</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">() =&gt; void</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">-</td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">Callback when toast is dismissed</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Section>
  )
}
