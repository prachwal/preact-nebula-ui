import { useState } from 'preact/hooks'
import { Slider } from '../../../../nebula/components/Slider'

export function BasicUsageSection() {
  const [value, setValue] = useState(50)

  return (
    <div className="space-y-8">
      <h3 className="text-xl font-semibold">Basic Usage</h3>
      
      <div className="space-y-6">
        <div className="space-y-4">
          <h4 className="text-lg font-medium">Default Slider</h4>
          <div className="p-6 border border-gray-200 rounded-lg">
            <div className="w-64">
              <Slider
                value={value}
                onChange={(val) => setValue(val)}
                aria-label="Basic slider"
              />
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Current value: {value}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-medium">With Min/Max Values</h4>
          <div className="p-6 border border-gray-200 rounded-lg">
            <div className="w-64">
              <Slider
                value={25}
                min={0}
                max={100}
                onChange={() => {}}
                aria-label="Slider with min/max"
              />
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Range: 0 to 100, Value: 25
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-medium">With Step</h4>
          <div className="p-6 border border-gray-200 rounded-lg">
            <div className="w-64">
              <Slider
                value={20}
                min={0}
                max={100}
                step={10}
                onChange={() => {}}
                aria-label="Slider with step"
              />
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Step: 10, Value: 20
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
