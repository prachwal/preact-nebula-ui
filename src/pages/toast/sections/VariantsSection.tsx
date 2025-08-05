import { useState } from 'preact/hooks'
import { Button, Toast } from '../../../../nebula/components'
import { Section } from './Section'

export function VariantsSection() {
  const [visibleToasts, setVisibleToasts] = useState<Record<string, boolean>>({})

  const toggleToast = (variant: string) => {
    setVisibleToasts(prev => ({
      ...prev,
      [variant]: !prev[variant]
    }))
  }

  return (
    <Section
      title="Variants"
      description="Different toast variants for various types of notifications."
    >
      <div className="space-y-4">
        <div className="flex gap-4 flex-wrap">
          <Button onClick={() => toggleToast('default')}>Default</Button>
          <Button onClick={() => toggleToast('success')}>Success</Button>
          <Button onClick={() => toggleToast('warning')}>Warning</Button>
          <Button onClick={() => toggleToast('error')}>Error</Button>
          <Button onClick={() => toggleToast('info')}>Info</Button>
        </div>
        
        {visibleToasts.default && (
          <Toast title="Default Toast" onDismiss={() => toggleToast('default')}>
            This is a default toast notification.
          </Toast>
        )}
        {visibleToasts.success && (
          <Toast title="Success Toast" variant="success" onDismiss={() => toggleToast('success')}>
            Operation completed successfully!
          </Toast>
        )}
        {visibleToasts.warning && (
          <Toast title="Warning Toast" variant="warning" onDismiss={() => toggleToast('warning')}>
            Please check your input.
          </Toast>
        )}
        {visibleToasts.error && (
          <Toast title="Error Toast" variant="error" onDismiss={() => toggleToast('error')}>
            Something went wrong.
          </Toast>
        )}
        {visibleToasts.info && (
          <Toast title="Info Toast" variant="info" onDismiss={() => toggleToast('info')}>
            Here's some helpful information.
          </Toast>
        )}
      </div>
    </Section>
  )
}
