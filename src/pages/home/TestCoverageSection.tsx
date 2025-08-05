import { useState, useEffect } from 'preact/hooks'
import { loadCoverageData, getMockCoverageData, type CoverageSummary } from '../../data/coverageLoader'

import { route } from 'preact-router';

export function TestCoverageSection() {
  const [coverageData, setCoverageData] = useState<CoverageSummary | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [useRealData, setUseRealData] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        const realCoverageData = await loadCoverageData()
        if (realCoverageData) {
          setCoverageData(realCoverageData)
          setUseRealData(true)
        } else {
          // Używamy mock data jako fallback
          setCoverageData(getMockCoverageData())
          setUseRealData(false)
        }
      } catch (error) {
        console.warn('Failed to load coverage data, using fallback:', error)
        setCoverageData(getMockCoverageData())
        setUseRealData(false)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  if (isLoading) {
    return (
      <div className="mt-16 text-center">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 border border-gray-200 dark:border-gray-700">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="text-center">
                  <div className="h-12 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const data = coverageData || getMockCoverageData()
  const totalTests = data.components.reduce((sum, comp) => sum + comp.testCount, 0)
  const passingComponents = data.components.filter(comp => comp.status === 'passing').length

  return (
    <div className="mt-16 text-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            📊 Test Coverage & Quality
          </h2>
          <button
            className="ml-4 px-3 py-1 rounded bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
            onClick={() => route('/coverage')}
            title="Zobacz pełne dane coverage"
          >
            Pełne dane
          </button>
          <div className="flex items-center space-x-2">
            {useRealData ? (
              <div className="flex items-center text-green-600 dark:text-green-400">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm">Live Data</span>
              </div>
            ) : (
              <div className="flex items-center text-yellow-600 dark:text-yellow-400">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                <span className="text-sm">Mock Data</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-6">
          <div>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              {totalTests}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Total Tests</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {data.total.lines.pct}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Lines Coverage</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {passingComponents}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Components</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
              {data.total.functions.pct}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Functions</div>
          </div>
        </div>
        
        {/* Szczegółowe pokrycie */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Lines</div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {data.total.lines.covered}/{data.total.lines.total}
            </div>
            <div className="text-sm text-gray-500">({data.total.lines.pct}%)</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Statements</div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {data.total.statements.covered}/{data.total.statements.total}
            </div>
            <div className="text-sm text-gray-500">({data.total.statements.pct}%)</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Functions</div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {data.total.functions.covered}/{data.total.functions.total}
            </div>
            <div className="text-sm text-gray-500">({data.total.functions.pct}%)</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Branches</div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {data.total.branches.covered}/{data.total.branches.total}
            </div>
            <div className="text-sm text-gray-500">({data.total.branches.pct}%)</div>
          </div>
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
          <p>Last updated: {new Date(data.timestamp).toLocaleDateString()}</p>
          {!useRealData && (
            <p className="text-yellow-600 dark:text-yellow-400">
              💡 Run <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">npm run test:coverage</code> to generate real coverage data
            </p>
          )}
          {useRealData && (
            <p className="text-green-600 dark:text-green-400">
              ✅ Showing real coverage data from latest test run
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
