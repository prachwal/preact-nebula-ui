import { Divider } from '@/components'

export function VariantsSection() {
  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Line Style Variants</h2>
        
        <div class="space-y-8">
          {[
            { variant: 'solid' as const, description: 'Solid line (default)' },
            { variant: 'dashed' as const, description: 'Dashed line pattern' },
            { variant: 'dotted' as const, description: 'Dotted line pattern' }
          ].map(({ variant, description }) => (
            <div key={variant} class="space-y-4">
              <div>
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                  variant="{variant}"
                </h3>
                <p class="text-sm text-gray-600 dark:text-gray-300">{description}</p>
              </div>
              
              <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <div class="text-gray-900 dark:text-white mb-4">Content above</div>
                <Divider variant={variant} />
                <div class="text-gray-900 dark:text-white mt-4">Content below</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
