import type { ComponentProps } from 'preact'
import type { FormVariant, FormSize } from '@/types/common'

export interface TextareaProps extends Omit<ComponentProps<'textarea'>, 'size'> {
  /** Textarea variant style */
  variant?: FormVariant
  /** Textarea size */
  size?: FormSize
  /** Whether the textarea is disabled */
  disabled?: boolean
  /** Whether the textarea is required */
  required?: boolean
  /** Error message to display */
  error?: string
  /** Helper text to display below textarea */
  helperText?: string
  /** Whether to show error state */
  isInvalid?: boolean
  /** Whether to show success state */
  isValid?: boolean
  /** Whether to auto-resize based on content */
  autoResize?: boolean
  /** Maximum character length */
  maxLength?: number
  /** Whether to show character count */
  showCharCount?: boolean
  /** Minimum number of rows */
  minRows?: number
  /** Maximum number of rows (for auto-resize) */
  maxRows?: number
  /** Placeholder text */
  placeholder?: string
  /** Textarea value */
  value?: string
  /** Default value for uncontrolled component */
  defaultValue?: string
  /** Test ID for testing */
  'data-testid'?: string
  /** Change handler */
  onChange?: (event: Event) => void
  /** Input handler for auto-resize */
  onInput?: (event: Event) => void
  /** Focus handler */
  onFocus?: (event: FocusEvent) => void
  /** Blur handler */
  onBlur?: (event: FocusEvent) => void
}
