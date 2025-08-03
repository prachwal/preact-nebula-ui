import { useState } from 'preact/hooks'
import { FieldError, Input, Textarea, Label } from '@/components'
import { route } from 'preact-router'

interface PageProps {
  path?: string
}

export function FieldErrorPage(_props: PageProps) {
  const [activeDemo, setActiveDemo] = useState<'basic' | 'types' | 'integration' | 'examples'>('basic')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const validateEmail = (email: string) => {
    if (!email) return 'Email is required'
    if (!/\S+@\S+\.\S+/.test(email)) return 'Please enter a valid email address'
    return null
  }

  const validatePassword = (password: string) => {
    if (!password) return 'Password is required'
    if (password.length < 8) return 'Password must be at least 8 characters long'
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) return 'Password must contain uppercase, lowercase, and number'
    return null
  }

  const validateConfirmPassword = (password: string, confirmPassword: string) => {
    if (!confirmPassword) return 'Please confirm your password'
    if (password !== confirmPassword) return 'Passwords do not match'
    return null
  }

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
              <h1 class="text-3xl font-bold text-gray-900 dark:text-white">FieldError Component</h1>
              <p class="text-gray-600 dark:text-gray-300 mt-2">
                Error message display for forms with consistent styling and accessibility support
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div class="flex space-x-1 mt-6 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
            {[
              { key: 'basic', label: 'Basic Usage' },
              { key: 'types', label: 'Error Types' },
              { key: 'integration', label: 'Form Integration' },
              { key: 'examples', label: 'Real Examples' }
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
        )}

        {/* Error Types */}
        {activeDemo === 'types' && (
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
        )}

        {/* Form Integration */}
        {activeDemo === 'integration' && (
          <div class="space-y-8">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Form Integration</h2>
              <p class="text-gray-600 dark:text-gray-300 mb-8">
                Real-time validation with dynamic error messages and form state management.
              </p>

              <div class="space-y-8">
                {/* Live Validation Form */}
                <div class="space-y-4">
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">Live Validation Example</h3>
                  
                  <div class="max-w-md bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                    <div class="space-y-4">
                      <div>
                        <Label htmlFor="live-email" required>Email Address</Label>
                        <Input 
                          id="live-email"
                          type="email" 
                          value={email}
                          onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
                          className={`mt-1 ${validateEmail(email) ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : email ? 'border-green-500 focus:border-green-500 focus:ring-green-500' : ''}`}
                          placeholder="your@email.com"
                        />
                        {validateEmail(email) && <FieldError>{validateEmail(email)}</FieldError>}
                        {email && !validateEmail(email) && (
                          <p class="text-sm text-green-600 dark:text-green-400 mt-1 flex items-center gap-1">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Valid email address
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="live-password" required>Password</Label>
                        <Input 
                          id="live-password"
                          type="password" 
                          value={password}
                          onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
                          className={`mt-1 ${validatePassword(password) ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : password ? 'border-green-500 focus:border-green-500 focus:ring-green-500' : ''}`}
                          placeholder="Enter password"
                        />
                        {validatePassword(password) && <FieldError>{validatePassword(password)}</FieldError>}
                        {password && !validatePassword(password) && (
                          <p class="text-sm text-green-600 dark:text-green-400 mt-1 flex items-center gap-1">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Strong password
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="live-confirm" required>Confirm Password</Label>
                        <Input 
                          id="live-confirm"
                          type="password" 
                          value={confirmPassword}
                          onInput={(e) => setConfirmPassword((e.target as HTMLInputElement).value)}
                          className={`mt-1 ${validateConfirmPassword(password, confirmPassword) ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : confirmPassword ? 'border-green-500 focus:border-green-500 focus:ring-green-500' : ''}`}
                          placeholder="Confirm password"
                        />
                        {validateConfirmPassword(password, confirmPassword) && <FieldError>{validateConfirmPassword(password, confirmPassword)}</FieldError>}
                        {confirmPassword && !validateConfirmPassword(password, confirmPassword) && (
                          <p class="text-sm text-green-600 dark:text-green-400 mt-1 flex items-center gap-1">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Passwords match
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Server-side Validation */}
                <div class="space-y-4">
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">Server-side Validation Errors</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-300">
                    Examples of errors returned from API validation
                  </p>
                  
                  <div class="max-w-md bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                    <div class="space-y-4">
                      <div>
                        <Label>Username</Label>
                        <Input value="john_doe" className="mt-1 border-red-500 focus:border-red-500 focus:ring-red-500" />
                        <FieldError>Username "john_doe" is already taken. Try "john_doe2" or "john.doe"</FieldError>
                      </div>

                      <div>
                        <Label>Email</Label>
                        <Input type="email" value="user@tempmail.com" className="mt-1 border-red-500 focus:border-red-500 focus:ring-red-500" />
                        <FieldError>Temporary email addresses are not allowed</FieldError>
                      </div>

                      <div>
                        <Label>Payment Method</Label>
                        <Input value="4000 0000 0000 0002" className="mt-1 border-red-500 focus:border-red-500 focus:ring-red-500" />
                        <FieldError>Your card was declined. Please try a different payment method</FieldError>
                      </div>

                      <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                        <div class="flex items-start gap-3">
                          <svg class="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <div>
                            <h4 class="text-sm font-medium text-red-800 dark:text-red-200">Registration Failed</h4>
                            <p class="text-sm text-red-700 dark:text-red-300 mt-1">
                              Please fix the errors above and try again.
                            </p>
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

        {/* Real Examples */}
        {activeDemo === 'examples' && (
          <div class="space-y-8">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Real-world Examples</h2>
              
              <div class="space-y-12">
                {/* Login Form with Errors */}
                <div class="space-y-4">
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">Login Form with Validation</h3>
                  <div class="max-w-sm bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                    <div class="text-center mb-6">
                      <h4 class="text-xl font-semibold text-gray-900 dark:text-white">Sign In</h4>
                    </div>
                    
                    <div class="space-y-4">
                      <div>
                        <Label htmlFor="login-email">Email</Label>
                        <Input 
                          id="login-email"
                          type="email" 
                          value="user@example"
                          className="mt-1 border-red-500 focus:border-red-500 focus:ring-red-500"
                        />
                        <FieldError>Please enter a valid email address</FieldError>
                      </div>

                      <div>
                        <Label htmlFor="login-password">Password</Label>
                        <Input 
                          id="login-password"
                          type="password" 
                          className="mt-1 border-red-500 focus:border-red-500 focus:ring-red-500"
                        />
                        <FieldError>Password is required</FieldError>
                      </div>

                      <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded p-3">
                        <FieldError className="text-center">
                          Invalid email or password. Please try again.
                        </FieldError>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Registration Form */}
                <div class="space-y-4">
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">Registration Form Validation</h3>
                  <div class="max-w-md bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                    <div class="space-y-4">
                      <div class="grid grid-cols-2 gap-4">
                        <div>
                          <Label required>First Name</Label>
                          <Input className="mt-1 border-red-500 focus:border-red-500 focus:ring-red-500" />
                          <FieldError>Required</FieldError>
                        </div>
                        <div>
                          <Label>Last Name</Label>
                          <Input value="Smith" className="mt-1 border-green-500 focus:border-green-500 focus:ring-green-500" />
                        </div>
                      </div>

                      <div>
                        <Label required>Email</Label>
                        <Input type="email" value="user@company.com" className="mt-1 border-red-500 focus:border-red-500 focus:ring-red-500" />
                        <FieldError>This email is already registered</FieldError>
                      </div>

                      <div>
                        <Label required>Username</Label>
                        <Input value="us" className="mt-1 border-red-500 focus:border-red-500 focus:ring-red-500" />
                        <FieldError>Username must be at least 3 characters long</FieldError>
                      </div>

                      <div>
                        <Label required>Password</Label>
                        <Input type="password" value="pass" className="mt-1 border-red-500 focus:border-red-500 focus:ring-red-500" />
                        <div class="space-y-1 mt-1">
                          <FieldError>Must be at least 8 characters</FieldError>
                          <FieldError>Must include an uppercase letter</FieldError>
                          <FieldError>Must include a number</FieldError>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Credit Card Form */}
                <div class="space-y-4">
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">Payment Form Validation</h3>
                  <div class="max-w-lg bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                    <div class="space-y-4">
                      <div>
                        <Label required>Card Number</Label>
                        <Input value="4000 0000 0000" className="mt-1 border-red-500 focus:border-red-500 focus:ring-red-500" />
                        <FieldError>Please enter a complete card number</FieldError>
                      </div>

                      <div class="grid grid-cols-2 gap-4">
                        <div>
                          <Label required>Expiry Date</Label>
                          <Input placeholder="MM/YY" value="13/25" className="mt-1 border-red-500 focus:border-red-500 focus:ring-red-500" />
                          <FieldError>Invalid month</FieldError>
                        </div>
                        <div>
                          <Label required>CVC</Label>
                          <Input placeholder="123" value="12" className="mt-1 border-red-500 focus:border-red-500 focus:ring-red-500" />
                          <FieldError>CVC must be 3 digits</FieldError>
                        </div>
                      </div>

                      <div>
                        <Label required>Cardholder Name</Label>
                        <Input className="mt-1 border-red-500 focus:border-red-500 focus:ring-red-500" />
                        <FieldError>Cardholder name is required</FieldError>
                      </div>

                      <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded p-4">
                        <div class="flex items-start gap-3">
                          <svg class="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <div>
                            <h4 class="text-sm font-medium text-red-800 dark:text-red-200">Payment Failed</h4>
                            <p class="text-sm text-red-700 dark:text-red-300 mt-1">
                              Your card was declined. Please check your information and try again.
                            </p>
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
