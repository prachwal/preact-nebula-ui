import { Button } from '@/components'

interface CombinationsSectionProps {
  onButtonClick: () => void
}

export function CombinationsSection({ onButtonClick }: CombinationsSectionProps) {
  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Advanced Combinations</h2>
        
        <div class="space-y-8">
          {[
            {
              title: 'CTA Buttons',
              description: 'Call-to-action buttons with different priorities',
              buttons: [
                { variant: 'primary' as const, size: 'lg' as const, leftIcon: true, text: 'Get Started' },
                { variant: 'outline' as const, size: 'lg' as const, text: 'Learn More' }
              ]
            },
            {
              title: 'Loading States',
              description: 'Buttons in loading state across variants',
              buttons: [
                { variant: 'primary' as const, loading: true, text: 'Saving...' },
                { variant: 'secondary' as const, loading: true, text: 'Processing...' },
                { variant: 'destructive' as const, loading: true, text: 'Deleting...' }
              ]
            },
            {
              title: 'Form Actions',
              description: 'Typical form button combinations',
              buttons: [
                { variant: 'primary' as const, text: 'Submit' },
                { variant: 'ghost' as const, text: 'Cancel' },
                { variant: 'destructive' as const, size: 'sm' as const, text: 'Delete' }
              ]
            },
            {
              title: 'Navigation',
              description: 'Navigation buttons with directional icons',
              buttons: [
                { variant: 'outline' as const, leftIcon: 'back', text: 'Previous' },
                { variant: 'primary' as const, rightIcon: 'forward', text: 'Continue' },
                { variant: 'ghost' as const, rightIcon: 'external', text: 'Skip' }
              ]
            }
          ].map(({ title, description, buttons }, groupIndex) => (
            <div key={groupIndex} class="space-y-4">
              <div>
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-300">{description}</p>
              </div>
              
              <div class="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
                <div class="flex flex-wrap gap-4">
                  {buttons.map((btn, btnIndex) => {
                    const iconProps: any = {}
                    
                    if ('leftIcon' in btn && btn.leftIcon === true) {
                      iconProps.leftIcon = (
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      )
                    } else if ('leftIcon' in btn && btn.leftIcon === 'back') {
                      iconProps.leftIcon = (
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                        </svg>
                      )
                    }
                    
                    if ('rightIcon' in btn && btn.rightIcon === 'forward') {
                      iconProps.rightIcon = (
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                      )
                    } else if ('rightIcon' in btn && btn.rightIcon === 'external') {
                      iconProps.rightIcon = (
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      )
                    }
                    
                    return (
                      <Button
                        key={btnIndex}
                        variant={btn.variant}
                        size={'size' in btn ? btn.size : undefined}
                        loading={'loading' in btn ? btn.loading : undefined}
                        onClick={onButtonClick}
                        {...iconProps}
                      >
                        {btn.text}
                      </Button>
                    )
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
