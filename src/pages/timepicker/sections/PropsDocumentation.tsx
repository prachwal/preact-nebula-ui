import { TimePicker } from '../../../../nebula/components'

export function PropsDocumentation() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Props Reference</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Complete reference of all available props for the TimePicker component.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Prop</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Type</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Default</th>
              <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <tr>
              <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">value</td>
              <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Time | null</td>
              <td className="py-3 px-4 text-gray-500 dark:text-gray-500">undefined</td>
              <td className="py-3 px-4 text-gray-700 dark:text-gray-300">Current selected time (controlled mode)</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">defaultValue</td>
              <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Time | null</td>
              <td className="py-3 px-4 text-gray-500 dark:text-gray-500">undefined</td>
              <td className="py-3 px-4 text-gray-700 dark:text-gray-300">Default time for uncontrolled mode</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">onChange</td>
              <td className="py-3 px-4 text-gray-600 dark:text-gray-400">(time: Time | null) =&gt; void</td>
              <td className="py-3 px-4 text-gray-500 dark:text-gray-500">undefined</td>
              <td className="py-3 px-4 text-gray-700 dark:text-gray-300">Callback fired when time changes</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">size</td>
              <td className="py-3 px-4 text-gray-600 dark:text-gray-400">'sm' | 'md' | 'lg'</td>
              <td className="py-3 px-4 text-gray-500 dark:text-gray-500">'md'</td>
              <td className="py-3 px-4 text-gray-700 dark:text-gray-300">Size variant of the component</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">format</td>
              <td className="py-3 px-4 text-gray-600 dark:text-gray-400">'12h' | '24h'</td>
              <td className="py-3 px-4 text-gray-500 dark:text-gray-500">'12h'</td>
              <td className="py-3 px-4 text-gray-700 dark:text-gray-300">Time format (12-hour or 24-hour)</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">showSeconds</td>
              <td className="py-3 px-4 text-gray-600 dark:text-gray-400">boolean</td>
              <td className="py-3 px-4 text-gray-500 dark:text-gray-500">false</td>
              <td className="py-3 px-4 text-gray-700 dark:text-gray-300">Show seconds selector in time picker</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">stepMinutes</td>
              <td className="py-3 px-4 text-gray-600 dark:text-gray-400">number</td>
              <td className="py-3 px-4 text-gray-500 dark:text-gray-500">1</td>
              <td className="py-3 px-4 text-gray-700 dark:text-gray-300">Step interval for minutes (e.g., 15 for quarter-hour)</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">minTime</td>
              <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Time</td>
              <td className="py-3 px-4 text-gray-500 dark:text-gray-500">undefined</td>
              <td className="py-3 px-4 text-gray-700 dark:text-gray-300">Minimum selectable time</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">maxTime</td>
              <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Time</td>
              <td className="py-3 px-4 text-gray-500 dark:text-gray-500">undefined</td>
              <td className="py-3 px-4 text-gray-700 dark:text-gray-300">Maximum selectable time</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">showClear</td>
              <td className="py-3 px-4 text-gray-600 dark:text-gray-400">boolean</td>
              <td className="py-3 px-4 text-gray-500 dark:text-gray-500">true</td>
              <td className="py-3 px-4 text-gray-700 dark:text-gray-300">Show clear button to remove selected time</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">showNow</td>
              <td className="py-3 px-4 text-gray-600 dark:text-gray-400">boolean</td>
              <td className="py-3 px-4 text-gray-500 dark:text-gray-500">true</td>
              <td className="py-3 px-4 text-gray-700 dark:text-gray-300">Show "Now" button to select current time</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">placeholder</td>
              <td className="py-3 px-4 text-gray-600 dark:text-gray-400">string</td>
              <td className="py-3 px-4 text-gray-500 dark:text-gray-500">'Select time'</td>
              <td className="py-3 px-4 text-gray-700 dark:text-gray-300">Placeholder text for input field</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">disabled</td>
              <td className="py-3 px-4 text-gray-600 dark:text-gray-400">boolean</td>
              <td className="py-3 px-4 text-gray-500 dark:text-gray-500">false</td>
              <td className="py-3 px-4 text-gray-700 dark:text-gray-300">Disable the time picker</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">readOnly</td>
              <td className="py-3 px-4 text-gray-600 dark:text-gray-400">boolean</td>
              <td className="py-3 px-4 text-gray-500 dark:text-gray-500">false</td>
              <td className="py-3 px-4 text-gray-700 dark:text-gray-300">Make the time picker read-only</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">error</td>
              <td className="py-3 px-4 text-gray-600 dark:text-gray-400">boolean</td>
              <td className="py-3 px-4 text-gray-500 dark:text-gray-500">false</td>
              <td className="py-3 px-4 text-gray-700 dark:text-gray-300">Show error state</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">errorMessage</td>
              <td className="py-3 px-4 text-gray-600 dark:text-gray-400">string</td>
              <td className="py-3 px-4 text-gray-500 dark:text-gray-500">undefined</td>
              <td className="py-3 px-4 text-gray-700 dark:text-gray-300">Error message to display</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">required</td>
              <td className="py-3 px-4 text-gray-600 dark:text-gray-400">boolean</td>
              <td className="py-3 px-4 text-gray-500 dark:text-gray-500">false</td>
              <td className="py-3 px-4 text-gray-700 dark:text-gray-300">Mark field as required</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">className</td>
              <td className="py-3 px-4 text-gray-600 dark:text-gray-400">string</td>
              <td className="py-3 px-4 text-gray-500 dark:text-gray-500">undefined</td>
              <td className="py-3 px-4 text-gray-700 dark:text-gray-300">Additional CSS classes</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="space-y-4">
        <h4 className="text-base font-medium text-gray-900 dark:text-white">Time Interface</h4>
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <pre className="text-sm text-gray-800 dark:text-gray-200">
{`interface Time {
  hours: number      // 0-23 (24-hour format)
  minutes: number    // 0-59
  seconds?: number   // 0-59 (optional)
}`}
          </pre>
        </div>
      </div>

      <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-indigo-900 dark:text-indigo-300 mb-2">Usage Examples</h4>
        <div className="text-sm text-indigo-800 dark:text-indigo-300 space-y-2">
          <div>
            <strong>Controlled:</strong> <code className="bg-indigo-100 dark:bg-indigo-800 px-1 rounded">value={`{hours: 14, minutes: 30}`} onChange={`{setTime}`}</code>
          </div>
          <div>
            <strong>Uncontrolled:</strong> <code className="bg-indigo-100 dark:bg-indigo-800 px-1 rounded">defaultValue={`{hours: 9, minutes: 0}`}</code>
          </div>
          <div>
            <strong>With seconds:</strong> <code className="bg-indigo-100 dark:bg-indigo-800 px-1 rounded">showSeconds stepMinutes={`{15}`}</code>
          </div>
        </div>
      </div>
    </div>
  )
}
