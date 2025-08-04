import { Stack, Button } from '../../../../nebula/components'

export function DirectionAndSpacing() {
  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Direction & Basic Spacing</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Control layout direction and spacing between child elements.
        </p>

        <div className="space-y-8">
          {/* Vertical Direction */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Vertical Stack (Default)</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Elements arranged vertically with consistent spacing
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">direction="vertical"</h4>
                <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
                  <Stack direction="vertical" spacing="md">
                    <div className="bg-blue-500 text-white p-3 rounded text-center">Item 1</div>
                    <div className="bg-green-500 text-white p-3 rounded text-center">Item 2</div>
                    <div className="bg-purple-500 text-white p-3 rounded text-center">Item 3</div>
                  </Stack>
                </div>
              </div>

              <div>
                <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">With Buttons</h4>
                <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
                  <Stack direction="vertical" spacing="sm">
                    <Button>Primary Action</Button>
                    <Button variant="outline">Secondary Action</Button>
                    <Button variant="ghost">Tertiary Action</Button>
                  </Stack>
                </div>
              </div>

              <div>
                <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">Form Elements</h4>
                <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
                  <Stack direction="vertical" spacing="md">
                    <div className="text-center p-2 bg-white dark:bg-gray-600 rounded">Label</div>
                    <div className="text-center p-2 bg-white dark:bg-gray-600 rounded">Input</div>
                    <div className="text-center p-2 bg-white dark:bg-gray-600 rounded">Helper Text</div>
                  </Stack>
                </div>
              </div>
            </div>
          </div>

          {/* Horizontal Direction */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Horizontal Stack</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Elements arranged horizontally with consistent spacing
            </p>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">direction="horizontal"</h4>
                <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
                  <Stack direction="horizontal" spacing="md">
                    <div className="bg-blue-500 text-white p-3 rounded text-center min-w-20">Item 1</div>
                    <div className="bg-green-500 text-white p-3 rounded text-center min-w-20">Item 2</div>
                    <div className="bg-purple-500 text-white p-3 rounded text-center min-w-20">Item 3</div>
                    <div className="bg-orange-500 text-white p-3 rounded text-center min-w-20">Item 4</div>
                  </Stack>
                </div>
              </div>

              <div>
                <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">Button Groups</h4>
                <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
                  <Stack direction="horizontal" spacing="sm">
                    <Button size="sm">Save</Button>
                    <Button size="sm" variant="outline">Cancel</Button>
                    <Button size="sm" variant="ghost">Reset</Button>
                  </Stack>
                </div>
              </div>

              <div>
                <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">Navigation Items</h4>
                <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
                  <Stack direction="horizontal" spacing="xl">
                    <div className="text-center p-2 bg-white dark:bg-gray-600 rounded cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900">Home</div>
                    <div className="text-center p-2 bg-white dark:bg-gray-600 rounded cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900">About</div>
                    <div className="text-center p-2 bg-white dark:bg-gray-600 rounded cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900">Services</div>
                    <div className="text-center p-2 bg-white dark:bg-gray-600 rounded cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900">Contact</div>
                  </Stack>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
