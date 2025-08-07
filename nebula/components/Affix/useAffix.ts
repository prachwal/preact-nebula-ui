import { useState, useEffect, useCallback, useRef } from 'preact/hooks'
import type { UseAffixOptions, AffixState, AffixActions } from './Affix.types'

export function useAffix(options: UseAffixOptions = {}): AffixState & AffixActions {
  const {
    offsetTop = 0,
    offsetBottom = 0,
    target,
    position = 'top',
    threshold = 0,
    onAffix,
    onScroll
  } = options

  const [state, setState] = useState<AffixState>({
    affixed: false,
    affixedTop: false,
    affixedBottom: false,
    scrollTop: 0,
    targetRect: null,
    placeholderRect: null
  })

  const elementRef = useRef<HTMLElement | null>(null)
  const placeholderRef = useRef<HTMLElement | null>(null)
  const prevAffixed = useRef<boolean>(false)

  // Get target element
  const getTarget = useCallback((): HTMLElement | Window => {
    if (!target) return window
    
    if (typeof target === 'string') {
      const element = document.querySelector(target) as HTMLElement
      return element || window
    }
    
    if (typeof target === 'function') {
      return target()
    }
    
    return target
  }, [target])

  // Get scroll container and scroll position
  const getScrollInfo = useCallback(() => {
    const targetElement = getTarget()
    
    if (targetElement === window) {
      return {
        scrollTop: window.pageYOffset || document.documentElement.scrollTop,
        scrollHeight: document.documentElement.scrollHeight,
        clientHeight: window.innerHeight
      }
    } else {
      const element = targetElement as HTMLElement
      return {
        scrollTop: element.scrollTop,
        scrollHeight: element.scrollHeight,
        clientHeight: element.clientHeight
      }
    }
  }, [getTarget])

  // Calculate if element should be affixed
  const calculateAffix = useCallback(() => {
    if (!elementRef.current || !placeholderRef.current) return state
    if (options.disabled) {
      // If disabled, never affix and never call onAffix
      if (prevAffixed.current !== false) {
        prevAffixed.current = false
      }
      return {
        ...state,
        affixed: false,
        affixedTop: false,
        affixedBottom: false
      }
    }

    const scrollInfo = getScrollInfo()
    const placeholderRect = placeholderRef.current.getBoundingClientRect()
    const elementRect = elementRef.current.getBoundingClientRect()
    
    let affixed = false
    let affixedTop = false
    let affixedBottom = false

    if (position === 'top') {
      const targetTop = placeholderRect.top
      if (targetTop <= offsetTop + threshold) {
        affixed = affixedTop = true
      } else {
        affixed = affixedTop = false
      }
    } else {
      const targetBottom = placeholderRect.bottom
      const windowHeight = window.innerHeight
      if (targetBottom >= windowHeight - offsetBottom - threshold) {
        affixed = affixedBottom = true
      } else {
        affixed = affixedBottom = false
      }
    }

    const newState: AffixState = {
      affixed,
      affixedTop,
      affixedBottom,
      scrollTop: scrollInfo.scrollTop,
      targetRect: elementRect,
      placeholderRect
    }

    // Call onAffix callback if affix state changed
    if (affixed !== prevAffixed.current) {
      prevAffixed.current = affixed
      onAffix?.(affixed)
    }

    // Call onScroll callback
    onScroll?.(scrollInfo.scrollTop, affixed)

    return newState
  }, [position, offsetTop, offsetBottom, threshold, onAffix, onScroll, getScrollInfo])

  // Update position
  const updatePosition = useCallback(() => {
    const newState = calculateAffix()
    setState(newState)
  }, [calculateAffix])

  // Reset affix state
  const reset = useCallback(() => {
    setState({
      affixed: false,
      affixedTop: false,
      affixedBottom: false,
      scrollTop: 0,
      targetRect: null,
      placeholderRect: null
    })
    prevAffixed.current = false
  }, [])

  // Set element refs
  const setElementRef = useCallback((element: HTMLElement | null) => {
    elementRef.current = element
  }, [])

  const setPlaceholderRef = useCallback((element: HTMLElement | null) => {
    placeholderRef.current = element
  }, [])

  // Set up scroll listeners
  useEffect(() => {
    const targetElement = getTarget()
    
    const handleScroll = () => {
      updatePosition()
    }

    const handleResize = () => {
      updatePosition()
    }

    // Add event listeners
    if (targetElement === window) {
      window.addEventListener('scroll', handleScroll, { passive: true })
      window.addEventListener('resize', handleResize, { passive: true })
    } else {
      const element = targetElement as HTMLElement
      element.addEventListener('scroll', handleScroll, { passive: true })
      window.addEventListener('resize', handleResize, { passive: true })
    }

    // Initial calculation
    updatePosition()

    return () => {
      if (targetElement === window) {
        window.removeEventListener('scroll', handleScroll)
        window.removeEventListener('resize', handleResize)
      } else {
        const element = targetElement as HTMLElement
        element.removeEventListener('scroll', handleScroll)
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [getTarget, updatePosition])

  return {
    ...state,
    updatePosition,
    reset,
    setElementRef,
    setPlaceholderRef
  }
}
