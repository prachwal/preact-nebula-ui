import { useState } from 'preact/hooks'
import { Autocomplete, type AutocompleteOption } from '../../../../nebula/components'
import { Label, FieldError } from '../../../../nebula/components'

const statusOptions: AutocompleteOption[] = [
  { value: 'active', label: 'Active', description: 'Currently active status' },
  { value: 'inactive', label: 'Inactive', description: 'Currently inactive status' },
  { value: 'pending', label: 'Pending', description: 'Awaiting approval' },
  { value: 'suspended', label: 'Suspended', description: 'Temporarily suspended' }
]

const teamOptions: AutocompleteOption[] = [
  { value: 'frontend', label: 'Frontend Team', description: 'UI/UX Development' },
  { value: 'backend', label: 'Backend Team', description: 'Server & Database' },
  { value: 'mobile', label: 'Mobile Team', description: 'iOS & Android' },
  { value: 'devops', label: 'DevOps Team', description: 'Infrastructure' },
  { value: 'qa', label: 'QA Team', description: 'Quality Assurance' }
]

export function StatesSection() {
  const [normalValue, setNormalValue] = useState<AutocompleteOption | null>(null)
  const [disabledValue] = useState<AutocompleteOption | null>(statusOptions[0])
  const [readOnlyValue] = useState<AutocompleteOption | null>(statusOptions[1])
  const [errorValue, setErrorValue] = useState<AutocompleteOption | null>(null)
  const [requiredValue, setRequiredValue] = useState<AutocompleteOption | null>(null)
  const [loadingValue, setLoadingValue] = useState<AutocompleteOption | null>(null)

  const [showRequired, setShowRequired] = useState(false)
  const [showError, setShowError] = useState(false)

  const handleNormalChange = (value: AutocompleteOption | AutocompleteOption[] | null) => {
    setNormalValue(Array.isArray(value) ? value[0] || null : value)
  }

  const handleErrorChange = (value: AutocompleteOption | AutocompleteOption[] | null) => {
    setErrorValue(Array.isArray(value) ? value[0] || null : value)
    setShowError(false) // Clear error when user makes selection
  }

  const handleRequiredChange = (value: AutocompleteOption | AutocompleteOption[] | null) => {
    setRequiredValue(Array.isArray(value) ? value[0] || null : value)
    setShowRequired(false) // Clear required error when user makes selection
  }

  const handleLoadingChange = (value: AutocompleteOption | AutocompleteOption[] | null) => {
    setLoadingValue(Array.isArray(value) ? value[0] || null : value)
  }

  const validateRequired = () => {
    if (!requiredValue) {
      setShowRequired(true)
      return false
    }
    setShowRequired(false)
    return true
  }

  const validateError = () => {
    if (!errorValue) {
      setShowError(true)
      return false
    }
    setShowError(false)
    return true
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Component States
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Autocomplete components support various states to provide appropriate feedback and control user interaction.
        </p>
        
        <div className="space-y-6">
          <div>
            <Label>Normal State</Label>
            <Autocomplete
              value={normalValue}
              onChange={handleNormalChange}
              options={statusOptions}
              placeholder="Select a status..."
              aria-label="Normal state autocomplete"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Default interactive state
            </p>
          </div>

          <div>
            <Label>Disabled State</Label>
            <Autocomplete
              disabled
              value={disabledValue}
              options={statusOptions}
              placeholder="Cannot interact..."
              aria-label="Disabled autocomplete"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              User cannot interact with the component
            </p>
          </div>

          <div>
            <Label>Read-Only State</Label>
            <Autocomplete
              readOnly
              value={readOnlyValue}
              options={statusOptions}
              placeholder="Read-only value..."
              aria-label="Read-only autocomplete"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Shows value but prevents modification
            </p>
          </div>

          <div>
            <Label required>Required Field</Label>
            <Autocomplete
              required
              value={requiredValue}
              onChange={handleRequiredChange}
              options={teamOptions}
              placeholder="This field is required..."
              error={showRequired}
              errorMessage={showRequired ? "Please select a team" : undefined}
              aria-label="Required autocomplete"
            />
            {showRequired && <FieldError>Please select a team</FieldError>}
            <div className="mt-2">
              <button
                onClick={validateRequired}
                className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
              >
                Validate Required
              </button>
            </div>
          </div>

          <div>
            <Label>Error State</Label>
            <Autocomplete
              value={errorValue}
              onChange={handleErrorChange}
              options={statusOptions}
              placeholder="Select to clear error..."
              error={showError}
              errorMessage={showError ? "This selection is invalid" : undefined}
              aria-label="Error state autocomplete"
            />
            {showError && <FieldError>This selection is invalid</FieldError>}
            <div className="mt-2">
              <button
                onClick={validateError}
                className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
              >
                Trigger Error
              </button>
            </div>
          </div>

          <div>
            <Label>Loading State</Label>
            <Autocomplete
              loading
              value={loadingValue}
              onChange={handleLoadingChange}
              options={statusOptions}
              placeholder="Loading data..."
              loadingText="Fetching options..."
              aria-label="Loading state autocomplete"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Shows loading spinner while data is being fetched
            </p>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
          Multiple Selection States
        </h4>
        <div className="space-y-4">
          <div>
            <Label>Disabled Multiple</Label>
            <Autocomplete
              multiple
              disabled
              value={[teamOptions[0], teamOptions[2]]}
              options={teamOptions}
              placeholder="Disabled multiple selection..."
              aria-label="Disabled multiple selection"
            />
          </div>

          <div>
            <Label>Error Multiple</Label>
            <Autocomplete
              multiple
              error
              options={teamOptions}
              placeholder="Multiple selection with error..."
              errorMessage="Please select at least 2 teams"
              aria-label="Error multiple selection"
            />
            <FieldError>Please select at least 2 teams</FieldError>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
          State Configuration
        </h4>
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h5 className="font-medium text-gray-900 dark:text-white mb-2">State Properties:</h5>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <li>• <strong>disabled</strong>: Prevents all user interaction</li>
              <li>• <strong>readOnly</strong>: Shows value but prevents editing</li>
              <li>• <strong>required</strong>: Marks field as required for validation</li>
              <li>• <strong>error</strong>: Shows error styling and state</li>
              <li>• <strong>errorMessage</strong>: Custom error message text</li>
              <li>• <strong>loading</strong>: Shows loading spinner</li>
            </ul>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/50 p-4 rounded-lg">
            <h5 className="font-medium text-orange-900 dark:text-orange-100 mb-2">Validation Best Practices:</h5>
            <ul className="space-y-1 text-sm text-orange-800 dark:text-orange-200">
              <li>• Show errors after user interaction, not immediately</li>
              <li>• Clear errors when user makes valid changes</li>
              <li>• Use descriptive error messages</li>
              <li>• Combine with FieldError component for consistency</li>
              <li>• Support both client-side and server-side validation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
