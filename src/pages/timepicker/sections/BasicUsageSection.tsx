import { useState } from 'preact/hooks'
import { TimePicker, Label } from '../../../../nebula/components'
import type { Time } from '../../../../nebula/components'

export function BasicUsageSection() {
  const [uncontrolledTime, setUncontrolledTime] = useState<Time | null>(null)
  const [controlledTime, setControlledTime] = useState<Time | null>({ hours: 14, minutes: 30 })
  const [time12h, setTime12h] = useState<Time | null>({ hours: 9, minutes: 15 })
  const [timeWithSeconds, setTimeWithSeconds] = useState<Time | null>({ hours: 16, minutes: 45, seconds: 30 })

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Basic Usage</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          TimePicker provides a user-friendly interface for time selection with various formatting options.
        </p>
      </div>

      <div className="space-y-6">
        {/* Uncontrolled */}
        <div className="space-y-3">
          <Label>Uncontrolled TimePicker</Label>
          <TimePicker 
            placeholder="Select time"
            onChange={setUncontrolledTime}
          />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Selected: {uncontrolledTime ? `${uncontrolledTime.hours}:${String(uncontrolledTime.minutes).padStart(2, '0')}` : 'None'}
          </p>
        </div>

        {/* Controlled (24h format) */}
        <div className="space-y-3">
          <Label>Controlled TimePicker (24h format)</Label>
          <TimePicker 
            value={controlledTime}
            onChange={setControlledTime}
            format="24h"
            placeholder="Select time"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Value: {controlledTime ? `${String(controlledTime.hours).padStart(2, '0')}:${String(controlledTime.minutes).padStart(2, '0')}` : 'None'}
          </p>
        </div>

        {/* 12h format */}
        <div className="space-y-3">
          <Label>12-hour format with AM/PM</Label>
          <TimePicker 
            value={time12h}
            onChange={setTime12h}
            format="12h"
            placeholder="Select time"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            12h format automatically shows AM/PM toggle
          </p>
        </div>

        {/* With seconds */}
        <div className="space-y-3">
          <Label>With seconds precision</Label>
          <TimePicker 
            value={timeWithSeconds}
            onChange={setTimeWithSeconds}
            showSeconds={true}
            format="24h"
            placeholder="Select time"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Includes seconds wheel for precise time selection
          </p>
        </div>

        {/* Default value */}
        <div className="space-y-3">
          <Label>With default value</Label>
          <TimePicker 
            defaultValue={{ hours: 12, minutes: 0 }}
            format="12h"
            placeholder="Select time"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Starts with a pre-selected time value
          </p>
        </div>
      </div>
    </div>
  )
}
