import { useState } from 'preact/hooks'
import { TimePicker, Label } from '../../../../nebula/components'
import type { Time } from '../../../../nebula/components'

export function StatesSection() {
  const [normalTime, setNormalTime] = useState<Time | null>({ hours: 10, minutes: 30 })
  const [readOnlyTime] = useState<Time | null>({ hours: 15, minutes: 45 })
  const [errorTime, setErrorTime] = useState<Time | null>(null)

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Component States</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          TimePicker supports various states to provide appropriate feedback and interaction patterns.
        </p>
      </div>

      <div className="space-y-6">
        {/* Normal state */}
        <div className="space-y-3">
          <Label>Normal state</Label>
          <TimePicker 
            value={normalTime}
            onChange={setNormalTime}
            format="12h"
            placeholder="Select time"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Default interactive state
          </p>
        </div>

        {/* Disabled state */}
        <div className="space-y-3">
          <Label>Disabled state</Label>
          <TimePicker 
            disabled
            value={{ hours: 9, minutes: 0 }}
            format="24h"
            placeholder="Select time"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Non-interactive state, typically used when time selection is not available
          </p>
        </div>

        {/* Read-only state */}
        <div className="space-y-3">
          <Label>Read-only state</Label>
          <TimePicker 
            readOnly
            value={readOnlyTime}
            format="12h"
            showSeconds={true}
            placeholder="Select time"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Display-only mode, shows value but prevents editing
          </p>
        </div>

        {/* Error state */}
        <div className="space-y-3">
          <Label>Error state</Label>
          <TimePicker 
            error
            errorMessage="Please select a valid time"
            value={errorTime}
            onChange={setErrorTime}
            format="24h"
            placeholder="Select time"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Shows validation error with custom message
          </p>
        </div>

        {/* Required field */}
        <div className="space-y-3">
          <Label required>Required field</Label>
          <TimePicker 
            required
            format="12h"
            placeholder="Select time (required)"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Required field with proper ARIA attributes
          </p>
        </div>

        {/* Without clear and now buttons */}
        <div className="space-y-3">
          <Label>Without action buttons</Label>
          <TimePicker 
            showClear={false}
            showNow={false}
            format="24h"
            placeholder="Select time"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Minimal interface without clear and now buttons
          </p>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-amber-900 dark:text-amber-300 mb-2">State Guidelines</h4>
        <ul className="text-sm text-amber-800 dark:text-amber-300 space-y-1">
          <li><strong>Disabled:</strong> Use when time selection is temporarily unavailable</li>
          <li><strong>Read-only:</strong> Use to display time values without allowing changes</li>
          <li><strong>Error:</strong> Always provide clear error messages for validation failures</li>
          <li><strong>Required:</strong> Mark required fields appropriately for form validation</li>
        </ul>
      </div>
    </div>
  )
}
