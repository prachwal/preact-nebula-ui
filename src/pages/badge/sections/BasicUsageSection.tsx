import { Badge } from '@/components';

export function BasicUsageSection() {
  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Basic Badge Usage</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8">
          Small status indicators for labels, counts, and notifications.
        </p>

        <div class="space-y-6">
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Text Badges</h3>
            <div class="flex items-center space-x-4">
              <Badge>Default</Badge>
              <Badge>New</Badge>
              <Badge>Beta</Badge>
              <Badge>Premium</Badge>
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Number Badges</h3>
            <div class="flex items-center space-x-4">
              <Badge>1</Badge>
              <Badge>42</Badge>
              <Badge>99</Badge>
              <Badge>999</Badge>
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Dot Indicators</h3>
            <div class="flex items-center space-x-4">
              <Badge dot />
              <Badge dot variant="success" />
              <Badge dot variant="warning" />
              <Badge dot variant="error" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
