import { Spinner } from '@/components'

export function SizesSection() {
  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Spinner Sizes</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8">
          Six different sizes to match your UI requirements, from tiny inline indicators to prominent loading displays.
        </p>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {[
            { size: 'xs' as const, dimensions: '10px × 10px', description: 'Extra small for inline text' },
            { size: 'sm' as const, dimensions: '12px × 12px', description: 'Small for compact components' },
            { size: 'md' as const, dimensions: '16px × 16px', description: 'Medium (default)' },
            { size: 'lg' as const, dimensions: '20px × 20px', description: 'Large for buttons' },
            { size: 'xl' as const, dimensions: '24px × 24px', description: 'Extra large for cards' },
            { size: '2xl' as const, dimensions: '32px × 32px', description: 'Largest for full-screen loading' }
          ].map(({ size, dimensions, description }) => (
            <div key={size} class="text-center space-y-4">
              <div>
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                  size="{size}"
                </h3>
                <div class="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                  <div>{dimensions}</div>
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-300 mt-2">{description}</p>
              </div>
              
              <div class="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg flex items-center justify-center">
                <Spinner size={size} />
              </div>
            </div>
          ))}
        </div>

        {/* Size comparison */}
        <div class="mt-12 bg-gray-100 dark:bg-gray-700 p-8 rounded-lg">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-6 text-center">Size Comparison</h3>
          <div class="flex items-center justify-center gap-8 flex-wrap">
            <div class="flex items-center gap-2">
              <Spinner size="xs" />
              <span class="text-sm text-gray-600 dark:text-gray-300">XS</span>
            </div>
            <div class="flex items-center gap-2">
              <Spinner size="sm" />
              <span class="text-sm text-gray-600 dark:text-gray-300">SM</span>
            </div>
            <div class="flex items-center gap-2">
              <Spinner size="md" />
              <span class="text-sm text-gray-600 dark:text-gray-300">MD</span>
            </div>
            <div class="flex items-center gap-2">
              <Spinner size="lg" />
              <span class="text-sm text-gray-600 dark:text-gray-300">LG</span>
            </div>
            <div class="flex items-center gap-2">
              <Spinner size="xl" />
              <span class="text-sm text-gray-600 dark:text-gray-300">XL</span>
            </div>
            <div class="flex items-center gap-2">
              <Spinner size="2xl" />
              <span class="text-sm text-gray-600 dark:text-gray-300">2XL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
