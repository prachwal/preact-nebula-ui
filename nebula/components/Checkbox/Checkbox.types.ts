import type { ComponentProps, ComponentChildren } from 'preact'

export interface CheckboxProps extends Omit<ComponentProps<'input'>, 'size' | 'type'> {
  /**
   * Size of the checkbox
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg'
  
  /**
   * Visual variant of the checkbox
   * @default 'default'
   */
  variant?: 'default' | 'outlined'
  
  /**
   * Indeterminate state (tri-state checkbox)
   * @default false
   */
  indeterminate?: boolean
  
  /**
   * Label text for the checkbox
   */
  label?: string
  
  /**
   * Description text below the label
   */
  description?: string
  
  /**
   * Error state
   * @default false
   */
  error?: boolean
  
  /**
   * Error message to display when error is true
   */
  errorMessage?: string
  
  /**
   * Children to render instead of label (for custom content)
   */
  children?: ComponentChildren
  
  /**
   * Position of the label relative to checkbox
   * @default 'right'
   */
  labelPosition?: 'left' | 'right'
}
