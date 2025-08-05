import { h } from 'preact'

export function PropsDocumentation() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Textarea Props</h3>
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
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">value</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">string</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">-</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Current value of the textarea</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">defaultValue</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">string</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">-</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Initial value for uncontrolled textarea</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">placeholder</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">string</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">-</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Placeholder text for the textarea</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">size</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">'xs' | 'sm' | 'md' | 'lg' | 'xl'</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">'md'</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Size of the textarea</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">variant</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">'default' | 'outlined' | 'filled' | 'underlined'</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">'default'</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Visual style variant of the textarea</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">rows</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">number</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">4</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Number of visible text lines</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">cols</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">number</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">-</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Number of visible character columns</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">disabled</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">boolean</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">false</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Whether the textarea is disabled</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">readOnly</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">boolean</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">false</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Whether the textarea is read-only</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">required</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">boolean</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">false</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Whether the textarea is required</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">error</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">boolean</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">false</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Whether the textarea is in error state</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">resizable</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">boolean | 'vertical' | 'horizontal' | 'both' | 'none'</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">true</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Whether and how the textarea can be resized</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">autoResize</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">boolean</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">false</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Whether to automatically resize based on content</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">maxLength</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">number</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">-</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Maximum number of characters allowed</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">showCharCount</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">boolean</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">false</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Whether to show character count</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">helperText</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">string</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">-</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Helper text displayed below the textarea</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">onChange</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">function</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">-</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Callback fired when textarea value changes</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">onFocus</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">function</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">-</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Callback fired when textarea receives focus</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-blue-600 dark:text-blue-400">onBlur</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">function</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">-</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Callback fired when textarea loses focus</td>
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
            <code>{`import { Textarea } from '@nebula/components'

// Basic textarea
<Textarea placeholder="Enter your message..." />

// Controlled textarea
<Textarea 
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  placeholder="Type your message"
/>

// Different sizes
<Textarea size="xs" placeholder="Extra small" />
<Textarea size="sm" placeholder="Small" />
<Textarea size="lg" placeholder="Large" />
<Textarea size="xl" placeholder="Extra large" />

// Different variants
<Textarea variant="outlined" placeholder="Outlined textarea" />
<Textarea variant="filled" placeholder="Filled textarea" />
<Textarea variant="underlined" placeholder="Underlined textarea" />

// Custom rows
<Textarea 
  rows={6}
  placeholder="Taller textarea"
/>

// Auto-resize
<Textarea 
  autoResize
  placeholder="Auto-resizing textarea"
/>

// With character limit
<Textarea 
  maxLength={280}
  showCharCount
  placeholder="Tweet-like input"
/>

// Textarea states
<Textarea 
  error
  helperText="This field is required"
  placeholder="Error state"
/>
<Textarea 
  disabled
  placeholder="Disabled textarea"
/>
<Textarea 
  readOnly
  value="Read only content"
/>

// Non-resizable
<Textarea 
  resizable="none"
  placeholder="Fixed size textarea"
/>`}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
