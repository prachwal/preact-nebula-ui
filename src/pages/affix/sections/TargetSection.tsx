import { useRef } from 'preact/hooks'
import { Affix } from '../../../../nebula/components/Affix'
import { Label } from '../../../../nebula/components/Label'

export function TargetSection() {
  const scrollableRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Target Container</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Specify a custom container element to monitor for scroll events instead of the window.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <Label className="text-gray-700 dark:text-gray-300 mb-2 block">Window Target (Default)</Label>
          <div className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              When no target is specified, the affix monitors the window scroll.
            </p>
            
            <Affix>
              <div className="bg-blue-500 text-white px-4 py-2 rounded shadow-lg inline-block">
                Affixed to window
              </div>
            </Affix>
          </div>
        </div>

        <div>
          <Label className="text-gray-700 dark:text-gray-300 mb-2 block">Custom Scrollable Container</Label>
          <div className="relative">
            <div 
              ref={scrollableRef}
              className="h-64 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-lg p-4"
            >
              <div className="h-16 bg-gray-100 dark:bg-gray-800 rounded mb-4 flex items-center justify-center">
                <span className="text-gray-600 dark:text-gray-400">Scroll within this container</span>
              </div>
              
            <Affix target={() => scrollableRef.current ?? window}>
                <div className="bg-green-500 text-white px-4 py-2 rounded shadow-lg">
                  Affixed to container
                </div>
              </Affix>
              
              <div className="mt-4 space-y-2">
                {Array.from({ length: 20 }, (_, i) => (
                  <div key={i} className="h-12 bg-gray-50 dark:bg-gray-900 rounded flex items-center justify-center">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">Container item {i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <Label className="text-gray-700 dark:text-gray-300 mb-2 block">Multiple Containers</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">Container A</Label>
              <div className="h-48 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-lg p-3">
                <div className="h-12 bg-gray-100 dark:bg-gray-800 rounded mb-3 flex items-center justify-center">
                  <span className="text-gray-600 dark:text-gray-400 text-sm">Container A header</span>
                </div>
                
                <Affix target={() => (document.querySelector('[data-container="a"]') as HTMLElement) ?? window}>
                  <div className="bg-red-500 text-white px-3 py-1 rounded text-sm">
                    Affix A
                  </div>
                </Affix>
                
                <div className="mt-3 space-y-2" data-container="a">
                  {Array.from({ length: 12 }, (_, i) => (
                    <div key={i} className="h-8 bg-gray-50 dark:bg-gray-900 rounded flex items-center justify-center">
                      <span className="text-gray-600 dark:text-gray-400 text-xs">A-{i + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">Container B</Label>
              <div className="h-48 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-lg p-3">
                <div className="h-12 bg-gray-100 dark:bg-gray-800 rounded mb-3 flex items-center justify-center">
                  <span className="text-gray-600 dark:text-gray-400 text-sm">Container B header</span>
                </div>
                
                <Affix target={() => (document.querySelector('[data-container="b"]') as HTMLElement) ?? window}>
                  <div className="bg-yellow-500 text-white px-3 py-1 rounded text-sm">
                    Affix B
                  </div>
                </Affix>
                
                <div className="mt-3 space-y-2" data-container="b">
                  {Array.from({ length: 12 }, (_, i) => (
                    <div key={i} className="h-8 bg-gray-50 dark:bg-gray-900 rounded flex items-center justify-center">
                      <span className="text-gray-600 dark:text-gray-400 text-xs">B-{i + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Label className="text-gray-700 dark:text-gray-300 mb-2 block">Target with Callback</Label>
          <div 
            ref={containerRef}
            className="h-64 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-lg p-4"
          >
            <div className="h-16 bg-gray-100 dark:bg-gray-800 rounded mb-4 flex items-center justify-center">
              <span className="text-gray-600 dark:text-gray-400">Monitor this container</span>
            </div>
            
            <Affix 
              target={() => containerRef.current ?? window}
              onChange={(affixed) => {
                console.log('Container affix state:', affixed)
              }}
            >
              <div className="bg-purple-500 text-white px-4 py-2 rounded shadow-lg">
                Container-targeted affix
              </div>
            </Affix>
            
            <div className="mt-4 space-y-2">
              {Array.from({ length: 18 }, (_, i) => (
                <div key={i} className="h-12 bg-gray-50 dark:bg-gray-900 rounded flex items-center justify-center">
                  <span className="text-gray-600 dark:text-gray-400 text-sm">Target item {i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
