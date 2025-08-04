import type { ComponentProps, ComponentChildren } from 'preact'

export type AlertVariant = 'info' | 'success' | 'warning' | 'error'
export type AlertSize = 'sm' | 'md' | 'lg'

export interface AlertProps extends Omit<ComponentProps<'div'>, 'title'> {
  /** Alert variant style */
  variant?: AlertVariant
  /** Alert size */
  size?: AlertSize
  /** Alert title */
  title?: string
  /** Whether the alert can be dismissed */
  dismissible?: boolean
  /** Custom icon or true for default variant icon */
  icon?: ComponentChildren | boolean
  /** Action buttons area */
  actions?: ComponentChildren
  /** Called when alert is dismissed */
  onDismiss?: () => void
  /** Alert content */
  children: ComponentChildren
  /** Test ID for testing */
  'data-testid'?: string
}
