import { useState, useRef, useEffect } from 'preact/hooks'
import { Affix } from '../../../../nebula/components/Affix'
import { Label } from '../../../../nebula/components/Label'
import { Button } from '../../../../nebula/components/Button'

export function AdvancedSection() {
  const [isAffixed, setIsAffixed] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current
        const progress = (scrollTop / (scrollHeight - clientHeight)) * 100
        setScrollProgress(Math.min(100, Math.max(0, progress)))
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Advanced Examples</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Complex use cases with multiple affixed elements, dynamic content, and interactive features.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <Label className="text-gray-700 dark:text-gray-300 mb-2 block">Affix with State Tracking</Label>
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg mb-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Affix State: <span className={isAffixed ? 'text-green-600' : 'text-red-600'}>
                {isAffixed ? 'AFFIXED' : 'NORMAL'}
              </span>
            </div>
          </div>
          
          <div className="relative">
            <div className="h-64 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-lg p-4">
              <div className="h-16 bg-gray-100 dark:bg-gray-800 rounded mb-4 flex items-center justify-center">
                <span className="text-gray-600 dark:text-gray-400">Scroll to track state</span>
              </div>
              
              <Affix 
                onChange={(affixed) => setIsAffixed(!!affixed)}
                className={isAffixed ? 'animate-pulse' : ''}
              >
                <div className={`px-4 py-2 rounded shadow-lg text-white transition-colors ${
                  isAffixed ? 'bg-green-500' : 'bg-blue-500'
                }`}>
                  State: {isAffixed ? 'Affixed' : 'Normal'}
                </div>
              </Affix>
              
              <div className="mt-4 space-y-2">
                {Array.from({ length: 15 }, (_, i) => (
                  <div key={i} className="h-12 bg-gray-50 dark:bg-gray-900 rounded flex items-center justify-center">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">Content {i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <Label className="text-gray-700 dark:text-gray-300 mb-2 block">Complex Layout with Sidebar</Label>
          <div 
            ref={containerRef}
            className="h-96 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-lg"
          >
            <div className="flex">
              {/* Main Content */}
              <div className="flex-1 p-4">
                <div className="h-16 bg-gray-100 dark:bg-gray-800 rounded mb-4 flex items-center justify-center">
                  <span className="text-gray-600 dark:text-gray-400">Main Content Header</span>
                </div>
                
                <div className="space-y-4">
                  {Array.from({ length: 30 }, (_, i) => (
                    <div key={i} className="h-16 bg-gray-50 dark:bg-gray-900 rounded flex items-center justify-center">
                      <span className="text-gray-600 dark:text-gray-400">Article content {i + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Sidebar */}
              <div ref={sidebarRef} className="w-64 p-4 border-l border-gray-200 dark:border-gray-700">
                <Affix target={() => containerRef.current ?? window} offsetTop={10}>
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-lg">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Table of Contents</h3>
                    <nav className="space-y-1">
                      {Array.from({ length: 8 }, (_, i) => (
                        <a 
                          key={i}
                          href={`#section-${i + 1}`}
                          className="block text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 py-1"
                        >
                          Section {i + 1}
                        </a>
                      ))}
                    </nav>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="text-xs text-gray-500 dark:text-gray-500 mb-2">
                        Scroll Progress
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-200"
                          style={{ width: `${scrollProgress}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {Math.round(scrollProgress)}%
                      </div>
                    </div>
                  </div>
                </Affix>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Label className="text-gray-700 dark:text-gray-300 mb-2 block">Multiple Affix Elements</Label>
          <div className="relative">
            <div className="h-80 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-lg p-4">
              {/* Header Affix */}
              <Affix position="top" offsetTop={0}>
                <div className="bg-blue-500 text-white px-4 py-2 rounded mb-2 shadow-lg">
                  Top Navigation
                </div>
              </Affix>
              
              {/* Secondary Header */}
              <Affix position="top" offsetTop={50}>
                <div className="bg-green-500 text-white px-4 py-1 rounded text-sm shadow-lg">
                  Secondary Bar
                </div>
              </Affix>
              
              <div className="mt-16 space-y-4">
                {Array.from({ length: 20 }, (_, i) => (
                  <div key={i} className="h-16 bg-gray-50 dark:bg-gray-900 rounded flex items-center justify-center">
                    <span className="text-gray-600 dark:text-gray-400">Content section {i + 1}</span>
                  </div>
                ))}
              </div>
              
              {/* Footer Affix */}
              <Affix position="bottom" offsetBottom={0}>
                <div className="bg-purple-500 text-white px-4 py-2 rounded mt-2 shadow-lg">
                  Bottom Toolbar
                </div>
              </Affix>
            </div>
          </div>
        </div>

        <div>
          <Label className="text-gray-700 dark:text-gray-300 mb-2 block">Dynamic Content & Controls</Label>
          <div className="relative">
            <div className="h-64 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-lg p-4">
              <div className="h-16 bg-gray-100 dark:bg-gray-800 rounded mb-4 flex items-center justify-center">
                <span className="text-gray-600 dark:text-gray-400">Interactive content area</span>
              </div>
              
              <Affix>
                <div className="bg-indigo-500 text-white px-4 py-2 rounded shadow-lg">
                  <div className="flex items-center space-x-4">
                    <span>Controls:</span>
                    <Button size="sm" variant="ghost" className="text-white hover:bg-indigo-400">
                      Action 1
                    </Button>
                    <Button size="sm" variant="ghost" className="text-white hover:bg-indigo-400">
                      Action 2
                    </Button>
                    <Button size="sm" variant="ghost" className="text-white hover:bg-indigo-400">
                      Menu
                    </Button>
                  </div>
                </div>
              </Affix>
              
              <div className="mt-4 space-y-2">
                {Array.from({ length: 18 }, (_, i) => (
                  <div key={i} className="h-12 bg-gray-50 dark:bg-gray-900 rounded flex items-center justify-between px-4">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">
                      Interactive item {i + 1}
                    </span>
                    <Button size="sm" variant="secondary">Edit</Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
