import { BackTop } from '@/components'
import { Label } from '@/components'

export function VariantsSection() {
  const scrollContent = Array.from({ length: 20 }, (_, i) => (
    <div key={i} className="p-4 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600 space-y-2">
      <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
        Content Section {i + 1}
      </h4>
      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
      {i % 3 === 0 && (
        <p className="text-gray-500 dark:text-gray-500 text-xs">
          Additional content to create more scrollable area. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
      )}
    </div>
  ))

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          BackTop Variants
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Different visual styles and shapes for the BackTop button.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <Label>Circle Shape</Label>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 relative">
              <div className="space-y-3 max-h-48 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-3 rounded">
                {scrollContent}
              </div>
              <BackTop 
                shape="circle"
                visibilityHeight={30}
                duration={400}
              />
            </div>
          </div>

          <div>
            <Label>Square Shape</Label>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 relative">
              <div className="space-y-3 max-h-48 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-3 rounded">
                {scrollContent}
              </div>
              <BackTop 
                shape="square"
                visibilityHeight={30}
                duration={400}
              />
            </div>
          </div>

          <div>
            <Label>Primary Variant</Label>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 relative">
              <div className="space-y-3 max-h-48 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-3 rounded">
                {scrollContent}
              </div>
              <BackTop 
                variant="primary"
                visibilityHeight={30}
                duration={400}
              />
            </div>
          </div>

          <div>
            <Label>Secondary Variant</Label>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 relative">
              <div className="space-y-3 max-h-48 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-3 rounded">
                {scrollContent}
              </div>
              <BackTop 
                variant="secondary"
                visibilityHeight={30}
                duration={400}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
