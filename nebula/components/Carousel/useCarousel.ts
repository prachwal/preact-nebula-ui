import { useState, useEffect, useCallback } from 'preact/hooks'
import type { UseCarouselOptions, CarouselState, CarouselActions } from './Carousel.types'

export function useCarousel(options: UseCarouselOptions): CarouselState & CarouselActions {
  const {
    totalSlides,
    autoplay = false,
    interval = 3000,
    infinite = false,
    slidesToShow = 1,
    slidesToScroll = 1,
    onSlideChange
  } = options

  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoplay)

  const maxSlide = Math.max(0, totalSlides - slidesToShow)
  const canGoNext = infinite || currentSlide < maxSlide
  const canGoPrev = infinite || currentSlide > 0

  const goTo = useCallback((slide: number) => {
    let nextSlide = slide
    
    if (infinite) {
      if (slide < 0) {
        nextSlide = maxSlide
      } else if (slide > maxSlide) {
        nextSlide = 0
      }
    } else {
      nextSlide = Math.max(0, Math.min(slide, maxSlide))
    }
    
    setCurrentSlide(nextSlide)
    onSlideChange?.(nextSlide)
  }, [maxSlide, infinite, onSlideChange])

  const next = useCallback(() => {
    if (canGoNext) {
      goTo(currentSlide + slidesToScroll)
    }
  }, [currentSlide, slidesToScroll, canGoNext, goTo])

  const prev = useCallback(() => {
    if (canGoPrev) {
      goTo(currentSlide - slidesToScroll)
    }
  }, [currentSlide, slidesToScroll, canGoPrev, goTo])

  const play = useCallback(() => {
    setIsPlaying(true)
  }, [])

  const pause = useCallback(() => {
    setIsPlaying(false)
  }, [])

  const toggle = useCallback(() => {
    setIsPlaying(!isPlaying)
  }, [isPlaying])

  // Autoplay functionality
  useEffect(() => {
    if (!isPlaying || !autoplay) return

    const timer = setInterval(() => {
      if (infinite || currentSlide < maxSlide) {
        next()
      } else {
        setIsPlaying(false) // Stop at the end if not infinite
      }
    }, interval)

    return () => clearInterval(timer)
  }, [isPlaying, autoplay, currentSlide, maxSlide, infinite, interval, next])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault()
          prev()
          break
        case 'ArrowRight':
          event.preventDefault()
          next()
          break
        case ' ':
          event.preventDefault()
          toggle()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [prev, next, toggle])

  return {
    currentSlide,
    isPlaying,
    canGoNext,
    canGoPrev,
    next,
    prev,
    goTo,
    play,
    pause,
    toggle
  }
}
