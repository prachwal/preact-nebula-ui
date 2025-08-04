import { Skeleton } from '@/components';

export function AnimationSection() {
  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Animation Variants</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8">
          Different animation styles to provide visual feedback during loading states.
        </p>

        <div class="space-y-8">
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Animation Types</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="space-y-4">
                <div class="space-y-2">
                  <h4 class="text-md font-medium text-gray-900 dark:text-white">Pulse (Default)</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-300">Smooth opacity pulsing animation</p>
                </div>
                <div class="space-y-3">
                  <Skeleton height="1rem" animation="pulse" />
                  <Skeleton height="1rem" width="80%" animation="pulse" />
                  <Skeleton height="1rem" width="60%" animation="pulse" />
                </div>
              </div>

              <div class="space-y-4">
                <div class="space-y-2">
                  <h4 class="text-md font-medium text-gray-900 dark:text-white">Wave</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-300">Shimmering wave effect</p>
                </div>
                <div class="space-y-3">
                  <Skeleton height="1rem" animation="wave" />
                  <Skeleton height="1rem" width="80%" animation="wave" />
                  <Skeleton height="1rem" width="60%" animation="wave" />
                </div>
              </div>

              <div class="space-y-4">
                <div class="space-y-2">
                  <h4 class="text-md font-medium text-gray-900 dark:text-white">None</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-300">Static placeholder without animation</p>
                </div>
                <div class="space-y-3">
                  <Skeleton height="1rem" animation="none" />
                  <Skeleton height="1rem" width="80%" animation="none" />
                  <Skeleton height="1rem" width="60%" animation="none" />
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Animation Comparison</h3>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="text-center space-y-4">
                  <h4 class="text-sm font-medium text-gray-900 dark:text-white">Pulse</h4>
                  <Skeleton width="4rem" height="4rem" variant="circular" animation="pulse" />
                  <div class="space-y-2">
                    <Skeleton height="1rem" animation="pulse" />
                    <Skeleton height="0.75rem" width="80%" animation="pulse" />
                  </div>
                </div>
                <div class="text-center space-y-4">
                  <h4 class="text-sm font-medium text-gray-900 dark:text-white">Wave</h4>
                  <Skeleton width="4rem" height="4rem" variant="circular" animation="wave" />
                  <div class="space-y-2">
                    <Skeleton height="1rem" animation="wave" />
                    <Skeleton height="0.75rem" width="80%" animation="wave" />
                  </div>
                </div>
                <div class="text-center space-y-4">
                  <h4 class="text-sm font-medium text-gray-900 dark:text-white">None</h4>
                  <Skeleton width="4rem" height="4rem" variant="circular" animation="none" />
                  <div class="space-y-2">
                    <Skeleton height="1rem" animation="none" />
                    <Skeleton height="0.75rem" width="80%" animation="none" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Real-world Example</h3>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <div class="space-y-6">
                <h4 class="text-md font-medium text-gray-900 dark:text-white">Loading Feed</h4>
                <div class="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 p-4">
                      <div class="flex items-start space-x-3">
                        <Skeleton width="2.5rem" height="2.5rem" variant="circular" animation="wave" />
                        <div class="flex-1 space-y-3">
                          <div class="space-y-2">
                            <Skeleton height="1rem" width="30%" animation="wave" />
                            <Skeleton height="0.75rem" width="20%" animation="wave" />
                          </div>
                          <div class="space-y-2">
                            <Skeleton height="0.875rem" animation="wave" />
                            <Skeleton height="0.875rem" width="90%" animation="wave" />
                            <Skeleton height="0.875rem" width="75%" animation="wave" />
                          </div>
                          <Skeleton height="8rem" variant="rectangular" animation="wave" />
                          <div class="flex space-x-4">
                            <Skeleton height="2rem" width="4rem" variant="rectangular" animation="wave" />
                            <Skeleton height="2rem" width="4rem" variant="rectangular" animation="wave" />
                            <Skeleton height="2rem" width="4rem" variant="rectangular" animation="wave" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
