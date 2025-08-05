import { h } from 'preact'

export function PropsDocumentation() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Badge Props</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Prop</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Type</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Default</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">variant</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">'default'</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Visual style variant of the badge</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">size</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">'xs' | 'sm' | 'md' | 'lg'</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">'md'</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Size of the badge</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">shape</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">'rounded' | 'pill' | 'square'</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">'rounded'</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Shape variant of the badge</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">children</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">ReactNode</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">-</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Content to display inside the badge</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">count</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">number</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">-</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Numeric count to display in the badge</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">max</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">number</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">99</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Maximum count to display before showing "max+"</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">dot</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">boolean</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">false</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Display badge as a small dot without content</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">showZero</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">boolean</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">false</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Whether to show badge when count is zero</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">className</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">string</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">-</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Additional CSS classes to apply to the badge</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h4 className="text-md font-semibold mb-3">Usage Examples</h4>
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <pre className="text-sm overflow-x-auto">
            <code>{`import { Badge } from '@nebula/components'

// Basic text badge
<Badge>New</Badge>

// Count badge
<Badge count={5} />

// Different variants
<Badge variant="primary">Primary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="danger">Danger</Badge>

// Different sizes
<Badge size="xs">Small</Badge>
<Badge size="lg">Large</Badge>

// Different shapes
<Badge shape="pill">Pill Badge</Badge>
<Badge shape="square">Square</Badge>

// Dot badge
<Badge dot variant="success" />

// Count with max
<Badge count={150} max={99} />

// Show zero count
<Badge count={0} showZero />`}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
