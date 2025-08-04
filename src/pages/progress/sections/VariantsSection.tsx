import { Progress } from '@/components';

export function VariantsSection() {
  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Progress Variants</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8">
          Different visual styles for various contexts and meanings.
        </p>

        <div class="space-y-8">
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Linear Variants</h3>
            <div class="space-y-6">
              {[
                { variant: 'linear' as const, color: 'primary' as const, label: 'Primary', description: 'Default progress color' },
                { variant: 'linear' as const, color: 'secondary' as const, label: 'Secondary', description: 'Subtle progress indication' },
                { variant: 'linear' as const, color: 'success' as const, label: 'Success', description: 'Successful operations' },
                { variant: 'linear' as const, color: 'warning' as const, label: 'Warning', description: 'Warning states' },
                { variant: 'linear' as const, color: 'error' as const, label: 'Error', description: 'Error or critical states' }
              ].map(({ variant, color, label, description }) => (
                <div key={color} class="space-y-2">
                  <div>
                    <h4 class="text-md font-medium text-gray-900 dark:text-white">{label}</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-300">{description}</p>
                  </div>
                  <Progress variant={variant} color={color} value={65} showLabel />
                </div>
              ))}
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Circular Variants</h3>
            <div class="flex flex-wrap gap-8">
              {[
                { color: 'primary' as const, label: 'Primary' },
                { color: 'secondary' as const, label: 'Secondary' },
                { color: 'success' as const, label: 'Success' },
                { color: 'warning' as const, label: 'Warning' },
                { color: 'error' as const, label: 'Error' }
              ].map(({ color, label }) => (
                <div key={color} class="text-center">
                  <Progress variant="circular" color={color} value={75} showLabel />
                  <p class="text-sm text-gray-600 dark:text-gray-300 mt-2">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
