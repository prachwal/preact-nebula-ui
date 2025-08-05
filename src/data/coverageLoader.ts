export interface CoverageData {
  lines: { total: number; covered: number; pct: number }
  statements: { total: number; covered: number; pct: number }
  functions: { total: number; covered: number; pct: number }
  branches: { total: number; covered: number; pct: number }
}

export interface ComponentCoverageData {
  name: string
  path: string
  coverage: CoverageData
  testCount: number
  status: 'passing' | 'failing' | 'no-tests'
  lastUpdated: string
}

export interface CoverageSummary {
  total: CoverageData
  components: ComponentCoverageData[]
  timestamp: string
  duration: number
}

/**
 * Ładuje dane pokrycia z pliku JSON generowanego przez Vitest
 */
export async function loadCoverageData(): Promise<CoverageSummary | null> {
  try {
    // W środowisku deweloperskim próbujemy załadować plik pokrycia
    const response = await fetch('/coverage/coverage-final.json')
    if (!response.ok) {
      console.warn('Coverage file not found. Run "npm run test:coverage" first.')
      return null
    }
    
    const coverageData = await response.json()
    return parseCoverageData(coverageData)
  } catch (error) {
    console.warn('Could not load coverage data:', error)
    return null
  }
}

/**
 * Parsuje surowe dane pokrycia z Vitest do naszego formatu
 */
function parseCoverageData(rawCoverage: any): CoverageSummary {
  const components: ComponentCoverageData[] = []
  let totalLines = 0, coveredLines = 0
  let totalStatements = 0, coveredStatements = 0
  let totalFunctions = 0, coveredFunctions = 0
  let totalBranches = 0, coveredBranches = 0

  // Iterujemy przez wszystkie pliki w pokryciu
  for (const [filePath, fileData] of Object.entries(rawCoverage)) {
    if (typeof fileData !== 'object' || !fileData) continue
    
    // Filtrujemy tylko komponenty z folderu nebula/components
    if (!filePath.includes('nebula\\components\\') || !filePath.endsWith('.tsx')) {
      continue
    }

    const componentName = extractComponentName(filePath)
    if (!componentName) continue

    const coverage = calculateFileCoverage(fileData as any)
    
    components.push({
      name: componentName,
      path: filePath,
      coverage,
      testCount: estimateTestCount(fileData as any),
      status: 'passing', // Domyślnie passing, można rozszerzyć o rzeczywisty status
      lastUpdated: new Date().toISOString().split('T')[0]
    })

    // Akumulujemy statystyki globalne
    totalLines += coverage.lines.total
    coveredLines += coverage.lines.covered
    totalStatements += coverage.statements.total
    coveredStatements += coverage.statements.covered
    totalFunctions += coverage.functions.total
    coveredFunctions += coverage.functions.covered
    totalBranches += coverage.branches.total
    coveredBranches += coverage.branches.covered
  }

  return {
    total: {
      lines: { 
        total: totalLines, 
        covered: coveredLines, 
        pct: totalLines > 0 ? Math.round((coveredLines / totalLines) * 100) : 0 
      },
      statements: { 
        total: totalStatements, 
        covered: coveredStatements, 
        pct: totalStatements > 0 ? Math.round((coveredStatements / totalStatements) * 100) : 0 
      },
      functions: { 
        total: totalFunctions, 
        covered: coveredFunctions, 
        pct: totalFunctions > 0 ? Math.round((coveredFunctions / totalFunctions) * 100) : 0 
      },
      branches: { 
        total: totalBranches, 
        covered: coveredBranches, 
        pct: totalBranches > 0 ? Math.round((coveredBranches / totalBranches) * 100) : 0 
      }
    },
    components: components.sort((a, b) => a.name.localeCompare(b.name)),
    timestamp: new Date().toISOString(),
    duration: 0 // Można rozszerzyć o rzeczywisty czas wykonania testów
  }
}

/**
 * Wyciąga nazwę komponentu z ścieżki pliku
 */
function extractComponentName(filePath: string): string | null {
  const match = filePath.match(/components\\([^\\]+)\\[^\\]+\.tsx$/)
  return match ? match[1] : null
}

/**
 * Oblicza pokrycie dla pojedynczego pliku
 */
function calculateFileCoverage(fileData: any): CoverageData {
  const statements = fileData.s || {}
  const functions = fileData.f || {}
  const branches = fileData.b || {}
  const statementMap = fileData.statementMap || {}
  const functionMap = fileData.fnMap || {}
  const branchMap = fileData.branchMap || {}

  // Obliczenia dla statements
  const totalStatements = Object.keys(statementMap).length
  const coveredStatements = Object.values(statements).filter((count: any) => count > 0).length

  // Obliczenia dla functions
  const totalFunctions = Object.keys(functionMap).length
  const coveredFunctions = Object.values(functions).filter((count: any) => count > 0).length

  // Obliczenia dla branches
  const totalBranches = Object.values(branchMap).reduce((total: number, branch: any) => {
    return total + (branch.locations?.length || 0)
  }, 0)
  const coveredBranches = Object.values(branches).reduce((covered: number, branchHits: any) => {
    if (Array.isArray(branchHits)) {
      return covered + branchHits.filter(hit => hit > 0).length
    }
    return covered
  }, 0)

  return {
    lines: {
      total: totalStatements, // Używamy statements jako aproksymację linii
      covered: coveredStatements,
      pct: totalStatements > 0 ? Math.round((coveredStatements / totalStatements) * 100) : 0
    },
    statements: {
      total: totalStatements,
      covered: coveredStatements,
      pct: totalStatements > 0 ? Math.round((coveredStatements / totalStatements) * 100) : 0
    },
    functions: {
      total: totalFunctions,
      covered: coveredFunctions,
      pct: totalFunctions > 0 ? Math.round((coveredFunctions / totalFunctions) * 100) : 0
    },
    branches: {
      total: totalBranches,
      covered: coveredBranches,
      pct: totalBranches > 0 ? Math.round((coveredBranches / totalBranches) * 100) : 0
    }
  }
}

/**
 * Estymuje liczbę testów na podstawie ilości wykonań funkcji
 */
function estimateTestCount(fileData: any): number {
  const functions = fileData.f || {}
  const functionCounts = Object.values(functions) as number[]
  
  if (functionCounts.length === 0) return 0
  
  // Bierzemy średnią z wykonań funkcji jako aproksymację liczby testów
  const totalExecutions = functionCounts.reduce((sum, count) => sum + count, 0)
  return Math.ceil(totalExecutions / functionCounts.length)
}

/**
 * Fallback - dane mock gdy pokrycie nie jest dostępne
 */
export function getMockCoverageData(): CoverageSummary {
  return {
    total: {
      lines: { total: 2500, covered: 2450, pct: 98 },
      statements: { total: 2200, covered: 2156, pct: 98 },
      functions: { total: 450, covered: 441, pct: 98 },
      branches: { total: 800, covered: 760, pct: 95 }
    },
    components: [
      {
        name: 'Button',
        path: 'nebula/components/Button/Button.tsx',
        coverage: {
          lines: { total: 50, covered: 50, pct: 100 },
          statements: { total: 45, covered: 45, pct: 100 },
          functions: { total: 8, covered: 8, pct: 100 },
          branches: { total: 12, covered: 12, pct: 100 }
        },
        testCount: 25,
        status: 'passing',
        lastUpdated: '2025-08-05'
      },
      // Możesz dodać więcej komponentów tutaj...
    ],
    timestamp: new Date().toISOString(),
    duration: 12500
  }
}
