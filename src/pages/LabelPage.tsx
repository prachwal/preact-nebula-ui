import { useState } from 'preact/hooks'
import { Label, Input, Textarea } from '@/components'
import { route } from 'preact-router'

interface PageProps {
  path?: string
}

export function LabelPage(_props: PageProps) {
  const [activeDemo, setActiveDemo] = useState<'basic' | 'required' | 'sizing' | 'examples'>('basic')

  return (
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div class="flex items-center justify-between">
            <div>
              <button 
                onClick={() => route('/')}
                class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-2 inline-flex items-center"
              >
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                Back to Components
              </button>
              <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Label Component</h1>
              <p class="text-gray-600 dark:text-gray-300 mt-2">
                Form labels with required indicators and proper accessibility support
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div class="flex space-x-1 mt-6 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
            {[
              { key: 'basic', label: 'Basic Usage' },
              { key: 'required', label: 'Required Indicators' },
              { key: 'sizing', label: 'Size Variants' },
              { key: 'examples', label: 'Form Examples' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveDemo(tab.key as any)}
                class={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeDemo === tab.key
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Basic Usage */}
        {activeDemo === 'basic' && (
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
        )}

        {/* Required Indicators */}
        {activeDemo === 'required' && (
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
        )}

        {/* Size Variants */}
        {activeDemo === 'sizing' && (
          <div class="space-y-8">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Label Size Variants</h2>
              <p class="text-gray-600 dark:text-gray-300 mb-8">
                Different label sizes to match your form hierarchy and design system.
              </p>

              <div class="space-y-8">
                {/* Size Comparison */}
                <div class="space-y-6">
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Small Labels</h3>
                      <div class="space-y-3">
                        <div>
                          <Label className="text-sm">Small Label</Label>
                          <Input size="sm" placeholder="Small input" className="mt-1" />
                        </div>
                        <div>
                          <Label className="text-sm" required>Required Small</Label>
                          <Input size="sm" placeholder="Small required" className="mt-1" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Medium Labels (Default)</h3>
                      <div class="space-y-3">
                        <div>
                          <Label>Medium Label</Label>
                          <Input placeholder="Medium input" className="mt-1" />
                        </div>
                        <div>
                          <Label required>Required Medium</Label>
                          <Input placeholder="Medium required" className="mt-1" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Large Labels</h3>
                      <div class="space-y-3">
                        <div>
                          <Label className="text-lg">Large Label</Label>
                          <Input size="lg" placeholder="Large input" className="mt-1" />
                        </div>
                        <div>
                          <Label className="text-lg" required>Required Large</Label>
                          <Input size="lg" placeholder="Large required" className="mt-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Typography Hierarchy */}
                <div class="bg-gray-100 dark:bg-gray-700 p-8 rounded-lg">
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-6">Typography Hierarchy</h3>
                  <div class="space-y-6">
                    <div>
                      <Label className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        Section Title
                      </Label>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Form Subtitle
                      </Label>
                    </div>
                    
                    <div>
                      <Label className="text-base font-medium text-gray-900 dark:text-white">
                        Primary Field Label
                      </Label>
                    </div>
                    
                    <div>
                      <Label className="text-lg font-semibold text-gray-900 dark:text-white">
                        Main Section Heading
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Form Examples */}
        {activeDemo === 'examples' && (
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
        )}

      </div>
    </div>
  )
}
