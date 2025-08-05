import { DatePicker } from '../../../../nebula'

export function SizesSection() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">DatePicker Sizes</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Small</label>
            <DatePicker 
              size="sm" 
              defaultValue={new Date(2024, 5, 15)}
              placeholder="Small datepicker..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Medium (Default)</label>
            <DatePicker 
              size="md" 
              defaultValue={new Date(2024, 5, 15)}
              placeholder="Medium datepicker..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Large</label>
            <DatePicker 
              size="lg" 
              defaultValue={new Date(2024, 5, 15)}
              placeholder="Large datepicker..."
            />
          </div>
        </div>
      </div>
    </div>
  )
}
