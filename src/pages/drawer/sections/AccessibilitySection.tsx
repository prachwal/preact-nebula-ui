export function AccessibilitySection() {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Accessibility Features
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          The Drawer component includes comprehensive accessibility features for optimal user experience.
        </p>
      </div>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
            Keyboard Navigation
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
            <li><kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">Escape</kbd> - Closes the drawer</li>
            <li><kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">Tab</kbd> - Cycles through focusable elements within the drawer</li>
            <li><kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">Shift + Tab</kbd> - Cycles backwards through focusable elements</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
            ARIA Attributes
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
            <li><code>role="dialog"</code> - Identifies the drawer as a dialog</li>
            <li><code>aria-modal="true"</code> - Indicates the drawer is modal</li>
            <li><code>aria-labelledby</code> - References the drawer title</li>
            <li><code>aria-describedby</code> - References the drawer description</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
            Focus Management
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
            <li>Focus is trapped within the drawer when open</li>
            <li>Focus returns to the trigger element when closed</li>
            <li>First focusable element receives initial focus</li>
            <li>Tab cycling is contained within the drawer</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
            Screen Reader Support
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
            <li>Drawer opening is announced to screen readers</li>
            <li>Purpose and content are clearly described</li>
            <li>Navigation instructions are provided</li>
            <li>State changes are communicated effectively</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
