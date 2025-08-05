import { useState } from 'preact/hooks'
import { Autocomplete, type AutocompleteOption } from '../../../../nebula/components'
import { Label } from '../../../../nebula/components'

const initialTags: AutocompleteOption[] = [
  { value: 'javascript', label: 'JavaScript', description: 'Programming language' },
  { value: 'typescript', label: 'TypeScript', description: 'Typed JavaScript' },
  { value: 'react', label: 'React', description: 'UI library' },
  { value: 'vue', label: 'Vue.js', description: 'Progressive framework' }
]

const initialColors: AutocompleteOption[] = [
  { value: 'red', label: 'Red', description: 'Primary color' },
  { value: 'blue', label: 'Blue', description: 'Primary color' },
  { value: 'yellow', label: 'Yellow', description: 'Primary color' }
]

export function CreateOptionsSection() {
  const [tags, setTags] = useState<AutocompleteOption[]>(initialTags)
  const [selectedTags, setSelectedTags] = useState<AutocompleteOption[]>([])
  
  const [colors, setColors] = useState<AutocompleteOption[]>(initialColors)
  const [selectedColor, setSelectedColor] = useState<AutocompleteOption | null>(null)

  const [emails, setEmails] = useState<AutocompleteOption[]>([])
  const [selectedEmails, setSelectedEmails] = useState<AutocompleteOption[]>([])

  const handleCreateTag = (newTag: string) => {
    const newOption: AutocompleteOption = {
      value: newTag.toLowerCase().replace(/\s+/g, '-'),
      label: newTag,
      description: 'Custom tag'
    }
    
    setTags(prev => [...prev, newOption])
    setSelectedTags(prev => [...prev, newOption])
  }

  const handleCreateColor = (newColor: string) => {
    const newOption: AutocompleteOption = {
      value: newColor.toLowerCase().replace(/\s+/g, '-'),
      label: newColor,
      description: 'Custom color'
    }
    
    setColors(prev => [...prev, newOption])
    setSelectedColor(newOption)
  }

  const handleCreateEmail = (email: string) => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address')
      return
    }

    const newOption: AutocompleteOption = {
      value: email,
      label: email,
      description: 'Email address'
    }
    
    setEmails(prev => [...prev, newOption])
    setSelectedEmails(prev => [...prev, newOption])
  }

  const handleTagsChange = (value: AutocompleteOption | AutocompleteOption[] | null) => {
    setSelectedTags(Array.isArray(value) ? value : value ? [value] : [])
  }

  const handleColorChange = (value: AutocompleteOption | AutocompleteOption[] | null) => {
    setSelectedColor(Array.isArray(value) ? value[0] || null : value)
  }

  const handleEmailsChange = (value: AutocompleteOption | AutocompleteOption[] | null) => {
    setSelectedEmails(Array.isArray(value) ? value : value ? [value] : [])
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Create New Options
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Allow users to create new options when their desired choice isn't available. Perfect for tags, categories, or any dynamic content.
        </p>
        
        <div className="space-y-6">
          <div>
            <Label>Technology Tags (Multiple)</Label>
            <Autocomplete
              multiple
              allowCreate
              value={selectedTags}
              onChange={handleTagsChange}
              onCreate={handleCreateTag}
              options={tags}
              placeholder="Select or create tags..."
              createText="Add tag"
              aria-label="Select or create technology tags"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Type a new tag name and press Enter or click the create option
            </p>
          </div>

          <div>
            <Label>Color Selection (Single)</Label>
            <Autocomplete
              allowCreate
              value={selectedColor}
              onChange={handleColorChange}
              onCreate={handleCreateColor}
              options={colors}
              placeholder="Select or create a color..."
              createText="Create color"
              aria-label="Select or create a color"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Create custom color names when not found in the list
            </p>
          </div>

          <div>
            <Label>Email Addresses</Label>
            <Autocomplete
              multiple
              allowCreate
              value={selectedEmails}
              onChange={handleEmailsChange}
              onCreate={handleCreateEmail}
              options={emails}
              placeholder="Enter email addresses..."
              createText="Add email"
              aria-label="Enter email addresses"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Add new email addresses (with validation)
            </p>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
          Create Options Configuration
        </h4>
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h5 className="font-medium text-gray-900 dark:text-white mb-2">Configuration:</h5>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <li>• <strong>allowCreate</strong>: Enable create functionality</li>
              <li>• <strong>onCreate</strong>: Function called when user creates new option</li>
              <li>• <strong>createText</strong>: Custom text for create button (default: "Create")</li>
              <li>• <strong>renderCreateOption</strong>: Custom renderer for create option</li>
            </ul>
          </div>

          <div className="bg-green-50 dark:bg-green-900/50 p-4 rounded-lg">
            <h5 className="font-medium text-green-900 dark:text-green-100 mb-2">Usage Examples:</h5>
            <ul className="space-y-1 text-sm text-green-800 dark:text-green-200">
              <li>• Tag systems for articles or products</li>
              <li>• Custom categories or labels</li>
              <li>• Contact lists with new entries</li>
              <li>• Dynamic form fields</li>
              <li>• User-generated content lists</li>
            </ul>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/50 p-4 rounded-lg">
            <h5 className="font-medium text-yellow-900 dark:text-yellow-100 mb-2">Implementation Notes:</h5>
            <ul className="space-y-1 text-sm text-yellow-800 dark:text-yellow-200">
              <li>• Validate input in your onCreate function</li>
              <li>• Add the new option to your options list</li>
              <li>• Handle duplicates appropriately</li>
              <li>• Consider persisting new options to backend</li>
              <li>• Show create option only when no matches found</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
