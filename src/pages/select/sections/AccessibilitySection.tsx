import { useState } from 'preact/hooks'
import { Select } from '../../../../nebula/components'

const accessibilityOptions = [
  { value: 'high', label: 'High contrast mode', description: 'For users with visual impairments' },
  { value: 'large', label: 'Large text', description: 'Increased font size for better readability' },
  { value: 'motion', label: 'Reduced motion', description: 'Minimize animations and transitions' },
  { value: 'screen', label: 'Screen reader optimized', description: 'Enhanced ARIA support' },
]

const languageOptions = [
  { value: 'en', label: 'English', description: 'English language interface' },
  { value: 'es', label: 'Español', description: 'Spanish language interface' },
  { value: 'fr', label: 'Français', description: 'French language interface' },
  { value: 'de', label: 'Deutsch', description: 'German language interface' },
  { value: 'zh', label: '中文', description: 'Chinese language interface' },
]

const requiredOptions = [
  { value: 'option1', label: 'Required Option 1' },
  { value: 'option2', label: 'Required Option 2' },
  { value: 'option3', label: 'Required Option 3' },
]

export function AccessibilitySection() {
  const [accessibilitySettings, setAccessibilitySettings] = useState<string[]>([])
  const [language, setLanguage] = useState<string>('')
  const [requiredField, setRequiredField] = useState<string>('')
  const [showValidation, setShowValidation] = useState(false)

  const handleSubmit = (e: Event) => {
    e.preventDefault()
    setShowValidation(true)
  }

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Accessibility Features
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Select components are built with accessibility in mind, featuring proper ARIA attributes, 
          keyboard navigation, and screen reader support.
        </p>
      </div>

      {/* ARIA Features */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          ARIA Compliance
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label 
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                id="accessibility-label"
              >
                Accessibility Settings
              </label>
              <Select
                options={accessibilityOptions}
                value={accessibilitySettings}
                onChange={(value: string | string[]) => setAccessibilitySettings(value as string[])}
                multiple
                placeholder="Configure accessibility options..."
                aria-labelledby="accessibility-label"
                aria-describedby="accessibility-description"
              />
              <p 
                id="accessibility-description"
                className="mt-2 text-sm text-gray-500 dark:text-gray-400"
              >
                Select multiple accessibility features to enable. Use arrow keys to navigate options.
              </p>
            </div>

            {accessibilitySettings.length > 0 && (
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
                  Active Settings ({accessibilitySettings.length})
                </h4>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  {accessibilitySettings.map(settingId => {
                    const setting = accessibilityOptions.find(opt => opt.value === settingId)
                    return setting ? (
                      <li key={settingId}>
                        <strong>{setting.label}:</strong> {setting.description}
                      </li>
                    ) : null
                  })}
                </ul>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Interface Language
            </label>
            <Select
              options={languageOptions}
              value={language}
              onChange={(value: string | string[]) => setLanguage(value as string)}
              searchable
              placeholder="Search and select language..."
              aria-label="Interface language selector"
            />
          </div>
        </div>
      </div>

      {/* Keyboard Navigation */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          Keyboard Navigation
        </h3>
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Test keyboard navigation with the select below:
          </p>
          <div className="max-w-md">
            <Select
              options={languageOptions}
              placeholder="Use Tab to focus, Enter/Space to open, arrows to navigate..."
              searchable
            />
          </div>
          <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            <strong>Keyboard shortcuts:</strong>
            <ul className="mt-1 space-y-1">
              <li>• <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">Tab</kbd> - Focus the select</li>
              <li>• <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">Enter</kbd> or <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">Space</kbd> - Open dropdown</li>
              <li>• <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">↑</kbd>/<kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">↓</kbd> - Navigate options</li>
              <li>• <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">Enter</kbd> - Select option</li>
              <li>• <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">Esc</kbd> - Close dropdown</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Form Validation */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          Form Validation & Error States
        </h3>
        <form onSubmit={handleSubmit} className="max-w-md space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Required Selection *
            </label>
            <Select
              options={requiredOptions}
              value={requiredField}
              onChange={(value: string | string[]) => setRequiredField(value as string)}
              placeholder="Please select an option..."
              required
              error={showValidation && !requiredField ? "This field is required" : undefined}
              aria-invalid={showValidation && !requiredField}
              aria-describedby={showValidation && !requiredField ? "required-error" : undefined}
            />
            {showValidation && !requiredField && (
              <p 
                id="required-error"
                className="mt-1 text-sm text-red-600 dark:text-red-400"
                role="alert"
                aria-live="polite"
              >
                This field is required
              </p>
            )}
          </div>

          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Validate Form
          </button>

          {showValidation && requiredField && (
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-sm text-green-700 dark:text-green-300">
                ✓ Form validation passed! Selected: {requiredOptions.find(opt => opt.value === requiredField)?.label}
              </p>
            </div>
          )}
        </form>
      </div>

      {/* Screen Reader Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          Screen Reader Support
        </h3>
        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Select components include comprehensive screen reader support:
          </p>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span><strong>role="combobox"</strong> - Properly identifies the interactive element</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span><strong>aria-expanded</strong> - Indicates dropdown state</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span><strong>aria-haspopup="listbox"</strong> - Declares popup type</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span><strong>aria-multiselectable</strong> - For multiple selection mode</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span><strong>aria-selected</strong> - Indicates selected options</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span><strong>aria-disabled</strong> - For disabled options</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span><strong>Live regions</strong> - For validation messages</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
