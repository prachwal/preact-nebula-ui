import { useState } from 'preact/hooks'
import { Checkbox } from '@/components/Checkbox'

export function VariantsSection() {
  const [sizes, setSizes] = useState({
    sm: true,
    md: false,
    lg: true
  })
  
  const [variants, setVariants] = useState({
    default: true,
    outlined: false
  })

  const [states, setStates] = useState({
    normal: true,
    disabled: false,
    error: false,
    indeterminate: true
  })

  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Checkbox Variants</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8">
          Different sizes, visual variants, and states for various use cases.
        </p>

        <div class="space-y-12">
          {/* Sizes */}
          <div class="space-y-6">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Sizes</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="space-y-3">
                <h4 class="text-lg font-medium text-gray-700 dark:text-gray-300">Small</h4>
                <Checkbox
                  size="sm"
                  label="Small checkbox"
                  description="Compact size for dense layouts"
                  checked={sizes.sm}
                  onChange={(e) => setSizes(prev => ({ 
                    ...prev, 
                    sm: (e.target as HTMLInputElement).checked 
                  }))}
                />
              </div>
              
              <div class="space-y-3">
                <h4 class="text-lg font-medium text-gray-700 dark:text-gray-300">Medium (Default)</h4>
                <Checkbox
                  size="md"
                  label="Medium checkbox"
                  description="Standard size for most use cases"
                  checked={sizes.md}
                  onChange={(e) => setSizes(prev => ({ 
                    ...prev, 
                    md: (e.target as HTMLInputElement).checked 
                  }))}
                />
              </div>
              
              <div class="space-y-3">
                <h4 class="text-lg font-medium text-gray-700 dark:text-gray-300">Large</h4>
                <Checkbox
                  size="lg"
                  label="Large checkbox"
                  description="Prominent size for important actions"
                  checked={sizes.lg}
                  onChange={(e) => setSizes(prev => ({ 
                    ...prev, 
                    lg: (e.target as HTMLInputElement).checked 
                  }))}
                />
              </div>
            </div>
          </div>

          {/* Visual Variants */}
          <div class="space-y-6">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Visual Variants</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="space-y-4">
                <h4 class="text-lg font-medium text-gray-700 dark:text-gray-300">Default (Filled)</h4>
                <div class="space-y-3">
                  <Checkbox
                    variant="default"
                    label="Default variant"
                    description="Filled background when checked"
                    checked={variants.default}
                    onChange={(e) => setVariants(prev => ({ 
                      ...prev, 
                      default: (e.target as HTMLInputElement).checked 
                    }))}
                  />
                  <Checkbox
                    variant="default"
                    label="Indeterminate state"
                    indeterminate={true}
                  />
                </div>
              </div>
              
              <div class="space-y-4">
                <h4 class="text-lg font-medium text-gray-700 dark:text-gray-300">Outlined</h4>
                <div class="space-y-3">
                  <Checkbox
                    variant="outlined"
                    label="Outlined variant"
                    description="Transparent background with colored border"
                    checked={variants.outlined}
                    onChange={(e) => setVariants(prev => ({ 
                      ...prev, 
                      outlined: (e.target as HTMLInputElement).checked 
                    }))}
                  />
                  <Checkbox
                    variant="outlined"
                    label="Outlined indeterminate"
                    indeterminate={true}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* States */}
          <div class="space-y-6">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">States</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="space-y-4">
                <h4 class="text-lg font-medium text-gray-700 dark:text-gray-300">Interactive States</h4>
                <div class="space-y-3">
                  <Checkbox
                    label="Normal state"
                    description="Default interactive state"
                    checked={states.normal}
                    onChange={(e) => setStates(prev => ({ 
                      ...prev, 
                      normal: (e.target as HTMLInputElement).checked 
                    }))}
                  />
                  <Checkbox
                    label="Disabled state"
                    description="Non-interactive state"
                    disabled
                    checked={states.disabled}
                  />
                  <Checkbox
                    label="Indeterminate state"
                    description="Partial selection state"
                    indeterminate={states.indeterminate}
                    onChange={() => setStates(prev => ({ 
                      ...prev, 
                      indeterminate: !prev.indeterminate 
                    }))}
                  />
                </div>
              </div>
              
              <div class="space-y-4">
                <h4 class="text-lg font-medium text-gray-700 dark:text-gray-300">Error State</h4>
                <div class="space-y-3">
                  <Checkbox
                    label="Terms and conditions"
                    description="You must accept the terms to continue"
                    error={true}
                    errorMessage="This field is required"
                    checked={states.error}
                    onChange={(e) => setStates(prev => ({ 
                      ...prev, 
                      error: (e.target as HTMLInputElement).checked 
                    }))}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Label Positioning */}
          <div class="space-y-6">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Label Positioning</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="space-y-3">
                <h4 class="text-lg font-medium text-gray-700 dark:text-gray-300">Label on Right (Default)</h4>
                <Checkbox
                  label="Label on the right side"
                  description="Standard label positioning"
                  labelPosition="right"
                  checked={true}
                />
              </div>
              
              <div class="space-y-3">
                <h4 class="text-lg font-medium text-gray-700 dark:text-gray-300">Label on Left</h4>
                <Checkbox
                  label="Label on the left side"
                  description="Alternative label positioning"
                  labelPosition="left"
                  checked={false}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Code Examples */}
        <div class="mt-12">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">Code Examples</h3>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sizes</h4>
              <pre class="text-sm text-gray-800 dark:text-gray-200">
                <code>{`<Checkbox size="sm" label="Small" />
<Checkbox size="md" label="Medium" />
<Checkbox size="lg" label="Large" />`}</code>
              </pre>
            </div>
            
            <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Variants</h4>
              <pre class="text-sm text-gray-800 dark:text-gray-200">
                <code>{`<Checkbox variant="default" />
<Checkbox variant="outlined" />`}</code>
              </pre>
            </div>
            
            <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">States</h4>
              <pre class="text-sm text-gray-800 dark:text-gray-200">
                <code>{`<Checkbox disabled />
<Checkbox indeterminate />
<Checkbox error errorMessage="Required" />`}</code>
              </pre>
            </div>
            
            <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Label Position</h4>
              <pre class="text-sm text-gray-800 dark:text-gray-200">
                <code>{`<Checkbox labelPosition="right" />
<Checkbox labelPosition="left" />`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
