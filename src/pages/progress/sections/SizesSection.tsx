import { Progress } from '@/components';

export function SizesSection() {
  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Progress Sizes</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8">
          Different sizes to fit various UI contexts and space constraints.
        </p>

        <div class="space-y-8">
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Linear Sizes</h3>
            <div class="space-y-6">
              {[
                { size: 'sm' as const, label: 'Small', description: 'Compact progress bars for tight spaces' },
                { size: 'md' as const, label: 'Medium', description: 'Default size for most use cases' },
                { size: 'lg' as const, label: 'Large', description: 'Prominent progress indication' }
              ].map(({ size, label, description }) => (
                <div key={size} class="space-y-2">
                  <div>
                    <h4 class="text-md font-medium text-gray-900 dark:text-white">{label} ({size})</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-300">{description}</p>
                  </div>
                  <Progress variant="linear" size={size} value={60} showLabel />
                </div>
              ))}
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Circular Sizes</h3>
            <div class="flex flex-wrap gap-8 items-end">
              {[
                { size: 'sm' as const, label: 'Small' },
                { size: 'md' as const, label: 'Medium' },
                { size: 'lg' as const, label: 'Large' }
              ].map(({ size, label }) => (
                <div key={size} class="text-center">
                  <Progress variant="circular" size={size} value={70} showLabel />
                  <p class="text-sm text-gray-600 dark:text-gray-300 mt-2">{label} ({size})</p>
                </div>
              ))}
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Size Comparison</h3>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <div class="space-y-4">
                <div class="flex items-center gap-4">
                  <span class="text-sm font-medium text-gray-900 dark:text-white w-20">Linear:</span>
                  <div class="flex items-center gap-4 flex-1">
                    <Progress variant="linear" size="sm" value={40} />
                    <Progress variant="linear" size="md" value={40} />
                    <Progress variant="linear" size="lg" value={40} />
                  </div>
                </div>
                <div class="flex items-center gap-4">
                  <span class="text-sm font-medium text-gray-900 dark:text-white w-20">Circular:</span>
                  <div class="flex items-center gap-6">
                    <Progress variant="circular" size="sm" value={40} />
                    <Progress variant="circular" size="md" value={40} />
                    <Progress variant="circular" size="lg" value={40} />
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
