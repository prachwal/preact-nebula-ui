import type { ComponentProps, ComponentChildren } from 'preact'

export type ProgressVariant = 'linear' | 'circular'
export type ProgressSize = 'sm' | 'md' | 'lg'
export type ProgressColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error'

export interface ProgressProps extends Omit<ComponentProps<'div'>, 'value'> {
  /** Progress variant */
  variant?: ProgressVariant
  /** Progress size */
  size?: ProgressSize
  /** Progress color scheme */
  color?: ProgressColor
  /** Progress value (0-100) */
  value?: number
  /** Whether progress is indeterminate */
  indeterminate?: boolean
  /** Whether to show percentage label */
  showLabel?: boolean
  /** Custom label text */
  label?: string
  /** Progress content (for additional info) */
  children?: ComponentChildren
  /** Test ID for testing */
  'data-testid'?: string
}
