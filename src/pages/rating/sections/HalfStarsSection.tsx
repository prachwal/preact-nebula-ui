import { useState } from 'preact/hooks'
import { Rating } from '../../../../nebula'

export function HalfStarsSection() {
  const [halfStarValue, setHalfStarValue] = useState(3.5)

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Half Star Support</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Allow Half Stars</label>
            <Rating 
              allowHalf 
              value={halfStarValue} 
              onChange={setHalfStarValue}
            />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Value: {halfStarValue}</p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Preset Half Values</label>
            <div className="space-y-2">
              <Rating allowHalf defaultValue={0.5} readOnly />
              <Rating allowHalf defaultValue={1.5} readOnly />
              <Rating allowHalf defaultValue={2.5} readOnly />
              <Rating allowHalf defaultValue={3.5} readOnly />
              <Rating allowHalf defaultValue={4.5} readOnly />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
