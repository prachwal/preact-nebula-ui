import { Button } from '@/components'

interface StatesSectionProps {
  onButtonClick: () => void
}

export function StatesSection({ onButtonClick }: StatesSectionProps) {
  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Button States</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { 
              props: {}, 
              label: 'Default State', 
              description: 'Normal interactive button ready for clicks' 
            },
            { 
              props: { disabled: true }, 
              label: 'Disabled State', 
              description: 'Non-interactive button with reduced opacity' 
            },
            { 
              props: { loading: true }, 
              label: 'Loading State', 
              description: 'Button with animated spinner indicating processing' 
            },
            { 
              props: { fullWidth: true }, 
              label: 'Full Width', 
              description: 'Button spans full width of container' 
            }
          ].map(({ props, label, description }, index) => (
            <div key={index} class="space-y-4">
              <div>
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                  {label}
                </h3>
                <p class="text-sm text-gray-600 dark:text-gray-300">{description}</p>
                <div class="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Props: {Object.entries(props).length === 0 ? 'none' : Object.entries(props).map(([key, value]) => `${key}={${value}}`).join(', ')}
                </div>
              </div>
              
              <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <Button {...props} onClick={onButtonClick}>
                  {label}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* State combinations with different variants */}
        <div class="mt-12">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-6">States across Variants</h3>
          <div class="space-y-6">
            {[
              { state: 'loading', props: { loading: true } },
              { state: 'disabled', props: { disabled: true } }
            ].map(({ state, props }) => (
              <div key={state} class="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
                <h4 class="text-md font-medium text-gray-900 dark:text-white mb-4 capitalize">
                  {state} state across all variants
                </h4>
                <div class="flex flex-wrap gap-4">
                  {['primary', 'secondary', 'outline', 'ghost', 'destructive'].map(variant => (
                    <Button key={variant} variant={variant as any} {...props}>
                      {variant} {state}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
