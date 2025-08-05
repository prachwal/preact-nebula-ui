export function AccessibilitySection() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Accessibility</h2>
      <p className="text-gray-600 dark:text-gray-400">
        Table component accessibility features and best practices.
      </p>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
            Semantic Structure
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
            <li>Proper HTML table semantics with thead, tbody, th, and td elements</li>
            <li>Column headers are associated with data cells</li>
            <li>Table caption when provided for context</li>
            <li>Scope attributes for complex tables</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
            Keyboard Navigation
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
            <li><kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">Tab</kbd> - Navigate through focusable elements</li>
            <li><kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">Arrow Keys</kbd> - Navigate between cells (when interactive)</li>
            <li><kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">Space/Enter</kbd> - Activate interactive elements</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
            Screen Reader Support
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
            <li>Table structure is announced by screen readers</li>
            <li>Row and column headers are read with cell content</li>
            <li>Table summary and caption provide context</li>
            <li>Sort order and interactive states are announced</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
