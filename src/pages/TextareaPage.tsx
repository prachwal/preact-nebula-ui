import { useState } from 'preact/hooks'
import { Textarea } from '@/components'
import { route } from 'preact-router'

interface PageProps {
  path?: string
}

export function TextareaPage(_props: PageProps) {
  const [activeDemo, setActiveDemo] = useState<'variants' | 'sizes' | 'states' | 'features' | 'examples'>('variants')
  const [textValue, setTextValue] = useState('')
  const [resizeValue, setResizeValue] = useState('This is a textarea with auto-resize functionality. Try typing more text to see it expand automatically!')

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
              <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Textarea Component</h1>
              <p class="text-gray-600 dark:text-gray-300 mt-2">
                Multi-line text input with auto-resize, character counting, and validation support
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div class="flex space-x-1 mt-6 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
            {[
              { key: 'variants', label: 'Style Variants' },
              { key: 'sizes', label: 'Size Options' },
              { key: 'states', label: 'States & Validation' },
              { key: 'features', label: 'Features' },
              { key: 'examples', label: 'Usage Examples' }
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
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Textarea Variants</h2>
              <p class="text-gray-600 dark:text-gray-300 mb-8">
                Different visual styles to match your form design requirements.
              </p>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { variant: 'default' as const, description: 'Standard textarea with clean borders' },
                  { variant: 'error' as const, description: 'Error state with red styling' },
                  { variant: 'success' as const, description: 'Success state with green styling' }
                ].map(({ variant, description }) => (
                  <div key={variant} class="space-y-4">
                    <div>
                      <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                        variant="{variant}"
                      </h3>
                      <p class="text-sm text-gray-600 dark:text-gray-300">{description}</p>
                    </div>
                    
                    <div class="space-y-2">
                      <Textarea 
                        variant={variant}
                        placeholder={`${variant} textarea placeholder...`}
                        rows={3}
                      />
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
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Textarea Sizes</h2>
              <p class="text-gray-600 dark:text-gray-300 mb-8">
                Three size variants to match different UI contexts and hierarchy.
              </p>

              <div class="space-y-8">
                {[
                  { size: 'sm' as const, description: 'Small textarea for compact forms', rows: 2 },
                  { size: 'md' as const, description: 'Medium textarea (default)', rows: 3 },
                  { size: 'lg' as const, description: 'Large textarea for detailed input', rows: 4 }
                ].map(({ size, description, rows }) => (
                  <div key={size} class="space-y-4">
                    <div>
                      <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                        size="{size}"
                      </h3>
                      <p class="text-sm text-gray-600 dark:text-gray-300">{description}</p>
                    </div>
                    
                    <div class="max-w-md">
                      <Textarea 
                        size={size}
                        placeholder={`${size} textarea placeholder...`}
                        rows={rows}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Size Comparison */}
              <div class="mt-12 bg-gray-100 dark:bg-gray-700 p-8 rounded-lg">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-6 text-center">Size Comparison</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div class="space-y-2">
                    <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Small</label>
                    <Textarea size="sm" placeholder="Small textarea" rows={2} />
                  </div>
                  <div class="space-y-2">
                    <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Medium</label>
                    <Textarea size="md" placeholder="Medium textarea" rows={3} />
                  </div>
                  <div class="space-y-2">
                    <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Large</label>
                    <Textarea size="lg" placeholder="Large textarea" rows={4} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* States Demo */}
        {activeDemo === 'states' && (
          <div class="space-y-8">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">States & Validation</h2>
              <p class="text-gray-600 dark:text-gray-300 mb-8">
                Different states for user interaction feedback and form validation.
              </p>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Basic States */}
                <div class="space-y-6">
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">Basic States</h3>
                  
                  <div class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Default State
                      </label>
                      <Textarea placeholder="Enter your message..." rows={3} />
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Disabled State
                      </label>
                      <Textarea 
                        placeholder="Disabled textarea..." 
                        disabled 
                        rows={3}
                        value="This textarea is disabled"
                      />
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Read Only
                      </label>
                      <Textarea 
                        readOnly 
                        rows={3}
                        value="This is read-only content that cannot be edited by the user."
                      />
                    </div>
                  </div>
                </div>

                {/* Validation States */}
                <div class="space-y-6">
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">Validation States</h3>
                  
                  <div class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Success State
                      </label>
                      <Textarea 
                        placeholder="Success validation..." 
                        rows={3}
                        className="border-green-500 focus:border-green-500 focus:ring-green-500"
                        value="Valid content that meets requirements."
                      />
                      <p class="text-sm text-green-600 dark:text-green-400 mt-1">✓ Content is valid</p>
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Error State
                      </label>
                      <Textarea 
                        placeholder="Error validation..." 
                        rows={3}
                        className="border-red-500 focus:border-red-500 focus:ring-red-500"
                        value="Invalid content"
                      />
                      <p class="text-sm text-red-600 dark:text-red-400 mt-1">✗ Content is too short (minimum 20 characters)</p>
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Warning State
                      </label>
                      <Textarea 
                        placeholder="Warning validation..." 
                        rows={3}
                        className="border-yellow-500 focus:border-yellow-500 focus:ring-yellow-500"
                        value="This content might need review."
                      />
                      <p class="text-sm text-yellow-600 dark:text-yellow-400 mt-1">⚠ Content may contain sensitive information</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Features Demo */}
        {activeDemo === 'features' && (
          <div class="space-y-8">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Advanced Features</h2>
              
              <div class="space-y-8">
                {/* Auto-resize */}
                <div class="space-y-4">
                  <div>
                    <h3 class="text-lg font-medium text-gray-900 dark:text-white">Auto-resize</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-300">Textarea expands automatically as content grows</p>
                  </div>
                  
                  <div class="max-w-md">
                    <Textarea 
                      placeholder="Start typing to see auto-resize in action..."
                      value={resizeValue}
                      onInput={(e) => setResizeValue((e.target as HTMLTextAreaElement).value)}
                      rows={2}
                      className="resize-none"
                    />
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Character count: {resizeValue.length}
                    </p>
                  </div>
                </div>

                {/* Character Counting */}
                <div class="space-y-4">
                  <div>
                    <h3 class="text-lg font-medium text-gray-900 dark:text-white">Character Counting</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-300">Built-in character counting with max limits</p>
                  </div>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        With Character Limit (100)
                      </label>
                      <div class="relative">
                        <Textarea 
                          placeholder="Type your message (max 100 characters)..."
                          value={textValue}
                          onInput={(e) => {
                            const value = (e.target as HTMLTextAreaElement).value
                            if (value.length <= 100) {
                              setTextValue(value)
                            }
                          }}
                          rows={3}
                          className={textValue.length >= 90 ? (textValue.length >= 100 ? 'border-red-500 focus:border-red-500' : 'border-yellow-500 focus:border-yellow-500') : ''}
                        />
                        <div class="flex justify-between items-center mt-1">
                          <p class={`text-xs ${
                            textValue.length >= 100 ? 'text-red-600 dark:text-red-400' :
                            textValue.length >= 90 ? 'text-yellow-600 dark:text-yellow-400' :
                            'text-gray-500 dark:text-gray-400'
                          }`}>
                            {textValue.length >= 100 ? '✗ Character limit reached' :
                             textValue.length >= 90 ? '⚠ Approaching limit' :
                             'Characters remaining'}
                          </p>
                          <span class={`text-xs font-mono ${
                            textValue.length >= 100 ? 'text-red-600 dark:text-red-400' :
                            textValue.length >= 90 ? 'text-yellow-600 dark:text-yellow-400' :
                            'text-gray-500 dark:text-gray-400'
                          }`}>
                            {textValue.length}/100
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Word Count Example
                      </label>
                      <Textarea 
                        placeholder="Type to see word count..."
                        rows={3}
                        value={resizeValue}
                        onInput={(e) => setResizeValue((e.target as HTMLTextAreaElement).value)}
                      />
                      <div class="flex justify-between items-center mt-1">
                        <p class="text-xs text-gray-500 dark:text-gray-400">
                          Words: {resizeValue.trim() ? resizeValue.trim().split(/\s+/).length : 0}
                        </p>
                        <span class="text-xs font-mono text-gray-500 dark:text-gray-400">
                          {resizeValue.length} chars
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Row Configuration */}
                <div class="space-y-4">
                  <div>
                    <h3 class="text-lg font-medium text-gray-900 dark:text-white">Row Configuration</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-300">Control initial height with row settings</p>
                  </div>
                  
                  <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[2, 4, 6, 8].map(rows => (
                      <div key={rows}>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          rows={rows}
                        </label>
                        <Textarea 
                          rows={rows}
                          placeholder={`Textarea with ${rows} rows...`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Examples Demo */}
        {activeDemo === 'examples' && (
          <div class="space-y-8">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Real-world Examples</h2>
              
              <div class="space-y-12">
                {/* Contact Form */}
                <div class="space-y-4">
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">Contact Form</h3>
                  <div class="max-w-md bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                    <div class="space-y-4">
                      <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Message *
                        </label>
                        <Textarea 
                          placeholder="Tell us how we can help you..."
                          rows={4}
                          required
                        />
                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Please provide as much detail as possible
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comment System */}
                <div class="space-y-4">
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">Comment System</h3>
                  <div class="max-w-2xl">
                    <div class="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                      <Textarea 
                        placeholder="Write a comment..."
                        rows={3}
                        className="resize-none border-none bg-transparent"
                      />
                      <div class="flex justify-between items-center mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                        <div class="text-xs text-gray-500 dark:text-gray-400">
                          Markdown supported
                        </div>
                        <div class="flex gap-2">
                          <button class="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                            Cancel
                          </button>
                          <button class="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                            Comment
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Feedback Form */}
                <div class="space-y-4">
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">Feedback Form</h3>
                  <div class="max-w-lg bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                    <div class="space-y-4">
                      <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          What did you think of our product?
                        </label>
                        <Textarea 
                          placeholder="Share your thoughts, suggestions, or report issues..."
                          rows={4}
                          className="bg-gray-100 dark:bg-gray-600"
                        />
                      </div>
                      
                      <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          How can we improve?
                        </label>
                        <Textarea 
                          placeholder="Any specific features or changes you'd like to see?"
                          rows={3}
                          className="bg-gray-100 dark:bg-gray-600"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Code Input */}
                <div class="space-y-4">
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">Code Input</h3>
                  <div class="max-w-2xl">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      CSS Code
                    </label>
                    <Textarea 
                      placeholder="/* Enter your CSS code here */&#10;.example {&#10;  color: #333;&#10;  background: #fff;&#10;}"
                      rows={8}
                      className="font-mono text-sm"
                      value=".button {
  padding: 12px 24px;
  border-radius: 6px;
  border: none;
  background: #3b82f6;
  color: white;
  cursor: pointer;
}"
                    />
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
