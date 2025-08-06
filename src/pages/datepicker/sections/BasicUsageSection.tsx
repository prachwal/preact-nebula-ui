import { useState } from 'preact/hooks'
import { DatePicker } from '../../../../nebula'

export function BasicUsageSection() {
  const [controlledDate, setControlledDate] = useState<Date | null>(new Date())
  // ...existing code...

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Controlled DatePicker</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
              Select a date
            </label>
            <DatePicker 
              value={controlledDate || undefined}
              onChange={setControlledDate}
              placeholder="Choose date..."
            />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Selected: {controlledDate ? controlledDate.toLocaleDateString() : 'None'}
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Uncontrolled DatePicker</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
              Default value
            </label>
            <DatePicker 
              defaultValue={new Date()}
              // ...existing code...
              placeholder="Pick a date..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
              No default value
            </label>
            <DatePicker placeholder="Select date..." />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Date Restrictions</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
              Min/Max Date Range
            </label>
            <DatePicker 
              placeholder="Select date within range..."
              minDate={new Date(2024, 0, 1)} // January 1, 2024
              maxDate={new Date(2024, 11, 31)} // December 31, 2024
            />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Only dates in 2024 are selectable
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
