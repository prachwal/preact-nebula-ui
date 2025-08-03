import { Container } from '@/components';

export function SizesSection() {
  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Container Sizes</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8">
          Different container sizes for various layout needs.
        </p>
        
        <div class="space-y-6">
          {[
            { size: 'sm' as const, description: 'Small container for compact layouts' },
            { size: 'md' as const, description: 'Medium container for general use' },
            { size: 'lg' as const, description: 'Large container for spacious layouts' },
            { size: 'xl' as const, description: 'Extra large container for wide content' }
          ].map(({ size, description }) => (
            <div key={size} class="space-y-2">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">{size.toUpperCase()} Container</h3>
              <Container size={size} className="bg-blue-100 dark:bg-blue-900 border border-blue-200 dark:border-blue-800">
                <div class="p-4 text-center text-blue-800 dark:text-blue-200">
                  {size.toUpperCase()} Container Content
                </div>
              </Container>
              <p class="text-sm text-gray-500 dark:text-gray-400">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
