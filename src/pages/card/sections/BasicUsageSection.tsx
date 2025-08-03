import { Card, Button } from '@/components';

export function BasicUsageSection() {
  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Basic Card Usage</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8">
          Simple card containers for grouping related content with consistent styling.
        </p>

        <div class="space-y-8">
          {/* Simple Cards */}
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Simple Content Cards</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                  <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Simple Card
                  </h4>
                  <p class="text-gray-600 dark:text-gray-300">
                    This is a basic card with simple content. Perfect for displaying basic information or content blocks.
                  </p>
              </Card>

              <Card>
                  <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                    <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    With Icon
                  </h4>
                  <p class="text-gray-600 dark:text-gray-300">
                    Card with an icon element to provide visual context and improve user recognition.
                  </p>
              </Card>

              <Card>
                  <div class="flex items-center mb-4">
                    <div class="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                      <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div class="ml-3">
                      <span class="text-sm font-medium text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-900 px-2 py-1 rounded">
                        Success
                      </span>
                    </div>
                  </div>
                  <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Status Card
                  </h4>
                  <p class="text-gray-600 dark:text-gray-300">
                    Card with status indicators and contextual information for system messages.
                  </p>
              </Card>
            </div>
          </div>

          {/* Cards with Actions */}
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Cards with Actions</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <div class="p-6">
                  <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Product Feature
                  </h4>
                  <p class="text-gray-600 dark:text-gray-300 mb-4">
                    Discover our latest features and improvements that make your workflow more efficient.
                  </p>
                  <Button size="sm">Learn More</Button>
                </div>
              </Card>

              <Card>
                <div class="p-6">
                  <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Quick Settings
                  </h4>
                  <p class="text-gray-600 dark:text-gray-300 mb-4">
                    Adjust your preferences and customize your experience with these quick settings.
                  </p>
                  <div class="flex gap-2">
                    <Button size="sm" variant="outline">Cancel</Button>
                    <Button size="sm">Save Changes</Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Clickable Cards */}
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Interactive Cards</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              Cards that act as clickable elements with hover effects
            </p>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-200 hover:border-blue-300 dark:hover:border-blue-600">
                <div class="p-6 text-center">
                  <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Analytics</h4>
                  <p class="text-gray-600 dark:text-gray-300 text-sm">View detailed reports</p>
                </div>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-200 hover:border-green-300 dark:hover:border-green-600">
                <div class="p-6 text-center">
                  <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Create New</h4>
                  <p class="text-gray-600 dark:text-gray-300 text-sm">Start a new project</p>
                </div>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-200 hover:border-orange-300 dark:hover:border-orange-600">
                <div class="p-6 text-center">
                  <div class="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg class="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Settings</h4>
                  <p class="text-gray-600 dark:text-gray-300 text-sm">Configure options</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
