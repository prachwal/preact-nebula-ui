import { Textarea, Label, FieldError } from '@/components';

export function VariantsSection() {
  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Textarea Variants</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8">
          Different textarea styles for various use cases and validation states.
        </p>
        
        <div class="space-y-6 max-w-md">
          {[
            { variant: 'default' as const, label: 'Default', description: 'Standard textarea styling' },
            { variant: 'error' as const, label: 'Error', description: 'Error state with red border' },
            { variant: 'success' as const, label: 'Success', description: 'Success state with green border' }
          ].map(({ variant, label, description }) => (
            <div key={variant} class="space-y-2">
              <Label>{label} Textarea</Label>
              <Textarea 
                variant={variant}
                placeholder={`${label} textarea example`}
                rows={3}
              />
              {variant === 'error' && <FieldError>Please provide more details</FieldError>}
              <p class="text-sm text-gray-500 dark:text-gray-400">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
