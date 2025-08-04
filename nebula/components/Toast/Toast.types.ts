import type { ComponentChildren, ComponentProps } from 'preact'

export type ToastPosition = 
  | 'top-left' 
  | 'top-center' 
  | 'top-right'
  | 'bottom-left' 
  | 'bottom-center' 
  | 'bottom-right'

export type ToastVariant = 
  | 'default'
  | 'success' 
  | 'warning' 
  | 'error' 
  | 'info'

export type ToastSize = 'sm' | 'md' | 'lg'

export interface ToastProps extends Omit<ComponentProps<'div'>, 'size'> {
  /**
   * The variant determines the visual style and semantic meaning
   * @default 'default'
   */
  variant?: ToastVariant
  
  /**
   * Size of the toast notification
   * @default 'md'
   */
  size?: ToastSize
  
  /**
   * Title of the toast notification
   */
  title?: string
  
  /**
   * Content of the toast notification
   */
  children?: ComponentChildren
  
  /**
   * Whether the toast can be manually dismissed
   * @default true
   */
  dismissible?: boolean
  
  /**
   * Auto-dismiss duration in milliseconds. Set to 0 to disable auto-dismiss
   * @default 5000
   */
  duration?: number
  
  /**
   * Custom icon to display. Set to false to hide icon
   * @default true (shows variant-appropriate icon)
   */
  icon?: ComponentChildren | boolean
  
  /**
   * Action elements (buttons, links, etc.)
   */
  actions?: ComponentChildren
  
  /**
   * Callback fired when toast is dismissed
   */
  onDismiss?: () => void
  
  /**
   * Whether the toast is currently visible
   * @default true
   */
  isOpen?: boolean
  
  /**
   * Additional CSS classes
   */
  className?: string
  
  /**
   * Test identifier
   */
  'data-testid'?: string
}

export interface ToastManagerProps {
  /**
   * Position where toasts will appear
   * @default 'top-right'
   */
  position?: ToastPosition
  
  /**
   * Maximum number of toasts to show at once
   * @default 5
   */
  maxToasts?: number
  
  /**
   * Gap between toasts in pixels
   * @default 8
   */
  gap?: number
  
  /**
   * Additional CSS classes for container
   */
  className?: string
  
  /**
   * Test identifier
   */
  'data-testid'?: string
}

export interface ToastData extends Omit<ToastProps, 'isOpen' | 'onDismiss'> {
  /**
   * Unique identifier for the toast
   */
  id: string
  
  /**
   * Timestamp when toast was created
   */
  createdAt: number
}

export interface ToastContextValue {
  /**
   * Current list of active toasts
   */
  toasts: ToastData[]
  
  /**
   * Add a new toast notification
   */
  addToast: (toast: Omit<ToastData, 'id' | 'createdAt'>) => string
  
  /**
   * Remove a toast by ID
   */
  removeToast: (id: string) => void
  
  /**
   * Remove all toasts
   */
  clearToasts: () => void
  
  /**
   * Update toast position
   */
  setPosition: (position: ToastPosition) => void
  
  /**
   * Current position setting
   */
  position: ToastPosition
}

// Helper types for toast creation
export type CreateToastOptions = Omit<ToastData, 'id' | 'createdAt' | 'variant'>
export type CreateSuccessToastOptions = Omit<CreateToastOptions, 'variant'>
export type CreateWarningToastOptions = Omit<CreateToastOptions, 'variant'>
export type CreateErrorToastOptions = Omit<CreateToastOptions, 'variant'>
export type CreateInfoToastOptions = Omit<CreateToastOptions, 'variant'>
