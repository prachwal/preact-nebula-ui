import { Card, CardHeader, CardBody, CardFooter, Container, Stack, Divider } from '../nebula'

export const LayoutShowcase = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Layout System</h2>
        <p className="text-gray-600 mb-8">
          Layout components provide structure and organization for your UI
        </p>
      </div>

      {/* Card Variants */}
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Card Variants</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="default">
            <CardHeader>
              <h4 className="text-base font-semibold">Default Card</h4>
              <p className="text-sm text-gray-600">Basic card with border and subtle shadow</p>
            </CardHeader>
            <CardBody>
              <p className="text-gray-700">
                Perfect for most content sections and general purpose containers.
              </p>
            </CardBody>
            <CardFooter>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600">
                Learn More
              </button>
            </CardFooter>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <h4 className="text-base font-semibold">Elevated Card</h4>
              <p className="text-sm text-gray-600">Prominent card with medium shadow</p>
            </CardHeader>
            <CardBody>
              <p className="text-gray-700">
                Great for highlighting important content or creating visual hierarchy.
              </p>
            </CardBody>
            <CardFooter>
              <button className="px-4 py-2 bg-green-500 text-white rounded-md text-sm hover:bg-green-600">
                Get Started
              </button>
            </CardFooter>
          </Card>

          <Card variant="outlined">
            <CardHeader>
              <h4 className="text-base font-semibold">Outlined Card</h4>
              <p className="text-sm text-gray-600">Clean card with thick border</p>
            </CardHeader>
            <CardBody>
              <p className="text-gray-700">
                Ideal for minimal designs or when you need clear visual separation.
              </p>
            </CardBody>
            <CardFooter>
              <button className="px-4 py-2 bg-purple-500 text-white rounded-md text-sm hover:bg-purple-600">
                Explore
              </button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Card Sizes */}
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Card Sizes</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card size="sm" variant="elevated">
            <CardHeader>
              <h4 className="text-sm font-semibold">Small Card</h4>
              <p className="text-xs text-gray-600">Compact spacing (p-4)</p>
            </CardHeader>
            <CardBody>
              <p className="text-sm text-gray-700">
                Perfect for dashboards and dense layouts.
              </p>
            </CardBody>
          </Card>

          <Card size="md" variant="elevated">
            <CardHeader>
              <h4 className="text-base font-semibold">Medium Card</h4>
              <p className="text-sm text-gray-600">Standard spacing (p-6)</p>
            </CardHeader>
            <CardBody>
              <p className="text-gray-700">
                Default size for most use cases.
              </p>
            </CardBody>
          </Card>

          <Card size="lg" variant="elevated">
            <CardHeader>
              <h4 className="text-lg font-semibold">Large Card</h4>
              <p className="text-sm text-gray-600">Generous spacing (p-8)</p>
            </CardHeader>
            <CardBody>
              <p className="text-gray-700">
                Great for hero sections and featured content.
              </p>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* Interactive Cards */}
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Interactive Cards</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card 
            interactive 
            variant="default"
            onClick={() => alert('Default card clicked!')}
          >
            <CardHeader>
              <h4 className="text-base font-semibold">Clickable Card</h4>
              <p className="text-sm text-gray-600">Try clicking on this card</p>
            </CardHeader>
            <CardBody>
              <p className="text-gray-700">
                Interactive cards respond to clicks and keyboard navigation.
                They include hover effects and proper accessibility attributes.
              </p>
            </CardBody>
          </Card>

          <Card 
            interactive 
            variant="elevated"
            onClick={() => alert('Elevated card clicked!')}
          >
            <CardHeader>
              <h4 className="text-base font-semibold">Hover Effects</h4>
              <p className="text-sm text-gray-600">Hover to see the effect</p>
            </CardHeader>
            <CardBody>
              <p className="text-gray-700">
                Interactive cards have enhanced shadows on hover and include
                cursor pointer styling for better UX.
              </p>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* Complex Card Examples */}
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Complex Examples</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Profile Card */}
          <Card variant="elevated">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">JD</span>
                </div>
                <div>
                  <h4 className="text-base font-semibold">John Doe</h4>
                  <p className="text-sm text-gray-600">Software Engineer</p>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <p className="text-gray-700 mb-4">
                Passionate about creating beautiful and functional user interfaces.
                Always learning new technologies and best practices.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">React</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">TypeScript</span>
                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Tailwind</span>
              </div>
            </CardBody>
            <CardFooter>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                  Follow
                </button>
                <button className="px-3 py-1 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50">
                  Message
                </button>
              </div>
            </CardFooter>
          </Card>

          {/* Statistics Card */}
          <Card variant="outlined">
            <CardHeader>
              <h4 className="text-base font-semibold">Project Statistics</h4>
              <p className="text-sm text-gray-600">Current month overview</p>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">152</div>
                  <div className="text-sm text-gray-600">Total Tasks</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">89%</div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">23</div>
                  <div className="text-sm text-gray-600">In Progress</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">5</div>
                  <div className="text-sm text-gray-600">Overdue</div>
                </div>
              </div>
            </CardBody>
            <CardFooter>
              <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200">
                View Detailed Report
              </button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Card without sub-components */}
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Simple Card</h3>
        <div className="max-w-md">
          <Card variant="default" className="text-center">
            <h4 className="text-lg font-semibold mb-2">Simple Card</h4>
            <p className="text-gray-600 mb-4">
              Cards can also be used without sub-components for simpler layouts.
            </p>
            <button className="px-6 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600">
              Action Button
            </button>
          </Card>
        </div>
      </section>

      {/* Container Component */}
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Container Component</h3>
        <p className="text-gray-600 mb-6">
          Container provides responsive max-width constraints and consistent padding for your layouts.
        </p>

        {/* Container Sizes */}
        <div className="space-y-6">
          <div>
            <h4 className="text-base font-medium text-gray-900 mb-3">Container Sizes</h4>
            <div className="space-y-4">
              <Container size="sm" className="bg-blue-50 border border-blue-200 rounded-lg py-4">
                <div className="text-center">
                  <code className="text-sm font-mono text-blue-800">size="sm"</code>
                  <p className="text-sm text-gray-600 mt-1">max-width: 384px</p>
                </div>
              </Container>
              
              <Container size="md" className="bg-green-50 border border-green-200 rounded-lg py-4">
                <div className="text-center">
                  <code className="text-sm font-mono text-green-800">size="md"</code>
                  <p className="text-sm text-gray-600 mt-1">max-width: 448px</p>
                </div>
              </Container>
              
              <Container size="lg" className="bg-purple-50 border border-purple-200 rounded-lg py-4">
                <div className="text-center">
                  <code className="text-sm font-mono text-purple-800">size="lg" (default)</code>
                  <p className="text-sm text-gray-600 mt-1">max-width: 512px</p>
                </div>
              </Container>
              
              <Container size="xl" className="bg-orange-50 border border-orange-200 rounded-lg py-4">
                <div className="text-center">
                  <code className="text-sm font-mono text-orange-800">size="xl"</code>
                  <p className="text-sm text-gray-600 mt-1">max-width: 576px</p>
                </div>
              </Container>
              
              <Container size="2xl" className="bg-red-50 border border-red-200 rounded-lg py-4">
                <div className="text-center">
                  <code className="text-sm font-mono text-red-800">size="2xl"</code>
                  <p className="text-sm text-gray-600 mt-1">max-width: 672px</p>
                </div>
              </Container>
            </div>
          </div>

          {/* Container Padding */}
          <div>
            <h4 className="text-base font-medium text-gray-900 mb-3">Container Padding</h4>
            <div className="space-y-4">
              <Container size="md" padding="none" className="bg-gray-50 border border-gray-200 rounded-lg">
                <div className="bg-blue-100 py-3 text-center">
                  <code className="text-sm font-mono text-blue-800">padding="none"</code>
                  <p className="text-sm text-gray-600 mt-1">No horizontal padding</p>
                </div>
              </Container>
              
              <Container size="md" padding="sm" className="bg-gray-50 border border-gray-200 rounded-lg">
                <div className="bg-green-100 py-3 text-center">
                  <code className="text-sm font-mono text-green-800">padding="sm"</code>
                  <p className="text-sm text-gray-600 mt-1">px-4 (16px)</p>
                </div>
              </Container>
              
              <Container size="md" padding="md" className="bg-gray-50 border border-gray-200 rounded-lg">
                <div className="bg-purple-100 py-3 text-center">
                  <code className="text-sm font-mono text-purple-800">padding="md" (default)</code>
                  <p className="text-sm text-gray-600 mt-1">px-6 sm:px-8 (24px/32px)</p>
                </div>
              </Container>
              
              <Container size="md" padding="lg" className="bg-gray-50 border border-gray-200 rounded-lg">
                <div className="bg-orange-100 py-3 text-center">
                  <code className="text-sm font-mono text-orange-800">padding="lg"</code>
                  <p className="text-sm text-gray-600 mt-1">px-8 sm:px-12 (32px/48px)</p>
                </div>
              </Container>
            </div>
          </div>

          {/* Container Centering */}
          <div>
            <h4 className="text-base font-medium text-gray-900 mb-3">Container Centering</h4>
            <div className="space-y-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <Container size="sm" className="bg-blue-50 border border-blue-200 rounded py-3">
                  <div className="text-center">
                    <code className="text-sm font-mono text-blue-800">centered=true (default)</code>
                    <p className="text-sm text-gray-600 mt-1">Centered with mx-auto</p>
                  </div>
                </Container>
              </div>
              
              <div className="bg-gray-100 p-4 rounded-lg">
                <Container size="sm" centered={false} className="bg-red-50 border border-red-200 rounded py-3">
                  <div className="text-center">
                    <code className="text-sm font-mono text-red-800">centered=false</code>
                    <p className="text-sm text-gray-600 mt-1">Not centered, aligned to left</p>
                  </div>
                </Container>
              </div>
            </div>
          </div>

          {/* Practical Example */}
          <div>
            <h4 className="text-base font-medium text-gray-900 mb-3">Practical Example</h4>
            <Container size="lg" padding="lg" className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="text-center py-8">
                <h5 className="text-xl font-semibold text-gray-900 mb-4">Welcome to Our Platform</h5>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  This container demonstrates how to create consistent, responsive layouts with 
                  proper max-width constraints and padding that adapts to different screen sizes.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Get Started
                  </button>
                  <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                    Learn More
                  </button>
                </div>
              </div>
            </Container>
          </div>
        </div>
      </section>

      {/* Stack Component */}
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Stack Component</h3>
        <p className="text-gray-600 mb-6">
          Stack provides flexible layout for organizing items in vertical or horizontal arrangements with consistent spacing.
        </p>

        <div className="space-y-8">
          {/* Stack Directions */}
          <div>
            <h4 className="text-base font-medium text-gray-900 mb-3">Stack Directions</h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-3">Vertical Stack (default)</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Stack direction="vertical" spacing="md">
                    <div className="bg-blue-100 border border-blue-300 rounded p-3 text-center">
                      <span className="text-blue-800 font-medium">Item 1</span>
                    </div>
                    <div className="bg-green-100 border border-green-300 rounded p-3 text-center">
                      <span className="text-green-800 font-medium">Item 2</span>
                    </div>
                    <div className="bg-purple-100 border border-purple-300 rounded p-3 text-center">
                      <span className="text-purple-800 font-medium">Item 3</span>
                    </div>
                  </Stack>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-3">Horizontal Stack</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Stack direction="horizontal" spacing="md">
                    <div className="bg-blue-100 border border-blue-300 rounded p-3 text-center">
                      <span className="text-blue-800 font-medium">Item 1</span>
                    </div>
                    <div className="bg-green-100 border border-green-300 rounded p-3 text-center">
                      <span className="text-green-800 font-medium">Item 2</span>
                    </div>
                    <div className="bg-purple-100 border border-purple-300 rounded p-3 text-center">
                      <span className="text-purple-800 font-medium">Item 3</span>
                    </div>
                  </Stack>
                </div>
              </div>
            </div>
          </div>

          {/* Stack Spacing */}
          <div>
            <h4 className="text-base font-medium text-gray-900 mb-3">Stack Spacing</h4>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">
                  <code className="text-xs font-mono bg-gray-100 px-1 rounded">spacing="none"</code> - No gap
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Stack direction="horizontal" spacing="none">
                    <div className="bg-red-100 border border-red-300 rounded p-2 text-xs">No</div>
                    <div className="bg-red-100 border border-red-300 rounded p-2 text-xs">Gap</div>
                    <div className="bg-red-100 border border-red-300 rounded p-2 text-xs">Here</div>
                  </Stack>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-2">
                  <code className="text-xs font-mono bg-gray-100 px-1 rounded">spacing="sm"</code> - 8px gap
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Stack direction="horizontal" spacing="sm">
                    <div className="bg-blue-100 border border-blue-300 rounded p-2 text-xs">Small</div>
                    <div className="bg-blue-100 border border-blue-300 rounded p-2 text-xs">Gap</div>
                    <div className="bg-blue-100 border border-blue-300 rounded p-2 text-xs">Size</div>
                  </Stack>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-2">
                  <code className="text-xs font-mono bg-gray-100 px-1 rounded">spacing="lg"</code> - 24px gap
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Stack direction="horizontal" spacing="lg">
                    <div className="bg-green-100 border border-green-300 rounded p-2 text-xs">Large</div>
                    <div className="bg-green-100 border border-green-300 rounded p-2 text-xs">Gap</div>
                    <div className="bg-green-100 border border-green-300 rounded p-2 text-xs">Size</div>
                  </Stack>
                </div>
              </div>
            </div>
          </div>

          {/* Stack Alignment */}
          <div>
            <h4 className="text-base font-medium text-gray-900 mb-3">Stack Alignment</h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-3">Cross-axis alignment (align)</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">align="center"</p>
                    <div className="bg-gray-50 p-4 rounded-lg h-24">
                      <Stack direction="horizontal" spacing="sm" align="center" className="h-full">
                        <div className="bg-blue-100 border border-blue-300 rounded p-2 text-xs">Center</div>
                        <div className="bg-blue-100 border border-blue-300 rounded p-4 text-xs">Aligned</div>
                        <div className="bg-blue-100 border border-blue-300 rounded p-1 text-xs">Items</div>
                      </Stack>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500 mb-1">align="start"</p>
                    <div className="bg-gray-50 p-4 rounded-lg h-24">
                      <Stack direction="horizontal" spacing="sm" align="start" className="h-full">
                        <div className="bg-green-100 border border-green-300 rounded p-2 text-xs">Start</div>
                        <div className="bg-green-100 border border-green-300 rounded p-4 text-xs">Aligned</div>
                        <div className="bg-green-100 border border-green-300 rounded p-1 text-xs">Items</div>
                      </Stack>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-3">Main-axis justification (justify)</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">justify="center"</p>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <Stack direction="horizontal" spacing="sm" justify="center">
                        <div className="bg-purple-100 border border-purple-300 rounded p-2 text-xs">Center</div>
                        <div className="bg-purple-100 border border-purple-300 rounded p-2 text-xs">Justified</div>
                      </Stack>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500 mb-1">justify="between"</p>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <Stack direction="horizontal" spacing="sm" justify="between">
                        <div className="bg-orange-100 border border-orange-300 rounded p-2 text-xs">Space</div>
                        <div className="bg-orange-100 border border-orange-300 rounded p-2 text-xs">Between</div>
                      </Stack>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stack Wrapping */}
          <div>
            <h4 className="text-base font-medium text-gray-900 mb-3">Stack Wrapping</h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-3">No wrapping (default)</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Stack direction="horizontal" spacing="sm" wrap={false} className="w-48">
                    <div className="bg-red-100 border border-red-300 rounded p-2 text-xs whitespace-nowrap">Long Item 1</div>
                    <div className="bg-red-100 border border-red-300 rounded p-2 text-xs whitespace-nowrap">Long Item 2</div>
                    <div className="bg-red-100 border border-red-300 rounded p-2 text-xs whitespace-nowrap">Long Item 3</div>
                  </Stack>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-3">With wrapping</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Stack direction="horizontal" spacing="sm" wrap={true} className="w-48">
                    <div className="bg-blue-100 border border-blue-300 rounded p-2 text-xs whitespace-nowrap">Long Item 1</div>
                    <div className="bg-blue-100 border border-blue-300 rounded p-2 text-xs whitespace-nowrap">Long Item 2</div>
                    <div className="bg-blue-100 border border-blue-300 rounded p-2 text-xs whitespace-nowrap">Long Item 3</div>
                  </Stack>
                </div>
              </div>
            </div>
          </div>

          {/* Practical Examples */}
          <div>
            <h4 className="text-base font-medium text-gray-900 mb-3">Practical Examples</h4>
            <div className="space-y-6">
              {/* Button Group */}
              <div>
                <p className="text-sm text-gray-600 mb-3">Button Group</p>
                <Card variant="outlined" className="p-4">
                  <Stack direction="horizontal" spacing="sm" justify="end">
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                      Cancel
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      Save
                    </button>
                  </Stack>
                </Card>
              </div>

              {/* Form Layout */}
              <div>
                <p className="text-sm text-gray-600 mb-3">Form Layout</p>
                <Card variant="outlined" className="p-6">
                  <Stack spacing="lg">
                    <Stack spacing="sm">
                      <label className="text-sm font-medium text-gray-700">Name</label>
                      <input className="border border-gray-300 rounded-md px-3 py-2" placeholder="Enter your name" />
                    </Stack>
                    
                    <Stack spacing="sm">
                      <label className="text-sm font-medium text-gray-700">Email</label>
                      <input className="border border-gray-300 rounded-md px-3 py-2" placeholder="Enter your email" />
                    </Stack>
                    
                    <Stack direction="horizontal" spacing="md" justify="between" align="center">
                      <label className="flex items-center text-sm text-gray-600">
                        <input type="checkbox" className="mr-2" />
                        Remember me
                      </label>
                      <button className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                        Submit
                      </button>
                    </Stack>
                  </Stack>
                </Card>
              </div>

              {/* Dashboard Stats */}
              <div>
                <p className="text-sm text-gray-600 mb-3">Dashboard Statistics</p>
                <Stack direction="horizontal" spacing="md" wrap={true}>
                  <Card variant="elevated" className="flex-1 min-w-48">
                    <Stack spacing="sm" align="center" className="text-center p-4">
                      <div className="text-2xl font-bold text-blue-600">1,234</div>
                      <div className="text-sm text-gray-600">Total Users</div>
                    </Stack>
                  </Card>
                  
                  <Card variant="elevated" className="flex-1 min-w-48">
                    <Stack spacing="sm" align="center" className="text-center p-4">
                      <div className="text-2xl font-bold text-green-600">98.5%</div>
                      <div className="text-sm text-gray-600">Uptime</div>
                    </Stack>
                  </Card>
                  
                  <Card variant="elevated" className="flex-1 min-w-48">
                    <Stack spacing="sm" align="center" className="text-center p-4">
                      <div className="text-2xl font-bold text-purple-600">567</div>
                      <div className="text-sm text-gray-600">Orders</div>
                    </Stack>
                  </Card>
                </Stack>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider Component */}
      <section>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Divider Component</h3>
        <p className="text-gray-600 mb-6">
          Dividers provide visual separation between content sections with flexible styling options.
        </p>

        <div className="space-y-8">
          {/* Basic Dividers */}
          <div>
            <h4 className="text-base font-medium text-gray-900 mb-3">Basic Dividers</h4>
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-600 mb-3">Horizontal (default)</p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="bg-white p-4 rounded border">Section 1</div>
                  <Divider className="my-4" />
                  <div className="bg-white p-4 rounded border">Section 2</div>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-3">Vertical</p>
                <div className="bg-gray-50 p-6 rounded-lg h-24 flex items-center">
                  <div className="bg-white p-4 rounded border flex-1 h-full flex items-center justify-center">Left</div>
                  <Divider orientation="vertical" className="mx-4" />
                  <div className="bg-white p-4 rounded border flex-1 h-full flex items-center justify-center">Right</div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider Variants */}
          <div>
            <h4 className="text-base font-medium text-gray-900 mb-3">Divider Variants</h4>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-3">Solid (default)</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Divider variant="solid" />
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-3">Dashed</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Divider variant="dashed" />
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-3">Dotted</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Divider variant="dotted" />
                </div>
              </div>
            </div>
          </div>

          {/* Divider Sizes */}
          <div>
            <h4 className="text-base font-medium text-gray-900 mb-3">Divider Sizes</h4>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">Small</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Divider size="sm" />
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-2">Medium (default)</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Divider size="md" />
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-2">Large</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Divider size="lg" />
                </div>
              </div>
            </div>
          </div>

          {/* Text Dividers */}
          <div>
            <h4 className="text-base font-medium text-gray-900 mb-3">Text Dividers</h4>
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-600 mb-3">Horizontal with text</p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="bg-white p-4 rounded border text-center">Login Form</div>
                  <Divider text="OR" className="my-6" />
                  <div className="bg-white p-4 rounded border text-center">Social Login</div>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-3">Vertical with text</p>
                <div className="bg-gray-50 p-6 rounded-lg h-32 flex items-center">
                  <div className="bg-white p-4 rounded border flex-1 h-full flex items-center justify-center">Option A</div>
                  <Divider orientation="vertical" text="OR" className="mx-6" />
                  <div className="bg-white p-4 rounded border flex-1 h-full flex items-center justify-center">Option B</div>
                </div>
              </div>
            </div>
          </div>

          {/* Practical Examples */}
          <div>
            <h4 className="text-base font-medium text-gray-900 mb-3">Practical Examples</h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Form Sections */}
              <Card variant="outlined" className="p-6">
                <h5 className="text-base font-semibold mb-4">User Profile</h5>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input className="w-full border border-gray-300 rounded-md px-3 py-2" defaultValue="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input className="w-full border border-gray-300 rounded-md px-3 py-2" defaultValue="john@example.com" />
                  </div>
                </div>

                <Divider text="Settings" className="my-6" />

                <div className="space-y-4">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    <span className="text-sm text-gray-700">Email notifications</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm text-gray-700">SMS notifications</span>
                  </label>
                </div>
              </Card>

              {/* Navigation Menu */}
              <Card variant="outlined" className="p-6">
                <h5 className="text-base font-semibold mb-4">Navigation Menu</h5>
                
                <div className="space-y-2">
                  <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-50">Dashboard</button>
                  <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-50">Projects</button>
                  <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-50">Team</button>
                </div>

                <Divider className="my-4" />

                <div className="space-y-2">
                  <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-50">Settings</button>
                  <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-50">Help</button>
                </div>

                <Divider variant="dashed" className="my-4" />

                <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-50 text-red-600">Sign out</button>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
