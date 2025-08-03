import { Textarea, Label } from '@/components';

export function ExamplesSection() {
  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Textarea Examples</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8">
          Real-world examples of textarea usage in forms and applications.
        </p>
        
        <div class="space-y-8">
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Contact Form</h3>
            <div class="max-w-md space-y-4">
              <div class="space-y-2">
                <Label>Message</Label>
                <Textarea 
                  placeholder="Tell us about your project..."
                  rows={4}
                />
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Feedback Form</h3>
            <div class="max-w-md space-y-4">
              <div class="space-y-2">
                <Label>Your Feedback</Label>
                <Textarea 
                  placeholder="What did you think about our service?"
                  rows={5}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
