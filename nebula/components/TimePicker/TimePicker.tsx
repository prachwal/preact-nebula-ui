import { forwardRef } from 'preact/compat'
import { useState, useRef, useEffect } from 'preact/hooks'
import type { TimePickerProps, Time } from './types'
import { cn } from '../../utils/cn'
import { TimeWheel } from './TimeWheel'
import { Portal } from '../Portal'

const TimePicker = forwardRef<HTMLDivElement, TimePickerProps>(({
  value,
  defaultValue,
  onChange,
  size = 'md',
  placeholder = 'Select time',
  disabled = false,
  readOnly = false,
  format = '12h',
  showSeconds = false,
  stepMinutes = 1,
  minTime,
  maxTime,
  showClear = true,
  showNow = true,
  error = false,
  errorMessage,
  className,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  required,
  id,
  ...props
}, ref) => {
  // Internal state for uncontrolled mode
  const [internalValue, setInternalValue] = useState<Time | null>(() => {
    if (value !== undefined) return value
    if (defaultValue !== undefined) return defaultValue
    return null
  })

  // Use controlled value if provided, otherwise use internal value
  const currentValue = value !== undefined ? value : internalValue

  // Time picker visibility state
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false)
  const [pickerPosition, setPickerPosition] = useState({ top: 0, left: 0, width: 240 })

  // Refs for positioning
  const containerRef = useRef<HTMLDivElement>(null)
  const internalInputRef = useRef<HTMLInputElement>(null)

  // Update picker position
  const updatePickerPosition = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      
      // Size-based widths (similar to DatePicker)
      const sizeWidths = {
        sm: 192, // w-48
        md: 240, // w-60  
        lg: 288  // w-72
      }
      
      setPickerPosition({
        top: rect.bottom + 4,
        left: rect.left,
        width: sizeWidths[size]
      })
    }
  }

  // Generate hour values based on format
  const getHourValues = (): number[] => {
    if (format === '12h') {
      return [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    } else {
      return Array.from({ length: 24 }, (_, i) => i)
    }
  }

  // Generate minute values based on step
  const getMinuteValues = (): number[] => {
    const minutes: number[] = []
    for (let i = 0; i < 60; i += stepMinutes) {
      minutes.push(i)
    }
    return minutes
  }

  // Generate second values
  const getSecondValues = (): number[] => {
    return Array.from({ length: 60 }, (_, i) => i)
  }

  // Handle time selection
  const handleTimeSelect = (time: Time | null) => {
    if (value === undefined) {
      setInternalValue(time)
    }
    
    onChange?.(time)
    setIsTimePickerOpen(false)
  }

  // Handle time component change
  const handleTimeChange = (component: 'hours' | 'minutes' | 'seconds', newValue: number) => {
    const currentTime = currentValue || { hours: 0, minutes: 0, seconds: 0 }
    
    let updatedTime: Time
    if (component === 'hours') {
      // Handle 12h format hour conversion
      let actualHours = newValue
      if (format === '12h' && currentTime.hours !== undefined) {
        const isPM = currentTime.hours >= 12
        if (newValue === 12) {
          actualHours = isPM ? 12 : 0
        } else {
          actualHours = isPM ? newValue + 12 : newValue
        }
      }
      updatedTime = { ...currentTime, hours: actualHours }
    } else if (component === 'minutes') {
      updatedTime = { ...currentTime, minutes: newValue }
    } else {
      updatedTime = { ...currentTime, seconds: newValue }
    }

    if (value === undefined) {
      setInternalValue(updatedTime)
    }
    onChange?.(updatedTime)
  }

  // Handle AM/PM toggle
  const handleAmPmToggle = () => {
    if (!currentValue) return
    
    const newHours = currentValue.hours < 12 ? currentValue.hours + 12 : currentValue.hours - 12
    handleTimeChange('hours', newHours)
  }

  // Handle input change (typing)
  const handleInputChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    const inputValue = target.value
    
    if (!inputValue) {
      handleTimeSelect(null)
      return
    }

    // Parse time string (basic implementation)
    const timeMatch = inputValue.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)?$/i)
    if (timeMatch) {
      let hours = parseInt(timeMatch[1])
      const minutes = parseInt(timeMatch[2])
      const seconds = timeMatch[3] ? parseInt(timeMatch[3]) : 0
      const period = timeMatch[4]?.toUpperCase()

      if (format === '12h' && period) {
        if (period === 'PM' && hours !== 12) hours += 12
        if (period === 'AM' && hours === 12) hours = 0
      }

      const parsedTime: Time = { hours, minutes, seconds: showSeconds ? seconds : undefined }
      handleTimeSelect(parsedTime)
    }
  }

  // Handle clear
  const handleClear = () => {
    handleTimeSelect(null)
  }

  // Handle now
  const handleNow = () => {
    const now = new Date()
    const currentTime: Time = {
      hours: now.getHours(),
      minutes: now.getMinutes(),
      seconds: showSeconds ? now.getSeconds() : undefined
    }
    handleTimeSelect(currentTime)
  }

  // Format time for display
  const formatTime = (time: Time | null): string => {
    if (!time) return ''
    
    let displayHours = time.hours
    let period = ''
    
    if (format === '12h') {
      period = time.hours >= 12 ? ' PM' : ' AM'
      displayHours = time.hours === 0 ? 12 : time.hours > 12 ? time.hours - 12 : time.hours
    }

    const timeString = `${String(displayHours).padStart(2, '0')}:${String(time.minutes).padStart(2, '0')}`
    const secondsString = showSeconds && time.seconds !== undefined ? `:${String(time.seconds).padStart(2, '0')}` : ''
    
    return `${timeString}${secondsString}${period}`
  }

  // Get display hours for wheel
  const getDisplayHours = (): number => {
    if (!currentValue) return format === '12h' ? 12 : 0
    
    if (format === '12h') {
      return currentValue.hours === 0 ? 12 : currentValue.hours > 12 ? currentValue.hours - 12 : currentValue.hours
    }
    return currentValue.hours
  }

  // Close picker on outside click and update position on scroll
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsTimePickerOpen(false)
      }
    }

    const handleScroll = () => {
      if (isTimePickerOpen) {
        updatePickerPosition()
      }
    }

    const handleResize = () => {
      if (isTimePickerOpen) {
        updatePickerPosition()
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
  }, [isTimePickerOpen])

  // Update position when picker opens
  useEffect(() => {
    if (isTimePickerOpen) {
      updatePickerPosition()
    }
  }, [isTimePickerOpen])

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

  // Time picker button classes
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
          ref={internalInputRef}
          type="text"
          role="textbox"
          id={id}
          value={formatTime(currentValue)}
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
          aria-expanded={isTimePickerOpen}
          aria-haspopup="dialog"
          aria-invalid={error ? 'true' : 'false'}
          aria-required={required ? 'true' : 'false'}
          onFocus={() => !disabled && setIsTimePickerOpen(true)}
          onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
              e.preventDefault()
              setIsTimePickerOpen(true)
            }
          }}
        />
        
        {/* Time picker toggle button */}
        <button
          type="button"
          className={buttonClasses}
          onClick={() => !disabled && setIsTimePickerOpen(!isTimePickerOpen)}
          disabled={disabled}
          aria-label="Open time picker"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>

        {/* Clear button */}
        {showClear && currentValue && !disabled && !readOnly && (
          <button
            type="button"
            className={cn(buttonClasses, 'right-8')}
            onClick={handleClear}
            aria-label="Clear time"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Time picker popup */}
      {isTimePickerOpen && !disabled && (
        <Portal>
          <div className="fixed inset-0 z-50 pointer-events-none">
            <div 
              role="dialog"
              aria-label="Choose time"
              className="absolute bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg pointer-events-auto"
              style={{
                top: pickerPosition.top,
                left: pickerPosition.left,
                minWidth: pickerPosition.width
              }}
            >
              <div className="p-4">
                {/* Time wheels container */}
                <div className="flex gap-2 mb-4">
                  {/* Hours wheel */}
                  <div className="flex-1">
                    <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 text-center">
                      Hours
                    </div>
                    <TimeWheel
                      values={getHourValues().map(String)}
                      selectedValue={String(getDisplayHours())}
                      onChange={(value: string) => handleTimeChange('hours', parseInt(value))}
                      size={size}
                    />
                  </div>

                  {/* Minutes wheel */}
                  <div className="flex-1">
                    <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 text-center">
                      Minutes
                    </div>
                    <TimeWheel
                      values={getMinuteValues().map(v => String(v).padStart(2, '0'))}
                      selectedValue={String(currentValue?.minutes || 0).padStart(2, '0')}
                      onChange={(value: string) => handleTimeChange('minutes', parseInt(value))}
                      size={size}
                    />
                  </div>

                  {/* Seconds wheel (if enabled) */}
                  {showSeconds && (
                    <div className="flex-1">
                      <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 text-center">
                        Seconds
                      </div>
                      <TimeWheel
                        values={getSecondValues().map(v => String(v).padStart(2, '0'))}
                        selectedValue={String(currentValue?.seconds || 0).padStart(2, '0')}
                        onChange={(value: string) => handleTimeChange('seconds', parseInt(value))}
                        size={size}
                      />
                    </div>
                  )}

                  {/* AM/PM toggle (if 12h format) */}
                  {format === '12h' && (
                    <div className="flex flex-col justify-center">
                      <button
                        type="button"
                        onClick={handleAmPmToggle}
                        disabled={disabled}
                        className={cn(
                          'px-3 py-2 text-sm font-medium rounded-md border transition-colors',
                          'border-gray-300 dark:border-gray-600',
                          'bg-white dark:bg-gray-800',
                          'text-gray-900 dark:text-white',
                          'hover:bg-gray-50 dark:hover:bg-gray-700',
                          'focus:outline-none focus:ring-2 focus:ring-blue-500',
                          {
                            'cursor-not-allowed opacity-50': disabled
                          }
                        )}
                      >
                        {currentValue && currentValue.hours >= 12 ? 'PM' : 'AM'}
                      </button>
                    </div>
                  )}
                </div>

                {/* Footer buttons */}
                <div className="flex gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
                  {showNow && (
                    <button
                      type="button"
                      onClick={handleNow}
                      disabled={disabled}
                      className={cn(
                        'px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
                        'text-blue-600 dark:text-blue-400',
                        'hover:bg-blue-50 dark:hover:bg-blue-900/30',
                        'focus:outline-none focus:ring-2 focus:ring-blue-500',
                        {
                          'cursor-not-allowed opacity-50': disabled
                        }
                      )}
                    >
                      Now
                    </button>
                  )}
                  <div className="flex-1" />
                  <button
                    type="button"
                    onClick={() => setIsTimePickerOpen(false)}
                    className="px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none"
                  >
                    Done
                  </button>
                </div>
              </div>
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

TimePicker.displayName = 'TimePicker'

export { TimePicker }
