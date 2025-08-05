import { Tooltip, Button } from '../../../../nebula/components'

export function AccessibilitySection() {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Accessibility Features
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Built-in accessibility features and keyboard navigation support.
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h3 className="text-lg font-medium text-blue-900 dark:text-blue-100 mb-2">
            ⌨️ Keyboard Navigation
          </h3>
          <ul className="text-blue-800 dark:text-blue-200 space-y-1 text-sm">
            <li>• <kbd className="px-2 py-1 bg-white dark:bg-gray-700 border rounded">Tab</kbd> - Focus trigger elements</li>
            <li>• <kbd className="px-2 py-1 bg-white dark:bg-gray-700 border rounded">Enter/Space</kbd> - Activate click triggers</li>
            <li>• <kbd className="px-2 py-1 bg-white dark:bg-gray-700 border rounded">Escape</kbd> - Hide visible tooltips</li>
          </ul>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <h3 className="text-lg font-medium text-green-900 dark:text-green-100 mb-2">
            ♿ ARIA Support
          </h3>
          <ul className="text-green-800 dark:text-green-200 space-y-1 text-sm">
            <li>• Proper ARIA roles and attributes</li>
            <li>• Screen reader announcements</li>
            <li>• Describedby associations</li>
            <li>• Semantic HTML structure</li>
            <li>• High contrast support</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Try Accessibility Features</h3>
          <div className="flex flex-wrap items-center gap-4">
            <Tooltip content="Focus me with Tab, then press Escape to hide" trigger="focus">
              <Button>Focus Trigger</Button>
            </Tooltip>
            
            <Tooltip content="Screen readers will announce this tooltip content" trigger="hover">
              <Button variant="outline">Screen Reader Test</Button>
            </Tooltip>
          </div>
        </div>
      </div>
    </section>
  )
}
