import { useState, useRef, useEffect } from 'preact/hooks'
import { forwardRef } from 'preact/compat'
import { createPortal } from 'preact/compat'
import { cn } from '../../utils/cn'
import type { TooltipProps, TooltipPosition } from './Tooltip.types'

interface Position {
  top: number
  left: number
  placement: TooltipPosition
}

const ARROW_SIZE = 6
const DEFAULT_OFFSET = 8

// Position calculations
const calculatePosition = (
  triggerRect: DOMRect,
  tooltipRect: DOMRect,
  position: TooltipPosition = 'top',
  offset: number = DEFAULT_OFFSET,
  flip: boolean = true,
  shift: boolean = true
): Position => {
  // Fallback for test environment
  const viewport = typeof window !== 'undefined' ? {
    width: window.innerWidth,
    height: window.innerHeight,
    scrollX: window.scrollX,
    scrollY: window.scrollY
  } : {
    width: 1024,
    height: 768,
    scrollX: 0,
    scrollY: 0
  }

  let top = 0
  let left = 0
  let placement = position

  // Calculate initial position
  switch (position) {
    case 'top':
    case 'top-start':
    case 'top-end':
      top = triggerRect.top + viewport.scrollY - tooltipRect.height - offset
      break
    case 'bottom':
    case 'bottom-start':
    case 'bottom-end':
      top = triggerRect.bottom + viewport.scrollY + offset
      break
    case 'left':
    case 'left-start':
    case 'left-end':
      left = triggerRect.left + viewport.scrollX - tooltipRect.width - offset
      break
    case 'right':
    case 'right-start':
    case 'right-end':
      left = triggerRect.right + viewport.scrollX + offset
      break
    case 'auto':
      // Auto positioning - choose best fit
      const spaces = {
        top: triggerRect.top,
        bottom: viewport.height - triggerRect.bottom,
        left: triggerRect.left,
        right: viewport.width - triggerRect.right
      }
      const maxSpace = Math.max(...Object.values(spaces))
      if (maxSpace === spaces.top) placement = 'top'
      else if (maxSpace === spaces.bottom) placement = 'bottom'
      else if (maxSpace === spaces.left) placement = 'left'
      else placement = 'right'
      return calculatePosition(triggerRect, tooltipRect, placement, offset, flip, shift)
  }

  // Calculate left/top for alignment variants
  if (position.includes('top') || position.includes('bottom')) {
    switch (position) {
      case 'top':
      case 'bottom':
        left = triggerRect.left + viewport.scrollX + (triggerRect.width - tooltipRect.width) / 2
        break
      case 'top-start':
      case 'bottom-start':
        left = triggerRect.left + viewport.scrollX
        break
      case 'top-end':
      case 'bottom-end':
        left = triggerRect.right + viewport.scrollX - tooltipRect.width
        break
    }
  }

  if (position.includes('left') || position.includes('right')) {
    switch (position) {
      case 'left':
      case 'right':
        top = triggerRect.top + viewport.scrollY + (triggerRect.height - tooltipRect.height) / 2
        break
      case 'left-start':
      case 'right-start':
        top = triggerRect.top + viewport.scrollY
        break
      case 'left-end':
      case 'right-end':
        top = triggerRect.bottom + viewport.scrollY - tooltipRect.height
        break
    }
  }

  // Flip if needed and enabled
  if (flip) {
    const wouldOverflowTop = top < viewport.scrollY
    const wouldOverflowBottom = top + tooltipRect.height > viewport.scrollY + viewport.height
    const wouldOverflowLeft = left < viewport.scrollX
    const wouldOverflowRight = left + tooltipRect.width > viewport.scrollX + viewport.width

    if (position.includes('top') && wouldOverflowTop) {
      const flippedPosition = position.replace('top', 'bottom') as TooltipPosition
      return calculatePosition(triggerRect, tooltipRect, flippedPosition, offset, false, shift)
    }
    if (position.includes('bottom') && wouldOverflowBottom) {
      const flippedPosition = position.replace('bottom', 'top') as TooltipPosition
      return calculatePosition(triggerRect, tooltipRect, flippedPosition, offset, false, shift)
    }
    if (position.includes('left') && wouldOverflowLeft) {
      const flippedPosition = position.replace('left', 'right') as TooltipPosition
      return calculatePosition(triggerRect, tooltipRect, flippedPosition, offset, false, shift)
    }
    if (position.includes('right') && wouldOverflowRight) {
      const flippedPosition = position.replace('right', 'left') as TooltipPosition
      return calculatePosition(triggerRect, tooltipRect, flippedPosition, offset, false, shift)
    }
  }

  // Shift if needed and enabled
  if (shift) {
    const padding = 8
    left = Math.max(viewport.scrollX + padding, Math.min(left, viewport.scrollX + viewport.width - tooltipRect.width - padding))
    top = Math.max(viewport.scrollY + padding, Math.min(top, viewport.scrollY + viewport.height - tooltipRect.height - padding))
  }

  return { top, left, placement }
}

// Arrow positioning
const getArrowStyles = (placement: TooltipPosition, offset: number) => {
  const arrowStyles: Record<string, string> = {}
  
  if (placement.includes('top')) {
    arrowStyles.bottom = `-${ARROW_SIZE}px`
    arrowStyles.borderLeftColor = 'transparent'
    arrowStyles.borderRightColor = 'transparent'
    arrowStyles.borderBottomColor = 'transparent'
    
    if (placement === 'top') arrowStyles.left = '50%'
    else if (placement === 'top-start') arrowStyles.left = `${offset}px`
    else if (placement === 'top-end') arrowStyles.right = `${offset}px`
  }
  
  if (placement.includes('bottom')) {
    arrowStyles.top = `-${ARROW_SIZE}px`
    arrowStyles.borderLeftColor = 'transparent'
    arrowStyles.borderRightColor = 'transparent'
    arrowStyles.borderTopColor = 'transparent'
    
    if (placement === 'bottom') arrowStyles.left = '50%'
    else if (placement === 'bottom-start') arrowStyles.left = `${offset}px`
    else if (placement === 'bottom-end') arrowStyles.right = `${offset}px`
  }
  
  if (placement.includes('left')) {
    arrowStyles.right = `-${ARROW_SIZE}px`
    arrowStyles.borderTopColor = 'transparent'
    arrowStyles.borderBottomColor = 'transparent'
    arrowStyles.borderRightColor = 'transparent'
    
    if (placement === 'left') arrowStyles.top = '50%'
    else if (placement === 'left-start') arrowStyles.top = `${offset}px`
    else if (placement === 'left-end') arrowStyles.bottom = `${offset}px`
  }
  
  if (placement.includes('right')) {
    arrowStyles.left = `-${ARROW_SIZE}px`
    arrowStyles.borderTopColor = 'transparent'
    arrowStyles.borderBottomColor = 'transparent'
    arrowStyles.borderLeftColor = 'transparent'
    
    if (placement === 'right') arrowStyles.top = '50%'
    else if (placement === 'right-start') arrowStyles.top = `${offset}px`
    else if (placement === 'right-end') arrowStyles.bottom = `${offset}px`
  }
  
  return arrowStyles
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ 
    content,
    position = 'top',
    trigger = 'hover',
    delay = 100,
    closeDelay = 100,
    disabled = false,
    hasArrow = true,
    size = 'md',
    colorScheme = 'gray',
    offset = DEFAULT_OFFSET,
    flip = true,
    shift = true,
    maxWidth = '320px',
    className,
    'data-testid': testId,
    children,
    ...props 
  }, _ref) => {
    const [isVisible, setIsVisible] = useState(false)
    const [tooltipPosition, setTooltipPosition] = useState<Position>({ top: 0, left: 0, placement: position })
    
    const triggerRef = useRef<HTMLElement>(null)
    const tooltipRef = useRef<HTMLDivElement>(null)
    const showTimeoutRef = useRef<number>()
    const hideTimeoutRef = useRef<number>()

    // Generate unique ID for ARIA
    const tooltipId = `tooltip-${Math.random().toString(36).substr(2, 9)}`

    const updatePosition = () => {
      if (!triggerRef.current || !tooltipRef.current) return

      const triggerRect = triggerRef.current.getBoundingClientRect()
      const tooltipRect = tooltipRef.current.getBoundingClientRect()
      
      // Fallback for test environment where getBoundingClientRect returns zeros
      const fallbackTriggerRect = triggerRect.width === 0 && triggerRect.height === 0 ? 
        { top: 100, left: 100, bottom: 120, right: 200, width: 100, height: 20 } as DOMRect :
        triggerRect
      
      const fallbackTooltipRect = tooltipRect.width === 0 && tooltipRect.height === 0 ?
        { top: 0, left: 0, bottom: 40, right: 200, width: 200, height: 40 } as DOMRect :
        tooltipRect
      
      const newPosition = calculatePosition(
        fallbackTriggerRect, 
        fallbackTooltipRect, 
        position, 
        offset + (hasArrow ? ARROW_SIZE : 0),
        flip, 
        shift
      )
      
      setTooltipPosition(newPosition)
    }

    const showTooltip = () => {
      if (disabled) return
      
      clearTimeout(hideTimeoutRef.current)
      showTimeoutRef.current = window.setTimeout(() => {
        setIsVisible(true)
        // Update position after tooltip renders
        setTimeout(() => {
          updatePosition()
        }, 10)
      }, delay)
    }

    const hideTooltip = () => {
      clearTimeout(showTimeoutRef.current)
      hideTimeoutRef.current = window.setTimeout(() => {
        setIsVisible(false)
      }, closeDelay)
    }

    const handleMouseEnter = () => {
      if (trigger === 'hover' || trigger === 'click') {
        showTooltip()
      }
    }

    const handleMouseLeave = () => {
      if (trigger === 'hover') {
        hideTooltip()
      }
    }

    const handleFocus = () => {
      if (trigger === 'focus') {
        showTooltip()
      }
    }

    const handleBlur = () => {
      if (trigger === 'focus') {
        hideTooltip()
      }
    }

    const handleClick = () => {
      if (trigger === 'click') {
        if (isVisible) {
          hideTooltip()
        } else {
          showTooltip()
        }
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isVisible) {
        hideTooltip()
      }
    }

    // Update position on scroll/resize
    useEffect(() => {
      if (!isVisible) return

      const handleUpdate = () => {
        updatePosition()
      }

      window.addEventListener('scroll', handleUpdate, true)
      window.addEventListener('resize', handleUpdate)
      
      return () => {
        window.removeEventListener('scroll', handleUpdate, true)
        window.removeEventListener('resize', handleUpdate)
      }
    }, [isVisible, position, offset, flip, shift])

    // Cleanup timeouts
    useEffect(() => {
      return () => {
        clearTimeout(showTimeoutRef.current)
        clearTimeout(hideTimeoutRef.current)
      }
    }, [])

    // Size styles
    const sizeStyles = {
      sm: 'px-2 py-1 text-xs',
      md: 'px-3 py-2 text-sm',
      lg: 'px-4 py-3 text-base'
    }

    // Color scheme styles
    const colorSchemeStyles = {
      gray: 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900',
      primary: 'bg-blue-600 text-white dark:bg-blue-500',
      secondary: 'bg-purple-600 text-white dark:bg-purple-500',
      success: 'bg-green-600 text-white dark:bg-green-500',
      warning: 'bg-yellow-600 text-white dark:bg-yellow-500',
      error: 'bg-red-600 text-white dark:bg-red-500'
    }

    // Arrow color styles
    const arrowColorStyles = {
      gray: 'border-gray-900 dark:border-gray-100',
      primary: 'border-blue-600 dark:border-blue-500',
      secondary: 'border-purple-600 dark:border-purple-500',
      success: 'border-green-600 dark:border-green-500',
      warning: 'border-yellow-600 dark:border-yellow-500',
      error: 'border-red-600 dark:border-red-500'
    }

    const triggerElement = (
      <span
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-describedby={isVisible ? tooltipId : undefined}
        tabIndex={trigger === 'focus' ? 0 : undefined}
        className="inline-block"
      >
        {children}
      </span>
    )

    const tooltipElement = isVisible && (
      <div
        ref={tooltipRef}
        id={tooltipId}
        role="tooltip"
        className={cn(
          // Base styles
          'absolute z-50 rounded-md shadow-lg',
          'transition-opacity duration-200',
          'break-words',
          // Size styles
          sizeStyles[size],
          // Color scheme styles
          colorSchemeStyles[colorScheme],
          className
        )}
        style={{
          top: `${tooltipPosition.top}px`,
          left: `${tooltipPosition.left}px`,
          maxWidth,
          opacity: isVisible ? 1 : 0,
          pointerEvents: 'none'
        }}
        data-testid={testId}
        {...props}
      >
        {content}
        
        {hasArrow && (
          <div
            className={cn(
              'absolute w-0 h-0',
              `border-${ARROW_SIZE}`,
              arrowColorStyles[colorScheme]
            )}
            style={{
              ...getArrowStyles(tooltipPosition.placement, 12),
              transform: (
                tooltipPosition.placement.includes('top') || tooltipPosition.placement.includes('bottom')
                  ? 'translateX(-50%)'
                  : 'translateY(-50%)'
              )
            }}
          />
        )}
      </div>
    )

    return (
      <>
        {triggerElement}
        {tooltipElement && (
          typeof document !== 'undefined' && document.body ? (
            createPortal(tooltipElement, document.body)
          ) : (
            tooltipElement
          )
        )}
      </>
    )
  }
)

Tooltip.displayName = 'Tooltip'
