import {useState} from 'preact/hooks'
import {Switch} from '../../../../nebula/components/Switch'

export function InteractiveSection() {
  const [preferences, setPreferences] = useState({
    notifications: true,
    darkMode: false,
    autoSave: true,
    analytics: false,
    marketing: false
  })

  const [settings, setSettings] = useState({
    wifi: true,
    bluetooth: false,
    location: true,
    sync: false
  })

  const handlePreferenceChange = (key: string, value: boolean) => {
    setPreferences(prev => ({ ...prev, [key]: value }))
  }

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
          Interactive Examples
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          Real-world examples with dynamic state management
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Preferences Form */}
        <div class="space-y-4">
          <h4 class="font-medium text-gray-900 dark:text-gray-100">
            User Preferences
          </h4>
          <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div class="space-y-4">
              <Switch
                label="Email notifications"
                description="Receive updates and announcements"
                checked={preferences.notifications}
                onChange={(checked: boolean) => handlePreferenceChange('notifications', checked)}
              />
              
              <Switch
                label="Dark mode"
                description="Use dark theme across the application"
                checked={preferences.darkMode}
                onChange={(checked: boolean) => handlePreferenceChange('darkMode', checked)}
                color="secondary"
              />
              
              <Switch
                label="Auto-save documents"
                description="Automatically save changes every 30 seconds"
                checked={preferences.autoSave}
                onChange={(checked: boolean) => handlePreferenceChange('autoSave', checked)}
                color="success"
              />
              
              <Switch
                label="Analytics tracking"
                description="Help us improve by sharing usage data"
                checked={preferences.analytics}
                onChange={(checked: boolean) => handlePreferenceChange('analytics', checked)}
                color="warning"
              />
              
              <Switch
                label="Marketing emails"
                description="Receive promotional content and offers"
                checked={preferences.marketing}
                onChange={(checked: boolean) => handlePreferenceChange('marketing', checked)}
                color="error"
              />
            </div>
            
            <div class="mt-6 p-3 bg-gray-50 dark:bg-gray-700 rounded text-sm">
              <div class="font-medium mb-2 text-gray-900 dark:text-gray-100">Current Settings:</div>
              <div class="space-y-1 text-gray-600 dark:text-gray-400">
                <div>Notifications: {preferences.notifications ? 'Enabled' : 'Disabled'}</div>
                <div>Dark Mode: {preferences.darkMode ? 'On' : 'Off'}</div>
                <div>Auto-save: {preferences.autoSave ? 'On' : 'Off'}</div>
                <div>Analytics: {preferences.analytics ? 'Enabled' : 'Disabled'}</div>
                <div>Marketing: {preferences.marketing ? 'Subscribed' : 'Unsubscribed'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Device Settings */}
        <div class="space-y-4">
          <h4 class="font-medium text-gray-900 dark:text-gray-100">
            Device Settings
          </h4>
          <div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div class="space-y-4">
              <Switch
                label="WiFi"
                description="Connect to wireless networks"
                checked={settings.wifi}
                onChange={(checked: boolean) => handleSettingChange('wifi', checked)}
                size="lg"
                icons={{
                  checked: <span class="text-blue-600 text-xs">📶</span>,
                  unchecked: <span class="text-gray-400 text-xs">📵</span>
                }}
              />
              
              <Switch
                label="Bluetooth"
                description="Connect to nearby devices"
                checked={settings.bluetooth}
                onChange={(checked: boolean) => handleSettingChange('bluetooth', checked)}
                size="lg"
                icons={{
                  checked: <span class="text-blue-600 text-xs">🔵</span>,
                  unchecked: <span class="text-gray-400 text-xs">⚪</span>
                }}
              />
              
              <Switch
                label="Location Services"
                description="Allow apps to access your location"
                checked={settings.location}
                onChange={(checked: boolean) => handleSettingChange('location', checked)}
                size="lg"
                icons={{
                  checked: <span class="text-green-600 text-xs">📍</span>,
                  unchecked: <span class="text-gray-400 text-xs">📍</span>
                }}
              />
              
              <Switch
                label="Cloud Sync"
                description="Sync data across all your devices"
                checked={settings.sync}
                onChange={(checked: boolean) => handleSettingChange('sync', checked)}
                size="lg"
                icons={{
                  checked: <span class="text-green-600 text-xs">☁️</span>,
                  unchecked: <span class="text-gray-400 text-xs">☁️</span>
                }}
              />
            </div>
            
            <div class="mt-6 p-3 bg-gray-50 dark:bg-gray-700 rounded text-sm">
              <div class="font-medium mb-2 text-gray-900 dark:text-gray-100">Connection Status:</div>
              <div class="grid grid-cols-2 gap-2 text-gray-600 dark:text-gray-400">
                <div class="flex items-center gap-2">
                  <div class={`w-2 h-2 rounded-full ${settings.wifi ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  WiFi
                </div>
                <div class="flex items-center gap-2">
                  <div class={`w-2 h-2 rounded-full ${settings.bluetooth ? 'bg-blue-500' : 'bg-gray-400'}`}></div>
                  Bluetooth
                </div>
                <div class="flex items-center gap-2">
                  <div class={`w-2 h-2 rounded-full ${settings.location ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  Location
                </div>
                <div class="flex items-center gap-2">
                  <div class={`w-2 h-2 rounded-full ${settings.sync ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  Sync
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
