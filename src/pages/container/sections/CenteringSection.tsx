import { Container } from '@/components';

export function CenteringSection() {
  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Container Centering</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8">
          Container centering and alignment options.
        </p>
        
        <div class="space-y-6">
          <div class="space-y-2">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Centered Container</h3>
            <Container centered className="bg-purple-100 dark:bg-purple-900 border border-purple-200 dark:border-purple-800">
              <div class="p-4 text-center text-purple-800 dark:text-purple-200">
                This container is centered on the page
              </div>
            </Container>
          </div>

          <div class="space-y-2">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Full Width Container</h3>
            <Container className="bg-orange-100 dark:bg-orange-900 border border-orange-200 dark:border-orange-800">
              <div class="p-4 text-center text-orange-800 dark:text-orange-200">
                This container spans the full width
              </div>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
}
