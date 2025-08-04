import { useState } from 'preact/hooks'
import { Select } from '../../../../nebula/components'

const basicOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'grape', label: 'Grape' },
  { value: 'strawberry', label: 'Strawberry' },
]

const countryOptions = [
  { value: 'us', label: 'United States', icon: '🇺🇸' },
  { value: 'uk', label: 'United Kingdom', icon: '🇬🇧' },
  { value: 'ca', label: 'Canada', icon: '🇨🇦' },
  { value: 'de', label: 'Germany', icon: '🇩🇪' },
  { value: 'fr', label: 'France', icon: '🇫🇷' },
  { value: 'jp', label: 'Japan', icon: '🇯🇵' },
]

export function BasicUsageSection() {
  const [singleValue, setSingleValue] = useState<string>('')
  const [multipleValue, setMultipleValue] = useState<string[]>([])
  const [countryValue, setCountryValue] = useState<string>('')

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Basic Usage
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Select components allow users to choose from a list of options. They support single and multiple selection modes.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Single Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            Single Selection
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Choose a fruit
              </label>
              <Select
                options={basicOptions}
                value={singleValue}
                onChange={(value: string | string[]) => setSingleValue(value as string)}
                placeholder="Select a fruit..."
              />
              {singleValue && (
                <p className="mt-2 text-sm text-blue-600 dark:text-blue-400">
                  Selected: {basicOptions.find(opt => opt.value === singleValue)?.label}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                With custom placeholder
              </label>
              <Select
                options={basicOptions}
                placeholder="Pick your favorite fruit"
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Multiple Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            Multiple Selection
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Choose multiple fruits
              </label>
              <Select
                options={basicOptions}
                value={multipleValue}
                onChange={(value: string | string[]) => setMultipleValue(value as string[])}
                multiple
                placeholder="Select fruits..."
              />
              {multipleValue.length > 0 && (
                <p className="mt-2 text-sm text-blue-600 dark:text-blue-400">
                  Selected ({multipleValue.length}): {multipleValue.join(', ')}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Clearable selection
              </label>
              <Select
                options={basicOptions}
                multiple
                clearable
                placeholder="Select with clear option"
              />
            </div>
          </div>
        </div>
      </div>

      {/* With Icons */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          Options with Icons
        </h3>
        <div className="max-w-md">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Choose a country
          </label>
          <Select
            options={countryOptions}
            value={countryValue}
            onChange={(value: string | string[]) => setCountryValue(value as string)}
            placeholder="Select a country..."
          />
          {countryValue && (
            <p className="mt-2 text-sm text-blue-600 dark:text-blue-400">
              Selected: {countryOptions.find(opt => opt.value === countryValue)?.icon} {countryOptions.find(opt => opt.value === countryValue)?.label}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
