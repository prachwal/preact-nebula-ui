export interface TestResults {
  totalTests: number
  passedTests: number
  failedTests: number
  coverage: {
    lines: number
    functions: number
    branches: number
    statements: number
  }
  timestamp: string
  duration: number
}

export interface ComponentTestData {
  componentName: string
  testCount: number
  coverage: number
  status: 'passing' | 'failing' | 'no-tests'
  lastUpdated: string
}

// Mock test data - this would be populated by actual test runner
export const mockTestResults: TestResults = {
  totalTests: 615,
  passedTests: 545,
  failedTests: 0,
  coverage: {
    lines: 100,
    functions: 100,
    branches: 98,
    statements: 100
  },
  timestamp: new Date().toISOString(),
  duration: 14500
}

export const componentTestData: ComponentTestData[] = [
  { componentName: 'Button', testCount: 25, coverage: 100, status: 'passing', lastUpdated: '2025-08-04' },
  { componentName: 'Input', testCount: 30, coverage: 100, status: 'passing', lastUpdated: '2025-08-04' },
  { componentName: 'Textarea', testCount: 22, coverage: 100, status: 'passing', lastUpdated: '2025-08-04' },
  { componentName: 'Label', testCount: 15, coverage: 100, status: 'passing', lastUpdated: '2025-08-04' },
  { componentName: 'FieldError', testCount: 12, coverage: 100, status: 'passing', lastUpdated: '2025-08-04' },
  { componentName: 'Card', testCount: 28, coverage: 100, status: 'passing', lastUpdated: '2025-08-04' },
  { componentName: 'Container', testCount: 20, coverage: 100, status: 'passing', lastUpdated: '2025-08-04' },
  { componentName: 'Stack', testCount: 35, coverage: 100, status: 'passing', lastUpdated: '2025-08-04' },
  { componentName: 'Divider', testCount: 18, coverage: 100, status: 'passing', lastUpdated: '2025-08-04' },
  { componentName: 'Alert', testCount: 24, coverage: 100, status: 'passing', lastUpdated: '2025-08-04' },
  { componentName: 'Badge', testCount: 20, coverage: 100, status: 'passing', lastUpdated: '2025-08-04' },
  { componentName: 'Progress', testCount: 26, coverage: 100, status: 'passing', lastUpdated: '2025-08-04' },
  { componentName: 'Skeleton', testCount: 16, coverage: 100, status: 'passing', lastUpdated: '2025-08-04' },
  { componentName: 'Checkbox', testCount: 32, coverage: 100, status: 'passing', lastUpdated: '2025-08-04' },
  { componentName: 'Radio', testCount: 28, coverage: 100, status: 'passing', lastUpdated: '2025-08-04' },
  { componentName: 'Switch', testCount: 22, coverage: 100, status: 'passing', lastUpdated: '2025-08-04' },
  { componentName: 'Select', testCount: 38, coverage: 100, status: 'passing', lastUpdated: '2025-08-04' },
  { componentName: 'Breadcrumb', testCount: 29, coverage: 100, status: 'passing', lastUpdated: '2025-08-04' },
  { componentName: 'Pagination', testCount: 47, coverage: 100, status: 'passing', lastUpdated: '2025-08-04' },
  { componentName: 'Spinner', testCount: 14, coverage: 100, status: 'passing', lastUpdated: '2025-08-04' },
  { componentName: 'Avatar', testCount: 24, coverage: 100, status: 'passing', lastUpdated: '2025-08-04' },
  { componentName: 'Tabs', testCount: 31, coverage: 100, status: 'passing', lastUpdated: '2025-08-04' },
  { componentName: 'Table', testCount: 38, coverage: 100, status: 'passing', lastUpdated: '2025-01-15' },
  { componentName: 'TreeView', testCount: 35, coverage: 95, status: 'passing', lastUpdated: '2025-08-06' },
  { componentName: 'Transfer', testCount: 30, coverage: 95, status: 'passing', lastUpdated: '2025-08-06' },
  { componentName: 'Steps', testCount: 35, coverage: 95, status: 'passing', lastUpdated: '2025-08-06' },
  { componentName: 'Tags', testCount: 35, coverage: 95, status: 'passing', lastUpdated: '2025-08-06' }
]

export const getTestStats = () => {
  const totalComponents = componentTestData.length
  const testedComponents = componentTestData.filter(c => c.testCount > 0).length
  const passingComponents = componentTestData.filter(c => c.status === 'passing').length
  const totalTestCount = componentTestData.reduce((sum, c) => sum + c.testCount, 0)
  const averageCoverage = Math.round(
    componentTestData.reduce((sum, c) => sum + c.coverage, 0) / totalComponents
  )

  return {
    totalComponents,
    testedComponents,
    passingComponents,
    totalTestCount,
    averageCoverage,
    testResults: mockTestResults
  }
}
