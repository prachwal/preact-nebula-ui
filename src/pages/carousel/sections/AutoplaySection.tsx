import { Card } from '../../../../nebula/components/Card'
import { Carousel } from '../../../../nebula/components/Carousel'

export function AutoplaySection() {

  const sampleSlides = [
    <div className="flex items-center justify-center h-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xl font-semibold">
      Auto Slide 1
    </div>,
    <div className="flex items-center justify-center h-full bg-gradient-to-r from-green-500 to-teal-600 text-white text-xl font-semibold">
      Auto Slide 2
    </div>,
    <div className="flex items-center justify-center h-full bg-gradient-to-r from-orange-500 to-red-600 text-white text-xl font-semibold">
      Auto Slide 3
    </div>,
    <div className="flex items-center justify-center h-full bg-gradient-to-r from-purple-500 to-pink-600 text-white text-xl font-semibold">
      Auto Slide 4
    </div>
  ]

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Autoplay Carousel</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Carousel with autoplay functionality. Users can pause/resume autoplay and control intervals.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-md font-medium mb-3">Autoplay with 3 second interval</h4>
          <Card>
            <Carousel autoplay interval={3000} onSlideChange={(slide) => console.log('Slide:', slide)}>
              {sampleSlides}
            </Carousel>
          </Card>
        </div>

        <div>
          <h4 className="text-md font-medium mb-3">Fast autoplay (1 second interval)</h4>
          <Card>
            <Carousel autoplay interval={1000}>
              {sampleSlides}
            </Carousel>
          </Card>
        </div>

        <div>
          <h4 className="text-md font-medium mb-3">Autoplay with infinite loop</h4>
          <Card>
            <Carousel autoplay interval={2000} infinite>
              {sampleSlides}
            </Carousel>
          </Card>
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium mb-3">Accessibility Features</h4>
        <Card className="p-4">
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <li>• Click the play/pause button in the top-right corner to control autoplay</li>
            <li>• Press spacebar to toggle autoplay when focused</li>
            <li>• Use arrow keys to manually navigate slides</li>
            <li>• Screen readers announce current slide and autoplay status</li>
            <li>• Autoplay pauses on hover (coming in future update)</li>
          </ul>
        </Card>
      </div>

      <div>
        <h4 className="text-md font-medium mb-3">Code Example</h4>
        <Card className="bg-gray-50 dark:bg-gray-800">
          <pre className="text-sm overflow-x-auto">
            <code>{`// Basic autoplay
<Carousel autoplay interval={3000}>
  {slides}
</Carousel>

// Autoplay with infinite loop
<Carousel 
  autoplay 
  interval={2000} 
  infinite
  onSlideChange={(slide) => console.log('Current slide:', slide)}
>
  {slides}
</Carousel>

// Fast autoplay
<Carousel autoplay interval={1000}>
  {slides}
</Carousel>`}</code>
          </pre>
        </Card>
      </div>
    </div>
  )
}
