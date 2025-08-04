import { Stack } from '../../../../nebula/components'

export function AlignmentOptions() {
  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Alignment Options</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Control how items are aligned within the stack container.
        </p>

        <div className="space-y-8">
          {/* Vertical Stack Alignment */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Vertical Stack Alignment</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Horizontal alignment of items in a vertical stack
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { align: 'start' as const, label: 'Left aligned (start)', description: 'Items aligned to the left' },
                { align: 'center' as const, label: 'Center aligned', description: 'Items centered horizontally' },
                { align: 'end' as const, label: 'Right aligned (end)', description: 'Items aligned to the right' }
              ].map(({ align, label, description }) => (
                <div key={align}>
                  <h4 className="text-md font-medium text-gray-900 dark:text-white mb-2">
                    align="{align}"
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{label}</p>
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg h-40">
                    <Stack direction="vertical" spacing="sm" align={align}>
                      <div className="bg-blue-500 text-white p-2 rounded w-16 text-center text-sm">A</div>
                      <div className="bg-green-500 text-white p-2 rounded w-24 text-center text-sm">Longer B</div>
                      <div className="bg-purple-500 text-white p-2 rounded w-20 text-center text-sm">C</div>
                    </Stack>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Horizontal Stack Alignment */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Horizontal Stack Alignment</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Vertical alignment of items in a horizontal stack
            </p>
            
            <div className="space-y-6">
              {[
                { align: 'start' as const, label: 'Top aligned (start)', description: 'Items aligned to the top' },
                { align: 'center' as const, label: 'Center aligned', description: 'Items centered vertically' },
                { align: 'end' as const, label: 'Bottom aligned (end)', description: 'Items aligned to the bottom' }
              ].map(({ align, label, description }) => (
                <div key={align}>
                  <h4 className="text-md font-medium text-gray-900 dark:text-white mb-2">
                    align="{align}" - {label}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{description}</p>
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg h-32">
                    <Stack direction="horizontal" spacing="sm" align={align}>
                      <div className="bg-blue-500 text-white p-2 rounded text-center min-w-16 h-8 flex items-center justify-center">Short</div>
                      <div className="bg-green-500 text-white p-2 rounded text-center min-w-16 h-16 flex items-center justify-center">Tall Item</div>
                      <div className="bg-purple-500 text-white p-2 rounded text-center min-w-16 h-12 flex items-center justify-center">Medium</div>
                    </Stack>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stretch Alignment */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Stretch Alignment</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Items stretch to fill the cross-axis
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">Vertical Stack - Stretch Width</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Items stretch to full width</p>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                  <Stack direction="vertical" spacing="sm" align="stretch">
                    <div className="bg-blue-500 text-white p-2 rounded text-center">Full Width A</div>
                    <div className="bg-green-500 text-white p-2 rounded text-center">Full Width B</div>
                    <div className="bg-purple-500 text-white p-2 rounded text-center">Full Width C</div>
                  </Stack>
                </div>
              </div>

              <div>
                <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">Horizontal Stack - Stretch Height</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Items stretch to full height</p>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg h-32">
                  <Stack direction="horizontal" spacing="sm" align="stretch">
                    <div className="bg-blue-500 text-white p-2 rounded text-center flex items-center justify-center min-w-16">A</div>
                    <div className="bg-green-500 text-white p-2 rounded text-center flex items-center justify-center min-w-16">B</div>
                    <div className="bg-purple-500 text-white p-2 rounded text-center flex items-center justify-center min-w-16">C</div>
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
