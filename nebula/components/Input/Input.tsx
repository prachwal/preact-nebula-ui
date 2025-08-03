import { forwardRef } from 'preact/compat'
import type { Ref } from 'preact'
import { cn } from '@/utils/cn' 
import type { InputProps } from './Input.types'

const inputVariants = {
  default: 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white',
  error: 'border-red-500 focus:border-red-500 focus:ring-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white',
  success: 'border-green-500 focus:border-green-500 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
}

// Use standardized input sizes with better contrast
const inputSizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-3 py-2 text-base', 
  lg: 'px-4 py-3 text-lg'
}

// Icon sizes consistent with design system
const iconSizes = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',  
  lg: 'w-6 h-6'
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = 'default',
      size = 'md',
      type = 'text',
      disabled = false,
      required = false,
      leftIcon,
      rightIcon,
      error,
      helperText,
      isInvalid,
      isValid,
      className,
      'data-testid': testId,
      onFocus,
      onBlur,
      onChange,
      ...restProps
    },
    ref: Ref<HTMLInputElement>
  ) => {
    // Determine actual variant based on props
    const actualVariant = error || isInvalid ? 'error' : isValid ? 'success' : variant

    const baseClasses = cn(
      // Base input styles
      'block w-full rounded-md border shadow-sm transition-colors duration-200',
      'focus:outline-none focus:ring-1',
      'disabled:cursor-not-allowed disabled:bg-gray-50 dark:disabled:bg-gray-600 disabled:text-gray-500',
      'placeholder:text-gray-400 dark:placeholder:text-gray-500',
      
      // Size styles with proper icon padding
      !leftIcon && !rightIcon && inputSizes[size],
      leftIcon && !rightIcon && size === 'sm' && 'pl-10 pr-3 py-1.5 text-sm',
      leftIcon && !rightIcon && size === 'md' && 'pl-10 pr-3 py-2 text-base',
      leftIcon && !rightIcon && size === 'lg' && 'pl-12 pr-4 py-3 text-lg',
      !leftIcon && rightIcon && size === 'sm' && 'pl-3 pr-10 py-1.5 text-sm',
      !leftIcon && rightIcon && size === 'md' && 'pl-3 pr-10 py-2 text-base', 
      !leftIcon && rightIcon && size === 'lg' && 'pl-4 pr-12 py-3 text-lg',
      leftIcon && rightIcon && size === 'sm' && 'pl-10 pr-10 py-1.5 text-sm',
      leftIcon && rightIcon && size === 'md' && 'pl-10 pr-10 py-2 text-base',
      leftIcon && rightIcon && size === 'lg' && 'pl-12 pr-12 py-3 text-lg',
      
      // Variant styles
      inputVariants[actualVariant],
      
      className
    )

    const containerClasses = 'relative'
    
    const leftIconClasses = cn(
      'absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none',
      iconSizes[size],
      disabled && 'text-gray-300 dark:text-gray-600'
    )
    
    const rightIconClasses = cn(
      'absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none',
      iconSizes[size],
      disabled && 'text-gray-300 dark:text-gray-600'
    )

    return (
      <div className="space-y-1">
        <div className={containerClasses}>
          {leftIcon && (
            <div className={leftIconClasses} aria-hidden="true">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            type={type}
            disabled={disabled}
            required={required}
            className={baseClasses}
            aria-invalid={error || isInvalid ? 'true' : 'false'}
            aria-describedby={
              error || helperText 
                ? `${restProps.id || 'input'}-description` 
                : undefined
            }
            data-testid={testId}
            role="textbox"
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={onChange}
            {...restProps}
          />
          
          {rightIcon && (
            <div className={rightIconClasses} aria-hidden="true">
              {rightIcon}
            </div>
          )}
        </div>
        
        {(error || helperText) && (
          <div
            id={`${restProps.id || 'input'}-description`}
            className={cn(
              'text-sm',
              error ? 'text-red-600' : 'text-gray-600'
            )}
            role={error ? 'alert' : undefined}
            aria-live={error ? 'polite' : undefined}
          >
            {error || helperText}
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
