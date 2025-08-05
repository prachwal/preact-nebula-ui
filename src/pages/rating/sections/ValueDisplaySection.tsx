import { useState } from 'preact/hooks'
import { Rating } from '../../../../nebula'

export function ValueDisplaySection() {
  const [value, setValue] = useState(3.5)

  const customFormatter = (value: number, max: number) => {
    const percentage = Math.round((value / max) * 100)
    return `${percentage}% (${value}/${max})`
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Value Display</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Show Value</label>
            <Rating 
              value={value} 
              onChange={setValue}
              allowHalf
              showValue
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Custom Value Formatter</label>
            <Rating 
              defaultValue={4}
              max={5}
              showValue
              valueFormatter={customFormatter}
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Different Max Values with Display</label>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Out of 3</p>
                <Rating defaultValue={2} max={3} showValue readOnly />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Out of 5</p>
                <Rating defaultValue={3.5} max={5} allowHalf showValue readOnly />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Out of 10</p>
                <Rating defaultValue={8} max={10} showValue readOnly />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
