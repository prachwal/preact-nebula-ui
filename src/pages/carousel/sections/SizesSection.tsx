import { Card } from '../../../../nebula/components/Card'
import { Carousel } from '../../../../nebula/components/Carousel'

export function SizesSection() {
  const sampleSlides = [
    <div className="flex items-center justify-center h-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold">
      Content 1
    </div>,
    <div className="flex items-center justify-center h-full bg-gradient-to-r from-green-500 to-teal-600 text-white font-semibold">
      Content 2
    </div>,
    <div className="flex items-center justify-center h-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold">
      Content 3
    </div>
  ]

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Size Variants</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Carousel supports three size variants: small (sm), medium (md), and large (lg).
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-md font-medium mb-3">Small (sm) - 192px height</h4>
          <Card>
            <Carousel size="sm">
              {sampleSlides}
            </Carousel>
          </Card>
        </div>

        <div>
          <h4 className="text-md font-medium mb-3">Medium (md) - 256px height (default)</h4>
          <Card>
            <Carousel size="md">
              {sampleSlides}
            </Carousel>
          </Card>
        </div>

        <div>
          <h4 className="text-md font-medium mb-3">Large (lg) - 320px height</h4>
          <Card>
            <Carousel size="lg">
              {sampleSlides}
            </Carousel>
          </Card>
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium mb-3">Code Example</h4>
        <Card className="bg-gray-50 dark:bg-gray-800">
          <pre className="text-sm overflow-x-auto">
            <code>{`// Small carousel
<Carousel size="sm">
  {slides}
</Carousel>

// Medium carousel (default)
<Carousel size="md">
  {slides}
</Carousel>

// Large carousel
<Carousel size="lg">
  {slides}
</Carousel>`}</code>
          </pre>
        </Card>
      </div>
    </div>
  )
}
