import { useState } from 'preact/hooks'
import { Radio, RadioGroup } from '../../../../nebula/components/Radio'

export function BasicUsageSection() {
  const [selectedValue, setSelectedValue] = useState<string>('option1')

  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Basic Usage</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8">
          Radio buttons allow users to select a single option from a set of mutually exclusive choices.
        </p>

        <div class="space-y-8">
          {/* Single Radio Button */}
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Single Radio Button</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Individual radio buttons with labels and descriptions
            </p>
            
            <div class="space-y-4 bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <Radio value="simple" label="Simple radio button" />
              <Radio value="checked" label="Pre-checked radio" checked />
              <Radio value="with-desc" label="Radio with description" description="Additional information about this option" />
              <Radio value="disabled" label="Disabled radio" disabled />
            </div>
          </div>

          {/* Radio Group - Basic */}
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Radio Group</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Grouped radio buttons for mutually exclusive selections
            </p>
            
            <div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <RadioGroup 
                name="basic-group" 
                label="Choose your preferred option"
                description="Select one option from the choices below"
                value={selectedValue}
                onChange={(value: string) => setSelectedValue(value)}
              >
                <Radio value="option1" label="First Option" description="This is the first choice" />
                <Radio value="option2" label="Second Option" description="This is the second choice" />
                <Radio value="option3" label="Third Option" description="This is the third choice" />
              </RadioGroup>
              
              <div class="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded border-l-4 border-blue-400">
                <p class="text-sm text-blue-800 dark:text-blue-200">
                  Selected value: <strong>{selectedValue || 'None'}</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Uncontrolled Radio Group */}
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Uncontrolled Radio Group</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Radio group with default value, managed internally
            </p>
            
            <div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <RadioGroup 
                name="uncontrolled-group" 
                label="Choose your favorite color"
                defaultValue="blue"
                onChange={(value) => console.log('Selected:', value)}
              >
                <Radio value="red" label="Red" />
                <Radio value="blue" label="Blue" />
                <Radio value="green" label="Green" />
                <Radio value="yellow" label="Yellow" />
              </RadioGroup>
            </div>
          </div>

          {/* Custom Content */}
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Custom Content</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Radio buttons with custom content instead of simple labels
            </p>
            
            <div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <RadioGroup name="custom-content" label="Choose a plan">
                <Radio value="basic">
                  <div class="flex items-center space-x-3">
                    <div class="flex-shrink-0">
                      <div class="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                        <svg class="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <p class="font-medium text-gray-900 dark:text-white">Basic Plan</p>
                      <p class="text-sm text-gray-500 dark:text-gray-400">$9/month - Essential features</p>
                    </div>
                  </div>
                </Radio>
                
                <Radio value="pro">
                  <div class="flex items-center space-x-3">
                    <div class="flex-shrink-0">
                      <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <svg class="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <p class="font-medium text-gray-900 dark:text-white">Pro Plan</p>
                      <p class="text-sm text-gray-500 dark:text-gray-400">$29/month - Advanced features</p>
                    </div>
                  </div>
                </Radio>
                
                <Radio value="enterprise">
                  <div class="flex items-center space-x-3">
                    <div class="flex-shrink-0">
                      <div class="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                        <svg class="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-6m-2-5.5V9m0 4.5h4" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <p class="font-medium text-gray-900 dark:text-white">Enterprise Plan</p>
                      <p class="text-sm text-gray-500 dark:text-gray-400">$99/month - All features + support</p>
                    </div>
                  </div>
                </Radio>
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
