import { Alert } from '@/components';

export function SizesSection() {
  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Alert Sizes</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8">
          Different sizes for various content densities.
        </p>

        <div class="space-y-6">
          {[
            { size: 'sm' as const, label: 'Small', description: 'Compact alerts for minimal content' },
            { size: 'md' as const, label: 'Medium', description: 'Standard alerts for most use cases' },
            { size: 'lg' as const, label: 'Large', description: 'Prominent alerts for important content' }
          ].map(({ size, label, description }) => (
            <div key={size} class="space-y-4">
              <div>
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">{label} Alert</h3>
                <p class="text-sm text-gray-600 dark:text-gray-300">{description}</p>
              </div>
              <Alert size={size} variant="info" title={`${label} Alert Title`}>
                This is a {size} sized alert message demonstrating the size variant.
              </Alert>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
