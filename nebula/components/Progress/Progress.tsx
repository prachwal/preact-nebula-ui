import { cn } from '@/utils/cn'
import type { ProgressProps } from './Progress.types'

const progressColors = {
  primary: 'bg-blue-600',
  secondary: 'bg-gray-600',
  success: 'bg-green-600',
  warning: 'bg-yellow-600',
  error: 'bg-red-600'
}

const progressBackgrounds = {
  primary: 'bg-blue-200 dark:bg-blue-900',
  secondary: 'bg-gray-200 dark:bg-gray-700',
  success: 'bg-green-200 dark:bg-green-900',
  warning: 'bg-yellow-200 dark:bg-yellow-900',
  error: 'bg-red-200 dark:bg-red-900'
}

const linearSizes = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3'
}

const circularSizes = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16'
}

const strokeWidths = {
  sm: 2,
  md: 3,
  lg: 4
}

export function Progress({
  variant = 'linear',
  size = 'md',
  color = 'primary',
  value = 0,
  indeterminate = false,
  showLabel = false,
  label,
  children,
  className,
  'data-testid': testId,
  ...props
}: ProgressProps) {
  // Clamp value between 0 and 100
  const clampedValue = Math.min(Math.max(value, 0), 100)
  
  // Generate label text
  const getLabelText = () => {
    if (label) return label
    if (showLabel && !indeterminate) return `${Math.round(clampedValue)}%`
    return null
  }

  if (variant === 'circular') {
    const radius = size === 'sm' ? 14 : size === 'md' ? 20 : 26
    const strokeWidth = strokeWidths[size]
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = indeterminate ? 0 : circumference - (clampedValue / 100) * circumference

    return (
      <div
        className={cn(
          'relative inline-flex items-center justify-center',
          circularSizes[size],
          className
        )}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={indeterminate ? 'Loading' : `Progress: ${clampedValue}%`}
        data-testid={testId}
        {...props}
      >
        <svg
          className="transform -rotate-90"
          width="100%"
          height="100%"
          viewBox={`0 0 ${(radius + strokeWidth) * 2} ${(radius + strokeWidth) * 2}`}
        >
          {/* Background circle */}
          <circle
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className={cn('opacity-20', progressBackgrounds[color])}
          />
          
          {/* Progress circle */}
          <circle
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className={cn(
              progressColors[color],
              indeterminate && 'animate-spin origin-center'
            )}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: indeterminate ? 'none' : 'stroke-dashoffset 0.3s ease-in-out'
            }}
          />
        </svg>
        
        {/* Label */}
        {getLabelText() && (
          <div className={cn(
            'absolute inset-0 flex items-center justify-center text-xs font-medium',
            size === 'sm' && 'text-xs',
            size === 'md' && 'text-sm',
            size === 'lg' && 'text-base'
          )}>
            {getLabelText()}
          </div>
        )}
        
        {/* Additional content */}
        {children && (
          <div className="mt-2 text-center">
            {children}
          </div>
        )}
      </div>
    )
  }

  // Linear progress
  return (
    <div
      className={cn('w-full', className)}
      data-testid={testId}
    >
      {/* Label */}
      {getLabelText() && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {getLabelText()}
          </span>
        </div>
      )}
      
      {/* Progress bar */}
      <div
        className={cn(
          'w-full rounded-full overflow-hidden',
          linearSizes[size],
          progressBackgrounds[color]
        )}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={indeterminate ? 'Loading' : `Progress: ${clampedValue}%`}
        {...props}
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-300 ease-in-out',
            progressColors[color],
            indeterminate && 'animate-pulse'
          )}
          style={{
            width: indeterminate ? '100%' : `${clampedValue}%`
          }}
        />
      </div>
      
      {/* Additional content */}
      {children && (
        <div className="mt-2">
          {children}
        </div>
      )}
    </div>
  )
}
