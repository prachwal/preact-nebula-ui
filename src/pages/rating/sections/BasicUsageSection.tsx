import { useState } from 'preact/hooks'
import { Rating } from '../../../../nebula'

export function BasicUsageSection() {
  const [controlledValue, setControlledValue] = useState(4)

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Uncontrolled Rating</h3>
        <div className="space-y-4">
          <div>
            <Rating defaultValue={3} />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Default value of 3 stars</p>
          </div>
          <div>
            <Rating />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">No default value (starts at 0)</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Controlled Rating</h3>
        <div className="space-y-4">
          <div>
            <Rating 
              value={controlledValue} 
              onChange={setControlledValue}
            />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Current value: {controlledValue}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Different Max Values</h3>
        <div className="space-y-4">
          <div>
            <Rating max={3} defaultValue={2} />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">3-star rating</p>
          </div>
          <div>
            <Rating max={10} defaultValue={7} />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">10-star rating</p>
          </div>
        </div>
      </div>
    </div>
  )
}
