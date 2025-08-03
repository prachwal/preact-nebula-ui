import { Spinner } from '@/components'

export function AccessibilitySection() {
  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Accessibility Features</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8">
          Built-in accessibility support for screen readers and assistive technologies.
        </p>
        
        <div class="space-y-8">
          {/* ARIA Labels */}
          <div class="space-y-4">
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">ARIA Labels</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">Custom labels for screen readers</p>
            </div>
            
            <div class="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg space-y-4">
              <div class="flex items-center gap-4">
                <Spinner aria-label="Loading profile data" />
                <code class="text-sm bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">
                  aria-label="Loading profile data"
                </code>
              </div>
              
              <div class="flex items-center gap-4">
                <Spinner aria-label="Saving your changes, please wait" color="green" />
                <code class="text-sm bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">
                  aria-label="Saving your changes, please wait"
                </code>
              </div>
              
              <div class="flex items-center gap-4">
                <Spinner aria-label="Processing payment securely" color="blue" />
                <code class="text-sm bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">
                  aria-label="Processing payment securely"
                </code>
              </div>
            </div>
          </div>

          {/* Role and Status */}
          <div class="space-y-4">
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">Role and Status</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">Automatic role="status" for proper screen reader announcements</p>
            </div>
            
            <div class="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
              <div class="space-y-2">
                <div class="text-sm text-gray-900 dark:text-white font-medium">All spinners automatically include:</div>
                <ul class="text-sm text-gray-600 dark:text-gray-300 space-y-1 ml-4">
                  <li>• <code>role="status"</code> - Announces loading state changes</li>
                  <li>• <code>aria-label="Loading..."</code> - Default accessible label</li>
                  <li>• Proper SVG structure for screen reader compatibility</li>
                  <li>• Focus management considerations</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Best Practices */}
          <div class="space-y-4">
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">Best Practices</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">Guidelines for accessible spinner usage</p>
            </div>
            
            <div class="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 class="text-sm font-medium text-green-700 dark:text-green-400 mb-2">✅ Do</h4>
                  <ul class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <li>• Provide meaningful aria-label text</li>
                    <li>• Use appropriate colors for context</li>
                    <li>• Match spinner size to content scale</li>
                    <li>• Remove spinner when loading completes</li>
                    <li>• Announce completion to screen readers</li>
                  </ul>
                </div>
                
                <div>
                  <h4 class="text-sm font-medium text-red-700 dark:text-red-400 mb-2">❌ Don't</h4>
                  <ul class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <li>• Use spinners without context</li>
                    <li>• Make spinners too small to notice</li>
                    <li>• Leave spinners running indefinitely</li>
                    <li>• Use only color to convey loading state</li>
                    <li>• Forget to handle loading errors</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
