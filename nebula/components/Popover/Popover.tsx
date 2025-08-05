import { useState, useEffect, useRef, useCallback } from 'preact/hooks'
import { createPortal, cloneElement } from 'preact/compat'
import { cn } from '../../utils/cn'
import type { PopoverProps, PopoverPosition, PopoverState } from './Popover.types'

// Debug flag - set to true to enable debugging
const DEBUG_POPOVER = false

// Debug utility
const debug = (...args: any[]) => {
  if (DEBUG_POPOVER) {
    console.log('[POPOVER DEBUG]', ...args)
  }
}

// Position calculation utilities
function calculatePosition(
  triggerElement: HTMLElement,
  contentElement: HTMLElement,
  position: PopoverPosition,
  offset: number = 8
): { top: number; left: number; placement: PopoverPosition } {
  debug('🔍 calculatePosition called', { position, offset })
  
  const triggerRect = triggerElement.getBoundingClientRect()
  const contentRect = contentElement.getBoundingClientRect()
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight

  debug('📏 Element dimensions:', {
    triggerRect: {
      top: triggerRect.top,
      left: triggerRect.left,
      width: triggerRect.width,
      height: triggerRect.height,
      bottom: triggerRect.bottom,
      right: triggerRect.right
    },
    contentRect: {
      width: contentRect.width,
      height: contentRect.height
    },
    viewport: { width: viewportWidth, height: viewportHeight }
  })

  // Fallback dimensions if getBoundingClientRect returns empty
  const triggerWidth = triggerRect.width || 80
  const triggerHeight = triggerRect.height || 32
  const contentWidth = contentRect.width || 200
  const contentHeight = contentRect.height || 50

  debug('📐 Using dimensions:', {
    triggerWidth,
    triggerHeight,
    contentWidth,
    contentHeight
  })

  let top = 0
  let left = 0
  let placement = position

  debug('🎯 Initial position calculation for:', position)

  // Calculate initial position using fallback dimensions
  switch (position) {
    case 'top':
      top = triggerRect.top - contentHeight - offset
      left = triggerRect.left + (triggerWidth - contentWidth) / 2
      break
    case 'top-start':
      top = triggerRect.top - contentHeight - offset
      left = triggerRect.left
      break
    case 'top-end':
      top = triggerRect.top - contentHeight - offset
      left = triggerRect.left + triggerWidth - contentWidth
      break
    case 'bottom':
      top = triggerRect.top + triggerHeight + offset
      left = triggerRect.left + (triggerWidth - contentWidth) / 2
      break
    case 'bottom-start':
      top = triggerRect.top + triggerHeight + offset
      left = triggerRect.left
      break
    case 'bottom-end':
      top = triggerRect.top + triggerHeight + offset
      left = triggerRect.left + triggerWidth - contentWidth
      break
    case 'left':
      top = triggerRect.top + (triggerHeight - contentHeight) / 2
      left = triggerRect.left - contentWidth - offset
      break
    case 'left-start':
      top = triggerRect.top
      left = triggerRect.left - contentWidth - offset
      break
    case 'left-end':
      top = triggerRect.top + triggerHeight - contentHeight
      left = triggerRect.left - contentWidth - offset
      break
    case 'right':
      top = triggerRect.top + (triggerHeight - contentHeight) / 2
      left = triggerRect.left + triggerWidth + offset
      break
    case 'right-start':
      top = triggerRect.top
      left = triggerRect.left + triggerWidth + offset
      break
    case 'right-end':
      top = triggerRect.top + triggerHeight - contentHeight
      left = triggerRect.left + triggerWidth + offset
      break
  }

  debug('📍 Initial calculated position:', { top, left, placement })

  // Check for viewport collisions and flip if necessary
  const wouldOverflowTop = top < 0
  const wouldOverflowBottom = top + contentHeight > viewportHeight
  const wouldOverflowLeft = left < 0
  const wouldOverflowRight = left + contentWidth > viewportWidth

  debug('🚨 Overflow detection:', {
    wouldOverflowTop,
    wouldOverflowBottom,
    wouldOverflowLeft,
    wouldOverflowRight,
    calculations: {
      top,
      'top + contentHeight': top + contentHeight,
      viewportHeight,
      left,
      'left + contentWidth': left + contentWidth,
      viewportWidth
    }
  })

  // Flip vertical positions
  if (position.startsWith('top') && wouldOverflowTop && !wouldOverflowBottom) {
    debug('🔄 Flipping top to bottom')
    placement = position.replace('top', 'bottom') as PopoverPosition
    top = triggerRect.top + triggerHeight + offset
  } else if (position.startsWith('bottom') && wouldOverflowBottom && !wouldOverflowTop) {
    debug('🔄 Flipping bottom to top')
    placement = position.replace('bottom', 'top') as PopoverPosition
    top = triggerRect.top - contentHeight - offset
  }

  // Flip horizontal positions
  if (position.startsWith('left') && wouldOverflowLeft && !wouldOverflowRight) {
    debug('🔄 Flipping left to right')
    placement = position.replace('left', 'right') as PopoverPosition
    left = triggerRect.left + triggerWidth + offset
  } else if (position.startsWith('right') && wouldOverflowRight && !wouldOverflowLeft) {
    debug('🔄 Flipping right to left')
    placement = position.replace('right', 'left') as PopoverPosition
    left = triggerRect.left - contentWidth - offset
  }

  debug('📍 Position after flipping:', { top, left, placement })

  // Adjust for horizontal centering overflow
  if (wouldOverflowLeft) {
    debug('⬅️ Adjusting for left overflow')
    left = 8 // Small margin from edge
  } else if (wouldOverflowRight) {
    debug('➡️ Adjusting for right overflow')
    left = viewportWidth - contentWidth - 8
  }

  // Adjust for vertical centering overflow
  if (wouldOverflowTop) {
    debug('⬆️ Adjusting for top overflow')
    top = 8
  } else if (wouldOverflowBottom) {
    debug('⬇️ Adjusting for bottom overflow')
    top = viewportHeight - contentHeight - 8
  }

  const finalResult = {
    top: top,
    left: left,
    placement
  }

  debug('✅ Final calculated position:', finalResult)
  
  return finalResult
}

function calculateArrowPosition(
  triggerElement: HTMLElement,
  contentElement: HTMLElement,
  placement: PopoverPosition
) {
  const triggerRect = triggerElement.getBoundingClientRect()
  const contentRect = contentElement.getBoundingClientRect()
  const arrowSize = 8

  switch (placement) {
    case 'top':
    case 'top-start':
    case 'top-end':
      return {
        bottom: -arrowSize,
        left: Math.max(
          arrowSize,
          Math.min(
            triggerRect.left + triggerRect.width / 2 - contentRect.left - arrowSize,
            contentRect.width - arrowSize * 2
          )
        )
      }
    case 'bottom':
    case 'bottom-start':
    case 'bottom-end':
      return {
        top: -arrowSize,
        left: Math.max(
          arrowSize,
          Math.min(
            triggerRect.left + triggerRect.width / 2 - contentRect.left - arrowSize,
            contentRect.width - arrowSize * 2
          )
        )
      }
    case 'left':
    case 'left-start':
    case 'left-end':
      return {
        right: -arrowSize,
        top: Math.max(
          arrowSize,
          Math.min(
            triggerRect.top + triggerRect.height / 2 - contentRect.top - arrowSize,
            contentRect.height - arrowSize * 2
          )
        )
      }
    case 'right':
    case 'right-start':
    case 'right-end':
      return {
        left: -arrowSize,
        top: Math.max(
          arrowSize,
          Math.min(
            triggerRect.top + triggerRect.height / 2 - contentRect.top - arrowSize,
            contentRect.height - arrowSize * 2
          )
        )
      }
    default:
      return {}
  }
}

export function Popover({
  isOpen: controlledIsOpen,
  onClose,
  onOpen,
  trigger,
  children,
  position = 'bottom',
  triggerOn = 'click',
  withArrow = true,
  closeOnClickOutside = true,
  closeOnEscape = true,
  openDelay = 0,
  closeDelay = 0,
  offset = 8,
  className,
  arrowClassName,
  testId = 'popover',
  disabled = false,
  portalContainer,
  zIndex = 1000
}: PopoverProps) {
  debug('🎯 Popover component initialized with props:', {
    position,
    triggerOn,
    withArrow,
    offset,
    disabled,
    zIndex,
    isControlled: controlledIsOpen !== undefined
  })

  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const [popoverState, setPopoverState] = useState<PopoverState>({
    isOpen: false,
    position: { top: 0, left: 0, placement: position }
  })

  const triggerRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const openTimeoutRef = useRef<number>()
  const closeTimeoutRef = useRef<number>()

  const isControlled = controlledIsOpen !== undefined
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen

  debug('📊 Component state:', {
    isControlled,
    isOpen,
    internalIsOpen,
    controlledIsOpen,
    popoverState
  })

  const updatePosition = useCallback(() => {
    debug('🔄 updatePosition called')
    
    if (!triggerRef.current || !contentRef.current) {
      debug('❌ Missing refs:', {
        triggerRef: !!triggerRef.current,
        contentRef: !!contentRef.current
      })
      return
    }

    // Get fresh references
    const triggerEl = triggerRef.current
    const contentEl = contentRef.current
    
    debug('🎯 Elements found:', {
      triggerEl: {
        tagName: triggerEl.tagName,
        className: triggerEl.className,
        getBoundingClientRect: !!triggerEl.getBoundingClientRect,
        hasMethod: typeof triggerEl.getBoundingClientRect === 'function',
        isHTMLElement: triggerEl instanceof HTMLElement,
        nodeType: triggerEl.nodeType
      },
      contentEl: {
        tagName: contentEl.tagName,
        className: contentEl.className,
        getBoundingClientRect: !!contentEl.getBoundingClientRect,
        hasMethod: typeof contentEl.getBoundingClientRect === 'function',
        isHTMLElement: contentEl instanceof HTMLElement,
        nodeType: contentEl.nodeType
      }
    })
    
    // Ensure elements are in DOM and have layout
    if (!triggerEl.getBoundingClientRect || !contentEl.getBoundingClientRect) {
      debug('❌ Elements missing getBoundingClientRect method')
      return
    }
    
    const pos = calculatePosition(triggerEl, contentEl, position, offset)
    const arrowPos = withArrow 
      ? calculateArrowPosition(triggerEl, contentEl, pos.placement)
      : undefined

    debug('🎯 Setting popover state:', { pos, arrowPos })

    setPopoverState({
      isOpen: true,
      position: pos,
      arrowPosition: arrowPos
    })
  }, [position, offset, withArrow])

  const open = useCallback(() => {
    debug('🟢 open() called', { disabled, openDelay, isControlled })
    
    if (disabled) {
      debug('❌ open() blocked - disabled')
      return
    }
    
    if (closeTimeoutRef.current) {
      debug('🚫 Clearing close timeout')
      window.clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = undefined
    }

    if (openDelay > 0) {
      debug('⏱️ Opening with delay:', openDelay)
      openTimeoutRef.current = window.setTimeout(() => {
        debug('⏱️ Open delay completed')
        if (!isControlled) setInternalIsOpen(true)
        setPopoverState(prev => ({ ...prev, isOpen: true }))
        onOpen?.()
      }, openDelay)
    } else {
      debug('🟢 Opening immediately')
      if (!isControlled) setInternalIsOpen(true)
      setPopoverState(prev => ({ ...prev, isOpen: true }))
      onOpen?.()
    }
  }, [disabled, openDelay, isControlled, onOpen])

  const close = useCallback(() => {
    debug('🔴 close() called', { closeDelay, isControlled })
    
    if (openTimeoutRef.current) {
      debug('🚫 Clearing open timeout')
      window.clearTimeout(openTimeoutRef.current)
      openTimeoutRef.current = undefined
    }

    if (closeDelay > 0) {
      debug('⏱️ Closing with delay:', closeDelay)
      closeTimeoutRef.current = window.setTimeout(() => {
        debug('⏱️ Close delay completed')
        if (!isControlled) setInternalIsOpen(false)
        setPopoverState(prev => ({ ...prev, isOpen: false }))
        onClose?.()
      }, closeDelay)
    } else {
      debug('🔴 Closing immediately')
      if (!isControlled) setInternalIsOpen(false)
      setPopoverState(prev => ({ ...prev, isOpen: false }))
      onClose?.()
    }
  }, [closeDelay, isControlled, onClose])

  const toggle = useCallback(() => {
    isOpen ? close() : open()
  }, [isOpen, open, close])

  // Update position when popover opens or trigger moves
  useEffect(() => {
    debug('🎯 Position update effect triggered', { isOpen })
    
    if (isOpen) {
      debug('📍 Setting up position update and listeners')
      
      // Use requestAnimationFrame to ensure layout is complete
      const frame = requestAnimationFrame(() => {
        debug('🎬 requestAnimationFrame executing updatePosition')
        updatePosition()
      })
      
      // Listen for scroll and resize
      const handleReposition = () => {
        debug('🔄 Reposition triggered (scroll/resize)')
        requestAnimationFrame(() => updatePosition())
      }
      window.addEventListener('scroll', handleReposition, true)
      window.addEventListener('resize', handleReposition)
      
      return () => {
        debug('🧹 Cleaning up position listeners')
        cancelAnimationFrame(frame)
        window.removeEventListener('scroll', handleReposition, true)
        window.removeEventListener('resize', handleReposition)
      }
    } else {
      debug('📍 Resetting position (popover closed)')
      // Reset position when closed
      setPopoverState(prev => ({ ...prev, isOpen: false }))
    }
  }, [isOpen, updatePosition])

  // Handle click outside
  useEffect(() => {
    debug('👆 Click outside effect setup', { isOpen, closeOnClickOutside })
    
    if (!isOpen || !closeOnClickOutside) return

    const handleClickOutside = (event: MouseEvent) => {
      debug('👆 Click detected:', { target: event.target })
      
      const target = event.target as Node
      const triggerEl = triggerRef.current
      const contentEl = contentRef.current
      
      // Check if triggerEl is a valid HTMLElement with contains method
      const isClickInsideTrigger = triggerEl && 
        typeof triggerEl.contains === 'function' && 
        triggerEl.contains(target)
      
      // Check if contentEl is a valid HTMLElement with contains method  
      const isClickInsideContent = contentEl && 
        typeof contentEl.contains === 'function' && 
        contentEl.contains(target)
      
      debug('👆 Click analysis:', {
        isClickInsideTrigger,
        isClickInsideContent,
        triggerEl: !!triggerEl,
        contentEl: !!contentEl
      })
      
      if (isClickInsideTrigger || isClickInsideContent) {
        debug('👆 Click ignored (inside popover or trigger)')
        return
      }
      
      debug('👆 Click outside detected - closing popover')
      close()
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      debug('🧹 Removing click outside listener')
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, closeOnClickOutside, close])

  // Handle escape key
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, closeOnEscape, close])

  // Cleanup timeouts and event listeners
    useEffect(() => {
      return () => {
        if (openTimeoutRef.current) window.clearTimeout(openTimeoutRef.current)
        if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current)
        
        // Cleanup direct event listeners
        if (triggerRef.current && (triggerRef.current as any).__popoverCleanup) {
          ;(triggerRef.current as any).__popoverCleanup()
        }
      }
    }, [])

  // Update position when isOpen changes
  useEffect(() => {
    if (isOpen && triggerRef.current && contentRef.current) {
      updatePosition()
    }
  }, [isOpen, updatePosition])

  const triggerEvents = {
    ...(triggerOn === 'click' && {
      onClick: toggle
    }),
    ...(triggerOn === 'hover' && {
      onMouseEnter: open,
      onMouseLeave: close
    }),
    ...(triggerOn === 'focus' && {
      onFocus: open,
      onBlur: close
    })
  }

  const contentEvents = {
    ...(triggerOn === 'hover' && {
      onMouseEnter: () => {
        if (closeTimeoutRef.current) {
          clearTimeout(closeTimeoutRef.current)
          closeTimeoutRef.current = undefined
        }
      },
      onMouseLeave: close
    })
  }

  // Cleanup event listeners on unmount
  useEffect(() => {
    return () => {
      if (triggerRef.current && (triggerRef.current as any).__popoverCleanup) {
        (triggerRef.current as any).__popoverCleanup()
      }
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current)
      }
    }
  }, [])

  const portalElement = typeof portalContainer === 'string' 
    ? document.querySelector(portalContainer) || document.body
    : portalContainer || document.body

  debug('🚪 Portal element:', { 
    portalContainer, 
    portalElement: portalElement?.tagName || 'unknown',
    isString: typeof portalContainer === 'string'
  })

  // Always wrap trigger in a div to ensure consistent event handling
  let triggerElement
  if (trigger && typeof trigger === 'object' && 'type' in trigger) {
    debug('🎯 Creating cloned trigger element (React component)')
    // For React elements, we need special handling
    const originalProps = (trigger as any).props || {}
    
    triggerElement = (
      <div 
        ref={triggerRef as any}
        className="inline-block"
      >
        {cloneElement(trigger as any, {
          ref: (el: HTMLElement) => {
            debug('🎯 Cloned element ref callback called:', { 
              el: el ? { tagName: el.tagName, className: el.className } : null,
              triggerOn
            })
            
            // Keep original ref functionality
            if (originalProps.ref && typeof originalProps.ref === 'function') {
              originalProps.ref(el);
            }
            
            // Add event listeners directly to handle focus/blur
            // Check if el is a DOM element and has addEventListener method
            if (el && typeof el.addEventListener === 'function' && triggerOn === 'focus') {
              debug('🎯 Adding focus/blur listeners to cloned element')
              
              const handleFocus = () => {
                debug('🎯 Cloned element focus event')
                open()
              }
              const handleBlur = () => {
                debug('🎯 Cloned element blur event')
                close()
              }
              
              el.addEventListener('focus', handleFocus)
              el.addEventListener('blur', handleBlur)
              
              // Store cleanup function
              ;(el as any).__popoverCleanup = () => {
                debug('🧹 Cleaning up cloned element event listeners')
                if (typeof el.removeEventListener === 'function') {
                  el.removeEventListener('focus', handleFocus)
                  el.removeEventListener('blur', handleBlur)
                }
              }
            }
          },
          // Merge original props
          ...originalProps,
          // Override with our event handlers for click and hover
          onClick: (e: any) => {
            debug('🎯 Trigger click event', { triggerOn })
            originalProps.onClick?.(e)
            if (triggerOn === 'click') {
              toggle()
            }
          },
          onMouseEnter: (e: any) => {
            debug('🎯 Trigger mouse enter event', { triggerOn })
            originalProps.onMouseEnter?.(e)
            if (triggerOn === 'hover') {
              open()
            }
          },
          onMouseLeave: (e: any) => {
            debug('🎯 Trigger mouse leave event', { triggerOn })
            originalProps.onMouseLeave?.(e)
            if (triggerOn === 'hover') {
              close()
            }
          }
        })}
      </div>
    )
  } else {
    debug('🎯 Creating wrapped trigger element (non-React)')
    triggerElement = (
      <div
        ref={triggerRef as any}
        className="inline-block"
        {...triggerEvents}
      >
        {trigger}
      </div>
    )
  }

  const popoverContent = isOpen && (
    <div
      ref={contentRef}
      data-testid={testId}
      className={cn(
        // Base styles
        'fixed bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700',
        'px-3 py-2 text-sm text-gray-900 dark:text-white',
        'max-w-xs break-words',
        // Animation
        'transition-opacity duration-200',
        'opacity-100',
        className
      )}
      style={{
        top: popoverState.position.top,
        left: popoverState.position.left,
        zIndex
      }}
      {...contentEvents}
    >
      {children}
      
      {withArrow && (
        <div
          className={cn(
            'absolute w-2 h-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rotate-45',
            // Hide borders on inner edges
            {
              'border-b-0 border-r-0': popoverState.position.placement.startsWith('top'),
              'border-t-0 border-l-0': popoverState.position.placement.startsWith('bottom'),
              'border-b-0 border-l-0': popoverState.position.placement.startsWith('left'),
              'border-t-0 border-r-0': popoverState.position.placement.startsWith('right')
            },
            arrowClassName
          )}
          style={popoverState.arrowPosition || {}}
          data-testid={`${testId}-arrow`}
        />
      )}
    </div>
  )

  debug('🎨 Rendering popover:', {
    isOpen,
    popoverContent: !!popoverContent,
    position: popoverState.position,
    arrowPosition: popoverState.arrowPosition,
    portalElement: portalElement?.tagName || 'unknown'
  })

  return (
    <>
      {triggerElement}
      {createPortal(popoverContent, portalElement)}
    </>
  )
}
