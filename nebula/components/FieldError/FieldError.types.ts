import type { ComponentProps } from 'preact'

export interface FieldErrorProps extends ComponentProps<'div'> {
  /** Error message content */
  children: preact.ComponentChildren
  /** ID for ARIA associations */
  id?: string
  /** Test ID for testing */
  'data-testid'?: string
}
