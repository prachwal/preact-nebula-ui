import { Button } from '../../nebula'
import { Toast, ToastProvider, ToastManager, useToast, createSuccessToast, createWarningToast, createInfoToast } from '../../nebula'
import { useState } from 'preact/hooks'

interface PageProps {
  path?: string
}

const Section = ({ title, description, children }: { title: string, description: string, children: any }) => (
  <section className="mb-12">
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
    {children}
  </section>
)

const PageLayout = ({ title, description, children }: { title: string, description: string, children: any }) => (
  <div className="max-w-6xl mx-auto p-6">
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400">{description}</p>
    </div>
    {children}
  </div>
)

const BasicUsageSection = () => {
  const [showToast, setShowToast] = useState(false)

  return (
    <Section
      title="Basic Usage"
      description="Toast notifications provide temporary feedback about actions or system status."
    >
      <div className="space-y-4">
        <div className="flex gap-4">
          <Button onClick={() => setShowToast(true)}>
            Show Toast
          </Button>
          {showToast && (
            <Toast
              title="Basic Toast"
              onDismiss={() => setShowToast(false)}
            >
              This is a basic toast notification.
            </Toast>
          )}
        </div>
        
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h4 className="font-medium mb-2">Implementation:</h4>
          <pre className="text-sm overflow-x-auto">
            <code>{`<Toast
  title="Basic Toast"
  onDismiss={() => setShowToast(false)}
>
  This is a basic toast notification.
</Toast>`}</code>
          </pre>
        </div>
      </div>
    </Section>
  )
}

const VariantsSection = () => {
  const [visibleToasts, setVisibleToasts] = useState<Record<string, boolean>>({})

  const toggleToast = (variant: string) => {
    setVisibleToasts(prev => ({
      ...prev,
      [variant]: !prev[variant]
    }))
  }

  const variants = [
    { name: 'default', title: 'Default Toast', description: 'General purpose notifications' },
    { name: 'success', title: 'Success Toast', description: 'Positive feedback and confirmations' },
    { name: 'warning', title: 'Warning Toast', description: 'Important alerts and cautions' },
    { name: 'error', title: 'Error Toast', description: 'Error states and critical issues' },
    { name: 'info', title: 'Info Toast', description: 'Informational messages and tips' }
  ]

  return (
    <Section
      title="Variants"
      description="Different toast variants for various types of notifications."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {variants.map(variant => (
          <div key={variant.name} className="space-y-2">
            <Button
              variant="outline"
              onClick={() => toggleToast(variant.name)}
              className="w-full"
            >
              Show {variant.title}
            </Button>
            {visibleToasts[variant.name] && (
              <Toast
                variant={variant.name as any}
                title={variant.title}
                onDismiss={() => toggleToast(variant.name)}
              >
                {variant.description}
              </Toast>
            )}
          </div>
        ))}
      </div>
    </Section>
  )
}

const SizesSection = () => {
  const [visibleSizes, setVisibleSizes] = useState<Record<string, boolean>>({})

  const toggleSize = (size: string) => {
    setVisibleSizes(prev => ({
      ...prev,
      [size]: !prev[size]
    }))
  }

  const sizes = [
    { name: 'sm', title: 'Small Toast', description: 'Compact notifications for subtle feedback' },
    { name: 'md', title: 'Medium Toast', description: 'Standard size for most notifications' },
    { name: 'lg', title: 'Large Toast', description: 'Prominent notifications for important messages' }
  ]

  return (
    <Section
      title="Sizes"
      description="Different toast sizes for various contexts and importance levels."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sizes.map(size => (
          <div key={size.name} className="space-y-2">
            <Button
              variant="outline"
              onClick={() => toggleSize(size.name)}
              className="w-full"
            >
              Show {size.title}
            </Button>
            {visibleSizes[size.name] && (
              <Toast
                size={size.name as any}
                title={size.title}
                variant="info"
                onDismiss={() => toggleSize(size.name)}
              >
                {size.description}
              </Toast>
            )}
          </div>
        ))}
      </div>
    </Section>
  )
}

const ToastManagerExample = () => {
  const { addToast, clearToasts } = useToast()

  const showToasts = () => {
    addToast(createSuccessToast({
      title: 'Success!',
      children: 'Your action was completed successfully.',
      duration: 3000
    }))

    setTimeout(() => {
      addToast(createInfoToast({
        title: 'Information',
        children: 'Here is some additional information.',
        duration: 4000
      }))
    }, 500)

    setTimeout(() => {
      addToast(createWarningToast({
        title: 'Warning',
        children: 'Please review this important notice.',
        duration: 5000
      }))
    }, 1000)
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Button onClick={showToasts}>
          Show Multiple Toasts
        </Button>
        <Button variant="outline" onClick={clearToasts}>
          Clear All Toasts
        </Button>
      </div>
    </div>
  )
}

const ToastManagerSection = () => {
  return (
    <Section
      title="Toast Manager & Context"
      description="Use ToastProvider and ToastManager for application-wide toast notifications."
    >
      <div className="space-y-6">
        <ToastManagerExample />
        
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h4 className="font-medium mb-2">Setup Toast Provider:</h4>
          <pre className="text-sm overflow-x-auto">
            <code>{`// In your app root
<ToastProvider>
  <App />
  <ToastManager position="top-right" />
</ToastProvider>

// Use in components
const { addToast } = useToast()

addToast(createSuccessToast({
  title: 'Success!',
  children: 'Action completed',
  duration: 3000
}))`}</code>
          </pre>
        </div>
      </div>
    </Section>
  )
}

const FeaturesSection = () => {
  const [features, setFeatures] = useState<Record<string, boolean>>({})

  const toggleFeature = (feature: string) => {
    setFeatures(prev => ({
      ...prev,
      [feature]: !prev[feature]
    }))
  }

  return (
    <Section
      title="Advanced Features"
      description="Toast notifications with custom icons, actions, and configurations."
    >
      <div className="space-y-6">
        {/* Auto-dismiss */}
        <div className="space-y-2">
          <h4 className="font-medium">Auto-dismiss Control</h4>
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => toggleFeature('autoDismiss')}
            >
              Non-dismissible Toast (Duration: 0)
            </Button>
            <Button
              variant="outline"
              onClick={() => toggleFeature('quickDismiss')}
            >
              Quick Dismiss (1s)
            </Button>
          </div>
          {features.autoDismiss && (
            <Toast
              title="Permanent Toast"
              duration={0}
              variant="warning"
              onDismiss={() => toggleFeature('autoDismiss')}
            >
              This toast won't auto-dismiss. Click the X to close.
            </Toast>
          )}
          {features.quickDismiss && (
            <Toast
              title="Quick Toast"
              duration={1000}
              variant="info"
              onDismiss={() => toggleFeature('quickDismiss')}
            >
              This toast will disappear in 1 second!
            </Toast>
          )}
        </div>

        {/* Custom Icons */}
        <div className="space-y-2">
          <h4 className="font-medium">Custom Icons</h4>
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => toggleFeature('customIcon')}
            >
              Custom Icon Toast
            </Button>
            <Button
              variant="outline"
              onClick={() => toggleFeature('noIcon')}
            >
              No Icon Toast
            </Button>
          </div>
          {features.customIcon && (
            <Toast
              title="Custom Icon"
              icon={<span className="text-2xl">🚀</span>}
              variant="success"
              onDismiss={() => toggleFeature('customIcon')}
            >
              This toast has a custom rocket icon!
            </Toast>
          )}
          {features.noIcon && (
            <Toast
              title="No Icon"
              icon={false}
              variant="info"
              onDismiss={() => toggleFeature('noIcon')}
            >
              This toast has no icon at all.
            </Toast>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <h4 className="font-medium">Action Buttons</h4>
          <Button
            variant="outline"
            onClick={() => toggleFeature('actions')}
          >
            Toast with Actions
          </Button>
          {features.actions && (
            <Toast
              title="Confirm Action"
              variant="warning"
              actions={
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    Cancel
                  </Button>
                  <Button size="sm">
                    Confirm
                  </Button>
                </div>
              }
              onDismiss={() => toggleFeature('actions')}
            >
              Are you sure you want to delete this item?
            </Toast>
          )}
        </div>

        {/* Complex Content */}
        <div className="space-y-2">
          <h4 className="font-medium">Rich Content</h4>
          <Button
            variant="outline"
            onClick={() => toggleFeature('richContent')}
          >
            Rich Content Toast
          </Button>
          {features.richContent && (
            <Toast
              title="Update Available"
              variant="info"
              onDismiss={() => toggleFeature('richContent')}
            >
              <div>
                <p className="mb-2">A new version of the app is available.</p>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>Bug fixes and improvements</li>
                  <li>New features and components</li>
                  <li>Performance optimizations</li>
                </ul>
              </div>
            </Toast>
          )}
        </div>
      </div>
    </Section>
  )
}

const AccessibilitySection = () => {
  const [accessibilityToast, setAccessibilityToast] = useState(false)

  return (
    <Section
      title="Accessibility"
      description="Toast notifications with comprehensive accessibility support."
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-2">Accessibility Features:</h4>
            <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
              <li>• ARIA live regions for screen readers</li>
              <li>• Keyboard navigation support (ESC to dismiss)</li>
              <li>• Proper focus management</li>
              <li>• Semantic HTML structure</li>
              <li>• High contrast color support</li>
              <li>• Dismissible with keyboard and mouse</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">ARIA Attributes:</h4>
            <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
              <li>• <code>role="alert"</code> for immediate attention</li>
              <li>• <code>aria-live="assertive"</code> for errors</li>
              <li>• <code>aria-live="polite"</code> for other variants</li>
              <li>• <code>aria-atomic="true"</code> for complete announcement</li>
              <li>• <code>aria-label</code> on dismiss button</li>
            </ul>
          </div>
        </div>

        <div className="flex gap-4">
          <Button onClick={() => setAccessibilityToast(true)}>
            Test Accessibility Toast
          </Button>
        </div>

        {accessibilityToast && (
          <Toast
            title="Accessibility Test"
            variant="error"
            onDismiss={() => setAccessibilityToast(false)}
          >
            This error toast will be announced assertively to screen readers. 
            Press ESC to dismiss with keyboard.
          </Toast>
        )}
      </div>
    </Section>
  )
}

const PropsSection = () => {
  return (
    <Section
      title="Props Reference"
      description="Complete reference for Toast component properties."
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
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">'default' | 'success' | 'warning' | 'error' | 'info'</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">'default'</td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Visual style and semantic meaning</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">size</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">'sm' | 'md' | 'lg'</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">'md'</td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Size of the toast notification</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">title</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">string</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">-</td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Title of the toast notification</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">dismissible</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">boolean</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">true</td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Whether the toast can be manually dismissed</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">duration</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">number</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">5000</td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Auto-dismiss duration in milliseconds (0 = no auto-dismiss)</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">icon</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">ReactNode | boolean</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">true</td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Custom icon or false to hide icon</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">actions</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">ReactNode</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">-</td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Action elements (buttons, links, etc.)</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">onDismiss</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{'() => void'}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">-</td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Callback fired when toast is dismissed</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-gray-100">isOpen</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">boolean</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">true</td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Whether the toast is currently visible</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Section>
  )
}

const ToastPageContent = () => {
  return (
    <PageLayout
      title="Toast"
      description="Temporary notification components that provide feedback about actions or system status with auto-dismiss functionality and rich content support."
    >
      <BasicUsageSection />
      <VariantsSection />
      <SizesSection />
      <ToastManagerSection />
      <FeaturesSection />
      <AccessibilitySection />
      <PropsSection />
    </PageLayout>
  )
}

export const ToastPage = (_props: PageProps) => {
  return (
    <ToastProvider defaultPosition="top-right" maxToasts={5}>
      <ToastPageContent />
      <ToastManager />
    </ToastProvider>
  )
}
