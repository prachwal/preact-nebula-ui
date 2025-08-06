import { cn } from '../../utils/cn'
import type { StepProps } from './types'

export function Step({
  title,
  description,
  icon,
  status = 'wait',
  disabled = false,
  index = 0,
  isLast = false,
  direction = 'horizontal',
  size = 'default',
  progressDot = false,
  onClick,
  className,
  style,
  ...props
}: StepProps) {
  
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick(index)
    }
  }
  
  const stepClasses = cn(
    'step',
    'relative flex items-start',
    direction === 'horizontal' ? 'flex-1' : 'flex-col',
    {
      'cursor-pointer': !disabled && onClick,
      'opacity-50': disabled,
      'step-wait': status === 'wait',
      'step-process': status === 'process',
      'step-finish': status === 'finish',
      'step-error': status === 'error',
      'step-small': size === 'small',
    },
    className
  )
  
  const iconContainerClasses = cn(
    'step-icon-container',
    'flex items-center justify-center rounded-full border-2 bg-white',
    size === 'small' ? 'w-6 h-6 text-xs' : 'w-8 h-8 text-sm',
    {
      'border-gray-300 text-gray-400': status === 'wait',
      'border-blue-500 bg-blue-500 text-white': status === 'process',
      'border-green-500 bg-green-500 text-white': status === 'finish',
      'border-red-500 bg-red-500 text-white': status === 'error',
    }
  )
  
  const connectorClasses = cn(
    'step-connector',
    direction === 'horizontal' ? 'absolute left-1/2 top-4 h-0.5 w-full' : 'absolute left-4 top-8 w-0.5 h-full',
    {
      'bg-gray-300': status === 'wait',
      'bg-blue-500': status === 'process',
      'bg-green-500': status === 'finish',
      'bg-red-500': status === 'error',
    }
  )
  
  const renderIcon = () => {
    if (typeof progressDot === 'function') {
      return progressDot(index, status)
    }
    
    if (progressDot) {
      return (
        <div className={cn(
          'w-2 h-2 rounded-full',
          {
            'bg-gray-400': status === 'wait',
            'bg-blue-500': status === 'process',
            'bg-green-500': status === 'finish',
            'bg-red-500': status === 'error',
          }
        )} />
      )
    }
    
    if (icon) {
      return icon
    }
    
    if (status === 'finish') {
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      )
    }
    
    if (status === 'error') {
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      )
    }
    
    return index + 1
  }
  
  return (
    <div
      className={stepClasses}
      onClick={handleClick}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-current={status === 'process' ? 'step' : undefined}
      {...props}
    >
      {/* Connector line */}
      {!isLast && (
        <div className={connectorClasses} aria-hidden="true" />
      )}
      
      {/* Icon container */}
      <div className={iconContainerClasses}>
        {renderIcon()}
      </div>
      
      {/* Content */}
      <div className={cn(
        'step-content ml-3',
        direction === 'horizontal' ? 'text-center' : 'text-left'
      )}>
        <div className={cn(
          'step-title font-medium',
          size === 'small' ? 'text-sm' : 'text-base',
          {
            'text-gray-500': status === 'wait',
            'text-blue-600': status === 'process',
            'text-green-600': status === 'finish',
            'text-red-600': status === 'error',
          }
        )}>
          {title}
        </div>
        
        {description && (
          <div className={cn(
            'step-description text-gray-600 dark:text-gray-400',
            size === 'small' ? 'text-xs mt-1' : 'text-sm mt-2'
          )}>
            {description}
          </div>
        )}
      </div>
    </div>
  )
}
