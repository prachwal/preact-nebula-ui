import {useState} from 'preact/hooks'
import {Switch} from '../../../../nebula/components/Switch'

export function AccessibilitySection() {
  const [keyboardDemo, setKeyboardDemo] = useState(false)
  const [screenReaderDemo, setScreenReaderDemo] = useState(true)
  const [formDemo, setFormDemo] = useState({
    terms: false,
    privacy: false,
    marketing: false
  })

  const handleFormChange = (key: string, value: boolean) => {
    setFormDemo(prev => ({ ...prev, [key]: value }))
  }

  const allRequired = formDemo.terms && formDemo.privacy

  return (
    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
          Accessibility Features
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          WCAG 2.1 AA compliant switches with full keyboard and screen reader support
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Keyboard Navigation */}
        <div class="space-y-4">
          <h4 class="font-medium text-gray-900 dark:text-gray-100">
            Keyboard Navigation
          </h4>
          <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div class="space-y-4">
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Use <kbd class="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs font-mono">Tab</kbd> to focus, 
                <kbd class="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs font-mono">Space</kbd> or 
                <kbd class="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs font-mono">Enter</kbd> to toggle
              </p>
              
              <Switch
                label="Keyboard accessible switch"
                description="Try using Tab to focus and Space to toggle"
                checked={keyboardDemo}
                onChange={(checked: boolean) => setKeyboardDemo(checked)}
              />
              
              <Switch
                label="Another focusable switch"
                description="Navigate between switches using Tab/Shift+Tab"
                checked={!keyboardDemo}
                onChange={(checked: boolean) => setKeyboardDemo(!checked)}
              />
              
              <div class="text-sm p-3 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
                <div class="font-medium text-blue-900 dark:text-blue-100">
                  Keyboard Status:
                </div>
                <div class="text-blue-700 dark:text-blue-300">
                  Demo switch is currently {keyboardDemo ? 'ON' : 'OFF'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Screen Reader Support */}
        <div class="space-y-4">
          <h4 class="font-medium text-gray-900 dark:text-gray-100">
            Screen Reader Support
          </h4>
          <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div class="space-y-4">
              <p class="text-sm text-gray-600 dark:text-gray-400">
                All switches include proper ARIA attributes and semantic markup
              </p>
              
              <Switch
                label="Screen reader optimized"
                description="Announces state changes and descriptions clearly"
                checked={screenReaderDemo}
                onChange={(checked: boolean) => setScreenReaderDemo(checked)}
              />
              
              <Switch
                label="ARIA labeled switch"
                description="Includes aria-describedby for additional context"
                checked={!screenReaderDemo}
                onChange={(checked: boolean) => setScreenReaderDemo(!checked)}
                name="aria-demo"
              />
              
              <div class="text-xs space-y-2 p-3 bg-gray-50 dark:bg-gray-700 rounded font-mono">
                <div class="font-semibold text-gray-900 dark:text-gray-100">ARIA Attributes:</div>
                <div class="text-gray-600 dark:text-gray-400">role="button"</div>
                <div class="text-gray-600 dark:text-gray-400">aria-checked="{screenReaderDemo ? 'true' : 'false'}"</div>
                <div class="text-gray-600 dark:text-gray-400">aria-describedby="switch-aria-demo-description"</div>
                <div class="text-gray-600 dark:text-gray-400">tabindex="0"</div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Integration */}
        <div class="space-y-4">
          <h4 class="font-medium text-gray-900 dark:text-gray-100">
            Form Integration & Validation
          </h4>
          <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <form class="space-y-4">
              <fieldset class="space-y-3">
                <legend class="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
                  Agreement Form
                </legend>
                
                <Switch
                  name="terms"
                  label="I agree to the terms and conditions"
                  description="Required to proceed with registration"
                  checked={formDemo.terms}
                  onChange={(checked: boolean) => handleFormChange('terms', checked)}
                  error={!formDemo.terms}
                  errorMessage={!formDemo.terms ? "You must agree to the terms" : undefined}
                />
                
                <Switch
                  name="privacy"
                  label="I accept the privacy policy"
                  description="Required for data processing"
                  checked={formDemo.privacy}
                  onChange={(checked: boolean) => handleFormChange('privacy', checked)}
                  error={!formDemo.privacy}
                  errorMessage={!formDemo.privacy ? "Privacy policy acceptance is required" : undefined}
                />
                
                <Switch
                  name="marketing"
                  label="I want to receive marketing emails"
                  description="Optional - you can change this later"
                  checked={formDemo.marketing}
                  onChange={(checked: boolean) => handleFormChange('marketing', checked)}
                />
              </fieldset>
              
              <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  disabled={!allRequired}
                  class={`px-4 py-2 rounded font-medium transition-colors ${
                    allRequired
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-600'
                  }`}
                >
                  {allRequired ? 'Submit Form' : 'Complete Required Fields'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Focus Management */}
        <div class="space-y-4">
          <h4 class="font-medium text-gray-900 dark:text-gray-100">
            Focus Management
          </h4>
          <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div class="space-y-4">
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Clear focus indicators and logical tab order
              </p>
              
              <div class="space-y-3">
                <Switch
                  label="First switch"
                  description="Tab order: 1"
                />
                
                <Switch
                  label="Second switch"
                  description="Tab order: 2"
                  disabled
                />
                
                <Switch
                  label="Third switch"
                  description="Tab order: 3 (skips disabled)"
                />
              </div>
              
              <div class="text-sm p-3 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
                <div class="font-medium text-green-900 dark:text-green-100">
                  ✓ WCAG 2.1 AA Compliant Features:
                </div>
                <ul class="list-disc list-inside text-green-700 dark:text-green-300 mt-1 space-y-1">
                  <li>4.5:1 minimum color contrast ratio</li>
                  <li>Keyboard navigation support</li>
                  <li>Screen reader compatibility</li>
                  <li>Focus indicators</li>
                  <li>Semantic HTML structure</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
