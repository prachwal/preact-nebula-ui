import { Card } from '../../../../nebula/components/Card'
import { Carousel } from '../../../../nebula/components/Carousel'

export function InfiniteSection() {
  const sampleSlides = [
    <div className="flex items-center justify-center h-full bg-gradient-to-r from-red-500 to-pink-600 text-white text-xl font-semibold">
      First Slide
    </div>,
    <div className="flex items-center justify-center h-full bg-gradient-to-r from-yellow-500 to-orange-600 text-white text-xl font-semibold">
      Second Slide
    </div>,
    <div className="flex items-center justify-center h-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white text-xl font-semibold">
      Third Slide
    </div>
  ]

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Infinite Loop Carousel</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          When infinite loop is enabled, the carousel wraps from the last slide to the first slide and vice versa.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-md font-medium mb-3">Infinite Loop Enabled</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            Try clicking next on the last slide or previous on the first slide.
          </p>
          <Card>
            <Carousel infinite>
              {sampleSlides}
            </Carousel>
          </Card>
        </div>

        <div>
          <h4 className="text-md font-medium mb-3">Standard Carousel (no infinite loop)</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            Navigation buttons are disabled at the beginning/end.
          </p>
          <Card>
            <Carousel infinite={false}>
              {sampleSlides}
            </Carousel>
          </Card>
        </div>

        <div>
          <h4 className="text-md font-medium mb-3">Infinite Loop with Autoplay</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            Autoplay continues indefinitely when infinite loop is enabled.
          </p>
          <Card>
            <Carousel infinite autoplay interval={2500}>
              {sampleSlides}
            </Carousel>
          </Card>
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium mb-3">Behavior Comparison</h4>
        <Card className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium text-green-600 dark:text-green-400 mb-2">Infinite Loop Enabled</h5>
              <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                <li>• Next from last slide goes to first slide</li>
                <li>• Previous from first slide goes to last slide</li>
                <li>• Navigation buttons are always enabled</li>
                <li>• Autoplay runs continuously</li>
                <li>• Seamless user experience</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-blue-600 dark:text-blue-400 mb-2">Standard Carousel</h5>
              <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                <li>• Next button disabled on last slide</li>
                <li>• Previous button disabled on first slide</li>
                <li>• Clear beginning and end boundaries</li>
                <li>• Autoplay stops at the end</li>
                <li>• More predictable navigation</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      <div>
        <h4 className="text-md font-medium mb-3">Code Example</h4>
        <Card className="bg-gray-50 dark:bg-gray-800">
          <pre className="text-sm overflow-x-auto">
            <code>{`// Infinite loop enabled
<Carousel infinite>
  {slides}
</Carousel>

// Standard carousel (default)
<Carousel infinite={false}>
  {slides}
</Carousel>

// Infinite loop with autoplay
<Carousel infinite autoplay interval={2500}>
  {slides}
</Carousel>`}</code>
          </pre>
        </Card>
      </div>
    </div>
  )
}
