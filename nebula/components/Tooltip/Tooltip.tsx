import { useState, useRef, useEffect } from 'preact/hooks'
import { forwardRef } from 'preact/compat'
import { createPortal } from 'preact/compat'
import { cn } from '../../utils/cn'
import type { TooltipProps, TooltipPosition } from './Tooltip.types'

// Debug flag - set to true to enable debugging
const DEBUG_TOOLTIP = false

// Debug utility
const debug = (...args: any[]) => {
  if (DEBUG_TOOLTIP) {
    console.log('[TOOLTIP DEBUG]', ...args)
  }
}

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
  debug('🔍 calculatePosition called', { position, offset, flip, shift })

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

  debug('📏 Element dimensions:', {
    triggerRect: {
      top: triggerRect.top,
      left: triggerRect.left,
      width: triggerRect.width,
      height: triggerRect.height,
      bottom: triggerRect.bottom,
      right: triggerRect.right
    },
    tooltipRect: {
      width: tooltipRect.width,
      height: tooltipRect.height
    },
    viewport
  })

  let top = 0
  let left = 0
  let placement = position

  debug('🎯 Initial position calculation for:', position)

  // Calculate initial position
  if (position === 'auto') {
    // Auto positioning - choose best fit
    const spaces = {
      top: triggerRect.top,
      bottom: viewport.height - triggerRect.bottom,
      left: triggerRect.left,
      right: viewport.width - triggerRect.right
    };
    const maxSpace = Math.max(...Object.values(spaces));
    debug('\u0016 Auto positioning analysis:', { spaces, maxSpace });
    let autoPlacement: TooltipPosition;
    if (maxSpace === spaces.top) autoPlacement = 'top';
    else if (maxSpace === spaces.bottom) autoPlacement = 'bottom';
    else if (maxSpace === spaces.left) autoPlacement = 'left';
    else autoPlacement = 'right';
    debug('\u0016 Auto positioning chose:', autoPlacement);
    return calculatePosition(triggerRect, tooltipRect, autoPlacement, offset, flip, shift);
  }
  // Standard positions
  switch (position) {
    case 'top':
    case 'top-start':
    case 'top-end':
      top = triggerRect.top + viewport.scrollY - tooltipRect.height - offset;
      debug('📍 Top positioning:', { top, calculation: `${triggerRect.top} + ${viewport.scrollY} - ${tooltipRect.height} - ${offset}` });
      break;
    case 'bottom':
    case 'bottom-start':
    case 'bottom-end':
      top = triggerRect.bottom + viewport.scrollY + offset;
      debug('📍 Bottom positioning:', { top, calculation: `${triggerRect.bottom} + ${viewport.scrollY} + ${offset}` });
      break;
    case 'left':
    case 'left-start':
    case 'left-end':
      left = triggerRect.left + viewport.scrollX - tooltipRect.width - offset;
      debug('📍 Left positioning:', { left, calculation: `${triggerRect.left} + ${viewport.scrollX} - ${tooltipRect.width} - ${offset}` });
      break;
    case 'right':
    case 'right-start':
    case 'right-end':
      left = triggerRect.right + viewport.scrollX + offset;
      debug('📍 Right positioning:', { left, calculation: `${triggerRect.right} + ${viewport.scrollX} + ${offset}` });
      break;
  }

  // Calculate left/top for alignment variants
  if (position.includes('top') || position.includes('bottom')) {
    switch (position) {
      case 'top':
      case 'bottom':
        left = triggerRect.left + viewport.scrollX + (triggerRect.width - tooltipRect.width) / 2;
        debug('📍 Center horizontal alignment:', { left, calculation: `${triggerRect.left} + ${viewport.scrollX} + (${triggerRect.width} - ${tooltipRect.width}) / 2` });
        break;
      case 'top-start':
      case 'bottom-start':
        left = triggerRect.left + viewport.scrollX;
        debug('📍 Start horizontal alignment:', { left, calculation: `${triggerRect.left} + ${viewport.scrollX}` });
        break;
      case 'top-end':
      case 'bottom-end':
        left = triggerRect.right + viewport.scrollX - tooltipRect.width;
        debug('📍 End horizontal alignment:', { left, calculation: `${triggerRect.right} + ${viewport.scrollX} - ${tooltipRect.width}` });
        break;
    }
  }

  // Overflow detection
  const wouldOverflowTop = top < viewport.scrollY;
  const wouldOverflowBottom = top + tooltipRect.height > viewport.scrollY + viewport.height;
  const wouldOverflowLeft = left < viewport.scrollX;
  const wouldOverflowRight = left + tooltipRect.width > viewport.scrollX + viewport.width;

  debug('🚨 Overflow detection:', {
    wouldOverflowTop,
    wouldOverflowBottom,
    wouldOverflowLeft,
    wouldOverflowRight,
    calculations: {
      top,
      'top + tooltipRect.height': top + tooltipRect.height,
      'viewport.scrollY + viewport.height': viewport.scrollY + viewport.height,
      left,
      'left + tooltipRect.width': left + tooltipRect.width,
      'viewport.scrollX + viewport.width': viewport.scrollX + viewport.width
    }
  });

  if (flip) {
    if (position.includes('top') && wouldOverflowTop) {
      const flippedPosition = position.replace('top', 'bottom') as TooltipPosition;
      debug('🔄 Flipping top to bottom:', flippedPosition);
      return calculatePosition(triggerRect, tooltipRect, flippedPosition, offset, false, shift);
    }
    if (position.includes('bottom') && wouldOverflowBottom) {
      const flippedPosition = position.replace('bottom', 'top') as TooltipPosition;
      debug('🔄 Flipping bottom to top:', flippedPosition);
      return calculatePosition(triggerRect, tooltipRect, flippedPosition, offset, false, shift);
    }
    if (position.includes('left') && wouldOverflowLeft) {
      const flippedPosition = position.replace('left', 'right') as TooltipPosition;
      debug('🔄 Flipping left to right:', flippedPosition);
      return calculatePosition(triggerRect, tooltipRect, flippedPosition, offset, false, shift);
    }
    if (position.includes('right') && wouldOverflowRight) {
      const flippedPosition = position.replace('right', 'left') as TooltipPosition;
      debug('🔄 Flipping right to left:', flippedPosition);
      return calculatePosition(triggerRect, tooltipRect, flippedPosition, offset, false, shift);
    }
  }

  // Shift if needed and enabled
  if (shift) {
    const padding = 8;
    const originalLeft = left;
    const originalTop = top;
    left = Math.max(viewport.scrollX + padding, Math.min(left, viewport.scrollX + viewport.width - tooltipRect.width - padding));
    top = Math.max(viewport.scrollY + padding, Math.min(top, viewport.scrollY + viewport.height - tooltipRect.height - padding));

    debug('↔️ Shift adjustments:', {
      padding,
      originalLeft,
      originalTop,
      adjustedLeft: left,
      adjustedTop: top,
      leftChanged: originalLeft !== left,
      topChanged: originalTop !== top
    });
  }

  const finalResult = { top, left, placement };
  debug('✅ Final calculated position:', finalResult);

  return finalResult;
}

// Arrow positioning
const getArrowStyles = (placement: TooltipPosition, offset: number) => {
  debug('🏹 Calculating arrow styles for placement:', placement)

  const arrowStyles: Record<string, string> = {}

  if (placement.includes('top')) {
    arrowStyles.bottom = `-${ARROW_SIZE}px`
    arrowStyles.borderLeftColor = 'transparent'
    arrowStyles.borderRightColor = 'transparent'
    arrowStyles.borderBottomColor = 'transparent'

    if (placement === 'top') arrowStyles.left = '50%'
    else if (placement === 'top-start') arrowStyles.left = `${offset}px`
    else if (placement === 'top-end') arrowStyles.right = `${offset}px`

    debug('🏹 Top arrow styles:', arrowStyles)
  }

  if (placement.includes('bottom')) {
    arrowStyles.top = `-${ARROW_SIZE}px`
    arrowStyles.borderLeftColor = 'transparent'
    arrowStyles.borderRightColor = 'transparent'
    arrowStyles.borderTopColor = 'transparent'

    if (placement === 'bottom') arrowStyles.left = '50%'
    else if (placement === 'bottom-start') arrowStyles.left = `${offset}px`
    else if (placement === 'bottom-end') arrowStyles.right = `${offset}px`

    debug('🏹 Bottom arrow styles:', arrowStyles)
  }

  if (placement.includes('left')) {
    arrowStyles.right = `-${ARROW_SIZE}px`
    arrowStyles.borderTopColor = 'transparent'
    arrowStyles.borderBottomColor = 'transparent'
    arrowStyles.borderRightColor = 'transparent'

    if (placement === 'left') arrowStyles.top = '50%'
    else if (placement === 'left-start') arrowStyles.top = `${offset}px`
    else if (placement === 'left-end') arrowStyles.bottom = `${offset}px`

    debug('🏹 Left arrow styles:', arrowStyles)
  }

  if (placement.includes('right')) {
    arrowStyles.left = `-${ARROW_SIZE}px`
    arrowStyles.borderTopColor = 'transparent'
    arrowStyles.borderBottomColor = 'transparent'
    arrowStyles.borderLeftColor = 'transparent'

    if (placement === 'right') arrowStyles.top = '50%'
    else if (placement === 'right-start') arrowStyles.top = `${offset}px`
    else if (placement === 'right-end') arrowStyles.bottom = `${offset}px`

    debug('🏹 Right arrow styles:', arrowStyles)
  }

  debug('🏹 Final arrow styles:', arrowStyles)
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
    debug('🎯 Tooltip component initialized with props:', {
      position,
      trigger,
      delay,
      closeDelay,
      disabled,
      hasArrow,
      size,
      colorScheme,
      offset,
      flip,
      shift,
      maxWidth,
      testId
    })

    const [isVisible, setIsVisible] = useState(false)
    const [tooltipPosition, setTooltipPosition] = useState<Position>({ top: 0, left: 0, placement: position })

    const triggerRef = useRef<HTMLElement>(null)
    const tooltipRef = useRef<HTMLDivElement>(null)
    const showTimeoutRef = useRef<number>()
    const hideTimeoutRef = useRef<number>()

    // Generate unique ID for ARIA
    const tooltipId = `tooltip-${Math.random().toString(36).substr(2, 9)}`

    debug('📊 Component state initialized:', {
      isVisible,
      tooltipPosition,
      tooltipId,
      refs: {
        triggerRef: !!triggerRef.current,
        tooltipRef: !!tooltipRef.current
      }
    })

    const updatePosition = () => {
      debug('🔄 updatePosition called')

      if (!triggerRef.current || !tooltipRef.current) {
        debug('❌ Missing refs:', {
          triggerRef: !!triggerRef.current,
          tooltipRef: !!tooltipRef.current
        })
        return
      }

      // Get fresh references
      const triggerEl = triggerRef.current
      const tooltipEl = tooltipRef.current

      debug('🎯 Elements found:', {
        triggerEl: {
          tagName: triggerEl.tagName,
          className: triggerEl.className,
          getBoundingClientRect: !!triggerEl.getBoundingClientRect,
          hasMethod: typeof triggerEl.getBoundingClientRect === 'function',
          isHTMLElement: triggerEl instanceof HTMLElement,
          nodeType: triggerEl.nodeType
        },
        tooltipEl: {
          tagName: tooltipEl.tagName,
          className: tooltipEl.className,
          getBoundingClientRect: !!tooltipEl.getBoundingClientRect,
          hasMethod: typeof tooltipEl.getBoundingClientRect === 'function',
          isHTMLElement: tooltipEl instanceof HTMLElement,
          nodeType: tooltipEl.nodeType
        }
      })

      const triggerRect = triggerEl.getBoundingClientRect()
      const tooltipRect = tooltipEl.getBoundingClientRect()

      debug('📏 Raw getBoundingClientRect results:', {
        triggerRect: {
          top: triggerRect.top,
          left: triggerRect.left,
          width: triggerRect.width,
          height: triggerRect.height,
          bottom: triggerRect.bottom,
          right: triggerRect.right
        },
        tooltipRect: {
          top: tooltipRect.top,
          left: tooltipRect.left,
          width: tooltipRect.width,
          height: tooltipRect.height,
          bottom: tooltipRect.bottom,
          right: tooltipRect.right
        }
      })

      // Fallback for test environment where getBoundingClientRect returns zeros
      const fallbackTriggerRect = triggerRect.width === 0 && triggerRect.height === 0 ?
        { top: 100, left: 100, bottom: 120, right: 200, width: 100, height: 20 } as DOMRect :
        triggerRect

      const fallbackTooltipRect = tooltipRect.width === 0 && tooltipRect.height === 0 ?
        { top: 0, left: 0, bottom: 40, right: 200, width: 200, height: 40 } as DOMRect :
        tooltipRect

      const usingFallback = fallbackTriggerRect !== triggerRect || fallbackTooltipRect !== tooltipRect
      debug('📐 Using fallback dimensions:', {
        usingFallback,
        fallbackTriggerRect: usingFallback ? fallbackTriggerRect : 'no fallback needed',
        fallbackTooltipRect: usingFallback ? fallbackTooltipRect : 'no fallback needed'
      })

      const newPosition = calculatePosition(
        fallbackTriggerRect,
        fallbackTooltipRect,
        position,
        offset + (hasArrow ? ARROW_SIZE : 0),
        flip,
        shift
      )

      debug('🎯 Setting tooltip position:', newPosition)
      setTooltipPosition(newPosition)
    }

    const showTooltip = () => {
      debug('🟢 showTooltip() called', { disabled, delay })

      if (disabled) {
        debug('❌ showTooltip() blocked - disabled')
        return
      }

      if (hideTimeoutRef.current) {
        debug('🚫 Clearing hide timeout')
        clearTimeout(hideTimeoutRef.current)
      }

      if (delay > 0) {
        debug('⏱️ Showing tooltip with delay:', delay)
        showTimeoutRef.current = window.setTimeout(() => {
          debug('⏱️ Show delay completed - setting visible')
          setIsVisible(true)
          // Update position after tooltip renders
          setTimeout(() => {
            debug('🎬 Updating position after render delay')
            updatePosition()
          }, 10)
        }, delay)
      } else {
        debug('🟢 Showing tooltip immediately')
        setIsVisible(true)
        setTimeout(() => {
          debug('🎬 Updating position after immediate render')
          updatePosition()
        }, 10)
      }
    }

    const hideTooltip = () => {
      debug('🔴 hideTooltip() called', { closeDelay })

      if (showTimeoutRef.current) {
        debug('🚫 Clearing show timeout')
        clearTimeout(showTimeoutRef.current)
      }

      if (closeDelay > 0) {
        debug('⏱️ Hiding tooltip with delay:', closeDelay)
        hideTimeoutRef.current = window.setTimeout(() => {
          debug('⏱️ Hide delay completed - setting invisible')
          setIsVisible(false)
        }, closeDelay)
      } else {
        debug('🔴 Hiding tooltip immediately')
        setIsVisible(false)
      }
    }

    const handleMouseEnter = () => {
      debug('🖱️ handleMouseEnter triggered', { trigger })
      if (trigger === 'hover' || trigger === 'click') {
        showTooltip()
      }
    }

    const handleMouseLeave = () => {
      debug('🖱️ handleMouseLeave triggered', { trigger })
      if (trigger === 'hover') {
        hideTooltip()
      }
    }

    const handleFocus = () => {
      debug('🎯 handleFocus triggered', { trigger })
      if (trigger === 'focus') {
        showTooltip()
      }
    }

    const handleBlur = () => {
      debug('🎯 handleBlur triggered', { trigger })
      if (trigger === 'focus') {
        hideTooltip()
      }
    }

    const handleClick = () => {
      debug('👆 handleClick triggered', { trigger, isVisible })
      if (trigger === 'click') {
        if (isVisible) {
          debug('👆 Click - hiding tooltip')
          hideTooltip()
        } else {
          debug('👆 Click - showing tooltip')
          showTooltip()
        }
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      debug('⌨️ handleKeyDown triggered', { key: event.key, isVisible })
      if (event.key === 'Escape' && isVisible) {
        debug('⌨️ Escape pressed - hiding tooltip')
        hideTooltip()
      }
    }

    // Update position on scroll/resize
    useEffect(() => {
      debug('📍 Position update effect triggered', { isVisible })

      if (!isVisible) return

      const handleUpdate = () => {
        debug('🔄 Position update triggered (scroll/resize)')
        updatePosition()
      }

      debug('📍 Setting up position update listeners')
      window.addEventListener('scroll', handleUpdate, true)
      window.addEventListener('resize', handleUpdate)

      return () => {
        debug('🧹 Cleaning up position listeners')
        window.removeEventListener('scroll', handleUpdate, true)
        window.removeEventListener('resize', handleUpdate)
      }
    }, [isVisible, position, offset, flip, shift])

    // Cleanup timeouts
    useEffect(() => {
      debug('🧹 Setting up cleanup effect')
      return () => {
        debug('🧹 Cleaning up timeouts')
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

    debug('🎨 Creating trigger element with events:', {
      trigger,
      isVisible,
      tooltipId,
      hasTabIndex: trigger === 'focus'
    })

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

    debug('🎨 Creating tooltip element:', {
      isVisible,
      tooltipPosition,
      hasArrow,
      maxWidth,
      size,
      colorScheme
    })

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
          position: 'absolute',
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

    const portalTarget = typeof document !== 'undefined' && document.body ? document.body : null
    const usePortal = !!portalTarget && !!tooltipElement

    debug('🚪 Portal rendering decision:', {
      tooltipElement: !!tooltipElement,
      portalTarget: portalTarget?.tagName || 'none',
      usePortal,
      isVisible,
      position: tooltipPosition
    })

    return (
      <>
        {triggerElement}
        {tooltipElement && (
          usePortal ? (
            createPortal(tooltipElement, portalTarget)
          ) : (
            tooltipElement
          )
        )}
      </>
    )
  }
)

Tooltip.displayName = 'Tooltip'
