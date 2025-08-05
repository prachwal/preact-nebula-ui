import { Section } from './Section'

export function AccessibilitySection() {
  return (
    <Section
      title="Accessibility"
      description="Toast components are built with accessibility in mind."
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
            ARIA Support
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
            <li><code>role="alert"</code> for error and warning toasts</li>
            <li><code>role="status"</code> for success and info toasts</li>
            <li><code>aria-live</code> regions for screen reader announcements</li>
            <li><code>aria-label</code> for dismiss buttons</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
            Keyboard Navigation
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
            <li><kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">Escape</kbd> - Dismisses focused toast</li>
            <li><kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">Enter/Space</kbd> - Activates dismiss button</li>
            <li><kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">Tab</kbd> - Navigates to dismiss button</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
            Screen Reader Support
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
            <li>Toast content is announced when displayed</li>
            <li>Variant information is conveyed through roles</li>
            <li>Dismiss functionality is clearly labeled</li>
            <li>Auto-dismiss timing is appropriate for reading</li>
          </ul>
        </div>
      </div>
    </Section>
  )
}
