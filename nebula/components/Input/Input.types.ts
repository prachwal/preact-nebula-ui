import type { ComponentProps } from 'preact'
import type { FormVariant, FormSize, InputType } from '@/types/common'

export interface InputProps extends Omit<ComponentProps<'input'>, 'size' | 'type'> {
  /** Input variant style */
  variant?: FormVariant
  /** Input size */
  size?: FormSize
  /** Input type */
  type?: InputType
  /** Input state for validation feedback */
  state?: 'success' | 'error' | 'warning'
  /** Whether the input is disabled */
  disabled?: boolean
  /** Whether the input is required */
  required?: boolean
  /** Icon to show before the input */
  leftIcon?: preact.ComponentChildren
  /** Icon to show after the input */
  rightIcon?: preact.ComponentChildren
  /** Error message to display */
  error?: string
  /** Helper text to display below input */
  helperText?: string
  /** Whether to show error state */
  isInvalid?: boolean
  /** Whether to show success state */
  isValid?: boolean
  /** Placeholder text */
  placeholder?: string
  /** Input value */
  value?: string
  /** Default value for uncontrolled component */
  defaultValue?: string
  /** Test ID for testing */
  'data-testid'?: string
  /** Change handler */
  onChange?: (event: Event) => void
  /** Focus handler */
  onFocus?: (event: FocusEvent) => void
  /** Blur handler */
  onBlur?: (event: FocusEvent) => void
}
