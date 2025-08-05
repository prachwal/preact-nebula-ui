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
      description="Complete reference for Alert component properties."
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
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">'info' | 'success' | 'warning' | 'error'</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">'info'</td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Visual style and semantic meaning of the alert</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">size</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">'sm' | 'md' | 'lg'</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">'md'</td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Size of the alert affecting padding and text size</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">title</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">string</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">-</td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Optional title for the alert</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">dismissible</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">boolean</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">false</td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Whether the alert can be dismissed by user</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">onDismiss</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{'() => void'}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">-</td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Callback fired when alert is dismissed</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">icon</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">ReactNode | boolean</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">true</td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Custom icon or false to hide default icon</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">actions</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">ReactNode</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">-</td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Action elements (buttons, links) to display</td>
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
            <h4 className="font-medium mb-2">Basic Alert</h4>
            <pre className="text-sm overflow-x-auto">
              <code>{`<Alert variant="info">
  This is an informational alert message.
</Alert>`}</code>
            </pre>
          </div>
          
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 className="font-medium mb-2">Alert with Title and Actions</h4>
            <pre className="text-sm overflow-x-auto">
              <code>{`<Alert 
  variant="warning"
  title="Warning"
  dismissible
  onDismiss={handleDismiss}
  actions={<Button size="sm">Action</Button>}
>
  Please review this important information.
</Alert>`}</code>
            </pre>
          </div>
          
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 className="font-medium mb-2">Custom Icon Alert</h4>
            <pre className="text-sm overflow-x-auto">
              <code>{`<Alert 
  variant="success"
  icon={<CustomIcon />}
  title="Success"
>
  Operation completed successfully!
</Alert>`}</code>
            </pre>
          </div>
        </div>
      </div>
    </Section>
  )
}
