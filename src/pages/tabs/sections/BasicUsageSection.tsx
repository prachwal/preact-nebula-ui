import { useState } from 'preact/hooks'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '../../../../nebula/components'

export function BasicUsageSection() {
  const [basicValue, setBasicValue] = useState('tab1')

  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Basic Usage
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Simple tabs with content panels.
        </p>
      </div>
      
      <div className="space-y-6">
        <Tabs value={basicValue} onChange={setBasicValue}>
          <TabList>
            <Tab value="tab1">Overview</Tab>
            <Tab value="tab2">Features</Tab>
            <Tab value="tab3">Documentation</Tab>
          </TabList>
          <TabPanels>
            <TabPanel value="tab1">
              <div className="p-4 text-gray-900 dark:text-gray-100">
                <h3 className="text-lg font-semibold mb-2">Overview</h3>
                <p>This is the overview content panel. Tabs help organize related content into separate views.</p>
              </div>
            </TabPanel>
            <TabPanel value="tab2">
              <div className="p-4 text-gray-900 dark:text-gray-100">
                <h3 className="text-lg font-semibold mb-2">Features</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Keyboard navigation support</li>
                  <li>Multiple visual variants</li>
                  <li>Horizontal and vertical orientations</li>
                  <li>Accessible by default</li>
                </ul>
              </div>
            </TabPanel>
            <TabPanel value="tab3">
              <div className="p-4 text-gray-900 dark:text-gray-100">
                <h3 className="text-lg font-semibold mb-2">Documentation</h3>
                <p>Check the props documentation below for all available configuration options.</p>
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </section>
  )
}
