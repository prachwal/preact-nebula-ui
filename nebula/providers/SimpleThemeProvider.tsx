import { createContext } from 'preact'
import { useContext, useState, useEffect } from 'preact/hooks'
import type { ComponentChildren } from 'preact'

export type SimpleTheme = 'light' | 'dark'

interface SimpleThemeContextType {
  theme: SimpleTheme
  toggleTheme: () => void
  setTheme: (theme: SimpleTheme) => void
}

const SimpleThemeContext = createContext<SimpleThemeContextType | undefined>(undefined)

export function useSimpleTheme() {
  const context = useContext(SimpleThemeContext)
  if (context === undefined) {
    throw new Error('useSimpleTheme must be used within a SimpleThemeProvider')
  }
  return context
}

export interface SimpleThemeProviderProps {
  children: ComponentChildren
  defaultTheme?: SimpleTheme
  onThemeChange?: (theme: SimpleTheme) => void
  getStoredTheme?: () => SimpleTheme | null
  storageKey?: string
}

export function SimpleThemeProvider({ 
  children, 
  defaultTheme = 'light',
  onThemeChange,
  getStoredTheme,
  storageKey = 'nebula-theme'
}: SimpleThemeProviderProps) {
  const [theme, setThemeState] = useState<SimpleTheme>(() => {
    // Check for provided storage function first
    if (getStoredTheme) {
      const stored = getStoredTheme()
      if (stored) return stored
    }
    
    // Check localStorage as fallback
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(storageKey) as SimpleTheme
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
      localStorage.setItem(storageKey, theme)
    }
  }, [theme, onThemeChange, storageKey])

  const setTheme = (newTheme: SimpleTheme) => {
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
    <SimpleThemeContext.Provider value={value}>
      {children}
    </SimpleThemeContext.Provider>
  )
}
