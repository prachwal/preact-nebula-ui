import { Anchor } from '@/components'
import { Label } from '@/components'

export function SizesSection() {
  const items = [
    { key: 'section1', href: '#section1', title: 'Section 1' },
    { key: 'section2', href: '#section2', title: 'Section 2' },
    { key: 'section3', href: '#section3', title: 'Section 3' }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Anchor Sizes
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Different sizes for various layout contexts.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Label>Small Size</Label>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <Anchor 
                items={items}
                size="sm"
              />
            </div>
          </div>

          <div>
            <Label>Default Size</Label>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <Anchor 
                items={items}
                size="md"
              />
            </div>
          </div>

          <div>
            <Label>Large Size</Label>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <Anchor 
                items={items}
                size="lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
