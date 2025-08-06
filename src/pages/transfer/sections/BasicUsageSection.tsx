import { useState } from 'preact/hooks'
import { Transfer } from '../../../../nebula/components'
import type { TransferItem } from '../../../../nebula/components/Transfer/types'

const basicData: TransferItem[] = [
  { key: '1', title: 'React Components', description: 'UI components built with React' },
  { key: '2', title: 'Vue Components', description: 'UI components built with Vue.js' },
  { key: '3', title: 'Angular Components', description: 'UI components built with Angular' },
  { key: '4', title: 'Svelte Components', description: 'UI components built with Svelte' },
  { key: '5', title: 'Web Components', description: 'Native browser web components' },
  { key: '6', title: 'TypeScript Definitions', description: 'Type definitions for components', disabled: true },
  { key: '7', title: 'Documentation', description: 'Component documentation and examples' },
  { key: '8', title: 'Test Files', description: 'Unit and integration tests' },
  { key: '9', title: 'Storybook Stories', description: 'Interactive component demos' },
  { key: '10', title: 'Design Tokens', description: 'Design system tokens and variables' }
]

const fileData: TransferItem[] = [
  { key: 'doc1', title: 'Project Proposal.pdf', description: 'Initial project proposal document' },
  { key: 'doc2', title: 'Technical Specification.docx', description: 'Detailed technical requirements' },
  { key: 'doc3', title: 'User Research.xlsx', description: 'User interviews and survey data' },
  { key: 'doc4', title: 'Design Mockups.figma', description: 'UI/UX design mockups' },
  { key: 'doc5', title: 'Meeting Notes.md', description: 'Weekly meeting notes and decisions' },
  { key: 'doc6', title: 'Budget Analysis.xlsx', description: 'Project budget and cost analysis', disabled: true },
  { key: 'doc7', title: 'Timeline.pdf', description: 'Project timeline and milestones' },
  { key: 'doc8', title: 'Risk Assessment.docx', description: 'Risk analysis and mitigation strategies' }
]

export function BasicUsageSection() {
  const [targetKeys, setTargetKeys] = useState<string[]>(['2', '7'])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Basic Transfer
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          A simple transfer component allowing users to move items between two lists. 
          Select items and use the arrow buttons to transfer them.
        </p>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <Transfer
            dataSource={basicData}
            leftTitle="Available Components"
            rightTitle="Selected Components"
            aria-label="Component transfer interface"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Controlled Transfer
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Controlled transfer with custom titles and change handlers. 
          The parent component manages the state.
        </p>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <Transfer
            dataSource={fileData}
            targetKeys={targetKeys}
            selectedKeys={selectedKeys}
            leftTitle="Project Files"
            rightTitle="Archive"
            onChange={(newTargetKeys, direction, moveKeys) => {
              setTargetKeys(newTargetKeys)
              console.log(`Moved ${moveKeys.length} items ${direction}`)
            }}
            onSelectChange={(sourceKeys, targetKeys) => {
              setSelectedKeys([...sourceKeys, ...targetKeys])
            }}
            aria-label="File archive transfer interface"
          />
          
          {selectedKeys.length > 0 && (
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                Selected: {selectedKeys.length} items
              </p>
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          With Search
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Enable search functionality to quickly find and filter items in both lists.
        </p>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <Transfer
            dataSource={basicData}
            defaultTargetKeys={['1', '9']}
            searchable
            leftTitle="Source Items"
            rightTitle="Target Items"
            searchPlaceholder="Search components..."
            onSearch={(direction, value) => {
              console.log(`Searching in ${direction} list:`, value)
            }}
            aria-label="Searchable component transfer"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Custom Operations
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Customize the operation buttons with different labels and icons.
        </p>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <Transfer
            dataSource={fileData.slice(0, 6)}
            operations={['→', '←']}
            leftTitle="Draft"
            rightTitle="Published"
            showSelectAll={false}
            aria-label="Publishing workflow transfer"
          />
        </div>
      </div>
    </div>
  )
}
