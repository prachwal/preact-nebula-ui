import { Badge } from '@/components';

export function VariantsSection() {
  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Badge Variants</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8">
          Different badge variants for various contexts and meanings.
        </p>

        <div class="space-y-6">
          {[
            { variant: 'default' as const, label: 'Default', description: 'Standard neutral badge' },
            { variant: 'primary' as const, label: 'Primary', description: 'Primary action or highlight' },
            { variant: 'secondary' as const, label: 'Secondary', description: 'Secondary information' },
            { variant: 'success' as const, label: 'Success', description: 'Successful or positive status' },
            { variant: 'warning' as const, label: 'Warning', description: 'Warning or attention needed' },
            { variant: 'error' as const, label: 'Error', description: 'Error or critical status' }
          ].map(({ variant, label, description }) => (
            <div key={variant} class="space-y-4">
              <div>
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">{label}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-300">{description}</p>
              </div>
              
              <div class="flex items-center space-x-6">
                <Badge variant={variant}>{label}</Badge>
                <Badge variant={variant}>12</Badge>
                <Badge variant={variant} dot />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
