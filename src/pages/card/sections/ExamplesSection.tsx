import { Card, Button, Input, Label } from '@/components';

export function ExamplesSection() {
  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Real-world Examples</h2>
        
        <div class="space-y-12">
          {/* User Profile Card */}
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">User Profile Card</h3>
            <div class="max-w-sm">
              <Card>
                <div class="p-6 text-center">
                  <div class="w-20 h-20 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-4"></div>
                  <h4 class="text-xl font-semibold text-gray-900 dark:text-white mb-1">Sarah Johnson</h4>
                  <p class="text-gray-600 dark:text-gray-300 mb-4">Product Designer</p>
                  <div class="flex justify-center space-x-4 mb-4">
                    <div class="text-center">
                      <div class="text-2xl font-bold text-gray-900 dark:text-white">124</div>
                      <div class="text-sm text-gray-500 dark:text-gray-400">Projects</div>
                    </div>
                    <div class="text-center">
                      <div class="text-2xl font-bold text-gray-900 dark:text-white">2.5k</div>
                      <div class="text-sm text-gray-500 dark:text-gray-400">Followers</div>
                    </div>
                  </div>
                  <div class="flex space-x-2">
                    <Button size="sm" className="flex-1">Follow</Button>
                    <Button size="sm" variant="outline" className="flex-1">Message</Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Pricing Card */}
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Pricing Cards</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Basic', price: '$9', features: ['10 Projects', '5GB Storage', 'Email Support'] },
                { name: 'Pro', price: '$29', features: ['Unlimited Projects', '100GB Storage', 'Priority Support', 'Advanced Analytics'], popular: true },
                { name: 'Enterprise', price: '$99', features: ['Unlimited Everything', '1TB Storage', '24/7 Support', 'Custom Integrations'] }
              ].map((plan, index) => (
                <Card key={index} className={plan.popular ? 'border-blue-500 border-2' : ''}>
                  {plan.popular && (
                    <div class="bg-blue-500 text-white text-center py-2 text-sm font-medium rounded-t-lg">
                      Most Popular
                    </div>
                  )}
                  <div class="p-6">
                    <div class="text-center mb-6">
                      <h4 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">{plan.name}</h4>
                      <div class="text-4xl font-bold text-gray-900 dark:text-white">
                        {plan.price}
                        <span class="text-lg font-normal text-gray-500 dark:text-gray-400">/month</span>
                      </div>
                    </div>
                    <ul class="space-y-3 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} class="flex items-center text-gray-600 dark:text-gray-300">
                          <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full" variant={plan.popular ? 'primary' : 'outline'}>
                      Choose Plan
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Dashboard Stats */}
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Dashboard Statistics</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Total Users', value: '2,543', change: '+12%', color: 'blue' },
                { title: 'Revenue', value: '$45,632', change: '+8%', color: 'green' },
                { title: 'Orders', value: '1,234', change: '-3%', color: 'red' },
                { title: 'Conversion', value: '3.2%', change: '+0.5%', color: 'purple' }
              ].map((stat, index) => (
                <Card key={index}>
                  <div class="p-6">
                    <div class="flex items-center justify-between">
                      <div>
                        <p class="text-sm font-medium text-gray-600 dark:text-gray-300">{stat.title}</p>
                        <p class="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                      </div>
                      <div class={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Form Card */}
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Contact Form Card</h3>
            <div class="max-w-md">
              <Card>
                <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h4 class="text-lg font-semibold text-gray-900 dark:text-white">Get in Touch</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-300">We'd love to hear from you</p>
                </div>
                <div class="p-6">
                  <div class="space-y-4">
                    <div>
                      <Label htmlFor="contact-name">Name</Label>
                      <Input id="contact-name" placeholder="Your name" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="contact-email">Email</Label>
                      <Input id="contact-email" type="email" placeholder="your@email.com" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="contact-message">Message</Label>
                      <textarea 
                        id="contact-message"
                        rows={4}
                        placeholder="Your message..."
                        class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
                <div class="px-6 py-4 bg-gray-50 dark:bg-gray-700 rounded-b-lg">
                  <Button className="w-full">Send Message</Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
