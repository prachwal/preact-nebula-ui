import { SliderProps } from '../../../../nebula/components/Slider/types'

export function PropsDocumentation() {
  const propsList: Array<{
    name: keyof SliderProps
    type: string
    default?: string
    description: string
    required?: boolean
  }> = [
    {
      name: 'value',
      type: 'number | [number, number]',
      description: 'The current value(s) of the slider. For range sliders, provide an array.',
      required: false
    },
    {
      name: 'defaultValue',
      type: 'number | [number, number]',
      description: 'The default value(s) for uncontrolled sliders.',
      required: false
    },
    {
      name: 'onChange',
      type: '(value: number | [number, number]) => void',
      description: 'Callback fired when the value changes.',
      required: true
    },
    {
      name: 'min',
      type: 'number',
      default: '0',
      description: 'The minimum allowed value.'
    },
    {
      name: 'max',
      type: 'number',
      default: '100',
      description: 'The maximum allowed value.'
    },
    {
      name: 'step',
      type: 'number | null',
      default: '1',
      description: 'The step increment. Set to null to allow only marked values.'
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'The size of the slider.'
    },
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      default: "'horizontal'",
      description: 'The orientation of the slider.'
    },
    {
      name: 'range',
      type: 'boolean',
      default: 'false',
      description: 'Whether this is a range slider with two handles.'
    },
    {
      name: 'marks',
      type: 'number[] | { value: number; label: string }[]',
      description: 'Marks to display on the slider track.'
    },
    {
      name: 'minDistance',
      type: 'number',
      description: 'Minimum distance between handles in range mode.'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the slider is disabled.'
    },
    {
      name: 'tooltip',
      type: '{ formatter?: (value: number) => string; placement?: string }',
      description: 'Configuration for value tooltip display.'
    },
    {
      name: 'error',
      type: 'boolean',
      default: 'false',
      description: 'Whether the slider is in an error state.'
    },
    {
      name: 'errorMessage',
      type: 'string',
      description: 'Error message to display when error is true.'
    },
    {
      name: 'className',
      type: 'string',
      description: 'Additional CSS class names for the slider container.'
    },
    {
      name: 'trackClassName',
      type: 'string',
      description: 'Additional CSS class names for the track element.'
    },
    {
      name: 'thumbClassName',
      type: 'string',
      description: 'Additional CSS class names for the thumb element(s).'
    }
  ]

  return (
    <div className="space-y-8">
      <h3 className="text-xl font-semibold">Props Documentation</h3>
      
      <div className="space-y-6">
        <div className="space-y-4">
          <h4 className="text-lg font-medium">Slider Props</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Property
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Default
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {propsList.map((prop) => (
                  <tr key={prop.name}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <code className="text-sm font-mono text-blue-600">
                          {prop.name}
                        </code>
                        {prop.required && (
                          <span className="ml-1 text-red-500 text-xs">*</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <code className="text-sm font-mono text-gray-800 bg-gray-100 px-2 py-1 rounded">
                        {prop.type}
                      </code>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {prop.default ? (
                        <code className="bg-gray-100 px-2 py-1 rounded">
                          {prop.default}
                        </code>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {prop.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-medium">Accessibility</h4>
          <div className="p-6 border border-gray-200 rounded-lg bg-blue-50">
            <ul className="space-y-2 text-sm">
              <li>
                <strong>ARIA Labels:</strong> Use <code>aria-label</code> or <code>aria-labelledby</code> to provide accessible names
              </li>
              <li>
                <strong>Keyboard Navigation:</strong> Arrow keys to adjust values, Home/End for min/max
              </li>
              <li>
                <strong>Screen Reader:</strong> Current value and range are announced
              </li>
              <li>
                <strong>Focus Management:</strong> Visible focus indicators on thumb elements
              </li>
              <li>
                <strong>Role:</strong> Uses proper <code>slider</code> role for assistive technologies
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-medium">Usage Examples</h4>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h5 className="font-medium mb-2">Basic Usage</h5>
              <pre className="text-sm bg-white p-4 rounded border overflow-x-auto">
                <code>{`import { Slider } from '@nebula/components'

function VolumeControl() {
  const [volume, setVolume] = useState(50)

  return (
    <Slider
      value={volume}
      onChange={setVolume}
      aria-label="Volume"
    />
  )
}`}</code>
              </pre>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h5 className="font-medium mb-2">Range Slider</h5>
              <pre className="text-sm bg-white p-4 rounded border overflow-x-auto">
                <code>{`function PriceRange() {
  const [range, setRange] = useState([100, 500])

  return (
    <Slider
      range
      value={range}
      onChange={setRange}
      min={0}
      max={1000}
      step={10}
      aria-label="Price range"
    />
  )
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
