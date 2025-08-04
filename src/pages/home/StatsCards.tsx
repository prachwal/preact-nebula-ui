import { getComponentStats } from '../../data/components'

export function StatsCards() {
  const stats = getComponentStats()

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.total}</div>
        <div className="text-sm text-gray-600 dark:text-gray-300">Total Components</div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
        <div className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.completed}</div>
        <div className="text-sm text-gray-600 dark:text-gray-300">Completed</div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
        <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">{stats.inProgress + stats.planned}</div>
        <div className="text-sm text-gray-600 dark:text-gray-300">In Progress + Planned</div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
        <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{stats.completionPercentage}%</div>
        <div className="text-sm text-gray-600 dark:text-gray-300">Progress</div>
      </div>
    </div>
  )
}
