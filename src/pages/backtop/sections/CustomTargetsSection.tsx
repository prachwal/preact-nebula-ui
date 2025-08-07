import { BackTop } from '@/components'
import { Label } from '@/components'
import { useRef } from 'preact/hooks'

export function CustomTargetsSection() {
  const customTargetRef = useRef<HTMLDivElement>(null)

  const scrollContent = Array.from({ length: 25 }, (_, i) => (
    <div key={i} className="p-4 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600 mb-3 space-y-2">
      <h4 className="font-medium text-gray-900 dark:text-white text-sm">
        Scroll Item {i + 1}
      </h4>
      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
      </p>
      {i % 4 === 0 && (
        <p className="text-gray-500 dark:text-gray-500 text-xs">
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem.
        </p>
      )}
      {i % 6 === 0 && (
        <p className="text-gray-400 dark:text-gray-400 text-xs italic">
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
        </p>
      )}
    </div>
  ))

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Custom Scroll Targets
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Configure BackTop to work with specific scroll containers instead of the window.
        </p>

        <div className="space-y-6">
          <div>
            <Label>Window Target (Default)</Label>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              Scrolls the entire page to the top
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 relative">
              <div className="max-h-48 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-3 rounded">
                {scrollContent.slice(0, 12)}
              </div>
              <BackTop 
                target={() => window}
                visibilityHeight={30}
                duration={500}
              />
            </div>
          </div>

          <div>
            <Label>Custom Container Target</Label>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              Scrolls only the specific container to the top
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 relative">
              <div 
                ref={customTargetRef}
                className="max-h-48 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-3 rounded relative"
              >
                {scrollContent}
              </div>
              <BackTop 
                target={() => customTargetRef.current!}
                visibilityHeight={50}
                duration={400}
              />
            </div>
          </div>

          <div>
            <Label>With Custom Click Handler</Label>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              Custom behavior when BackTop button is clicked
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 relative">
              <div className="max-h-48 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-3 rounded">
                {scrollContent.slice(0, 10)}
              </div>
              <BackTop 
                visibilityHeight={30}
                duration={300}
                onClick={() => {
                  alert('Custom BackTop action triggered!')
                }}
              >
                <span className="text-xs font-medium">Custom</span>
              </BackTop>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
