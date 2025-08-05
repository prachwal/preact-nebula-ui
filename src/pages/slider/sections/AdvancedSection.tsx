import { useState } from 'preact/hooks'
import { Slider } from '../../../../nebula'

export function AdvancedSection() {
  const [tooltipValue, setTooltipValue] = useState(35)
  const [errorValue, setErrorValue] = useState(85)
  const [customStepValue, setCustomStepValue] = useState(33)
  const [precisionValue, setPrecisionValue] = useState(2.5)

  const customMarks = [
    { value: 0, label: 'Off' },
    { value: 33, label: 'Low' },
    { value: 66, label: 'Medium' },
    { value: 100, label: 'High' }
  ]

  const precisionMarks = [
    { value: 0, label: '0.0' },
    { value: 2.5, label: '2.5' },
    { value: 5.0, label: '5.0' },
    { value: 7.5, label: '7.5' },
    { value: 10.0, label: '10.0' }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          With Tooltips
        </h3>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="space-y-4">
            <Slider 
              value={tooltipValue}
              onChange={(val) => setTooltipValue(Array.isArray(val) ? val[0] : val)}
              tooltip={{ 
                formatter: (value) => `${value}%` 
              }}
              className="w-full"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Value with tooltip: <span className="font-medium">{tooltipValue}%</span>
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Error State
        </h3>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="space-y-4">
            <Slider 
              value={errorValue}
              onChange={(val) => setErrorValue(Array.isArray(val) ? val[0] : val)}
              error={errorValue > 80}
              className="w-full"
            />
            <p className="text-sm text-red-600 dark:text-red-400">
              {errorValue > 80 ? '⚠ Value too high! Maximum recommended: 80' : '✓ Value is within acceptable range'}
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Custom Step Values
        </h3>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="space-y-4">
            <Slider 
              value={customStepValue}
              onChange={(val) => setCustomStepValue(Array.isArray(val) ? val[0] : val)}
              marks={customMarks}
              step={33}
              className="w-full"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Custom step (33): <span className="font-medium">{customStepValue}</span>
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Decimal Precision
        </h3>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="space-y-4">
            <Slider 
              value={precisionValue}
              onChange={(val) => setPrecisionValue(Array.isArray(val) ? val[0] : val)}
              min={0}
              max={10}
              step={0.1}
              marks={precisionMarks}
              tooltip={{ 
                formatter: (value) => `${value.toFixed(1)}` 
              }}
              className="w-full"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Precise value: <span className="font-medium">{precisionValue.toFixed(1)}</span>
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Complex Example
        </h3>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Volume Level
              </label>
              <Slider 
                value={tooltipValue}
                onChange={(val) => setTooltipValue(Array.isArray(val) ? val[0] : val)}
                marks={[
                  { value: 0, label: '🔇' },
                  { value: 25, label: '🔈' },
                  { value: 50, label: '🔉' },
                  { value: 75, label: '🔊' },
                  { value: 100, label: '📢' }
                ]}
                tooltip={{ 
                  formatter: (value) => `${value}% Volume` 
                }}
                size="lg"
                className="w-full"
              />
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>Current: {tooltipValue}%</span>
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                {tooltipValue === 0 ? 'Muted' :
                 tooltipValue < 25 ? 'Quiet' :
                 tooltipValue < 50 ? 'Normal' :
                 tooltipValue < 75 ? 'Loud' : 'Very Loud'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-amber-900 dark:text-amber-100 mb-2">
          🚀 Advanced Features
        </h4>
        <ul className="text-sm text-amber-700 dark:text-amber-200 space-y-1">
          <li>• <strong>Tooltips:</strong> Show values on hover with custom formatting</li>
          <li>• <strong>Error states:</strong> Visual feedback for invalid ranges</li>
          <li>• <strong>Custom steps:</strong> Non-standard increments for specific use cases</li>
          <li>• <strong>Decimal precision:</strong> Fine-grained control with floating point values</li>
        </ul>
      </div>
    </div>
  )
}
