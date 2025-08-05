import { useState } from 'preact/hooks'
import { Slider } from '../../../../nebula'

export function MarksSection() {
  const [basicMarksValue, setBasicMarksValue] = useState(50)
  const [customMarksValue, setCustomMarksValue] = useState(30)
  const [rangeMarksValue, setRangeMarksValue] = useState<[number, number]>([20, 80])

  const basicMarks = [
    { value: 0, label: '0' },
    { value: 25, label: '25' },
    { value: 50, label: '50' },
    { value: 75, label: '75' },
    { value: 100, label: '100' }
  ]

  const customMarks = [
    { value: 0, label: 'Min' },
    { value: 10, label: 'Low' },
    { value: 30, label: 'Medium' },
    { value: 60, label: 'High' },
    { value: 100, label: 'Max' }
  ]

  const temperatureMarks = [
    { value: 0, label: '0°C' },
    { value: 20, label: '20°C' },
    { value: 37, label: 'Body' },
    { value: 60, label: '60°C' },
    { value: 100, label: 'Boiling' }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Basic Marks
        </h3>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="space-y-4">
            <Slider 
              value={basicMarksValue}
              onChange={(val) => setBasicMarksValue(Array.isArray(val) ? val[0] : val)}
              marks={basicMarks}
              className="w-full"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Value: <span className="font-medium">{basicMarksValue}</span>
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Custom Labels
        </h3>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="space-y-4">
            <Slider 
              value={customMarksValue}
              onChange={(val) => setCustomMarksValue(Array.isArray(val) ? val[0] : val)}
              marks={customMarks}
              className="w-full"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Level: <span className="font-medium">{customMarksValue}</span>
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Temperature Scale
        </h3>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="space-y-4">
            <Slider 
              value={customMarksValue}
              onChange={(val) => setCustomMarksValue(Array.isArray(val) ? val[0] : val)}
              marks={temperatureMarks}
              className="w-full"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Temperature: <span className="font-medium">{customMarksValue}°C</span>
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Range with Marks
        </h3>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="space-y-4">
            <Slider 
              value={rangeMarksValue}
              onChange={(val) => setRangeMarksValue(Array.isArray(val) ? val : [val, val])}
              marks={basicMarks}
              className="w-full"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Range: <span className="font-medium">{rangeMarksValue[0]} - {rangeMarksValue[1]}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-orange-900 dark:text-orange-100 mb-2">
          🎯 Marks Best Practices
        </h4>
        <ul className="text-sm text-orange-700 dark:text-orange-200 space-y-1">
          <li>• Use marks to show important values or breakpoints</li>
          <li>• Keep labels short and meaningful</li>
          <li>• Consider spacing - too many marks can look cluttered</li>
          <li>• Marks automatically snap values when clicked</li>
        </ul>
      </div>
    </div>
  )
}
