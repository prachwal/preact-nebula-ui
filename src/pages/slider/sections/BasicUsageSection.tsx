import { useState } from 'preact/hooks'
import { Slider } from '../../../../nebula'

export function BasicUsageSection() {
  const [value, setValue] = useState(25)
  const [step5Value, setStep5Value] = useState(10)
  const [disabledValue] = useState(40)

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Default Slider
        </h3>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="space-y-4">
            <Slider 
              value={value}
              onChange={(val) => setValue(Array.isArray(val) ? val[0] : val)}
              className="w-full"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Current value: <span className="font-medium">{value}</span>
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          With Custom Step
        </h3>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="space-y-4">
            <Slider 
              value={step5Value}
              onChange={(val) => setStep5Value(Array.isArray(val) ? val[0] : val)}
              min={0}
              max={50}
              step={5}
              className="w-full"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Current value: <span className="font-medium">{step5Value}</span> (step: 5)
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Disabled State
        </h3>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="space-y-4">
            <Slider 
              value={disabledValue}
              disabled
              className="w-full"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Disabled slider with value: <span className="font-medium">{disabledValue}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
          💡 Usage Tips
        </h4>
        <ul className="text-sm text-blue-700 dark:text-blue-200 space-y-1">
          <li>• Use controlled state for form integration</li>
          <li>• Set appropriate min/max/step values for your use case</li>
          <li>• Always provide accessible labels</li>
        </ul>
      </div>
    </div>
  )
}
