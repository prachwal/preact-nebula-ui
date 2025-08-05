import { DatePicker } from '../../../../nebula'

export function ValidationSection() {
  const today = new Date()
  const nextWeek = new Date(today)
  nextWeek.setDate(today.getDate() + 7)
  
  const nextMonth = new Date(today)
  nextMonth.setMonth(today.getMonth() + 1)

  // Create array of weekend dates for the next month
  const getWeekendDates = () => {
    const weekends: Date[] = []
    const start = new Date(today)
    const end = new Date(nextMonth)
    
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      if (d.getDay() === 0 || d.getDay() === 6) { // Sunday (0) or Saturday (6)
        weekends.push(new Date(d))
      }
    }
    return weekends
  }

  const isWeekend = (date: Date) => {
    return date.getDay() === 0 || date.getDay() === 6
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Date Validation</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
              Minimum Date (Future dates only)
            </label>
            <DatePicker 
              minDate={today}
              placeholder="Select future date..."
            />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Only today and future dates are selectable
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
              Maximum Date (Next week only)
            </label>
            <DatePicker 
              maxDate={nextWeek}
              placeholder="Select date within week..."
            />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Only dates up to {nextWeek.toLocaleDateString()} are selectable
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
              Date Range (Today to Next Month)
            </label>
            <DatePicker 
              minDate={today}
              maxDate={nextMonth}
              placeholder="Select date in range..."
            />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Dates from {today.toLocaleDateString()} to {nextMonth.toLocaleDateString()}
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
              Disabled Specific Dates (Weekends)
            </label>
            <DatePicker 
              disabledDates={getWeekendDates()}
              placeholder="Weekdays only..."
            />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Weekends are disabled
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
              Custom Validation Function (No weekends)
            </label>
            <DatePicker 
              isDateDisabled={isWeekend}
              placeholder="Weekdays only (function)..."
            />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Uses custom function to disable weekends
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
