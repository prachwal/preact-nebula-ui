import { route } from 'preact-router';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@/components';
import { BasicUsageSection, VariantsSection, SizesSection, InteractiveSection } from './sections';

interface PageProps {
  path?: string;
}

export function AlertPage(_props: PageProps) {
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
              <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Alert Component</h1>
              <p class="text-gray-600 dark:text-gray-300 mt-2">
                Contextual feedback messages for user actions with support for dismissal and custom actions
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
            <Tab value="variants">Variants</Tab>
            <Tab value="sizes">Sizes</Tab>
            <Tab value="interactive">Interactive</Tab>
          </TabList>

          <TabPanels>
            <TabPanel value="basic">
              <BasicUsageSection />
            </TabPanel>
            <TabPanel value="variants">
              <VariantsSection />
            </TabPanel>
            <TabPanel value="sizes">
              <SizesSection />
            </TabPanel>
            <TabPanel value="interactive">
              <InteractiveSection />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
}
