import { Card } from '../../../../nebula/components/Card'
import { Carousel } from '../../../../nebula/components/Carousel'

export function MultipleSlideSection() {
  const imageSlides = [
    <img src="/api/placeholder/300/200" alt="Slide 1" className="w-full h-full object-cover" />,
    <img src="/api/placeholder/300/200" alt="Slide 2" className="w-full h-full object-cover" />,
    <img src="/api/placeholder/300/200" alt="Slide 3" className="w-full h-full object-cover" />,
    <img src="/api/placeholder/300/200" alt="Slide 4" className="w-full h-full object-cover" />,
    <img src="/api/placeholder/300/200" alt="Slide 5" className="w-full h-full object-cover" />,
    <img src="/api/placeholder/300/200" alt="Slide 6" className="w-full h-full object-cover" />
  ]

  const cardSlides = [
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm mx-2">
      <h3 className="font-semibold mb-2">Product 1</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">Description for product 1</p>
    </div>,
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm mx-2">
      <h3 className="font-semibold mb-2">Product 2</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">Description for product 2</p>
    </div>,
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm mx-2">
      <h3 className="font-semibold mb-2">Product 3</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">Description for product 3</p>
    </div>,
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm mx-2">
      <h3 className="font-semibold mb-2">Product 4</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">Description for product 4</p>
    </div>,
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm mx-2">
      <h3 className="font-semibold mb-2">Product 5</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">Description for product 5</p>
    </div>
  ]

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Multiple Slides</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Display multiple slides at once and control how many slides to scroll at a time.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-md font-medium mb-3">Show 2 Slides</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            Display 2 slides side by side, scroll 1 slide at a time.
          </p>
          <Card>
            <Carousel slidesToShow={2} slidesToScroll={1}>
              {imageSlides}
            </Carousel>
          </Card>
        </div>

        <div>
          <h4 className="text-md font-medium mb-3">Show 3 Slides</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            Display 3 slides at once, great for product galleries.
          </p>
          <Card>
            <Carousel slidesToShow={3} slidesToScroll={1}>
              {cardSlides}
            </Carousel>
          </Card>
        </div>

        <div>
          <h4 className="text-md font-medium mb-3">Show 2, Scroll 2</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            Display 2 slides and scroll 2 slides at a time for faster navigation.
          </p>
          <Card>
            <Carousel slidesToShow={2} slidesToScroll={2}>
              {imageSlides}
            </Carousel>
          </Card>
        </div>

        <div>
          <h4 className="text-md font-medium mb-3">Responsive with Autoplay</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            Multiple slides with autoplay and infinite scrolling.
          </p>
          <Card>
            <Carousel 
              slidesToShow={3} 
              slidesToScroll={1} 
              autoplay 
              interval={3000}
              infinite
            >
              {cardSlides}
            </Carousel>
          </Card>
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium mb-3">Responsive Behavior</h4>
        <Card className="p-4">
          <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
            <p>
              <strong>Desktop:</strong> Shows the configured number of slides (slidesToShow)
            </p>
            <p>
              <strong>Tablet:</strong> Adapts to available space (future enhancement)
            </p>
            <p>
              <strong>Mobile:</strong> May show fewer slides to maintain readability (future enhancement)
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
              Note: Responsive breakpoints will be added in a future update.
            </p>
          </div>
        </Card>
      </div>

      <div>
        <h4 className="text-md font-medium mb-3">Dot Indicator Behavior</h4>
        <Card className="p-4">
          <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
            <p>
              When displaying multiple slides, the number of dots is calculated as:
            </p>
            <p className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded inline-block">
              Math.ceil(totalSlides / slidesToShow)
            </p>
            <p>
              This ensures each dot represents a unique "page" of slides.
            </p>
          </div>
        </Card>
      </div>

      <div>
        <h4 className="text-md font-medium mb-3">Code Example</h4>
        <Card className="bg-gray-50 dark:bg-gray-800">
          <pre className="text-sm overflow-x-auto">
            <code>{`// Show 2 slides, scroll 1 at a time
<Carousel slidesToShow={2} slidesToScroll={1}>
  {slides}
</Carousel>

// Show 3 slides, scroll 1 at a time
<Carousel slidesToShow={3} slidesToScroll={1}>
  {slides}
</Carousel>

// Show 2 slides, scroll 2 at a time
<Carousel slidesToShow={2} slidesToScroll={2}>
  {slides}
</Carousel>

// Multiple slides with autoplay and infinite scroll
<Carousel 
  slidesToShow={3} 
  slidesToScroll={1} 
  autoplay 
  interval={3000}
  infinite
>
  {slides}
</Carousel>`}</code>
          </pre>
        </Card>
      </div>
    </div>
  )
}
