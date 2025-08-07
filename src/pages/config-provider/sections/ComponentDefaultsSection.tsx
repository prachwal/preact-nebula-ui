import { useState } from 'preact/hooks'
import { ConfigProvider, Button, Input, Empty } from '../../../../nebula/components'

export function ComponentDefaultsSection() {
  const [showCustomDefaults, setShowCustomDefaults] = useState(false)

  const customDefaults = {
    button: {
      variant: 'primary' as const,
      size: 'lg' as const
    },
    input: {
      size: 'lg' as const,
      variant: 'filled' as const
    },
    empty: {
      variant: 'simple' as const
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Component Defaults
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Set global default props for all components in your application.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Default Props Demo
          </h3>
          
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={showCustomDefaults}
                onChange={(e) => setShowCustomDefaults((e.target as HTMLInputElement).checked)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Use custom component defaults
              </span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                Without Custom Defaults
              </h4>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <ConfigProvider>
                  <div className="space-y-4">
                    <Button>Default Button</Button>
                    <Input placeholder="Default input" />
                    <Empty />
                  </div>
                </ConfigProvider>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                With Custom Defaults
              </h4>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <ConfigProvider componentDefaults={showCustomDefaults ? customDefaults : undefined}>
                  <div className="space-y-4">
                    <Button>Custom Default Button</Button>
                    <Input placeholder="Custom default input" />
                    <Empty />
                  </div>
                </ConfigProvider>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Override Priority
          </h3>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">
              <strong>Priority Order (highest to lowest):</strong>
            </p>
            <ol className="text-sm text-blue-700 dark:text-blue-300 list-decimal list-inside space-y-1">
              <li>Explicit component props</li>
              <li>Component defaults from ConfigProvider</li>
              <li>Component's built-in defaults</li>
            </ol>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Code Example
          </h3>
          <div className="bg-slate-800 dark:bg-gray-950 text-gray-100 dark:text-gray-200 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-800">
            <pre className="text-sm">
              <code>{`import { ConfigProvider } from 'nebula-ui'

const componentDefaults = {
  button: {
    variant: 'primary',
    size: 'lg'
  },
  input: {
    size: 'lg',
    variant: 'filled'
  },
  empty: {
    variant: 'simple'
  }
}

function App() {
  return (
    <ConfigProvider componentDefaults={componentDefaults}>
      {/* All buttons will be primary and large by default */}
      <Button>Large Primary Button</Button>
      
      {/* Override the default variant */}
      <Button variant="outline">Large Outline Button</Button>
      
      {/* All inputs will be large and filled by default */}
      <Input placeholder="Large filled input" />
    </ConfigProvider>
  )
}`}</code>
            </pre>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            TypeScript Interface
          </h3>
          <div className="bg-slate-800 dark:bg-gray-950 text-gray-100 dark:text-gray-200 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-800">
            <pre className="text-sm">
              <code>{`interface ComponentDefaults {
  button?: Partial<ButtonProps>
  input?: Partial<InputProps>
  empty?: Partial<EmptyProps>
  // ... other components
}

interface ConfigProviderProps {
  componentDefaults?: ComponentDefaults
  // ... other props
}`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
