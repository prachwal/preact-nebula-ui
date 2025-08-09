import { useSimpleTheme, Avatar } from '../../../nebula'
import { route } from 'preact-router'
import preactLogo from '../../assets/preact.svg'
import viteLogo from '../../assets/vite.svg'

interface HeaderProps {
  currentPath?: string
}

export function Header({ currentPath = '/' }: Readonly<HeaderProps>) {
  const { theme, toggleTheme } = useSimpleTheme()

  const isActive = (path: string) => {
    if (path === '/' && currentPath === '/') return true
    if (path === '/documentation' && currentPath?.startsWith('/documentation')) return true
    return false
  }

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={() => route('/')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <img src={viteLogo} className="h-8 w-8" alt="Vite logo" />
            <img src={preactLogo} className="h-8 w-8" alt="Preact logo" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Nebula UI</h1>
          </button>

          {/* Navigation */}
          <nav className="flex items-center gap-1">
            <button
              onClick={() => route('/')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('/')
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
            >
              🏠 Home
            </button>
            <button
              onClick={() => route('/documentation')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('/documentation')
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
            >
              📚 Docs
            </button>
          </nav>

          {/* User Section */}
          <div className="flex items-center gap-4">
            {/* User Avatar */}
            <Avatar
              name="Developer User"
              size="md"
              className="hover:ring-2 hover:ring-blue-500 transition-all cursor-pointer"
            />

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
