import { Alert } from '@/components';

export function BasicUsageSection() {
  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Basic Alert Usage</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8">
          Simple alert messages to communicate information to users.
        </p>

        <div class="space-y-6">
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Default Alert</h3>
            <Alert>
              This is a basic info alert message.
            </Alert>
          </div>

          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Alert with Title</h3>
            <Alert title="Important Information">
              This alert includes a title for better organization.
            </Alert>
          </div>

          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Without Icon</h3>
            <Alert icon={false}>
              This alert message has no icon.
            </Alert>
          </div>
        </div>
      </div>
    </div>
  );
}
