import { Container } from '@/components';

export function PaddingSection() {
  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Container Padding</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8">
          Different padding options for container spacing.
        </p>
        
        <div class="space-y-6">
          {[
            { padding: 'none' as const, description: 'No padding' },
            { padding: 'sm' as const, description: 'Small padding' },
            { padding: 'md' as const, description: 'Medium padding' },
            { padding: 'lg' as const, description: 'Large padding' }
          ].map(({ padding, description }) => (
            <div key={padding} class="space-y-2">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">{padding.toUpperCase()} Padding</h3>
              <Container padding={padding} className="bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-800">
                <div class="bg-green-200 dark:bg-green-800 text-center text-green-800 dark:text-green-200">
                  Container with {padding} padding
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
