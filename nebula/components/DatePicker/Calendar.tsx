import { CalendarProps } from './types'
import { cn } from '../../utils/cn'

export function Calendar({
  currentMonth,
  selectedDate,
  minDate,
  maxDate,
  disabledDates = [],
  isDateDisabled,
  onDateSelect,
  onMonthChange,
  showToday = true,
  size = 'md'
}: CalendarProps) {
  
  // Get calendar grid data
  const getCalendarDays = () => {
    const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
    const startOfCalendar = new Date(startOfMonth)
    startOfCalendar.setDate(startOfCalendar.getDate() - startOfMonth.getDay())
    
    const days: Date[] = []
    const current = new Date(startOfCalendar)
    
    // Generate 6 weeks (42 days) to ensure consistent calendar size
    for (let i = 0; i < 42; i++) {
      days.push(new Date(current))
      current.setDate(current.getDate() + 1)
    }
    
    return days
  }

  // Navigation handlers
  const goToPreviousMonth = () => {
    const newMonth = new Date(currentMonth)
    newMonth.setMonth(newMonth.getMonth() - 1)
    onMonthChange(newMonth)
  }

  const goToNextMonth = () => {
    const newMonth = new Date(currentMonth)
    newMonth.setMonth(newMonth.getMonth() + 1)
    onMonthChange(newMonth)
  }

  const goToToday = () => {
    const today = new Date()
    onMonthChange(today)
    onDateSelect(today)
  }

  // Check if date is disabled
  const isDisabled = (date: Date): boolean => {
    if (minDate && date < minDate) return true
    if (maxDate && date > maxDate) return true
    if (disabledDates.some(d => d.toDateString() === date.toDateString())) return true
    if (isDateDisabled?.(date)) return true
    return false
  }

  // Check if date is selected
  const isSelected = (date: Date): boolean => {
    return selectedDate ? date.toDateString() === selectedDate.toDateString() : false
  }

  // Check if date is today
  const isToday = (date: Date): boolean => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  // Check if date is in current month
  const isInCurrentMonth = (date: Date): boolean => {
    return date.getMonth() === currentMonth.getMonth()
  }

  const days = getCalendarDays()
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

  // Size classes
  const sizeClasses = {
    sm: {
      container: 'p-2 text-xs w-48',
      header: 'px-2 py-1',
      dayHeader: 'h-6 text-xs',
      dayCell: 'h-6 w-6 text-xs'
    },
    md: {
      container: 'p-3 text-sm w-60',
      header: 'px-3 py-2',
      dayHeader: 'h-8 text-sm',
      dayCell: 'h-8 w-8 text-sm'
    },
    lg: {
      container: 'p-4 text-base w-72',
      header: 'px-4 py-3',
      dayHeader: 'h-10 text-base',
      dayCell: 'h-10 w-10 text-base'
    }
  }

  return (
    <div 
      role="dialog"
      aria-label="Choose date"
      className={cn('bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg', sizeClasses[size].container)}
    >
      {/* Header with month/year and navigation */}
      <div className={cn('flex items-center justify-between mb-2', sizeClasses[size].header)}>
        <button
          type="button"
          onClick={goToPreviousMonth}
          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
          aria-label="Previous month"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div className="font-semibold text-gray-900 dark:text-white">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </div>
        
        <button
          type="button"
          onClick={goToNextMonth}
          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
          aria-label="Next month"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {dayNames.map(day => (
          <div
            key={day}
            className={cn(
              'flex items-center justify-center font-medium text-gray-500 dark:text-gray-400',
              sizeClasses[size].dayHeader
            )}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((date, index) => {
          const disabled = isDisabled(date)
          const selected = isSelected(date)
          const todayClass = isToday(date)
          const inCurrentMonth = isInCurrentMonth(date)

          return (
            <button
              key={index}
              type="button"
              onClick={() => !disabled && onDateSelect(date)}
              disabled={disabled}
              className={cn(
                'flex items-center justify-center rounded transition-colors',
                sizeClasses[size].dayCell,
                {
                  // Base styles
                  'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700': inCurrentMonth && !disabled && !selected,
                  'text-gray-400 dark:text-gray-600': !inCurrentMonth,
                  
                  // Selected state
                  'bg-blue-500 text-white hover:bg-blue-600': selected && !disabled,
                  
                  // Today highlight
                  'ring-2 ring-blue-500 ring-inset': todayClass && !selected,
                  
                  // Disabled state
                  'cursor-not-allowed opacity-50 text-gray-400 dark:text-gray-600': disabled,
                  
                  // Focus styles
                  'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800': !disabled
                }
              )}
              aria-label={`${date.toLocaleDateString()}`}
              aria-selected={selected}
            >
              {date.getDate()}
            </button>
          )
        })}
      </div>

      {/* Footer with today button */}
      {showToday && (
        <div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={goToToday}
            className="w-full px-3 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
          >
            Today
          </button>
        </div>
      )}
    </div>
  )
}
