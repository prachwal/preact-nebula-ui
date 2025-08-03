import { Textarea, Label } from '@/components';

export function SizesSection() {
  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Textarea Sizes</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8">
          Different sizes for various textarea use cases.
        </p>
        
        <div class="space-y-6 max-w-md">
          {[
            { size: 'sm' as const, rows: 2, description: 'Small - compact forms' },
            { size: 'md' as const, rows: 3, description: 'Medium - default size' },
            { size: 'lg' as const, rows: 4, description: 'Large - more content' }
          ].map(({ size, rows, description }) => (
            <div key={size} class="space-y-2">
              <Label>{size.toUpperCase()} Textarea</Label>
              <Textarea 
                size={size}
                rows={rows}
                placeholder={`${size.toUpperCase()} textarea placeholder`}
              />
              <p class="text-sm text-gray-500 dark:text-gray-400">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
