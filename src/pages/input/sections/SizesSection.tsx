import { Input, Label } from '@/components';

export function SizesSection() {
  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Input Sizes</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8">
          Different sizes control padding and text size for various UI contexts.
        </p>
        
        <div class="space-y-6 max-w-md">
          {[
            { size: 'sm' as const, description: 'Small - compact forms, tight layouts' },
            { size: 'md' as const, description: 'Medium - default size, general use' },
            { size: 'lg' as const, description: 'Large - prominent forms, hero sections' }
          ].map(({ size, description }) => (
            <div key={size} class="space-y-2">
              <Label>{size.toUpperCase()} Input</Label>
              <Input 
                size={size}
                placeholder={`${size.toUpperCase()} input placeholder`}
              />
              <p class="text-sm text-gray-500 dark:text-gray-400">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
