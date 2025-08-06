import { useState } from 'preact/hooks'
import { TreeView } from '../../../../nebula/components'
import type { TreeNode } from '../../../../nebula/components/TreeView/types'

const basicData: TreeNode[] = [
  {
    key: '1',
    title: 'Documents',
    children: [
      {
        key: '1-1',
        title: 'Work',
        children: [
          { key: '1-1-1', title: 'Projects.docx' },
          { key: '1-1-2', title: 'Reports.pdf' },
          { key: '1-1-3', title: 'Presentations.pptx' }
        ]
      },
      {
        key: '1-2',
        title: 'Personal',
        children: [
          { key: '1-2-1', title: 'Resume.pdf' },
          { key: '1-2-2', title: 'Cover Letter.docx' }
        ]
      }
    ]
  },
  {
    key: '2',
    title: 'Images',
    children: [
      { key: '2-1', title: 'Vacation.jpg' },
      { key: '2-2', title: 'Family.png' },
      { key: '2-3', title: 'Screenshots' }
    ]
  },
  {
    key: '3',
    title: 'Videos',
    children: [
      { key: '3-1', title: 'Tutorial.mp4' },
      { key: '3-2', title: 'Meeting.mov' }
    ]
  },
  { key: '4', title: 'Music' }
]

export function BasicUsageSection() {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [expandedKeys, setExpandedKeys] = useState<string[]>(['1'])

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Basic Tree Structure
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          A simple file system tree with hierarchical navigation. Click on folders to expand/collapse them, 
          and click on items to select them.
        </p>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <TreeView
            data={basicData}
            selectedKeys={selectedKeys}
            expandedKeys={expandedKeys}
            onSelect={(keys) => setSelectedKeys(keys)}
            onExpand={(keys) => setExpandedKeys(keys)}
            showIcon
            aria-label="Basic file system tree"
          />
          
          {selectedKeys.length > 0 && (
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                Selected: {selectedKeys.join(', ')}
              </p>
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Multiple Selection
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Enable multiple selection mode to select several nodes at once.
        </p>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <TreeView
            data={basicData}
            selectable="multiple"
            defaultExpandedKeys={['1', '2']}
            showIcon
            aria-label="Multiple selection tree"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Checkable Tree
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Add checkboxes to nodes for bulk selection. Parent nodes automatically update based on children selection.
        </p>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <TreeView
            data={basicData}
            checkable
            defaultExpandedKeys={['1']}
            showIcon
            aria-label="Checkable tree"
          />
        </div>
      </div>
    </div>
  )
}
