import { ConfigProvider, Button, Input, Empty } from '../../../../nebula/components'

export function BasicUsageSection() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Basic Usage
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          ConfigProvider wraps your entire application to provide global configuration.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Default Configuration
          </h3>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <ConfigProvider>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Button>Primary Button</Button>
                  <Button variant="secondary">Secondary Button</Button>
                  <Button variant="outline">Outline Button</Button>
                </div>
                <Input placeholder="Input with default theme" />
                <Empty description="Default empty state" />
              </div>
            </ConfigProvider>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Code Example
          </h3>
          <div className="bg-slate-800 dark:bg-gray-950 text-gray-100 dark:text-gray-200 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-800">
            <pre className="text-sm">
              <code>{`import { ConfigProvider, Button } from 'nebula-ui'

function App() {
  return (
    <ConfigProvider>
      <Button>My Button</Button>
    </ConfigProvider>
  )
}`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
