import { cn } from '@/utils/cn'
import type { LabelProps } from './Label.types'

const labelSizes = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg'
}

export const Label = ({
  required = false,
  disabled = false,
  size = 'md',
  className,
  children,
  'data-testid': testId,
  ...props
}: LabelProps) => {
  const baseClasses = cn(
    // Base label styles
    'block font-medium leading-6',
    
    // Size styles
    labelSizes[size],
    
    // State styles
    disabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-900',
    
    className
  )

  return (
    <label
      className={baseClasses}
      data-testid={testId}
      {...props}
    >
      {children}
      {required && (
        <span
          className="ml-1 text-red-500"
          aria-label="required"
          role="presentation"
        >
          *
        </span>
      )}
    </label>
  )
}

Label.displayName = 'Label'
