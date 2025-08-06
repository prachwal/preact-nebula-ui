import { useState } from 'preact/hooks'
import { Collapse } from '../../../../nebula/components/Collapse'

export function AccordionSection() {
  const [activeKey, setActiveKey] = useState<string>('1')

  const handleChange = (key: string | string[]) => {
    setActiveKey(typeof key === 'string' ? key : key[0] || '')
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Accordion Mode</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          In accordion mode, only one panel can be expanded at a time. Opening a new panel automatically closes the previously opened one.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Single Panel Expansion</h3>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <Collapse activeKey={activeKey} onChange={handleChange} accordion>
              <Collapse.Panel key="1" header="🏠 Personal Information">
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
              </Collapse.Panel>
              <Collapse.Panel key="2" header="💼 Professional Details">
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Job Title
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter your job title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Company
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter your company"
                    />
                  </div>
                </div>
              </Collapse.Panel>
              <Collapse.Panel key="3" header="⚙️ Preferences">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="notifications"
                      className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <label htmlFor="notifications" className="text-sm text-gray-700 dark:text-gray-300">
                      Email notifications
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="newsletter"
                      className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <label htmlFor="newsletter" className="text-sm text-gray-700 dark:text-gray-300">
                      Subscribe to newsletter
                    </label>
                  </div>
                </div>
              </Collapse.Panel>
            </Collapse>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mt-4">
            <h4 className="font-medium mb-2">Usage:</h4>
            <pre className="text-sm overflow-x-auto">
              <code>{`const [activeKey, setActiveKey] = useState('1')

<Collapse activeKey={activeKey} onChange={setActiveKey} accordion>
  <Collapse.Panel key="1" header="Personal Information">
    <FormFields />
  </Collapse.Panel>
  <Collapse.Panel key="2" header="Professional Details">
    <FormFields />
  </Collapse.Panel>
</Collapse>`}</code>
            </pre>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">FAQ Accordion</h3>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <Collapse defaultActiveKey="faq1" accordion>
              <Collapse.Panel key="faq1" header="What is the return policy?">
                <p className="text-gray-600 dark:text-gray-300">
                  We offer a 30-day return policy for all items. Items must be in original condition 
                  with all tags attached. Please contact our customer service team to initiate a return.
                </p>
              </Collapse.Panel>
              <Collapse.Panel key="faq2" header="How do I track my order?">
                <p className="text-gray-600 dark:text-gray-300">
                  Once your order ships, you'll receive a tracking number via email. You can use this 
                  number to track your package on our website or the carrier's tracking page.
                </p>
              </Collapse.Panel>
              <Collapse.Panel key="faq3" header="Do you ship internationally?">
                <p className="text-gray-600 dark:text-gray-300">
                  Yes, we ship to most countries worldwide. International shipping rates and delivery 
                  times vary by destination. You can see available options at checkout.
                </p>
              </Collapse.Panel>
              <Collapse.Panel key="faq4" header="How can I contact customer support?">
                <div className="text-gray-600 dark:text-gray-300 space-y-2">
                  <p>You can reach our customer support team through:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Email: support@example.com</li>
                    <li>Phone: 1-800-123-4567</li>
                    <li>Live chat on our website</li>
                    <li>Support tickets in your account portal</li>
                  </ul>
                </div>
              </Collapse.Panel>
            </Collapse>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mt-4">
            <h4 className="font-medium mb-2">Usage:</h4>
            <pre className="text-sm overflow-x-auto">
              <code>{`<Collapse defaultActiveKey="faq1" accordion>
  <Collapse.Panel key="faq1" header="Question 1">
    Answer 1
  </Collapse.Panel>
  <Collapse.Panel key="faq2" header="Question 2">
    Answer 2
  </Collapse.Panel>
</Collapse>`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
