import { Button } from '@/components'

interface VariantsSectionProps {
  onButtonClick: () => void
}

export function VariantsSection({ onButtonClick }: VariantsSectionProps) {
  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Button Variants</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { variant: 'primary' as const, description: 'Primary action button with blue background' },
            { variant: 'secondary' as const, description: 'Secondary action with gray background' },
            { variant: 'outline' as const, description: 'Outlined button with transparent background' },
            { variant: 'ghost' as const, description: 'Minimal button with hover effect only' },
            { variant: 'destructive' as const, description: 'Destructive action with red background' }
          ].map(({ variant, description }) => (
            <div key={variant} class="space-y-4">
              <div>
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                  variant="{variant}"
                </h3>
                <p class="text-sm text-gray-600 dark:text-gray-300">{description}</p>
              </div>
              
              <div class="space-y-3">
                <Button variant={variant} onClick={onButtonClick}>
                  {variant.charAt(0).toUpperCase() + variant.slice(1)} Button
                </Button>
                
                <div class="text-xs text-gray-500 dark:text-gray-400">
                  Click to test interaction
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
