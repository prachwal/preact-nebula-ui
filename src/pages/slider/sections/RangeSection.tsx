import { useState } from 'preact/hooks'
import { Slider } from '../../../../nebula'

export function RangeSection() {
  const [range, setRange] = useState<[number, number]>([20, 80])
  const [customRange, setCustomRange] = useState<[number, number]>([10, 40])
  const [stepRange, setStepRange] = useState<[number, number]>([10, 30])

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Basic Range
        </h3>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="space-y-4">
            <Slider 
              value={range}
              onChange={(val) => setRange(Array.isArray(val) ? val : [val, val])}
              className="w-full"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Range: <span className="font-medium">{range[0]} - {range[1]}</span>
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Custom Range (0-50)
        </h3>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="space-y-4">
            <Slider 
              value={customRange}
              onChange={(val) => setCustomRange(Array.isArray(val) ? val : [val, val])}
              min={0}
              max={50}
              className="w-full"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Range: <span className="font-medium">{customRange[0]} - {customRange[1]}</span>
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Range with Step
        </h3>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="space-y-4">
            <Slider 
              value={stepRange}
              onChange={(val) => setStepRange(Array.isArray(val) ? val : [val, val])}
              min={0}
              max={50}
              step={5}
              className="w-full"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Range: <span className="font-medium">{stepRange[0]} - {stepRange[1]}</span> (step: 5)
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Large Range Slider
        </h3>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="space-y-4">
            <Slider 
              value={range}
              onChange={(val) => setRange(Array.isArray(val) ? val : [val, val])}
              size="lg"
              className="w-full"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Large range: <span className="font-medium">{range[0]} - {range[1]}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-purple-900 dark:text-purple-100 mb-2">
          📊 Range Mode Benefits
        </h4>
        <ul className="text-sm text-purple-700 dark:text-purple-200 space-y-1">
          <li>• Perfect for price ranges, date ranges, or value intervals</li>
          <li>• Both handles can be moved independently</li>
          <li>• Handles can't cross each other (min ≤ max)</li>
          <li>• Supports all standard slider props (step, marks, etc.)</li>
        </ul>
      </div>
    </div>
  )
}
