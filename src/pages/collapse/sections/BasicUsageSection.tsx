import { useState } from 'preact/hooks'
import { Collapse } from '../../../../nebula/components/Collapse'

export function BasicUsageSection() {
  const [activeKey, setActiveKey] = useState<string | string[]>('1')

  const handleChange = (key: string | string[]) => {
    setActiveKey(key)
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Basic Usage</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Collapse allows users to expand and collapse content sections with smooth animations.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Simple Collapse</h3>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <Collapse activeKey={activeKey} onChange={handleChange}>
              <Collapse.Panel key="1" header="This is panel header 1">
                <p className="text-gray-600 dark:text-gray-300">
                  This is the content for panel 1. It can contain any type of content including text, images, 
                  or other components. The content area expands and collapses smoothly when the header is clicked.
                </p>
              </Collapse.Panel>
              <Collapse.Panel key="2" header="This is panel header 2">
                <p className="text-gray-600 dark:text-gray-300">
                  This is the content for panel 2. The collapse component supports multiple panels, 
                  and each panel can be independently controlled or work in accordion mode where only 
                  one panel can be open at a time.
                </p>
              </Collapse.Panel>
              <Collapse.Panel key="3" header="This is panel header 3">
                <p className="text-gray-600 dark:text-gray-300">
                  This is the content for panel 3. Collapse panels are perfect for organizing large amounts 
                  of information in a compact, user-friendly way. They help reduce visual clutter while 
                  keeping content accessible.
                </p>
              </Collapse.Panel>
            </Collapse>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mt-4">
            <h4 className="font-medium mb-2">Usage:</h4>
            <pre className="text-sm overflow-x-auto">
              <code>{`const [activeKey, setActiveKey] = useState('1')

<Collapse activeKey={activeKey} onChange={setActiveKey}>
  <Collapse.Panel key="1" header="This is panel header 1">
    Panel content 1
  </Collapse.Panel>
  <Collapse.Panel key="2" header="This is panel header 2">
    Panel content 2
  </Collapse.Panel>
  <Collapse.Panel key="3" header="This is panel header 3">
    Panel content 3
  </Collapse.Panel>
</Collapse>`}</code>
            </pre>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Default Expanded</h3>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <Collapse defaultActiveKey="1">
              <Collapse.Panel key="1" header="Default Expanded Panel">
                <p className="text-gray-600 dark:text-gray-300">
                  This panel is expanded by default. You can control which panels are initially 
                  open using the defaultActiveKey prop.
                </p>
              </Collapse.Panel>
            </Collapse>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mt-4">
            <h4 className="font-medium mb-2">Usage:</h4>
            <pre className="text-sm overflow-x-auto">
              <code>{`<Collapse defaultActiveKey="1">
  <Collapse.Panel key="1" header="Default Expanded Panel">
    This content is visible by default
  </Collapse.Panel>
</Collapse>`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
