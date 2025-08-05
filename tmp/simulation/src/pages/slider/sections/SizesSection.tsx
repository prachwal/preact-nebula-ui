import { useState } from 'preact/hooks'
import { Slider } from '../../../../nebula/components/Slider'

export function SizesSection() {
  const [smallValue, setSmallValue] = useState(30)
  const [mediumValue, setMediumValue] = useState(50)
  const [largeValue, setLargeValue] = useState(70)

  return (
    <div className="space-y-8">
      <h3 className="text-xl font-semibold">Sizes</h3>
      
      <div className="space-y-6">
        <div className="space-y-4">
          <h4 className="text-lg font-medium">Small Size</h4>
          <div className="p-6 border border-gray-200 rounded-lg">
            <div className="w-64">
              <Slider
                size="sm"
                value={smallValue}
                onChange={(val) => setSmallValue(val)}
                aria-label="Small slider"
              />
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Value: {smallValue}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-medium">Medium Size (Default)</h4>
          <div className="p-6 border border-gray-200 rounded-lg">
            <div className="w-64">
              <Slider
                size="md"
                value={mediumValue}
                onChange={(val) => setMediumValue(val)}
                aria-label="Medium slider"
              />
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Value: {mediumValue}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-medium">Large Size</h4>
          <div className="p-6 border border-gray-200 rounded-lg">
            <div className="w-64">
              <Slider
                size="lg"
                value={largeValue}
                onChange={(val) => setLargeValue(val)}
                aria-label="Large slider"
              />
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Value: {largeValue}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-medium">Size Comparison</h4>
          <div className="p-6 border border-gray-200 rounded-lg">
            <div className="space-y-6">
              <div className="w-64">
                <label className="block text-sm font-medium mb-2">Small</label>
                <Slider size="sm" value={25} onChange={() => {}} />
              </div>
              <div className="w-64">
                <label className="block text-sm font-medium mb-2">Medium</label>
                <Slider size="md" value={50} onChange={() => {}} />
              </div>
              <div className="w-64">
                <label className="block text-sm font-medium mb-2">Large</label>
                <Slider size="lg" value={75} onChange={() => {}} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
