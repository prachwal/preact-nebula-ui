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
      description="Complete reference for Spinner component properties."
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
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">
                size
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                'md'
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                Size of the spinner from extra small to extra large.
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">
                color
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                'current' | 'blue' | 'gray' | 'white' | 'red' | 'green' | 'yellow'
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                'current'
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                Color scheme for the spinner. 'current' inherits from parent text color.
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">
                className
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                string
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                undefined
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                Additional CSS classes to apply to the spinner element.
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">
                aria-label
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                string
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                'Loading...'
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                Accessibility label for screen readers to describe the loading state.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Section>
  )
}
