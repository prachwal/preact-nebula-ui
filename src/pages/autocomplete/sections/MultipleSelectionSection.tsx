import { useState } from 'preact/hooks'
import { Autocomplete, type AutocompleteOption } from '../../../../nebula/components'
import { Label } from '../../../../nebula/components'

const teamMembers: AutocompleteOption[] = [
  { value: 'john', label: 'John Doe', description: 'Frontend Developer' },
  { value: 'jane', label: 'Jane Smith', description: 'Backend Developer' },
  { value: 'mike', label: 'Mike Johnson', description: 'UI/UX Designer' },
  { value: 'sarah', label: 'Sarah Wilson', description: 'Product Manager' },
  { value: 'alex', label: 'Alex Brown', description: 'DevOps Engineer' },
  { value: 'emma', label: 'Emma Davis', description: 'QA Engineer' },
  { value: 'ryan', label: 'Ryan Miller', description: 'Full Stack Developer' },
  { value: 'lisa', label: 'Lisa Garcia', description: 'Data Analyst' }
]

const skills: AutocompleteOption[] = [
  { value: 'javascript', label: 'JavaScript', description: 'Programming language' },
  { value: 'typescript', label: 'TypeScript', description: 'Typed JavaScript' },
  { value: 'react', label: 'React', description: 'UI library' },
  { value: 'vue', label: 'Vue.js', description: 'Progressive framework' },
  { value: 'angular', label: 'Angular', description: 'Platform framework' },
  { value: 'node', label: 'Node.js', description: 'JavaScript runtime' },
  { value: 'python', label: 'Python', description: 'Programming language' },
  { value: 'java', label: 'Java', description: 'Programming language' },
  { value: 'csharp', label: 'C#', description: 'Programming language' },
  { value: 'go', label: 'Go', description: 'Programming language' }
]

export function MultipleSelectionSection() {
  const [basicMultiple, setBasicMultiple] = useState<AutocompleteOption[]>([])
  const [limitedMultiple, setLimitedMultiple] = useState<AutocompleteOption[]>([])
  const [preselectedMultiple, setPreselectedMultiple] = useState<AutocompleteOption[]>([
    teamMembers[0],
    teamMembers[2]
  ])

  const handleBasicChange = (value: AutocompleteOption | AutocompleteOption[] | null) => {
    setBasicMultiple(Array.isArray(value) ? value : value ? [value] : [])
  }

  const handleLimitedChange = (value: AutocompleteOption | AutocompleteOption[] | null) => {
    setLimitedMultiple(Array.isArray(value) ? value : value ? [value] : [])
  }

  const handlePreselectedChange = (value: AutocompleteOption | AutocompleteOption[] | null) => {
    setPreselectedMultiple(Array.isArray(value) ? value : value ? [value] : [])
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Multiple Selection
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Enable multiple selection mode to allow users to select multiple options. Selected items are displayed as removable tags.
        </p>
        
        <div className="space-y-6">
          <div>
            <Label>Basic Multiple Selection</Label>
            <Autocomplete
              multiple
              value={basicMultiple}
              onChange={handleBasicChange}
              options={teamMembers}
              placeholder="Select team members..."
              aria-label="Select multiple team members"
            />
            {basicMultiple.length > 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Selected: {basicMultiple.map(item => item.label).join(', ')}
              </p>
            )}
          </div>

          <div>
            <Label>Limited Selection (Max 3)</Label>
            <Autocomplete
              multiple
              maxSelections={3}
              value={limitedMultiple}
              onChange={handleLimitedChange}
              options={skills}
              placeholder="Select up to 3 skills..."
              aria-label="Select up to 3 skills"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {limitedMultiple.length}/3 skills selected
            </p>
          </div>

          <div>
            <Label>Pre-selected Options</Label>
            <Autocomplete
              multiple
              value={preselectedMultiple}
              onChange={handlePreselectedChange}
              options={teamMembers}
              placeholder="Modify team selection..."
              aria-label="Modify team member selection"
            />
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
          Multiple Selection Features
        </h4>
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h5 className="font-medium text-gray-900 dark:text-white mb-2">Key Features:</h5>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <li>• Selected options appear as removable tags</li>
              <li>• Keyboard navigation with Backspace to remove last tag</li>
              <li>• Click X button on tags to remove individual selections</li>
              <li>• Option to limit maximum number of selections</li>
              <li>• Clear all selections with clear button</li>
              <li>• Exclude already selected options from dropdown</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
