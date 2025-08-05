const Section = ({ title, description, children }: { title: string, description: string, children: any }) => (
  <section className="mb-12">
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
    {children}
  </section>
)

export function PropsDocumentation() {
  return (
    <Section
      title="Props Reference"
      description="Complete reference for Button component properties."
    >
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
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">variant</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">'primary' | 'secondary' | 'outline' | 'ghost' | 'link'</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">'primary'</td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Visual style variant of the button</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">size</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">'xs' | 'sm' | 'md' | 'lg' | 'xl'</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">'md'</td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Size of the button affecting padding and text size</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">disabled</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">boolean</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">false</td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Whether the button is disabled</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">loading</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">boolean</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">false</td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Show loading spinner and disable interactions</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">fullWidth</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">boolean</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">false</td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Whether button should take full width of container</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">leftIcon</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">ReactNode</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">-</td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Icon element to display on the left side of button text</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">rightIcon</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">ReactNode</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">-</td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Icon element to display on the right side of button text</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">onClick</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{'(event: MouseEvent) => void'}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">-</td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Callback fired when button is clicked</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">type</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">'button' | 'submit' | 'reset'</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">'button'</td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">HTML button type attribute</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">className</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">string</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">-</td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Additional CSS classes to apply</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Usage Examples</h3>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 className="font-medium mb-2">Basic Button</h4>
            <pre className="text-sm overflow-x-auto">
              <code>{`<Button onClick={handleClick}>
  Click me
</Button>`}</code>
            </pre>
          </div>
          
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 className="font-medium mb-2">Button with Icon</h4>
            <pre className="text-sm overflow-x-auto">
              <code>{`<Button 
  variant="primary" 
  leftIcon={<PlusIcon />}
  onClick={handleAdd}
>
  Add Item
</Button>`}</code>
            </pre>
          </div>
          
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 className="font-medium mb-2">Loading Button</h4>
            <pre className="text-sm overflow-x-auto">
              <code>{`<Button 
  loading={isSubmitting}
  disabled={!isValid}
  type="submit"
>
  {isSubmitting ? 'Saving...' : 'Save Changes'}
</Button>`}</code>
            </pre>
          </div>
        </div>
      </div>
    </Section>
  )
}
