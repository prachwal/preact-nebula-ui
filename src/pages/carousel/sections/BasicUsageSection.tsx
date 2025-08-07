import { Card } from '../../../../nebula/components/Card'
import { Carousel } from '../../../../nebula/components/Carousel'

export function BasicUsageSection() {
  const sampleSlides = [
    <div className="flex items-center justify-center h-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xl font-semibold">
      Slide 1
    </div>,
    <div className="flex items-center justify-center h-full bg-gradient-to-r from-green-500 to-teal-600 text-white text-xl font-semibold">
      Slide 2
    </div>,
    <div className="flex items-center justify-center h-full bg-gradient-to-r from-orange-500 to-red-600 text-white text-xl font-semibold">
      Slide 3
    </div>,
    <div className="flex items-center justify-center h-full bg-gradient-to-r from-purple-500 to-pink-600 text-white text-xl font-semibold">
      Slide 4
    </div>
  ]

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Basic Carousel</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          A simple carousel with navigation arrows and dot indicators.
        </p>
        
        <Card>
          <Carousel>
            {sampleSlides}
          </Carousel>
        </Card>
      </div>

      <div>
        <h4 className="text-md font-medium mb-3">Code Example</h4>
        <Card className="bg-gray-50 dark:bg-gray-800">
          <pre className="text-sm overflow-x-auto">
            <code>{`import { Carousel } from '@nebula/components'

const slides = [
  <div>Slide 1</div>,
  <div>Slide 2</div>,
  <div>Slide 3</div>,
  <div>Slide 4</div>
]

function BasicCarousel() {
  return (
    <Carousel>
      {slides}
    </Carousel>
  )
}`}</code>
          </pre>
        </Card>
      </div>
    </div>
  )
}
