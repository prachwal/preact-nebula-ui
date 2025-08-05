import { useState } from 'preact/hooks'
import { Slider } from '../../../../nebula/components/Slider'

export function OrientationSection() {
  const [horizontalValue, setHorizontalValue] = useState(40)
  const [verticalValue, setVerticalValue] = useState(60)
  const [verticalRangeValue, setVerticalRangeValue] = useState([25, 75])

  return (
    <div className="space-y-8">
      <h3 className="text-xl font-semibold">Orientation</h3>
      
      <div className="space-y-6">
        <div className="space-y-4">
          <h4 className="text-lg font-medium">Horizontal (Default)</h4>
          <div className="p-6 border border-gray-200 rounded-lg">
            <div className="w-64">
              <Slider
                value={horizontalValue}
                onChange={(val) => setHorizontalValue(val)}
                aria-label="Horizontal slider"
              />
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Value: {horizontalValue}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-medium">Vertical</h4>
          <div className="p-6 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-8">
              <div className="h-48">
                <Slider
                  orientation="vertical"
                  value={verticalValue}
                  onChange={(val) => setVerticalValue(val)}
                  aria-label="Vertical slider"
                />
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  Value: {verticalValue}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-medium">Vertical with Marks</h4>
          <div className="p-6 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-8">
              <div className="h-48">
                <Slider
                  orientation="vertical"
                  value={80}
                  marks={[0, 25, 50, 75, 100]}
                  onChange={() => {}}
                  aria-label="Vertical slider with marks"
                />
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  Volume: 80%
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-medium">Vertical Range</h4>
          <div className="p-6 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-8">
              <div className="h-48">
                <Slider
                  orientation="vertical"
                  range
                  value={verticalRangeValue}
                  onChange={(val) => setVerticalRangeValue(val as [number, number])}
                  aria-label="Vertical range slider"
                />
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  Range: {verticalRangeValue[0]} - {verticalRangeValue[1]}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-medium">Multiple Vertical Sliders</h4>
          <div className="p-6 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-8">
              <div className="flex space-x-6">
                <div className="text-center">
                  <div className="h-32 mb-2">
                    <Slider
                      orientation="vertical"
                      value={30}
                      size="sm"
                      onChange={() => {}}
                      aria-label="Bass"
                    />
                  </div>
                  <label className="text-xs text-gray-600">Bass</label>
                </div>
                <div className="text-center">
                  <div className="h-32 mb-2">
                    <Slider
                      orientation="vertical"
                      value={70}
                      size="sm"
                      onChange={() => {}}
                      aria-label="Mid"
                    />
                  </div>
                  <label className="text-xs text-gray-600">Mid</label>
                </div>
                <div className="text-center">
                  <div className="h-32 mb-2">
                    <Slider
                      orientation="vertical"
                      value={50}
                      size="sm"
                      onChange={() => {}}
                      aria-label="Treble"
                    />
                  </div>
                  <label className="text-xs text-gray-600">Treble</label>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  EQ Controls
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
