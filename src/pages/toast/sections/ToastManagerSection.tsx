import { Button, useToast } from '../../../../nebula/components'
import { Section } from './Section'

export function ToastManagerSection() {
  let toast;
  try {
    toast = useToast()
  } catch (error) {
    // ToastProvider nie jest dostępny
    return (
      <Section
        title="Toast Manager"
        description="Programmatic toast management using the useToast hook."
      >
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <p className="text-yellow-800 dark:text-yellow-200">
            ⚠️ Toast Manager requires ToastProvider to be wrapped around the application.
            This section will work when ToastProvider is properly configured.
          </p>
        </div>
      </Section>
    )
  }

  return (
    <Section
      title="Toast Manager"
      description="Programmatic toast management using the useToast hook."
    >
      <div className="space-y-4">
        <div className="flex gap-4 flex-wrap">
          <Button onClick={() => toast.addToast({ title: 'Success!', variant: 'success', children: 'Operation completed successfully' })}>
            Show Success
          </Button>
          <Button onClick={() => toast.addToast({ title: 'Error!', variant: 'error', children: 'Something went wrong' })}>
            Show Error
          </Button>
          <Button onClick={() => toast.addToast({ title: 'Warning!', variant: 'warning', children: 'Please check your input' })}>
            Show Warning
          </Button>
          <Button onClick={() => toast.addToast({ title: 'Info', variant: 'info', children: 'Here is some information' })}>
            Show Info
          </Button>
        </div>
        
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h4 className="font-medium mb-2">Usage:</h4>
          <pre className="text-sm overflow-x-auto">
            <code>{`const toast = useToast()

// Show different types
toast.success('Success!', 'Operation completed')
toast.error('Error!', 'Something went wrong')
toast.warning('Warning!', 'Check your input')
toast.info('Info', 'Here is information')`}</code>
          </pre>
        </div>
      </div>
    </Section>
  )
}
