import { Transfer } from '../../../../nebula/components'
import type { TransferItem } from '../../../../nebula/components/Transfer/types'

const sizeData: TransferItem[] = [
  { key: '1', title: 'Small Item', description: 'Compact display item' },
  { key: '2', title: 'Medium Item', description: 'Standard display item' },
  { key: '3', title: 'Large Item', description: 'Expanded display item' },
  { key: '4', title: 'Extra Large', description: 'Maximum size display' }
]

export function SizesSection() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Small Size
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Compact transfer component perfect for sidebars and dense layouts.
        </p>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <Transfer
            dataSource={sizeData}
            size="sm"
            height={200}
            leftTitle="Available"
            rightTitle="Selected"
            aria-label="Small size transfer"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Medium Size (Default)
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Standard transfer component size with balanced spacing and readability.
        </p>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <Transfer
            dataSource={sizeData}
            size="md"
            height={250}
            leftTitle="Available"
            rightTitle="Selected"
            defaultTargetKeys={['2']}
            aria-label="Medium size transfer"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Large Size
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Large transfer component with increased spacing for better touch interaction.
        </p>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <Transfer
            dataSource={sizeData}
            size="lg"
            height={300}
            leftTitle="Available"
            rightTitle="Selected"
            defaultTargetKeys={['3', '4']}
            aria-label="Large size transfer"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Size Comparison
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Compare all sizes side by side to choose the best fit for your interface.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <div key={size} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 capitalize">
                {size === 'sm' ? 'Small' : size === 'md' ? 'Medium' : 'Large'}
              </h4>
              <Transfer
                dataSource={sizeData.slice(0, 3)}
                size={size}
                height={180}
                leftTitle="Source"
                rightTitle="Target"
                defaultTargetKeys={size === 'sm' ? ['1'] : size === 'md' ? ['2'] : ['3']}
                showSelectAll={false}
                searchable={false}
                aria-label={`${size} size transfer comparison`}
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Custom Height
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Adjust the height of transfer lists to fit your layout requirements.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Compact (150px)
            </h4>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <Transfer
                dataSource={sizeData}
                height={150}
                leftTitle="Compact"
                rightTitle="Lists"
                showSelectAll={false}
                aria-label="Compact height transfer"
              />
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Extended (400px)
            </h4>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <Transfer
                dataSource={sizeData}
                height={400}
                leftTitle="Extended"
                rightTitle="Lists"
                showSelectAll={false}
                aria-label="Extended height transfer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
