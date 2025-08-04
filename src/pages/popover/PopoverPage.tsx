import { useState } from 'preact/hooks'
import { Popover, Button } from '../../../nebula/components'

interface PageProps {
  path?: string
}

export function PopoverPage(_props: PageProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            💬 Popover Component
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Contextual overlays with intelligent positioning, rich content support, and flexible triggers. Perfect for help text, menus, and detailed information.
          </p>
        </div>

        <div className="space-y-12">
          
          {/* Basic Usage */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                Basic Usage
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Simple popovers with click trigger and default positioning.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Popover
                trigger={<Button>Click for Info</Button>}
              >
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                    Helpful Information
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    This is a basic popover with helpful content that appears when you click the trigger.
                  </p>
                </div>
              </Popover>

              <Popover
                trigger={<Button variant="outline">Learn More</Button>}
              >
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                    Features
                  </h3>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Intelligent positioning</li>
                    <li>• Rich content support</li>
                    <li>• Keyboard navigation</li>
                    <li>• Screen reader support</li>
                  </ul>
                </div>
              </Popover>

              <Popover
                trigger={<Button variant="ghost">Help</Button>}
              >
                <div className="max-w-xs">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                    Need Help?
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Our support team is here to help you get the most out of this feature.
                  </p>
                  <div className="flex space-x-2">
                    <Button size="sm">Contact Support</Button>
                    <Button size="sm" variant="outline">View Docs</Button>
                  </div>
                </div>
              </Popover>
            </div>
          </section>

          {/* Positioning */}
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Click Trigger</h3>
                <Popover
                  trigger={<Button>Click Me</Button>}
                  triggerOn="click"
                >
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      This popover opens when you click the button.
                    </p>
                  </div>
                </Popover>
              </div>

              <div className="text-center">
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Hover Trigger</h3>
                <Popover
                  trigger={<Button variant="outline">Hover Me</Button>}
                  triggerOn="hover"
                  openDelay={300}
                  closeDelay={200}
                >
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      This popover appears when you hover over the button.
                    </p>
                  </div>
                </Popover>
              </div>

              <div className="text-center">
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Focus Trigger</h3>
                <Popover
                  trigger={
                    <input
                      type="text"
                      placeholder="Focus me"
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  }
                  triggerOn="focus"
                >
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      This popover appears when the input is focused.
                    </p>
                  </div>
                </Popover>
              </div>

              <div className="text-center">
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Manual Control</h3>
                <ManualPopover />
              </div>
            </div>
          </section>

          {/* Rich Content */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                Rich Content
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Popovers can contain complex layouts with images, forms, lists, and interactive elements.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-6">
              <Popover
                trigger={<Button>User Profile</Button>}
                position="bottom-start"
              >
                <div className="w-64">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                      JD
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">John Doe</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">john@example.com</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                      View Profile
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                      Account Settings
                    </button>
                    <hr className="border-gray-200 dark:border-gray-600" />
                    <button className="w-full text-left px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                      Sign Out
                    </button>
                  </div>
                </div>
              </Popover>

              <Popover
                trigger={<Button variant="outline">Shopping Cart</Button>}
                position="bottom-end"
              >
                <div className="w-80">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900 dark:text-white">Shopping Cart</h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">3 items</span>
                  </div>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded"></div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">Product 1</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">$29.99</p>
                      </div>
                      <span className="text-sm text-gray-900 dark:text-white">×1</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded"></div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">Product 2</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">$19.99</p>
                      </div>
                      <span className="text-sm text-gray-900 dark:text-white">×2</span>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium text-gray-900 dark:text-white">Total:</span>
                      <span className="font-bold text-gray-900 dark:text-white">$69.97</span>
                    </div>
                    <div className="space-y-2">
                      <Button size="sm" className="w-full">Checkout</Button>
                      <Button size="sm" variant="outline" className="w-full">View Cart</Button>
                    </div>
                  </div>
                </div>
              </Popover>

              <Popover
                trigger={<Button variant="ghost">Quick Actions</Button>}
              >
                <div className="w-56">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="p-3 text-center text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                      <div className="text-lg mb-1">📝</div>
                      New Note
                    </button>
                    <button className="p-3 text-center text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                      <div className="text-lg mb-1">📁</div>
                      New Folder
                    </button>
                    <button className="p-3 text-center text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                      <div className="text-lg mb-1">🖼️</div>
                      Upload Image
                    </button>
                    <button className="p-3 text-center text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                      <div className="text-lg mb-1">⚙️</div>
                      Settings
                    </button>
                  </div>
                </div>
              </Popover>
            </div>
          </section>

          {/* Customization */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                Customization Options
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Custom styling, arrow options, and behavior configurations.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Custom Styling</h3>
                <Popover
                  trigger={<Button>Custom Style</Button>}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0"
                  arrowClassName="bg-purple-500"
                >
                  <div>
                    <h4 className="font-medium mb-1">Custom Popover</h4>
                    <p className="text-sm opacity-90">
                      This popover has custom gradient styling with matching arrow.
                    </p>
                  </div>
                </Popover>
              </div>

              <div className="text-center">
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">No Arrow</h3>
                <Popover
                  trigger={<Button variant="outline">No Arrow</Button>}
                  withArrow={false}
                >
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      This popover doesn't have an arrow pointer.
                    </p>
                  </div>
                </Popover>
              </div>

              <div className="text-center">
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Custom Behavior</h3>
                <Popover
                  trigger={<Button variant="ghost">Custom Behavior</Button>}
                  closeOnClickOutside={false}
                  closeOnEscape={false}
                  offset={20}
                >
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      This popover only closes when you click the trigger again. Higher offset too!
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      No outside click or escape key closing.
                    </p>
                  </div>
                </Popover>
              </div>
            </div>
          </section>

          {/* Props Documentation */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                Props Documentation
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Complete API reference for the Popover component.
              </p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Prop</th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Type</th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Default</th>
                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Description</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">trigger</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">ComponentChildren</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">required</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Element that triggers the popover</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">children</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">ComponentChildren</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">required</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Content to display in the popover</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">position</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">PopoverPosition</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">'bottom'</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Position relative to trigger</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">triggerOn</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">'click' | 'hover' | 'focus' | 'manual'</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">'click'</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">How the popover is triggered</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">withArrow</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">boolean</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">true</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Whether to show arrow pointing to trigger</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">closeOnClickOutside</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">boolean</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">true</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Whether clicking outside closes popover</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">closeOnEscape</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">boolean</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">true</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Whether escape key closes popover</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">openDelay</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">number</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">0</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Delay before showing (hover trigger)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">closeDelay</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">number</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">0</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Delay before hiding (hover trigger)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">offset</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">number</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">8</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Distance from trigger element</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}

// Manual popover control example
function ManualPopover() {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div>
      <div className="space-y-2 mb-3">
        <Button 
          size="sm" 
          onClick={() => setIsOpen(true)}
          disabled={isOpen}
        >
          Open
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={() => setIsOpen(false)}
          disabled={!isOpen}
        >
          Close
        </Button>
      </div>
      
      <Popover
        trigger={<Button variant="ghost">Manual Target</Button>}
        triggerOn="manual"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This popover is controlled manually via external buttons.
          </p>
        </div>
      </Popover>
    </div>
  )
}
