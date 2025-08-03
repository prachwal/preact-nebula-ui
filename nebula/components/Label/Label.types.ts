import type { ComponentProps } from 'preact'
import type { FormSize } from '@/types/common'

export interface LabelProps extends ComponentProps<'label'> {
  /** Whether the field is required */
  required?: boolean
  /** Whether the label is disabled */
  disabled?: boolean
  /** Label size to match form controls */
  size?: FormSize
  /** The form control this label is associated with */
  htmlFor?: string
  /** Test ID for testing */
  'data-testid'?: string
  /** Label content */
  children: preact.ComponentChildren
}
