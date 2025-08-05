import { Tabs, TabList, Tab, TabPanels, TabPanel } from '../../../../nebula/components'

export function AccessibilitySection() {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Accessibility Features
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Built-in accessibility features and keyboard navigation.
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h3 className="text-lg font-medium text-blue-900 dark:text-blue-100 mb-2">
            ⌨️ Keyboard Navigation
          </h3>
          <ul className="text-blue-800 dark:text-blue-200 space-y-1 text-sm">
            <li><kbd className="px-2 py-1 bg-white dark:bg-gray-700 border rounded">Tab</kbd> - Move focus to next focusable element</li>
            <li><kbd className="px-2 py-1 bg-white dark:bg-gray-700 border rounded">Shift + Tab</kbd> - Move focus to previous focusable element</li>
            <li><kbd className="px-2 py-1 bg-white dark:bg-gray-700 border rounded">Arrow Left/Right</kbd> - Navigate between tabs (horizontal)</li>
            <li><kbd className="px-2 py-1 bg-white dark:bg-gray-700 border rounded">Arrow Up/Down</kbd> - Navigate between tabs (vertical)</li>
            <li><kbd className="px-2 py-1 bg-white dark:bg-gray-700 border rounded">Enter/Space</kbd> - Activate focused tab</li>
            <li><kbd className="px-2 py-1 bg-white dark:bg-gray-700 border rounded">Home</kbd> - Move to first tab</li>
            <li><kbd className="px-2 py-1 bg-white dark:bg-gray-700 border rounded">End</kbd> - Move to last tab</li>
          </ul>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <h3 className="text-lg font-medium text-green-900 dark:text-green-100 mb-2">
            ♿ ARIA Support
          </h3>
          <ul className="text-green-800 dark:text-green-200 space-y-1 text-sm">
            <li>• Proper ARIA roles and attributes</li>
            <li>• Screen reader announcements</li>
            <li>• Focus management</li>
            <li>• Semantic HTML structure</li>
            <li>• High contrast support</li>
          </ul>
        </div>

        <Tabs defaultValue="a11y" className="mt-6">
          <TabList>
            <Tab value="a11y">Try Navigation</Tab>
            <Tab value="focus">Focus Test</Tab>
            <Tab value="screen">Screen Reader</Tab>
          </TabList>
          <TabPanels>
            <TabPanel value="a11y">
              <div className="p-4 text-gray-900 dark:text-gray-100">
                <p>Try navigating these tabs using only your keyboard. The component is fully accessible and supports all standard keyboard interactions.</p>
              </div>
            </TabPanel>
            <TabPanel value="focus">
              <div className="p-4 text-gray-900 dark:text-gray-100">
                <p>Focus management ensures that screen readers and keyboard users can navigate efficiently through the interface.</p>
              </div>
            </TabPanel>
            <TabPanel value="screen">
              <div className="p-4 text-gray-900 dark:text-gray-100">
                <p>Screen readers will announce tab selections and provide context about the current panel content.</p>
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </section>
  )
}
