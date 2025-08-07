import { Affix } from '../../../../nebula/components/Affix'
import { Label } from '../../../../nebula/components/Label'
import { Button } from '../../../../nebula/components/Button'

export function BasicUsageSection() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Basic Usage</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The Affix component makes content stick to the viewport when scrolling past a specific position.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <Label className="text-gray-700 dark:text-gray-300 mb-2 block">Simple Affix</Label>
          <div className="relative">
            <div className="h-96 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-lg p-4">
              <div className="h-20 bg-gray-100 dark:bg-gray-800 rounded mb-4 flex items-center justify-center">
                <span className="text-gray-600 dark:text-gray-400">Scroll down to see the affix in action</span>
              </div>
              
              <Affix>
                <div className="bg-blue-500 text-white px-4 py-2 rounded shadow-lg">
                  This content will stick to the top when scrolling
                </div>
              </Affix>
              
              <div className="mt-8 space-y-4">
                {Array.from({ length: 20 }, (_, i) => (
                  <div key={i} className="h-16 bg-gray-50 dark:bg-gray-900 rounded flex items-center justify-center">
                    <span className="text-gray-600 dark:text-gray-400">Content block {i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <Label className="text-gray-700 dark:text-gray-300 mb-2 block">Navigation Menu Example</Label>
          <div className="relative">
            <div className="h-96 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-lg p-4">
              <div className="h-20 bg-gray-100 dark:bg-gray-800 rounded mb-4 flex items-center justify-center">
                <span className="text-gray-600 dark:text-gray-400">Header content</span>
              </div>
              
              <Affix>
                <nav className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg px-4 py-2">
                  <div className="flex space-x-4">
                    <Button variant="ghost" size="sm">Home</Button>
                    <Button variant="ghost" size="sm">About</Button>
                    <Button variant="ghost" size="sm">Services</Button>
                    <Button variant="ghost" size="sm">Contact</Button>
                  </div>
                </nav>
              </Affix>
              
              <div className="mt-8 space-y-4">
                {Array.from({ length: 25 }, (_, i) => (
                  <div key={i} className="h-16 bg-gray-50 dark:bg-gray-900 rounded flex items-center justify-center">
                    <span className="text-gray-600 dark:text-gray-400">Page content {i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <Label className="text-gray-700 dark:text-gray-300 mb-2 block">With Callback</Label>
          <div className="relative">
            <div className="h-96 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-lg p-4">
              <div className="h-20 bg-gray-100 dark:bg-gray-800 rounded mb-4 flex items-center justify-center">
                <span className="text-gray-600 dark:text-gray-400">Scroll to trigger callback</span>
              </div>
              
              <Affix 
                onChange={(affixed) => {
                  console.log('Affix state changed:', affixed)
                }}
              >
                <div className="bg-green-500 text-white px-4 py-2 rounded shadow-lg">
                  Check console for state changes
                </div>
              </Affix>
              
              <div className="mt-8 space-y-4">
                {Array.from({ length: 15 }, (_, i) => (
                  <div key={i} className="h-16 bg-gray-50 dark:bg-gray-900 rounded flex items-center justify-center">
                    <span className="text-gray-600 dark:text-gray-400">Content {i + 1}</span>
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
