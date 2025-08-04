import { useState } from 'preact/hooks'
import { Drawer, Button } from '../../../nebula/components'

interface PageProps {
  path?: string
}

export function DrawerPage(_props: PageProps) {
  const [leftOpen, setLeftOpen] = useState(false)
  const [rightOpen, setRightOpen] = useState(false)
  const [topOpen, setTopOpen] = useState(false)
  const [bottomOpen, setBottomOpen] = useState(false)
  const [sizeDrawer, setSizeDrawer] = useState<'sm' | 'md' | 'lg' | 'xl' | 'full' | false>(false)
  const [customDrawer, setCustomDrawer] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            📱 Drawer Component
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Sliding panels with smooth animations, focus management, and responsive behavior. Perfect for navigation, filters, and contextual content.
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
                Simple drawers with different positions and smooth slide animations.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button onClick={() => setLeftOpen(true)}>
                Left Drawer
              </Button>
              <Button onClick={() => setRightOpen(true)}>
                Right Drawer
              </Button>
              <Button onClick={() => setTopOpen(true)}>
                Top Drawer
              </Button>
              <Button onClick={() => setBottomOpen(true)}>
                Bottom Drawer
              </Button>
            </div>

            {/* Left Drawer */}
            <Drawer
              isOpen={leftOpen}
              onClose={() => setLeftOpen(false)}
              position="left"
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Left Navigation
                </h3>
                <div className="space-y-3">
                  <a href="#" className="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    Dashboard
                  </a>
                  <a href="#" className="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    Projects
                  </a>
                  <a href="#" className="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    Team
                  </a>
                  <a href="#" className="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    Settings
                  </a>
                </div>
              </div>
            </Drawer>

            {/* Right Drawer */}
            <Drawer
              isOpen={rightOpen}
              onClose={() => setRightOpen(false)}
              position="right"
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Notifications
                </h3>
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      New message from John Doe
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                      2 minutes ago
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
                    <p className="text-sm text-green-800 dark:text-green-200">
                      Project deploy successful
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                      5 minutes ago
                    </p>
                  </div>
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-md">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      System maintenance scheduled
                    </p>
                    <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                      1 hour ago
                    </p>
                  </div>
                </div>
              </div>
            </Drawer>

            {/* Top Drawer */}
            <Drawer
              isOpen={topOpen}
              onClose={() => setTopOpen(false)}
              position="top"
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Quick Actions
                </h3>
                <div className="flex space-x-4">
                  <Button size="sm" variant="outline">
                    📝 New Document
                  </Button>
                  <Button size="sm" variant="outline">
                    📁 Upload File
                  </Button>
                  <Button size="sm" variant="outline">
                    👥 Invite Team
                  </Button>
                  <Button size="sm" variant="outline">
                    ⚙️ Settings
                  </Button>
                </div>
              </div>
            </Drawer>

            {/* Bottom Drawer */}
            <Drawer
              isOpen={bottomOpen}
              onClose={() => setBottomOpen(false)}
              position="bottom"
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Player Controls
                </h3>
                <div className="flex items-center space-x-4">
                  <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
                    ⏮️
                  </button>
                  <button className="p-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white">
                    ▶️
                  </button>
                  <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
                    ⏭️
                  </button>
                  <div className="flex-1 mx-4">
                    <div className="text-sm text-gray-900 dark:text-white font-medium">
                      Song Title
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Artist Name
                    </div>
                  </div>
                  <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
                    🔊
                  </button>
                </div>
              </div>
            </Drawer>
          </section>

          {/* Size Variants */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                Size Variants
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Different drawer sizes for various content types and screen sizes.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Button onClick={() => setSizeDrawer('sm')} variant="outline">
                Small
              </Button>
              <Button onClick={() => setSizeDrawer('md')} variant="outline">
                Medium
              </Button>
              <Button onClick={() => setSizeDrawer('lg')} variant="outline">
                Large
              </Button>
              <Button onClick={() => setSizeDrawer('xl')} variant="outline">
                Extra Large
              </Button>
              <Button onClick={() => setSizeDrawer('full')} variant="outline">
                Full Size
              </Button>
            </div>

            <Drawer
              isOpen={!!sizeDrawer}
              onClose={() => setSizeDrawer(false)}
              position="right"
              size={sizeDrawer || 'md'}
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {sizeDrawer && typeof sizeDrawer === 'string' 
                    ? sizeDrawer.charAt(0).toUpperCase() + sizeDrawer.slice(1) 
                    : 'Medium'} Drawer
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  This is a {sizeDrawer || 'medium'} sized drawer. The width adjusts based on the size variant.
                </p>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2"></div>
                </div>
              </div>
            </Drawer>
          </section>

          {/* Custom Configuration */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                Custom Configuration
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Advanced drawer with custom settings and behaviors.
              </p>
            </div>
            
            <Button onClick={() => setCustomDrawer(true)}>
              Open Custom Drawer
            </Button>

            <Drawer
              isOpen={customDrawer}
              onClose={() => setCustomDrawer(false)}
              position="right"
              size="lg"
              closeOnBackdropClick={true}
              closeOnEscape={true}
              lockBodyScroll={true}
              animationDuration={500}
              backdropOpacity={0.3}
              className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Custom Drawer
                  </h3>
                  <button
                    onClick={() => setCustomDrawer(false)}
                    className="p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Features:</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Custom animation duration (500ms)</li>
                      <li>• Reduced backdrop opacity (30%)</li>
                      <li>• Custom gradient background</li>
                      <li>• Focus management enabled</li>
                      <li>• Body scroll lock active</li>
                      <li>• Escape key to close</li>
                      <li>• Click backdrop to close</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">Interactive Form:</h4>
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="Enter your name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="Enter your email"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Message
                        </label>
                        <textarea
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="Enter your message"
                        />
                      </div>
                      <div className="flex space-x-3">
                        <Button size="sm">Submit</Button>
                        <Button size="sm" variant="outline" onClick={() => setCustomDrawer(false)}>
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </Drawer>
          </section>

          {/* Accessibility Features */}
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
                  <li>• <kbd className="px-2 py-1 bg-white dark:bg-gray-700 border rounded">Tab</kbd> - Navigate between focusable elements</li>
                  <li>• <kbd className="px-2 py-1 bg-white dark:bg-gray-700 border rounded">Shift + Tab</kbd> - Navigate backwards</li>
                  <li>• <kbd className="px-2 py-1 bg-white dark:bg-gray-700 border rounded">Escape</kbd> - Close drawer</li>
                  <li>• Focus is trapped within the drawer</li>
                  <li>• Focus returns to trigger element when closed</li>
                </ul>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <h3 className="text-lg font-medium text-green-900 dark:text-green-100 mb-2">
                  ♿ ARIA Support
                </h3>
                <ul className="text-green-800 dark:text-green-200 space-y-1 text-sm">
                  <li>• <code>role="dialog"</code> for semantic meaning</li>
                  <li>• <code>aria-modal="true"</code> for modal behavior</li>
                  <li>• Screen reader announcements</li>
                  <li>• Proper focus management</li>
                  <li>• High contrast support</li>
                </ul>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <h3 className="text-lg font-medium text-yellow-900 dark:text-yellow-100 mb-2">
                  🎛️ Interaction Options
                </h3>
                <ul className="text-yellow-800 dark:text-yellow-200 space-y-1 text-sm">
                  <li>• Click outside to close (configurable)</li>
                  <li>• Escape key to close (configurable)</li>
                  <li>• Body scroll lock (configurable)</li>
                  <li>• Custom focus targets</li>
                  <li>• Animation callbacks</li>
                </ul>
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
                Complete API reference for the Drawer component.
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
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">isOpen</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">boolean</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">required</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Whether the drawer is open</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">onClose</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">() =&gt; void</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">required</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Function to close the drawer</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">position</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">'left' | 'right' | 'top' | 'bottom'</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">'right'</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Position of the drawer</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">size</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">'sm' | 'md' | 'lg' | 'xl' | 'full'</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">'md'</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Size of the drawer</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">hasBackdrop</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">boolean</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">true</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Whether to show backdrop overlay</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">closeOnBackdropClick</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">boolean</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">true</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Whether clicking backdrop closes drawer</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">closeOnEscape</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">boolean</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">true</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Whether pressing Escape closes drawer</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">lockBodyScroll</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">boolean</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">true</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Whether to lock body scroll when open</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">animationDuration</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">number</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">300</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Animation duration in milliseconds</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">backdropOpacity</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">number</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">0.5</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Custom backdrop opacity</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">trapFocus</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">boolean</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">true</td>
                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Whether to preserve focus within drawer</td>
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
