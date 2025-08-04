import type { ComponentChildren } from 'preact'
import { createContext } from 'preact'
import { useContext, useEffect, useState, useCallback } from 'preact/hooks'
import type { ToastContextValue, ToastData, ToastPosition } from './Toast.types'

const ToastContext = createContext<ToastContextValue | null>(null)

export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

interface ToastProviderProps {
  children: ComponentChildren
  defaultPosition?: ToastPosition
  maxToasts?: number
}

export const ToastProvider = ({ 
  children, 
  defaultPosition = 'top-right',
  maxToasts = 5 
}: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastData[]>([])
  const [position, setPosition] = useState<ToastPosition>(defaultPosition)

  // Generate unique ID for toasts
  const generateId = useCallback(() => {
    return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }, [])

  // Add a new toast
  const addToast = useCallback((toastOptions: Omit<ToastData, 'id' | 'createdAt'>) => {
    const id = generateId()
    const newToast: ToastData = {
      ...toastOptions,
      id,
      createdAt: Date.now()
    }

    setToasts(prev => {
      const updated = [...prev, newToast]
      // Enforce max toasts limit
      if (updated.length > maxToasts) {
        return updated.slice(-maxToasts)
      }
      return updated
    })

    return id
  }, [generateId, maxToasts])

  // Remove a toast by ID
  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  // Clear all toasts
  const clearToasts = useCallback(() => {
    setToasts([])
  }, [])

  // Auto-dismiss toasts based on duration
  useEffect(() => {
    const timers: Record<string, NodeJS.Timeout> = {}

    toasts.forEach(toast => {
      if (toast.duration && toast.duration > 0) {
        timers[toast.id] = setTimeout(() => {
          removeToast(toast.id)
        }, toast.duration)
      }
    })

    return () => {
      Object.values(timers).forEach(timer => clearTimeout(timer))
    }
  }, [toasts, removeToast])

  const contextValue: ToastContextValue = {
    toasts,
    addToast,
    removeToast,
    clearToasts,
    setPosition,
    position
  }

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
    </ToastContext.Provider>
  )
}

// Helper functions for creating specific toast types
export const createToast = (toastOptions: Omit<ToastData, 'id' | 'createdAt'>) => {
  // This will be used by toast hook
  return toastOptions
}

export const createSuccessToast = (options: Omit<ToastData, 'id' | 'createdAt' | 'variant'>) => 
  createToast({ ...options, variant: 'success' })

export const createWarningToast = (options: Omit<ToastData, 'id' | 'createdAt' | 'variant'>) => 
  createToast({ ...options, variant: 'warning' })

export const createErrorToast = (options: Omit<ToastData, 'id' | 'createdAt' | 'variant'>) => 
  createToast({ ...options, variant: 'error' })

export const createInfoToast = (options: Omit<ToastData, 'id' | 'createdAt' | 'variant'>) => 
  createToast({ ...options, variant: 'info' })
