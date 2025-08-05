import { Button, toast } from '../../../../nebula/components'
import { Section } from './Section'

export function BasicUsageSection() {
  return (
    <Section
      title="Basic Usage"
      description="Toast notifications provide temporary feedback about actions or system status."
    >
      <div className="space-y-4">
        <div className="flex gap-4">
          <Button onClick={() => toast.show({
            title: "Basic Toast",
            children: "This is a basic toast notification."
          })}>
            Show Toast
          </Button>
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
