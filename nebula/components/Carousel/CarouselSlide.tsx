import { forwardRef } from 'preact/compat'
import { cn } from '../../utils/cn'
import type { CarouselSlideProps } from './Carousel.types'

const CarouselSlide = forwardRef<HTMLDivElement, CarouselSlideProps>(({
  children,
  width = 100,
  isActive = false,
  className,
  ...props
}, ref) => {
  // Map width to CSS classes
  const getWidthClass = (width: number) => {
    if (width === 100) return 'carousel-slide-full'
    if (width === 50) return 'carousel-slide-half'
    if (width === 33.333 || Math.abs(width - 33.333) < 0.1) return 'carousel-slide-third'
    if (width === 25) return 'carousel-slide-quarter'
    if (width === 20) return 'carousel-slide-fifth'
    return 'carousel-slide-full' // fallback
  }

  return (
    <div
      ref={ref}
      className={cn(
        'carousel-slide',
        getWidthClass(width),
        className
      )}
      aria-hidden={!isActive}
      {...props}
    >
      {children}
    </div>
  )
})

CarouselSlide.displayName = 'CarouselSlide'

export { CarouselSlide }
