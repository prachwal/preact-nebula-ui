import { Rating } from '../../../../nebula'

export function StatesSection() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Component States</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Default State</label>
            <Rating defaultValue={3} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Read Only</label>
            <Rating defaultValue={4} readOnly />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Cannot be modified by user interaction</p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Disabled</label>
            <Rating defaultValue={2} disabled />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Grayed out and non-interactive</p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">With Validation Error</label>
            <Rating 
              defaultValue={0} 
              error={true}
              errorMessage="Please provide a rating"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Required Field</label>
            <Rating 
              defaultValue={0}
              error={true}
              errorMessage="Rating is required"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
