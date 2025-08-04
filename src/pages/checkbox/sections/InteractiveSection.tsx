import { useState } from 'preact/hooks'
import { Checkbox } from '@/components/Checkbox'

export function InteractiveSection() {
  // Form validation example
  const [formData, setFormData] = useState({
    terms: false,
    newsletter: false,
    privacy: false
  })
  
  const [formErrors, setFormErrors] = useState({
    terms: false,
    privacy: false
  })

  // Group checkbox example (select all)
  const [items, setItems] = useState({
    item1: false,
    item2: true,
    item3: false,
    item4: true
  })

  // Custom content example
  const [customStates, setCustomStates] = useState({
    custom1: false,
    custom2: true
  })

  const handleSubmit = (e: Event) => {
    e.preventDefault()
    
    const newErrors = {
      terms: !formData.terms,
      privacy: !formData.privacy
    }
    
    setFormErrors(newErrors)
    
    if (!newErrors.terms && !newErrors.privacy) {
      alert('Form submitted successfully!')
    }
  }

  const selectedItems = Object.values(items).filter(Boolean).length
  const totalItems = Object.keys(items).length
  const allSelected = selectedItems === totalItems
  const noneSelected = selectedItems === 0
  const indeterminate = !allSelected && !noneSelected

  const handleSelectAll = () => {
    const newValue = !allSelected
    setItems({
      item1: newValue,
      item2: newValue,
      item3: newValue,
      item4: newValue
    })
  }

  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Interactive Examples</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8">
          Real-world usage patterns including forms, validation, and group selections.
        </p>

        <div class="space-y-12">
          {/* Form Validation Example */}
          <div class="space-y-6">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Form Validation</h3>
            <form onSubmit={handleSubmit} class="space-y-6">
              <div class="space-y-4">
                <Checkbox
                  label="I agree to the Terms and Conditions"
                  description="Required to create an account"
                  checked={formData.terms}
                  error={formErrors.terms}
                  errorMessage={formErrors.terms ? "You must accept the terms" : undefined}
                  onChange={(e) => {
                    const checked = (e.target as HTMLInputElement).checked
                    setFormData(prev => ({ ...prev, terms: checked }))
                    if (checked && formErrors.terms) {
                      setFormErrors(prev => ({ ...prev, terms: false }))
                    }
                  }}
                />
                
                <Checkbox
                  label="Subscribe to newsletter"
                  description="Get updates about new features (optional)"
                  checked={formData.newsletter}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    newsletter: (e.target as HTMLInputElement).checked 
                  }))}
                />
                
                <Checkbox
                  label="I agree to the Privacy Policy"
                  description="Required for data processing"
                  checked={formData.privacy}
                  error={formErrors.privacy}
                  errorMessage={formErrors.privacy ? "Privacy policy acceptance is required" : undefined}
                  onChange={(e) => {
                    const checked = (e.target as HTMLInputElement).checked
                    setFormData(prev => ({ ...prev, privacy: checked }))
                    if (checked && formErrors.privacy) {
                      setFormErrors(prev => ({ ...prev, privacy: false }))
                    }
                  }}
                />
              </div>
              
              <button
                type="submit"
                class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Submit Form
              </button>
            </form>
          </div>

          {/* Group Selection Example */}
          <div class="space-y-6">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Group Selection (Select All)</h3>
            <div class="space-y-4">
              <div class="border-b border-gray-200 dark:border-gray-600 pb-4">
                <Checkbox
                  label="Select All Items"
                  description={`${selectedItems} of ${totalItems} items selected`}
                  checked={allSelected}
                  indeterminate={indeterminate}
                  onChange={handleSelectAll}
                />
              </div>
              
              <div class="ml-6 space-y-3">
                <Checkbox
                  label="Project Alpha"
                  description="React application development"
                  checked={items.item1}
                  onChange={(e) => setItems(prev => ({ 
                    ...prev, 
                    item1: (e.target as HTMLInputElement).checked 
                  }))}
                />
                
                <Checkbox
                  label="Project Beta"
                  description="API backend development"
                  checked={items.item2}
                  onChange={(e) => setItems(prev => ({ 
                    ...prev, 
                    item2: (e.target as HTMLInputElement).checked 
                  }))}
                />
                
                <Checkbox
                  label="Project Gamma"
                  description="Mobile app development"
                  checked={items.item3}
                  onChange={(e) => setItems(prev => ({ 
                    ...prev, 
                    item3: (e.target as HTMLInputElement).checked 
                  }))}
                />
                
                <Checkbox
                  label="Project Delta"
                  description="DevOps and deployment"
                  checked={items.item4}
                  onChange={(e) => setItems(prev => ({ 
                    ...prev, 
                    item4: (e.target as HTMLInputElement).checked 
                  }))}
                />
              </div>
            </div>
          </div>

          {/* Custom Content Example */}
          <div class="space-y-6">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Custom Content</h3>
            <div class="space-y-4">
              <Checkbox
                checked={customStates.custom1}
                onChange={(e) => setCustomStates(prev => ({ 
                  ...prev, 
                  custom1: (e.target as HTMLInputElement).checked 
                }))}
              >
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <div class="font-medium text-gray-900 dark:text-gray-100">
                      Enable notifications
                    </div>
                    <div class="text-sm text-gray-600 dark:text-gray-400">
                      Get notified about important updates
                    </div>
                  </div>
                </div>
              </Checkbox>
              
              <Checkbox
                checked={customStates.custom2}
                onChange={(e) => setCustomStates(prev => ({ 
                  ...prev, 
                  custom2: (e.target as HTMLInputElement).checked 
                }))}
              >
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <div class="font-medium text-gray-900 dark:text-gray-100">
                      Enhanced security
                    </div>
                    <div class="text-sm text-gray-600 dark:text-gray-400">
                      Enable two-factor authentication
                    </div>
                  </div>
                </div>
              </Checkbox>
            </div>
          </div>
        </div>

        {/* Code Examples */}
        <div class="mt-12">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">Code Examples</h3>
          <div class="space-y-6">
            <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Form Validation</h4>
              <pre class="text-sm text-gray-800 dark:text-gray-200">
                <code>{`<Checkbox
  label="I agree to the Terms"
  error={!accepted}
  errorMessage="This field is required"
  onChange={(e) => setAccepted(e.target.checked)}
/>`}</code>
              </pre>
            </div>
            
            <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select All Pattern</h4>
              <pre class="text-sm text-gray-800 dark:text-gray-200">
                <code>{`<Checkbox
  label="Select All"
  checked={allSelected}
  indeterminate={someSelected}
  onChange={handleSelectAll}
/>`}</code>
              </pre>
            </div>
            
            <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Custom Content</h4>
              <pre class="text-sm text-gray-800 dark:text-gray-200">
                <code>{`<Checkbox onChange={handleChange}>
  <div className="flex items-center gap-3">
    <Avatar />
    <div>
      <div>Custom label</div>
      <div>With description</div>
    </div>
  </div>
</Checkbox>`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
