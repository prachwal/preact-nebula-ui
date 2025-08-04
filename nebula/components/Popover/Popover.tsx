import { useState, useEffect, useRef, useCallback } from 'preact/hooks'
import { createPortal } from 'preact/compat'
import { cn } from '../../utils/cn'
import type { PopoverProps, PopoverPosition, PopoverState } from './Popover.types'

// Position calculation utilities
function calculatePosition(
  triggerElement: HTMLElement,
  contentElement: HTMLElement,
  position: PopoverPosition,
  offset: number = 8
): { top: number; left: number; placement: PopoverPosition } {
  const triggerRect = triggerElement.getBoundingClientRect()
  const contentRect = contentElement.getBoundingClientRect()
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  const scrollX = window.scrollX || 0
  const scrollY = window.scrollY || 0

  // Fallback dimensions if getBoundingClientRect returns empty
  const triggerWidth = triggerRect.width || 80
  const triggerHeight = triggerRect.height || 32
  const contentWidth = contentRect.width || 200
  const contentHeight = contentRect.height || 50

  let top = 0
  let left = 0
  let placement = position

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

  // Check for viewport collisions and flip if necessary
  const wouldOverflowTop = top < 0
  const wouldOverflowBottom = top + contentHeight > viewportHeight
  const wouldOverflowLeft = left < 0
  const wouldOverflowRight = left + contentWidth > viewportWidth

  // Flip vertical positions
  if (position.startsWith('top') && wouldOverflowTop && !wouldOverflowBottom) {
    placement = position.replace('top', 'bottom') as PopoverPosition
    top = triggerRect.top + triggerHeight + offset
  } else if (position.startsWith('bottom') && wouldOverflowBottom && !wouldOverflowTop) {
    placement = position.replace('bottom', 'top') as PopoverPosition
    top = triggerRect.top - contentHeight - offset
  }

  // Flip horizontal positions
  if (position.startsWith('left') && wouldOverflowLeft && !wouldOverflowRight) {
    placement = position.replace('left', 'right') as PopoverPosition
    left = triggerRect.left + triggerWidth + offset
  } else if (position.startsWith('right') && wouldOverflowRight && !wouldOverflowLeft) {
    placement = position.replace('right', 'left') as PopoverPosition
    left = triggerRect.left - contentWidth - offset
  }

  // Adjust for horizontal centering overflow
  if (wouldOverflowLeft) {
    left = 8 // Small margin from edge
  } else if (wouldOverflowRight) {
    left = viewportWidth - contentWidth - 8
  }

  // Adjust for vertical centering overflow
  if (wouldOverflowTop) {
    top = 8
  } else if (wouldOverflowBottom) {
    top = viewportHeight - contentHeight - 8
  }

  return {
    top: top + scrollY,
    left: left + scrollX,
    placement
  }
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

  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !contentRef.current || !isOpen) return

    // Get fresh references
    const triggerEl = triggerRef.current
    const contentEl = contentRef.current
    
    // Ensure elements are in DOM and have layout
    if (!triggerEl.getBoundingClientRect || !contentEl.getBoundingClientRect) {
      return
    }
    
    const pos = calculatePosition(triggerEl, contentEl, position, offset)
    const arrowPos = withArrow 
      ? calculateArrowPosition(triggerEl, contentEl, pos.placement)
      : undefined

    setPopoverState({
      isOpen: true,
      position: pos,
      arrowPosition: arrowPos
    })
  }, [isOpen, position, offset, withArrow])

  const open = useCallback(() => {
    if (disabled) return
    
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = undefined
    }

    if (openDelay > 0) {
      openTimeoutRef.current = window.setTimeout(() => {
        if (!isControlled) setInternalIsOpen(true)
        setPopoverState(prev => ({ ...prev, isOpen: true }))
        onOpen?.()
      }, openDelay)
    } else {
      if (!isControlled) setInternalIsOpen(true)
      setPopoverState(prev => ({ ...prev, isOpen: true }))
      onOpen?.()
    }
  }, [disabled, openDelay, isControlled, onOpen])

  const close = useCallback(() => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current)
      openTimeoutRef.current = undefined
    }

    if (closeDelay > 0) {
      closeTimeoutRef.current = window.setTimeout(() => {
        if (!isControlled) setInternalIsOpen(false)
        setPopoverState(prev => ({ ...prev, isOpen: false }))
        onClose?.()
      }, closeDelay)
    } else {
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
    if (isOpen) {
      // Use requestAnimationFrame to ensure layout is complete
      const frame = requestAnimationFrame(() => {
        updatePosition()
      })
      
      // Listen for scroll and resize
      const handleReposition = () => {
        requestAnimationFrame(() => updatePosition())
      }
      window.addEventListener('scroll', handleReposition, true)
      window.addEventListener('resize', handleReposition)
      
      return () => {
        cancelAnimationFrame(frame)
        window.removeEventListener('scroll', handleReposition, true)
        window.removeEventListener('resize', handleReposition)
      }
    } else {
      // Reset position when closed
      setPopoverState(prev => ({ ...prev, isOpen: false }))
    }
  }, [isOpen, updatePosition])

  // Handle click outside
  useEffect(() => {
    if (!isOpen || !closeOnClickOutside) return

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (
        triggerRef.current?.contains(target) ||
        contentRef.current?.contains(target)
      ) {
        return
      }
      close()
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
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

  // Cleanup timeouts
  useEffect(() => {
    return () => {
      if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current)
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
    }
  }, [])

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

  const portalElement = typeof portalContainer === 'string' 
    ? document.querySelector(portalContainer) || document.body
    : portalContainer || document.body

  const triggerElement = (
    <span
      ref={triggerRef}
      className="inline-block"
      {...triggerEvents}
    >
      {trigger}
    </span>
  )

  const popoverContent = isOpen && (
    <div
      ref={contentRef}
      data-testid={testId}
      className={cn(
        // Base styles
        'absolute bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700',
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

  return (
    <>
      {triggerElement}
      {createPortal(popoverContent, portalElement)}
    </>
  )
}
