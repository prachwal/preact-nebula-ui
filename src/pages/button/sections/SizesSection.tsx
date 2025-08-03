import { Button } from '@/components'

interface SizesSectionProps {
  onButtonClick: () => void
}

export function SizesSection({ onButtonClick }: SizesSectionProps) {
  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Button Sizes</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8">
          Different sizes control padding and text size. Buttons scale from small to extra large.
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { size: 'sm' as const, padding: 'px-2.5 py-1', textSize: 'text-sm', description: 'Small button for compact layouts' },
            { size: 'md' as const, padding: 'px-4 py-2', textSize: 'text-base', description: 'Medium button (default)' },
            { size: 'lg' as const, padding: 'px-6 py-3.5', textSize: 'text-lg', description: 'Large button for prominence' },
            { size: 'xl' as const, padding: 'px-8 py-5', textSize: 'text-xl', description: 'Extra large for hero sections' }
          ].map(({ size, padding, textSize, description }) => (
            <div key={size} class="space-y-4">
              <div>
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                  size="{size}"
                </h3>
                <div class="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                  <div>Padding: {padding}</div>
                  <div>Text: {textSize}</div>
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-300 mt-2">{description}</p>
              </div>
              
              <div class="space-y-3">
                <Button size={size} onClick={onButtonClick}>
                  {size.toUpperCase()} Button
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Size comparison */}
        <div class="mt-12 bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-6">Size Comparison</h3>
          <div class="flex flex-wrap items-end gap-4">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">Extra Large</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
