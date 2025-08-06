import type { Ref } from 'preact/compat'

export type DatePickerSize = 'sm' | 'md' | 'lg'

export interface DatePickerProps {
  /** Current selected date */
  value?: Date | null
  
  /** Default date for uncontrolled mode */
  defaultValue?: Date | null
  
  /** Callback fired when date changes */
  onChange?: (date: Date | null) => void
  
  /** Size variant */
  size?: DatePickerSize
  
  /** Placeholder text for input */
  placeholder?: string
  
  /** Disabled state */
  disabled?: boolean
  
  /** Read-only mode */
  readOnly?: boolean
  
  /** Minimum selectable date */
  minDate?: Date
  
  /** Maximum selectable date */
  maxDate?: Date
  
  /** Array of disabled dates */
  disabledDates?: Date[]
  
  /** Function to determine if a date should be disabled */
  isDateDisabled?: (date: Date) => boolean
  
  /** Date format for display */
  format?: string
  
  /** Show today button */
  showToday?: boolean
  
  /** Show clear button */
  showClear?: boolean
  
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
  
  /** Input ref */
  inputRef?: Ref<HTMLInputElement>
}

export interface CalendarProps {
  /** Current viewing month */
  currentMonth: Date
  
  /** Selected date */
  selectedDate?: Date | null
  
  /** Minimum selectable date */
  minDate?: Date
  
  /** Maximum selectable date */
  maxDate?: Date
  
  /** Array of disabled dates */
  disabledDates?: Date[]
  
  /** Function to determine if a date should be disabled */
  isDateDisabled?: (date: Date) => boolean
  
  /** Callback when date is selected */
  onDateSelect: (date: Date) => void
  
  /** Callback when month changes */
  onMonthChange: (month: Date) => void
  
  /** Show today button */
  showToday?: boolean
  
  /** Size variant */
  size?: DatePickerSize
}
