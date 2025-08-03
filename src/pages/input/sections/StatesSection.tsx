import { Input, Label, FieldError } from '@/components';

export function StatesSection() {
  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Input States</h2>
        
        <div class="space-y-6 max-w-md">
          <div class="space-y-2">
            <Label>Normal State</Label>
            <Input placeholder="Normal input" />
          </div>

          <div class="space-y-2">
            <Label>Disabled State</Label>
            <Input placeholder="Disabled input" disabled />
          </div>

          <div class="space-y-2">
            <Label>Required Field</Label>
            <Input placeholder="Required input" required />
          </div>

          <div class="space-y-2">
            <Label>With Helper Text</Label>
            <Input placeholder="Input with helper" helperText="This is helper text to guide the user" />
          </div>

          <div class="space-y-2">
            <Label>Invalid State</Label>
            <Input placeholder="Invalid input" isInvalid />
            <FieldError>This field contains an error</FieldError>
          </div>

          <div class="space-y-2">
            <Label>Valid State</Label>
            <Input placeholder="Valid input" isValid value="valid@example.com" />
          </div>
        </div>
      </div>
    </div>
  );
}
