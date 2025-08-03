import { FieldError, Input, Label } from '@/components'

export function ExamplesSection() {
  return (
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
  )
}
