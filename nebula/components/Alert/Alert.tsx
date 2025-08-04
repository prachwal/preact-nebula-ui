import { cn } from '@/utils/cn'
import type { AlertProps } from './Alert.types'

const alertVariants = {
  info: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200',
  success: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200',
  error: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200'
}

const alertSizes = {
  sm: 'p-3 text-sm',
  md: 'p-4 text-base',
  lg: 'p-6 text-lg'
}

const iconColors = {
  info: 'text-blue-400 dark:text-blue-300',
  success: 'text-green-400 dark:text-green-300',
  warning: 'text-yellow-400 dark:text-yellow-300',
  error: 'text-red-400 dark:text-red-300'
}

const dismissButtonColors = {
  info: 'text-blue-400 hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-100',
  success: 'text-green-400 hover:text-green-600 dark:text-green-300 dark:hover:text-green-100',
  warning: 'text-yellow-400 hover:text-yellow-600 dark:text-yellow-300 dark:hover:text-yellow-100',
  error: 'text-red-400 hover:text-red-600 dark:text-red-300 dark:hover:text-red-100'
}

// Default icons for each variant
const defaultIcons = {
  info: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
  ),
  success: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
  )
}

export function Alert({
  variant = 'info',
  size = 'md',
  title,
  dismissible = false,
  icon = true,
  actions,
  onDismiss,
  children,
  className,
  'data-testid': testId,
  ...props
}: AlertProps) {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && dismissible && onDismiss) {
      onDismiss()
    }
  }

  const renderIcon = () => {
    if (icon === false) return null
    if (icon === true) return defaultIcons[variant]
    return icon
  }

  return (
    <div
      className={cn(
        // Base styles
        'border rounded-lg',
        'focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2',
        // Variant styles
        alertVariants[variant],
        // Size styles
        alertSizes[size],
        className
      )}
      role="alert"
      aria-live="polite"
      data-testid={testId}
      onKeyDown={handleKeyDown}
      {...props}
    >
      <div className="flex">
        {/* Icon */}
        {renderIcon() && (
          <div className={cn('flex-shrink-0', iconColors[variant])}>
            {renderIcon()}
          </div>
        )}

        {/* Content */}
        <div className={cn('flex-1', renderIcon() && 'ml-3')}>
          {/* Title */}
          {title && (
            <h3 className="text-sm font-medium mb-1">
              {title}
            </h3>
          )}

          {/* Message */}
          <div className={cn(
            title ? 'text-sm' : '',
            !title && size === 'sm' ? 'text-sm' : '',
            !title && size === 'lg' ? 'text-lg' : ''
          )}>
            {children}
          </div>

          {/* Actions */}
          {actions && (
            <div className="mt-3">
              {actions}
            </div>
          )}
        </div>

        {/* Dismiss button */}
        {dismissible && onDismiss && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                className={cn(
                  'inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
                  'hover:bg-black/5 dark:hover:bg-white/5',
                  dismissButtonColors[variant]
                )}
                onClick={onDismiss}
                aria-label="Dismiss alert"
              >
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
