import { useState } from 'preact/hooks'
import { Affix } from '../../../../nebula/components/Affix'
import { Label } from '../../../../nebula/components/Label'
import { Button } from '../../../../nebula/components/Button'
import { Input } from '../../../../nebula/components/Input'

export function OffsetSection() {
  const [topOffset, setTopOffset] = useState(0)
  const [bottomOffset, setBottomOffset] = useState(0)

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Offset</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Add offset distance from the edge of the viewport when the content becomes affixed.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <Label className="text-gray-700 dark:text-gray-300 mb-2 block">Offset Controls</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Top Offset (px)</Label>
              <Input
                type="number"
                value={String(topOffset)}
                onChange={(e) => {
                  const value = (e.target as HTMLInputElement).value
                  setTopOffset(Number(value))
                }}
                placeholder="0"
                min="0"
                max="100"
              />
            </div>
            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Bottom Offset (px)</Label>
              <Input
                type="number"
                value={String(bottomOffset)}
                onChange={(e) => {
                  const value = (e.target as HTMLInputElement).value
                  setBottomOffset(Number(value))
                }}
                placeholder="0"
                min="0"
                max="100"
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <Button size="sm" variant="secondary" onClick={() => { setTopOffset(10); setBottomOffset(10) }}>
              10px
            </Button>
            <Button size="sm" variant="secondary" onClick={() => { setTopOffset(20); setBottomOffset(20) }}>
              20px
            </Button>
            <Button size="sm" variant="secondary" onClick={() => { setTopOffset(0); setBottomOffset(0) }}>
              Reset
            </Button>
          </div>
        </div>

        <div>
          <Label className="text-gray-700 dark:text-gray-300 mb-2 block">
            Top Position with Offset: {topOffset}px
          </Label>
          <div className="relative">
            <div className="h-64 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-lg p-4">
              <div className="h-16 bg-gray-100 dark:bg-gray-800 rounded mb-4 flex items-center justify-center">
                <span className="text-gray-600 dark:text-gray-400">Header area</span>
              </div>
              
              <Affix position="top" offsetTop={topOffset}>
                <div className="bg-blue-500 text-white px-4 py-2 rounded shadow-lg">
                  Top affix with {topOffset}px offset
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
          <Label className="text-gray-700 dark:text-gray-300 mb-2 block">
            Bottom Position with Offset: {bottomOffset}px
          </Label>
          <div className="relative">
            <div className="h-64 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-lg p-4">
              <div className="space-y-2 mb-4">
                {Array.from({ length: 15 }, (_, i) => (
                  <div key={i} className="h-12 bg-gray-50 dark:bg-gray-900 rounded flex items-center justify-center">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">Content {i + 1}</span>
                  </div>
                ))}
              </div>
              
              <Affix position="bottom" offsetBottom={bottomOffset}>
                <div className="bg-purple-500 text-white px-4 py-2 rounded shadow-lg">
                  Bottom affix with {bottomOffset}px offset
                </div>
              </Affix>
              
              <div className="h-16 bg-gray-100 dark:bg-gray-800 rounded mt-4 flex items-center justify-center">
                <span className="text-gray-600 dark:text-gray-400">Footer area</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Label className="text-gray-700 dark:text-gray-300 mb-2 block">Fixed Offsets Example</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">20px Top Offset</Label>
              <div className="h-48 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-lg p-3">
                <div className="h-12 bg-gray-100 dark:bg-gray-800 rounded mb-3 flex items-center justify-center">
                  <span className="text-gray-600 dark:text-gray-400 text-sm">Header</span>
                </div>
                
                <Affix position="top" offsetTop={20}>
                  <div className="bg-green-500 text-white px-3 py-1 rounded text-sm">
                    20px from top
                  </div>
                </Affix>
                
                <div className="mt-3 space-y-2">
                  {Array.from({ length: 12 }, (_, i) => (
                    <div key={i} className="h-8 bg-gray-50 dark:bg-gray-900 rounded flex items-center justify-center">
                      <span className="text-gray-600 dark:text-gray-400 text-xs">Item {i + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">30px Bottom Offset</Label>
              <div className="h-48 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-lg p-3">
                <div className="space-y-2 mb-3">
                  {Array.from({ length: 12 }, (_, i) => (
                    <div key={i} className="h-8 bg-gray-50 dark:bg-gray-900 rounded flex items-center justify-center">
                      <span className="text-gray-600 dark:text-gray-400 text-xs">Item {i + 1}</span>
                    </div>
                  ))}
                </div>
                
                <Affix position="bottom" offsetBottom={30}>
                  <div className="bg-orange-500 text-white px-3 py-1 rounded text-sm">
                    30px from bottom
                  </div>
                </Affix>
                
                <div className="h-12 bg-gray-100 dark:bg-gray-800 rounded mt-3 flex items-center justify-center">
                  <span className="text-gray-600 dark:text-gray-400 text-sm">Footer</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Label className="text-gray-700 dark:text-gray-300 mb-2 block">Responsive Offsets</Label>
          <div className="relative">
            <div className="h-64 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-lg p-4">
              <div className="h-16 bg-gray-100 dark:bg-gray-800 rounded mb-4 flex items-center justify-center">
                <span className="text-gray-600 dark:text-gray-400">Responsive header (resize window)</span>
              </div>
              
              <Affix 
                position="top" 
                offsetTop={window.innerWidth < 768 ? 10 : 24}
                onChange={(affixed) => {
                  console.log('Responsive affix:', affixed)
                }}
              >
                <div className="bg-indigo-500 text-white px-4 py-2 rounded shadow-lg">
                  Responsive offset: {window.innerWidth < 768 ? '10px' : '24px'} from top
                </div>
              </Affix>
              
              <div className="mt-4 space-y-2">
                {Array.from({ length: 18 }, (_, i) => (
                  <div key={i} className="h-12 bg-gray-50 dark:bg-gray-900 rounded flex items-center justify-center">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">Responsive content {i + 1}</span>
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
