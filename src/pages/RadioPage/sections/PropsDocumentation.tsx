import { h } from 'preact'

export function PropsDocumentation() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Radio Props</h3>
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
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Whether the radio button is selected</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">defaultChecked</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">boolean</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">false</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Initial checked state for uncontrolled radio</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">disabled</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">boolean</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">false</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Whether the radio button is disabled</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">size</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">'sm' | 'md' | 'lg'</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">'md'</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Size of the radio button</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">color</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">'primary' | 'secondary' | 'success' | 'warning' | 'danger'</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">'primary'</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Color theme of the radio button</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">label</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">string</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">-</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Label text for the radio button</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">labelPosition</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">'left' | 'right'</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">'right'</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Position of the label relative to radio button</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">name</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">string</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">-</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Name attribute for the input element (required for grouping)</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">value</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">string</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">-</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Value of the radio button when selected</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">onChange</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">function</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">-</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Callback fired when radio button is selected</td>
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
            <code>{`import { Radio } from '@nebula/components'

// Basic radio button
<Radio name="option" value="1" label="Option 1" />

// Controlled radio group
<Radio 
  name="size"
  value="small"
  checked={selectedSize === 'small'}
  onChange={() => setSelectedSize('small')}
  label="Small"
/>
<Radio 
  name="size"
  value="medium"
  checked={selectedSize === 'medium'}
  onChange={() => setSelectedSize('medium')}
  label="Medium"
/>

// Different sizes
<Radio size="sm" name="size" value="sm" label="Small Radio" />
<Radio size="lg" name="size" value="lg" label="Large Radio" />

// Different colors
<Radio color="success" name="color" value="success" label="Success" />
<Radio color="warning" name="color" value="warning" label="Warning" />
<Radio color="danger" name="color" value="danger" label="Danger" />

// Label on left
<Radio 
  labelPosition="left"
  name="position"
  value="left"
  label="Left Label"
/>

// Disabled state
<Radio 
  disabled
  name="disabled"
  value="disabled"
  label="Disabled Radio"
/>`}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
