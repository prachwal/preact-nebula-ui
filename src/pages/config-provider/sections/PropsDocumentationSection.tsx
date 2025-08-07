export function PropsDocumentationSection() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          API Reference
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Complete reference for ConfigProvider props and configuration options.
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            ConfigProvider Props
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
                    theme
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">ThemeConfig</code>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    -
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    Theme configuration object with design tokens
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    locale
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">LocaleConfig</code>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    en-US
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    Locale configuration for internationalization
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    componentDefaults
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">ComponentDefaults</code>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    -
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    Global default props for components
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    children
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">ComponentChildren</code>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    -
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    Child components to wrap with configuration
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            ThemeConfig Interface
          </h3>
          <div className="bg-slate-800 dark:bg-gray-950 text-gray-100 dark:text-gray-200 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-800">
            <pre className="text-sm">
              <code>{`interface ThemeConfig {
  token?: Partial<GlobalToken>
  components?: {
    [ComponentName: string]: ComponentToken
  }
  algorithm?: ThemeAlgorithm | ThemeAlgorithm[]
  cssVar?: boolean | { prefix?: string; key?: string }
  inherit?: boolean
}

interface GlobalToken {
  // Color tokens
  colorPrimary: string
  colorSuccess: string
  colorWarning: string
  colorError: string
  colorInfo: string
  colorText: string
  colorTextSecondary: string
  colorBg: string
  colorBgSecondary: string
  colorBorder: string
  
  // Typography tokens
  fontSize: number
  fontFamily: string
  lineHeight: number
  
  // Spacing tokens
  padding: number
  margin: number
  borderRadius: number
  
  // Motion tokens
  motionDurationFast: string
  motionDurationMid: string
  motionDurationSlow: string
  motionEaseOut: string
  motionEaseInOut: string
  
  // Shadow tokens
  boxShadow: string
  boxShadowSecondary: string
  
  // Z-index tokens
  zIndexBase: number
  zIndexPopup: number
  zIndexModal: number
  
  // Breakpoints
  screenXS: number
  screenSM: number
  screenMD: number
  screenLG: number
  screenXL: number
}`}</code>
            </pre>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            LocaleConfig Interface
          </h3>
          <div className="bg-slate-800 dark:bg-gray-950 text-gray-100 dark:text-gray-200 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-800">
            <pre className="text-sm">
              <code>{`interface LocaleConfig {
  locale: string
  direction: 'ltr' | 'rtl'
  messages: Record<string, string>
  dateFormat?: string
  timeFormat?: string
  numberFormat?: Intl.NumberFormatOptions
  currency?: string
}`}</code>
            </pre>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            ComponentDefaults Interface
          </h3>
          <div className="bg-slate-800 dark:bg-gray-950 text-gray-100 dark:text-gray-200 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-800">
            <pre className="text-sm">
              <code>{`interface ComponentDefaults {
  button?: Partial<ButtonProps>
  input?: Partial<InputProps>
  select?: Partial<SelectProps>
  checkbox?: Partial<CheckboxProps>
  radio?: Partial<RadioProps>
  empty?: Partial<EmptyProps>
  modal?: Partial<ModalProps>
  drawer?: Partial<DrawerProps>
  popover?: Partial<PopoverProps>
  // ... other components
}`}</code>
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
                Basic Configuration
              </h4>
              <div className="bg-slate-800 dark:bg-gray-950 text-gray-100 dark:text-gray-200 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-800">
                <pre className="text-sm">
                  <code>{`<ConfigProvider
  theme={{
    token: {
      colorPrimary: '#1890ff'
    }
  }}
  locale={{
    locale: 'en-US',
    direction: 'ltr',
    messages: {}
  }}
>
  <App />
</ConfigProvider>`}</code>
                </pre>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Advanced Configuration
              </h4>
              <div className="bg-slate-800 dark:bg-gray-950 text-gray-100 dark:text-gray-200 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-800">
                <pre className="text-sm">
                  <code>{`<ConfigProvider
  theme={{
    token: {
      colorPrimary: '#722ed1',
      borderRadius: 8,
      fontFamily: 'Inter, sans-serif'
    },
    components: {
      Button: {
        primaryShadow: '0 4px 16px rgba(114, 46, 209, 0.3)'
      }
    },
    cssVar: true
  }}
  componentDefaults={{
    button: { size: 'large' },
    input: { variant: 'filled' }
  }}
>
  <App />
</ConfigProvider>`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Hooks
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                useTheme()
              </h4>
              <div className="bg-slate-800 dark:bg-gray-950 text-gray-100 dark:text-gray-200 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-800">
                <pre className="text-sm">
                  <code>{`import { useTheme } from 'nebula-ui'

function MyComponent() {
  const theme = useTheme()
  
  return (
    <div style={{ color: theme.colorPrimary }}>
      Themed content
    </div>
  )
}`}</code>
                </pre>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                useLocale()
              </h4>
              <div className="bg-slate-800 dark:bg-gray-950 text-gray-100 dark:text-gray-200 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-800">
                <pre className="text-sm">
                  <code>{`import { useLocale } from 'nebula-ui'

function MyComponent() {
  const { locale, direction, getMessage } = useLocale()
  
  return (
    <div dir={direction}>
      {getMessage('common.submit')}
    </div>
  )
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
