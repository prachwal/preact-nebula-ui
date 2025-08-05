import { DatePicker } from '../../../../nebula'

export function StatesSection() {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">DatePicker States</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Default State</label>
            <DatePicker 
              defaultValue={today}
              placeholder="Default state..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Read Only</label>
            <DatePicker 
              defaultValue={today}
              readOnly
              placeholder="Read only..."
            />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Calendar cannot be opened, input is read-only
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Disabled</label>
            <DatePicker 
              defaultValue={today}
              disabled
              placeholder="Disabled..."
            />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Component is completely disabled
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Error State</label>
            <DatePicker 
              error
              errorMessage="Please select a valid date"
              placeholder="Error state..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Without Clear Button</label>
            <DatePicker 
              defaultValue={today}
              showClear={false}
              placeholder="No clear button..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Without Today Button</label>
            <DatePicker 
              showToday={false}
              placeholder="No today button..."
            />
          </div>
        </div>
      </div>
    </div>
  )
}
