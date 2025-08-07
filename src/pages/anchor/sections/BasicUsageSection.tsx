import { Anchor } from '@/components'
import { Label } from '@/components'

export function BasicUsageSection() {
  const anchorItems = [
    {
      key: 'introduction',
      href: '#introduction',
      title: 'Introduction',
    },
    {
      key: 'features',
      href: '#features', 
      title: 'Features',
    },
    {
      key: 'usage',
      href: '#usage',
      title: 'Usage Examples',
    },
    {
      key: 'api',
      href: '#api',
      title: 'API Reference',
    }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Basic Anchor Navigation
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The Anchor component provides smooth scrolling navigation with active link highlighting.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Label>Navigation Menu</Label>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <Anchor 
                items={anchorItems} 
                target={() => document.getElementById('content-container') as HTMLElement}
                offsetTop={10}
              />
            </div>
          </div>

          <div>
            <Label>Content Sections</Label>
            <div 
              id="content-container"
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 space-y-12 max-h-80 overflow-y-auto"
            >
              <section id="introduction">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Introduction
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Welcome to the Anchor component documentation. This component helps users navigate through long content with smooth scrolling and visual feedback.
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.
                </p>
              </section>

              <section id="features">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Features
                </h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 mb-4">
                  <li>Smooth scrolling animation with customizable duration</li>
                  <li>Active link highlighting based on scroll position</li>
                  <li>Keyboard navigation support for accessibility</li>
                  <li>Customizable offset for fixed headers</li>
                  <li>Nested anchor structures with multi-level support</li>
                  <li>Responsive design for different screen sizes</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Mauris vitae ultricies leo integer malesuada nunc vel risus commodo.
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Viverra adipiscing at in tellus integer feugiat scelerisque varius. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus quam. Turpis egestas pretium aenean pharetra magna ac placerat vestibulum lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at.
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Consequat ac felis donec et odio pellentesque diam volutpat commodo. Nibh tellus molestie nunc non blandit massa enim nec dui. Faucibus ornare suspendisse sed nisi lacus sed viverra tellus in.
                </p>
              </section>

              <section id="usage">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Usage Examples
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  The Anchor component can be used in documentation sites, long-form content, and any application requiring section navigation. It provides an intuitive way for users to jump between different sections of content.
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper.
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci.
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum.
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
                </p>
              </section>

              <section id="api">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  API Reference
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Complete API documentation with all available props and methods for the Anchor component. This section covers all the configuration options available.
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in libero ut nibh placerat accumsan. Proin faucibus arcu quis ante. In hac habitasse platea dictumst. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet.
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt.
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
