import { Textarea, Label, FieldError } from '@/components';

export function StatesSection() {
  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Textarea States</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8">
          Different states and interactions for textarea components.
        </p>
        
        <div class="space-y-6 max-w-md">
          <div class="space-y-2">
            <Label>Normal State</Label>
            <Textarea placeholder="Normal textarea" rows={3} />
          </div>

          <div class="space-y-2">
            <Label>Disabled State</Label>
            <Textarea placeholder="Disabled textarea" disabled rows={3} />
          </div>

          <div class="space-y-2">
            <Label>Required Field</Label>
            <Textarea placeholder="Required textarea" required rows={3} />
          </div>

          <div class="space-y-2">
            <Label>Invalid State</Label>
            <Textarea placeholder="Invalid textarea" isInvalid rows={3} />
            <FieldError>This field contains an error</FieldError>
          </div>
        </div>
      </div>
    </div>
  );
}
