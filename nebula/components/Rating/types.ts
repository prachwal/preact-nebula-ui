import { HTMLAttributes } from 'preact/compat'
import { ComponentChildren } from 'preact'

export type RatingSize = 'sm' | 'md' | 'lg'

export interface RatingProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Current rating value */
  value?: number
  
  /** Default value for uncontrolled mode */
  defaultValue?: number
  
  /** Callback fired when rating changes */
  onChange?: (value: number) => void
  
  /** Maximum rating value */
  max?: number
  
  /** Size variant */
  size?: RatingSize
  
  /** Allow half-star ratings */
  allowHalf?: boolean
  
  /** Read-only mode (no interaction) */
  readOnly?: boolean
  
  /** Disabled state */
  disabled?: boolean
  
  /** Custom icon for filled state */
  icon?: ComponentChildren
  
  /** Custom icon for empty state */
  emptyIcon?: ComponentChildren
  
  /** Custom icon for half-filled state */
  halfIcon?: ComponentChildren
  
  /** Color for filled icons */
  color?: string
  
  /** Color for empty icons */
  emptyColor?: string
  
  /** Show rating value as text */
  showValue?: boolean
  
  /** Format function for value display */
  valueFormatter?: (value: number, max: number) => string
  
  /** Error state */
  error?: boolean
  
  /** Error message */
  errorMessage?: string
  
  /** ARIA label */
  'aria-label'?: string
  
  /** ARIA labelledby */
  'aria-labelledby'?: string
}
