import { useState } from 'preact/hooks'
import { TimePicker, Label } from '../../../../nebula/components'
import type { Time } from '../../../../nebula/components'

export function SizesSection() {
  const [smallTime, setSmallTime] = useState<Time | null>({ hours: 9, minutes: 30 })
  const [mediumTime, setMediumTime] = useState<Time | null>({ hours: 14, minutes: 45 })
  const [largeTime, setLargeTime] = useState<Time | null>({ hours: 18, minutes: 15 })

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Size Variants</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          TimePicker comes in three sizes to fit different design needs and contexts.
        </p>
      </div>

      <div className="space-y-6">
        {/* Small size */}
        <div className="space-y-3">
          <Label>Small (sm)</Label>
          <div className="max-w-xs">
            <TimePicker 
              size="sm"
              value={smallTime}
              onChange={setSmallTime}
              format="12h"
              placeholder="Select time"
            />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Compact size perfect for dense layouts and forms
          </p>
        </div>

        {/* Medium size (default) */}
        <div className="space-y-3">
          <Label>Medium (md) - Default</Label>
          <div className="max-w-sm">
            <TimePicker 
              size="md"
              value={mediumTime}
              onChange={setMediumTime}
              format="24h"
              placeholder="Select time"
            />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Standard size suitable for most use cases
          </p>
        </div>

        {/* Large size */}
        <div className="space-y-3">
          <Label>Large (lg)</Label>
          <div className="max-w-md">
            <TimePicker 
              size="lg"
              value={largeTime}
              onChange={setLargeTime}
              format="12h"
              showSeconds={true}
              placeholder="Select time"
            />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Large size for improved accessibility and prominence
          </p>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-2">Size Guidelines</h4>
        <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
          <li><strong>Small:</strong> Use in tables, compact forms, or space-constrained areas</li>
          <li><strong>Medium:</strong> Default choice for most forms and interfaces</li>
          <li><strong>Large:</strong> Use for emphasis, accessibility, or when time selection is primary action</li>
        </ul>
      </div>
    </div>
  )
}
