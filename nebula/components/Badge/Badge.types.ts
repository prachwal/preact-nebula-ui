import type { ComponentProps, ComponentChildren } from 'preact'

export type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error'
export type BadgeSize = 'sm' | 'md' | 'lg'
export type BadgeShape = 'rounded' | 'pill' | 'square'

export interface BadgeProps extends Omit<ComponentProps<'span'>, 'size'> {
  /** Badge variant style */
  variant?: BadgeVariant
  /** Badge size */
  size?: BadgeSize
  /** Badge shape */
  shape?: BadgeShape
  /** Display as dot indicator (no text) */
  dot?: boolean
  /** Maximum number to display before showing "max+" */
  max?: number
  /** Badge content */
  children?: ComponentChildren
  /** Test ID for testing */
  'data-testid'?: string
}
