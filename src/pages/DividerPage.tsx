import { useState } from 'preact/hooks'
import { Divider } from '@/components'
import { route } from 'preact-router'

interface PageProps {
  path?: string
}

export function DividerPage(_props: PageProps) {
  const [activeDemo, setActiveDemo] = useState<'orientation' | 'variants' | 'text'>('orientation')

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
              <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Divider Component</h1>
              <p class="text-gray-600 dark:text-gray-300 mt-2">
                Visual separator with horizontal/vertical orientations and text support
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div class="flex space-x-1 mt-6 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
            {[
              { key: 'orientation', label: 'Orientation' },
              { key: 'variants', label: 'Line Variants' },
              { key: 'text', label: 'With Text' }
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
        
        {/* Orientation Demo */}
        {activeDemo === 'orientation' && (
          <div class="space-y-8">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Divider Orientations</h2>
              
              <div class="space-y-8">
                {/* Horizontal */}
                <div class="space-y-4">
                  <div>
                    <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                      orientation="horizontal" (default)
                    </h3>
                    <p class="text-sm text-gray-600 dark:text-gray-300">Full width horizontal line separator</p>
                  </div>
                  
                  <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                    <div class="text-gray-900 dark:text-white">Content above divider</div>
                    <Divider orientation="horizontal" class="my-4" />
                    <div class="text-gray-900 dark:text-white">Content below divider</div>
                  </div>
                </div>

                {/* Vertical */}
                <div class="space-y-4">
                  <div>
                    <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                      orientation="vertical"
                    </h3>
                    <p class="text-sm text-gray-600 dark:text-gray-300">Vertical line separator for inline content</p>
                  </div>
                  
                  <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                    <div class="flex items-center h-24">
                      <div class="text-gray-900 dark:text-white px-4">Left content</div>
                      <Divider orientation="vertical" class="mx-4" />
                      <div class="text-gray-900 dark:text-white px-4">Right content</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Variants Demo */}
        {activeDemo === 'variants' && (
          <div class="space-y-8">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Line Style Variants</h2>
              
              <div class="space-y-8">
                {[
                  { variant: 'solid' as const, description: 'Solid line (default)' },
                  { variant: 'dashed' as const, description: 'Dashed line pattern' },
                  { variant: 'dotted' as const, description: 'Dotted line pattern' }
                ].map(({ variant, description }) => (
                  <div key={variant} class="space-y-4">
                    <div>
                      <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                        variant="{variant}"
                      </h3>
                      <p class="text-sm text-gray-600 dark:text-gray-300">{description}</p>
                    </div>
                    
                    <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                      <div class="text-gray-900 dark:text-white mb-4">Content above</div>
                      <Divider variant={variant} />
                      <div class="text-gray-900 dark:text-white mt-4">Content below</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Text Demo */}
        {activeDemo === 'text' && (
          <div class="space-y-8">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Dividers with Text</h2>
              
              <div class="space-y-8">
                {/* Horizontal with text */}
                <div class="space-y-4">
                  <div>
                    <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                      Horizontal with text
                    </h3>
                    <p class="text-sm text-gray-600 dark:text-gray-300">Text appears centered between divider lines</p>
                  </div>
                  
                  <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg space-y-6">
                    <div>
                      <div class="text-gray-900 dark:text-white mb-4">Login form content</div>
                      <Divider text="OR" />
                      <div class="text-gray-900 dark:text-white mt-4">Social login options</div>
                    </div>

                    <div>
                      <div class="text-gray-900 dark:text-white mb-4">Recent posts</div>
                      <Divider text="2024" variant="dashed" />
                      <div class="text-gray-900 dark:text-white mt-4">Archived posts</div>
                    </div>

                    <div>
                      <div class="text-gray-900 dark:text-white mb-4">Premium features</div>
                      <Divider text="Upgrade Required" size="lg" />
                      <div class="text-gray-900 dark:text-white mt-4">Free features</div>
                    </div>
                  </div>
                </div>

                {/* Vertical with text */}
                <div class="space-y-4">
                  <div>
                    <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                      Vertical with text
                    </h3>
                    <p class="text-sm text-gray-600 dark:text-gray-300">Text appears centered between vertical divider lines</p>
                  </div>
                  
                  <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                    <div class="flex h-32">
                      <div class="flex-1 flex items-center justify-center text-gray-900 dark:text-white">
                        Left Panel Content
                      </div>
                      <Divider orientation="vertical" text="OR" class="mx-4" />
                      <div class="flex-1 flex items-center justify-center text-gray-900 dark:text-white">
                        Right Panel Content
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
