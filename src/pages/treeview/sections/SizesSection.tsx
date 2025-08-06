import { TreeView } from '../../../../nebula/components'
import type { TreeNode } from '../../../../nebula/components/TreeView/types'

const sizeData: TreeNode[] = [
  {
    key: '1',
    title: 'Small Components',
    children: [
      { key: '1-1', title: 'Button' },
      { key: '1-2', title: 'Input' },
      { key: '1-3', title: 'Label' }
    ]
  },
  {
    key: '2',
    title: 'Medium Components',
    children: [
      { key: '2-1', title: 'Card' },
      { key: '2-2', title: 'Modal' },
      { key: '2-3', title: 'Form' }
    ]
  },
  {
    key: '3',
    title: 'Large Components',
    children: [
      { key: '3-1', title: 'Dashboard' },
      { key: '3-2', title: 'Table' },
      { key: '3-3', title: 'Layout' }
    ]
  }
]

export function SizesSection() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Small Tree
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Compact tree view with smaller spacing and font sizes, ideal for sidebars and dense layouts.
        </p>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <TreeView
            data={sizeData}
            size="sm"
            defaultExpandedKeys={['1']}
            showIcon
            aria-label="Small size tree"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Medium Tree (Default)
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Default tree view size with balanced spacing and readability.
        </p>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <TreeView
            data={sizeData}
            size="md"
            defaultExpandedKeys={['2']}
            showIcon
            aria-label="Medium size tree"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Large Tree
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Larger tree view with increased spacing and font sizes for better touch interaction.
        </p>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <TreeView
            data={sizeData}
            size="lg"
            defaultExpandedKeys={['3']}
            showIcon
            aria-label="Large size tree"
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['sm', 'md', 'lg'].map((size) => (
            <div key={size} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 capitalize">
                {size === 'sm' ? 'Small' : size === 'md' ? 'Medium' : 'Large'}
              </h4>
              <TreeView
                data={sizeData.slice(0, 2)}
                size={size as 'sm' | 'md' | 'lg'}
                defaultExpandedKeys={['1']}
                showIcon
                aria-label={`${size} size tree comparison`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
