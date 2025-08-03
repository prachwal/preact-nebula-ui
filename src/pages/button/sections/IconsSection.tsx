import { Button } from '@/components'

interface IconsSectionProps {
  onButtonClick: () => void
}

export function IconsSection({ onButtonClick }: IconsSectionProps) {
  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Buttons with Icons</h2>
        
        <div class="space-y-8">
          {/* Left Icon */}
          <div class="space-y-4">
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">Left Icon</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">Icon appears on the left side of text</p>
            </div>
            
            <div class="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
              <div class="flex flex-wrap gap-4">
                <Button 
                  leftIcon={
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                  }
                  onClick={onButtonClick}
                >
                  Add Item
                </Button>
                
                <Button 
                  variant="secondary"
                  leftIcon={
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  }
                  onClick={onButtonClick}
                >
                  Like
                </Button>

                <Button 
                  variant="outline"
                  leftIcon={
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                    </svg>
                  }
                  onClick={onButtonClick}
                >
                  Download
                </Button>
              </div>
            </div>
          </div>

          {/* Right Icon */}
          <div class="space-y-4">
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">Right Icon</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">Icon appears on the right side of text</p>
            </div>
            
            <div class="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
              <div class="flex flex-wrap gap-4">
                <Button 
                  rightIcon={
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  }
                  onClick={onButtonClick}
                >
                  Next Step
                </Button>
                
                <Button 
                  variant="secondary"
                  rightIcon={
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  }
                  onClick={onButtonClick}
                >
                  Open Link
                </Button>

                <Button 
                  variant="ghost"
                  rightIcon={
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  }
                  onClick={onButtonClick}
                >
                  Show More
                </Button>
              </div>
            </div>
          </div>

          {/* Icon sizes with button sizes */}
          <div class="space-y-4">
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">Icons with Different Button Sizes</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">Icons scale appropriately with button size</p>
            </div>
            
            <div class="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
              <div class="flex flex-wrap items-end gap-4">
                {['sm', 'md', 'lg', 'xl'].map(size => (
                  <Button 
                    key={size}
                    size={size as any}
                    leftIcon={
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                    }
                    onClick={onButtonClick}
                  >
                    {size.toUpperCase()}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
