import { Button, toast } from '../../../../nebula/components'
import { Section } from './Section'

export function VariantsSection() {
  return (
    <Section
      title="Variants"
      description="Different toast variants for various types of notifications."
    >
      <div className="space-y-4">
        <div className="flex gap-4 flex-wrap">
          <Button onClick={() => toast.show({
            title: "Default Toast",
            children: "This is a default toast notification."
          })}>
            Default
          </Button>
          <Button onClick={() => toast.success("Success Toast", "Operation completed successfully!")}>
            Success
          </Button>
          <Button onClick={() => toast.warning("Warning Toast", "Please check your input.")}>
            Warning
          </Button>
          <Button onClick={() => toast.error("Error Toast", "Something went wrong.")}>
            Error
          </Button>
          <Button onClick={() => toast.info("Info Toast", "Here's some helpful information.")}>
            Info
          </Button>
        </div>
      </div>
    </Section>
  )
}
