import { Spinner } from '@/components'

export function ColorsSection() {
  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Spinner Colors</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8">
          Multiple color options to match your design system and provide semantic meaning.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { color: 'current' as const, description: 'Inherits text color (default)', bgClass: 'bg-gray-100 dark:bg-gray-700' },
            { color: 'blue' as const, description: 'Primary blue for general loading', bgClass: 'bg-blue-50 dark:bg-blue-900/20' },
            { color: 'gray' as const, description: 'Neutral gray for subtle loading', bgClass: 'bg-gray-100 dark:bg-gray-700' },
            { color: 'white' as const, description: 'White for dark backgrounds', bgClass: 'bg-gray-800' },
            { color: 'red' as const, description: 'Red for error or danger states', bgClass: 'bg-red-50 dark:bg-red-900/20' },
            { color: 'green' as const, description: 'Green for success loading', bgClass: 'bg-green-50 dark:bg-green-900/20' },
            { color: 'yellow' as const, description: 'Yellow for warning states', bgClass: 'bg-yellow-50 dark:bg-yellow-900/20' }
          ].map(({ color, description, bgClass }) => (
            <div key={color} class="space-y-4">
              <div>
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                  color="{color}"
                </h3>
                <p class="text-sm text-gray-600 dark:text-gray-300">{description}</p>
              </div>
              
              <div class={`${bgClass} p-6 rounded-lg flex items-center justify-center`}>
                <Spinner color={color} size="lg" />
              </div>
            </div>
          ))}
        </div>

        {/* Color combinations with different sizes */}
        <div class="mt-12">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-6">Color Combinations</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
              <h4 class="text-md font-medium text-gray-900 dark:text-white mb-4">Light Backgrounds</h4>
              <div class="flex items-center justify-center gap-6">
                <Spinner color="blue" size="lg" />
                <Spinner color="red" size="lg" />
                <Spinner color="green" size="lg" />
                <Spinner color="yellow" size="lg" />
              </div>
            </div>
            
            <div class="bg-gray-800 p-6 rounded-lg">
              <h4 class="text-md font-medium text-white mb-4">Dark Backgrounds</h4>
              <div class="flex items-center justify-center gap-6">
                <Spinner color="white" size="lg" />
                <Spinner color="blue" size="lg" />
                <Spinner color="green" size="lg" />
                <Spinner color="yellow" size="lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
