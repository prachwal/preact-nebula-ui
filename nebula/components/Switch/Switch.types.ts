import type {ComponentChildren} from 'preact'

/**
 * Size variants for Switch component
 */
export type SwitchSize = 'sm' | 'md' | 'lg'

/**
 * Color variants for Switch component
 */
export type SwitchColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error'

/**
 * Label position options
 */
export type SwitchLabelPosition = 'left' | 'right'

/**
 * Props for the Switch component
 */
export interface SwitchProps {
  /**
   * Whether the switch is checked/on
   */
  checked?: boolean

  /**
   * Whether the switch is disabled
   */
  disabled?: boolean

  /**
   * Size variant of the switch
   * @default 'md'
   */
  size?: SwitchSize

  /**
   * Color variant of the switch when checked
   * @default 'primary'
   */
  color?: SwitchColor

  /**
   * Label text for the switch
   */
  label?: string

  /**
   * Additional description text
   */
  description?: string

  /**
   * Position of the label relative to the switch
   * @default 'right'
   */
  labelPosition?: SwitchLabelPosition

  /**
   * Custom icons for checked and unchecked states
   */
  icons?: {
    checked?: ComponentChildren
    unchecked?: ComponentChildren
  }

  /**
   * Whether there's an error state
   */
  error?: boolean

  /**
   * Error message to display
   */
  errorMessage?: string

  /**
   * Name attribute for form integration
   */
  name?: string

  /**
   * Value attribute for form integration
   */
  value?: string

  /**
   * Additional CSS classes
   */
  className?: string

  /**
   * Callback fired when the switch state changes
   */
  onChange?: (checked: boolean, event: Event) => void

  /**
   * Children content (alternative to label prop)
   */
  children?: ComponentChildren

  /**
   * Additional HTML attributes
   */
  [key: string]: any
}
