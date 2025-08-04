import {Tabs, TabList, Tab, TabPanels, TabPanel} from '../../../nebula/components/Tabs'
import {BasicUsageSection} from './sections/BasicUsageSection'
import {VariantsSection} from './sections/VariantsSection'
import {InteractiveSection} from './sections/InteractiveSection'
import {AccessibilitySection} from './sections/AccessibilitySection'

interface PageProps {
  path?: string
}

export function SwitchPage(_props: PageProps) {
  return (
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div class="container mx-auto px-4 py-8">
        {/* Header */}
        <div class="mb-8">
          <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Switch Component
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
            A toggle control for binary states with smooth animations, multiple sizes, 
            custom icons, and full accessibility support. Perfect for settings, preferences, 
            and on/off controls.
          </p>
        </div>

        {/* Features Grid */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div class="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div class="text-blue-600 dark:text-blue-400 font-semibold mb-2">
              🎛️ Multiple Sizes
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              Small, medium, and large sizes for different contexts
            </div>
          </div>
          
          <div class="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div class="text-green-600 dark:text-green-400 font-semibold mb-2">
              🎨 Color Variants
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              Primary, secondary, success, warning, and error colors
            </div>
          </div>
          
          <div class="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div class="text-purple-600 dark:text-purple-400 font-semibold mb-2">
              🎯 Custom Icons
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              Add custom icons for checked and unchecked states
            </div>
          </div>
          
          <div class="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div class="text-orange-600 dark:text-orange-400 font-semibold mb-2">
              ♿ Accessible
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              WCAG 2.1 AA compliant with full keyboard support
            </div>
          </div>
        </div>

        {/* Demo Tabs */}
        <Tabs defaultValue="basic" className="w-full">
          <TabList className="grid w-full grid-cols-4">
            <Tab value="basic">Basic Usage</Tab>
            <Tab value="variants">Variants</Tab>
            <Tab value="interactive">Interactive</Tab>
            <Tab value="accessibility">Accessibility</Tab>
          </TabList>

          <TabPanels className="mt-6">
            <TabPanel value="basic">
              <BasicUsageSection />
            </TabPanel>
            
            <TabPanel value="variants">
              <VariantsSection />
            </TabPanel>
            
            <TabPanel value="interactive">
              <InteractiveSection />
            </TabPanel>
            
            <TabPanel value="accessibility">
              <AccessibilitySection />
            </TabPanel>
          </TabPanels>
        </Tabs>

        {/* API Reference */}
        <div class="mt-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            API Reference
          </h2>
          
          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Switch Props
              </h3>
              <div class="overflow-x-auto">
                <table class="min-w-full text-sm">
                  <thead>
                    <tr class="border-b border-gray-200 dark:border-gray-700">
                      <th class="text-left py-2 px-3 font-medium text-gray-900 dark:text-gray-100">Prop</th>
                      <th class="text-left py-2 px-3 font-medium text-gray-900 dark:text-gray-100">Type</th>
                      <th class="text-left py-2 px-3 font-medium text-gray-900 dark:text-gray-100">Default</th>
                      <th class="text-left py-2 px-3 font-medium text-gray-900 dark:text-gray-100">Description</th>
                    </tr>
                  </thead>
                  <tbody class="text-gray-600 dark:text-gray-400">
                    <tr class="border-b border-gray-100 dark:border-gray-800">
                      <td class="py-2 px-3 font-mono">checked</td>
                      <td class="py-2 px-3">boolean</td>
                      <td class="py-2 px-3">undefined</td>
                      <td class="py-2 px-3">Whether the switch is checked/on (controlled mode)</td>
                    </tr>
                    <tr class="border-b border-gray-100 dark:border-gray-800">
                      <td class="py-2 px-3 font-mono">disabled</td>
                      <td class="py-2 px-3">boolean</td>
                      <td class="py-2 px-3">false</td>
                      <td class="py-2 px-3">Whether the switch is disabled</td>
                    </tr>
                    <tr class="border-b border-gray-100 dark:border-gray-800">
                      <td class="py-2 px-3 font-mono">size</td>
                      <td class="py-2 px-3">'sm' | 'md' | 'lg'</td>
                      <td class="py-2 px-3">'md'</td>
                      <td class="py-2 px-3">Size variant of the switch</td>
                    </tr>
                    <tr class="border-b border-gray-100 dark:border-gray-800">
                      <td class="py-2 px-3 font-mono">color</td>
                      <td class="py-2 px-3">'primary' | 'secondary' | 'success' | 'warning' | 'error'</td>
                      <td class="py-2 px-3">'primary'</td>
                      <td class="py-2 px-3">Color variant when checked</td>
                    </tr>
                    <tr class="border-b border-gray-100 dark:border-gray-800">
                      <td class="py-2 px-3 font-mono">label</td>
                      <td class="py-2 px-3">string</td>
                      <td class="py-2 px-3">-</td>
                      <td class="py-2 px-3">Label text for the switch</td>
                    </tr>
                    <tr class="border-b border-gray-100 dark:border-gray-800">
                      <td class="py-2 px-3 font-mono">description</td>
                      <td class="py-2 px-3">string</td>
                      <td class="py-2 px-3">-</td>
                      <td class="py-2 px-3">Additional description text</td>
                    </tr>
                    <tr class="border-b border-gray-100 dark:border-gray-800">
                      <td class="py-2 px-3 font-mono">labelPosition</td>
                      <td class="py-2 px-3">'left' | 'right'</td>
                      <td class="py-2 px-3">'right'</td>
                      <td class="py-2 px-3">Position of the label</td>
                    </tr>
                    <tr class="border-b border-gray-100 dark:border-gray-800">
                      <td class="py-2 px-3 font-mono">icons</td>
                      <td class="py-2 px-3">object</td>
                      <td class="py-2 px-3">-</td>
                      <td class="py-2 px-3">Custom icons for checked/unchecked states</td>
                    </tr>
                    <tr class="border-b border-gray-100 dark:border-gray-800">
                      <td class="py-2 px-3 font-mono">error</td>
                      <td class="py-2 px-3">boolean</td>
                      <td class="py-2 px-3">false</td>
                      <td class="py-2 px-3">Whether there's an error state</td>
                    </tr>
                    <tr class="border-b border-gray-100 dark:border-gray-800">
                      <td class="py-2 px-3 font-mono">errorMessage</td>
                      <td class="py-2 px-3">string</td>
                      <td class="py-2 px-3">-</td>
                      <td class="py-2 px-3">Error message to display</td>
                    </tr>
                    <tr class="border-b border-gray-100 dark:border-gray-800">
                      <td class="py-2 px-3 font-mono">onChange</td>
                      <td class="py-2 px-3">(checked: boolean, event: Event) =&gt; void</td>
                      <td class="py-2 px-3">-</td>
                      <td class="py-2 px-3">Callback fired when switch state changes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
