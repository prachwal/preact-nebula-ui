import { forwardRef } from 'preact/compat'
import { cn } from '../../utils/cn'
import type { StepProps } from './types'

export const Step = forwardRef<HTMLDivElement, StepProps>(({
  title,
  description,
  icon,
  status = 'wait',
  disabled = false,
  index = 0,
  isLast = false,
  totalSteps = 4,
  direction = 'horizontal',
  size = 'default',
  progressDot = false,
  onClick,
  className,
  style,
  ...props
}, ref) => {
  
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick(index)
    }
  }
  
  const stepClasses = cn(
    'step',
    'relative flex',
    direction === 'horizontal' ? 'flex-1 flex-col items-center' : 'flex-row items-start',
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
            'flex items-center justify-center rounded-full border-2 relative z-10 shrink-0',
            size === 'small' ? 'w-7 h-7 text-xs' : 'w-9 h-9 text-sm font-medium',
            {
                // WAIT: białe tło, ciemny szary tekst, szara ramka
                'bg-white border-gray-300 text-gray-700 dark:bg-gray-900 dark:border-gray-600 dark:text-gray-400': status === 'wait',
                // PROCESS: niebieska ramka, białe tło, niebieski tekst
                'bg-white border-blue-500 text-blue-700 dark:bg-blue-500 dark:text-white': status === 'process',
                // FINISH: zielona ramka, białe tło, zielony tekst
                'bg-white border-green-500 text-green-700 dark:bg-green-500 dark:text-white': status === 'finish',
                // ERROR: czerwona ramka, białe tło, czerwony tekst
                'bg-white border-red-500 text-red-600 dark:bg-red-500 dark:text-white': status === 'error',
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
      ref={ref}
      className={stepClasses}
      onClick={handleClick}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-current={status === 'process' ? 'step' : undefined}
      {...props}
    >
      {/* Icon container */}
      <div className="relative">
        <div className={iconContainerClasses}>
          {renderIcon()}
        </div>
      </div>
      
      {/* Content */}
      <div className={cn(
        'step-content',
        direction === 'horizontal' ? 'mt-4 text-center max-w-32' : 'ml-3 text-left'
      )}>
        <div className={cn(
          'step-title font-medium leading-tight',
          size === 'small' ? 'text-sm' : 'text-base',
          {
            'text-gray-600 dark:text-gray-400': status === 'wait',
            'text-blue-700 dark:text-blue-400': status === 'process',
            'text-green-700 dark:text-green-400': status === 'finish',
            'text-red-700 dark:text-red-400': status === 'error',
          }
        )}>
          {title}
        </div>
        
        {description && (
          <div className={cn(
            'step-description text-gray-600 dark:text-gray-400 leading-tight',
            size === 'small' ? 'text-xs mt-1' : 'text-sm mt-2'
          )}>
            {description}
          </div>
        )}
      </div>
    </div>
  )
})

Step.displayName = 'Step'
