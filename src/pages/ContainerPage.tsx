import { useState } from 'preact/hooks'
import { Container } from '@/components'
import { route } from 'preact-router'

interface PageProps {
  path?: string
}

export function ContainerPage(_props: PageProps) {
  const [activeDemo, setActiveDemo] = useState<'sizes' | 'padding' | 'centering' | 'combinations'>('sizes')

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
              <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Container Component</h1>
              <p class="text-gray-600 dark:text-gray-300 mt-2">
                Responsive layout wrapper with max-width constraints and flexible padding options
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div class="flex space-x-1 mt-6 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
            {[
              { key: 'sizes', label: 'Size Variants' },
              { key: 'padding', label: 'Padding Options' },
              { key: 'centering', label: 'Centering Control' },
              { key: 'combinations', label: 'Combinations' }
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
        
        {/* Size Variants Demo */}
        {activeDemo === 'sizes' && (
          <div class="space-y-8">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Container Sizes</h2>
              <p class="text-gray-600 dark:text-gray-300 mb-8">
                Each size variant controls the maximum width of the container at different breakpoints.
              </p>

              <div class="space-y-6">
                {[
                  { size: 'sm' as const, width: '384px (24rem)', description: 'Small container for compact content' },
                  { size: 'md' as const, width: '448px (28rem)', description: 'Medium container for regular content' },
                  { size: 'lg' as const, width: '672px (42rem)', description: 'Large container (default)' },
                  { size: 'xl' as const, width: '896px (56rem)', description: 'Extra large for wide content' },
                  { size: '2xl' as const, width: '1152px (72rem)', description: 'Maximum width container' },
                  { size: 'full' as const, width: '100%', description: 'Full width container' }
                ].map(({ size, width, description }) => (
                  <div key={size} class="space-y-3">
                    <div class="flex items-center justify-between">
                      <div>
                        <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                          size="{size}" 
                          <span class="text-sm text-gray-500 dark:text-gray-400 ml-2">
                            max-width: {width}
                          </span>
                        </h3>
                        <p class="text-sm text-gray-600 dark:text-gray-300">{description}</p>
                      </div>
                    </div>
                    
                    <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto">
                      <Container size={size} background="white" className="border-2 border-blue-300 dark:border-blue-600 rounded min-h-[120px]">
                        <div class="py-8 text-center">
                          <div class="text-gray-900 dark:text-white font-medium">Container size="{size}"</div>
                          <div class="text-sm text-gray-600 dark:text-gray-300 mt-1">Max-width: {width}</div>
                          <div class="text-xs text-gray-500 dark:text-gray-400 mt-2">
                            Current width: <span class="font-mono bg-gray-100 dark:bg-gray-600 px-1 rounded">
                              {size === 'full' ? '100%' : 'constrained'}
                            </span>
                          </div>
                        </div>
                      </Container>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Padding Variants Demo */}
        {activeDemo === 'padding' && (
          <div class="space-y-8">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Padding Variants</h2>
              <p class="text-gray-600 dark:text-gray-300 mb-8">
                Control horizontal padding with responsive options.
              </p>

              <div class="space-y-6">
                {[
                  { padding: 'none' as const, classes: 'px-0', description: 'No horizontal padding' },
                  { padding: 'sm' as const, classes: 'px-4', description: 'Small padding (16px)' },
                  { padding: 'md' as const, classes: 'px-6 sm:px-8', description: 'Medium padding (24px / 32px on sm+)' },
                  { padding: 'lg' as const, classes: 'px-8 sm:px-12', description: 'Large padding (32px / 48px on sm+)' }
                ].map(({ padding, classes, description }) => (
                  <div key={padding} class="space-y-3">
                    <div>
                      <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                        padding="{padding}"
                        <span class="text-sm text-gray-500 dark:text-gray-400 ml-2">
                          ({classes})
                        </span>
                      </h3>
                      <p class="text-sm text-gray-600 dark:text-gray-300">{description}</p>
                    </div>
                    
                    <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                      <Container size="md" padding={padding} background="gray-50" className="border-2 border-green-300 dark:border-green-600 rounded">
                        <div class="bg-green-200 dark:bg-green-800 py-4 text-center rounded">
                          <div class="text-gray-900 dark:text-white font-medium">Padding: {padding}</div>
                          <div class="text-sm text-gray-600 dark:text-gray-300 mt-1">Classes: {classes}</div>
                        </div>
                      </Container>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Centering Demo */}
        {activeDemo === 'centering' && (
          <div class="space-y-8">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Container Centering</h2>
              <p class="text-gray-600 dark:text-gray-300 mb-8">
                Control whether containers are centered with mx-auto or aligned to the left.
              </p>

              <div class="space-y-8">
                <div class="space-y-3">
                  <div>
                    <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                      centered=true (default)
                    </h3>
                    <p class="text-sm text-gray-600 dark:text-gray-300">Centered with mx-auto</p>
                  </div>
                  
                  <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                    <Container size="md" centered={true} class="bg-purple-100 dark:bg-purple-900 border-2 border-purple-300 dark:border-purple-600 rounded">
                      <div class="py-8 text-center">
                        <div class="text-gray-900 dark:text-white font-medium">Centered Container</div>
                        <div class="text-sm text-gray-600 dark:text-gray-300 mt-1">centered=true (mx-auto applied)</div>
                      </div>
                    </Container>
                  </div>
                </div>

                <div class="space-y-3">
                  <div>
                    <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                      centered=false
                    </h3>
                    <p class="text-sm text-gray-600 dark:text-gray-300">Not centered, aligned to left</p>
                  </div>
                  
                  <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                    <Container size="md" centered={false} class="bg-orange-100 dark:bg-orange-900 border-2 border-orange-300 dark:border-orange-600 rounded">
                      <div class="py-8 text-center">
                        <div class="text-gray-900 dark:text-white font-medium">Left-aligned Container</div>
                        <div class="text-sm text-gray-600 dark:text-gray-300 mt-1">centered=false (no mx-auto)</div>
                      </div>
                    </Container>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Combinations Demo */}
        {activeDemo === 'combinations' && (
          <div class="space-y-8">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Custom Combinations</h2>
              <p class="text-gray-600 dark:text-gray-300 mb-8">
                Examples of combining size, padding, and centering options.
              </p>

              <div class="space-y-8">
                {[
                  { 
                    props: { size: 'xl' as const, padding: 'lg' as const }, 
                    description: 'Extra large container with large padding',
                    bgColor: 'bg-red-100 dark:bg-red-900 border-red-300 dark:border-red-600'
                  },
                  { 
                    props: { size: 'sm' as const, padding: 'sm' as const, centered: false }, 
                    description: 'Small container with small padding, left-aligned',
                    bgColor: 'bg-indigo-100 dark:bg-indigo-900 border-indigo-300 dark:border-indigo-600'
                  },
                  { 
                    props: { size: 'full' as const, padding: 'none' as const }, 
                    description: 'Full width container with no padding',
                    bgColor: 'bg-yellow-100 dark:bg-yellow-900 border-yellow-300 dark:border-yellow-600'
                  }
                ].map((example, index) => (
                  <div key={index} class="space-y-3">
                    <div>
                      <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                        {Object.entries(example.props).map(([key, value]) => `${key}="${value}"`).join(' ')}
                      </h3>
                      <p class="text-sm text-gray-600 dark:text-gray-300">{example.description}</p>
                    </div>
                    
                    <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                      <Container {...example.props} class={`${example.bgColor} border-2 rounded`}>
                        <div class="py-8 text-center">
                          <div class="text-gray-900 dark:text-white font-medium">{example.description}</div>
                          <div class="text-sm text-gray-600 dark:text-gray-300 mt-1">
                            {Object.entries(example.props).map(([key, value]) => `${key}="${value}"`).join(', ')}
                          </div>
                        </div>
                      </Container>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
