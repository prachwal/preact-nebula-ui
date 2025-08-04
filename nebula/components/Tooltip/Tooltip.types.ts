import type { ComponentChildren } from 'preact'

export type TooltipPosition = 
  | 'top' | 'top-start' | 'top-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'left' | 'left-start' | 'left-end'
  | 'right' | 'right-start' | 'right-end'
  | 'auto'

export type TooltipTrigger = 'hover' | 'focus' | 'click' | 'manual'

export type TooltipSize = 'sm' | 'md' | 'lg'

export type TooltipColorScheme = 'gray' | 'primary' | 'secondary' | 'success' | 'warning' | 'error'

export interface TooltipProps {
  /** Content to display in the tooltip */
  content: ComponentChildren
  /** Position of the tooltip relative to the trigger element */
  position?: TooltipPosition
  /** How the tooltip is triggered */
  trigger?: TooltipTrigger
  /** Delay before showing the tooltip (in milliseconds) */
  delay?: number
  /** Delay before hiding the tooltip (in milliseconds) */
  closeDelay?: number
  /** Whether the tooltip is disabled */
  disabled?: boolean
  /** Whether to show an arrow pointing to the trigger */
  hasArrow?: boolean
  /** Size of the tooltip */
  size?: TooltipSize
  /** Color scheme for the tooltip */
  colorScheme?: TooltipColorScheme
  /** Offset from the trigger element in pixels */
  offset?: number
  /** Whether to flip position if there's not enough space */
  flip?: boolean
  /** Whether to shift position to stay within viewport */
  shift?: boolean
  /** Maximum width of the tooltip */
  maxWidth?: string
  /** Custom CSS classes */
  className?: string
  /** Test ID for testing */
  'data-testid'?: string
  /** The element that triggers the tooltip */
  children: ComponentChildren
}
