import { Anchor } from '@/components'
import { Label } from '@/components'

export function ScrollTargetsSection() {
  const items = [
    { key: 'target1', href: '#target1', title: 'Target 1' },
    { key: 'target2', href: '#target2', title: 'Target 2' },
    { key: 'target3', href: '#target3', title: 'Target 3' }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Custom Scroll Targets
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Configure different scroll containers and targets.
        </p>

        <div className="space-y-6">
          <div>
            <Label>Window Scrolling (Default)</Label>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <Anchor 
                items={items}
                target={() => window}
              />
            </div>
          </div>

          <div>
            <Label>Custom Container Scrolling</Label>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <Anchor 
                  items={items}
                  target={() => document.getElementById('scroll-container') as HTMLElement}
                  bounds={5}
                />
              </div>
              <div>
                <div 
                  id="scroll-container"
                  className="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4 h-64 overflow-y-auto"
                >
                  <div className="space-y-12">
                    <section id="target1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Target 1: Introduction
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                      </p>
                      <p className="text-gray-500 dark:text-gray-500 text-sm">
                        This is the first target section within a custom scroll container demonstrating smooth anchor navigation.
                      </p>
                    </section>
                    
                    <section id="target2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Target 2: Features & Benefits
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, 
                        eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                      </p>
                      <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-4 space-y-1">
                        <li>Smooth scrolling with customizable animation duration</li>
                        <li>Active link highlighting based on scroll position</li>
                        <li>Support for nested scroll containers</li>
                        <li>Configurable offset for fixed headers</li>
                      </ul>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                      </p>
                      <p className="text-gray-500 dark:text-gray-500 text-sm">
                        Second target section with more detailed content to demonstrate scrolling behavior and active link highlighting.
                      </p>
                    </section>
                    
                    <section id="target3">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Target 3: Implementation Details
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                        Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? 
                        Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
                      </p>
                      <p className="text-gray-500 dark:text-gray-500 text-sm">
                        Final target section showing the anchor navigation in action with comprehensive Lorem ipsum content for better demonstration.
                      </p>
                    </section>
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
