export function PropsDocumentation() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          API Reference
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Complete reference for all Autocomplete component props, types, and methods.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
            AutocompleteProps
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left p-3 font-medium text-gray-900 dark:text-white">Prop</th>
                  <th className="text-left p-3 font-medium text-gray-900 dark:text-white">Type</th>
                  <th className="text-left p-3 font-medium text-gray-900 dark:text-white">Default</th>
                  <th className="text-left p-3 font-medium text-gray-900 dark:text-white">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="p-3 font-mono text-blue-600 dark:text-blue-400">value</td>
                  <td className="p-3 text-gray-600 dark:text-gray-400">AutocompleteOption | AutocompleteOption[] | null</td>
                  <td className="p-3 text-gray-500 dark:text-gray-500">undefined</td>
                  <td className="p-3 text-gray-700 dark:text-gray-300">Current selected value(s)</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-blue-600 dark:text-blue-400">defaultValue</td>
                  <td className="p-3 text-gray-600 dark:text-gray-400">AutocompleteOption | AutocompleteOption[] | null</td>
                  <td className="p-3 text-gray-500 dark:text-gray-500">undefined</td>
                  <td className="p-3 text-gray-700 dark:text-gray-300">Default value for uncontrolled mode</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-blue-600 dark:text-blue-400">options</td>
                  <td className="p-3 text-gray-600 dark:text-gray-400">AutocompleteOption[]</td>
                  <td className="p-3 text-gray-500 dark:text-gray-500">[]</td>
                  <td className="p-3 text-gray-700 dark:text-gray-300">Available options for selection</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-blue-600 dark:text-blue-400">groupedOptions</td>
                  <td className="p-3 text-gray-600 dark:text-gray-400">AutocompleteGroup[]</td>
                  <td className="p-3 text-gray-500 dark:text-gray-500">undefined</td>
                  <td className="p-3 text-gray-700 dark:text-gray-300">Grouped options with labels</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-blue-600 dark:text-blue-400">multiple</td>
                  <td className="p-3 text-gray-600 dark:text-gray-400">boolean</td>
                  <td className="p-3 text-gray-500 dark:text-gray-500">false</td>
                  <td className="p-3 text-gray-700 dark:text-gray-300">Enable multiple selection</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-blue-600 dark:text-blue-400">maxSelections</td>
                  <td className="p-3 text-gray-600 dark:text-gray-400">number</td>
                  <td className="p-3 text-gray-500 dark:text-gray-500">undefined</td>
                  <td className="p-3 text-gray-700 dark:text-gray-300">Maximum selections (multiple mode)</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-blue-600 dark:text-blue-400">placeholder</td>
                  <td className="p-3 text-gray-600 dark:text-gray-400">string</td>
                  <td className="p-3 text-gray-500 dark:text-gray-500">'Search...'</td>
                  <td className="p-3 text-gray-700 dark:text-gray-300">Input placeholder text</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-blue-600 dark:text-blue-400">size</td>
                  <td className="p-3 text-gray-600 dark:text-gray-400">'sm' | 'md' | 'lg'</td>
                  <td className="p-3 text-gray-500 dark:text-gray-500">'md'</td>
                  <td className="p-3 text-gray-700 dark:text-gray-300">Component size variant</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-blue-600 dark:text-blue-400">disabled</td>
                  <td className="p-3 text-gray-600 dark:text-gray-400">boolean</td>
                  <td className="p-3 text-gray-500 dark:text-gray-500">false</td>
                  <td className="p-3 text-gray-700 dark:text-gray-300">Disable user interaction</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-blue-600 dark:text-blue-400">readOnly</td>
                  <td className="p-3 text-gray-600 dark:text-gray-400">boolean</td>
                  <td className="p-3 text-gray-500 dark:text-gray-500">false</td>
                  <td className="p-3 text-gray-700 dark:text-gray-300">Make input read-only</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-blue-600 dark:text-blue-400">required</td>
                  <td className="p-3 text-gray-600 dark:text-gray-400">boolean</td>
                  <td className="p-3 text-gray-500 dark:text-gray-500">false</td>
                  <td className="p-3 text-gray-700 dark:text-gray-300">Mark field as required</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-blue-600 dark:text-blue-400">error</td>
                  <td className="p-3 text-gray-600 dark:text-gray-400">boolean</td>
                  <td className="p-3 text-gray-500 dark:text-gray-500">false</td>
                  <td className="p-3 text-gray-700 dark:text-gray-300">Show error state</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-blue-600 dark:text-blue-400">errorMessage</td>
                  <td className="p-3 text-gray-600 dark:text-gray-400">string</td>
                  <td className="p-3 text-gray-500 dark:text-gray-500">undefined</td>
                  <td className="p-3 text-gray-700 dark:text-gray-300">Error message text</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-blue-600 dark:text-blue-400">loading</td>
                  <td className="p-3 text-gray-600 dark:text-gray-400">boolean</td>
                  <td className="p-3 text-gray-500 dark:text-gray-500">false</td>
                  <td className="p-3 text-gray-700 dark:text-gray-300">Show loading state</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-blue-600 dark:text-blue-400">allowCreate</td>
                  <td className="p-3 text-gray-600 dark:text-gray-400">boolean</td>
                  <td className="p-3 text-gray-500 dark:text-gray-500">false</td>
                  <td className="p-3 text-gray-700 dark:text-gray-300">Allow creating new options</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-blue-600 dark:text-blue-400">minSearchLength</td>
                  <td className="p-3 text-gray-600 dark:text-gray-400">number</td>
                  <td className="p-3 text-gray-500 dark:text-gray-500">0</td>
                  <td className="p-3 text-gray-700 dark:text-gray-300">Minimum characters for search</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-blue-600 dark:text-blue-400">debounceMs</td>
                  <td className="p-3 text-gray-600 dark:text-gray-400">number</td>
                  <td className="p-3 text-gray-500 dark:text-gray-500">300</td>
                  <td className="p-3 text-gray-700 dark:text-gray-300">Debounce delay for async search</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-blue-600 dark:text-blue-400">maxDisplayOptions</td>
                  <td className="p-3 text-gray-600 dark:text-gray-400">number</td>
                  <td className="p-3 text-gray-500 dark:text-gray-500">100</td>
                  <td className="p-3 text-gray-700 dark:text-gray-300">Maximum options in dropdown</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-blue-600 dark:text-blue-400">clearOnSelect</td>
                  <td className="p-3 text-gray-600 dark:text-gray-400">boolean</td>
                  <td className="p-3 text-gray-500 dark:text-gray-500">false</td>
                  <td className="p-3 text-gray-700 dark:text-gray-300">Clear input after selection</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-blue-600 dark:text-blue-400">showClear</td>
                  <td className="p-3 text-gray-600 dark:text-gray-400">boolean</td>
                  <td className="p-3 text-gray-500 dark:text-gray-500">true</td>
                  <td className="p-3 text-gray-700 dark:text-gray-300">Show clear button</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
            Event Handlers
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left p-3 font-medium text-gray-900 dark:text-white">Event</th>
                  <th className="text-left p-3 font-medium text-gray-900 dark:text-white">Type</th>
                  <th className="text-left p-3 font-medium text-gray-900 dark:text-white">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="p-3 font-mono text-blue-600 dark:text-blue-400">onChange</td>
                  <td className="p-3 text-gray-600 dark:text-gray-400">(value) =&gt; void</td>
                  <td className="p-3 text-gray-700 dark:text-gray-300">Called when selection changes</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-blue-600 dark:text-blue-400">onSelect</td>
                  <td className="p-3 text-gray-600 dark:text-gray-400">(option) =&gt; void</td>
                  <td className="p-3 text-gray-700 dark:text-gray-300">Called when option is selected</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-blue-600 dark:text-blue-400">onInputChange</td>
                  <td className="p-3 text-gray-600 dark:text-gray-400">(value) =&gt; void</td>
                  <td className="p-3 text-gray-700 dark:text-gray-300">Called when input value changes</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-blue-600 dark:text-blue-400">onSearch</td>
                  <td className="p-3 text-gray-600 dark:text-gray-400">(query) =&gt; Promise&lt;Option[]&gt;</td>
                  <td className="p-3 text-gray-700 dark:text-gray-300">Async search function</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-blue-600 dark:text-blue-400">onCreate</td>
                  <td className="p-3 text-gray-600 dark:text-gray-400">(value) =&gt; void</td>
                  <td className="p-3 text-gray-700 dark:text-gray-300">Called when creating new option</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-blue-600 dark:text-blue-400">filterFn</td>
                  <td className="p-3 text-gray-600 dark:text-gray-400">(options, query) =&gt; Option[]</td>
                  <td className="p-3 text-gray-700 dark:text-gray-300">Custom filter function</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
            Custom Renderers
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left p-3 font-medium text-gray-900 dark:text-white">Renderer</th>
                  <th className="text-left p-3 font-medium text-gray-900 dark:text-white">Type</th>
                  <th className="text-left p-3 font-medium text-gray-900 dark:text-white">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="p-3 font-mono text-blue-600 dark:text-blue-400">renderOption</td>
                  <td className="p-3 text-gray-600 dark:text-gray-400">(option, highlighted) =&gt; JSX</td>
                  <td className="p-3 text-gray-700 dark:text-gray-300">Custom option renderer</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-blue-600 dark:text-blue-400">renderTag</td>
                  <td className="p-3 text-gray-600 dark:text-gray-400">(option, onRemove) =&gt; JSX</td>
                  <td className="p-3 text-gray-700 dark:text-gray-300">Custom tag renderer</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-blue-600 dark:text-blue-400">renderNoOptions</td>
                  <td className="p-3 text-gray-600 dark:text-gray-400">(searchValue) =&gt; JSX</td>
                  <td className="p-3 text-gray-700 dark:text-gray-300">Custom no options display</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-blue-600 dark:text-blue-400">renderLoading</td>
                  <td className="p-3 text-gray-600 dark:text-gray-400">() =&gt; JSX</td>
                  <td className="p-3 text-gray-700 dark:text-gray-300">Custom loading display</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-blue-600 dark:text-blue-400">renderCreateOption</td>
                  <td className="p-3 text-gray-600 dark:text-gray-400">(inputValue) =&gt; JSX</td>
                  <td className="p-3 text-gray-700 dark:text-gray-300">Custom create option display</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
            Types
          </h4>
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h5 className="font-medium text-gray-900 dark:text-white mb-2">AutocompleteOption</h5>
              <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
{`interface AutocompleteOption {
  value: string | number
  label: string
  description?: string
  disabled?: boolean
  group?: string
  data?: Record<string, any>
}`}
              </pre>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h5 className="font-medium text-gray-900 dark:text-white mb-2">AutocompleteGroup</h5>
              <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
{`interface AutocompleteGroup {
  id: string
  label: string
  options: AutocompleteOption[]
}`}
              </pre>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h5 className="font-medium text-gray-900 dark:text-white mb-2">AutocompleteRef</h5>
              <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
{`interface AutocompleteRef {
  focus: () => void
  blur: () => void
  clear: () => void
  getInputValue: () => string
  setInputValue: (value: string) => void
}`}
              </pre>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
            Accessibility
          </h4>
          <div className="bg-blue-50 dark:bg-blue-900/50 p-4 rounded-lg">
            <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
              <li>• Full keyboard navigation support (Arrow keys, Enter, Escape)</li>
              <li>• ARIA attributes for screen readers (combobox, listbox, option roles)</li>
              <li>• Focus management and announced state changes</li>
              <li>• Support for aria-label and aria-labelledby</li>
              <li>• Proper contrast ratios and focus indicators</li>
              <li>• Option selection announcements</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
