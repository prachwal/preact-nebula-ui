import { route } from 'preact-router'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@/components'
import { SizesSection, ColorsSection, UsageSection, AccessibilitySection } from './sections'

interface PageProps {
  path?: string
}

export function SpinnerPage(_props: PageProps) {
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
              <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Spinner Component</h1>
              <p class="text-gray-600 dark:text-gray-300 mt-2">
                Loading indicator with customizable sizes and colors for better user feedback
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="sizes">
          <TabList>
            <Tab value="sizes">Size Variants</Tab>
            <Tab value="colors">Color Options</Tab>
            <Tab value="usage">Usage Examples</Tab>
            <Tab value="accessibility">Accessibility</Tab>
          </TabList>

          <TabPanels>
            <TabPanel value="sizes">
              <SizesSection />
            </TabPanel>
            <TabPanel value="colors">
              <ColorsSection />
            </TabPanel>
            <TabPanel value="usage">
              <UsageSection />
            </TabPanel>
            <TabPanel value="accessibility">
              <AccessibilitySection />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  )
}
