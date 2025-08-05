import { useState } from 'preact/hooks'
import { Slider } from '../../../../nebula'

export function SizesSection() {
  const [smValue, setSmValue] = useState(25)
  const [mdValue, setMdValue] = useState(50)
  const [lgValue, setLgValue] = useState(75)

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Small (sm)
        </h3>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="space-y-4">
            <Slider 
              value={smValue}
              onChange={(val) => setSmValue(Array.isArray(val) ? val[0] : val)}
              size="sm"
              className="w-full"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Value: <span className="font-medium">{smValue}</span>
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Medium (md) - Default
        </h3>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="space-y-4">
            <Slider 
              value={mdValue}
              onChange={(val) => setMdValue(Array.isArray(val) ? val[0] : val)}
              size="md"
              className="w-full"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Value: <span className="font-medium">{mdValue}</span>
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Large (lg)
        </h3>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="space-y-4">
            <Slider 
              value={lgValue}
              onChange={(val) => setLgValue(Array.isArray(val) ? val[0] : val)}
              size="lg"
              className="w-full"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Value: <span className="font-medium">{lgValue}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-green-900 dark:text-green-100 mb-2">
          🎯 Size Guidelines
        </h4>
        <ul className="text-sm text-green-700 dark:text-green-200 space-y-1">
          <li>• <strong>Small (sm):</strong> Compact forms, tight layouts</li>
          <li>• <strong>Medium (md):</strong> Standard forms and controls</li>
          <li>• <strong>Large (lg):</strong> Prominent controls, touch interfaces</li>
        </ul>
      </div>
    </div>
  )
}
