import { Button, toast } from '../../../../nebula/components'
import { Section } from './Section'

export function SizesSection() {
  return (
    <Section
      title="Sizes"
      description="Different toast sizes for various content lengths."
    >
      <div className="space-y-4">
        <div className="flex gap-4">
          <Button onClick={() => toast.show({
            title: "Small Toast",
            size: "sm",
            children: "Compact notification"
          })}>
            Small
          </Button>
          <Button onClick={() => toast.show({
            title: "Medium Toast",
            size: "md",
            children: "Standard notification with more content"
          })}>
            Medium
          </Button>
          <Button onClick={() => toast.show({
            title: "Large Toast",
            size: "lg",
            children: "Larger notification with even more detailed content for complex messages"
          })}>
            Large
          </Button>
        </div>
      </div>
    </Section>
  )
}
