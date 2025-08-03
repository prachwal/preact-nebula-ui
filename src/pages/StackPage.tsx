import { useState } from 'preact/hooks'
import { Stack, Button, Card } from '@/components'
import { route } from 'preact-router'

interface PageProps {
  path?: string
}

export function StackPage(_props: PageProps) {
  const [activeDemo, setActiveDemo] = useState<'direction' | 'spacing' | 'alignment' | 'examples'>('direction')

  return (
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div class="flex items-center justify-between">
            <div>
              <button 
                onClick={() => route('/')}
                class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-2 inline-flex items-center"
              >
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                Back to Components
              </button>
              <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Stack Component</h1>
              <p class="text-gray-600 dark:text-gray-300 mt-2">
                Vertical and horizontal layout with consistent spacing and alignment control
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div class="flex space-x-1 mt-6 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
            {[
              { key: 'direction', label: 'Direction & Spacing' },
              { key: 'spacing', label: 'Spacing Variants' },
              { key: 'alignment', label: 'Alignment Options' },
              { key: 'examples', label: 'Layout Examples' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveDemo(tab.key as any)}
                class={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeDemo === tab.key
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Direction & Spacing */}
        {activeDemo === 'direction' && (
          <div class="space-y-8">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Direction & Basic Spacing</h2>
              <p class="text-gray-600 dark:text-gray-300 mb-8">
                Control layout direction and spacing between child elements.
              </p>

              <div class="space-y-8">
                {/* Vertical Direction */}
                <div class="space-y-4">
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">Vertical Stack (Default)</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Elements arranged vertically with consistent spacing
                  </p>
                  
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                      <h4 class="text-md font-medium text-gray-900 dark:text-white mb-3">direction="vertical"</h4>
                      <div class="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
                        <Stack direction="vertical" spacing="md">
                          <div class="bg-blue-500 text-white p-3 rounded text-center">Item 1</div>
                          <div class="bg-green-500 text-white p-3 rounded text-center">Item 2</div>
                          <div class="bg-purple-500 text-white p-3 rounded text-center">Item 3</div>
                        </Stack>
                      </div>
                    </div>

                    <div>
                      <h4 class="text-md font-medium text-gray-900 dark:text-white mb-3">With Buttons</h4>
                      <div class="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
                        <Stack direction="vertical" spacing="sm">
                          <Button>Primary Action</Button>
                          <Button variant="outline">Secondary Action</Button>
                          <Button variant="ghost">Tertiary Action</Button>
                        </Stack>
                      </div>
                    </div>

                    <div>
                      <h4 class="text-md font-medium text-gray-900 dark:text-white mb-3">Form Elements</h4>
                      <div class="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
                        <Stack direction="vertical" spacing="md">
                          <div class="text-center p-2 bg-white dark:bg-gray-600 rounded">Label</div>
                          <div class="text-center p-2 bg-white dark:bg-gray-600 rounded">Input</div>
                          <div class="text-center p-2 bg-white dark:bg-gray-600 rounded">Helper Text</div>
                        </Stack>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Horizontal Direction */}
                <div class="space-y-4">
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">Horizontal Stack</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Elements arranged horizontally with consistent spacing
                  </p>
                  
                  <div class="space-y-6">
                    <div>
                      <h4 class="text-md font-medium text-gray-900 dark:text-white mb-3">direction="horizontal"</h4>
                      <div class="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
                        <Stack direction="horizontal" spacing="md">
                          <div class="bg-blue-500 text-white p-3 rounded text-center min-w-20">Item 1</div>
                          <div class="bg-green-500 text-white p-3 rounded text-center min-w-20">Item 2</div>
                          <div class="bg-purple-500 text-white p-3 rounded text-center min-w-20">Item 3</div>
                          <div class="bg-orange-500 text-white p-3 rounded text-center min-w-20">Item 4</div>
                        </Stack>
                      </div>
                    </div>

                    <div>
                      <h4 class="text-md font-medium text-gray-900 dark:text-white mb-3">Button Groups</h4>
                      <div class="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
                        <Stack direction="horizontal" spacing="sm">
                          <Button size="sm">Save</Button>
                          <Button size="sm" variant="outline">Cancel</Button>
                          <Button size="sm" variant="ghost">Reset</Button>
                        </Stack>
                      </div>
                    </div>

                    <div>
                      <h4 class="text-md font-medium text-gray-900 dark:text-white mb-3">Navigation Items</h4>
                      <div class="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
                        <Stack direction="horizontal" spacing="xl">
                          <div class="text-center p-2 bg-white dark:bg-gray-600 rounded cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900">Home</div>
                          <div class="text-center p-2 bg-white dark:bg-gray-600 rounded cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900">About</div>
                          <div class="text-center p-2 bg-white dark:bg-gray-600 rounded cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900">Services</div>
                          <div class="text-center p-2 bg-white dark:bg-gray-600 rounded cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900">Contact</div>
                        </Stack>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Spacing Variants */}
        {activeDemo === 'spacing' && (
          <div class="space-y-8">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Spacing Variants</h2>
              <p class="text-gray-600 dark:text-gray-300 mb-8">
                Different spacing options from tight to very loose arrangements.
              </p>

              <div class="space-y-8">
                {/* Vertical Spacing */}
                <div class="space-y-4">
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">Vertical Spacing</h3>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { spacing: 'xs' as const, label: 'Tight (4px)', description: 'Minimal spacing for closely related items' },
                      { spacing: 'sm' as const, label: 'Snug (8px)', description: 'Small spacing for compact layouts' },
                      { spacing: 'md' as const, label: 'Normal (16px)', description: 'Default spacing for most use cases' },
                      { spacing: 'lg' as const, label: 'Relaxed (24px)', description: 'More breathing room between items' }
                    ].map(({ spacing, label, description }) => (
                      <div key={spacing}>
                        <h4 class="text-md font-medium text-gray-900 dark:text-white mb-2">
                          spacing="{spacing}"
                        </h4>
                        <p class="text-sm text-gray-600 dark:text-gray-300 mb-3">{label}</p>
                        <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                          <Stack direction="vertical" spacing={spacing}>
                            <div class="bg-blue-500 text-white p-2 rounded text-center text-sm">A</div>
                            <div class="bg-green-500 text-white p-2 rounded text-center text-sm">B</div>
                            <div class="bg-purple-500 text-white p-2 rounded text-center text-sm">C</div>
                          </Stack>
                        </div>
                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">{description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Horizontal Spacing */}
                <div class="space-y-4">
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">Horizontal Spacing</h3>
                  
                  <div class="space-y-6">
                    {[
                      { spacing: 'xs' as const, label: 'Tight (4px)' },
                      { spacing: 'sm' as const, label: 'Snug (8px)' },
                      { spacing: 'md' as const, label: 'Normal (16px)' },
                      { spacing: 'lg' as const, label: 'Loose (24px)' }
                    ].map(({ spacing, label }) => (
                      <div key={spacing}>
                        <h4 class="text-md font-medium text-gray-900 dark:text-white mb-3">
                          spacing="{spacing}" - {label}
                        </h4>
                        <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                          <Stack direction="horizontal" spacing={spacing}>
                            <div class="bg-blue-500 text-white p-3 rounded text-center min-w-16">A</div>
                            <div class="bg-green-500 text-white p-3 rounded text-center min-w-16">B</div>
                            <div class="bg-purple-500 text-white p-3 rounded text-center min-w-16">C</div>
                            <div class="bg-orange-500 text-white p-3 rounded text-center min-w-16">D</div>
                          </Stack>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Responsive Spacing */}
                <div class="space-y-4">
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">Responsive Spacing</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Adjust spacing based on screen size for optimal layouts
                  </p>
                  
                  <div class="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
                    <Stack direction="horizontal" spacing="sm" className="md:gap-4 lg:gap-6">
                      <div class="bg-blue-500 text-white p-3 rounded text-center min-w-20 text-sm">Mobile: 8px</div>
                      <div class="bg-green-500 text-white p-3 rounded text-center min-w-20 text-sm">Tablet: 16px</div>
                      <div class="bg-purple-500 text-white p-3 rounded text-center min-w-20 text-sm">Desktop: 24px</div>
                    </Stack>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Alignment Options */}
        {activeDemo === 'alignment' && (
          <div class="space-y-8">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Alignment Options</h2>
              <p class="text-gray-600 dark:text-gray-300 mb-8">
                Control how items are aligned within the Stack container.
              </p>

              <div class="space-y-8">
                {/* Horizontal Alignment (for vertical stacks) */}
                <div class="space-y-4">
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">Horizontal Alignment (Vertical Stack)</h3>
                  
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { align: 'start', label: 'Left Aligned', class: 'items-start' },
                      { align: 'center', label: 'Center Aligned', class: 'items-center' },
                      { align: 'end', label: 'Right Aligned', class: 'items-end' }
                    ].map(({ align, label, class: alignClass }) => (
                      <div key={align}>
                        <h4 class="text-md font-medium text-gray-900 dark:text-white mb-3">
                          align="{align}"
                        </h4>
                        <p class="text-sm text-gray-600 dark:text-gray-300 mb-3">{label}</p>
                        <div class="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg h-48">
                          <Stack direction="vertical" spacing="sm" className={alignClass}>
                            <div class="bg-blue-500 text-white p-2 rounded text-center w-20">Short</div>
                            <div class="bg-green-500 text-white p-2 rounded text-center w-32">Medium Length</div>
                            <div class="bg-purple-500 text-white p-2 rounded text-center w-40">Very Long Content</div>
                          </Stack>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vertical Alignment (for horizontal stacks) */}
                <div class="space-y-4">
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">Vertical Alignment (Horizontal Stack)</h3>
                  
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { align: 'start', label: 'Top Aligned', class: 'items-start' },
                      { align: 'center', label: 'Center Aligned', class: 'items-center' },
                      { align: 'end', label: 'Bottom Aligned', class: 'items-end' }
                    ].map(({ align, label, class: alignClass }) => (
                      <div key={align}>
                        <h4 class="text-md font-medium text-gray-900 dark:text-white mb-3">
                          align="{align}"
                        </h4>
                        <p class="text-sm text-gray-600 dark:text-gray-300 mb-3">{label}</p>
                        <div class="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg h-32">
                          <Stack direction="horizontal" spacing="sm" className={alignClass}>
                            <div class="bg-blue-500 text-white p-2 rounded text-center h-8 flex items-center">Small</div>
                            <div class="bg-green-500 text-white p-2 rounded text-center h-16 flex items-center">Medium</div>
                            <div class="bg-purple-500 text-white p-2 rounded text-center h-12 flex items-center">Large</div>
                          </Stack>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Justify Content */}
                <div class="space-y-4">
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">Distribution (Justify Content)</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Control how items are distributed along the main axis
                  </p>
                  
                  <div class="space-y-6">
                    {[
                      { justify: 'start', label: 'Flex Start', class: 'justify-start' },
                      { justify: 'center', label: 'Center', class: 'justify-center' },
                      { justify: 'end', label: 'Flex End', class: 'justify-end' },
                      { justify: 'between', label: 'Space Between', class: 'justify-between' },
                      { justify: 'around', label: 'Space Around', class: 'justify-around' },
                      { justify: 'evenly', label: 'Space Evenly', class: 'justify-evenly' }
                    ].map(({ justify, label, class: justifyClass }) => (
                      <div key={justify}>
                        <h4 class="text-md font-medium text-gray-900 dark:text-white mb-2">
                          justify="{justify}" - {label}
                        </h4>
                        <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                          <Stack direction="horizontal" spacing="none" className={justifyClass}>
                            <div class="bg-blue-500 text-white p-2 rounded text-center min-w-16">A</div>
                            <div class="bg-green-500 text-white p-2 rounded text-center min-w-16">B</div>
                            <div class="bg-purple-500 text-white p-2 rounded text-center min-w-16">C</div>
                          </Stack>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Layout Examples */}
        {activeDemo === 'examples' && (
          <div class="space-y-8">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Real-world Layout Examples</h2>
              
              <div class="space-y-12">
                {/* Navigation Bar */}
                <div class="space-y-4">
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">Navigation Bar Layout</h3>
                  <Card>
                    <div class="p-4">
                      <Stack direction="horizontal" spacing="none" className="justify-between items-center">
                        <div class="flex items-center">
                          <div class="w-8 h-8 bg-blue-600 rounded mr-3"></div>
                          <span class="font-semibold text-gray-900 dark:text-white">Brand</span>
                        </div>
                        
                        <Stack direction="horizontal" spacing="xl">
                          <a href="#" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Home</a>
                          <a href="#" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">About</a>
                          <a href="#" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Services</a>
                          <a href="#" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Contact</a>
                        </Stack>
                        
                        <Stack direction="horizontal" spacing="sm">
                          <Button size="sm" variant="outline">Login</Button>
                          <Button size="sm">Sign Up</Button>
                        </Stack>
                      </Stack>
                    </div>
                  </Card>
                </div>

                {/* Form Layout */}
                <div class="space-y-4">
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">Form Layout</h3>
                  <div class="max-w-md">
                    <Card>
                      <div class="p-6">
                        <Stack direction="vertical" spacing="md">
                          <div>
                            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Contact Form</h4>
                            <p class="text-gray-600 dark:text-gray-300 text-sm">Fill out the form below</p>
                          </div>
                          
                          <Stack direction="vertical" spacing="md">
                            <div>
                              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                              <div class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                                John Doe
                              </div>
                            </div>
                            
                            <div>
                              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                              <div class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                                john@example.com
                              </div>
                            </div>
                            
                            <div>
                              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                              <div class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white h-20">
                                Your message here...
                              </div>
                            </div>
                          </Stack>
                          
                          <Stack direction="horizontal" spacing="sm" className="justify-end">
                            <Button variant="outline">Cancel</Button>
                            <Button>Send Message</Button>
                          </Stack>
                        </Stack>
                      </div>
                    </Card>
                  </div>
                </div>

                {/* Dashboard Cards */}
                <div class="space-y-4">
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">Dashboard Card Grid</h3>
                  <Stack direction="vertical" spacing="xl">
                    <Stack direction="horizontal" spacing="xl" className="justify-between">
                      <div class="flex-1">
                        <Card>
                          <div class="p-6">
                            <Stack direction="vertical" spacing="sm">
                              <div class="flex items-center justify-between">
                                <h4 class="text-sm font-medium text-gray-600 dark:text-gray-300">Total Revenue</h4>
                                <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                              </div>
                              <div class="text-2xl font-bold text-gray-900 dark:text-white">$45,231</div>
                              <div class="text-sm text-green-600">+20.1% from last month</div>
                            </Stack>
                          </div>
                        </Card>
                      </div>
                      
                      <div class="flex-1">
                        <Card>
                          <div class="p-6">
                            <Stack direction="vertical" spacing="sm">
                              <div class="flex items-center justify-between">
                                <h4 class="text-sm font-medium text-gray-600 dark:text-gray-300">Active Users</h4>
                                <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                </svg>
                              </div>
                              <div class="text-2xl font-bold text-gray-900 dark:text-white">2,350</div>
                              <div class="text-sm text-blue-600">+180.1% from last month</div>
                            </Stack>
                          </div>
                        </Card>
                      </div>
                      
                      <div class="flex-1">
                        <Card>
                          <div class="p-6">
                            <Stack direction="vertical" spacing="sm">
                              <div class="flex items-center justify-between">
                                <h4 class="text-sm font-medium text-gray-600 dark:text-gray-300">Sales</h4>
                                <svg class="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                              </div>
                              <div class="text-2xl font-bold text-gray-900 dark:text-white">12,234</div>
                              <div class="text-sm text-purple-600">+19% from last month</div>
                            </Stack>
                          </div>
                        </Card>
                      </div>
                    </Stack>
                  </Stack>
                </div>

                {/* Article Layout */}
                <div class="space-y-4">
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">Article/Blog Layout</h3>
                  <div class="max-w-2xl">
                    <Card>
                      <div class="p-8">
                        <Stack direction="vertical" spacing="xl">
                          <Stack direction="vertical" spacing="sm">
                            <h4 class="text-2xl font-bold text-gray-900 dark:text-white">
                              Understanding Component Architecture
                            </h4>
                            <Stack direction="horizontal" spacing="md" className="items-center text-sm text-gray-500 dark:text-gray-400">
                              <div class="flex items-center gap-2">
                                <div class="w-6 h-6 bg-gray-300 rounded-full"></div>
                                <span>John Doe</span>
                              </div>
                              <span>•</span>
                              <span>March 15, 2024</span>
                              <span>•</span>
                              <span>5 min read</span>
                            </Stack>
                          </Stack>
                          
                          <div class="prose dark:prose-invert">
                            <p class="text-gray-600 dark:text-gray-300">
                              Component architecture is a fundamental concept in modern web development. 
                              It allows developers to create reusable, maintainable, and scalable user interfaces.
                            </p>
                            <p class="text-gray-600 dark:text-gray-300">
                              In this article, we'll explore the best practices for designing component systems 
                              that stand the test of time and grow with your application's needs.
                            </p>
                          </div>
                          
                          <Stack direction="horizontal" spacing="md" className="justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                            <Stack direction="horizontal" spacing="md">
                              <button class="flex items-center gap-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                <span>24</span>
                              </button>
                              <button class="flex items-center gap-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                <span>12</span>
                              </button>
                            </Stack>
                            
                            <button class="flex items-center gap-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                              </svg>
                              <span>Share</span>
                            </button>
                          </Stack>
                        </Stack>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
