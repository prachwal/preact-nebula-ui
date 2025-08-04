import { useState } from 'preact/hooks'
import { Radio, RadioGroup } from '../../../../nebula/components/Radio'

export function AccessibilitySection() {
  const [ariaValue, setAriaValue] = useState<string>('')
  const [keyboardValue, setKeyboardValue] = useState<string>('option1')

  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Accessibility Features</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8">
          Radio components are built with accessibility in mind, supporting screen readers, keyboard navigation, and WCAG 2.1 AA compliance.
        </p>

        <div class="space-y-12">
          {/* ARIA Attributes Demo */}
          <div class="space-y-6">
            <h3 class="text-xl font-medium text-gray-900 dark:text-white">ARIA Attributes & Screen Reader Support</h3>
            <p class="text-gray-600 dark:text-gray-300">
              Radio components include proper ARIA labels, descriptions, and roles for screen reader compatibility.
            </p>

            <div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <RadioGroup
                name="aria-demo"
                label="Accessibility Options"
                description="This radio group demonstrates proper ARIA implementation"
                value={ariaValue}
                onChange={setAriaValue}
                aria-required="true"
              >
                <Radio 
                  value="screen-reader" 
                  label="Screen Reader Optimized" 
                  description="Includes comprehensive ARIA labels and descriptions for screen readers"
                />
                <Radio 
                  value="keyboard-nav" 
                  label="Keyboard Navigation" 
                  description="Full keyboard support with arrow keys, space, and tab navigation"
                />
                <Radio 
                  value="focus-management" 
                  label="Focus Management" 
                  description="Proper focus indicators and management for users with visual impairments"
                />
                <Radio 
                  value="wcag-compliant" 
                  label="WCAG 2.1 AA Compliant" 
                  description="Meets Web Content Accessibility Guidelines for contrast and interaction"
                />
              </RadioGroup>

              {ariaValue && (
                <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded border-l-4 border-blue-400">
                  <h4 class="font-medium text-blue-900 dark:text-blue-100">ARIA Attributes for "{ariaValue}":</h4>
                  <ul class="mt-2 text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    <li><code>role="radio"</code> - Identifies the element as a radio button</li>
                    <li><code>aria-checked="{ariaValue === 'screen-reader' ? 'true' : 'false'}"</code> - Indicates checked state</li>
                    <li><code>aria-describedby</code> - Links to description text</li>
                    <li><code>aria-labelledby</code> - Links to group label</li>
                    <li><code>aria-invalid="false"</code> - Indicates validation state</li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Keyboard Navigation Demo */}
          <div class="space-y-6">
            <h3 class="text-xl font-medium text-gray-900 dark:text-white">Keyboard Navigation</h3>
            <p class="text-gray-600 dark:text-gray-300">
              Radio groups support full keyboard navigation with arrow keys, space bar, and tab order.
            </p>

            <div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <div class="mb-6">
                <h4 class="font-medium text-gray-900 dark:text-white mb-3">Keyboard Controls:</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div class="flex items-center space-x-3">
                    <kbd class="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded text-xs font-mono">Tab</kbd>
                    <span class="text-gray-600 dark:text-gray-300">Move between radio groups</span>
                  </div>
                  <div class="flex items-center space-x-3">
                    <kbd class="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded text-xs font-mono">↑ ↓</kbd>
                    <span class="text-gray-600 dark:text-gray-300">Navigate within vertical groups</span>
                  </div>
                  <div class="flex items-center space-x-3">
                    <kbd class="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded text-xs font-mono">← →</kbd>
                    <span class="text-gray-600 dark:text-gray-300">Navigate within horizontal groups</span>
                  </div>
                  <div class="flex items-center space-x-3">
                    <kbd class="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded text-xs font-mono">Space</kbd>
                    <span class="text-gray-600 dark:text-gray-300">Select focused radio option</span>
                  </div>
                  <div class="flex items-center space-x-3">
                    <kbd class="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded text-xs font-mono">Home</kbd>
                    <span class="text-gray-600 dark:text-gray-300">Move to first option</span>
                  </div>
                  <div class="flex items-center space-x-3">
                    <kbd class="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded text-xs font-mono">End</kbd>
                    <span class="text-gray-600 dark:text-gray-300">Move to last option</span>
                  </div>
                </div>
              </div>

              <RadioGroup
                name="keyboard-demo"
                label="Try keyboard navigation"
                description="Focus this group and use arrow keys to navigate between options"
                value={keyboardValue}
                onChange={setKeyboardValue}
              >
                <Radio value="option1" label="First Option" description="Use arrow keys to navigate" />
                <Radio value="option2" label="Second Option" description="Arrow keys wrap around at boundaries" />
                <Radio value="option3" label="Third Option" description="Space bar selects the focused option" />
                <Radio value="option4" label="Fourth Option" description="Tab moves to next form element" />
              </RadioGroup>

              <div class="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded border-l-4 border-green-400">
                <p class="text-sm text-green-800 dark:text-green-200">
                  Currently selected: <strong>{keyboardValue}</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Error States & Validation */}
          <div class="space-y-6">
            <h3 class="text-xl font-medium text-gray-900 dark:text-white">Error States & Validation</h3>
            <p class="text-gray-600 dark:text-gray-300">
              Accessible error handling with proper ARIA live regions and invalid states.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="space-y-4">
                <h4 class="text-lg font-medium text-gray-900 dark:text-white">Valid State</h4>
                <div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <RadioGroup
                    name="valid-demo"
                    label="Required Selection"
                    description="This field is properly filled"
                    value="selected"
                    error={false}
                  >
                    <Radio value="selected" label="Selected Option" description="This option is selected" />
                    <Radio value="other" label="Other Option" description="Alternative choice" />
                  </RadioGroup>
                </div>
              </div>

              <div class="space-y-4">
                <h4 class="text-lg font-medium text-gray-900 dark:text-white">Error State</h4>
                <div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <RadioGroup
                    name="error-demo"
                    label="Required Selection"
                    description="Please make a selection"
                    error={true}
                    errorMessage="This field is required and must be selected"
                  >
                    <Radio value="option1" label="Option One" description="First choice" />
                    <Radio value="option2" label="Option Two" description="Second choice" />
                  </RadioGroup>
                </div>
              </div>
            </div>
          </div>

          {/* Disabled States */}
          <div class="space-y-6">
            <h3 class="text-xl font-medium text-gray-900 dark:text-white">Disabled States</h3>
            <p class="text-gray-600 dark:text-gray-300">
              Proper handling of disabled states with appropriate ARIA attributes and visual indicators.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="space-y-4">
                <h4 class="text-lg font-medium text-gray-900 dark:text-white">Individual Disabled Items</h4>
                <div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <RadioGroup name="individual-disabled" label="Mixed State Options">
                    <Radio value="available" label="Available Option" description="This option can be selected" />
                    <Radio value="disabled1" label="Disabled Option" description="This option is not available" disabled />
                    <Radio value="available2" label="Another Available" description="This option is selectable" />
                    <Radio value="disabled2" label="Also Disabled" description="This is also unavailable" disabled />
                  </RadioGroup>
                </div>
              </div>

              <div class="space-y-4">
                <h4 class="text-lg font-medium text-gray-900 dark:text-white">Entire Group Disabled</h4>
                <div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <RadioGroup name="group-disabled" label="Disabled Group" disabled>
                    <Radio value="option1" label="First Option" description="Group is disabled" />
                    <Radio value="option2" label="Second Option" description="All options disabled" />
                    <Radio value="option3" label="Third Option" description="Cannot be selected" />
                  </RadioGroup>
                </div>
              </div>
            </div>
          </div>

          {/* High Contrast Mode */}
          <div class="space-y-6">
            <h3 class="text-xl font-medium text-gray-900 dark:text-white">High Contrast & Visual Accessibility</h3>
            <p class="text-gray-600 dark:text-gray-300">
              Radio components maintain visibility and usability in high contrast modes and for users with visual impairments.
            </p>

            <div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 class="font-medium text-gray-900 dark:text-white mb-4">Color Contrast Features:</h4>
                  <ul class="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                    <li class="flex items-start">
                      <svg class="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                      WCAG AA compliant color contrast ratios (4.5:1 minimum)
                    </li>
                    <li class="flex items-start">
                      <svg class="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                      Clear focus indicators with sufficient contrast
                    </li>
                    <li class="flex items-start">
                      <svg class="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                      Visual state changes that don't rely solely on color
                    </li>
                    <li class="flex items-start">
                      <svg class="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                      Scalable text and touch targets (minimum 44px)
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 class="font-medium text-gray-900 dark:text-white mb-4">Example High Contrast:</h4>
                  <RadioGroup name="high-contrast" label="High Contrast Example" size="lg">
                    <Radio value="option1" label="High Contrast Option 1" description="Clear visual distinction" />
                    <Radio value="option2" label="High Contrast Option 2" description="Enhanced readability" />
                  </RadioGroup>
                </div>
              </div>
            </div>
          </div>

          {/* Testing with Screen Readers */}
          <div class="space-y-6">
            <h3 class="text-xl font-medium text-gray-900 dark:text-white">Screen Reader Testing</h3>
            <p class="text-gray-600 dark:text-gray-300">
              These components have been tested with popular screen readers for optimal accessibility.
            </p>

            <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
              <h4 class="font-medium text-blue-900 dark:text-blue-100 mb-3">Screen Reader Compatibility:</h4>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div class="flex items-center space-x-2">
                  <svg class="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-blue-800 dark:text-blue-200">NVDA (Windows)</span>
                </div>
                <div class="flex items-center space-x-2">
                  <svg class="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-blue-800 dark:text-blue-200">JAWS (Windows)</span>
                </div>
                <div class="flex items-center space-x-2">
                  <svg class="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-blue-800 dark:text-blue-200">VoiceOver (macOS/iOS)</span>
                </div>
                <div class="flex items-center space-x-2">
                  <svg class="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-blue-800 dark:text-blue-200">TalkBack (Android)</span>
                </div>
                <div class="flex items-center space-x-2">
                  <svg class="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-blue-800 dark:text-blue-200">Orca (Linux)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
