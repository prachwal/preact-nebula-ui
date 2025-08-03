import { useState } from 'preact/hooks'
import { Spinner } from '@/components'
import { route } from 'preact-router'

interface PageProps {
  path?: string
}

export function SpinnerPage(_props: PageProps) {
  const [activeDemo, setActiveDemo] = useState<'sizes' | 'colors' | 'usage' | 'accessibility'>('sizes')

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
              <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Spinner Component</h1>
              <p class="text-gray-600 dark:text-gray-300 mt-2">
                Loading indicator with customizable sizes and colors for better user feedback
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div class="flex space-x-1 mt-6 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
            {[
              { key: 'sizes', label: 'Size Variants' },
              { key: 'colors', label: 'Color Options' },
              { key: 'usage', label: 'Usage Examples' },
              { key: 'accessibility', label: 'Accessibility' }
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
        
        {/* Sizes Demo */}
        {activeDemo === 'sizes' && (
          <div class="space-y-8">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Spinner Sizes</h2>
              <p class="text-gray-600 dark:text-gray-300 mb-8">
                Six different sizes to match your UI requirements, from tiny inline indicators to prominent loading displays.
              </p>

              <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                {[
                  { size: 'xs' as const, dimensions: '10px × 10px', description: 'Extra small for inline text' },
                  { size: 'sm' as const, dimensions: '12px × 12px', description: 'Small for compact components' },
                  { size: 'md' as const, dimensions: '16px × 16px', description: 'Medium (default)' },
                  { size: 'lg' as const, dimensions: '20px × 20px', description: 'Large for buttons' },
                  { size: 'xl' as const, dimensions: '24px × 24px', description: 'Extra large for cards' },
                  { size: '2xl' as const, dimensions: '32px × 32px', description: 'Largest for full-screen loading' }
                ].map(({ size, dimensions, description }) => (
                  <div key={size} class="text-center space-y-4">
                    <div>
                      <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                        size="{size}"
                      </h3>
                      <div class="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                        <div>{dimensions}</div>
                      </div>
                      <p class="text-sm text-gray-600 dark:text-gray-300 mt-2">{description}</p>
                    </div>
                    
                    <div class="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg flex items-center justify-center">
                      <Spinner size={size} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Size comparison */}
              <div class="mt-12 bg-gray-100 dark:bg-gray-700 p-8 rounded-lg">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-6 text-center">Size Comparison</h3>
                <div class="flex items-center justify-center gap-8 flex-wrap">
                  <div class="flex items-center gap-2">
                    <Spinner size="xs" />
                    <span class="text-sm text-gray-600 dark:text-gray-300">XS</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <Spinner size="sm" />
                    <span class="text-sm text-gray-600 dark:text-gray-300">SM</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <Spinner size="md" />
                    <span class="text-sm text-gray-600 dark:text-gray-300">MD</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <Spinner size="lg" />
                    <span class="text-sm text-gray-600 dark:text-gray-300">LG</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <Spinner size="xl" />
                    <span class="text-sm text-gray-600 dark:text-gray-300">XL</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <Spinner size="2xl" />
                    <span class="text-sm text-gray-600 dark:text-gray-300">2XL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Colors Demo */}
        {activeDemo === 'colors' && (
          <div class="space-y-8">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Spinner Colors</h2>
              <p class="text-gray-600 dark:text-gray-300 mb-8">
                Multiple color options to match your design system and provide semantic meaning.
              </p>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { color: 'current' as const, description: 'Inherits text color (default)', bgClass: 'bg-gray-100 dark:bg-gray-700' },
                  { color: 'blue' as const, description: 'Primary blue for general loading', bgClass: 'bg-blue-50 dark:bg-blue-900/20' },
                  { color: 'gray' as const, description: 'Neutral gray for subtle loading', bgClass: 'bg-gray-100 dark:bg-gray-700' },
                  { color: 'white' as const, description: 'White for dark backgrounds', bgClass: 'bg-gray-800' },
                  { color: 'red' as const, description: 'Red for error or danger states', bgClass: 'bg-red-50 dark:bg-red-900/20' },
                  { color: 'green' as const, description: 'Green for success loading', bgClass: 'bg-green-50 dark:bg-green-900/20' },
                  { color: 'yellow' as const, description: 'Yellow for warning states', bgClass: 'bg-yellow-50 dark:bg-yellow-900/20' }
                ].map(({ color, description, bgClass }) => (
                  <div key={color} class="space-y-4">
                    <div>
                      <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                        color="{color}"
                      </h3>
                      <p class="text-sm text-gray-600 dark:text-gray-300">{description}</p>
                    </div>
                    
                    <div class={`${bgClass} p-6 rounded-lg flex items-center justify-center`}>
                      <Spinner color={color} size="lg" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Color combinations with different sizes */}
              <div class="mt-12">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-6">Color Combinations</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
                    <h4 class="text-md font-medium text-gray-900 dark:text-white mb-4">Light Backgrounds</h4>
                    <div class="flex items-center justify-center gap-6">
                      <Spinner color="blue" size="lg" />
                      <Spinner color="red" size="lg" />
                      <Spinner color="green" size="lg" />
                      <Spinner color="yellow" size="lg" />
                    </div>
                  </div>
                  
                  <div class="bg-gray-800 p-6 rounded-lg">
                    <h4 class="text-md font-medium text-white mb-4">Dark Backgrounds</h4>
                    <div class="flex items-center justify-center gap-6">
                      <Spinner color="white" size="lg" />
                      <Spinner color="blue" size="lg" />
                      <Spinner color="green" size="lg" />
                      <Spinner color="yellow" size="lg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Usage Examples */}
        {activeDemo === 'usage' && (
          <div class="space-y-8">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Real-world Usage Examples</h2>
              
              <div class="space-y-8">
                {/* Inline Text */}
                <div class="space-y-4">
                  <div>
                    <h3 class="text-lg font-medium text-gray-900 dark:text-white">Inline with Text</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-300">Small spinners that flow with text content</p>
                  </div>
                  
                  <div class="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg space-y-4">
                    <div class="text-gray-900 dark:text-white flex items-center gap-2">
                      <Spinner size="xs" /> Loading your profile...
                    </div>
                    <div class="text-gray-900 dark:text-white flex items-center gap-2">
                      <Spinner size="sm" color="blue" /> Saving changes...
                    </div>
                    <div class="text-gray-900 dark:text-white flex items-center gap-2">
                      Processing payment <Spinner size="xs" color="green" />
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div class="space-y-4">
                  <div>
                    <h3 class="text-lg font-medium text-gray-900 dark:text-white">In Buttons</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-300">Button loading states with appropriate spinner sizes</p>
                  </div>
                  
                  <div class="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
                    <div class="flex flex-wrap gap-4">
                      <button class="px-3 py-1 bg-blue-600 text-white rounded text-sm flex items-center gap-2">
                        <Spinner size="xs" color="white" />
                        Save
                      </button>
                      <button class="px-4 py-2 bg-green-600 text-white rounded flex items-center gap-2">
                        <Spinner size="sm" color="white" />
                        Submit Form
                      </button>
                      <button class="px-6 py-3 bg-red-600 text-white rounded text-lg flex items-center gap-2">
                        <Spinner size="md" color="white" />
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>

                {/* Cards and Containers */}
                <div class="space-y-4">
                  <div>
                    <h3 class="text-lg font-medium text-gray-900 dark:text-white">Cards and Containers</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-300">Centered spinners for content loading states</p>
                  </div>
                  
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="bg-gray-100 dark:bg-gray-700 p-8 rounded-lg flex flex-col items-center justify-center min-h-32">
                      <Spinner size="lg" color="blue" />
                      <div class="text-sm text-gray-600 dark:text-gray-300 mt-2">Loading content...</div>
                    </div>

                    <div class="bg-gray-100 dark:bg-gray-700 p-8 rounded-lg flex flex-col items-center justify-center min-h-32">
                      <Spinner size="xl" color="green" />
                      <div class="text-sm text-gray-600 dark:text-gray-300 mt-2">Processing...</div>
                    </div>

                    <div class="bg-gray-100 dark:bg-gray-700 p-8 rounded-lg flex flex-col items-center justify-center min-h-32">
                      <Spinner size="2xl" color="red" />
                      <div class="text-sm text-gray-600 dark:text-gray-300 mt-2">Heavy operation...</div>
                    </div>
                  </div>
                </div>

                {/* Full Page Loading */}
                <div class="space-y-4">
                  <div>
                    <h3 class="text-lg font-medium text-gray-900 dark:text-white">Full Page Loading</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-300">Large spinner for full-screen loading overlays</p>
                  </div>
                  
                  <div class="bg-gray-100 dark:bg-gray-700 p-12 rounded-lg flex flex-col items-center justify-center min-h-64">
                    <Spinner size="2xl" color="blue" />
                    <div class="text-lg text-gray-600 dark:text-gray-300 mt-4">Loading application...</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400 mt-2">Please wait while we prepare everything</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Accessibility Demo */}
        {activeDemo === 'accessibility' && (
          <div class="space-y-8">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Accessibility Features</h2>
              <p class="text-gray-600 dark:text-gray-300 mb-8">
                Built-in accessibility support for screen readers and assistive technologies.
              </p>
              
              <div class="space-y-8">
                {/* ARIA Labels */}
                <div class="space-y-4">
                  <div>
                    <h3 class="text-lg font-medium text-gray-900 dark:text-white">ARIA Labels</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-300">Custom labels for screen readers</p>
                  </div>
                  
                  <div class="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg space-y-4">
                    <div class="flex items-center gap-4">
                      <Spinner aria-label="Loading profile data" />
                      <code class="text-sm bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">
                        aria-label="Loading profile data"
                      </code>
                    </div>
                    
                    <div class="flex items-center gap-4">
                      <Spinner aria-label="Saving your changes, please wait" color="green" />
                      <code class="text-sm bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">
                        aria-label="Saving your changes, please wait"
                      </code>
                    </div>
                    
                    <div class="flex items-center gap-4">
                      <Spinner aria-label="Processing payment securely" color="blue" />
                      <code class="text-sm bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">
                        aria-label="Processing payment securely"
                      </code>
                    </div>
                  </div>
                </div>

                {/* Role and Status */}
                <div class="space-y-4">
                  <div>
                    <h3 class="text-lg font-medium text-gray-900 dark:text-white">Role and Status</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-300">Automatic role="status" for proper screen reader announcements</p>
                  </div>
                  
                  <div class="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
                    <div class="space-y-2">
                      <div class="text-sm text-gray-900 dark:text-white font-medium">All spinners automatically include:</div>
                      <ul class="text-sm text-gray-600 dark:text-gray-300 space-y-1 ml-4">
                        <li>• <code>role="status"</code> - Announces loading state changes</li>
                        <li>• <code>aria-label="Loading..."</code> - Default accessible label</li>
                        <li>• Proper SVG structure for screen reader compatibility</li>
                        <li>• Focus management considerations</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Best Practices */}
                <div class="space-y-4">
                  <div>
                    <h3 class="text-lg font-medium text-gray-900 dark:text-white">Best Practices</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-300">Guidelines for accessible spinner usage</p>
                  </div>
                  
                  <div class="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 class="text-sm font-medium text-green-700 dark:text-green-400 mb-2">✅ Do</h4>
                        <ul class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                          <li>• Provide meaningful aria-label text</li>
                          <li>• Use appropriate colors for context</li>
                          <li>• Match spinner size to content scale</li>
                          <li>• Remove spinner when loading completes</li>
                          <li>• Announce completion to screen readers</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 class="text-sm font-medium text-red-700 dark:text-red-400 mb-2">❌ Don't</h4>
                        <ul class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                          <li>• Use spinners without context</li>
                          <li>• Make spinners too small to notice</li>
                          <li>• Leave spinners running indefinitely</li>
                          <li>• Use only color to convey loading state</li>
                          <li>• Forget to handle loading errors</li>
                        </ul>
                      </div>
                    </div>
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
