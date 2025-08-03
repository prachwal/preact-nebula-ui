import { route } from 'preact-router'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@/components'
import { BasicSection, RequiredSection, SizingSection, ExamplesSection } from './sections'

interface PageProps {
  path?: string
}

export function LabelPage(_props: PageProps) {
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
              <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Label Component</h1>
              <p class="text-gray-600 dark:text-gray-300 mt-2">
                Form labels with required indicators and proper accessibility support
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="basic">
          <TabList>
            <Tab value="basic">Basic Usage</Tab>
            <Tab value="required">Required Indicators</Tab>
            <Tab value="sizing">Size Variants</Tab>
            <Tab value="examples">Form Examples</Tab>
          </TabList>

          <TabPanels>
            <TabPanel value="basic">
              <BasicSection />
            </TabPanel>
            <TabPanel value="required">
              <RequiredSection />
            </TabPanel>
            <TabPanel value="sizing">
              <SizingSection />
            </TabPanel>
            <TabPanel value="examples">
              <ExamplesSection />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  )
}
