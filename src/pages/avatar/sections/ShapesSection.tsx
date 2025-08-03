import { Avatar } from '@/components';

export function ShapesSection() {
  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Avatar Shapes</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8">
          Different shape variants for various design styles and branding needs.
        </p>
        
        <div class="space-y-8">
          {[
            { shape: 'circle' as const, description: 'Circular - classic avatar style, most common' },
            { shape: 'rounded' as const, description: 'Rounded corners - modern, friendly appearance' },
            { shape: 'square' as const, description: 'Square - sharp, professional look' }
          ].map(({ shape, description }) => (
            <div key={shape} class="space-y-4">
              <div>
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">{shape.charAt(0).toUpperCase() + shape.slice(1)} Shape</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">{description}</p>
              </div>
              
              <div class="flex items-center gap-6">
                {['sm', 'md', 'lg'].map(size => (
                  <div key={size} class="text-center">
                    <Avatar 
                      size={size as any}
                      shape={shape}
                      name="Jane Smith"
                      className="mb-2"
                    />
                    <Avatar 
                      size={size as any}
                      shape={shape}
                      src="https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face"
                      alt="User Avatar"
                    />
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">{size.toUpperCase()}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
