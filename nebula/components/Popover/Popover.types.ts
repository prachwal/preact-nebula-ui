import { ComponentChildren } from 'preact'

export type PopoverPosition = 
  | 'top' 
  | 'top-start' 
  | 'top-end'
  | 'bottom' 
  | 'bottom-start' 
  | 'bottom-end'
  | 'left' 
  | 'left-start' 
  | 'left-end'
  | 'right' 
  | 'right-start' 
  | 'right-end'

export type PopoverTrigger = 'click' | 'hover' | 'focus' | 'manual'

export interface PopoverProps {
  /** Whether the popover is open (controlled mode) */
  isOpen?: boolean
  /** Function called when popover should close */
  onClose?: () => void
  /** Function called when popover should open */
  onOpen?: () => void
  /** Element that triggers the popover */
  trigger: ComponentChildren
  /** Content to display in the popover */
  children: ComponentChildren
  /** Position of the popover relative to trigger */
  position?: PopoverPosition
  /** How the popover is triggered */
  triggerOn?: PopoverTrigger
  /** Whether to show an arrow pointing to trigger */
  withArrow?: boolean
  /** Whether clicking outside closes the popover */
  closeOnClickOutside?: boolean
  /** Whether pressing Escape closes the popover */
  closeOnEscape?: boolean
  /** Delay before showing popover (hover trigger) */
  openDelay?: number
  /** Delay before hiding popover (hover trigger) */
  closeDelay?: number
  /** Custom offset from trigger element */
  offset?: number
  /** Additional CSS classes for popover */
  className?: string
  /** Additional CSS classes for arrow */
  arrowClassName?: string
  /** Custom test ID for testing */
  testId?: string
  /** Whether popover is disabled */
  disabled?: boolean
  /** Portal container element */
  portalContainer?: HTMLElement | string
  /** Z-index for popover */
  zIndex?: number
}

export interface PopoverState {
  isOpen: boolean
  position: {
    top: number
    left: number
    placement: PopoverPosition
  }
  arrowPosition?: {
    top?: number
    left?: number
    bottom?: number
    right?: number
  }
}

export interface PopoverContext {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
  triggerRef: { current: HTMLElement | null }
  contentRef: { current: HTMLElement | null }
}
