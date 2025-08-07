import { Card } from '../../../../nebula/components/Card'

export function PropsDocumentationSection() {
  const propsList = [
    {
      prop: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Controls the height of the carousel: sm (192px), md (256px), lg (320px)'
    },
    {
      prop: 'children',
      type: 'ComponentChild[]',
      default: '[]',
      description: 'Array of slide content to display in the carousel'
    },
    {
      prop: 'autoplay',
      type: 'boolean',
      default: 'false',
      description: 'Enable automatic slide progression'
    },
    {
      prop: 'interval',
      type: 'number',
      default: '3000',
      description: 'Time between slides in milliseconds when autoplay is enabled'
    },
    {
      prop: 'infinite',
      type: 'boolean',
      default: 'false',
      description: 'Enable infinite loop - wraps from last slide to first slide'
    },
    {
      prop: 'showDots',
      type: 'boolean',
      default: 'true',
      description: 'Show dot indicators at the bottom of the carousel'
    },
    {
      prop: 'showArrows',
      type: 'boolean',
      default: 'true',
      description: 'Show navigation arrows on the sides of the carousel'
    },
    {
      prop: 'slidesToShow',
      type: 'number',
      default: '1',
      description: 'Number of slides to display at once'
    },
    {
      prop: 'slidesToScroll',
      type: 'number',
      default: '1',
      description: 'Number of slides to scroll when navigating'
    },
    {
      prop: 'onSlideChange',
      type: '(currentSlide: number) => void',
      default: 'undefined',
      description: 'Callback function called when the current slide changes'
    },
    {
      prop: 'className',
      type: 'string',
      default: 'undefined',
      description: 'Additional CSS classes to apply to the carousel container'
    },
    {
      prop: 'aria-label',
      type: 'string',
      default: "'Image carousel'",
      description: 'Accessible label for screen readers'
    },
    {
      prop: 'aria-describedby',
      type: 'string',
      default: 'undefined',
      description: 'ID of element that describes the carousel'
    }
  ]

  const hookReturnValues = [
    {
      property: 'currentSlide',
      type: 'number',
      description: 'Index of the currently visible slide'
    },
    {
      property: 'isPlaying',
      type: 'boolean',
      description: 'Whether autoplay is currently active'
    },
    {
      property: 'canGoNext',
      type: 'boolean',
      description: 'Whether navigation to next slide is possible'
    },
    {
      property: 'canGoPrev',
      type: 'boolean',
      description: 'Whether navigation to previous slide is possible'
    },
    {
      property: 'next',
      type: '() => void',
      description: 'Function to navigate to the next slide'
    },
    {
      property: 'prev',
      type: '() => void',
      description: 'Function to navigate to the previous slide'
    },
    {
      property: 'goTo',
      type: '(slide: number) => void',
      description: 'Function to navigate to a specific slide'
    },
    {
      property: 'play',
      type: '() => void',
      description: 'Function to start autoplay'
    },
    {
      property: 'pause',
      type: '() => void',
      description: 'Function to pause autoplay'
    },
    {
      property: 'toggle',
      type: '() => void',
      description: 'Function to toggle autoplay on/off'
    }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Component Props</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Complete reference for all Carousel component properties and their usage.
        </p>
      </div>

      <div>
        <h4 className="text-md font-medium mb-4">Carousel Props</h4>
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left p-3 font-medium">Prop</th>
                  <th className="text-left p-3 font-medium">Type</th>
                  <th className="text-left p-3 font-medium">Default</th>
                  <th className="text-left p-3 font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                {propsList.map((prop, index) => (
                  <tr key={prop.prop} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800/50' : ''}>
                    <td className="p-3 font-mono text-blue-600 dark:text-blue-400">{prop.prop}</td>
                    <td className="p-3 font-mono text-sm text-gray-600 dark:text-gray-300">{prop.type}</td>
                    <td className="p-3 font-mono text-sm text-gray-500 dark:text-gray-400">{prop.default}</td>
                    <td className="p-3 text-gray-700 dark:text-gray-200">{prop.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <div>
        <h4 className="text-md font-medium mb-4">useCarousel Hook</h4>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          The carousel component uses a custom hook that provides programmatic control. You can use this hook directly for custom carousel implementations.
        </p>
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left p-3 font-medium">Property</th>
                  <th className="text-left p-3 font-medium">Type</th>
                  <th className="text-left p-3 font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                {hookReturnValues.map((item, index) => (
                  <tr key={item.property} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800/50' : ''}>
                    <td className="p-3 font-mono text-blue-600 dark:text-blue-400">{item.property}</td>
                    <td className="p-3 font-mono text-sm text-gray-600 dark:text-gray-300">{item.type}</td>
                    <td className="p-3 text-gray-700 dark:text-gray-200">{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <div>
        <h4 className="text-md font-medium mb-3">Example Usage</h4>
        <Card className="bg-gray-50 dark:bg-gray-800">
          <pre className="text-sm overflow-x-auto">
            <code>{`import { Carousel } from '@nebula/components'

// Basic carousel
<Carousel>
  {slides}
</Carousel>

// Full-featured carousel
<Carousel
  size="lg"
  autoplay
  interval={5000}
  infinite
  slidesToShow={3}
  slidesToScroll={1}
  showDots={true}
  showArrows={true}
  onSlideChange={(slide) => console.log('Current slide:', slide)}
  aria-label="Product gallery"
  className="my-custom-carousel"
>
  {slides}
</Carousel>

// Using the hook directly
import { useCarousel } from '@nebula/components'

function CustomCarousel() {
  const { currentSlide, next, prev, isPlaying, toggle } = useCarousel({
    totalSlides: 5,
    autoplay: true,
    interval: 3000,
    infinite: true
  })
  
  return (
    <div>
      <div>Current slide: {currentSlide + 1}</div>
      <button onClick={prev}>Previous</button>
      <button onClick={next}>Next</button>
      <button onClick={toggle}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  )
}`}</code>
          </pre>
        </Card>
      </div>

      <div>
        <h4 className="text-md font-medium mb-3">TypeScript Types</h4>
        <Card className="bg-gray-50 dark:bg-gray-800">
          <pre className="text-sm overflow-x-auto">
            <code>{`interface CarouselProps {
  size?: 'sm' | 'md' | 'lg'
  children?: ComponentChild[]
  className?: string
  autoplay?: boolean
  interval?: number
  infinite?: boolean
  showDots?: boolean
  showArrows?: boolean
  slidesToShow?: number
  slidesToScroll?: number
  onSlideChange?: (currentSlide: number) => void
  'aria-label'?: string
  'aria-describedby'?: string
}

interface UseCarouselOptions {
  totalSlides: number
  autoplay?: boolean
  interval?: number
  infinite?: boolean
  slidesToShow?: number
  slidesToScroll?: number
  onSlideChange?: (currentSlide: number) => void
}`}</code>
          </pre>
        </Card>
      </div>
    </div>
  )
}
