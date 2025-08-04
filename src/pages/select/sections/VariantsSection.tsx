import { useState } from 'preact/hooks'
import { Select } from '../../../../nebula/components'

const options = [
  { value: 'small', label: 'Small option' },
  { value: 'medium', label: 'Medium option' },
  { value: 'large', label: 'Large option' },
]

const advancedOptions = [
  { 
    value: 'option1', 
    label: 'Option with description', 
    description: 'This option has additional information',
    icon: '📄'
  },
  { 
    value: 'option2', 
    label: 'Another option', 
    description: 'With helpful context text',
    icon: '⭐'
  },
  { 
    value: 'option3', 
    label: 'Disabled option', 
    description: 'This option cannot be selected',
    disabled: true,
    icon: '🚫'
  },
  { 
    value: 'option4', 
    label: 'Special option', 
    description: 'With special meaning',
    icon: '✨'
  },
]

export function VariantsSection() {
  const [searchableValue, setSearchableValue] = useState<string>('')
  const [loadingValue, setLoadingValue] = useState<string>('')
  const [errorValue, setErrorValue] = useState<string>('')

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Variants & Features
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Select components come with various features like searchable options, loading states, and error handling.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Size Variants */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            Size Variants
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Small size
              </label>
              <Select
                options={options}
                size="sm"
                placeholder="Small select..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Medium size (default)
              </label>
              <Select
                options={options}
                size="md"
                placeholder="Medium select..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Large size
              </label>
              <Select
                options={options}
                size="lg"
                placeholder="Large select..."
              />
            </div>
          </div>
        </div>

        {/* Feature Variants */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            Feature Variants
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Searchable select
              </label>
              <Select
                options={advancedOptions}
                value={searchableValue}
                onChange={(value: string | string[]) => setSearchableValue(value as string)}
                searchable
                placeholder="Type to search..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Loading state
              </label>
              <Select
                options={options}
                value={loadingValue}
                onChange={(value: string | string[]) => setLoadingValue(value as string)}
                loading
                placeholder="Loading options..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Error state
              </label>
              <Select
                options={options}
                value={errorValue}
                onChange={(value: string | string[]) => setErrorValue(value as string)}
                error="This field is required"
                placeholder="Select with error..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Options */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          Advanced Options
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Options with descriptions and icons
            </label>
            <Select
              options={advancedOptions}
              placeholder="Choose an option..."
              searchable
            />
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Notice the disabled option cannot be selected
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Disabled select
            </label>
            <Select
              options={options}
              disabled
              placeholder="Disabled select..."
            />
          </div>
        </div>
      </div>
    </section>
  )
}
