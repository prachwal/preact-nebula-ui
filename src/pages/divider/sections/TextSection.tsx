import { Divider } from '@/components'

export function TextSection() {
  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Dividers with Text</h2>
        
        <div class="space-y-8">
          {/* Horizontal with text */}
          <div class="space-y-4">
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                Horizontal with text
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">Text appears centered between divider lines</p>
            </div>
            
            <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg space-y-6">
              <div>
                <div class="text-gray-900 dark:text-white mb-4">Login form content</div>
                <Divider text="OR" />
                <div class="text-gray-900 dark:text-white mt-4">Social login options</div>
              </div>

              <div>
                <div class="text-gray-900 dark:text-white mb-4">Recent posts</div>
                <Divider text="2024" variant="dashed" />
                <div class="text-gray-900 dark:text-white mt-4">Archived posts</div>
              </div>

              <div>
                <div class="text-gray-900 dark:text-white mb-4">Premium features</div>
                <Divider text="Upgrade Required" size="lg" />
                <div class="text-gray-900 dark:text-white mt-4">Free features</div>
              </div>
            </div>
          </div>

          {/* Vertical with text */}
          <div class="space-y-4">
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                Vertical with text
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">Text appears centered between vertical divider lines</p>
            </div>
            
            <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <div class="flex h-32">
                <div class="flex-1 flex items-center justify-center text-gray-900 dark:text-white">
                  Left Panel Content
                </div>
                <Divider orientation="vertical" text="OR" class="mx-4" />
                <div class="flex-1 flex items-center justify-center text-gray-900 dark:text-white">
                  Right Panel Content
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
