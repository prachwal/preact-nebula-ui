import { Label } from '../../../../nebula/components/Label'

export function PropsDocumentationSection() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Props Documentation</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Complete reference for all Affix component properties and their usage.
        </p>
      </div>

      <div className="space-y-6">
        {/* Main Props Table */}
        <div>
          <Label className="text-gray-700 dark:text-gray-300 mb-4 block text-lg">Component Props</Label>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 dark:border-gray-600 rounded-lg">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-600">
                    Prop
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-600">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-600">
                    Default
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-600">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="px-4 py-3 text-sm font-mono text-purple-600 dark:text-purple-400">
                    children
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                    ReactNode
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    -
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    Content to be affixed
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="px-4 py-3 text-sm font-mono text-purple-600 dark:text-purple-400">
                    position
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                    'top' | 'bottom'
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    'top'
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    Position where content should stick
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="px-4 py-3 text-sm font-mono text-purple-600 dark:text-purple-400">
                    offsetTop
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                    number
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    0
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    Distance from top when position is 'top'
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="px-4 py-3 text-sm font-mono text-purple-600 dark:text-purple-400">
                    offsetBottom
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                    number
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    0
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    Distance from bottom when position is 'bottom'
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="px-4 py-3 text-sm font-mono text-purple-600 dark:text-purple-400">
                    target
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                    {`() => HTMLElement | null`}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    {`() => window`}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    Function returning the scroll container element
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="px-4 py-3 text-sm font-mono text-purple-600 dark:text-purple-400">
                    onChange
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                    {`(affixed: boolean) => void`}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    undefined
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    Callback when affix state changes
                  </td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <td className="px-4 py-3 text-sm font-mono text-purple-600 dark:text-purple-400">
                    className
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300">
                    string
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    undefined
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                    Additional CSS classes for the affix container
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Usage Examples */}
        <div>
          <Label className="text-gray-700 dark:text-gray-300 mb-4 block text-lg">Usage Examples</Label>
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Basic Usage
              </Label>
              <pre className="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
{`<Affix>
  <div>Content to stick</div>
</Affix>`}
              </pre>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                With Position and Offset
              </Label>
              <pre className="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
{`<Affix position="top" offsetTop={20}>
  <nav>Navigation menu</nav>
</Affix>`}
              </pre>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Custom Target Container
              </Label>
              <pre className="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
{`const containerRef = useRef<HTMLDivElement>(null)

<Affix target={() => containerRef.current}>
  <div>Sticky content</div>
</Affix>`}
              </pre>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                With State Tracking
              </Label>
              <pre className="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
{`const [isAffixed, setIsAffixed] = useState(false)

<Affix onChange={setIsAffixed}>
  <div className={isAffixed ? 'shadow-lg' : ''}>
    {isAffixed ? 'Stuck!' : 'Normal'}
  </div>
</Affix>`}
              </pre>
            </div>
          </div>
        </div>

        {/* Accessibility */}
        <div>
          <Label className="text-gray-700 dark:text-gray-300 mb-4 block text-lg">Accessibility</Label>
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">ARIA Support</h4>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>• Supports all standard ARIA attributes</li>
                <li>• aria-label for describing the affix purpose</li>
                <li>• aria-describedby for additional context</li>
                <li>• role attribute for semantic meaning</li>
              </ul>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">Keyboard Navigation</h4>
              <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
                <li>• Maintains focus management when affixed</li>
                <li>• Preserves tab order and keyboard accessibility</li>
                <li>• Interactive elements remain accessible</li>
              </ul>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900 dark:text-yellow-100 mb-2">Screen Reader Support</h4>
              <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
                <li>• Placeholder element is hidden from screen readers</li>
                <li>• Content changes are announced appropriately</li>
                <li>• Works with aria-live regions</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Performance Notes */}
        <div>
          <Label className="text-gray-700 dark:text-gray-300 mb-4 block text-lg">Performance Considerations</Label>
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <li>• Uses ResizeObserver for efficient dimension tracking</li>
                <li>• Throttled scroll event handling for smooth performance</li>
                <li>• Automatic cleanup of event listeners and observers</li>
                <li>• Minimal DOM manipulation and reflows</li>
                <li>• CSS transforms for optimal positioning performance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
