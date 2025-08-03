import { FieldError, Input, Label } from '@/components'

export function BasicSection() {
  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Basic FieldError Usage</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8">
          Simple error messages with consistent styling and proper accessibility attributes.
        </p>

        <div class="space-y-8">
          {/* Simple Error Messages */}
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Simple Error Messages</h3>
            
            <div class="max-w-md space-y-4">
              <div>
                <Label>Username</Label>
                <Input className="mt-1 border-red-500 focus:border-red-500 focus:ring-red-500" />
                <FieldError>Username is required</FieldError>
              </div>

              <div>
                <Label>Email</Label>
                <Input type="email" className="mt-1 border-red-500 focus:border-red-500 focus:ring-red-500" />
                <FieldError>Please enter a valid email address</FieldError>
              </div>

              <div>
                <Label>Password</Label>
                <Input type="password" className="mt-1 border-red-500 focus:border-red-500 focus:ring-red-500" />
                <FieldError>Password must be at least 8 characters long</FieldError>
              </div>
            </div>
          </div>

          {/* With Icons */}
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Error Messages with Icons</h3>
            
            <div class="max-w-md space-y-4">
              <div>
                <Label>Credit Card</Label>
                <Input className="mt-1 border-red-500 focus:border-red-500 focus:ring-red-500" placeholder="1234 5678 9012 3456" />
                <FieldError className="flex items-center gap-2">
                  <svg class="w-4 h-4 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Invalid credit card number format
                </FieldError>
              </div>

              <div>
                <Label>Phone Number</Label>
                <Input type="tel" className="mt-1 border-red-500 focus:border-red-500 focus:ring-red-500" placeholder="+1 (555) 123-4567" />
                <FieldError className="flex items-center gap-2">
                  <svg class="w-4 h-4 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Please enter a valid phone number
                </FieldError>
              </div>

              <div>
                <Label>Website URL</Label>
                <Input type="url" className="mt-1 border-red-500 focus:border-red-500 focus:ring-red-500" placeholder="https://example.com" />
                <FieldError className="flex items-center gap-2">
                  <svg class="w-4 h-4 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  URL must start with http:// or https://
                </FieldError>
              </div>
            </div>
          </div>

          {/* Multiple Errors */}
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Multiple Error Messages</h3>
            
            <div class="max-w-md">
              <Label>New Password</Label>
              <Input type="password" className="mt-1 border-red-500 focus:border-red-500 focus:ring-red-500" />
              <div class="space-y-1 mt-1">
                <FieldError>Password must be at least 8 characters long</FieldError>
                <FieldError>Password must contain at least one uppercase letter</FieldError>
                <FieldError>Password must contain at least one number</FieldError>
                <FieldError>Password must contain at least one special character</FieldError>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
