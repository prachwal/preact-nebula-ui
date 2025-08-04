import { Skeleton } from '@/components';

export function BasicUsageSection() {
  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Basic Usage</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8">
          Basic skeleton loading placeholders to show content structure while data is loading.
        </p>

        <div class="space-y-8">
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Text Skeletons</h3>
            <div class="space-y-4">
              <div class="space-y-2">
                <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Single Line</h4>
                <Skeleton height="1rem" />
              </div>
              <div class="space-y-2">
                <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Multiple Lines</h4>
                <div class="space-y-2">
                  <Skeleton height="1rem" />
                  <Skeleton height="1rem" width="80%" />
                  <Skeleton height="1rem" width="60%" />
                </div>
              </div>
              <div class="space-y-2">
                <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Paragraph</h4>
                <div class="space-y-2">
                  <Skeleton height="1rem" />
                  <Skeleton height="1rem" width="95%" />
                  <Skeleton height="1rem" width="85%" />
                  <Skeleton height="1rem" width="75%" />
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Shape Variations</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div class="space-y-3">
                <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Rectangle (Default)</h4>
                <Skeleton height="4rem" />
              </div>
              <div class="space-y-3">
                <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Rounded</h4>
                <Skeleton height="4rem" variant="rectangular" />
              </div>
              <div class="space-y-3">
                <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Circle</h4>
                <div class="flex justify-center">
                  <Skeleton width="4rem" height="4rem" variant="circular" />
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Common Patterns</h3>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div class="space-y-3">
                <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Profile Card</h4>
                <div class="border border-gray-200 dark:border-gray-600 rounded-lg p-4 space-y-4">
                  <div class="flex items-center space-x-4">
                    <Skeleton width="3rem" height="3rem" variant="circular" />
                    <div class="flex-1 space-y-2">
                      <Skeleton height="1rem" width="60%" />
                      <Skeleton height="0.75rem" width="40%" />
                    </div>
                  </div>
                  <div class="space-y-2">
                    <Skeleton height="0.75rem" />
                    <Skeleton height="0.75rem" width="80%" />
                  </div>
                </div>
              </div>
              <div class="space-y-3">
                <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Article Card</h4>
                <div class="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
                  <Skeleton height="8rem" />
                  <div class="p-4 space-y-3">
                    <Skeleton height="1.25rem" />
                    <div class="space-y-2">
                      <Skeleton height="0.875rem" />
                      <Skeleton height="0.875rem" width="85%" />
                    </div>
                    <div class="flex items-center space-x-4 pt-2">
                      <Skeleton width="2rem" height="2rem" variant="circular" />
                      <Skeleton height="0.75rem" width="30%" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
