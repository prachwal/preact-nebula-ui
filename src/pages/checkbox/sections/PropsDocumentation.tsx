import { h } from 'preact'

export function PropsDocumentation() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Checkbox Props</h3>
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
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Whether the checkbox is checked</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">defaultChecked</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">boolean</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">false</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Initial checked state for uncontrolled checkbox</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">indeterminate</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">boolean</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">false</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Whether the checkbox is in indeterminate state</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">disabled</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">boolean</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">false</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Whether the checkbox is disabled</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">size</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">'sm' | 'md' | 'lg'</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">'md'</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Size of the checkbox</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">color</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">'primary' | 'secondary' | 'success' | 'warning' | 'danger'</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">'primary'</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Color theme of the checkbox</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">label</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">string</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">-</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Label text for the checkbox</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">labelPosition</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">'left' | 'right'</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">'right'</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Position of the label relative to checkbox</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">onChange</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">(checked: boolean) =&gt; void</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">-</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Callback fired when the checkbox state changes</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">name</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">string</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">-</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Name attribute for the input element</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">value</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">string</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">-</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Value attribute for the input element</td>
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
            <code>{`import { Checkbox } from '@nebula/components'

// Basic checkbox
<Checkbox label="Accept terms" />

// Controlled checkbox
<Checkbox 
  checked={isChecked}
  onChange={setIsChecked}
  label="Subscribe to newsletter"
/>

// Different sizes
<Checkbox size="sm" label="Small checkbox" />
<Checkbox size="lg" label="Large checkbox" />

// Different colors
<Checkbox color="success" label="Success checkbox" />
<Checkbox color="warning" label="Warning checkbox" />
<Checkbox color="danger" label="Danger checkbox" />

// Indeterminate state
<Checkbox 
  indeterminate={true}
  label="Select all items"
/>

// Disabled state
<Checkbox 
  disabled
  label="Disabled checkbox"
/>

// Label on left
<Checkbox 
  labelPosition="left"
  label="Left label"
/>`}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
