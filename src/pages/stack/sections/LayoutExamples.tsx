import { Stack, Button, Card } from '../../../../nebula/components'

export function LayoutExamples() {
  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Layout Examples</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Real-world examples of Stack component usage in common UI patterns.
        </p>

        <div className="space-y-8">
          {/* Card Layout */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Card with Actions</h3>
            <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
              <Card>
                <div className="p-4 border-b border-gray-200 dark:border-gray-600">
                  <Stack direction="vertical" spacing="sm">
                    <h3 className="text-lg font-semibold">Product Card</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Premium wireless headphones with noise cancellation</p>
                  </Stack>
                </div>
                <div className="p-4">
                  <Stack direction="vertical" spacing="md">
                    <div className="text-2xl font-bold text-green-600">$299.99</div>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        In Stock
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        Free Shipping
                      </div>
                    </div>
                  </Stack>
                </div>
                <div className="p-4 border-t border-gray-200 dark:border-gray-600">
                  <Stack direction="horizontal" spacing="sm">
                    <Button>Add to Cart</Button>
                    <Button variant="outline">Wishlist</Button>
                  </Stack>
                </div>
              </Card>
            </div>
          </div>

          {/* Form Layout */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Form Layout</h3>
            <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
              <Stack direction="vertical" spacing="lg" className="max-w-md">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Contact Form</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Fill out the form below to get in touch</p>
                </div>
                
                <Stack direction="vertical" spacing="md">
                  <div className="space-y-1">
                    <label className="block text-sm font-medium">Name</label>
                    <div className="p-2 bg-white dark:bg-gray-600 rounded border">John Doe</div>
                  </div>
                  
                  <div className="space-y-1">
                    <label className="block text-sm font-medium">Email</label>
                    <div className="p-2 bg-white dark:bg-gray-600 rounded border">john@example.com</div>
                  </div>
                  
                  <div className="space-y-1">
                    <label className="block text-sm font-medium">Message</label>
                    <div className="p-2 bg-white dark:bg-gray-600 rounded border h-24">Your message here...</div>
                  </div>
                </Stack>

                <Stack direction="horizontal" spacing="sm">
                  <Button>Send Message</Button>
                  <Button variant="outline">Cancel</Button>
                </Stack>
              </Stack>
            </div>
          </div>

          {/* Navigation Layout */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Navigation Layout</h3>
            <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
                <Stack direction="horizontal" spacing="none" align="center">
                  <div className="flex-1">
                    <Stack direction="horizontal" spacing="lg" align="center">
                      <div className="font-bold text-xl text-blue-600">Brand</div>
                      <Stack direction="horizontal" spacing="md">
                        <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-300">Home</a>
                        <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-300">Products</a>
                        <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-300">About</a>
                        <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-300">Contact</a>
                      </Stack>
                    </Stack>
                  </div>
                  <Stack direction="horizontal" spacing="sm">
                    <Button size="sm" variant="ghost">Login</Button>
                    <Button size="sm">Sign Up</Button>
                  </Stack>
                </Stack>
              </div>
            </div>
          </div>

          {/* Dashboard Stats */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Dashboard Stats</h3>
            <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
              <Stack direction="vertical" spacing="lg">
                <h3 className="text-lg font-semibold">Analytics Overview</h3>
                
                <Stack direction="horizontal" spacing="md" className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="text-center">
                    <div className="p-4">
                      <Stack direction="vertical" spacing="sm">
                        <div className="text-3xl font-bold text-blue-600">1,234</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Total Users</div>
                        <div className="text-xs text-green-600">+12% from last month</div>
                      </Stack>
                    </div>
                  </Card>
                  
                  <Card className="text-center">
                    <div className="p-4">
                      <Stack direction="vertical" spacing="sm">
                        <div className="text-3xl font-bold text-green-600">$12,345</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Revenue</div>
                        <div className="text-xs text-green-600">+8% from last month</div>
                      </Stack>
                    </div>
                  </Card>
                  
                  <Card className="text-center">
                    <div className="p-4">
                      <Stack direction="vertical" spacing="sm">
                        <div className="text-3xl font-bold text-purple-600">567</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Orders</div>
                        <div className="text-xs text-red-600">-3% from last month</div>
                      </Stack>
                    </div>
                  </Card>
                </Stack>
              </Stack>
            </div>
          </div>

          {/* Nested Stacks */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Nested Stacks</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Complex layouts using nested Stack components</p>
            <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
              <Stack direction="vertical" spacing="lg">
                <div className="text-lg font-semibold">User Profile</div>
                
                <Stack direction="horizontal" spacing="lg" align="start">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    JD
                  </div>
                  
                  <Stack direction="vertical" spacing="sm" className="flex-1">
                    <Stack direction="horizontal" spacing="md" align="center">
                      <div className="text-xl font-semibold">John Doe</div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
                    </Stack>
                    
                    <div className="text-sm text-gray-600 dark:text-gray-400">Senior Developer</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">john.doe@company.com</div>
                    
                    <Stack direction="horizontal" spacing="sm" className="mt-2">
                      <Button size="sm">Edit Profile</Button>
                      <Button size="sm" variant="outline">Send Message</Button>
                      <Button size="sm" variant="ghost">More</Button>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
