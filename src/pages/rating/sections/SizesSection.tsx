import { Rating } from '../../../../nebula'

export function SizesSection() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Rating Sizes</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Small</label>
            <Rating size="sm" defaultValue={4} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Medium (Default)</label>
            <Rating size="md" defaultValue={4} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Large</label>
            <Rating size="lg" defaultValue={4} />
          </div>
        </div>
      </div>
    </div>
  )
}
