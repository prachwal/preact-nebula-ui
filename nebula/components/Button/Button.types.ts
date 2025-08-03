import type { ComponentProps } from 'preact'
import type { ComponentSize, ComponentVariant } from '@/types/common'

export interface ButtonProps extends Omit<ComponentProps<'button'>, 'size'> {
  /** Button variant style */
  variant?: ComponentVariant
  /** Button size */
  size?: ComponentSize
  /** Whether the button is in loading state */
  loading?: boolean
  /** Icon to show before the text */
  leftIcon?: preact.ComponentChildren
  /** Icon to show after the text */
  rightIcon?: preact.ComponentChildren
  /** Whether the button should take full width */
  fullWidth?: boolean
}
