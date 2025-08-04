import { Alert } from '@/components';

export function VariantsSection() {
  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Alert Variants</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8">
          Different alert variants for various message types.
        </p>

        <div class="space-y-6">
          {[
            { variant: 'info' as const, title: 'Information', message: 'This is an informational message for general updates.' },
            { variant: 'success' as const, title: 'Success', message: 'Your action was completed successfully!' },
            { variant: 'warning' as const, title: 'Warning', message: 'Please review this important warning message.' },
            { variant: 'error' as const, title: 'Error', message: 'An error occurred while processing your request.' }
          ].map(({ variant, title, message }) => (
            <div key={variant} class="space-y-4">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white capitalize">
                {variant} Alert
              </h3>
              <Alert variant={variant} title={title}>
                {message}
              </Alert>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
