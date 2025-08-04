import {Switch} from '../../../../nebula/components/Switch'

export function VariantsSection() {
  return (
    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
          Variants & Sizes
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          Different sizes, colors, and configurations for various use cases
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Size Variants */}
        <div class="space-y-4">
          <h4 class="font-medium text-gray-900 dark:text-gray-100">
            Size Variants
          </h4>
          <div class="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div class="flex items-center gap-4">
              <Switch size="sm" label="Small" checked />
              <span class="text-sm text-gray-600 dark:text-gray-400">sm</span>
            </div>
            <div class="flex items-center gap-4">
              <Switch size="md" label="Medium" checked />
              <span class="text-sm text-gray-600 dark:text-gray-400">md (default)</span>
            </div>
            <div class="flex items-center gap-4">
              <Switch size="lg" label="Large" checked />
              <span class="text-sm text-gray-600 dark:text-gray-400">lg</span>
            </div>
          </div>
        </div>

        {/* Color Variants */}
        <div class="space-y-4">
          <h4 class="font-medium text-gray-900 dark:text-gray-100">
            Color Variants
          </h4>
          <div class="space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <Switch color="primary" label="Primary" checked />
            <Switch color="secondary" label="Secondary" checked />
            <Switch color="success" label="Success" checked />
            <Switch color="warning" label="Warning" checked />
            <Switch color="error" label="Error" checked />
          </div>
        </div>

        {/* Label Positioning */}
        <div class="space-y-4">
          <h4 class="font-medium text-gray-900 dark:text-gray-100">
            Label Positioning
          </h4>
          <div class="space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <Switch 
              label="Label on right (default)" 
              labelPosition="right" 
              checked 
            />
            <Switch 
              label="Label on left" 
              labelPosition="left" 
              checked 
            />
          </div>
        </div>

        {/* With Custom Icons */}
        <div class="space-y-4">
          <h4 class="font-medium text-gray-900 dark:text-gray-100">
            Custom Icons
          </h4>
          <div class="space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <Switch 
              label="Light/Dark mode"
              icons={{
                checked: <span class="text-yellow-600 text-xs">☀️</span>,
                unchecked: <span class="text-blue-600 text-xs">🌙</span>
              }}
            />
            <Switch 
              label="Volume control"
              icons={{
                checked: <span class="text-green-600 text-xs">🔊</span>,
                unchecked: <span class="text-gray-400 text-xs">🔇</span>
              }}
              checked
            />
            <Switch 
              label="WiFi connection"
              icons={{
                checked: <span class="text-blue-600 text-xs">📶</span>,
                unchecked: <span class="text-red-600 text-xs">📵</span>
              }}
            />
          </div>
        </div>

        {/* Error States */}
        <div class="space-y-4">
          <h4 class="font-medium text-gray-900 dark:text-gray-100">
            Error States
          </h4>
          <div class="space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <Switch 
              label="Required setting"
              error
              errorMessage="This setting must be enabled"
            />
            <Switch 
              label="Invalid configuration"
              error
              errorMessage="Please check your permissions"
              checked
            />
          </div>
        </div>

        {/* Disabled States */}
        <div class="space-y-4">
          <h4 class="font-medium text-gray-900 dark:text-gray-100">
            Disabled States
          </h4>
          <div class="space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <Switch 
              label="Disabled (off)"
              disabled
            />
            <Switch 
              label="Disabled (on)"
              disabled
              checked
            />
            <Switch 
              label="Admin only feature"
              description="Contact administrator to enable"
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  )
}
