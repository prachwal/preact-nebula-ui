import { forwardRef } from 'preact/compat'
import { useState, useEffect, useRef } from 'preact/hooks'
import { cn } from '../../utils/cn'
import type { AffixProps } from './Affix.types'
import './Affix.css'

const Affix = forwardRef<HTMLDivElement, AffixProps>(({
  size = 'md',
  offsetTop = 0,
  offsetBottom,
  target,
  position = 'top',
  disabled = false,
  threshold = 0,
  onAffix,
  onChange,
  onScroll,
  className,
  children,
  ...restProps
}, ref) => {
  const [affixed, setAffixed] = useState(false)
  const [affixStyle, setAffixStyle] = useState<Record<string, any>>({})
  const [placeholderStyle, setPlaceholderStyle] = useState<Record<string, any>>({})
  
  const affixRef = useRef<HTMLDivElement>(null)
  const placeholderRef = useRef<HTMLDivElement>(null)

  // Auto-set offsetBottom based on position if not explicitly provided
  const effectiveOffsetTop = position === 'bottom' ? undefined : offsetTop
  const effectiveOffsetBottom = position === 'bottom' ? (offsetBottom ?? 0) : offsetBottom

  useEffect(() => {
    if (disabled) {
      setAffixed(false)
      setAffixStyle({})
      setPlaceholderStyle({})
      return
    }

    // Get target element with auto-detection inside useEffect
    const getTargetElementInternal = () => {
      if (target) {
        if (typeof target === 'function') {
          return target()
        }
        if (typeof target === 'string') {
          return document.querySelector(target) as HTMLElement
        }
        return target
      }
      
      // Auto-detect scrollable parent if no target is specified
      if (placeholderRef.current) {
        let parent = placeholderRef.current.parentElement
        while (parent && parent !== document.body) {
          const computed = window.getComputedStyle(parent)
          const hasScroll = computed.overflowY === 'auto' || 
                           computed.overflowY === 'scroll' || 
                           computed.overflow === 'auto' || 
                           computed.overflow === 'scroll'
          
          if (hasScroll) {
            return parent
          }
          parent = parent.parentElement
        }
      }
      
      return window
    }

    const targetElement = getTargetElementInternal()
    
    const updatePosition = () => {
      if (!affixRef.current || !placeholderRef.current) return

      const affixNode = affixRef.current
      const placeholderNode = placeholderRef.current
      const targetRect = targetElement === window 
        ? { top: 0, bottom: window.innerHeight }
        : (targetElement as HTMLElement).getBoundingClientRect()

      const affixRect = affixNode.getBoundingClientRect()
      const placeholderRect = placeholderNode.getBoundingClientRect()

      // Add hysteresis to prevent flickering - smaller value for better responsiveness
      const actualThreshold = affixed ? threshold + 2 : threshold
      
      let isAffixedTopWithHysteresis = false
      let isAffixedBottomWithHysteresis = false
      
      if (effectiveOffsetTop !== undefined) {
        if (targetElement === window) {
          // For window target, check against viewport top
          // Also check if there's a sticky header to avoid collision
          const stickyHeader = document.querySelector('header.sticky, .sticky-header, [data-sticky="header"]')
          const headerHeight = stickyHeader ? stickyHeader.getBoundingClientRect().height : 0
          const adjustedOffsetTop = effectiveOffsetTop + headerHeight
          
          isAffixedTopWithHysteresis = placeholderRect.top <= (adjustedOffsetTop + actualThreshold)
        } else {
          // For container target, check against container's top
          const containerRect = (targetElement as HTMLElement).getBoundingClientRect()
          isAffixedTopWithHysteresis = placeholderRect.top <= (containerRect.top + effectiveOffsetTop + actualThreshold)
        }
      }
      
      if (effectiveOffsetBottom !== undefined) {
        isAffixedBottomWithHysteresis = placeholderRect.bottom >= (targetRect.bottom - effectiveOffsetBottom - actualThreshold)
      }
      
      const shouldAffixWithHysteresis = isAffixedTopWithHysteresis || isAffixedBottomWithHysteresis

      if (shouldAffixWithHysteresis && !affixed) {
        // Set placeholder to maintain layout
        setPlaceholderStyle({
          width: `${affixRect.width}px`,
          height: `${affixRect.height}px`,
          visibility: 'hidden'
        })

        // Determine positioning strategy based on container
        const findPositionedParent = (element: HTMLElement): HTMLElement | null => {
          let parent = element.parentElement
          while (parent && parent !== document.body) {
            const computed = window.getComputedStyle(parent)
            if (computed.position === 'relative' || computed.position === 'absolute' || computed.position === 'fixed') {
              return parent
            }
            parent = parent.parentElement
          }
          return null
        }

        const positionedParent = findPositionedParent(placeholderNode)
        const useAbsolute = positionedParent !== null
        
        // Set affix styles
        const newAffixStyle: Record<string, any> = {
          position: useAbsolute ? 'absolute' : 'fixed',
          zIndex: 40, // Lower than header z-index (50)
          width: `${affixRect.width}px`,
        }

        if (useAbsolute) {
          // Position relative to the positioned parent
          const parentRect = positionedParent!.getBoundingClientRect()
          newAffixStyle.left = `${placeholderRect.left - parentRect.left}px`
          if (isAffixedTopWithHysteresis) {
            newAffixStyle.top = `${effectiveOffsetTop}px`
          } else if (isAffixedBottomWithHysteresis) {
            newAffixStyle.bottom = `${effectiveOffsetBottom}px`
          }
        } else {
          // Position relative to viewport
          newAffixStyle.left = `${placeholderRect.left}px`
          if (isAffixedTopWithHysteresis) {
            // Check for sticky header and adjust top position
            const stickyHeader = document.querySelector('header.sticky, .sticky-header, [data-sticky="header"]')
            const headerHeight = stickyHeader ? stickyHeader.getBoundingClientRect().height : 0
            newAffixStyle.top = `${(effectiveOffsetTop || 0) + headerHeight}px`
          } else if (isAffixedBottomWithHysteresis) {
            newAffixStyle.bottom = `${effectiveOffsetBottom}px`
          }
        }

        setAffixStyle(newAffixStyle)
        setAffixed(true)
        onAffix?.(true)
        onChange?.(true)
        
      } else if (!shouldAffixWithHysteresis && affixed) {
        // Reset to normal state
        setAffixStyle({})
        setPlaceholderStyle({})
        setAffixed(false)
        onAffix?.(false)
        onChange?.(false)
      }

      // Call scroll callback
      if (onScroll) {
        const scrollTop = targetElement === window 
          ? window.pageYOffset || document.documentElement.scrollTop
          : (targetElement as HTMLElement).scrollTop
        onScroll(scrollTop, shouldAffixWithHysteresis)
      }
    }

    // Initial position update
    updatePosition()
    
    // Update on next tick to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      updatePosition()
    }, 10)

    // Event listeners
    const handleScroll = () => updatePosition()
    const handleResize = () => updatePosition()

    if (targetElement === window) {
      window.addEventListener('scroll', handleScroll, { passive: true })
      window.addEventListener('resize', handleResize)
    } else {
      ;(targetElement as HTMLElement).addEventListener('scroll', handleScroll, { passive: true })
      window.addEventListener('resize', handleResize)
    }

    return () => {
      clearTimeout(timeoutId)
      if (targetElement === window) {
        window.removeEventListener('scroll', handleScroll)
        window.removeEventListener('resize', handleResize)
      } else {
        ;(targetElement as HTMLElement).removeEventListener('scroll', handleScroll)
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [affixed, effectiveOffsetTop, effectiveOffsetBottom, target, onAffix, onChange, onScroll, disabled, threshold])

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }

  const baseClasses = cn(
    'transition-all duration-200',
    sizeClasses[size],
    affixed && 'shadow-lg',
    className
  )

  return (
    <>
      {/* Placeholder to maintain layout when affixed */}
      <div
        ref={placeholderRef}
        style={placeholderStyle}
        aria-hidden="true"
      />

      {/* Main affix element */}
      <div
        ref={(node) => {
          affixRef.current = node
          if (typeof ref === 'function') {
            ref(node)
          } else if (ref) {
            ref.current = node
          }
        }}
        className={baseClasses}
        style={affixStyle}
        {...restProps}
      >
        {children}
      </div>
    </>
  )
})

Affix.displayName = 'Affix'

export { Affix }
