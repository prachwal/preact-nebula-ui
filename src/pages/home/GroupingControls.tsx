export type GroupBy = 'milestone' | 'category' | 'alphabetical'

interface GroupingControlsProps {
  groupBy: GroupBy
  onGroupByChange: (groupBy: GroupBy) => void
}

export function GroupingControls({ groupBy, onGroupByChange }: GroupingControlsProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 border border-gray-200 dark:border-gray-700">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">View Components By:</h2>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onGroupByChange('milestone')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            groupBy === 'milestone'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          📅 Milestone
        </button>
        <button
          onClick={() => onGroupByChange('category')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            groupBy === 'category'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          🗂️ Category
        </button>
        <button
          onClick={() => onGroupByChange('alphabetical')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            groupBy === 'alphabetical'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          🔤 Alphabetical
        </button>
      </div>
    </div>
  )
}
