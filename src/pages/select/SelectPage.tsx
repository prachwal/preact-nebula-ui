import { Tabs, TabList, Tab, TabPanels, TabPanel } from '../../../nebula/components'
import { BasicUsageSection, VariantsSection, InteractiveSection, AccessibilitySection } from './sections'

interface PageProps {
  path?: string
}

export function SelectPage(_props: PageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Select Component
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
          A flexible dropdown component that allows users to choose from a list of options. 
          Supports single and multiple selection, search functionality, custom options with icons, 
          and comprehensive accessibility features.
        </p>
      </div>

      {/* Navigation Tabs */}
      <Tabs defaultValue="basic" className="w-full">
        <TabList className="grid w-full grid-cols-4">
          <Tab value="basic">Basic Usage</Tab>
          <Tab value="variants">Variants</Tab>
          <Tab value="interactive">Interactive</Tab>
          <Tab value="accessibility">Accessibility</Tab>
        </TabList>

        <TabPanels className="mt-6">
          <TabPanel value="basic" className="min-h-[600px]">
            <BasicUsageSection />
          </TabPanel>
          
          <TabPanel value="variants" className="min-h-[600px]">
            <VariantsSection />
          </TabPanel>
          
          <TabPanel value="interactive" className="min-h-[600px]">
            <InteractiveSection />
          </TabPanel>
          
          <TabPanel value="accessibility" className="min-h-[600px]">
            <AccessibilitySection />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}
