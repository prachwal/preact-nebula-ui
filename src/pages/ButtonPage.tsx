import { useState } from 'preact/hooks'
import { Button } from '@/components'
import { route } from 'preact-router'

interface PageProps {
  path?: string
}

export function ButtonPage(_props: PageProps) {
  const [activeDemo, setActiveDemo] = useState<'variants' | 'sizes' | 'states' | 'icons' | 'combinations'>('variants')

  const handleClick = () => {
    alert('Button clicked!')
  }

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
              <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Button Component</h1>
              <p class="text-gray-600 dark:text-gray-300 mt-2">
                Interactive button component with variants, sizes, states, and icons
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div class="flex space-x-1 mt-6 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
            {[
              { key: 'variants', label: 'Variants' },
              { key: 'sizes', label: 'Sizes' },
              { key: 'states', label: 'States' },
              { key: 'icons', label: 'Icons' },
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
        
        {/* Variants Demo */}
        {activeDemo === 'variants' && (
          <div class="space-y-8">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Button Variants</h2>
              
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { variant: 'primary' as const, description: 'Primary action button with blue background' },
                  { variant: 'secondary' as const, description: 'Secondary action with gray background' },
                  { variant: 'outline' as const, description: 'Outlined button with transparent background' },
                  { variant: 'ghost' as const, description: 'Minimal button with hover effect only' },
                  { variant: 'destructive' as const, description: 'Destructive action with red background' }
                ].map(({ variant, description }) => (
                  <div key={variant} class="space-y-4">
                    <div>
                      <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                        variant="{variant}"
                      </h3>
                      <p class="text-sm text-gray-600 dark:text-gray-300">{description}</p>
                    </div>
                    
                    <div class="space-y-3">
                      <Button variant={variant} onClick={handleClick}>
                        {variant.charAt(0).toUpperCase() + variant.slice(1)} Button
                      </Button>
                      
                      <div class="text-xs text-gray-500 dark:text-gray-400">
                        Click to test interaction
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Sizes Demo */}
        {activeDemo === 'sizes' && (
          <div class="space-y-8">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Button Sizes</h2>
              <p class="text-gray-600 dark:text-gray-300 mb-8">
                Different sizes control padding and text size. Buttons scale from small to extra large.
              </p>
              
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { size: 'sm' as const, padding: 'px-2.5 py-1', textSize: 'text-sm', description: 'Small button for compact layouts' },
                  { size: 'md' as const, padding: 'px-4 py-2', textSize: 'text-base', description: 'Medium button (default)' },
                  { size: 'lg' as const, padding: 'px-6 py-3.5', textSize: 'text-lg', description: 'Large button for prominence' },
                  { size: 'xl' as const, padding: 'px-8 py-5', textSize: 'text-xl', description: 'Extra large for hero sections' }
                ].map(({ size, padding, textSize, description }) => (
                  <div key={size} class="space-y-4">
                    <div>
                      <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                        size="{size}"
                      </h3>
                      <div class="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                        <div>Padding: {padding}</div>
                        <div>Text: {textSize}</div>
                      </div>
                      <p class="text-sm text-gray-600 dark:text-gray-300 mt-2">{description}</p>
                    </div>
                    
                    <div class="space-y-3">
                      <Button size={size} onClick={handleClick}>
                        {size.toUpperCase()} Button
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Size comparison */}
              <div class="mt-12 bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-6">Size Comparison</h3>
                <div class="flex flex-wrap items-end gap-4">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                  <Button size="xl">Extra Large</Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* States Demo */}
        {activeDemo === 'states' && (
          <div class="space-y-8">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Button States</h2>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { 
                    props: {}, 
                    label: 'Default State', 
                    description: 'Normal interactive button ready for clicks' 
                  },
                  { 
                    props: { disabled: true }, 
                    label: 'Disabled State', 
                    description: 'Non-interactive button with reduced opacity' 
                  },
                  { 
                    props: { loading: true }, 
                    label: 'Loading State', 
                    description: 'Button with animated spinner indicating processing' 
                  },
                  { 
                    props: { fullWidth: true }, 
                    label: 'Full Width', 
                    description: 'Button spans full width of container' 
                  }
                ].map(({ props, label, description }, index) => (
                  <div key={index} class="space-y-4">
                    <div>
                      <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                        {label}
                      </h3>
                      <p class="text-sm text-gray-600 dark:text-gray-300">{description}</p>
                      <div class="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        Props: {Object.entries(props).length === 0 ? 'none' : Object.entries(props).map(([key, value]) => `${key}={${value}}`).join(', ')}
                      </div>
                    </div>
                    
                    <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                      <Button {...props} onClick={handleClick}>
                        {label}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* State combinations with different variants */}
              <div class="mt-12">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-6">States across Variants</h3>
                <div class="space-y-6">
                  {[
                    { state: 'loading', props: { loading: true } },
                    { state: 'disabled', props: { disabled: true } }
                  ].map(({ state, props }) => (
                    <div key={state} class="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
                      <h4 class="text-md font-medium text-gray-900 dark:text-white mb-4 capitalize">
                        {state} state across all variants
                      </h4>
                      <div class="flex flex-wrap gap-4">
                        {['primary', 'secondary', 'outline', 'ghost', 'destructive'].map(variant => (
                          <Button key={variant} variant={variant as any} {...props}>
                            {variant} {state}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Icons Demo */}
        {activeDemo === 'icons' && (
          <div class="space-y-8">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Buttons with Icons</h2>
              
              <div class="space-y-8">
                {/* Left Icon */}
                <div class="space-y-4">
                  <div>
                    <h3 class="text-lg font-medium text-gray-900 dark:text-white">Left Icon</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-300">Icon appears on the left side of text</p>
                  </div>
                  
                  <div class="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
                    <div class="flex flex-wrap gap-4">
                      <Button 
                        leftIcon={
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                          </svg>
                        }
                      >
                        Add Item
                      </Button>
                      
                      <Button 
                        variant="secondary"
                        leftIcon={
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        }
                      >
                        Like
                      </Button>

                      <Button 
                        variant="outline"
                        leftIcon={
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                          </svg>
                        }
                      >
                        Download
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Right Icon */}
                <div class="space-y-4">
                  <div>
                    <h3 class="text-lg font-medium text-gray-900 dark:text-white">Right Icon</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-300">Icon appears on the right side of text</p>
                  </div>
                  
                  <div class="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
                    <div class="flex flex-wrap gap-4">
                      <Button 
                        rightIcon={
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                          </svg>
                        }
                      >
                        Next Step
                      </Button>
                      
                      <Button 
                        variant="secondary"
                        rightIcon={
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        }
                      >
                        Open Link
                      </Button>

                      <Button 
                        variant="ghost"
                        rightIcon={
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        }
                      >
                        Show More
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Icon sizes with button sizes */}
                <div class="space-y-4">
                  <div>
                    <h3 class="text-lg font-medium text-gray-900 dark:text-white">Icons with Different Button Sizes</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-300">Icons scale appropriately with button size</p>
                  </div>
                  
                  <div class="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
                    <div class="flex flex-wrap items-end gap-4">
                      {['sm', 'md', 'lg', 'xl'].map(size => (
                        <Button 
                          key={size}
                          size={size as any}
                          leftIcon={
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                            </svg>
                          }
                        >
                          {size.toUpperCase()}
                        </Button>
                      ))}
                    </div>
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
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Advanced Combinations</h2>
              
              <div class="space-y-8">
                {[
                  {
                    title: 'CTA Buttons',
                    description: 'Call-to-action buttons with different priorities',
                    buttons: [
                      { variant: 'primary' as const, size: 'lg' as const, leftIcon: true, text: 'Get Started' },
                      { variant: 'outline' as const, size: 'lg' as const, text: 'Learn More' }
                    ]
                  },
                  {
                    title: 'Loading States',
                    description: 'Buttons in loading state across variants',
                    buttons: [
                      { variant: 'primary' as const, loading: true, text: 'Saving...' },
                      { variant: 'secondary' as const, loading: true, text: 'Processing...' },
                      { variant: 'destructive' as const, loading: true, text: 'Deleting...' }
                    ]
                  },
                  {
                    title: 'Form Actions',
                    description: 'Typical form button combinations',
                    buttons: [
                      { variant: 'primary' as const, text: 'Submit' },
                      { variant: 'ghost' as const, text: 'Cancel' },
                      { variant: 'destructive' as const, size: 'sm' as const, text: 'Delete' }
                    ]
                  },
                  {
                    title: 'Navigation',
                    description: 'Navigation buttons with directional icons',
                    buttons: [
                      { variant: 'outline' as const, leftIcon: 'back', text: 'Previous' },
                      { variant: 'primary' as const, rightIcon: 'forward', text: 'Continue' },
                      { variant: 'ghost' as const, rightIcon: 'external', text: 'Skip' }
                    ]
                  }
                ].map(({ title, description, buttons }, groupIndex) => (
                  <div key={groupIndex} class="space-y-4">
                    <div>
                      <h3 class="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
                      <p class="text-sm text-gray-600 dark:text-gray-300">{description}</p>
                    </div>
                    
                    <div class="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
                      <div class="flex flex-wrap gap-4">
                        {buttons.map((btn, btnIndex) => {
                          const iconProps: any = {}
                          
                          if ('leftIcon' in btn && btn.leftIcon === true) {
                            iconProps.leftIcon = (
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                              </svg>
                            )
                          } else if ('leftIcon' in btn && btn.leftIcon === 'back') {
                            iconProps.leftIcon = (
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                              </svg>
                            )
                          }
                          
                          if ('rightIcon' in btn && btn.rightIcon === 'forward') {
                            iconProps.rightIcon = (
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                              </svg>
                            )
                          } else if ('rightIcon' in btn && btn.rightIcon === 'external') {
                            iconProps.rightIcon = (
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            )
                          }
                          
                          return (
                            <Button
                              key={btnIndex}
                              variant={btn.variant}
                              size={'size' in btn ? btn.size : undefined}
                              loading={'loading' in btn ? btn.loading : undefined}
                              onClick={handleClick}
                              {...iconProps}
                            >
                              {btn.text}
                            </Button>
                          )
                        })}
                      </div>
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
