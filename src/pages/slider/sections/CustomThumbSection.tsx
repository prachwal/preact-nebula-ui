import { useState } from 'preact/hooks'
import { Slider } from '../../../../nebula'

export function CustomThumbSection() {
  const [basicValue, setBasicValue] = useState(40)
  const [iconValue, setIconValue] = useState(60)
  const [textValue, setTextValue] = useState(30)
  const [rangeValue, setRangeValue] = useState<[number, number]>([25, 75])

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Default Thumb
        </h3>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="space-y-4">
            <Slider 
              value={basicValue}
              onChange={(val) => setBasicValue(Array.isArray(val) ? val[0] : val)}
              className="w-full"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Standard solid circle thumb: <span className="font-medium">{basicValue}</span>
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Icon Thumb
        </h3>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="space-y-4">
            <Slider 
              value={iconValue}
              onChange={(val) => setIconValue(Array.isArray(val) ? val[0] : val)}
              thumb={{
                content: (
                  <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )
              }}
              className="w-full"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Custom icon (checkmark): <span className="font-medium">{iconValue}</span>
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Text Thumb
        </h3>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="space-y-4">
            <Slider 
              value={textValue}
              onChange={(val) => setTextValue(Array.isArray(val) ? val[0] : val)}
              thumb={{
                content: (
                  <span className="text-xs font-bold text-blue-600">
                    {textValue}
                  </span>
                )
              }}
              size="lg"
              className="w-full"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Text showing current value: <span className="font-medium">{textValue}</span>
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Custom Range Thumbs
        </h3>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="space-y-4">
            <Slider 
              value={rangeValue}
              onChange={(val) => setRangeValue(Array.isArray(val) ? val : [val, val])}
              thumb={{
                content: (
                  <div className="w-3 h-3 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full shadow-lg" />
                )
              }}
              className="w-full"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Gradient thumbs: <span className="font-medium">{rangeValue[0]} - {rangeValue[1]}</span>
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Emoji Thumbs
        </h3>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="space-y-4">
            <Slider 
              value={iconValue}
              onChange={(val) => setIconValue(Array.isArray(val) ? val[0] : val)}
              thumb={{
                content: <span className="text-lg">🎵</span>
              }}
              min={0}
              max={100}
              marks={[
                { value: 0, label: '🔇' },
                { value: 25, label: '🔈' },
                { value: 50, label: '🔉' },
                { value: 75, label: '🔊' },
                { value: 100, label: '📢' }
              ]}
              size="lg"
              className="w-full"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Volume with emoji: <span className="font-medium">{iconValue}%</span>
            </p>
          </div>
        </div>
      </div>

      <div className="bg-violet-50 dark:bg-violet-900/20 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-violet-900 dark:text-violet-100 mb-2">
          🎨 Custom Thumb Options
        </h4>
        <ul className="text-sm text-violet-700 dark:text-violet-200 space-y-1">
          <li>• <strong>content:</strong> Any string, number, or JSX element</li>
          <li>• <strong>className:</strong> Additional CSS classes for thumb container</li>
          <li>• Works with all slider modes (single, range, sizes, orientations)</li>
          <li>• Maintains accessibility and keyboard navigation</li>
        </ul>
      </div>
    </div>
  )
}
