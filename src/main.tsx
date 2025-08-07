import { render } from 'preact'
import './index.css'
import { App } from './app.tsx'
import { SimpleThemeProvider, ToastProvider, ToastManager } from '../nebula'

// Universal localStorage functions for theme management
export const themeStorage = {
  getTheme: (): 'light' | 'dark' | null => {
    try {
      const stored = localStorage.getItem('nebula-theme')
      return stored === 'light' || stored === 'dark' ? stored : null
    } catch {
      return null
    }
  },
  
  setTheme: (theme: 'light' | 'dark'): void => {
    try {
      localStorage.setItem('nebula-theme', theme)
    } catch {
      // Silently fail if localStorage is not available
    }
  },
  
  removeTheme: (): void => {
    try {
      localStorage.removeItem('nebula-theme')
    } catch {
      // Silently fail if localStorage is not available
    }
  }
}

render(
  <SimpleThemeProvider
    onThemeChange={themeStorage.setTheme}
    getStoredTheme={themeStorage.getTheme}
  >
    <ToastProvider defaultPosition="top-right" maxToasts={5}>
      <App />
      <ToastManager />
    </ToastProvider>
  </SimpleThemeProvider>, 
  document.getElementById('app')!
)
