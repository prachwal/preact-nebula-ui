import { createPortal } from 'preact/compat'
import { useEffect, useState } from 'preact/hooks'
import { cn } from '../../utils/cn'
import type { ToastProps } from './Toast.types'

export interface ToastContainerProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
  maxToasts?: number
  className?: string
}

interface ToastItem extends ToastProps {
  id: string
  isOpen: boolean
}

// Global toast state
let toastState: {
  toasts: ToastItem[]
  addToast: (toast: Omit<ToastItem, 'id' | 'isOpen'>) => void
  removeToast: (id: string) => void
  listeners: Set<() => void>
} = {
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
  listeners: new Set()
}

let toastIdCounter = 0

// Initialize toast state
function initializeToastState() {
  const listeners = new Set<() => void>()
  
  const addToast = (toast: Omit<ToastItem, 'id' | 'isOpen'>) => {
    const id = `toast-${++toastIdCounter}`
    const newToast: ToastItem = {
      ...toast,
      id,
      isOpen: true
    }
    
    toastState.toasts = [...toastState.toasts, newToast]
    notifyListeners()
  }
  
  const removeToast = (id: string) => {
    toastState.toasts = toastState.toasts.filter(toast => toast.id !== id)
    notifyListeners()
  }
  
  const notifyListeners = () => {
    listeners.forEach(listener => listener())
  }
  
  toastState = {
    toasts: [],
    addToast,
    removeToast,
    listeners
  }
}

// Initialize on first import
initializeToastState()

export function ToastContainer({
  position = 'top-right',
  maxToasts = 5,
  className
}: ToastContainerProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  
  useEffect(() => {
    const updateToasts = () => {
      setToasts([...toastState.toasts])
    }
    
    toastState.listeners.add(updateToasts)
    
    return () => {
      toastState.listeners.delete(updateToasts)
    }
  }, [])
  
  const handleToastDismiss = (id: string) => {
    toastState.removeToast(id)
  }
  
  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2'
  }
  
  const visibleToasts = toasts.slice(-maxToasts)
  
  if (visibleToasts.length === 0) {
    return null
  }
  
  const container = (
    <div
      className={cn(
        'fixed z-50 pointer-events-none',
        positionClasses[position],
        className
      )}
    >
      <div className="flex flex-col gap-2">
        {visibleToasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto animate-fade-in duration-300"
          >
            <ToastComponent
              {...toast}
              onDismiss={() => handleToastDismiss(toast.id)}
            />
          </div>
        ))}
      </div>
    </div>
  )
  
  return createPortal(container, document.body)
}

// Toast component for container
function ToastComponent({
  variant = 'default',
  size = 'md',
  title,
  children,
  dismissible = true,
  duration = 5000,
  icon = true,
  actions,
  onDismiss,
  className,
  ...props
}: ToastProps) {
  // Auto-dismiss functionality
  useEffect(() => {
    if (duration && duration > 0) {
      const timer = setTimeout(() => {
        onDismiss?.()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, onDismiss])

  const handleDismiss = () => {
    onDismiss?.()
  }

  // Icon components
  const InfoIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
  )

  const SuccessIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  )

  const WarningIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  )

  const ErrorIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
  )

  const CloseIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )

  const getVariantIcon = (variant: string) => {
    switch (variant) {
      case 'success':
        return <SuccessIcon />
      case 'warning':
        return <WarningIcon />
      case 'error':
        return <ErrorIcon />
      case 'info':
        return <InfoIcon />
      default:
        return <InfoIcon />
    }
  }

  const baseClasses = [
    'relative flex items-start gap-3 p-4 rounded-lg shadow-lg border',
    'bg-white dark:bg-gray-800',
    'border-gray-200 dark:border-gray-700',
    'transition-all duration-200'
  ]

  const variantClasses = {
    default: 'border-gray-200 dark:border-gray-700',
    info: 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950',
    success: 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950',
    warning: 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950',
    error: 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950'
  }

  const iconColorClasses = {
    default: 'text-gray-500 dark:text-gray-400',
    info: 'text-blue-500 dark:text-blue-400',
    success: 'text-green-500 dark:text-green-400',
    warning: 'text-yellow-500 dark:text-yellow-400',
    error: 'text-red-500 dark:text-red-400'
  }

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant as keyof typeof variantClasses],
        sizeClasses[size as keyof typeof sizeClasses],
        className
      )}
      {...props}
    >
      {icon && (
        <div className={cn(
          'flex-shrink-0 mt-0.5',
          iconColorClasses[variant as keyof typeof iconColorClasses]
        )}>
          {getVariantIcon(variant)}
        </div>
      )}
      
      <div className="flex-1 min-w-0">
        {title && (
          <div className="font-medium text-gray-900 dark:text-white mb-1">
            {title}
          </div>
        )}
        {children && (
          <div className="text-gray-600 dark:text-gray-300">
            {children}
          </div>
        )}
        {actions && (
          <div className="mt-3 flex gap-2">
            {actions}
          </div>
        )}
      </div>
      
      {dismissible && (
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          aria-label="Dismiss notification"
        >
          <CloseIcon />
        </button>
      )}
    </div>
  )
}

// Export toast functions
export const toast = {
  show: (props: Omit<ToastItem, 'id' | 'isOpen'>) => {
    toastState.addToast(props)
  },
  
  info: (title: string, content?: string) => {
    toastState.addToast({
      variant: 'info',
      title,
      children: content
    })
  },
  
  success: (title: string, content?: string) => {
    toastState.addToast({
      variant: 'success',
      title,
      children: content
    })
  },
  
  warning: (title: string, content?: string) => {
    toastState.addToast({
      variant: 'warning',
      title,
      children: content
    })
  },
  
  error: (title: string, content?: string) => {
    toastState.addToast({
      variant: 'error',
      title,
      children: content
    })
  }
}
