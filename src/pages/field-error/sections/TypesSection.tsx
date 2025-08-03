import { FieldError, Input, Textarea, Label } from '@/components'

export function TypesSection() {
  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Different Error Types</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8">
          Various categories of validation errors with appropriate messaging.
        </p>

        <div class="space-y-8">
          {/* Required Field Errors */}
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Required Field Errors</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label required>First Name</Label>
                <Input className="mt-1 border-red-500 focus:border-red-500 focus:ring-red-500" />
                <FieldError>First name is required</FieldError>
              </div>

              <div>
                <Label required>Email Address</Label>
                <Input type="email" className="mt-1 border-red-500 focus:border-red-500 focus:ring-red-500" />
                <FieldError>Email address is required</FieldError>
              </div>

              <div>
                <Label required>Message</Label>
                <Textarea rows={3} className="mt-1 border-red-500 focus:border-red-500 focus:ring-red-500" />
                <FieldError>Please enter your message</FieldError>
              </div>

              <div>
                <Label required>Terms Agreement</Label>
                <div class="mt-1 flex items-center gap-2">
                  <input type="checkbox" class="border-red-500" />
                  <span class="text-sm text-gray-700 dark:text-gray-300">I agree to the terms</span>
                </div>
                <FieldError>You must agree to the terms and conditions</FieldError>
              </div>
            </div>
          </div>

          {/* Format Validation Errors */}
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Format Validation Errors</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Email</Label>
                <Input type="email" value="invalid-email" className="mt-1 border-red-500 focus:border-red-500 focus:ring-red-500" />
                <FieldError>Please enter a valid email address (e.g., user@example.com)</FieldError>
              </div>

              <div>
                <Label>Phone</Label>
                <Input type="tel" value="123" className="mt-1 border-red-500 focus:border-red-500 focus:ring-red-500" />
                <FieldError>Phone number must be in format: +1 (555) 123-4567</FieldError>
              </div>

              <div>
                <Label>ZIP Code</Label>
                <Input value="1234" className="mt-1 border-red-500 focus:border-red-500 focus:ring-red-500" />
                <FieldError>ZIP code must be 5 digits (e.g., 12345)</FieldError>
              </div>

              <div>
                <Label>Social Security Number</Label>
                <Input value="123-45-678" className="mt-1 border-red-500 focus:border-red-500 focus:ring-red-500" />
                <FieldError>SSN must be in format: 123-45-6789</FieldError>
              </div>
            </div>
          </div>

          {/* Length Validation Errors */}
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Length Validation Errors</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Username</Label>
                <Input value="ab" className="mt-1 border-red-500 focus:border-red-500 focus:ring-red-500" />
                <FieldError>Username must be at least 3 characters long</FieldError>
              </div>

              <div>
                <Label>Password</Label>
                <Input type="password" value="1234" className="mt-1 border-red-500 focus:border-red-500 focus:ring-red-500" />
                <FieldError>Password must be at least 8 characters long</FieldError>
              </div>

              <div>
                <Label>Tweet</Label>
                <Textarea rows={3} value="This is a really long message that exceeds the maximum character limit for a tweet and should show an error message about being too long." className="mt-1 border-red-500 focus:border-red-500 focus:ring-red-500" />
                <FieldError>Message cannot exceed 280 characters (currently 142)</FieldError>
              </div>

              <div>
                <Label>Bio</Label>
                <Textarea rows={2} value="Hi" className="mt-1 border-red-500 focus:border-red-500 focus:ring-red-500" />
                <FieldError>Bio must be at least 10 characters long</FieldError>
              </div>
            </div>
          </div>

          {/* Business Logic Errors */}
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Business Logic Errors</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Username</Label>
                <Input value="admin" className="mt-1 border-red-500 focus:border-red-500 focus:ring-red-500" />
                <FieldError>This username is already taken</FieldError>
              </div>

              <div>
                <Label>Email</Label>
                <Input type="email" value="user@example.com" className="mt-1 border-red-500 focus:border-red-500 focus:ring-red-500" />
                <FieldError>An account with this email already exists</FieldError>
              </div>

              <div>
                <Label>Age</Label>
                <Input type="number" value="12" className="mt-1 border-red-500 focus:border-red-500 focus:ring-red-500" />
                <FieldError>You must be at least 18 years old to register</FieldError>
              </div>

              <div>
                <Label>Promo Code</Label>
                <Input value="EXPIRED2023" className="mt-1 border-red-500 focus:border-red-500 focus:ring-red-500" />
                <FieldError>This promo code has expired</FieldError>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
