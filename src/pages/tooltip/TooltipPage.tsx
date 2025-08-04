import { useState } from 'preact/hooks'
import { Tooltip, Button } from '../../../nebula/components'

interface PageProps {
  path?: string
}

export function TooltipPage(_props: PageProps) {
  const [manualVisible, setManualVisible] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            💬 Tooltip Component
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Contextual information display with intelligent positioning, multiple trigger options, and rich content support. Perfect for providing helpful hints and detailed information.
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
                Simple tooltips with hover trigger and different content types.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-6">
              <Tooltip content="This is a simple tooltip">
                <Button>Hover me</Button>
              </Tooltip>
              
              <Tooltip content="This tooltip has a longer text content that will wrap nicely within the maximum width constraints.">
                <Button variant="outline">Long content</Button>
              </Tooltip>
              
              <Tooltip 
                content={
                  <div className="space-y-1">
                    <div className="font-semibold">Rich Content</div>
                    <div className="text-sm">With multiple elements</div>
                  </div>
                }
              >
                <Button variant="ghost">Rich tooltip</Button>
              </Tooltip>
            </div>
          </section>

          {/* Positioning */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                Positioning
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Tooltips can be positioned in various directions with smart collision detection.
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              {/* Top row */}
              <Tooltip content="Top start" position="top-start">
                <Button size="sm">Top Start</Button>
              </Tooltip>
              <Tooltip content="Top center" position="top">
                <Button size="sm">Top</Button>
              </Tooltip>
              <Tooltip content="Top end" position="top-end">
                <Button size="sm">Top End</Button>
              </Tooltip>
              
              {/* Middle row */}
              <Tooltip content="Left side" position="left">
                <Button size="sm">Left</Button>
              </Tooltip>
              <Tooltip content="Auto positioning" position="auto">
                <Button size="sm">Auto</Button>
              </Tooltip>
              <Tooltip content="Right side" position="right">
                <Button size="sm">Right</Button>
              </Tooltip>
              
              {/* Bottom row */}
              <Tooltip content="Bottom start" position="bottom-start">
                <Button size="sm">Bottom Start</Button>
              </Tooltip>
              <Tooltip content="Bottom center" position="bottom">
                <Button size="sm">Bottom</Button>
              </Tooltip>
              <Tooltip content="Bottom end" position="bottom-end">
                <Button size="sm">Bottom End</Button>
              </Tooltip>
            </div>
          </section>

          {/* Trigger Types */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                Trigger Types
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Different ways to trigger tooltip display for various interaction patterns.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-4">
                <Tooltip content="Shows on hover (default)" trigger="hover">
                  <Button>Hover Trigger</Button>
                </Tooltip>
                
                <Tooltip content="Shows on focus" trigger="focus">
                  <Button>Focus Trigger</Button>
                </Tooltip>
                
                <Tooltip content="Shows on click, click again to hide" trigger="click">
                  <Button>Click Trigger</Button>
                </Tooltip>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Manual Control</h3>
                <div className="flex items-center gap-4">
                  <Tooltip 
                    content="Manually controlled tooltip" 
                    trigger="manual"
                    // Note: Manual trigger would need custom implementation
                  >
                    <span className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-md">
                      Manual tooltip target
                    </span>
                  </Tooltip>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setManualVisible(!manualVisible)}
                  >
                    {manualVisible ? 'Hide' : 'Show'} Manual Tooltip
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Sizes */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                Sizes
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Different tooltip sizes for various content types and contexts.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-6">
              <Tooltip content="Small tooltip" size="sm">
                <Button size="sm">Small</Button>
              </Tooltip>
              
              <Tooltip content="Medium tooltip (default)" size="md">
                <Button>Medium</Button>
              </Tooltip>
              
              <Tooltip content="Large tooltip with more space for content" size="lg">
                <Button size="lg">Large</Button>
              </Tooltip>
            </div>
          </section>

          {/* Color Schemes */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                Color Schemes
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Different color themes to match your design system or convey meaning.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-4">
              <Tooltip content="Default gray theme" colorScheme="gray">
                <Button variant="outline">Gray</Button>
              </Tooltip>
              
              <Tooltip content="Primary blue theme" colorScheme="primary">
                <Button variant="outline">Primary</Button>
              </Tooltip>
              
              <Tooltip content="Secondary purple theme" colorScheme="secondary">
                <Button variant="outline">Secondary</Button>
              </Tooltip>
              
              <Tooltip content="Success green theme" colorScheme="success">
                <Button variant="outline">Success</Button>
              </Tooltip>
              
              <Tooltip content="Warning yellow theme" colorScheme="warning">
                <Button variant="outline">Warning</Button>
              </Tooltip>
              
              <Tooltip content="Error red theme" colorScheme="error">
                <Button variant="outline">Error</Button>
              </Tooltip>
            </div>
          </section>

          {/* Arrow Options */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                Arrow Options
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Control arrow visibility and positioning for better visual connection.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-6">
              <Tooltip content="Tooltip with arrow (default)" hasArrow={true}>
                <Button>With Arrow</Button>
              </Tooltip>
              
              <Tooltip content="Tooltip without arrow" hasArrow={false}>
                <Button variant="outline">No Arrow</Button>
              </Tooltip>
            </div>
          </section>

          {/* Timing Options */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                Timing Options
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Configure delays for better user experience and reduced flickering.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-6">
              <Tooltip content="No delay" delay={0} closeDelay={0}>
                <Button>No Delay</Button>
              </Tooltip>
              
              <Tooltip content="Quick show, slow hide" delay={100} closeDelay={500}>
                <Button variant="outline">Quick Show</Button>
              </Tooltip>
              
              <Tooltip content="Slow show, quick hide" delay={500} closeDelay={100}>
                <Button variant="outline">Slow Show</Button>
              </Tooltip>
              
              <Tooltip content="Long delays for testing" delay={1000} closeDelay={1000}>
                <Button variant="outline">Long Delays</Button>
              </Tooltip>
            </div>
          </section>

          {/* Disabled State */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                Disabled State
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Conditionally disable tooltips based on application state.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-6">
              <Tooltip content="This tooltip is enabled" disabled={false}>
                <Button>Enabled Tooltip</Button>
              </Tooltip>
              
              <Tooltip content="This tooltip is disabled" disabled={true}>
                <Button variant="outline">Disabled Tooltip</Button>
              </Tooltip>
            </div>
          </section>

          {/* Complex Examples */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                Complex Examples
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Real-world examples with rich content and practical use cases.
              </p>
            </div>
            
            <div className="space-y-6">
              {/* User Info Tooltip */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">User Information</h3>
                <Tooltip 
                  content={
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          JD
                        </div>
                        <div>
                          <div className="font-semibold">John Doe</div>
                          <div className="text-xs opacity-75">Senior Developer</div>
                        </div>
                      </div>
                      <div className="text-sm">
                        <div>📧 john.doe@company.com</div>
                        <div>📱 +1 (555) 123-4567</div>
                        <div>🏢 Engineering Team</div>
                      </div>
                    </div>
                  }
                  size="lg"
                  maxWidth="280px"
                >
                  <button className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                      JD
                    </div>
                    <span className="text-gray-900 dark:text-white">John Doe</span>
                  </button>
                </Tooltip>
              </div>

              {/* Help Tooltip */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Help & Documentation</h3>
                <div className="flex items-center space-x-2">
                  <label className="text-gray-900 dark:text-white">API Key</label>
                  <Tooltip 
                    content={
                      <div className="space-y-2">
                        <div className="font-semibold">About API Keys</div>
                        <div className="text-sm space-y-1">
                          <p>API keys are used to authenticate requests to our API.</p>
                          <p><strong>Keep your key secure:</strong></p>
                          <ul className="list-disc list-inside space-y-1 ml-2">
                            <li>Don't share it publicly</li>
                            <li>Rotate keys regularly</li>
                            <li>Use environment variables</li>
                          </ul>
                        </div>
                      </div>
                    }
                    trigger="click"
                    size="lg"
                    maxWidth="320px"
                  >
                    <button className="w-4 h-4 rounded-full bg-gray-400 dark:bg-gray-600 text-white text-xs flex items-center justify-center hover:bg-gray-500 dark:hover:bg-gray-500 transition-colors">
                      ?
                    </button>
                  </Tooltip>
                  <input 
                    type="password" 
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter your API key"
                  />
                </div>
              </div>

              {/* Status Tooltip */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Status Indicators</h3>
                <div className="flex items-center space-x-4">
                  <Tooltip 
                    content="All systems operational"
                    colorScheme="success"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-gray-900 dark:text-white">Online</span>
                    </div>
                  </Tooltip>
                  
                  <Tooltip 
                    content="Experiencing high latency. Average response time: 2.3s"
                    colorScheme="warning"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-gray-900 dark:text-white">Degraded</span>
                    </div>
                  </Tooltip>
                  
                  <Tooltip 
                    content="Service unavailable. Last seen: 5 minutes ago"
                    colorScheme="error"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-gray-900 dark:text-white">Offline</span>
                    </div>
                  </Tooltip>
                </div>
              </div>
            </div>
          </section>

          {/* Accessibility */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                Accessibility Features
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Built-in accessibility features and keyboard navigation support.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h3 className="text-lg font-medium text-blue-900 dark:text-blue-100 mb-2">
                  ⌨️ Keyboard Navigation
                </h3>
                <ul className="text-blue-800 dark:text-blue-200 space-y-1 text-sm">
                  <li>• <kbd className="px-2 py-1 bg-white dark:bg-gray-700 border rounded">Tab</kbd> - Focus trigger elements</li>
                  <li>• <kbd className="px-2 py-1 bg-white dark:bg-gray-700 border rounded">Enter/Space</kbd> - Activate click triggers</li>
                  <li>• <kbd className="px-2 py-1 bg-white dark:bg-gray-700 border rounded">Escape</kbd> - Hide visible tooltips</li>
                </ul>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <h3 className="text-lg font-medium text-green-900 dark:text-green-100 mb-2">
                  ♿ ARIA Support
                </h3>
                <ul className="text-green-800 dark:text-green-200 space-y-1 text-sm">
                  <li>• Proper ARIA roles and attributes</li>
                  <li>• Screen reader announcements</li>
                  <li>• Describedby associations</li>
                  <li>• Semantic HTML structure</li>
                  <li>• High contrast support</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Try Accessibility Features</h3>
                <div className="flex flex-wrap items-center gap-4">
                  <Tooltip content="Focus me with Tab, then press Escape to hide" trigger="focus">
                    <Button>Focus Trigger</Button>
                  </Tooltip>
                  
                  <Tooltip content="Screen readers will announce this tooltip content" trigger="hover">
                    <Button variant="outline">Screen Reader Test</Button>
                  </Tooltip>
                </div>
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
                Complete API reference for the Tooltip component.
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
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">content</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">ComponentChildren</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">required</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Content to display in the tooltip</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">position</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">TooltipPosition</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">'top'</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Position relative to trigger element</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">trigger</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">'hover' | 'focus' | 'click' | 'manual'</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">'hover'</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">How the tooltip is triggered</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">delay</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">number</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">100</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Delay before showing (ms)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">closeDelay</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">number</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">100</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Delay before hiding (ms)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">disabled</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">boolean</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">false</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Whether tooltip is disabled</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">hasArrow</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">boolean</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">true</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Whether to show arrow pointer</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">size</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">'sm' | 'md' | 'lg'</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">'md'</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Size of the tooltip</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">colorScheme</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">'gray' | 'primary' | 'secondary' | 'success' | 'warning' | 'error'</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">'gray'</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Color theme</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">offset</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">number</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">8</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Distance from trigger (px)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">flip</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">boolean</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">true</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Auto-flip when constrained</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">shift</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">boolean</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">true</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Auto-shift to stay in viewport</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">maxWidth</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">string</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">'320px'</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Maximum width of tooltip</td>
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
