import { Stack } from '../../../../nebula/components'

export function SpacingVariants() {
  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Spacing Variants</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Different spacing options from tight to very loose arrangements.
        </p>

        <div className="space-y-8">
          {/* Vertical Spacing */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Vertical Spacing</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { spacing: 'xs' as const, label: 'Tight (4px)', description: 'Minimal spacing for closely related items' },
                { spacing: 'sm' as const, label: 'Snug (8px)', description: 'Small spacing for compact layouts' },
                { spacing: 'md' as const, label: 'Normal (16px)', description: 'Default spacing for most use cases' },
                { spacing: 'lg' as const, label: 'Relaxed (24px)', description: 'More breathing room between items' }
              ].map(({ spacing, label, description }) => (
                <div key={spacing}>
                  <h4 className="text-md font-medium text-gray-900 dark:text-white mb-2">
                    spacing="{spacing}"
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{label}</p>
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                    <Stack direction="vertical" spacing={spacing}>
                      <div className="bg-blue-500 text-white p-2 rounded text-center text-sm">A</div>
                      <div className="bg-green-500 text-white p-2 rounded text-center text-sm">B</div>
                      <div className="bg-purple-500 text-white p-2 rounded text-center text-sm">C</div>
                    </Stack>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Horizontal Spacing */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Horizontal Spacing</h3>
            
            <div className="space-y-6">
              {[
                { spacing: 'xs' as const, label: 'Tight (4px)' },
                { spacing: 'sm' as const, label: 'Snug (8px)' },
                { spacing: 'md' as const, label: 'Normal (16px)' },
                { spacing: 'lg' as const, label: 'Relaxed (24px)' },
                { spacing: 'xl' as const, label: 'Loose (32px)' }
              ].map(({ spacing, label }) => (
                <div key={spacing}>
                  <h4 className="text-md font-medium text-gray-900 dark:text-white mb-2">
                    spacing="{spacing}" - {label}
                  </h4>
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                    <Stack direction="horizontal" spacing={spacing}>
                      <div className="bg-blue-500 text-white p-2 rounded text-center min-w-12">A</div>
                      <div className="bg-green-500 text-white p-2 rounded text-center min-w-12">B</div>
                      <div className="bg-purple-500 text-white p-2 rounded text-center min-w-12">C</div>
                      <div className="bg-orange-500 text-white p-2 rounded text-center min-w-12">D</div>
                    </Stack>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Zero Spacing */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Zero Spacing</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              No spacing between items for seamless connections
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">Vertical - No Spacing</h4>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                  <Stack direction="vertical" spacing="none">
                    <div className="bg-blue-500 text-white p-3 text-center border-b border-blue-600">Header</div>
                    <div className="bg-green-500 text-white p-3 text-center border-b border-green-600">Content</div>
                    <div className="bg-purple-500 text-white p-3 text-center">Footer</div>
                  </Stack>
                </div>
              </div>

              <div>
                <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">Horizontal - No Spacing</h4>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                  <Stack direction="horizontal" spacing="none">
                    <div className="bg-blue-500 text-white p-3 text-center border-r border-blue-600">Left</div>
                    <div className="bg-green-500 text-white p-3 text-center border-r border-green-600">Center</div>
                    <div className="bg-purple-500 text-white p-3 text-center">Right</div>
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
