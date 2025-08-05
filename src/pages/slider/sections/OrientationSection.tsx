import { useState } from 'preact/hooks'
import { Slider } from '../../../../nebula'

export function OrientationSection() {
  const [horizontalValue, setHorizontalValue] = useState(40)
  const [verticalValue, setVerticalValue] = useState(60)
  const [verticalRangeValue, setVerticalRangeValue] = useState<[number, number]>([30, 70])

  const marks = [
    { value: 0, label: '0' },
    { value: 25, label: '25' },
    { value: 50, label: '50' },
    { value: 75, label: '75' },
    { value: 100, label: '100' }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Horizontal (Default)
        </h3>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="space-y-4">
            <Slider 
              value={horizontalValue}
              onChange={(val) => setHorizontalValue(Array.isArray(val) ? val[0] : val)}
              orientation="horizontal"
              className="w-full"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Horizontal value: <span className="font-medium">{horizontalValue}</span>
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Vertical
        </h3>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-8">
            <div className="flex flex-col items-center">
              <Slider 
                value={verticalValue}
                onChange={(val) => setVerticalValue(Array.isArray(val) ? val[0] : val)}
                orientation="vertical"
                className="h-48"
              />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                Value: <span className="font-medium">{verticalValue}</span>
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <Slider 
                value={verticalRangeValue}
                onChange={(val) => setVerticalRangeValue(Array.isArray(val) ? val : [val, val])}
                orientation="vertical"
                className="h-48"
              />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                Range: <span className="font-medium">{verticalRangeValue[0]} - {verticalRangeValue[1]}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Vertical with Marks
        </h3>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-8">
            <div className="flex flex-col items-center">
              <Slider 
                value={verticalValue}
                onChange={(val) => setVerticalValue(Array.isArray(val) ? val[0] : val)}
                orientation="vertical"
                marks={marks}
                size="lg"
                className="h-64"
              />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                Large vertical with marks: <span className="font-medium">{verticalValue}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Size Comparison
        </h3>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-start space-x-8">
            <div className="flex flex-col items-center">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Small</label>
              <Slider 
                value={50}
                orientation="vertical"
                size="sm"
                className="h-32"
                disabled
              />
            </div>
            
            <div className="flex flex-col items-center">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Medium</label>
              <Slider 
                value={50}
                orientation="vertical"
                size="md"
                className="h-32"
                disabled
              />
            </div>
            
            <div className="flex flex-col items-center">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Large</label>
              <Slider 
                value={50}
                orientation="vertical"
                size="lg"
                className="h-32"
                disabled
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-indigo-900 dark:text-indigo-100 mb-2">
          🔄 Orientation Guidelines
        </h4>
        <ul className="text-sm text-indigo-700 dark:text-indigo-200 space-y-1">
          <li>• <strong>Horizontal:</strong> Default choice, works well in forms</li>
          <li>• <strong>Vertical:</strong> Great for volume controls, side panels</li>
          <li>• Set appropriate height for vertical sliders (h-32, h-48, etc.)</li>
          <li>• Both orientations support all features (range, marks, sizes)</li>
        </ul>
      </div>
    </div>
  )
}
