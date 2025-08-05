import { useState } from 'preact/hooks'
import { Autocomplete, type AutocompleteOption } from '../../../../nebula/components'

const basicOptions: AutocompleteOption[] = [
  { value: 'apple', label: 'Apple', description: 'A sweet red fruit' },
  { value: 'banana', label: 'Banana', description: 'A yellow tropical fruit' },
  { value: 'cherry', label: 'Cherry', description: 'A small red fruit' },
  { value: 'date', label: 'Date', description: 'A sweet brown fruit' },
  { value: 'elderberry', label: 'Elderberry', description: 'A dark purple berry' },
  { value: 'fig', label: 'Fig', description: 'A sweet purple fruit' },
  { value: 'grape', label: 'Grape', description: 'A small round fruit' },
  { value: 'honeydew', label: 'Honeydew', description: 'A sweet green melon' }
]

export function BasicUsageSection() {
  const [singleValue, setSingleValue] = useState<AutocompleteOption | null>(null)
  const [multipleValue, setMultipleValue] = useState<AutocompleteOption[]>([])

  const handleSingleChange = (value: AutocompleteOption | AutocompleteOption[] | null) => {
    setSingleValue(Array.isArray(value) ? value[0] || null : value)
  }

  const handleMultipleChange = (value: AutocompleteOption | AutocompleteOption[] | null) => {
    setMultipleValue(Array.isArray(value) ? value : value ? [value] : [])
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Basic Autocomplete
        </h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Single Selection
            </label>
            <Autocomplete
              value={singleValue}
              onChange={handleSingleChange}
              options={basicOptions}
              placeholder="Search fruits..."
              aria-label="Search fruits"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Multiple Selection
            </label>
            <Autocomplete
              value={multipleValue}
              onChange={handleMultipleChange}
              options={basicOptions}
              multiple
              placeholder="Search multiple fruits..."
              aria-label="Search multiple fruits"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Controlled vs Uncontrolled
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Controlled (with state)
            </label>
            <Autocomplete
              value={singleValue}
              onChange={handleSingleChange}
              options={basicOptions}
              placeholder="Controlled autocomplete"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Selected: {singleValue?.label || 'None'}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Uncontrolled (with defaultValue)
            </label>
            <Autocomplete
              defaultValue={basicOptions[0]}
              options={basicOptions}
              placeholder="Uncontrolled autocomplete"
              onChange={(value) => console.log('Uncontrolled changed:', value)}
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Check console for changes
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
