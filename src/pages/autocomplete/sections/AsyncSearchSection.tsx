import { useState } from 'preact/hooks'
import { Autocomplete, type AutocompleteOption } from '../../../../nebula/components'
import { Label } from '../../../../nebula/components'

// Mock data for demonstration
const mockUsers = [
  { value: 'user1', label: 'Alice Johnson', description: 'alice@example.com' },
  { value: 'user2', label: 'Bob Smith', description: 'bob@example.com' },
  { value: 'user3', label: 'Charlie Brown', description: 'charlie@example.com' },
  { value: 'user4', label: 'Diana Wilson', description: 'diana@example.com' },
  { value: 'user5', label: 'Edward Davis', description: 'edward@example.com' },
  { value: 'user6', label: 'Fiona Miller', description: 'fiona@example.com' },
  { value: 'user7', label: 'George Garcia', description: 'george@example.com' },
  { value: 'user8', label: 'Helen Martinez', description: 'helen@example.com' }
]

const mockCountries = [
  { value: 'us', label: 'United States', description: 'North America' },
  { value: 'ca', label: 'Canada', description: 'North America' },
  { value: 'uk', label: 'United Kingdom', description: 'Europe' },
  { value: 'de', label: 'Germany', description: 'Europe' },
  { value: 'fr', label: 'France', description: 'Europe' },
  { value: 'jp', label: 'Japan', description: 'Asia' },
  { value: 'au', label: 'Australia', description: 'Oceania' },
  { value: 'br', label: 'Brazil', description: 'South America' }
]

export function AsyncSearchSection() {
  const [asyncValue, setAsyncValue] = useState<AutocompleteOption | null>(null)
  const [fastSearchValue, setFastSearchValue] = useState<AutocompleteOption | null>(null)
  const [minLengthValue, setMinLengthValue] = useState<AutocompleteOption | null>(null)

  // Simulate async search with delay
  const handleAsyncSearch = async (query: string): Promise<AutocompleteOption[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const results = mockUsers.filter(user =>
      user.label.toLowerCase().includes(query.toLowerCase()) ||
      user.description.toLowerCase().includes(query.toLowerCase())
    )
    
    return results
  }

  // Fast search simulation
  const handleFastSearch = async (query: string): Promise<AutocompleteOption[]> => {
    // Shorter delay for fast search
    await new Promise(resolve => setTimeout(resolve, 200))
    
    const results = mockCountries.filter(country =>
      country.label.toLowerCase().includes(query.toLowerCase()) ||
      country.description.toLowerCase().includes(query.toLowerCase())
    )
    
    return results
  }

  // Search with minimum length
  const handleMinLengthSearch = async (query: string): Promise<AutocompleteOption[]> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const results = mockUsers.filter(user =>
      user.label.toLowerCase().includes(query.toLowerCase())
    )
    
    return results.slice(0, 5) // Limit results
  }

  const handleAsyncChange = (value: AutocompleteOption | AutocompleteOption[] | null) => {
    setAsyncValue(Array.isArray(value) ? value[0] || null : value)
  }

  const handleFastChange = (value: AutocompleteOption | AutocompleteOption[] | null) => {
    setFastSearchValue(Array.isArray(value) ? value[0] || null : value)
  }

  const handleMinLengthChange = (value: AutocompleteOption | AutocompleteOption[] | null) => {
    setMinLengthValue(Array.isArray(value) ? value[0] || null : value)
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Async Search
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Implement dynamic search functionality by providing an async search function. The component will automatically debounce input and show loading states.
        </p>
        
        <div className="space-y-6">
          <div>
            <Label>User Search (Slow Network)</Label>
            <Autocomplete
              value={asyncValue}
              onChange={handleAsyncChange}
              onSearch={handleAsyncSearch}
              placeholder="Search users by name or email..."
              loadingText="Searching users..."
              noOptionsText="No users found"
              debounceMs={500}
              aria-label="Search users"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Simulates 800ms network delay with 500ms debounce
            </p>
          </div>

          <div>
            <Label>Country Search (Fast Network)</Label>
            <Autocomplete
              value={fastSearchValue}
              onChange={handleFastChange}
              onSearch={handleFastSearch}
              placeholder="Search countries..."
              loadingText="Loading countries..."
              debounceMs={150}
              aria-label="Search countries"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Simulates 200ms network delay with 150ms debounce
            </p>
          </div>

          <div>
            <Label>Minimum Search Length (3 characters)</Label>
            <Autocomplete
              value={minLengthValue}
              onChange={handleMinLengthChange}
              onSearch={handleMinLengthSearch}
              placeholder="Type at least 3 characters..."
              minSearchLength={3}
              debounceMs={300}
              aria-label="Search with minimum length"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Search only starts after typing 3 or more characters
            </p>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
          Async Search Configuration
        </h4>
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h5 className="font-medium text-gray-900 dark:text-white mb-2">Configuration Options:</h5>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <li>• <strong>onSearch</strong>: Async function that returns Promise&lt;AutocompleteOption[]&gt;</li>
              <li>• <strong>debounceMs</strong>: Delay before triggering search (default: 300ms)</li>
              <li>• <strong>minSearchLength</strong>: Minimum characters required to start search</li>
              <li>• <strong>loadingText</strong>: Custom loading message</li>
              <li>• <strong>noOptionsText</strong>: Message when no results found</li>
            </ul>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/50 p-4 rounded-lg">
            <h5 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Best Practices:</h5>
            <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
              <li>• Use appropriate debounce delay (150-500ms depending on network)</li>
              <li>• Set minimum search length for large datasets</li>
              <li>• Provide meaningful loading and no-results messages</li>
              <li>• Handle errors gracefully in your search function</li>
              <li>• Consider caching results for better performance</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
