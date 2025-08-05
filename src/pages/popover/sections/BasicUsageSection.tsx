import { Popover, Button } from '../../../../nebula/components'

export function BasicUsageSection() {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Basic Usage
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Simple popovers with click trigger and default positioning.
        </p>
      </div>
      
      <div className="flex flex-wrap gap-4">
        <Popover
          trigger={<Button>Click for Info</Button>}
        >
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-1">
              Helpful Information
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This is a basic popover with helpful content that appears when you click the trigger.
            </p>
          </div>
        </Popover>

        <Popover
          trigger={<Button variant="outline">Learn More</Button>}
        >
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">
              Features
            </h3>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Intelligent positioning</li>
              <li>• Rich content support</li>
              <li>• Keyboard navigation</li>
              <li>• Screen reader support</li>
            </ul>
          </div>
        </Popover>

        <Popover
          trigger={<Button variant="ghost">Help</Button>}
        >
          <div className="max-w-xs">
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">
              Need Help?
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Our support team is here to help you get the most out of this feature.
            </p>
            <div className="flex space-x-2">
              <Button size="sm">Contact Support</Button>
              <Button size="sm" variant="outline">View Docs</Button>
            </div>
          </div>
        </Popover>
      </div>
    </section>
  )
}
