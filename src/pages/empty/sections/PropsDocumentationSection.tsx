export function PropsDocumentationSection() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          API Reference
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Complete reference for Empty component props and configuration options.
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Empty Props
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Property
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Default
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    image
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">ComponentChild | EmptyImageType</code>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    'default'
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    Custom image component or predefined image type
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    imageStyle
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">CSSProperties</code>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    -
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    Custom styles for the image container
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    description
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">ComponentChild</code>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    'No data'
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    Description text or custom component
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    children
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">ComponentChild</code>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    -
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    Additional content like action buttons
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    size
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">'small' | 'default' | 'large'</code>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    'default'
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    Size of the empty state illustration
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    variant
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">EmptyImageType</code>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    'default'
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    Semantic variant that determines the illustration
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    className
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">string</code>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    -
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    Additional CSS classes
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    style
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">CSSProperties</code>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    -
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    Inline styles
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    aria-label
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">string</code>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    -
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    Accessibility label
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            EmptyImageType Values
          </h3>
          <div className="bg-slate-800 dark:bg-gray-950 text-gray-100 dark:text-gray-200 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-800">
            <pre className="text-sm">
              <code>{`type EmptyImageType = 
  | 'default'    // General empty state
  | 'simple'     // Minimal illustration  
  | 'search'     // No search results
  | 'error'      // Error state
  | 'network'    // Network/connection issues
  | 'data'       // No data available
  | 'success'    // Successful completion`}</code>
            </pre>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Usage Examples
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Basic Usage
              </h4>
              <div className="bg-slate-800 dark:bg-gray-950 text-gray-100 dark:text-gray-200 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-800">
                <pre className="text-sm">
                  <code>{`// Basic empty state
<Empty />

// With custom description
<Empty description="No items found" />

// Specific variant
<Empty variant="search" description="No results found" />`}</code>
                </pre>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                With Custom Content
              </h4>
              <div className="bg-slate-800 dark:bg-gray-950 text-gray-100 dark:text-gray-200 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-800">
                <pre className="text-sm">
                  <code>{`<Empty 
  variant="error"
  description="Something went wrong"
  size="large"
>
  <div className="mt-4">
    <Button onClick={retry}>Try Again</Button>
    <Button variant="link" onClick={goHome}>
      Go Home
    </Button>
  </div>
</Empty>`}</code>
                </pre>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Custom Image
              </h4>
              <div className="bg-slate-800 dark:bg-gray-950 text-gray-100 dark:text-gray-200 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-800">
                <pre className="text-sm">
                  <code>{`<Empty 
  image={<MyCustomIcon />}
  description="Custom empty state"
  imageStyle={{ height: 120 }}
/>`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Accessibility
          </h3>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
              <li>• The component automatically provides appropriate ARIA labels</li>
              <li>• Use <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">aria-label</code> for custom accessibility descriptions</li>
              <li>• Illustrations are decorative and hidden from screen readers</li>
              <li>• Description text is properly associated with the component</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
