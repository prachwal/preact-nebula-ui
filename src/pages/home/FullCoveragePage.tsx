import { useEffect, useState } from 'preact/hooks';
import { route } from 'preact-router';
import { Container, Stack } from '../../../nebula/components';

interface CoverageFileData {
  path: string;
  statementMap: Record<string, any>;
  fnMap: Record<string, any>;
  branchMap: Record<string, any>;
  s: Record<string, number>;
  f: Record<string, number>;
  b: Record<string, number[]>;
}

interface CoverageJson {
  [file: string]: CoverageFileData;
}

interface CoverageStats {
  statements: { covered: number; total: number; pct: number };
  functions: { covered: number; total: number; pct: number };
  branches: { covered: number; total: number; pct: number };
  lines: { covered: number; total: number; pct: number };
}

interface FullCoveragePageProps {
  path?: string
}

export function FullCoveragePage(_props: FullCoveragePageProps) {
  const [coverage, setCoverage] = useState<CoverageJson | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState<'path' | 'statements' | 'functions' | 'branches'>('path');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);

  useEffect(() => {
    const loadCoverage = async () => {
      try {
        setLoading(true);
        const response = await fetch('/coverage-final.json');
        if (!response.ok) {
          const fallbackResponse = await fetch('/public/coverage-final.json');
          if (!fallbackResponse.ok) {
            throw new Error('Brak pliku coverage-final.json. Uruchom: npm run test:coverage');
          }
          const data = await fallbackResponse.json();
          setCoverage(data);
        } else {
          const data = await response.json();
          setCoverage(data);
        }
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    loadCoverage();
  }, []);

  // Reset current page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, sortBy, sortOrder]);

  const calculateFileStats = (data: CoverageFileData): CoverageStats => {
    const totalStatements = Object.keys(data.statementMap || {}).length;
    const coveredStatements = Object.values(data.s || {}).filter((v) => v > 0).length;
    
    const totalFunctions = Object.keys(data.fnMap || {}).length;
    const coveredFunctions = Object.values(data.f || {}).filter((v) => v > 0).length;
    
    const totalBranches = Object.keys(data.branchMap || {}).length;
    const coveredBranches = Object.values(data.b || {}).reduce((acc, branches) => {
      return acc + (Array.isArray(branches) ? branches.filter(v => v > 0).length : 0);
    }, 0);

    return {
      statements: {
        covered: coveredStatements,
        total: totalStatements,
        pct: totalStatements > 0 ? Math.round((coveredStatements / totalStatements) * 100) : 0
      },
      functions: {
        covered: coveredFunctions,
        total: totalFunctions,
        pct: totalFunctions > 0 ? Math.round((coveredFunctions / totalFunctions) * 100) : 0
      },
      branches: {
        covered: coveredBranches,
        total: totalBranches,
        pct: totalBranches > 0 ? Math.round((coveredBranches / totalBranches) * 100) : 0
      },
      lines: {
        covered: coveredStatements,
        total: totalStatements,
        pct: totalStatements > 0 ? Math.round((coveredStatements / totalStatements) * 100) : 0
      }
    };
  };

  const getCoverageColor = (pct: number) => {
    if (pct >= 90) return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20';
    if (pct >= 70) return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20';
    if (pct >= 50) return 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20';
    return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20';
  };

  const getProcessedFiles = () => {
    if (!coverage) return { files: [], totalFiles: 0, totalPages: 0 };
    
    let files = Object.entries(coverage)
      .filter(([path]) => {
        // Filtrujemy tylko istotne pliki komponentów
        if (!path.includes('nebula') || !path.includes('components')) return false;
        if (!path.endsWith('.tsx')) return false;
        
        // Wykluczamy pliki pomocnicze i testowe
        if (path.includes('.test.')) return false;
        if (path.includes('.spec.')) return false;
        if (path.includes('.stories.')) return false;
        if (path.includes('.d.ts')) return false;
        if (path.includes('index.ts')) return false;
        if (path.includes('.types.ts')) return false;
        
        // Wykluczamy pliki pomocnicze w folderach komponentów
        if (path.includes('Portal.tsx') && !path.includes('components/Portal/')) return false;
        if (path.includes('focusUtils.ts')) return false;
        
        // Skupiamy się na głównych plikach komponentów
        const fileName = path.replace(/^.*[\\\/]/, '');
        const folderName = path.split(/[\\\/]/).slice(-2, -1)[0];
        
        // Główny plik komponentu powinien mieć taką samą nazwę jak folder
        return fileName === `${folderName}.tsx`;
      })
      .map(([path, data]) => {
        // Skracamy ścieżkę - usuwamy długi prefix
        const shortPath = path.replace(/^.*[\\\/]preact-nebula-ui[\\\/]/, './');
        const fileName = path.replace(/^.*[\\\/]/, ''); // Pokazuj tylko nazwę pliku
        const componentName = fileName.replace('.tsx', ''); // Nazwa komponentu
        
        return {
          path: fileName,
          componentName,
          shortPath,
          fullPath: path,
          stats: calculateFileStats(data)
        };
      });

    // Filtrowanie po nazwie
    if (filter) {
      files = files.filter(file => 
        file.componentName.toLowerCase().includes(filter.toLowerCase()) ||
        file.path.toLowerCase().includes(filter.toLowerCase())
      );
    }

    // Sortowanie
    files.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'path':
          comparison = a.componentName.localeCompare(b.componentName);
          break;
        case 'statements':
          comparison = a.stats.statements.pct - b.stats.statements.pct;
          break;
        case 'functions':
          comparison = a.stats.functions.pct - b.stats.functions.pct;
          break;
        case 'branches':
          comparison = a.stats.branches.pct - b.stats.branches.pct;
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    const totalFiles = files.length;
    const totalPages = Math.ceil(totalFiles / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedFiles = files.slice(startIndex, startIndex + itemsPerPage);

    return { files: paginatedFiles, totalFiles, totalPages };
  };

  const calculateTotalStats = () => {
    if (!coverage) return null;
    
    let totalStmts = 0, coveredStmts = 0;
    let totalFns = 0, coveredFns = 0;
    let totalBranches = 0, coveredBranches = 0;

    Object.entries(coverage).forEach(([path, data]) => {
      // Stosujemy te same filtry co w getProcessedFiles
      if (!path.includes('nebula') || !path.includes('components')) return;
      if (!path.endsWith('.tsx')) return;
      if (path.includes('.test.') || path.includes('.spec.') || path.includes('.stories.')) return;
      if (path.includes('.d.ts') || path.includes('index.ts') || path.includes('.types.ts')) return;
      if (path.includes('Portal.tsx') && !path.includes('components/Portal/')) return;
      if (path.includes('focusUtils.ts')) return;
      
      // Główny plik komponentu powinien mieć taką samą nazwę jak folder
      const fileName = path.replace(/^.*[\\\/]/, '');
      const folderName = path.split(/[\\\/]/).slice(-2, -1)[0];
      if (fileName !== `${folderName}.tsx`) return;

      const stats = calculateFileStats(data);
      totalStmts += stats.statements.total;
      coveredStmts += stats.statements.covered;
      totalFns += stats.functions.total;
      coveredFns += stats.functions.covered;
      totalBranches += stats.branches.total;
      coveredBranches += stats.branches.covered;
    });

    return {
      statements: { 
        covered: coveredStmts, 
        total: totalStmts, 
        pct: totalStmts > 0 ? Math.round((coveredStmts / totalStmts) * 100) : 0 
      },
      functions: { 
        covered: coveredFns, 
        total: totalFns, 
        pct: totalFns > 0 ? Math.round((coveredFns / totalFns) * 100) : 0 
      },
      branches: { 
        covered: coveredBranches, 
        total: totalBranches, 
        pct: totalBranches > 0 ? Math.round((coveredBranches / totalBranches) * 100) : 0 
      }
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Ładowanie danych pokrycia testów...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Container>
          <div className="text-center bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <div className="text-red-600 dark:text-red-400 text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Błąd ładowania danych</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
            <div className="space-y-2 text-sm text-left bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="font-medium">Aby wygenerować dane pokrycia:</p>
              <code className="block bg-gray-800 text-green-400 p-2 rounded">npm run test:coverage</code>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Plik zostanie zapisany w <code>coverage/coverage-final.json</code>
              </p>
            </div>
            <button
              onClick={() => route('/')}
              className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Powrót do strony głównej
            </button>
          </div>
        </Container>
      </div>
    );
  }

  const processedFilesData = getProcessedFiles();
  const totalStats = calculateTotalStats();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Usuwamy Container dla pełnej szerokości */}
      <div className="max-w-full px-4 sm:px-6 lg:px-8">
        <Stack spacing="lg" className="py-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                📊 Pokrycie komponentów testami
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Analiza pokrycia testów dla głównych komponentów Nebula UI
              </p>
            </div>
            <button
              onClick={() => route('/')}
              className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              ← Powrót
            </button>
          </div>

          {/* Summary Stats */}
          {totalStats && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                📈 Podsumowanie ogólne
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={`p-4 rounded-lg ${getCoverageColor(totalStats.statements.pct)}`}>
                  <div className="text-2xl font-bold">{totalStats.statements.pct}%</div>
                  <div className="text-sm">Statements</div>
                  <div className="text-xs opacity-75">
                    {totalStats.statements.covered} / {totalStats.statements.total}
                  </div>
                </div>
                <div className={`p-4 rounded-lg ${getCoverageColor(totalStats.functions.pct)}`}>
                  <div className="text-2xl font-bold">{totalStats.functions.pct}%</div>
                  <div className="text-sm">Functions</div>
                  <div className="text-xs opacity-75">
                    {totalStats.functions.covered} / {totalStats.functions.total}
                  </div>
                </div>
                <div className={`p-4 rounded-lg ${getCoverageColor(totalStats.branches.pct)}`}>
                  <div className="text-2xl font-bold">{totalStats.branches.pct}%</div>
                  <div className="text-sm">Branches</div>
                  <div className="text-xs opacity-75">
                    {totalStats.branches.covered} / {totalStats.branches.total}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex-1">
                <label htmlFor="filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  🔍 Filtruj pliki:
                </label>
                <input
                  id="filter"
                  type="text"
                  value={filter}
                  onChange={(e) => setFilter((e.target as HTMLInputElement).value)}
                  placeholder="Wpisz nazwę komponentu (np. Button, Modal)..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  📊 Sortuj według:
                </label>
                <div className="flex gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy((e.target as HTMLSelectElement).value as any)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="path">Nazwa komponentu</option>
                    <option value="statements">Statements</option>
                    <option value="functions">Functions</option>
                    <option value="branches">Branches</option>
                  </select>
                  <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="px-3 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                    title={`Sortowanie ${sortOrder === 'asc' ? 'rosnące' : 'malejące'}`}
                  >
                    {sortOrder === 'asc' ? '↑' : '↓'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Files Table */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Komponent
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Statements
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Functions
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Branches
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Ogólne
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
                  {processedFilesData.files.map((file) => (
                    <tr key={file.fullPath} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          📦 {file.componentName}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                          {file.shortPath}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCoverageColor(file.stats.statements.pct)}`}>
                          {file.stats.statements.pct}%
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {file.stats.statements.covered}/{file.stats.statements.total}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCoverageColor(file.stats.functions.pct)}`}>
                          {file.stats.functions.pct}%
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {file.stats.functions.covered}/{file.stats.functions.total}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCoverageColor(file.stats.branches.pct)}`}>
                          {file.stats.branches.pct}%
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {file.stats.branches.covered}/{file.stats.branches.total}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCoverageColor(file.stats.lines.pct)}`}>
                          {file.stats.lines.pct}%
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {processedFilesData.files.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                {filter ? 'Brak plików pasujących do filtra.' : 'Brak danych o pokryciu.'}
              </div>
            )}
          </div>

          {/* Pagination */}
          {processedFilesData.totalPages > 1 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  Pokazano {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, processedFilesData.totalFiles)} z {processedFilesData.totalFiles} plików
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-2 text-sm bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    ← Poprzednia
                  </button>
                  
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: Math.min(5, processedFilesData.totalPages) }, (_, i) => {
                      const page = i + 1;
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                            currentPage === page
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                    {processedFilesData.totalPages > 5 && (
                      <>
                        {currentPage < processedFilesData.totalPages - 2 && <span className="text-gray-500">...</span>}
                        <button
                          onClick={() => setCurrentPage(processedFilesData.totalPages)}
                          className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                            currentPage === processedFilesData.totalPages
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'
                          }`}
                        >
                          {processedFilesData.totalPages}
                        </button>
                      </>
                    )}
                  </div>

                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === processedFilesData.totalPages}
                    className="px-3 py-2 text-sm bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Następna →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 space-y-2">
            <p>
              <strong>Znalezionych plików:</strong> {processedFilesData.totalFiles}
            </p>
            <p>
              Źródło danych: <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">coverage-final.json</code>
            </p>
            <p>
              Ostatnia aktualizacja: {new Date().toLocaleString('pl-PL')}
            </p>
          </div>
        </Stack>
      </div>
    </div>
  );
}
