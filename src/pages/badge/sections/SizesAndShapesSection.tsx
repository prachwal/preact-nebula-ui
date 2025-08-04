import { Badge } from '@/components';

export function SizesAndShapesSection() {
  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Sizes and Shapes</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8">
          Different sizes and shapes for various design needs.
        </p>

        <div class="space-y-8">
          {/* Sizes */}
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Badge Sizes</h3>
            <div class="flex items-center space-x-6">
              {[
                { size: 'sm' as const, label: 'Small' },
                { size: 'md' as const, label: 'Medium' },
                { size: 'lg' as const, label: 'Large' }
              ].map(({ size, label }) => (
                <div key={size} class="text-center space-y-2">
                  <Badge size={size} variant="primary">{label}</Badge>
                  <p class="text-xs text-gray-500 dark:text-gray-400">{size}</p>
                </div>
              ))}
            </div>

            <div class="mt-4">
              <h4 class="text-md font-medium text-gray-900 dark:text-white mb-2">Dot Sizes</h4>
              <div class="flex items-center space-x-6">
                {[
                  { size: 'sm' as const, label: 'Small' },
                  { size: 'md' as const, label: 'Medium' },
                  { size: 'lg' as const, label: 'Large' }
                ].map(({ size, label }) => (
                  <div key={size} class="text-center space-y-2">
                    <Badge size={size} variant="primary" dot />
                    <p class="text-xs text-gray-500 dark:text-gray-400">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Shapes */}
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Badge Shapes</h3>
            <div class="flex items-center space-x-6">
              {[
                { shape: 'rounded' as const, label: 'Rounded' },
                { shape: 'pill' as const, label: 'Pill' },
                { shape: 'square' as const, label: 'Square' }
              ].map(({ shape, label }) => (
                <div key={shape} class="text-center space-y-2">
                  <Badge shape={shape} variant="primary">{label}</Badge>
                  <p class="text-xs text-gray-500 dark:text-gray-400">{shape}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
