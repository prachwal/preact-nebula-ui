import { getTestStats } from '../../data/testResults'

export function TestCoverageSection() {
  const testStats = getTestStats()

  return (
    <div className="mt-16 text-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          📊 Test Coverage & Quality
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              {testStats.totalTestCount}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Total Tests</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {testStats.averageCoverage}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Avg Coverage</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {testStats.passingComponents}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Passing</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
              {Math.round(testStats.testResults.duration / 1000)}s
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Test Duration</div>
          </div>
        </div>
        
        <div className="mt-6 text-sm text-gray-600 dark:text-gray-300">
          <p>Last updated: {new Date(testStats.testResults.timestamp).toLocaleDateString()}</p>
          <p>
            Coverage Details: Lines {testStats.testResults.coverage.lines}% | 
            Functions {testStats.testResults.coverage.functions}% | 
            Branches {testStats.testResults.coverage.branches}% | 
            Statements {testStats.testResults.coverage.statements}%
          </p>
        </div>
      </div>
    </div>
  )
}
