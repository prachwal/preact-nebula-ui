import { Label, Input, Textarea } from '@/components'

export function ExamplesSection() {
  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Complete Form Examples</h2>
        
        <div class="space-y-12">
          {/* Registration Form */}
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">User Registration Form</h3>
            <div class="max-w-md bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <div class="space-y-4">
                <div class="text-center mb-6">
                  <h4 class="text-xl font-semibold text-gray-900 dark:text-white">Create Account</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Fill in the required information</p>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="reg-first" required>First Name</Label>
                    <Input id="reg-first" placeholder="John" className="mt-1" required />
                  </div>
                  <div>
                    <Label htmlFor="reg-last" required>Last Name</Label>
                    <Input id="reg-last" placeholder="Doe" className="mt-1" required />
                  </div>
                </div>

                <div>
                  <Label htmlFor="reg-email" required>Email Address</Label>
                  <Input id="reg-email" type="email" placeholder="john@example.com" className="mt-1" required />
                </div>

                <div>
                  <Label htmlFor="reg-username" required>Username</Label>
                  <Input id="reg-username" placeholder="johndoe" className="mt-1" required />
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Must be unique</p>
                </div>

                <div>
                  <Label htmlFor="reg-password" required>Password</Label>
                  <Input id="reg-password" type="password" placeholder="••••••••" className="mt-1" required />
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">At least 8 characters</p>
                </div>

                <div>
                  <Label htmlFor="reg-phone">Phone Number</Label>
                  <Input id="reg-phone" type="tel" placeholder="+1 (555) 123-4567" className="mt-1" />
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Optional for account recovery</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Contact Form</h3>
            <div class="max-w-2xl bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <div class="space-y-4">
                <div class="text-center mb-6">
                  <h4 class="text-xl font-semibold text-gray-900 dark:text-white">Get in Touch</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">We'd love to hear from you</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contact-name" required>Name</Label>
                    <Input id="contact-name" placeholder="Your full name" className="mt-1" required />
                  </div>
                  <div>
                    <Label htmlFor="contact-email" required>Email</Label>
                    <Input id="contact-email" type="email" placeholder="your@email.com" className="mt-1" required />
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contact-company">Company</Label>
                    <Input id="contact-company" placeholder="Your company" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="contact-subject" required>Subject</Label>
                    <Input id="contact-subject" placeholder="What's this about?" className="mt-1" required />
                  </div>
                </div>

                <div>
                  <Label htmlFor="contact-message" required>Message</Label>
                  <Textarea id="contact-message" placeholder="Tell us more about your inquiry..." rows={4} className="mt-1" required />
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Please be as detailed as possible</p>
                </div>

                <div class="flex items-center gap-2">
                  <input type="checkbox" id="contact-newsletter" class="rounded" />
                  <Label htmlFor="contact-newsletter" className="text-sm">
                    Subscribe to our newsletter for updates
                  </Label>
                </div>
              </div>
            </div>
          </div>

          {/* Settings Form */}
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">User Settings Form</h3>
            <div class="max-w-lg bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <div class="space-y-6">
                <div>
                  <Label className="text-lg font-semibold text-gray-900 dark:text-white">Profile Information</Label>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Update your account details</p>
                </div>

                <div class="space-y-4">
                  <div>
                    <Label htmlFor="settings-display" required>Display Name</Label>
                    <Input id="settings-display" placeholder="How others see you" className="mt-1" required />
                  </div>

                  <div>
                    <Label htmlFor="settings-bio">Bio</Label>
                    <Textarea id="settings-bio" placeholder="Tell others about yourself..." rows={3} className="mt-1" />
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Max 160 characters</p>
                  </div>

                  <div>
                    <Label htmlFor="settings-location">Location</Label>
                    <Input id="settings-location" placeholder="City, Country" className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="settings-website">Website</Label>
                    <Input id="settings-website" type="url" placeholder="https://yourwebsite.com" className="mt-1" />
                  </div>
                </div>

                <div class="border-t border-gray-200 dark:border-gray-600 pt-4">
                  <Label className="text-lg font-semibold text-gray-900 dark:text-white">Preferences</Label>
                  <div class="mt-3 space-y-3">
                    <div class="flex items-center gap-2">
                      <input type="checkbox" id="settings-notifications" class="rounded" />
                      <Label htmlFor="settings-notifications" className="text-sm">
                        Email notifications
                      </Label>
                    </div>
                    <div class="flex items-center gap-2">
                      <input type="checkbox" id="settings-marketing" class="rounded" />
                      <Label htmlFor="settings-marketing" className="text-sm">
                        Marketing communications
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
