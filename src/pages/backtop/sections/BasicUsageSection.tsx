import { BackTop } from '@/components'
import { Label } from '@/components'

export function BasicUsageSection() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Basic BackTop Button
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          A simple back to top button that appears when scrolling down and smoothly scrolls to the top when clicked.
        </p>

        <div className="space-y-6">
          <div>
            <Label>Default BackTop Button</Label>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 relative">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                The BackTop button will appear in the bottom right corner when you scroll down 100px or more.
              </p>
              
              <div 
                className="space-y-4 max-h-64 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4 rounded relative"
                id="scroll-container-1"
              >
                {Array.from({ length: 20 }, (_, i) => (
                  <p key={i} className="text-gray-600 dark:text-gray-400">
                    Content section {i + 1} - This is sample content to demonstrate scrolling behavior. 
                    The BackTop button should appear when you scroll down far enough in this container.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
                  </p>
                ))}
              </div>
              
              <BackTop 
                visibilityHeight={10}
                duration={500}
                target={() => document.getElementById('scroll-container-1') || window}
                right={10}
                bottom={10}
              />
            </div>
          </div>

          <div>
            <Label>With Custom Content</Label>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 relative">
              <div 
                className="space-y-4 max-h-64 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4 rounded relative"
                id="scroll-container-2"
              >
                {Array.from({ length: 15 }, (_, i) => (
                  <div key={i} className="p-3 bg-white dark:bg-gray-800 rounded border">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Item {i + 1}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Sample content item with more detailed information to create scrollable content.
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                  </div>
                ))}
              </div>
              
              <BackTop 
                visibilityHeight={10}
                duration={300}
                target={() => document.getElementById('scroll-container-2') || window}
                right={10}
                bottom={10}
              >
                <span className="text-sm font-medium">Top</span>
              </BackTop>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
