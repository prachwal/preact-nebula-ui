import { Container } from '@/components';

export function CombinationsSection() {
  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Container Combinations</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8">
          Various combinations of container properties.
        </p>
        
        <div class="space-y-6">
          <div class="space-y-2">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Large Centered with Medium Padding</h3>
            <Container size="lg" centered padding="md" className="bg-red-100 dark:bg-red-900 border border-red-200 dark:border-red-800">
              <div class="bg-red-200 dark:bg-red-800 text-center text-red-800 dark:text-red-200 p-4">
                Large centered container with medium padding
              </div>
            </Container>
          </div>

          <div class="space-y-2">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Small with Large Padding</h3>
            <Container size="sm" padding="lg" className="bg-teal-100 dark:bg-teal-900 border border-teal-200 dark:border-teal-800">
              <div class="bg-teal-200 dark:bg-teal-800 text-center text-teal-800 dark:text-teal-200">
                Small container with large padding
              </div>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
}
