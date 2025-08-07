import { Anchor } from '@/components'
import { Label } from '@/components'

export function PositioningSection() {
  const items = [
    { key: 'top', href: '#top', title: 'Top Section' },
    { key: 'middle', href: '#middle', title: 'Middle Section' },
    { key: 'bottom', href: '#bottom', title: 'Bottom Section' }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Positioning Options
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Configure offset and positioning for different layouts.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <Label>With Top Offset</Label>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <Anchor 
                items={items}
                offsetTop={80}
              />
            </div>
          </div>

          <div>
            <Label>Fixed Position</Label>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <Anchor 
                items={items}
                affix={true}
                offsetTop={20}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
