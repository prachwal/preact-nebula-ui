import { Input, Label, FieldError } from '@/components';

export function VariantsSection() {
  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Input Variants</h2>
        
        <div class="space-y-6 max-w-md">
          {[
            { variant: 'default' as const, label: 'Default', description: 'Standard input styling' },
            { variant: 'error' as const, label: 'Error', description: 'Error state with red border' },
            { variant: 'success' as const, label: 'Success', description: 'Success state with green border' }
          ].map(({ variant, label, description }) => (
            <div key={variant} class="space-y-2">
              <Label>{label} Input</Label>
              <Input 
                variant={variant}
                placeholder={`${label} input example`}
                value={variant === 'error' ? 'invalid@email' : variant === 'success' ? 'valid@email.com' : ''}
              />
              {variant === 'error' && <FieldError>Please enter a valid email address</FieldError>}
              <p class="text-sm text-gray-500 dark:text-gray-400">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
