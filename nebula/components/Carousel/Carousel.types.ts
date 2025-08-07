import type { ComponentChild } from 'preact'

export interface CarouselProps {
  // Size variants (required pattern)
  size?: 'sm' | 'md' | 'lg'
  
  // Core carousel props
  children?: ComponentChild[]
  className?: string
  
  // Carousel-specific props
  autoplay?: boolean
  interval?: number
  infinite?: boolean
  showDots?: boolean
  showArrows?: boolean
  slidesToShow?: number
  slidesToScroll?: number
  
  // Event handlers
  onSlideChange?: (currentSlide: number) => void
  
  // Accessibility props
  'aria-label'?: string
  'aria-describedby'?: string
}

export interface CarouselSlideProps {
  children?: ComponentChild
  className?: string
  isActive?: boolean
  index?: number
  width?: number
}

export interface UseCarouselOptions {
  totalSlides: number
  autoplay?: boolean
  interval?: number
  infinite?: boolean
  slidesToShow?: number
  slidesToScroll?: number
  onSlideChange?: (currentSlide: number) => void
}

export interface CarouselState {
  currentSlide: number
  isPlaying: boolean
  canGoNext: boolean
  canGoPrev: boolean
}

export interface CarouselActions {
  next: () => void
  prev: () => void
  goTo: (slide: number) => void
  play: () => void
  pause: () => void
  toggle: () => void
}
