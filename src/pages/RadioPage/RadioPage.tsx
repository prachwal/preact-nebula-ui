import { useState } from 'preact/hooks'
import { route } from 'preact-router'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@/components'
import { BasicUsageSection, VariantsSection, InteractiveSection, AccessibilitySection } from './sections'

interface PageProps {
  path?: string
}

export function RadioPage(_props: PageProps) {
  const [activeTab, setActiveTab] = useState('basic')

  const tabs = [
    { id: 'basic', label: 'Basic Usage', component: BasicUsageSection },
    { id: 'variants', label: 'Variants & Styles', component: VariantsSection },
    { id: 'interactive', label: 'Interactive Examples', component: InteractiveSection },
    { id: 'accessibility', label: 'Accessibility', component: AccessibilitySection }
  ]

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
              <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Radio & RadioGroup</h1>
              <p class="text-gray-600 dark:text-gray-300 mt-2">
                Radio buttons for mutually exclusive selections with advanced group management and accessibility features
              </p>
            </div>
            <div class="hidden lg:block">
              <div class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <div class="flex items-center">
                  <div class="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  Controlled & Uncontrolled
                </div>
                <div class="flex items-center">
                  <div class="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                  Keyboard Navigation
                </div>
                <div class="flex items-center">
                  <div class="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                  WCAG 2.1 AA
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onChange={setActiveTab}>
          <TabList className="mb-8">
            {tabs.map(tab => (
              <Tab key={tab.id} value={tab.id}>
                {tab.label}
              </Tab>
            ))}
          </TabList>
          
          <TabPanels>
            {tabs.map(tab => {
              const Component = tab.component
              return (
                <TabPanel key={tab.id} value={tab.id}>
                  <Component />
                </TabPanel>
              )
            })}
          </TabPanels>
        </Tabs>
      </div>
    </div>
  )
}
