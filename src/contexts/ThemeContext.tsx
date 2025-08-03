import { createContext } from 'preact'
import { useContext, useState, useEffect } from 'preact/hooks'
import type { ComponentChildren } from 'preact'

export type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: ComponentChildren
  defaultTheme?: Theme
  onThemeChange?: (theme: Theme) => void
  getStoredTheme?: () => Theme | null
}

export function ThemeProvider({ 
  children, 
  defaultTheme = 'light',
  onThemeChange,
  getStoredTheme
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Check for provided storage function first
    if (getStoredTheme) {
      const stored = getStoredTheme()
      if (stored) return stored
    }
    
    // Check localStorage as fallback
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nebula-theme') as Theme
      if (saved && (saved === 'light' || saved === 'dark')) {
        return saved
      }
      // Check system preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark'
      }
    }
    return defaultTheme
  })

  useEffect(() => {
    const root = window.document.documentElement
    
    // Remove previous theme classes
    root.classList.remove('light', 'dark')
    
    // Add current theme class
    root.classList.add(theme)
    
    // Call external callback if provided
    if (onThemeChange) {
      onThemeChange(theme)
    } else {
      // Fallback to localStorage
      localStorage.setItem('nebula-theme', theme)
    }
  }, [theme, onThemeChange])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
  }

  const toggleTheme = () => {
    setThemeState(prev => prev === 'light' ? 'dark' : 'light')
  }

  const value = {
    theme,
    setTheme,
    toggleTheme
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
