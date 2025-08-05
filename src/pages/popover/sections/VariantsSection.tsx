import { useState } from 'preact/hooks'
import { Popover, Button } from '../../../../nebula/components'

export function VariantsSection() {
  const [manualOpen, setManualOpen] = useState(false)

  return (
    <div className="space-y-12">
      {/* Positioning Options */}
      <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            Positioning Options
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Popovers can be positioned in multiple directions with start, center, and end alignments.
          </p>
        </div>
        
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          {/* Top row */}
          <div className="text-center">
            <Popover
              trigger={<Button size="sm">Top Start</Button>}
              position="top-start"
            >
              <div className="text-sm">Top Start positioning</div>
            </Popover>
          </div>
          <div className="text-center">
            <Popover
              trigger={<Button size="sm">Top</Button>}
              position="top"
            >
              <div className="text-sm">Top center positioning</div>
            </Popover>
          </div>
          <div className="text-center">
            <Popover
              trigger={<Button size="sm">Top End</Button>}
              position="top-end"
            >
              <div className="text-sm">Top End positioning</div>
            </Popover>
          </div>

          {/* Middle row */}
          <div className="text-center">
            <Popover
              trigger={<Button size="sm">Left</Button>}
              position="left"
            >
              <div className="text-sm">Left positioning</div>
            </Popover>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <span className="text-xs text-blue-600 dark:text-blue-400">Trigger</span>
            </div>
          </div>
          <div className="text-center">
            <Popover
              trigger={<Button size="sm">Right</Button>}
              position="right"
            >
              <div className="text-sm">Right positioning</div>
            </Popover>
          </div>

          {/* Bottom row */}
          <div className="text-center">
            <Popover
              trigger={<Button size="sm">Bottom Start</Button>}
              position="bottom-start"
            >
              <div className="text-sm">Bottom Start positioning</div>
            </Popover>
          </div>
          <div className="text-center">
            <Popover
              trigger={<Button size="sm">Bottom</Button>}
              position="bottom"
            >
              <div className="text-sm">Bottom center positioning</div>
            </Popover>
          </div>
          <div className="text-center">
            <Popover
              trigger={<Button size="sm">Bottom End</Button>}
              position="bottom-end"
            >
              <div className="text-sm">Bottom End positioning</div>
            </Popover>
          </div>
        </div>
      </section>

      {/* Trigger Types */}
      <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            Trigger Types
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Different ways to trigger the popover: click, hover, focus, or manual control.
          </p>
        </div>
        
        <div className="space-y-8">
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-3">Click Trigger</h3>
            <div className="flex gap-4">
              <Popover trigger={<Button>Click Me</Button>} triggerOn="click">
                <div>
                  <p className="text-sm">Triggered by clicking the button.</p>
                  <p className="text-xs text-gray-500 mt-1">Click outside or press Escape to close.</p>
                </div>
              </Popover>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-3">Hover Trigger</h3>
            <div className="flex gap-4">
              <Popover trigger={<Button variant="outline">Hover Me</Button>} triggerOn="hover">
                <div>
                  <p className="text-sm">Triggered by hovering over the button.</p>
                  <p className="text-xs text-gray-500 mt-1">Move mouse away to close.</p>
                </div>
              </Popover>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-3">Focus Trigger</h3>
            <div className="flex gap-4">
              <Popover trigger={<Button variant="ghost">Focus Me</Button>} triggerOn="focus">
                <div>
                  <p className="text-sm">Triggered when the button receives focus.</p>
                  <p className="text-xs text-gray-500 mt-1">Tab away or click elsewhere to close.</p>
                </div>
              </Popover>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-3">Manual Control</h3>
            <div className="flex gap-4 items-center">
              <Popover 
                trigger={<span className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded">Manually Controlled</span>}
                triggerOn="manual"
                isOpen={manualOpen}
              >
                <div>
                  <p className="text-sm">This popover is controlled manually.</p>
                  <Button size="sm" onClick={() => setManualOpen(false)}>Close</Button>
                </div>
              </Popover>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setManualOpen(!manualOpen)}
              >
                {manualOpen ? 'Close' : 'Open'} Popover
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
