import type { ComponentChildren } from 'preact'

export interface RadioProps {
  /**
   * The value of the radio button
   */
  value: string
  
  /**
   * Whether the radio is checked
   */
  checked?: boolean
  
  /**
   * Whether the radio is disabled
   */
  disabled?: boolean
  
  /**
   * Size of the radio button
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg'
  
  /**
   * Visual variant of the radio
   * @default 'default'
   */
  variant?: 'default' | 'outlined'
  
  /**
   * Label text for the radio
   */
  label?: string
  
  /**
   * Description text shown below the label
   */
  description?: string
  
  /**
   * Position of the label relative to the radio
   * @default 'right'
   */
  labelPosition?: 'left' | 'right'
  
  /**
   * Whether the radio is in an error state
   */
  error?: boolean
  
  /**
   * Error message to display
   */
  errorMessage?: string
  
  /**
   * Custom content to use instead of label
   */
  children?: ComponentChildren
  
  /**
   * Name attribute for the radio input (usually set by RadioGroup)
   */
  name?: string
  
  /**
   * Custom ID for the radio input
   */
  id?: string
  
  /**
   * Additional CSS classes
   */
  className?: string
  
  /**
   * Change handler for the radio
   */
  onChange?: (event: Event) => void
  
  /**
   * Other HTML input attributes
   */
  [key: string]: any
}

export interface RadioGroupContextType {
  value?: string
  name: string
  onChange?: (value: string, event: Event) => void
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'outlined'
  error?: boolean
}

export interface RadioGroupProps {
  /**
   * Current selected value
   */
  value?: string
  
  /**
   * Default selected value for uncontrolled usage
   */
  defaultValue?: string
  
  /**
   * Name attribute for all radio inputs in the group
   */
  name: string
  
  /**
   * Layout orientation of the radio group
   * @default 'vertical'
   */
  orientation?: 'horizontal' | 'vertical'
  
  /**
   * Size of all radio buttons in the group
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg'
  
  /**
   * Visual variant for all radio buttons in the group
   * @default 'default'
   */
  variant?: 'default' | 'outlined'
  
  /**
   * Whether all radio buttons in the group are disabled
   */
  disabled?: boolean
  
  /**
   * Whether the group is in an error state
   */
  error?: boolean
  
  /**
   * Error message to display for the group
   */
  errorMessage?: string
  
  /**
   * Label for the radio group
   */
  label?: string
  
  /**
   * Description for the radio group
   */
  description?: string
  
  /**
   * Spacing between radio items
   * @default 'md'
   */
  spacing?: 'xs' | 'sm' | 'md' | 'lg'
  
  /**
   * Custom ID for the fieldset
   */
  id?: string
  
  /**
   * Additional CSS classes
   */
  className?: string
  
  /**
   * Radio components as children
   */
  children: ComponentChildren
  
  /**
   * Change handler for the group
   */
  onChange?: (value: string, event: Event) => void
}
