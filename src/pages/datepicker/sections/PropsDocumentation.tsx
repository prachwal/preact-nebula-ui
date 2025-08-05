export function PropsDocumentation() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Props Documentation</h3>
        
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">DatePickerProps</h4>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="font-mono text-sm text-blue-600 dark:text-blue-400">value?</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Date</div>
              <div className="text-sm text-gray-900 dark:text-white">Current selected date (controlled)</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="font-mono text-sm text-blue-600 dark:text-blue-400">defaultValue?</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Date</div>
              <div className="text-sm text-gray-900 dark:text-white">Default date for uncontrolled mode</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="font-mono text-sm text-blue-600 dark:text-blue-400">onChange?</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">(date: Date | null) =&gt; void</div>
              <div className="text-sm text-gray-900 dark:text-white">Callback fired when date changes</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="font-mono text-sm text-blue-600 dark:text-blue-400">size?</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">'sm' | 'md' | 'lg'</div>
              <div className="text-sm text-gray-900 dark:text-white">Size variant (default: 'md')</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="font-mono text-sm text-blue-600 dark:text-blue-400">placeholder?</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">string</div>
              <div className="text-sm text-gray-900 dark:text-white">Placeholder text for input</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="font-mono text-sm text-blue-600 dark:text-blue-400">disabled?</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">boolean</div>
              <div className="text-sm text-gray-900 dark:text-white">Disabled state (default: false)</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="font-mono text-sm text-blue-600 dark:text-blue-400">readOnly?</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">boolean</div>
              <div className="text-sm text-gray-900 dark:text-white">Read-only mode (default: false)</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="font-mono text-sm text-blue-600 dark:text-blue-400">minDate?</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Date</div>
              <div className="text-sm text-gray-900 dark:text-white">Minimum selectable date</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="font-mono text-sm text-blue-600 dark:text-blue-400">maxDate?</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Date</div>
              <div className="text-sm text-gray-900 dark:text-white">Maximum selectable date</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="font-mono text-sm text-blue-600 dark:text-blue-400">disabledDates?</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Date[]</div>
              <div className="text-sm text-gray-900 dark:text-white">Array of disabled dates</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="font-mono text-sm text-blue-600 dark:text-blue-400">isDateDisabled?</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">(date: Date) =&gt; boolean</div>
              <div className="text-sm text-gray-900 dark:text-white">Function to determine if date is disabled</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="font-mono text-sm text-blue-600 dark:text-blue-400">format?</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">string</div>
              <div className="text-sm text-gray-900 dark:text-white">Date format for display (default: 'MM/dd/yyyy')</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="font-mono text-sm text-blue-600 dark:text-blue-400">showToday?</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">boolean</div>
              <div className="text-sm text-gray-900 dark:text-white">Show today button (default: true)</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="font-mono text-sm text-blue-600 dark:text-blue-400">showClear?</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">boolean</div>
              <div className="text-sm text-gray-900 dark:text-white">Show clear button (default: true)</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="font-mono text-sm text-blue-600 dark:text-blue-400">error?</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">boolean</div>
              <div className="text-sm text-gray-900 dark:text-white">Error state (default: false)</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="font-mono text-sm text-blue-600 dark:text-blue-400">errorMessage?</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">string</div>
              <div className="text-sm text-gray-900 dark:text-white">Error message to display</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mt-6">
          <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">CalendarProps</h4>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="font-mono text-sm text-blue-600 dark:text-blue-400">currentMonth</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Date</div>
              <div className="text-sm text-gray-900 dark:text-white">Current viewing month</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="font-mono text-sm text-blue-600 dark:text-blue-400">selectedDate?</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Date</div>
              <div className="text-sm text-gray-900 dark:text-white">Selected date</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="font-mono text-sm text-blue-600 dark:text-blue-400">onDateSelect</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">(date: Date) =&gt; void</div>
              <div className="text-sm text-gray-900 dark:text-white">Callback when date is selected</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="font-mono text-sm text-blue-600 dark:text-blue-400">onMonthChange</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">(month: Date) =&gt; void</div>
              <div className="text-sm text-gray-900 dark:text-white">Callback when month changes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
