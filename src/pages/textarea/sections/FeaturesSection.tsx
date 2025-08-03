import { Textarea, Label } from '@/components';

export function FeaturesSection() {
  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Textarea Features</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8">
          Advanced features like resizing, character limits, and auto-growing.
        </p>
        
        <div class="space-y-6 max-w-md">
          <div class="space-y-2">
            <Label>Auto-resizing</Label>
            <Textarea 
              placeholder="This textarea grows as you type..." 
              rows={2}
            />
          </div>

          <div class="space-y-2">
            <Label>Character Limit</Label>
            <Textarea 
              placeholder="Maximum 100 characters..."
              maxLength={100}
              rows={3}
            />
          </div>

          <div class="space-y-2">
            <Label>No Resize</Label>
            <Textarea 
              placeholder="Fixed size textarea"
              rows={3}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
