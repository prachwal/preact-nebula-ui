import { route } from 'preact-router'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@/components'
import { DocumentationTab } from '../../components/DocumentationTab'
import { BasicSection, TypesSection, IntegrationSection, ExamplesSection, PropsDocumentation } from './sections'

interface PageProps {
  path?: string
}

export function FieldErrorPage(_props: PageProps) {
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
              <h1 class="text-3xl font-bold text-gray-900 dark:text-white">FieldError Component</h1>
              <p class="text-gray-600 dark:text-gray-300 mt-2">
                Error message display for forms with consistent styling and accessibility support
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
            <Tab value="types">Error Types</Tab>
            <Tab value="integration">Form Integration</Tab>
            <Tab value="examples">Real Examples</Tab>
            <Tab value="props">Props</Tab>
            <Tab value="documentation">Documentation</Tab>
          </TabList>

          <TabPanels>
            <TabPanel value="basic">
              <BasicSection />
            </TabPanel>
            <TabPanel value="types">
              <TypesSection />
            </TabPanel>
            <TabPanel value="integration">
              <IntegrationSection />
            </TabPanel>
            <TabPanel value="examples">
              <ExamplesSection />
            </TabPanel>
            <TabPanel value="props">
              <PropsDocumentation />
            </TabPanel>
            <TabPanel value="documentation">
              <DocumentationTab componentName="fielderror" />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  )
}
