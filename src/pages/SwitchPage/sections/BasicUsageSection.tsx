import {useState} from 'preact/hooks'
import {Switch} from '../../../../nebula/components/Switch'

export function BasicUsageSection() {
  const [isEnabled, setIsEnabled] = useState(false)
  const [notifications, setNotifications] = useState(true)

  return (
    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
          Basic Usage
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          Simple switches for binary settings and toggles
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Switch */}
        <div class="space-y-4">
          <h4 class="font-medium text-gray-900 dark:text-gray-100">
            Simple Switch
          </h4>
          <div class="space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <Switch />
            <Switch checked />
            <Switch disabled />
            <Switch checked disabled />
          </div>
        </div>

        {/* With Labels */}
        <div class="space-y-4">
          <h4 class="font-medium text-gray-900 dark:text-gray-100">
            With Labels
          </h4>
          <div class="space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <Switch label="Enable feature" />
            <Switch label="Dark mode" checked />
            <Switch label="Disabled option" disabled />
          </div>
        </div>

        {/* Controlled Examples */}
        <div class="space-y-4">
          <h4 class="font-medium text-gray-900 dark:text-gray-100">
            Controlled State
          </h4>
          <div class="space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <Switch 
              label="Enable notifications"
              checked={notifications}
              onChange={(checked: boolean) => setNotifications(checked)}
            />
            <Switch 
              label="System enabled"
              checked={isEnabled}
              onChange={(checked: boolean) => setIsEnabled(checked)}
            />
            <div class="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Notifications: {notifications ? 'On' : 'Off'} | 
              System: {isEnabled ? 'Enabled' : 'Disabled'}
            </div>
          </div>
        </div>

        {/* With Descriptions */}
        <div class="space-y-4">
          <h4 class="font-medium text-gray-900 dark:text-gray-100">
            With Descriptions
          </h4>
          <div class="space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <Switch 
              label="Email notifications"
              description="Receive updates via email"
            />
            <Switch 
              label="Two-factor authentication"
              description="Add an extra layer of security"
              checked
            />
            <Switch 
              label="Analytics tracking"
              description="Help us improve the experience"
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  )
}
