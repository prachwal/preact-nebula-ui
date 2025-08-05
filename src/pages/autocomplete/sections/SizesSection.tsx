import { useState } from 'preact/hooks'
import { Autocomplete, type AutocompleteOption } from '../../../../nebula/components'
import { Label } from '../../../../nebula/components'

const sizeOptions: AutocompleteOption[] = [
  { value: 'xs', label: 'Extra Small', description: 'Tiny size option' },
  { value: 'sm', label: 'Small', description: 'Small size option' },
  { value: 'md', label: 'Medium', description: 'Medium size option' },
  { value: 'lg', label: 'Large', description: 'Large size option' },
  { value: 'xl', label: 'Extra Large', description: 'Extra large size option' }
]

export function SizesSection() {
  const [smValue, setSmValue] = useState<AutocompleteOption | null>(null)
  const [mdValue, setMdValue] = useState<AutocompleteOption | null>(null)
  const [lgValue, setLgValue] = useState<AutocompleteOption | null>(null)

  const handleSmChange = (value: AutocompleteOption | AutocompleteOption[] | null) => {
    setSmValue(Array.isArray(value) ? value[0] || null : value)
  }

  const handleMdChange = (value: AutocompleteOption | AutocompleteOption[] | null) => {
    setMdValue(Array.isArray(value) ? value[0] || null : value)
  }

  const handleLgChange = (value: AutocompleteOption | AutocompleteOption[] | null) => {
    setLgValue(Array.isArray(value) ? value[0] || null : value)
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Size Variants
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Autocomplete components come in three sizes: small, medium, and large. Choose the appropriate size based on your interface density needs.
        </p>
        
        <div className="space-y-6">
          <div>
            <Label>Small Size</Label>
            <Autocomplete
              size="sm"
              value={smValue}
              onChange={handleSmChange}
              options={sizeOptions}
              placeholder="Small autocomplete..."
              aria-label="Small size autocomplete"
            />
          </div>

          <div>
            <Label>Medium Size (Default)</Label>
            <Autocomplete
              size="md"
              value={mdValue}
              onChange={handleMdChange}
              options={sizeOptions}
              placeholder="Medium autocomplete..."
              aria-label="Medium size autocomplete"
            />
          </div>

          <div>
            <Label>Large Size</Label>
            <Autocomplete
              size="lg"
              value={lgValue}
              onChange={handleLgChange}
              options={sizeOptions}
              placeholder="Large autocomplete..."
              aria-label="Large size autocomplete"
            />
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
          Multiple Selection Sizes
        </h4>
        <div className="space-y-4">
          <div>
            <Label>Small Multiple</Label>
            <Autocomplete
              size="sm"
              multiple
              options={sizeOptions}
              placeholder="Select multiple sizes..."
              aria-label="Small multiple selection"
            />
          </div>

          <div>
            <Label>Medium Multiple</Label>
            <Autocomplete
              size="md"
              multiple
              options={sizeOptions}
              placeholder="Select multiple sizes..."
              aria-label="Medium multiple selection"
            />
          </div>

          <div>
            <Label>Large Multiple</Label>
            <Autocomplete
              size="lg"
              multiple
              options={sizeOptions}
              placeholder="Select multiple sizes..."
              aria-label="Large multiple selection"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
