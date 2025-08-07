import { useState } from 'preact/hooks'
import { Affix } from '../../../../nebula/components/Affix'
import { Label } from '../../../../nebula/components/Label'
import { Button } from '../../../../nebula/components/Button'

export function PositionSection() {
  const [position, setPosition] = useState<'top' | 'bottom'>('top')

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Position</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Control where the affix sticks within the viewport - top or bottom.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <Label className="text-gray-700 dark:text-gray-300 mb-2 block">Position Controls</Label>
          <div className="flex space-x-4 mb-4">
            <Button 
              variant={position === 'top' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setPosition('top')}
            >
              Top
            </Button>
            <Button 
              variant={position === 'bottom' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setPosition('bottom')}
            >
              Bottom
            </Button>
          </div>
        </div>

        <div>
          <Label className="text-gray-700 dark:text-gray-300 mb-2 block">
            Affix Position: {position}
          </Label>
          <div className="relative">
            <div className="h-96 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-lg p-4">
              <div className="h-20 bg-gray-100 dark:bg-gray-800 rounded mb-4 flex items-center justify-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Content before affix - scroll to see {position} positioning
                </span>
              </div>
              
              <Affix position={position}>
                <div className={`text-white px-4 py-2 rounded shadow-lg ${
                  position === 'top' ? 'bg-blue-500' : 'bg-purple-500'
                }`}>
                  Affixed to {position}
                </div>
              </Affix>
              
              <div className="mt-8 space-y-4">
                {Array.from({ length: 30 }, (_, i) => (
                  <div key={i} className="h-16 bg-gray-50 dark:bg-gray-900 rounded flex items-center justify-center">
                    <span className="text-gray-600 dark:text-gray-400">Content block {i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <Label className="text-gray-700 dark:text-gray-300 mb-2 block">Top Position (Default)</Label>
          <div className="relative">
            <div className="h-64 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-lg p-4">
              <div className="h-16 bg-gray-100 dark:bg-gray-800 rounded mb-4 flex items-center justify-center">
                <span className="text-gray-600 dark:text-gray-400">Header area</span>
              </div>
              
              <Affix position="top">
                <div className="bg-blue-500 text-white px-4 py-2 rounded shadow-lg">
                  Sticks to top
                </div>
              </Affix>
              
              <div className="mt-4 space-y-2">
                {Array.from({ length: 15 }, (_, i) => (
                  <div key={i} className="h-12 bg-gray-50 dark:bg-gray-900 rounded flex items-center justify-center">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">Item {i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <Label className="text-gray-700 dark:text-gray-300 mb-2 block">Bottom Position</Label>
          <div className="relative">
            <div className="h-64 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-lg p-4">
              <div className="space-y-2 mb-4">
                {Array.from({ length: 15 }, (_, i) => (
                  <div key={i} className="h-12 bg-gray-50 dark:bg-gray-900 rounded flex items-center justify-center">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">Item {i + 1}</span>
                  </div>
                ))}
              </div>
              
              <Affix position="bottom">
                <div className="bg-purple-500 text-white px-4 py-2 rounded shadow-lg">
                  Sticks to bottom
                </div>
              </Affix>
              
              <div className="h-16 bg-gray-100 dark:bg-gray-800 rounded mt-4 flex items-center justify-center">
                <span className="text-gray-600 dark:text-gray-400">Footer area</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
