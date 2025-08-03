import { Spinner } from '@/components'

export function UsageSection() {
  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Real-world Usage Examples</h2>
        
        <div class="space-y-8">
          {/* Inline Text */}
          <div class="space-y-4">
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">Inline with Text</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">Small spinners that flow with text content</p>
            </div>
            
            <div class="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg space-y-4">
              <div class="text-gray-900 dark:text-white flex items-center gap-2">
                <Spinner size="xs" /> Loading your profile...
              </div>
              <div class="text-gray-900 dark:text-white flex items-center gap-2">
                <Spinner size="sm" color="blue" /> Saving changes...
              </div>
              <div class="text-gray-900 dark:text-white flex items-center gap-2">
                Processing payment <Spinner size="xs" color="green" />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div class="space-y-4">
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">In Buttons</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">Button loading states with appropriate spinner sizes</p>
            </div>
            
            <div class="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
              <div class="flex flex-wrap gap-4">
                <button class="px-3 py-1 bg-blue-600 text-white rounded text-sm flex items-center gap-2">
                  <Spinner size="xs" color="white" />
                  Save
                </button>
                <button class="px-4 py-2 bg-green-600 text-white rounded flex items-center gap-2">
                  <Spinner size="sm" color="white" />
                  Submit Form
                </button>
                <button class="px-6 py-3 bg-red-600 text-white rounded text-lg flex items-center gap-2">
                  <Spinner size="md" color="white" />
                  Delete Account
                </button>
              </div>
            </div>
          </div>

          {/* Cards and Containers */}
          <div class="space-y-4">
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">Cards and Containers</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">Centered spinners for content loading states</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="bg-gray-100 dark:bg-gray-700 p-8 rounded-lg flex flex-col items-center justify-center min-h-32">
                <Spinner size="lg" color="blue" />
                <div class="text-sm text-gray-600 dark:text-gray-300 mt-2">Loading content...</div>
              </div>

              <div class="bg-gray-100 dark:bg-gray-700 p-8 rounded-lg flex flex-col items-center justify-center min-h-32">
                <Spinner size="xl" color="green" />
                <div class="text-sm text-gray-600 dark:text-gray-300 mt-2">Processing...</div>
              </div>

              <div class="bg-gray-100 dark:bg-gray-700 p-8 rounded-lg flex flex-col items-center justify-center min-h-32">
                <Spinner size="2xl" color="red" />
                <div class="text-sm text-gray-600 dark:text-gray-300 mt-2">Heavy operation...</div>
              </div>
            </div>
          </div>

          {/* Full Page Loading */}
          <div class="space-y-4">
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">Full Page Loading</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">Large spinner for full-screen loading overlays</p>
            </div>
            
            <div class="bg-gray-100 dark:bg-gray-700 p-12 rounded-lg flex flex-col items-center justify-center min-h-64">
              <Spinner size="2xl" color="blue" />
              <div class="text-lg text-gray-600 dark:text-gray-300 mt-4">Loading application...</div>
              <div class="text-sm text-gray-500 dark:text-gray-400 mt-2">Please wait while we prepare everything</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
