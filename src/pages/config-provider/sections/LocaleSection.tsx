import { useState } from 'preact/hooks'
import { ConfigProvider, Button, Empty } from '../../../../nebula/components'

export function LocaleSection() {
  const [currentLocale, setCurrentLocale] = useState('en-US')

  const locales = {
    'en-US': {
      locale: 'en-US',
      direction: 'ltr' as const,
      messages: {
        'button.submit': 'Submit',
        'button.cancel': 'Cancel',
        'empty.noData': 'No data available'
      }
    },
    'es-ES': {
      locale: 'es-ES', 
      direction: 'ltr' as const,
      messages: {
        'button.submit': 'Enviar',
        'button.cancel': 'Cancelar',
        'empty.noData': 'No hay datos disponibles'
      }
    },
    'ar-SA': {
      locale: 'ar-SA',
      direction: 'rtl' as const,
      messages: {
        'button.submit': 'إرسال',
        'button.cancel': 'إلغاء',
        'empty.noData': 'لا توجد بيانات متاحة'
      }
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Internationalization (i18n)
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Provide multi-language support and RTL/LTR direction control.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Locale Switching Demo
          </h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Language
            </label>
            <select
              value={currentLocale}
              onChange={(e) => setCurrentLocale((e.target as HTMLSelectElement).value)}
              className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-800"
            >
              <option value="en-US">English (US)</option>
              <option value="es-ES">Español</option>
              <option value="ar-SA">العربية</option>
            </select>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <ConfigProvider locale={locales[currentLocale as keyof typeof locales]}>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Button>{locales[currentLocale as keyof typeof locales].messages['button.submit']}</Button>
                  <Button variant="outline">{locales[currentLocale as keyof typeof locales].messages['button.cancel']}</Button>
                </div>
                <Empty description={locales[currentLocale as keyof typeof locales].messages['empty.noData']} />
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

const spanishLocale = {
  locale: 'es-ES',
  direction: 'ltr',
  messages: {
    'button.submit': 'Enviar',
    'button.cancel': 'Cancelar'
  }
}

function App() {
  return (
    <ConfigProvider locale={spanishLocale}>
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
