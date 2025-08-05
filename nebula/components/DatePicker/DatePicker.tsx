import { forwardRef } from 'preact/compat'
import { useState, useRef, useEffect } from 'preact/hooks'
import { DatePickerProps } from './types'
import { cn } from '../../utils/cn'
import { Calendar } from './Calendar'
import { Portal } from '../Portal'

const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(({
  value,
  defaultValue,
  onChange,
  size = 'md',
  placeholder = 'Select date',
  disabled = false,
  readOnly = false,
  minDate,
  maxDate,
  disabledDates,
  isDateDisabled,
  format = 'MM/dd/yyyy',
  showToday = true,
  showClear = true,
  error = false,
  errorMessage,
  className,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  required,
  id,
  inputRef,
  ...props
}, ref) => {
  // Internal state for uncontrolled mode
  const [internalValue, setInternalValue] = useState<Date | null>(() => {
    if (value !== undefined) return value
    if (defaultValue !== undefined) return defaultValue
    return null
  })

  // Use controlled value if provided, otherwise use internal value
  const currentValue = value !== undefined ? value : internalValue

  // Calendar visibility state
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(currentValue || new Date())
  const [calendarPosition, setCalendarPosition] = useState({ top: 0, left: 0, width: 240 })

  // Refs for positioning
  const containerRef = useRef<HTMLDivElement>(null)
  const internalInputRef = useRef<HTMLInputElement>(null)
  const activeInputRef = inputRef || internalInputRef

  // Update calendar position
  const updateCalendarPosition = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      
      // Size-based widths
      const sizeWidths = {
        sm: 192, // w-48
        md: 240, // w-60  
        lg: 288  // w-72
      }
      
      setCalendarPosition({
        top: rect.bottom + 4,
        left: rect.left,
        width: sizeWidths[size]
      })
    }
  }

  // Handle date selection
  const handleDateSelect = (date: Date) => {
    const newValue = date
    
    if (value === undefined) {
      setInternalValue(newValue)
    }
    
    onChange?.(newValue)
    setIsCalendarOpen(false)
  }

  // Handle input change (typing)
  const handleInputChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    const inputValue = target.value
    
    if (!inputValue) {
      handleDateSelect(null as any)
      return
    }

    // Basic date parsing - you might want to use a more robust date library
    const parsedDate = new Date(inputValue)
    if (!isNaN(parsedDate.getTime())) {
      handleDateSelect(parsedDate)
    }
  }

  // Handle clear
  const handleClear = () => {
    handleDateSelect(null as any)
  }

  // Format date for display
  const formatDate = (date: Date | null): string => {
    if (!date) return ''
    
    // Simple formatting - in production, use a proper date formatting library
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const year = date.getFullYear()
    
    return `${month}/${day}/${year}`
  }

  // Close calendar on outside click and update position on scroll
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsCalendarOpen(false)
      }
    }

    const handleScroll = () => {
      if (isCalendarOpen) {
        updateCalendarPosition()
      }
    }

    const handleResize = () => {
      if (isCalendarOpen) {
        updateCalendarPosition()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    window.addEventListener('scroll', handleScroll, true)
    window.addEventListener('resize', handleResize)
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('scroll', handleScroll, true)
      window.removeEventListener('resize', handleResize)
    }
  }, [isCalendarOpen])

  // Update position when calendar opens
  useEffect(() => {
    if (isCalendarOpen) {
      updateCalendarPosition()
    }
  }, [isCalendarOpen])

  // Size classes
  const sizeClasses = {
    sm: 'text-sm px-2 py-1 h-8',
    md: 'text-sm px-3 py-2 h-10',
    lg: 'text-base px-4 py-3 h-12'
  }

  // Input classes
  const inputClasses = cn(
    'w-full border rounded-md bg-white dark:bg-gray-800',
    'text-gray-900 dark:text-white',
    'placeholder-gray-500 dark:placeholder-gray-400',
    'border-gray-300 dark:border-gray-600',
    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
    'dark:focus:ring-blue-400 dark:focus:border-blue-400',
    sizeClasses[size],
    {
      'border-red-500 dark:border-red-400 focus:ring-red-500 focus:border-red-500': error,
      'bg-gray-100 dark:bg-gray-700 cursor-not-allowed': disabled,
      'cursor-pointer': readOnly && !disabled
    },
    className
  )

  // Button size classes
  const buttonSizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  }

  // Calendar button classes
  const buttonClasses = cn(
    'absolute right-1 top-1/2 -translate-y-1/2',
    'p-1 rounded text-gray-500 dark:text-gray-400',
    'hover:text-gray-700 dark:hover:text-gray-200',
    'focus:outline-none focus:text-gray-700 dark:focus:text-gray-200',
    buttonSizeClasses[size],
    {
      'cursor-not-allowed opacity-50': disabled
    }
  )

  return (
    <div ref={ref} className="relative" {...props}>
      <div ref={containerRef} className="relative">
        <input
          ref={activeInputRef}
          type="text"
          role="textbox"
          id={id}
          value={formatDate(currentValue)}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          className={inputClasses}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={
            error && errorMessage && id 
              ? `${id}-error${ariaDescribedBy ? ` ${ariaDescribedBy}` : ''}`
              : ariaDescribedBy
          }
          aria-expanded={isCalendarOpen}
          aria-haspopup="dialog"
          aria-invalid={error ? 'true' : 'false'}
          aria-required={required ? 'true' : 'false'}
          onFocus={() => !disabled && setIsCalendarOpen(true)}
          onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
              e.preventDefault()
              setIsCalendarOpen(true)
            }
          }}
        />
        
        {/* Calendar toggle button */}
        <button
          type="button"
          className={buttonClasses}
          onClick={() => !disabled && setIsCalendarOpen(!isCalendarOpen)}
          disabled={disabled}
          aria-label="Open calendar"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>

        {/* Clear button */}
        {showClear && currentValue && !disabled && !readOnly && (
          <button
            type="button"
            className={cn(buttonClasses, 'right-8')}
            onClick={handleClear}
            aria-label="Clear date"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Calendar popup */}
      {isCalendarOpen && !disabled && (
        <Portal>
          <div className="fixed inset-0 z-50 pointer-events-none">
            <div 
              className="absolute bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg pointer-events-auto"
              style={{
                top: calendarPosition.top,
                left: calendarPosition.left,
                minWidth: calendarPosition.width
              }}
            >
              <Calendar
                currentMonth={currentMonth}
                selectedDate={currentValue}
                minDate={minDate}
                maxDate={maxDate}
                disabledDates={disabledDates}
                isDateDisabled={isDateDisabled}
                onDateSelect={handleDateSelect}
                onMonthChange={setCurrentMonth}
                showToday={showToday}
                size={size}
              />
            </div>
          </div>
        </Portal>
      )}

      {/* Error message */}
      {error && errorMessage && (
        <div 
          className="mt-1 text-sm text-red-600 dark:text-red-400"
          role="alert"
          id={id ? `${id}-error` : undefined}
        >
          {errorMessage}
        </div>
      )}
    </div>
  )
})

DatePicker.displayName = 'DatePicker'

export { DatePicker }
