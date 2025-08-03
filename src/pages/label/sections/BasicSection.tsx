import { Label, Input, Textarea } from '@/components'

export function BasicSection() {
  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Basic Label Usage</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8">
          Labels provide accessible descriptions for form inputs and maintain semantic relationships.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Simple Labels */}
          <div class="space-y-6">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Simple Labels</h3>
            
            <div class="space-y-4">
              <div>
                <Label>Name</Label>
                <Input placeholder="Enter your name" className="mt-1" />
              </div>

              <div>
                <Label>Email Address</Label>
                <Input type="email" placeholder="Enter your email" className="mt-1" />
              </div>

              <div>
                <Label>Message</Label>
                <Textarea placeholder="Enter your message" rows={3} className="mt-1" />
              </div>
            </div>
          </div>

          {/* Labels with htmlFor */}
          <div class="space-y-6">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Proper Associations</h3>
            
            <div class="space-y-4">
              <div>
                <Label htmlFor="user-name">Full Name</Label>
                <Input id="user-name" placeholder="Enter your full name" className="mt-1" />
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Label properly associated with input via htmlFor/id
                </p>
              </div>

              <div>
                <Label htmlFor="user-email">Email</Label>
                <Input id="user-email" type="email" placeholder="your@email.com" className="mt-1" />
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Click label to focus input
                </p>
              </div>

              <div>
                <Label htmlFor="user-bio">Biography</Label>
                <Textarea id="user-bio" placeholder="Tell us about yourself" rows={3} className="mt-1" />
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Semantic relationship maintained
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Different Styles */}
        <div class="mt-12 bg-gray-100 dark:bg-gray-700 p-8 rounded-lg">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-6">Label Styling</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label className="font-normal text-gray-600 dark:text-gray-400">Light Weight</Label>
              <Input placeholder="Light label style" className="mt-1" />
            </div>

            <div>
              <Label className="font-medium">Medium Weight (Default)</Label>
              <Input placeholder="Default label style" className="mt-1" />
            </div>

            <div>
              <Label className="font-semibold text-gray-900 dark:text-white">Semibold Weight</Label>
              <Input placeholder="Bold label style" className="mt-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
