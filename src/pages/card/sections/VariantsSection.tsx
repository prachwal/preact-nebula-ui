import { Card } from '@/components';

export function VariantsSection() {
  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Card Variants</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8">
          Different card styles for various use cases and visual hierarchy.
        </p>

        <div class="space-y-8">
          {/* Shadow Variants */}
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Shadow Variants</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="shadow-sm">
                <div class="p-6">
                  <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Small Shadow</h4>
                  <p class="text-gray-600 dark:text-gray-300">Subtle elevation for content that needs slight separation.</p>
                </div>
              </Card>

              <Card className="shadow-md">
                <div class="p-6">
                  <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Medium Shadow</h4>
                  <p class="text-gray-600 dark:text-gray-300">Default elevation for most card content and components.</p>
                </div>
              </Card>

              <Card className="shadow-lg">
                <div class="p-6">
                  <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Large Shadow</h4>
                  <p class="text-gray-600 dark:text-gray-300">Higher elevation for modals, popovers, and important content.</p>
                </div>
              </Card>
            </div>
          </div>

          {/* Border Variants */}
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Border Variants</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-2 border-blue-200 dark:border-blue-800">
                <div class="p-6">
                  <h4 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">Accent Border</h4>
                  <p class="text-gray-600 dark:text-gray-300">Card with colored border for emphasis or categorization.</p>
                </div>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <div class="p-6">
                  <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Side Accent</h4>
                  <p class="text-gray-600 dark:text-gray-300">Left border accent for status indicators or categories.</p>
                </div>
              </Card>

              <Card className="border-dashed border-2 border-gray-300 dark:border-gray-600">
                <div class="p-6">
                  <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Dashed Border</h4>
                  <p class="text-gray-600 dark:text-gray-300">Dashed border style for upload areas or placeholders.</p>
                </div>
              </Card>

              <Card className="border-0 bg-gradient-to-r from-purple-500 to-pink-500 p-0.5">
                <div class="bg-white dark:bg-gray-800 rounded-lg p-6">
                  <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Gradient Border</h4>
                  <p class="text-gray-600 dark:text-gray-300">Gradient border effect for premium or highlighted content.</p>
                </div>
              </Card>
            </div>
          </div>

          {/* Background Variants */}
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Background Variants</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                <div class="p-6">
                  <h4 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">Info Card</h4>
                  <p class="text-blue-800 dark:text-blue-200">Information or help content with blue theming.</p>
                </div>
              </Card>

              <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                <div class="p-6">
                  <h4 class="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">Success Card</h4>
                  <p class="text-green-800 dark:text-green-200">Success messages or positive status updates.</p>
                </div>
              </Card>

              <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
                <div class="p-6">
                  <h4 class="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-2">Warning Card</h4>
                  <p class="text-yellow-800 dark:text-yellow-200">Warnings or caution messages for users.</p>
                </div>
              </Card>

              <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
                <div class="p-6">
                  <h4 class="text-lg font-semibold text-red-900 dark:text-red-100 mb-2">Error Card</h4>
                  <p class="text-red-800 dark:text-red-200">Error messages or critical alerts.</p>
                </div>
              </Card>

              <Card className="bg-gray-50 dark:bg-gray-700">
                <div class="p-6">
                  <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Neutral Card</h4>
                  <p class="text-gray-600 dark:text-gray-300">Neutral content without specific semantic meaning.</p>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0">
                <div class="p-6">
                  <h4 class="text-lg font-semibold mb-2">Gradient Card</h4>
                  <p class="text-purple-100">Eye-catching gradient backgrounds for featured content.</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
