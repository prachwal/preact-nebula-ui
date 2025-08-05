import { useState } from 'preact/hooks'
import { Autocomplete, type AutocompleteOption } from '../../../../nebula/components'
import { Label } from '../../../../nebula/components'

const users: AutocompleteOption[] = [
  { 
    value: 'john', 
    label: 'John Doe', 
    description: 'Senior Developer',
    data: { 
      avatar: '👨‍💻',
      status: 'online',
      department: 'Engineering'
    }
  },
  { 
    value: 'jane', 
    label: 'Jane Smith', 
    description: 'Product Manager',
    data: { 
      avatar: '👩‍💼',
      status: 'busy',
      department: 'Product'
    }
  },
  { 
    value: 'mike', 
    label: 'Mike Johnson', 
    description: 'UX Designer',
    data: { 
      avatar: '👨‍🎨',
      status: 'away',
      department: 'Design'
    }
  },
  { 
    value: 'sarah', 
    label: 'Sarah Wilson', 
    description: 'Marketing Lead',
    data: { 
      avatar: '👩‍💻',
      status: 'online',
      department: 'Marketing'
    }
  }
]

const products: AutocompleteOption[] = [
  {
    value: 'laptop',
    label: 'MacBook Pro',
    description: 'Apple M2 Pro, 16GB RAM',
    data: {
      price: '$2,499',
      rating: 4.8,
      category: 'Laptops'
    }
  },
  {
    value: 'phone',
    label: 'iPhone 15 Pro',
    description: 'Pro camera system',
    data: {
      price: '$999',
      rating: 4.7,
      category: 'Phones'
    }
  },
  {
    value: 'tablet',
    label: 'iPad Air',
    description: 'M1 chip, 10.9-inch',
    data: {
      price: '$599',
      rating: 4.6,
      category: 'Tablets'
    }
  }
]

export function CustomRenderingSection() {
  const [selectedUser, setSelectedUser] = useState<AutocompleteOption | null>(null)
  const [selectedUsers, setSelectedUsers] = useState<AutocompleteOption[]>([])
  const [selectedProduct, setSelectedProduct] = useState<AutocompleteOption | null>(null)

  // Custom option renderer for users
  const renderUserOption = (option: AutocompleteOption, isHighlighted: boolean) => (
    <div className={`flex items-center gap-3 p-2 ${isHighlighted ? 'bg-blue-50 dark:bg-blue-900/50' : ''}`}>
      <div className="text-2xl">{option.data?.avatar}</div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium">{option.label}</span>
          <div className={`w-2 h-2 rounded-full ${
            option.data?.status === 'online' ? 'bg-green-500' :
            option.data?.status === 'busy' ? 'bg-red-500' :
            'bg-yellow-500'
          }`} />
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {option.description} • {option.data?.department}
        </div>
      </div>
    </div>
  )

  // Custom tag renderer for users
  const renderUserTag = (option: AutocompleteOption, onRemove: () => void) => (
    <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 text-blue-800 dark:text-blue-200 rounded-full text-sm border border-blue-200 dark:border-blue-700">
      <span className="text-lg">{option.data?.avatar}</span>
      <span className="font-medium">{option.label}</span>
      <button
        onClick={onRemove}
        className="hover:text-blue-600 dark:hover:text-blue-300 ml-1"
        aria-label={`Remove ${option.label}`}
      >
        ×
      </button>
    </div>
  )

  // Custom option renderer for products
  const renderProductOption = (option: AutocompleteOption, isHighlighted: boolean) => (
    <div className={`p-3 ${isHighlighted ? 'bg-blue-50 dark:bg-blue-900/50' : ''}`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="font-semibold text-gray-900 dark:text-white">{option.label}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{option.description}</div>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-lg font-bold text-green-600 dark:text-green-400">
              {option.data?.price}
            </span>
            <div className="flex items-center gap-1">
              <span className="text-yellow-500">★</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {option.data?.rating}
              </span>
            </div>
          </div>
        </div>
        <div className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
          {option.data?.category}
        </div>
      </div>
    </div>
  )

  // Custom no options renderer
  const renderNoOptions = (searchValue: string) => (
    <div className="p-4 text-center">
      <div className="text-gray-400 text-6xl mb-2">🔍</div>
      <div className="text-gray-500 dark:text-gray-400 font-medium">
        No results found for "{searchValue}"
      </div>
      <div className="text-sm text-gray-400 dark:text-gray-500 mt-1">
        Try adjusting your search terms
      </div>
    </div>
  )

  // Custom loading renderer
  const renderLoading = () => (
    <div className="p-4 text-center">
      <div className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400">
        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <span>Searching users...</span>
      </div>
    </div>
  )

  const handleUserChange = (value: AutocompleteOption | AutocompleteOption[] | null) => {
    setSelectedUser(Array.isArray(value) ? value[0] || null : value)
  }

  const handleUsersChange = (value: AutocompleteOption | AutocompleteOption[] | null) => {
    setSelectedUsers(Array.isArray(value) ? value : value ? [value] : [])
  }

  const handleProductChange = (value: AutocompleteOption | AutocompleteOption[] | null) => {
    setSelectedProduct(Array.isArray(value) ? value[0] || null : value)
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Custom Rendering
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Customize how options, tags, and states are displayed using custom render functions. Create rich, interactive option displays.
        </p>
        
        <div className="space-y-6">
          <div>
            <Label>Custom User Options</Label>
            <Autocomplete
              value={selectedUser}
              onChange={handleUserChange}
              options={users}
              renderOption={renderUserOption}
              renderNoOptions={renderNoOptions}
              renderLoading={renderLoading}
              placeholder="Select a team member..."
              aria-label="Select team member with custom rendering"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Custom option renderer with avatars, status indicators, and departments
            </p>
          </div>

          <div>
            <Label>Custom User Tags (Multiple)</Label>
            <Autocomplete
              multiple
              value={selectedUsers}
              onChange={handleUsersChange}
              options={users}
              renderOption={renderUserOption}
              renderTag={renderUserTag}
              placeholder="Select team members..."
              aria-label="Select multiple team members with custom tags"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Custom tag renderer with gradient backgrounds and emoji avatars
            </p>
          </div>

          <div>
            <Label>Product Catalog</Label>
            <Autocomplete
              value={selectedProduct}
              onChange={handleProductChange}
              options={products}
              renderOption={renderProductOption}
              placeholder="Search products..."
              aria-label="Search products with custom rendering"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Rich product display with pricing, ratings, and categories
            </p>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
          Custom Render Functions
        </h4>
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h5 className="font-medium text-gray-900 dark:text-white mb-2">Available Renderers:</h5>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <li>• <strong>renderOption</strong>: Custom option display in dropdown</li>
              <li>• <strong>renderTag</strong>: Custom tag display for selected items</li>
              <li>• <strong>renderNoOptions</strong>: Custom empty state message</li>
              <li>• <strong>renderLoading</strong>: Custom loading state display</li>
              <li>• <strong>renderCreateOption</strong>: Custom create option button</li>
            </ul>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/50 p-4 rounded-lg">
            <h5 className="font-medium text-purple-900 dark:text-purple-100 mb-2">Design Tips:</h5>
            <ul className="space-y-1 text-sm text-purple-800 dark:text-purple-200">
              <li>• Use consistent spacing and typography</li>
              <li>• Include visual hierarchy with font weights and sizes</li>
              <li>• Add hover and highlight states for better UX</li>
              <li>• Consider accessibility with proper color contrast</li>
              <li>• Keep tag designs compact but readable</li>
              <li>• Use icons and emojis to enhance visual appeal</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
