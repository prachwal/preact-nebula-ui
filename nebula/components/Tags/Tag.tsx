import { cn } from '../../utils/cn'
import type { TagProps } from './types'

export function Tag({
  children,
  icon,
  color = 'default',
  size = 'md',
  variant = 'filled',
  disabled = false,
  closable = false,
  onClose,
  onClick,
  className,
  style,
  ...props
}: TagProps) {
  
  const handleClose = (e: Event) => {
    e.preventDefault()
    e.stopPropagation()
    if (!disabled && onClose) {
      onClose()
    }
  }

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick()
    }
  }

  const sizeClasses = {
    sm: 'text-xs px-2 py-1 gap-1',
    md: 'text-sm px-3 py-1.5 gap-1.5',
    lg: 'text-base px-4 py-2 gap-2'
  }

  const colorClasses = {
    filled: {
      default: 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200',
      primary: 'bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200',
      success: 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200',
      warning: 'bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-200',
      error: 'bg-red-100 text-red-700 border-red-200 hover:bg-red-200',
      info: 'bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100'
    },
    outlined: {
      default: 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50',
      primary: 'bg-white text-blue-700 border-blue-300 hover:bg-blue-50',
      success: 'bg-white text-green-700 border-green-300 hover:bg-green-50',
      warning: 'bg-white text-yellow-700 border-yellow-300 hover:bg-yellow-50',
      error: 'bg-white text-red-700 border-red-300 hover:bg-red-50',
      info: 'bg-white text-blue-600 border-blue-200 hover:bg-blue-50'
    },
    subtle: {
      default: 'bg-gray-50 text-gray-600 border-transparent hover:bg-gray-100',
      primary: 'bg-blue-50 text-blue-600 border-transparent hover:bg-blue-100',
      success: 'bg-green-50 text-green-600 border-transparent hover:bg-green-100',
      warning: 'bg-yellow-50 text-yellow-600 border-transparent hover:bg-yellow-100',
      error: 'bg-red-50 text-red-600 border-transparent hover:bg-red-100',
      info: 'bg-blue-25 text-blue-600 border-transparent hover:bg-blue-50'
    }
  }

  const tagClasses = cn(
    'nebula-tag',
    'inline-flex items-center justify-center',
    'border rounded-md',
    'font-medium transition-colors',
    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1',
    sizeClasses[size],
    colorClasses[variant][color],
    {
      'cursor-pointer': onClick && !disabled,
      'opacity-50 cursor-not-allowed': disabled
    },
    className
  )

  const closeButtonClasses = cn(
    'nebula-tag-close',
    'inline-flex items-center justify-center',
    'rounded-full transition-colors',
    'hover:bg-black hover:bg-opacity-10',
    'focus:outline-none focus:ring-1 focus:ring-current',
    size === 'sm' ? 'w-3 h-3 ml-1' : size === 'md' ? 'w-4 h-4 ml-1' : 'w-5 h-5 ml-1'
  )

  return (
    <span
      className={tagClasses}
      onClick={handleClick}
      tabIndex={onClick && !disabled ? 0 : undefined}
      {...props}
    >
      {icon && (
        <span className="nebula-tag-icon flex-shrink-0">
          {icon}
        </span>
      )}
      
      <span className="nebula-tag-content">
        {children}
      </span>
      
      {closable && (
        <button
          type="button"
          className={closeButtonClasses}
          onClick={handleClose}
          aria-label="Remove tag"
          disabled={disabled}
        >
          <svg
            className="w-full h-full"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </span>
  )
}
