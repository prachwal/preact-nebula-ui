import { useState } from 'preact/hooks'
import { Button, Toast } from '../../../../nebula/components'
import { Section } from './Section'

export function SizesSection() {
  const [visibleSizes, setVisibleSizes] = useState<Record<string, boolean>>({})

  const toggleSize = (size: string) => {
    setVisibleSizes(prev => ({
      ...prev,
      [size]: !prev[size]
    }))
  }

  return (
    <Section
      title="Sizes"
      description="Different toast sizes for various content lengths."
    >
      <div className="space-y-4">
        <div className="flex gap-4">
          <Button onClick={() => toggleSize('sm')}>Small</Button>
          <Button onClick={() => toggleSize('md')}>Medium</Button>
          <Button onClick={() => toggleSize('lg')}>Large</Button>
        </div>
        
        {visibleSizes.sm && (
          <Toast
            title="Small Toast"
            size="sm"
            onDismiss={() => toggleSize('sm')}
          >
            Compact notification.
          </Toast>
        )}
        {visibleSizes.md && (
          <Toast
            title="Medium Toast"
            size="md"
            onDismiss={() => toggleSize('md')}
          >
            Standard notification with moderate content.
          </Toast>
        )}
        {visibleSizes.lg && (
          <Toast
            title="Large Toast"
            size="lg"
            onDismiss={() => toggleSize('lg')}
          >
            Extended notification with more detailed content and longer descriptions.
          </Toast>
        )}
      </div>
    </Section>
  )
}
