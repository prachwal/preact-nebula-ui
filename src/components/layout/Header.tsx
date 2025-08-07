import { useSimpleTheme } from '../../../nebula'
import { route } from 'preact-router'
import { Avatar } from '../../../nebula'
import preactLogo from '../../assets/preact.svg'
import viteLogo from '/vite.svg'

export function Header() {
  const { theme, toggleTheme } = useSimpleTheme()

  return (
    <header class="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          {/* Back to Home */}
          <button 
            onClick={() => route('/')}
            class="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <img src={viteLogo} class="h-8 w-8" alt="Vite logo" />
            <img src={preactLogo} class="h-8 w-8" alt="Preact logo" />
            <h1 class="text-xl font-bold text-gray-900 dark:text-white">Nebula UI</h1>
          </button>
          
          {/* User Section */}
          <div class="flex items-center gap-4">
            {/* User Avatar */}
            <Avatar 
              name="Developer User"
              size="md" 
              className="hover:ring-2 hover:ring-blue-500 transition-all cursor-pointer"
            />
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <svg class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
