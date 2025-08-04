import { useState } from 'preact/hooks'
import { Checkbox } from '@/components/Checkbox'

export function AccessibilitySection() {
  const [keyboardDemo, setKeyboardDemo] = useState(false)
  const [screenReaderDemo, setScreenReaderDemo] = useState(true)
  const [validationDemo, setValidationDemo] = useState(false)
  const [groupDemo, setGroupDemo] = useState({
    option1: true,
    option2: false,
    option3: true
  })

  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Accessibility Features</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8">
          WCAG 2.1 AA compliant checkboxes with full keyboard navigation and screen reader support.
        </p>

        <div class="space-y-12">
          {/* Keyboard Navigation */}
          <div class="space-y-6">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Keyboard Navigation</h3>
            <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
              <div class="flex items-start gap-3">
                <svg class="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                </svg>
                <div>
                  <h4 class="font-medium text-blue-900 dark:text-blue-100 mb-1">Keyboard Instructions</h4>
                  <ul class="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    <li><kbd class="px-2 py-1 bg-blue-100 dark:bg-blue-800 rounded text-xs">Tab</kbd> - Navigate to checkbox</li>
                    <li><kbd class="px-2 py-1 bg-blue-100 dark:bg-blue-800 rounded text-xs">Space</kbd> - Toggle checkbox state</li>
                    <li><kbd class="px-2 py-1 bg-blue-100 dark:bg-blue-800 rounded text-xs">Shift + Tab</kbd> - Navigate backwards</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div class="space-y-4">
              <Checkbox
                label="Keyboard accessible checkbox"
                description="Use Tab to focus, Space to toggle"
                checked={keyboardDemo}
                onChange={(e) => setKeyboardDemo((e.target as HTMLInputElement).checked)}
              />
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Try using Tab to focus and Space to toggle this checkbox.
              </p>
            </div>
          </div>

          {/* Screen Reader Support */}
          <div class="space-y-6">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Screen Reader Support</h3>
            <div class="space-y-4">
              <Checkbox
                label="Screen reader optimized"
                description="This checkbox includes proper ARIA attributes and semantic markup"
                checked={screenReaderDemo}
                onChange={(e) => setScreenReaderDemo((e.target as HTMLInputElement).checked)}
              />
              
              <Checkbox
                label="Indeterminate state announcement"
                description="Screen readers will announce 'mixed' state"
                indeterminate={true}
              />
              
              <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h4 class="font-medium text-gray-900 dark:text-gray-100 mb-2">ARIA Attributes</h4>
                <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li><code>role="checkbox"</code> - Identifies the element as a checkbox</li>
                  <li><code>aria-checked</code> - Announces current state (true/false/mixed)</li>
                  <li><code>aria-describedby</code> - Links to description text</li>
                  <li><code>aria-invalid</code> - Indicates validation errors</li>
                  <li><code>aria-required</code> - Indicates required fields</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Error Announcements */}
          <div class="space-y-6">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Error Announcements</h3>
            <div class="space-y-4">
              <Checkbox
                label="Required field with validation"
                description="This field demonstrates error state announcements"
                checked={validationDemo}
                error={!validationDemo}
                errorMessage={!validationDemo ? "This field is required for account creation" : undefined}
                onChange={(e) => setValidationDemo((e.target as HTMLInputElement).checked)}
              />
              
              <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <div class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                  </svg>
                  <div>
                    <h4 class="font-medium text-yellow-900 dark:text-yellow-100 mb-1">Error Announcement</h4>
                    <p class="text-sm text-yellow-800 dark:text-yellow-200">
                      Error messages use <code>aria-live="polite"</code> to announce changes to screen readers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Group Navigation */}
          <div class="space-y-6">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Group Navigation</h3>
            <div class="space-y-4">
              <fieldset class="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                <legend class="px-2 text-lg font-medium text-gray-900 dark:text-gray-100">
                  Notification Preferences
                </legend>
                <div class="mt-4 space-y-3">
                  <Checkbox
                    label="Email notifications"
                    description="Receive updates via email"
                    checked={groupDemo.option1}
                    onChange={(e) => setGroupDemo(prev => ({
                      ...prev,
                      option1: (e.target as HTMLInputElement).checked
                    }))}
                  />
                  <Checkbox
                    label="SMS notifications"
                    description="Receive updates via text message"
                    checked={groupDemo.option2}
                    onChange={(e) => setGroupDemo(prev => ({
                      ...prev,
                      option2: (e.target as HTMLInputElement).checked
                    }))}
                  />
                  <Checkbox
                    label="Push notifications"
                    description="Receive updates via browser notifications"
                    checked={groupDemo.option3}
                    onChange={(e) => setGroupDemo(prev => ({
                      ...prev,
                      option3: (e.target as HTMLInputElement).checked
                    }))}
                  />
                </div>
              </fieldset>
              
              <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h4 class="font-medium text-gray-900 dark:text-gray-100 mb-2">Grouping Best Practices</h4>
                <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Use <code>&lt;fieldset&gt;</code> and <code>&lt;legend&gt;</code> for related checkboxes</li>
                  <li>• Provide clear group labels and descriptions</li>
                  <li>• Maintain logical tab order within groups</li>
                  <li>• Use consistent labeling patterns</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Focus Management */}
          <div class="space-y-6">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Focus Management</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-3">
                <h4 class="text-lg font-medium text-gray-700 dark:text-gray-300">Focus Indicators</h4>
                <Checkbox
                  label="Visible focus ring"
                  description="Clear focus indication for keyboard users"
                  checked={true}
                />
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Focus ring meets WCAG contrast requirements
                </p>
              </div>
              
              <div class="space-y-3">
                <h4 class="text-lg font-medium text-gray-700 dark:text-gray-300">Focus Behavior</h4>
                <Checkbox
                  label="Focus preservation"
                  description="Focus remains on checkbox after interaction"
                  checked={false}
                />
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  No unexpected focus jumps during interaction
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Code Examples */}
        <div class="mt-12">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">Accessibility Code Examples</h3>
          <div class="space-y-6">
            <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Required Field</h4>
              <pre class="text-sm text-gray-800 dark:text-gray-200">
                <code>{`<Checkbox
  label="Terms and Conditions"
  description="Required to continue"
  required
  error={!accepted}
  errorMessage="You must accept the terms"
  aria-describedby="terms-description"
/>`}</code>
              </pre>
            </div>
            
            <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Grouped Checkboxes</h4>
              <pre class="text-sm text-gray-800 dark:text-gray-200">
                <code>{`<fieldset>
  <legend>Notification Preferences</legend>
  <Checkbox label="Email" name="notifications" value="email" />
  <Checkbox label="SMS" name="notifications" value="sms" />
  <Checkbox label="Push" name="notifications" value="push" />
</fieldset>`}</code>
              </pre>
            </div>
            
            <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Indeterminate State</h4>
              <pre class="text-sm text-gray-800 dark:text-gray-200">
                <code>{`<Checkbox
  label="Select All"
  indeterminate={someSelected}
  checked={allSelected}
  aria-describedby="select-all-description"
/>`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
