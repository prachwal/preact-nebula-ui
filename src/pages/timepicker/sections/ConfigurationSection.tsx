import { useState } from 'preact/hooks'
import { TimePicker, Label } from '../../../../nebula/components'
import type { Time } from '../../../../nebula/components'

export function ConfigurationSection() {
  const [stepTime, setStepTime] = useState<Time | null>({ hours: 14, minutes: 30 })
  const [restrictedTime, setRestrictedTime] = useState<Time | null>({ hours: 10, minutes: 0 })
  const [preciseTime, setPreciseTime] = useState<Time | null>({ hours: 16, minutes: 45, seconds: 30 })

  // Business hours: 9 AM to 6 PM
  const minTime: Time = { hours: 9, minutes: 0 }
  const maxTime: Time = { hours: 18, minutes: 0 }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Configuration Options</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Configure TimePicker behavior with step intervals, time restrictions, and precision settings.
        </p>
      </div>

      <div className="space-y-6">
        {/* Step intervals */}
        <div className="space-y-3">
          <Label>15-minute step intervals</Label>
          <TimePicker 
            value={stepTime}
            onChange={setStepTime}
            stepMinutes={15}
            format="12h"
            placeholder="Select time"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Minute selection limited to 15-minute intervals: 00, 15, 30, 45
          </p>
        </div>

        {/* Time restrictions */}
        <div className="space-y-3">
          <Label>Business hours (9 AM - 6 PM)</Label>
          <TimePicker 
            value={restrictedTime}
            onChange={setRestrictedTime}
            minTime={minTime}
            maxTime={maxTime}
            format="12h"
            placeholder="Select time"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Time selection restricted to business hours
          </p>
        </div>

        {/* Seconds precision */}
        <div className="space-y-3">
          <Label>High precision with seconds</Label>
          <TimePicker 
            value={preciseTime}
            onChange={setPreciseTime}
            showSeconds={true}
            format="24h"
            placeholder="Select time"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Includes seconds for precise time selection
          </p>
        </div>

        {/* Different format examples */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <Label>24-hour format</Label>
            <TimePicker 
              format="24h"
              defaultValue={{ hours: 14, minutes: 30 }}
              placeholder="Select time"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Military/European time format
            </p>
          </div>

          <div className="space-y-3">
            <Label>12-hour format</Label>
            <TimePicker 
              format="12h"
              defaultValue={{ hours: 14, minutes: 30 }}
              placeholder="Select time"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Standard US time format with AM/PM
            </p>
          </div>
        </div>

        {/* Custom step example */}
        <div className="space-y-3">
          <Label>5-minute intervals</Label>
          <TimePicker 
            stepMinutes={5}
            format="24h"
            placeholder="Select time"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Minute selection in 5-minute increments
          </p>
        </div>
      </div>

      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-green-900 dark:text-green-300 mb-2">Configuration Tips</h4>
        <ul className="text-sm text-green-800 dark:text-green-300 space-y-1">
          <li><strong>Step intervals:</strong> Use 15 or 30-minute steps for appointment scheduling</li>
          <li><strong>Time restrictions:</strong> Enforce business rules with min/max time limits</li>
          <li><strong>Seconds precision:</strong> Enable for applications requiring exact timing</li>
          <li><strong>Format choice:</strong> Use 12h for US audiences, 24h for international</li>
        </ul>
      </div>
    </div>
  )
}
