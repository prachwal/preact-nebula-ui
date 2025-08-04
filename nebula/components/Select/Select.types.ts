import type {ComponentChildren} from 'preact'

/**
 * Size variants for Select component
 */
export type SelectSize = 'sm' | 'md' | 'lg'

/**
 * Option definition for Select
 */
export interface SelectOption {
  /**
   * Unique value for the option
   */
  value: string

  /**
   * Display label for the option
   */
  label: string

  /**
   * Whether the option is disabled
   */
  disabled?: boolean

  /**
   * Optional icon for the option
   */
  icon?: ComponentChildren

  /**
   * Optional description for the option
   */
  description?: string
}

/**
 * Props for the Select component
 */
export interface SelectProps {
  /**
   * Available options for selection
   */
  options: SelectOption[]

  /**
   * Current selected value(s)
   */
  value?: string | string[]

  /**
   * Whether multiple selections are allowed
   * @default false
   */
  multiple?: boolean

  /**
   * Whether the select is searchable
   * @default false
   */
  searchable?: boolean

  /**
   * Placeholder text when no option is selected
   */
  placeholder?: string

  /**
   * Whether the select is disabled
   */
  disabled?: boolean

  /**
   * Whether the select can be cleared
   * @default false
   */
  clearable?: boolean

  /**
   * Size variant of the select
   * @default 'md'
   */
  size?: SelectSize

  /**
   * Error message to display
   */
  error?: string

  /**
   * Whether the select is in loading state
   */
  loading?: boolean

  /**
   * Maximum height of the dropdown in pixels
   * @default 200
   */
  maxHeight?: number

  /**
   * Name attribute for form integration
   */
  name?: string

  /**
   * Whether the field is required
   */
  required?: boolean

  /**
   * Additional CSS classes
   */
  className?: string

  /**
   * Callback fired when selection changes
   */
  onChange?: (value: string | string[]) => void

  /**
   * Callback fired when search query changes (for searchable selects)
   */
  onSearch?: (query: string) => void

  /**
   * Callback fired when dropdown opens
   */
  onOpen?: () => void

  /**
   * Callback fired when dropdown closes
   */
  onClose?: () => void

  /**
   * Additional HTML attributes
   */
  [key: string]: any
}
