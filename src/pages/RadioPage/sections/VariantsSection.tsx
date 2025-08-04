import { useState } from 'preact/hooks'
import { Radio, RadioGroup } from '../../../../nebula/components/Radio'

export function VariantsSection() {
  const [variantValue, setVariantValue] = useState<string>('default')
  const [orientationValue, setOrientationValue] = useState<string>('vertical')

  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Variants & Styles</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8">
          Explore different sizes, visual variants, and layout options for radio buttons.
        </p>

        <div class="space-y-12">
          {/* Sizes */}
          <div class="space-y-6">
            <h3 class="text-xl font-medium text-gray-900 dark:text-white">Sizes</h3>
            <p class="text-gray-600 dark:text-gray-300">
              Radio buttons are available in three sizes: small, medium (default), and large.
            </p>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div class="space-y-4">
                <h4 class="text-lg font-medium text-gray-900 dark:text-white">Small (sm)</h4>
                <div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <RadioGroup name="size-small" size="sm" label="Small Size Options">
                    <Radio value="small1" label="Small Option 1" description="Compact size for tight layouts" />
                    <Radio value="small2" label="Small Option 2" description="Perfect for sidebar content" />
                    <Radio value="small3" label="Small Option 3" description="Space-efficient design" />
                  </RadioGroup>
                </div>
              </div>

              <div class="space-y-4">
                <h4 class="text-lg font-medium text-gray-900 dark:text-white">Medium (md) - Default</h4>
                <div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <RadioGroup name="size-medium" size="md" label="Medium Size Options">
                    <Radio value="medium1" label="Medium Option 1" description="Standard size for most use cases" />
                    <Radio value="medium2" label="Medium Option 2" description="Balanced between size and usability" />
                    <Radio value="medium3" label="Medium Option 3" description="Recommended default size" />
                  </RadioGroup>
                </div>
              </div>

              <div class="space-y-4">
                <h4 class="text-lg font-medium text-gray-900 dark:text-white">Large (lg)</h4>
                <div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <RadioGroup name="size-large" size="lg" label="Large Size Options">
                    <Radio value="large1" label="Large Option 1" description="Prominent size for important selections" />
                    <Radio value="large2" label="Large Option 2" description="Great for touch interfaces" />
                    <Radio value="large3" label="Large Option 3" description="Enhanced accessibility" />
                  </RadioGroup>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Variants */}
          <div class="space-y-6">
            <h3 class="text-xl font-medium text-gray-900 dark:text-white">Visual Variants</h3>
            <p class="text-gray-600 dark:text-gray-300">
              Choose between default filled style and outlined style.
            </p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="space-y-4">
                <h4 class="text-lg font-medium text-gray-900 dark:text-white">Default Variant</h4>
                <div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <RadioGroup 
                    name="variant-default" 
                    variant="default"
                    label="Default Style"
                    value={variantValue}
                    onChange={setVariantValue}
                  >
                    <Radio value="default" label="Default Option" description="Filled background style" />
                    <Radio value="standard" label="Standard Choice" description="Classic radio button look" />
                    <Radio value="primary" label="Primary Selection" description="Most common variant" />
                  </RadioGroup>
                </div>
              </div>

              <div class="space-y-4">
                <h4 class="text-lg font-medium text-gray-900 dark:text-white">Outlined Variant</h4>
                <div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <RadioGroup 
                    name="variant-outlined" 
                    variant="outlined"
                    label="Outlined Style"
                    value={variantValue}
                    onChange={setVariantValue}
                  >
                    <Radio value="outlined" label="Outlined Option" description="Border-only style" />
                    <Radio value="minimal" label="Minimal Choice" description="Clean, subtle appearance" />
                    <Radio value="modern" label="Modern Selection" description="Contemporary design" />
                  </RadioGroup>
                </div>
              </div>
            </div>
          </div>

          {/* Orientation */}
          <div class="space-y-6">
            <h3 class="text-xl font-medium text-gray-900 dark:text-white">Orientation</h3>
            <p class="text-gray-600 dark:text-gray-300">
              Radio groups can be arranged vertically or horizontally.
            </p>
            
            <div class="space-y-8">
              <div class="space-y-4">
                <h4 class="text-lg font-medium text-gray-900 dark:text-white">Vertical Orientation (Default)</h4>
                <div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <RadioGroup 
                    name="orientation-vertical" 
                    orientation="vertical"
                    label="Choose your preference"
                    value={orientationValue}
                    onChange={setOrientationValue}
                  >
                    <Radio value="vertical" label="Vertical Layout" description="Stacked one below another" />
                    <Radio value="stacked" label="Stacked Items" description="Good for longer labels" />
                    <Radio value="column" label="Column Format" description="Default arrangement" />
                  </RadioGroup>
                </div>
              </div>

              <div class="space-y-4">
                <h4 class="text-lg font-medium text-gray-900 dark:text-white">Horizontal Orientation</h4>
                <div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <RadioGroup 
                    name="orientation-horizontal" 
                    orientation="horizontal"
                    label="Select your option"
                    value={orientationValue}
                    onChange={setOrientationValue}
                  >
                    <Radio value="horizontal" label="Horizontal" />
                    <Radio value="inline" label="Inline" />
                    <Radio value="row" label="Row Layout" />
                    <Radio value="side-by-side" label="Side by Side" />
                  </RadioGroup>
                </div>
              </div>
            </div>
          </div>

          {/* Spacing */}
          <div class="space-y-6">
            <h3 class="text-xl font-medium text-gray-900 dark:text-white">Spacing</h3>
            <p class="text-gray-600 dark:text-gray-300">
              Control the spacing between radio buttons in a group.
            </p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { spacing: 'xs' as const, label: 'Extra Small', description: 'Tight spacing' },
                { spacing: 'sm' as const, label: 'Small', description: 'Compact layout' },
                { spacing: 'md' as const, label: 'Medium', description: 'Default spacing' },
                { spacing: 'lg' as const, label: 'Large', description: 'Generous spacing' }
              ].map(({ spacing, label, description }) => (
                <div key={spacing} class="space-y-4">
                  <h4 class="text-md font-medium text-gray-900 dark:text-white">{label} ({spacing})</h4>
                  <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <RadioGroup name={`spacing-${spacing}`} spacing={spacing} label={description}>
                      <Radio value="option1" label="Option 1" />
                      <Radio value="option2" label="Option 2" />
                      <Radio value="option3" label="Option 3" />
                    </RadioGroup>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Label Position */}
          <div class="space-y-6">
            <h3 class="text-xl font-medium text-gray-900 dark:text-white">Label Position</h3>
            <p class="text-gray-600 dark:text-gray-300">
              Position labels on the left or right side of radio buttons.
            </p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="space-y-4">
                <h4 class="text-lg font-medium text-gray-900 dark:text-white">Right Position (Default)</h4>
                <div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <RadioGroup name="label-right" label="Right-aligned labels">
                    <Radio value="right1" label="Label on right" labelPosition="right" />
                    <Radio value="right2" label="Standard position" labelPosition="right" />
                    <Radio value="right3" label="Default alignment" labelPosition="right" />
                  </RadioGroup>
                </div>
              </div>

              <div class="space-y-4">
                <h4 class="text-lg font-medium text-gray-900 dark:text-white">Left Position</h4>
                <div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <RadioGroup name="label-left" label="Left-aligned labels">
                    <Radio value="left1" label="Label on left" labelPosition="left" />
                    <Radio value="left2" label="Reversed layout" labelPosition="left" />
                    <Radio value="left3" label="Alternative style" labelPosition="left" />
                  </RadioGroup>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
