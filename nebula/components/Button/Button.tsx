import { cn } from '@/utils/cn'
import { Spinner } from '../Spinner'
import type { ButtonProps } from './Button.types'

const buttonVariants = {
  primary: 'bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800 text-white dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:bg-blue-700 dark:active:bg-blue-800',
  secondary: 'bg-gray-200 hover:bg-gray-300 focus:bg-gray-300 active:bg-gray-400 text-gray-900 dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:bg-gray-500 dark:active:bg-gray-400 dark:text-white',
  outline: 'border-2 border-gray-300 hover:border-gray-400 focus:border-gray-400 active:border-gray-500 bg-transparent hover:bg-gray-50 focus:bg-gray-50 active:bg-gray-100 text-gray-900 dark:text-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:focus:border-gray-500 dark:active:border-gray-400 dark:hover:bg-gray-800 dark:focus:bg-gray-800 dark:active:bg-gray-700',
  ghost: 'hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-200 bg-transparent text-gray-900 dark:text-gray-100 dark:hover:bg-gray-800 dark:focus:bg-gray-800 dark:active:bg-gray-700',
  destructive: 'bg-red-600 hover:bg-red-700 focus:bg-red-700 active:bg-red-800 text-white dark:bg-red-600 dark:hover:bg-red-700 dark:focus:bg-red-700 dark:active:bg-red-800'
}

const buttonSizes = {
  sm: 'px-2.5 py-1 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3.5 text-lg',
  xl: 'px-8 py-5 text-xl'
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading

  return (
    <button
      className={cn(
        // Base styles
        'inline-flex items-center justify-center rounded-md font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:pointer-events-none',
        // Variant styles
        buttonVariants[variant],
        // Size styles
        buttonSizes[size],
        // Full width
        fullWidth && 'w-full',
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {loading && <Spinner size={size === 'sm' ? 'xs' : size === 'md' ? 'sm' : size === 'lg' ? 'md' : 'lg'} className="mr-2" />}
      {leftIcon && !loading && <span class="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && !loading && <span class="ml-2">{rightIcon}</span>}
    </button>
  )
}
