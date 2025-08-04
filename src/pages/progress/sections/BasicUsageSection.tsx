import { Progress } from '@/components';

export function BasicUsageSection() {
  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Basic Progress Usage</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8">
          Progress indicators to show completion status and loading states.
        </p>

        <div class="space-y-8">
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Linear Progress</h3>
            <div class="space-y-4">
              <Progress value={25} />
              <Progress value={50} />
              <Progress value={75} />
              <Progress value={100} />
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">With Labels</h3>
            <div class="space-y-4">
              <Progress value={25} showLabel />
              <Progress value={60} label="Uploading files..." />
              <Progress value={90} label="Almost done!" />
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Circular Progress</h3>
            <div class="flex items-center space-x-8">
              <Progress variant="circular" value={25} />
              <Progress variant="circular" value={50} showLabel />
              <Progress variant="circular" value={75} label="75%" />
              <Progress variant="circular" value={100} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
