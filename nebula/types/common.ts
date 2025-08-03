export interface CommonProps {
  /** Additional CSS classes */
  className?: string
  /** Component children */
  children?: preact.ComponentChildren
  /** Test ID for testing */
  'data-testid'?: string
}

export type ComponentSize = 'sm' | 'md' | 'lg' | 'xl'
export type ComponentVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'

// Form-specific types
export type FormVariant = 'default' | 'error' | 'success' | 'filled'
export type FormSize = 'sm' | 'md' | 'lg'

// HTML input types
export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local' | 'month' | 'week' | 'color' | 'range' | 'file'
