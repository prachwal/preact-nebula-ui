import { Label, Input } from '@/components'

export function SizingSection() {
  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Label Size Variants</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8">
          Different label sizes to match your form hierarchy and design system.
        </p>

        <div class="space-y-8">
          {/* Size Comparison */}
          <div class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Small Labels</h3>
                <div class="space-y-3">
                  <div>
                    <Label className="text-sm">Small Label</Label>
                    <Input size="sm" placeholder="Small input" className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-sm" required>Required Small</Label>
                    <Input size="sm" placeholder="Small required" className="mt-1" />
                  </div>
                </div>
              </div>

              <div>
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Medium Labels (Default)</h3>
                <div class="space-y-3">
                  <div>
                    <Label>Medium Label</Label>
                    <Input placeholder="Medium input" className="mt-1" />
                  </div>
                  <div>
                    <Label required>Required Medium</Label>
                    <Input placeholder="Medium required" className="mt-1" />
                  </div>
                </div>
              </div>

              <div>
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Large Labels</h3>
                <div class="space-y-3">
                  <div>
                    <Label className="text-lg">Large Label</Label>
                    <Input size="lg" placeholder="Large input" className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-lg" required>Required Large</Label>
                    <Input size="lg" placeholder="Large required" className="mt-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Typography Hierarchy */}
          <div class="bg-gray-100 dark:bg-gray-700 p-8 rounded-lg">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-6">Typography Hierarchy</h3>
            <div class="space-y-6">
              <div>
                <Label className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Section Title
                </Label>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Form Subtitle
                </Label>
              </div>
              
              <div>
                <Label className="text-base font-medium text-gray-900 dark:text-white">
                  Primary Field Label
                </Label>
              </div>
              
              <div>
                <Label className="text-lg font-semibold text-gray-900 dark:text-white">
                  Main Section Heading
                </Label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
