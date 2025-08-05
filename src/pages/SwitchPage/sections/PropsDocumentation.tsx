import { h } from 'preact'

export function PropsDocumentation() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Switch Props</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Prop</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Type</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Default</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">checked</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">boolean</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">false</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Whether the switch is on/checked</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">defaultChecked</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">boolean</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">false</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Initial checked state for uncontrolled switch</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">disabled</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">boolean</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">false</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Whether the switch is disabled</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">size</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">'sm' | 'md' | 'lg'</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">'md'</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Size of the switch</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">color</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">'primary' | 'secondary' | 'success' | 'warning' | 'danger'</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">'primary'</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Color theme when switch is checked</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">label</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">string</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">-</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Label text for the switch</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">labelPosition</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">'left' | 'right'</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">'right'</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Position of the label relative to switch</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">loading</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">boolean</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">false</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Whether to show loading spinner</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">onChange</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">function</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">-</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Callback fired when switch state changes</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">name</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">string</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">-</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Name attribute for the input element</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">className</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">string</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">-</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Additional CSS classes to apply</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h4 className="text-md font-semibold mb-3">Usage Examples</h4>
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <pre className="text-sm overflow-x-auto">
            <code>{`import { Switch } from '@nebula/components'

// Basic switch
<Switch label="Enable notifications" />

// Controlled switch
<Switch 
  checked={isEnabled}
  onChange={setIsEnabled}
  label="Dark mode"
/>

// Different sizes
<Switch size="sm" label="Small switch" />
<Switch size="lg" label="Large switch" />

// Different colors
<Switch color="success" label="Enable feature" />
<Switch color="warning" label="Beta mode" />
<Switch color="danger" label="Debug mode" />

// Label on left
<Switch 
  labelPosition="left"
  label="Auto-save"
/>

// Loading state
<Switch 
  loading
  label="Applying changes..."
/>

// Disabled state
<Switch 
  disabled
  label="Premium feature"
/>`}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
