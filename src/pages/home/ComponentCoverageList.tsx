import { type ComponentCoverageData } from '../../data/coverageLoader'

interface ComponentCoverageCardProps {
  component: ComponentCoverageData
}

export function ComponentCoverageCard({ component }: ComponentCoverageCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passing': return 'text-green-600 dark:text-green-400'
      case 'failing': return 'text-red-600 dark:text-red-400'
      default: return 'text-gray-600 dark:text-gray-400'
    }
  }

  const getCoverageColor = (pct: number) => {
    if (pct >= 90) return 'text-green-600 dark:text-green-400'
    if (pct >= 70) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-red-600 dark:text-red-400'
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900 dark:text-white">{component.name}</h3>
        <span className={`text-sm font-medium ${getStatusColor(component.status)}`}>
          {component.status}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <span className="text-gray-600 dark:text-gray-400">Lines:</span>
          <span className={`ml-1 font-medium ${getCoverageColor(component.coverage.lines.pct)}`}>
            {component.coverage.lines.pct}%
          </span>
        </div>
        <div>
          <span className="text-gray-600 dark:text-gray-400">Functions:</span>
          <span className={`ml-1 font-medium ${getCoverageColor(component.coverage.functions.pct)}`}>
            {component.coverage.functions.pct}%
          </span>
        </div>
        <div>
          <span className="text-gray-600 dark:text-gray-400">Branches:</span>
          <span className={`ml-1 font-medium ${getCoverageColor(component.coverage.branches.pct)}`}>
            {component.coverage.branches.pct}%
          </span>
        </div>
        <div>
          <span className="text-gray-600 dark:text-gray-400">Tests:</span>
          <span className="ml-1 font-medium text-blue-600 dark:text-blue-400">
            {component.testCount}
          </span>
        </div>
      </div>
      
      <div className="mt-3 text-xs text-gray-500">
        Updated: {component.lastUpdated}
      </div>
    </div>
  )
}

interface ComponentCoverageListProps {
  components: ComponentCoverageData[]
  limit?: number
}

export function ComponentCoverageList({ components, limit = 6 }: ComponentCoverageListProps) {
  const displayComponents = limit ? components.slice(0, limit) : components
  
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Component Coverage Details
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayComponents.map((component) => (
          <ComponentCoverageCard key={component.name} component={component} />
        ))}
      </div>
      {limit && components.length > limit && (
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing {limit} of {components.length} components
          </p>
        </div>
      )}
    </div>
  )
}
