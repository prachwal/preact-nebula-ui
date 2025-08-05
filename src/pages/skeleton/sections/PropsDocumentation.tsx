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
      description="Complete reference for Skeleton component properties."
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
                variant
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                'text' | 'avatar' | 'rectangular' | 'circular'
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                'text'
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                Shape variant of the skeleton placeholder.
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">
                width
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                string | number
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                undefined
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                Custom width for the skeleton. Can be pixels, percentage, or CSS units.
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">
                height
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                string | number
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                undefined
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                Custom height for the skeleton. Can be pixels, percentage, or CSS units.
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">
                animation
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                'pulse' | 'wave' | 'none'
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                'pulse'
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                Animation type for the skeleton loading effect.
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">
                lines
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                number
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                1
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                Number of lines to render for text variant skeleton.
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">
                children
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                ReactNode
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                undefined
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                Content used for proper spacing and layout when skeleton is hidden.
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
                Additional CSS classes to apply to the skeleton element.
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">
                data-testid
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                string
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                undefined
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                Test ID for automated testing and component identification.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Section>
  )
}
