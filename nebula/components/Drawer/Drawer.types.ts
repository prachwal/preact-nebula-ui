import type { ComponentChildren } from 'preact'

export interface DrawerProps {
  /** Whether the drawer is open */
  isOpen: boolean
  
  /** Function to close the drawer */
  onClose: () => void
  
  /** Position of the drawer */
  position?: 'left' | 'right' | 'top' | 'bottom'
  
  /** Size of the drawer */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  
  /** Whether to show backdrop overlay */
  hasBackdrop?: boolean
  
  /** Whether clicking backdrop closes drawer */
  closeOnBackdropClick?: boolean
  
  /** Whether pressing Escape closes drawer */
  closeOnEscape?: boolean
  
  /** Whether to lock body scroll when open */
  lockBodyScroll?: boolean
  
  /** Animation duration in milliseconds */
  animationDuration?: number
  
  /** Custom backdrop opacity */
  backdropOpacity?: number
  
  /** Whether to preserve focus within drawer */
  trapFocus?: boolean
  
  /** Element to focus when drawer opens */
  initialFocus?: HTMLElement | (() => HTMLElement)
  
  /** Element to focus when drawer closes */
  finalFocus?: HTMLElement | (() => HTMLElement)
  
  /** Custom z-index for drawer */
  zIndex?: number
  
  /** Custom className for drawer container */
  className?: string
  
  /** Custom className for backdrop */
  backdropClassName?: string
  
  /** Custom styles for drawer container */
  style?: Record<string, any>
  
  /** Data test id */
  'data-testid'?: string
  
  /** Children content */
  children: ComponentChildren
  
  /** Callback when drawer animation completes */
  onAnimationEnd?: () => void
  
  /** Callback when backdrop is clicked */
  onBackdropClick?: () => void
  
  /** Callback when escape key is pressed */
  onEscapeKeyDown?: () => void
}

export type DrawerPosition = DrawerProps['position']
export type DrawerSize = DrawerProps['size']
