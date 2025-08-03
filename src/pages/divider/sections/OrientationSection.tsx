import { Divider } from '@/components'

export function OrientationSection() {
  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Divider Orientations</h2>
        
        <div class="space-y-8">
          {/* Horizontal */}
          <div class="space-y-4">
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                orientation="horizontal" (default)
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">Full width horizontal line separator</p>
            </div>
            
            <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <div class="text-gray-900 dark:text-white">Content above divider</div>
              <Divider orientation="horizontal" class="my-4" />
              <div class="text-gray-900 dark:text-white">Content below divider</div>
            </div>
          </div>

          {/* Vertical */}
          <div class="space-y-4">
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                orientation="vertical"
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">Vertical line separator for inline content</p>
            </div>
            
            <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <div class="flex items-center h-24">
                <div class="text-gray-900 dark:text-white px-4">Left content</div>
                <Divider orientation="vertical" class="mx-4" />
                <div class="text-gray-900 dark:text-white px-4">Right content</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
