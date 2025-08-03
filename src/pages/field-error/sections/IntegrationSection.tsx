import { useState } from 'preact/hooks'
import { FieldError, Input, Label } from '@/components'

export function IntegrationSection() {
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
  )
}
