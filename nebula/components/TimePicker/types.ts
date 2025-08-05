export type TimePickerSize = 'sm' | 'md' | 'lg'

export type TimeFormat = '12h' | '24h'

export interface Time {
  hours: number
  minutes: number
  seconds?: number
}

export interface TimePickerProps {
  /** Current selected time */
  value?: Time | null
  
  /** Default time for uncontrolled mode */
  defaultValue?: Time | null
  
  /** Callback fired when time changes */
  onChange?: (time: Time | null) => void
  
  /** Size variant */
  size?: TimePickerSize
  
  /** Placeholder text for input */
  placeholder?: string
  
  /** Disabled state */
  disabled?: boolean
  
  /** Read-only mode */
  readOnly?: boolean
  
  /** Time format (12h or 24h) */
  format?: TimeFormat
  
  /** Show seconds selector */
  showSeconds?: boolean
  
  /** Step interval in minutes */
  stepMinutes?: number
  
  /** Minimum selectable time */
  minTime?: Time
  
  /** Maximum selectable time */
  maxTime?: Time
  
  /** Show clear button */
  showClear?: boolean
  
  /** Show now button */
  showNow?: boolean
  
  /** Error state */
  error?: boolean
  
  /** Error message */
  errorMessage?: string
  
  /** Custom class name */
  className?: string
  
  /** ARIA label */
  'aria-label'?: string
  
  /** ARIA labelledby */
  'aria-labelledby'?: string
  
  /** ARIA describedby */
  'aria-describedby'?: string
  
  /** Required field */
  required?: boolean
  
  /** Input ID */
  id?: string
}

export interface TimeWheelProps {
  /** Available values */
  values: string[]
  
  /** Current selected value */
  selectedValue: string
  
  /** Callback when value changes */
  onChange?: (value: string) => void
  
  /** Values that should be disabled */
  disabledValues?: string[]
  
  /** Size variant */
  size?: TimePickerSize
  
  /** ARIA label */
  'aria-label'?: string
}
