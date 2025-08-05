import { useState } from 'preact/hooks'
import { Slider } from '../../../../nebula/components/Slider'

export function RangeSection() {
  const [rangeValue, setRangeValue] = useState([20, 80])
  const [dualValue, setDualValue] = useState([30, 70])

  return (
    <div className="space-y-8">
      <h3 className="text-xl font-semibold">Range Sliders</h3>
      
      <div className="space-y-6">
        <div className="space-y-4">
          <h4 className="text-lg font-medium">Basic Range</h4>
          <div className="p-6 border border-gray-200 rounded-lg">
            <div className="w-64">
              <Slider
                range
                value={rangeValue}
                onChange={(val) => setRangeValue(val as [number, number])}
                aria-label="Range slider"
              />
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Range: {rangeValue[0]} - {rangeValue[1]}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-medium">Range with Steps</h4>
          <div className="p-6 border border-gray-200 rounded-lg">
            <div className="w-64">
              <Slider
                range
                value={[10, 90]}
                min={0}
                max={100}
                step={5}
                onChange={() => {}}
                aria-label="Range slider with steps"
              />
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Step: 5, Range: 10 - 90
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-medium">Constrained Range</h4>
          <div className="p-6 border border-gray-200 rounded-lg">
            <div className="w-64">
              <Slider
                range
                value={dualValue}
                min={0}
                max={100}
                minDistance={20}
                onChange={(val) => setDualValue(val as [number, number])}
                aria-label="Constrained range slider"
              />
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Min distance: 20, Range: {dualValue[0]} - {dualValue[1]}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-medium">Price Range Example</h4>
          <div className="p-6 border border-gray-200 rounded-lg">
            <div className="w-64">
              <label className="block text-sm font-medium mb-2">Price Range ($)</label>
              <Slider
                range
                value={[100, 500]}
                min={0}
                max={1000}
                step={50}
                onChange={() => {}}
                aria-label="Price range"
              />
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>$100</span>
                <span>$500</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
