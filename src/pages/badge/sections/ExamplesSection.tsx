import { Badge, Button, Avatar } from '@/components';

export function ExamplesSection() {
  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Real-world Examples</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8">
          Common usage patterns and practical implementations.
        </p>

        <div class="space-y-8">
          {/* Navigation with badges */}
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Navigation Items</h3>
            <div class="flex flex-wrap gap-4">
              <Button variant="ghost" className="relative">
                Messages
                <Badge size="sm" variant="error" className="absolute -top-1 -right-1">3</Badge>
              </Button>
              <Button variant="ghost" className="relative">
                Notifications
                <Badge size="sm" variant="primary" className="absolute -top-1 -right-1">12</Badge>
              </Button>
              <Button variant="ghost" className="relative">
                Updates
                <Badge size="sm" variant="success" dot className="absolute -top-1 -right-1" />
              </Button>
            </div>
          </div>

          {/* Status indicators */}
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Status Indicators</h3>
            <div class="space-y-3">
              <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span class="text-gray-900 dark:text-white">Database Connection</span>
                <Badge variant="success">Online</Badge>
              </div>

              <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span class="text-gray-900 dark:text-white">API Service</span>
                <Badge variant="warning">Degraded</Badge>
              </div>

              <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span class="text-gray-900 dark:text-white">Payment Gateway</span>
                <Badge variant="error">Offline</Badge>
              </div>
            </div>
          </div>

          {/* Count badges */}
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Count Badges</h3>
            <div class="space-y-3">
              <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span class="text-gray-900 dark:text-white">Unread Messages</span>
                <Badge variant="primary">24</Badge>
              </div>
              
              <div class="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Avatar name="John Doe" />
                <div class="flex-1">
                  <h4 class="font-medium text-gray-900 dark:text-white">John Doe</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-300">Active now</p>
                </div>
                <Badge variant="success" dot />
              </div>
            </div>
          </div>

          {/* Feature badges */}
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Feature Tags</h3>
            <div class="space-y-4">
              <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div class="flex items-center justify-between mb-3">
                  <h4 class="font-medium text-gray-900 dark:text-white">Premium Plan</h4>
                  <Badge variant="primary">Pro</Badge>
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-300">Advanced features and priority support</p>
              </div>
              
              <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div class="flex items-center justify-between mb-3">
                  <h4 class="font-medium text-gray-900 dark:text-white">New Dashboard</h4>
                  <Badge variant="success" size="sm">Beta</Badge>
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-300">Try our redesigned dashboard</p>
              </div>
            </div>
          </div>

          {/* Number overflow example */}
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Number Overflow</h3>
            <div class="flex items-center space-x-4">
              <Badge variant="error">99</Badge>
              <Badge variant="error">100</Badge>
              <Badge variant="error">999</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
