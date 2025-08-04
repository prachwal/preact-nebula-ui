import { useState } from 'preact/hooks'
import { Checkbox } from '@/components/Checkbox'

export function BasicUsageSection() {
  const [basicChecked, setBasicChecked] = useState(false)
  const [withLabel, setWithLabel] = useState(true)
  const [withDescription, setWithDescription] = useState(false)
  const [indeterminate, setIndeterminate] = useState(true)

  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Basic Checkbox Usage</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8">
          Simple checkbox implementations with different configurations.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Basic Checkbox */}
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Basic Checkbox
            </h3>
            <div class="space-y-3">
              <Checkbox
                checked={basicChecked}
                onChange={(e) => setBasicChecked((e.target as HTMLInputElement).checked)}
              />
              <p class="text-sm text-gray-600 dark:text-gray-400">
                State: {basicChecked ? 'Checked' : 'Unchecked'}
              </p>
            </div>
          </div>

          {/* With Label */}
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
              With Label
            </h3>
            <div class="space-y-3">
              <Checkbox
                label="I agree to the terms and conditions"
                checked={withLabel}
                onChange={(e) => setWithLabel((e.target as HTMLInputElement).checked)}
              />
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Clickable label for better UX
              </p>
            </div>
          </div>

          {/* With Description */}
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
              With Description
            </h3>
            <div class="space-y-3">
              <Checkbox
                label="Newsletter subscription"
                description="Get updates about new features and releases"
                checked={withDescription}
                onChange={(e) => setWithDescription((e.target as HTMLInputElement).checked)}
              />
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Additional context with description text
              </p>
            </div>
          </div>

          {/* Indeterminate State */}
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Indeterminate State
            </h3>
            <div class="space-y-3">
              <Checkbox
                label="Select all items"
                indeterminate={indeterminate}
                onChange={() => setIndeterminate(!indeterminate)}
              />
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Tri-state checkbox for "select all" scenarios
              </p>
            </div>
          </div>
        </div>

        {/* Code Examples */}
        <div class="mt-8">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Code Examples
          </h3>
          <div class="space-y-4">
            <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Basic Usage
              </h4>
              <pre class="text-sm text-gray-800 dark:text-gray-200">
                <code>{`<Checkbox
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
/>`}</code>
              </pre>
            </div>
            
            <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                With Label and Description
              </h4>
              <pre class="text-sm text-gray-800 dark:text-gray-200">
                <code>{`<Checkbox
  label="Newsletter subscription"
  description="Get updates about new features"
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
/>`}</code>
              </pre>
            </div>

            <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Indeterminate State
              </h4>
              <pre class="text-sm text-gray-800 dark:text-gray-200">
                <code>{`<Checkbox
  label="Select all"
  indeterminate={true}
  onChange={handleToggle}
/>`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
