import { BackTop } from '@/components'
import { Label } from '@/components'

export function VisibilitySection() {
  const scrollContent = Array.from({ length: 15 }, (_, i) => (
    <div key={i} className="p-4 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600 mb-2">
      <h4 className="font-medium text-gray-900 dark:text-white mb-1">
        Section {i + 1}
      </h4>
      <p className="text-gray-600 dark:text-gray-400 text-sm">
        Content for testing visibility thresholds at different scroll positions.
      </p>
    </div>
  ))

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Visibility Controls
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Configure when the BackTop button appears based on scroll position.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <Label>Low Threshold (50px)</Label>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              Button appears quickly when scrolling
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 relative">
              <div className="max-h-56 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-3 rounded">
                {scrollContent}
              </div>
              <BackTop 
                visibilityHeight={50}
                duration={300}
              />
            </div>
          </div>

          <div>
            <Label>High Threshold (200px)</Label>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              Button appears only after more scrolling
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 relative">
              <div className="max-h-56 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-3 rounded">
                {scrollContent}
              </div>
              <BackTop 
                visibilityHeight={200}
                duration={600}
              />
            </div>
          </div>

          <div>
            <Label>Always Visible</Label>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              Button is always shown regardless of scroll position
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 relative">
              <div className="max-h-56 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-3 rounded">
                {scrollContent.slice(0, 8)}
              </div>
              <BackTop 
                visibilityHeight={0}
                duration={400}
              />
            </div>
          </div>

          <div>
            <Label>Custom Position</Label>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              Button positioned in top-right corner
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 relative">
              <div className="max-h-56 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-3 rounded">
                {scrollContent.slice(0, 8)}
              </div>
              <BackTop 
                visibilityHeight={30}
                duration={400}
                style={{ top: '16px', right: '16px', bottom: 'auto' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
