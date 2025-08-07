import { forwardRef } from 'preact/compat'
import { cn } from '../../utils/cn'
import { useCarousel } from './useCarousel'
import { CarouselSlide } from './CarouselSlide'
import type { CarouselProps } from './Carousel.types'
// import './Carousel.css'

const Carousel = forwardRef<HTMLDivElement, CarouselProps>(({
  children,
  size = 'md',
  autoplay = false,
  interval = 3000,
  infinite = false,
  showDots = true,
  showArrows = true,
  slidesToShow = 1,
  slidesToScroll = 1,
  className,
  onSlideChange,
  ...props
}, ref) => {
  const slides = Array.isArray(children) ? children : [children]
  const totalSlides = slides.length

  const {
    currentSlide,
    isPlaying,
    canGoNext,
    canGoPrev,
    next,
    prev,
    goTo,
    toggle
  } = useCarousel({
    totalSlides,
    autoplay,
    interval,
    infinite,
    slidesToShow,
    slidesToScroll,
    onSlideChange
  })

  const sizeClasses = {
    sm: 'h-48',
    md: 'h-64',
    lg: 'h-80'
  }

  const slideWidth = 100 / slidesToShow

  // Get transform class for current slide
  const getTransformClass = (slide: number) => {
    if (slide <= 5) return `carousel-transform-${slide}`
    return 'carousel-transform-5' // fallback for slides beyond 5
  }

  return (
    <div
      ref={ref}
      className={cn(
        'carousel-container relative rounded-lg bg-gray-100 dark:bg-gray-800',
        sizeClasses[size],
        className
      )}
      aria-label="Image carousel"
      aria-live="polite"
      {...props}
    >
      {/* Slides Container */}
      <div
        className={cn(
          'carousel-slides',
          getTransformClass(currentSlide)
        )}
      >
        {slides.map((slide, index) => (
          <CarouselSlide
            key={index}
            width={slideWidth}
            isActive={
              index >= currentSlide && index < currentSlide + slidesToShow
            }
          >
            {slide}
          </CarouselSlide>
        ))}
      </div>

      {/* Navigation Arrows */}
      {showArrows && totalSlides > slidesToShow && (
        <>
          <button
            onClick={prev}
            disabled={!canGoPrev}
            className={cn(
              'absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md transition-all duration-200 hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900/80 dark:hover:bg-gray-900',
              !canGoPrev && 'opacity-50 cursor-not-allowed'
            )}
            aria-label="Previous slide"
          >
            <svg
              className="h-4 w-4 text-gray-700 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={next}
            disabled={!canGoNext}
            className={cn(
              'absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md transition-all duration-200 hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900/80 dark:hover:bg-gray-900',
              !canGoNext && 'opacity-50 cursor-not-allowed'
            )}
            aria-label="Next slide"
          >
            <svg
              className="h-4 w-4 text-gray-700 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}

      {/* Autoplay Control */}
      {autoplay && (
        <button
          onClick={toggle}
          className="absolute top-2 right-2 rounded-full bg-white/80 p-2 shadow-md transition-all duration-200 hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900/80 dark:hover:bg-gray-900"
          aria-label={isPlaying ? 'Pause autoplay' : 'Start autoplay'}
        >
          {isPlaying ? (
            <svg
              className="h-4 w-4 text-gray-700 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 9v6m4-6v6"
              />
            </svg>
          ) : (
            <svg
              className="h-4 w-4 text-gray-700 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-9-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
        </button>
      )}

      {/* Dots Indicator */}
      {showDots && totalSlides > slidesToShow && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {Array.from({ length: Math.ceil(totalSlides / slidesToShow) }).map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index * slidesToScroll)}
              className={cn(
                'h-2 w-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                index === Math.floor(currentSlide / slidesToScroll)
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/75'
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Screen Reader Status */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {currentSlide + 1} of {totalSlides}
        {autoplay && (isPlaying ? ', autoplay enabled' : ', autoplay paused')}
      </div>
    </div>
  )
})

Carousel.displayName = 'Carousel'

export { Carousel }
