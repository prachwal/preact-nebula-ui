import { useState } from 'preact/hooks'
import { Select } from '../../../../nebula/components'

const allOptions = [
  { value: 'react', label: 'React', description: 'A JavaScript library for building user interfaces' },
  { value: 'vue', label: 'Vue.js', description: 'The Progressive JavaScript Framework' },
  { value: 'angular', label: 'Angular', description: 'Platform for building mobile and desktop web applications' },
  { value: 'svelte', label: 'Svelte', description: 'Cybernetically enhanced web apps' },
  { value: 'preact', label: 'Preact', description: 'Fast 3kB alternative to React with the same modern API' },
  { value: 'solid', label: 'SolidJS', description: 'Simple and performant reactivity for building user interfaces' },
  { value: 'lit', label: 'Lit', description: 'Simple. Fast. Web Components.' },
  { value: 'alpine', label: 'Alpine.js', description: 'A rugged, minimal framework for composing JavaScript behavior' },
]

const teamMembers = [
  { value: 'john', label: 'John Doe', description: 'Frontend Developer', icon: '👨‍💻' },
  { value: 'jane', label: 'Jane Smith', description: 'UX Designer', icon: '🎨' },
  { value: 'bob', label: 'Bob Johnson', description: 'Product Manager', icon: '📋' },
  { value: 'alice', label: 'Alice Brown', description: 'Backend Developer', icon: '⚙️' },
  { value: 'charlie', label: 'Charlie Wilson', description: 'DevOps Engineer', icon: '🚀' },
]

export function InteractiveSection() {
  const [selectedFramework, setSelectedFramework] = useState<string>('')
  const [selectedTeam, setSelectedTeam] = useState<string[]>([])
  const [searchResults, setSearchResults] = useState(allOptions)
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = (query: string) => {
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      const filtered = allOptions.filter(option =>
        option.label.toLowerCase().includes(query.toLowerCase()) ||
        option.description.toLowerCase().includes(query.toLowerCase())
      )
      setSearchResults(filtered)
      setIsLoading(false)
    }, 300)
  }

  const handleReset = () => {
    setSelectedFramework('')
    setSelectedTeam([])
    setSearchResults(allOptions)
  }

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Interactive Examples
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Real-world examples demonstrating advanced Select component features and interactions.
        </p>
      </div>

      {/* Framework Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          Framework Selection with Search
        </h3>
        <div className="max-w-lg space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Choose your preferred framework
            </label>
            <Select
              options={searchResults}
              value={selectedFramework}
              onChange={(value: string | string[]) => setSelectedFramework(value as string)}
              onSearch={handleSearch}
              searchable
              clearable
              loading={isLoading}
              placeholder="Search for a framework..."
            />
          </div>
          
          {selectedFramework && (
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-medium text-blue-900 dark:text-blue-100">
                Selected Framework
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                {allOptions.find(opt => opt.value === selectedFramework)?.label}: {' '}
                {allOptions.find(opt => opt.value === selectedFramework)?.description}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Team Assignment */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          Team Member Assignment
        </h3>
        <div className="max-w-lg space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Assign team members to project
            </label>
            <Select
              options={teamMembers}
              value={selectedTeam}
              onChange={(value: string | string[]) => setSelectedTeam(value as string[])}
              multiple
              clearable
              placeholder="Select team members..."
            />
          </div>

          {selectedTeam.length > 0 && (
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-medium text-green-900 dark:text-green-100">
                Project Team ({selectedTeam.length} members)
              </h4>
              <div className="mt-2 space-y-1">
                {selectedTeam.map(memberId => {
                  const member = teamMembers.find(m => m.value === memberId)
                  return member ? (
                    <div key={memberId} className="flex items-center gap-2 text-sm text-green-700 dark:text-green-300">
                      <span>{member.icon}</span>
                      <span className="font-medium">{member.label}</span>
                      <span>- {member.description}</span>
                    </div>
                  ) : null
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Form Example */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          Form Integration
        </h3>
        <div className="max-w-2xl p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Primary Framework *
                </label>
                <Select
                  options={allOptions.slice(0, 5)}
                  value={selectedFramework}
                  onChange={(value: string | string[]) => setSelectedFramework(value as string)}
                  required
                  placeholder="Choose primary framework..."
                  name="primary_framework"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Team Size
                </label>
                <Select
                  options={[
                    { value: '1-5', label: '1-5 people' },
                    { value: '6-10', label: '6-10 people' },
                    { value: '11-20', label: '11-20 people' },
                    { value: '20+', label: '20+ people' },
                  ]}
                  placeholder="Select team size..."
                  size="md"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Additional Team Members
              </label>
              <Select
                options={teamMembers}
                value={selectedTeam}
                onChange={(value: string | string[]) => setSelectedTeam(value as string[])}
                multiple
                placeholder="Add team members..."
                name="team_members"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Reset Form
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Submit Project
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
