export function PropsDocumentation() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Props Documentation</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Complete reference of all available props for the Collapse component.
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Collapse Props</h3>
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Prop
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Default
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      activeKey
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      <code className="text-xs bg-gray-100 dark:bg-gray-600 px-1 py-0.5 rounded">string | string[]</code>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      <code className="text-xs bg-gray-100 dark:bg-gray-600 px-1 py-0.5 rounded">undefined</code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                      Current active panel key(s) for controlled mode
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      defaultActiveKey
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      <code className="text-xs bg-gray-100 dark:bg-gray-600 px-1 py-0.5 rounded">string | string[]</code>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      <code className="text-xs bg-gray-100 dark:bg-gray-600 px-1 py-0.5 rounded">undefined</code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                      Default active panel key(s) for uncontrolled mode
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      accordion
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      <code className="text-xs bg-gray-100 dark:bg-gray-600 px-1 py-0.5 rounded">boolean</code>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      <code className="text-xs bg-gray-100 dark:bg-gray-600 px-1 py-0.5 rounded">false</code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                      Enable accordion mode (only one panel can be open)
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      bordered
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      <code className="text-xs bg-gray-100 dark:bg-gray-600 px-1 py-0.5 rounded">boolean</code>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      <code className="text-xs bg-gray-100 dark:bg-gray-600 px-1 py-0.5 rounded">true</code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                      Show borders around panels
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      ghost
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      <code className="text-xs bg-gray-100 dark:bg-gray-600 px-1 py-0.5 rounded">boolean</code>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      <code className="text-xs bg-gray-100 dark:bg-gray-600 px-1 py-0.5 rounded">false</code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                      Enable ghost style (minimal appearance)
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      expandIcon
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      <code className="text-xs bg-gray-100 dark:bg-gray-600 px-1 py-0.5 rounded">(props: ExpandIconProps) =&gt; ComponentChild</code>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      <code className="text-xs bg-gray-100 dark:bg-gray-600 px-1 py-0.5 rounded">undefined</code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                      Custom expand/collapse icon renderer
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      expandIconPosition
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      <code className="text-xs bg-gray-100 dark:bg-gray-600 px-1 py-0.5 rounded">'start' | 'end'</code>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      <code className="text-xs bg-gray-100 dark:bg-gray-600 px-1 py-0.5 rounded">'end'</code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                      Position of the expand icon
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      size
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      <code className="text-xs bg-gray-100 dark:bg-gray-600 px-1 py-0.5 rounded">'small' | 'large'</code>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      <code className="text-xs bg-gray-100 dark:bg-gray-600 px-1 py-0.5 rounded">undefined</code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                      Size variant of the collapse panels
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      onChange
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      <code className="text-xs bg-gray-100 dark:bg-gray-600 px-1 py-0.5 rounded">(key: string | string[]) =&gt; void</code>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      <code className="text-xs bg-gray-100 dark:bg-gray-600 px-1 py-0.5 rounded">undefined</code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                      Callback when active panels change
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Collapse.Panel Props</h3>
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Prop
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Default
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      key
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      <code className="text-xs bg-gray-100 dark:bg-gray-600 px-1 py-0.5 rounded">string</code>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      <code className="text-xs bg-gray-100 dark:bg-gray-600 px-1 py-0.5 rounded">required</code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                      Unique identifier for the panel
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      header
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      <code className="text-xs bg-gray-100 dark:bg-gray-600 px-1 py-0.5 rounded">ComponentChild</code>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      <code className="text-xs bg-gray-100 dark:bg-gray-600 px-1 py-0.5 rounded">required</code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                      Panel header content
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      disabled
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      <code className="text-xs bg-gray-100 dark:bg-gray-600 px-1 py-0.5 rounded">boolean</code>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      <code className="text-xs bg-gray-100 dark:bg-gray-600 px-1 py-0.5 rounded">false</code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                      Disable the panel interaction
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      showArrow
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      <code className="text-xs bg-gray-100 dark:bg-gray-600 px-1 py-0.5 rounded">boolean</code>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      <code className="text-xs bg-gray-100 dark:bg-gray-600 px-1 py-0.5 rounded">true</code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                      Show/hide the expand arrow icon
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      extra
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      <code className="text-xs bg-gray-100 dark:bg-gray-600 px-1 py-0.5 rounded">ComponentChild</code>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      <code className="text-xs bg-gray-100 dark:bg-gray-600 px-1 py-0.5 rounded">undefined</code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                      Extra content in the panel header
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      forceRender
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      <code className="text-xs bg-gray-100 dark:bg-gray-600 px-1 py-0.5 rounded">boolean</code>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      <code className="text-xs bg-gray-100 dark:bg-gray-600 px-1 py-0.5 rounded">false</code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                      Render content even when collapsed
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      collapsible
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      <code className="text-xs bg-gray-100 dark:bg-gray-600 px-1 py-0.5 rounded">'header' | 'icon' | 'disabled'</code>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      <code className="text-xs bg-gray-100 dark:bg-gray-600 px-1 py-0.5 rounded">'header'</code>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                      Specify collapsible trigger area
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">ExpandIconProps Interface</h3>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-gray-100">
              <code>{`interface ExpandIconProps {
  isActive: boolean
  panel: CollapsePanelProps
  disabled?: boolean
}`}</code>
            </pre>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Usage Examples</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Basic Usage</h4>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-gray-100">
                  <code>{`import { Collapse } from '@/components'

function BasicExample() {
  return (
    <Collapse>
      <Collapse.Panel key="1" header="Panel 1">
        Content of panel 1
      </Collapse.Panel>
      <Collapse.Panel key="2" header="Panel 2">
        Content of panel 2
      </Collapse.Panel>
    </Collapse>
  )
}`}</code>
                </pre>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Controlled Mode</h4>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-gray-100">
                  <code>{`function ControlledExample() {
  const [activeKey, setActiveKey] = useState(['1'])
  
  return (
    <Collapse
      activeKey={activeKey}
      onChange={setActiveKey}
    >
      <Collapse.Panel key="1" header="Controlled Panel">
        This panel's state is controlled
      </Collapse.Panel>
    </Collapse>
  )
}`}</code>
                </pre>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Accordion Mode</h4>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-gray-100">
                  <code>{`function AccordionExample() {
  return (
    <Collapse accordion>
      <Collapse.Panel key="1" header="Panel 1">
        Only one panel can be open
      </Collapse.Panel>
      <Collapse.Panel key="2" header="Panel 2">
        In accordion mode
      </Collapse.Panel>
    </Collapse>
  )
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
