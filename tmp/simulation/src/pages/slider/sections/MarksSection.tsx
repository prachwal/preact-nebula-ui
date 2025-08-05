import { useState } from 'preact/hooks'
import { Slider } from '../../../../nebula/components/Slider'

export function MarksSection() {
  const [markedValue, setMarkedValue] = useState(50)
  const [customValue, setCustomValue] = useState(3)

  const marks = [
    { value: 0, label: '0°C' },
    { value: 20, label: '20°C' },
    { value: 37, label: '37°C' },
    { value: 100, label: '100°C' }
  ]

  const ratingMarks = [
    { value: 1, label: '😞' },
    { value: 2, label: '😐' },
    { value: 3, label: '🙂' },
    { value: 4, label: '😊' },
    { value: 5, label: '😍' }
  ]

  return (
    <div className="space-y-8">
      <h3 className="text-xl font-semibold">Marks & Labels</h3>
      
      <div className="space-y-6">
        <div className="space-y-4">
          <h4 className="text-lg font-medium">Simple Marks</h4>
          <div className="p-6 border border-gray-200 rounded-lg">
            <div className="w-80">
              <Slider
                value={markedValue}
                onChange={(val) => setMarkedValue(val)}
                marks={[0, 25, 50, 75, 100]}
                aria-label="Slider with simple marks"
              />
            </div>
            <p className="mt-6 text-sm text-gray-600">
              Value: {markedValue}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-medium">Custom Label Marks</h4>
          <div className="p-6 border border-gray-200 rounded-lg">
            <div className="w-80">
              <Slider
                value={37}
                min={0}
                max={100}
                marks={marks}
                onChange={() => {}}
                aria-label="Temperature slider"
              />
            </div>
            <p className="mt-6 text-sm text-gray-600">
              Temperature: 37°C (Body temperature)
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-medium">Rating with Emoji Marks</h4>
          <div className="p-6 border border-gray-200 rounded-lg">
            <div className="w-80">
              <Slider
                value={customValue}
                min={1}
                max={5}
                step={1}
                marks={ratingMarks}
                onChange={(val) => setCustomValue(val)}
                aria-label="Rating slider"
              />
            </div>
            <p className="mt-6 text-sm text-gray-600">
              Rating: {customValue}/5
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-medium">Marks Only (Restricted Values)</h4>
          <div className="p-6 border border-gray-200 rounded-lg">
            <div className="w-80">
              <Slider
                value={50}
                marks={[
                  { value: 0, label: 'Low' },
                  { value: 50, label: 'Medium' },
                  { value: 100, label: 'High' }
                ]}
                step={null}
                onChange={() => {}}
                aria-label="Restricted value slider"
              />
            </div>
            <p className="mt-6 text-sm text-gray-600">
              Only marked values are selectable
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-medium">Range with Marks</h4>
          <div className="p-6 border border-gray-200 rounded-lg">
            <div className="w-80">
              <Slider
                range
                value={[20, 80]}
                marks={[0, 20, 40, 60, 80, 100]}
                onChange={() => {}}
                aria-label="Range slider with marks"
              />
            </div>
            <p className="mt-6 text-sm text-gray-600">
              Range with visible marks
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
