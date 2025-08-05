import { Popover, Button } from '../../../../nebula/components'

export function AccessibilitySection() {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Customization Options
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Custom styling, arrow options, and behavior configurations.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center">
          <h3 className="font-medium text-gray-900 dark:text-white mb-3">Custom Styling</h3>
          <Popover
            trigger={<Button>Custom Style</Button>}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0"
            arrowClassName="bg-purple-500"
          >
            <div>
              <h4 className="font-medium mb-1">Custom Popover</h4>
              <p className="text-sm opacity-90">
                This popover has custom gradient styling with matching arrow.
              </p>
            </div>
          </Popover>
        </div>

        <div className="text-center">
          <h3 className="font-medium text-gray-900 dark:text-white mb-3">No Arrow</h3>
          <Popover
            trigger={<Button variant="outline">No Arrow</Button>}
            withArrow={false}
          >
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This popover doesn't have an arrow pointer.
              </p>
            </div>
          </Popover>
        </div>

        <div className="text-center">
          <h3 className="font-medium text-gray-900 dark:text-white mb-3">Custom Behavior</h3>
          <Popover
            trigger={<Button variant="ghost">Custom Behavior</Button>}
            closeOnClickOutside={false}
            closeOnEscape={false}
            offset={20}
          >
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                This popover only closes when you click the trigger again. Higher offset too!
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                No outside click or escape key closing.
              </p>
            </div>
          </Popover>
        </div>
      </div>
    </section>
  )
}
