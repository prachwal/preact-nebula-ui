import { useState } from 'preact/hooks'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '../../../../nebula/components'

export function VariantsSection() {
  const [variantValue, setVariantValue] = useState('overview')

  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Variants
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Different visual styles for various use cases.
        </p>
      </div>
      
      <div className="space-y-8">
        {/* Line Variant */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Line Variant (Default)</h3>
          <Tabs value={variantValue} onChange={setVariantValue} variant="line">
            <TabList>
              <Tab value="overview">Overview</Tab>
              <Tab value="analytics">Analytics</Tab>
              <Tab value="settings">Settings</Tab>
            </TabList>
            <TabPanels>
              <TabPanel value="overview">
                <div className="p-4 text-gray-900 dark:text-gray-100">
                  Line variant with underline indicator.
                </div>
              </TabPanel>
              <TabPanel value="analytics">
                <div className="p-4 text-gray-900 dark:text-gray-100">
                  Analytics content with charts and metrics.
                </div>
              </TabPanel>
              <TabPanel value="settings">
                <div className="p-4 text-gray-900 dark:text-gray-100">
                  Settings and configuration options.
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>

        {/* Enclosed Variant */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Enclosed Variant</h3>
          <Tabs defaultValue="tab1" variant="enclosed">
            <TabList>
              <Tab value="tab1">Dashboard</Tab>
              <Tab value="tab2">Projects</Tab>
              <Tab value="tab3">Team</Tab>
            </TabList>
            <TabPanels>
              <TabPanel value="tab1">
                <div className="p-4 text-gray-900 dark:text-gray-100">
                  Enclosed variant with tab-like appearance.
                </div>
              </TabPanel>
              <TabPanel value="tab2">
                <div className="p-4 text-gray-900 dark:text-gray-100">
                  Project management interface.
                </div>
              </TabPanel>
              <TabPanel value="tab3">
                <div className="p-4 text-gray-900 dark:text-gray-100">
                  Team collaboration tools.
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>

        {/* Soft Rounded Variant */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Soft Rounded Variant</h3>
          <Tabs defaultValue="home" variant="soft-rounded">
            <TabList>
              <Tab value="home">Home</Tab>
              <Tab value="explore">Explore</Tab>
              <Tab value="notifications">Notifications</Tab>
              <Tab value="messages">Messages</Tab>
            </TabList>
            <TabPanels>
              <TabPanel value="home">
                <div className="p-4 text-gray-900 dark:text-gray-100">
                  Soft rounded variant with subtle background.
                </div>
              </TabPanel>
              <TabPanel value="explore">
                <div className="p-4 text-gray-900 dark:text-gray-100">
                  Explore new content and discover trends.
                </div>
              </TabPanel>
              <TabPanel value="notifications">
                <div className="p-4 text-gray-900 dark:text-gray-100">
                  Recent notifications and updates.
                </div>
              </TabPanel>
              <TabPanel value="messages">
                <div className="p-4 text-gray-900 dark:text-gray-100">
                  Private messages and conversations.
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
