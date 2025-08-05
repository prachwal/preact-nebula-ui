import { useState } from 'preact/hooks'
import { Slider } from '../../../../nebula/components/Slider'

export function AdvancedSection() {
  const [controlledValue, setControlledValue] = useState(50)
  const [tooltipValue, setTooltipValue] = useState(75)
  const [disabledValue] = useState(30)

  const formatTooltip = (value: number) => `${value}%`
  const formatCurrency = (value: number) => `$${value.toLocaleString()}`

  return (
    <div className="space-y-8">
      <h3 className="text-xl font-semibold">Advanced Features</h3>
      
      <div className="space-y-6">
        <div className="space-y-4">
          <h4 className="text-lg font-medium">Disabled State</h4>
          <div className="p-6 border border-gray-200 rounded-lg">
            <div className="w-64">
              <Slider
                value={disabledValue}
                disabled
                onChange={() => {}}
                aria-label="Disabled slider"
              />
            </div>
            <p className="mt-4 text-sm text-gray-600">
              This slider is disabled
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-medium">Custom Tooltip</h4>
          <div className="p-6 border border-gray-200 rounded-lg">
            <div className="w-64">
              <Slider
                value={tooltipValue}
                onChange={(val) => setTooltipValue(val)}
                tooltip={{
                  formatter: formatTooltip,
                  placement: 'top'
                }}
                aria-label="Slider with custom tooltip"
              />
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Hover to see formatted tooltip
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-medium">Currency Slider</h4>
          <div className="p-6 border border-gray-200 rounded-lg">
            <div className="w-64">
              <Slider
                value={25000}
                min={0}
                max={100000}
                step={1000}
                tooltip={{
                  formatter: formatCurrency,
                  placement: 'top'
                }}
                onChange={() => {}}
                aria-label="Currency slider"
              />
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Budget: $25,000
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-medium">Controlled vs Uncontrolled</h4>
          <div className="p-6 border border-gray-200 rounded-lg">
            <div className="space-y-6">
              <div className="w-64">
                <label className="block text-sm font-medium mb-2">
                  Controlled (React state)
                </label>
                <Slider
                  value={controlledValue}
                  onChange={(val) => setControlledValue(val)}
                  aria-label="Controlled slider"
                />
                <p className="mt-2 text-sm text-gray-600">
                  Value: {controlledValue}
                </p>
              </div>
              
              <div className="w-64">
                <label className="block text-sm font-medium mb-2">
                  Uncontrolled (default value)
                </label>
                <Slider
                  defaultValue={25}
                  onChange={(val) => console.log('Uncontrolled:', val)}
                  aria-label="Uncontrolled slider"
                />
                <p className="mt-2 text-sm text-gray-600">
                  Check console for values
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-medium">Input Integration</h4>
          <div className="p-6 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="flex-1 max-w-xs">
                <Slider
                  value={controlledValue}
                  onChange={(val) => setControlledValue(val)}
                  aria-label="Integrated slider"
                />
              </div>
              <input
                type="number"
                value={controlledValue}
                onChange={(e) => setControlledValue(parseInt(e.currentTarget.value) || 0)}
                className="w-20 px-3 py-2 border border-gray-300 rounded-md text-sm"
                min={0}
                max={100}
              />
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Slider and input are synchronized
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-medium">Custom Styling</h4>
          <div className="p-6 border border-gray-200 rounded-lg">
            <div className="w-64">
              <Slider
                value={60}
                className="custom-slider"
                trackClassName="bg-gradient-to-r from-blue-500 to-purple-500"
                thumbClassName="border-4 border-white shadow-lg"
                onChange={() => {}}
                aria-label="Custom styled slider"
              />
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Custom gradient track and styled thumb
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-medium">Validation & Error States</h4>
          <div className="p-6 border border-gray-200 rounded-lg">
            <div className="w-64">
              <Slider
                value={95}
                error={true}
                errorMessage="Value too high"
                onChange={() => {}}
                aria-label="Slider with error"
              />
            </div>
            <p className="mt-4 text-sm text-red-600">
              Error: Value exceeds recommended limit
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
