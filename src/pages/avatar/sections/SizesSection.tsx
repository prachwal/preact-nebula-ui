import { Avatar } from '@/components';

export function SizesSection() {
  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Avatar Sizes</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8">
          Different avatar sizes for various UI contexts and hierarchies.
        </p>
        
        <div class="space-y-6">
          {[
            { size: 'xs' as const, description: 'Extra small - for compact lists or inline content' },
            { size: 'sm' as const, description: 'Small - for sidebar navigation or tight layouts' },
            { size: 'md' as const, description: 'Medium - default size for most use cases' },
            { size: 'lg' as const, description: 'Large - for user profiles or emphasized content' },
            { size: 'xl' as const, description: 'Extra large - for profile headers or hero sections' },
            { size: '2xl' as const, description: '2X Large - for featured profiles or landing pages' }
          ].map(({ size, description }) => (
            <div key={size} class="flex items-center gap-4">
              <Avatar 
                size={size} 
                name="John Doe" 
                className="flex-shrink-0"
              />
              <Avatar 
                size={size} 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                alt="User Avatar"
                className="flex-shrink-0"
              />
              <div class="flex-1">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">{size.toUpperCase()} Avatar</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
