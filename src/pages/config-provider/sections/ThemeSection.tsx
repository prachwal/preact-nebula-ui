import { useState } from 'preact/hooks'
import { ConfigProvider, Button, Input } from '../../../../nebula/components'

export function ThemeSection() {
  const [primaryColor, setPrimaryColor] = useState('#1677ff')

  const customTheme = {
    token: {
      colorPrimary: primaryColor,
      borderRadius: 8,
      fontSize: 16
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Theme Customization
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Customize the global theme with design tokens that affect all components.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Custom Theme Demo
          </h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Primary Color
            </label>
            <input
              type="color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor((e.target as HTMLInputElement).value)}
              className="w-16 h-10 border border-gray-300 dark:border-gray-600 rounded cursor-pointer bg-white dark:bg-gray-700"
            />
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <ConfigProvider theme={customTheme}>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Button>Primary Button</Button>
                  <Button variant="secondary">Secondary Button</Button>
                  <Button variant="outline">Outline Button</Button>
                </div>
                <Input placeholder="Themed input component" />
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
              <code>{`import { ConfigProvider } from 'nebula-ui'

const customTheme = {
  token: {
    colorPrimary: '${primaryColor}',
    borderRadius: 8,
    fontSize: 16
  }
}

function App() {
  return (
    <ConfigProvider theme={customTheme}>
      <YourComponents />
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
