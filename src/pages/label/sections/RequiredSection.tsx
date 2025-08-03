import { Label, Input, Textarea } from '@/components'

export function RequiredSection() {
  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Required Field Indicators</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8">
          Clear visual indicators for required form fields with proper accessibility support.
        </p>

        <div class="space-y-8">
          {/* Required Prop */}
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Using Required Prop</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">
              The required prop automatically adds a red asterisk (*) indicator
            </p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label required>First Name</Label>
                <Input placeholder="Required field" className="mt-1" required />
              </div>

              <div>
                <Label required>Email Address</Label>
                <Input type="email" placeholder="your@email.com" className="mt-1" required />
              </div>

              <div>
                <Label required>Phone Number</Label>
                <Input type="tel" placeholder="+1 (555) 123-4567" className="mt-1" required />
              </div>

              <div>
                <Label required>Company</Label>
                <Input placeholder="Your company name" className="mt-1" required />
              </div>
            </div>
          </div>

          {/* Mixed Required/Optional */}
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Mixed Form Example</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Form with both required and optional fields
            </p>
            
            <div class="max-w-md bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <div class="space-y-4">
                <div>
                  <Label htmlFor="contact-name" required>Full Name</Label>
                  <Input id="contact-name" placeholder="John Doe" className="mt-1" required />
                </div>

                <div>
                  <Label htmlFor="contact-email" required>Email</Label>
                  <Input id="contact-email" type="email" placeholder="john@example.com" className="mt-1" required />
                </div>

                <div>
                  <Label htmlFor="contact-phone">Phone (Optional)</Label>
                  <Input id="contact-phone" type="tel" placeholder="Optional phone number" className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="contact-company">Company</Label>
                  <Input id="contact-company" placeholder="Optional company name" className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="contact-message" required>Message</Label>
                  <Textarea id="contact-message" placeholder="How can we help you?" rows={3} className="mt-1" required />
                </div>
              </div>
            </div>
          </div>

          {/* Custom Required Indicators */}
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Custom Required Indicators</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Different ways to indicate required fields
            </p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="flex items-center gap-1">
                  Username
                  <span class="text-red-500 text-sm">*</span>
                </Label>
                <Input placeholder="Required with asterisk" className="mt-1" />
              </div>

              <div>
                <Label className="flex items-center gap-2">
                  Password
                  <span class="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 text-xs px-1.5 py-0.5 rounded">
                    Required
                  </span>
                </Label>
                <Input type="password" placeholder="Required with badge" className="mt-1" />
              </div>

              <div>
                <Label className="flex items-center gap-1">
                  <span class="w-2 h-2 bg-red-500 rounded-full"></span>
                  Department
                </Label>
                <Input placeholder="Required with dot indicator" className="mt-1" />
              </div>

              <div>
                <Label>
                  <span class="border-l-2 border-red-500 pl-2">Role</span>
                </Label>
                <Input placeholder="Required with border indicator" className="mt-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
