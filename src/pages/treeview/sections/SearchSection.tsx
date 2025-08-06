import { useState } from 'preact/hooks'
import { TreeView } from '../../../../nebula/components'
import type { TreeNode } from '../../../../nebula/components/TreeView/types'

const searchData: TreeNode[] = [
  {
    key: '1',
    title: 'Frontend',
    children: [
      {
        key: '1-1',
        title: 'React',
        children: [
          { key: '1-1-1', title: 'Hooks' },
          { key: '1-1-2', title: 'Components' },
          { key: '1-1-3', title: 'State Management' }
        ]
      },
      {
        key: '1-2',
        title: 'Vue',
        children: [
          { key: '1-2-1', title: 'Composition API' },
          { key: '1-2-2', title: 'Directives' }
        ]
      },
      {
        key: '1-3',
        title: 'Angular',
        children: [
          { key: '1-3-1', title: 'Services' },
          { key: '1-3-2', title: 'Dependency Injection' }
        ]
      }
    ]
  },
  {
    key: '2',
    title: 'Backend',
    children: [
      {
        key: '2-1',
        title: 'Node.js',
        children: [
          { key: '2-1-1', title: 'Express' },
          { key: '2-1-2', title: 'Middleware' }
        ]
      },
      {
        key: '2-2',
        title: 'Python',
        children: [
          { key: '2-2-1', title: 'Django' },
          { key: '2-2-2', title: 'FastAPI' }
        ]
      }
    ]
  },
  {
    key: '3',
    title: 'DevOps',
    children: [
      { key: '3-1', title: 'Docker' },
      { key: '3-2', title: 'Kubernetes' },
      { key: '3-3', title: 'CI/CD' }
    ]
  }
]

export function SearchSection() {
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Searchable Tree
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Enable search functionality to quickly find nodes. The tree automatically expands 
          to show matching results and highlights the search terms.
        </p>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <TreeView
            data={searchData}
            searchable
            searchValue={searchValue}
            onSearch={setSearchValue}
            defaultExpandedKeys={['1', '2']}
            showIcon
            aria-label="Searchable technology tree"
          />
          
          {searchValue && (
            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded border border-yellow-200 dark:border-yellow-800">
              <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                Searching for: "{searchValue}"
              </p>
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Custom Search Placeholder
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Customize the search input placeholder to match your use case.
        </p>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <TreeView
            data={searchData}
            searchable
            searchPlaceholder="Find technologies..."
            defaultExpandedKeys={['1']}
            showIcon
            aria-label="Technology tree with custom search"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Search with Selection
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Combine search functionality with selection capabilities for powerful data exploration.
        </p>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <TreeView
            data={searchData}
            searchable
            selectable="multiple"
            checkable
            defaultExpandedKeys={['2']}
            showIcon
            aria-label="Searchable and selectable technology tree"
          />
        </div>
      </div>
    </div>
  )
}
