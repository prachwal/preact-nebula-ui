import { Card } from '../../../../nebula/components/Card'
import { Carousel } from '../../../../nebula/components/Carousel'

export function NavigationSection() {
  const sampleSlides = [
    <div className="flex items-center justify-center h-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xl font-semibold">
      Navigation 1
    </div>,
    <div className="flex items-center justify-center h-full bg-gradient-to-r from-emerald-500 to-green-600 text-white text-xl font-semibold">
      Navigation 2
    </div>,
    <div className="flex items-center justify-center h-full bg-gradient-to-r from-violet-500 to-purple-600 text-white text-xl font-semibold">
      Navigation 3
    </div>,
    <div className="flex items-center justify-center h-full bg-gradient-to-r from-rose-500 to-pink-600 text-white text-xl font-semibold">
      Navigation 4
    </div>
  ]

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Navigation Controls</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Customize navigation controls including arrows and dot indicators.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-md font-medium mb-3">Default Navigation</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            Both arrows and dots are shown by default.
          </p>
          <Card>
            <Carousel>
              {sampleSlides}
            </Carousel>
          </Card>
        </div>

        <div>
          <h4 className="text-md font-medium mb-3">Arrows Only</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            Hide dot indicators, show only navigation arrows.
          </p>
          <Card>
            <Carousel showDots={false}>
              {sampleSlides}
            </Carousel>
          </Card>
        </div>

        <div>
          <h4 className="text-md font-medium mb-3">Dots Only</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            Hide navigation arrows, show only dot indicators.
          </p>
          <Card>
            <Carousel showArrows={false}>
              {sampleSlides}
            </Carousel>
          </Card>
        </div>

        <div>
          <h4 className="text-md font-medium mb-3">No Navigation</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            Hide all navigation controls. Users can still navigate with keyboard.
          </p>
          <Card>
            <Carousel showArrows={false} showDots={false}>
              {sampleSlides}
            </Carousel>
          </Card>
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium mb-3">Keyboard Navigation</h4>
        <Card className="p-4">
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center space-x-3">
              <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">←</span>
              <span>Previous slide</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">→</span>
              <span>Next slide</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">Space</span>
              <span>Toggle autoplay (when enabled)</span>
            </div>
          </div>
        </Card>
      </div>

      <div>
        <h4 className="text-md font-medium mb-3">Accessibility Features</h4>
        <Card className="p-4">
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <li>• ARIA labels for all navigation controls</li>
            <li>• Proper focus management and keyboard navigation</li>
            <li>• Screen reader announcements for slide changes</li>
            <li>• High contrast focus indicators</li>
            <li>• Disabled state handling for navigation buttons</li>
          </ul>
        </Card>
      </div>

      <div>
        <h4 className="text-md font-medium mb-3">Code Example</h4>
        <Card className="bg-gray-50 dark:bg-gray-800">
          <pre className="text-sm overflow-x-auto">
            <code>{`// Default navigation (both arrows and dots)
<Carousel>
  {slides}
</Carousel>

// Arrows only
<Carousel showDots={false}>
  {slides}
</Carousel>

// Dots only
<Carousel showArrows={false}>
  {slides}
</Carousel>

// No navigation controls
<Carousel showArrows={false} showDots={false}>
  {slides}
</Carousel>`}</code>
          </pre>
        </Card>
      </div>
    </div>
  )
}
