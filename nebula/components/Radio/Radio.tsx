import { createContext } from 'preact'
import { useContext, forwardRef } from 'preact/compat'
import { useRef, useCallback } from 'preact/hooks'
import { cn } from '../../utils/cn'
import type { RadioProps, RadioGroupContextType } from './Radio.types'

const radioStyles = {
  base: 'relative inline-flex items-center justify-center border-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
  sizes: {
    sm: 'w-4 h-4 text-xs',
    md: 'w-5 h-5 text-sm',
    lg: 'w-6 h-6 text-base'
  },
  variants: {
    default: {
      unchecked: 'border-gray-300 bg-white hover:border-gray-400 dark:border-gray-600 dark:bg-gray-800 dark:hover:border-gray-500',
      checked: 'border-blue-600 bg-white hover:border-blue-700 dark:border-blue-500 dark:bg-gray-800 dark:hover:border-blue-400'
    },
    outlined: {
      unchecked: 'border-gray-300 bg-transparent hover:border-blue-600 dark:border-gray-600 dark:hover:border-blue-500',
      checked: 'border-blue-600 bg-transparent hover:bg-blue-50 dark:border-blue-500 dark:hover:bg-blue-950'
    }
  },
  focus: 'focus:ring-blue-500 dark:focus:ring-blue-400',
  error: 'border-red-500 focus:ring-red-500 dark:border-red-400 dark:focus:ring-red-400'
}

const labelStyles = {
  base: 'text-gray-900 dark:text-gray-100 cursor-pointer select-none',
  sizes: {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  },
  disabled: 'text-gray-500 dark:text-gray-400 cursor-not-allowed',
  error: 'text-red-600 dark:text-red-400'
}

const descriptionStyles = {
  base: 'text-gray-600 dark:text-gray-400 mt-1',
  sizes: {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  },
  error: 'text-red-500 dark:text-red-400'
}

// Radio context for group management
export const RadioContext = createContext<RadioGroupContextType | null>(null)

// Radio indicator dot
const RadioIndicator = ({ size, checked }: { size: 'sm' | 'md' | 'lg', checked: boolean }) => {
  const dotSize = {
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3'
  }[size]
  
  return (
    <div 
      class={cn(
        'rounded-full bg-blue-600 dark:bg-blue-500 transition-all duration-200',
        dotSize,
        checked ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
      )}
    />
  )
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      value,
      size = 'md',
      variant = 'default',
      label,
      description,
      error = false,
      errorMessage,
      children,
      labelPosition = 'right',
      className,
      disabled,
      checked,
      name,
      id,
      onChange,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const finalRef = (ref as any) || inputRef
    const context = useContext(RadioContext)

    // Generate unique ID if not provided
    const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`

    // Use context values if available, otherwise use props
    const effectiveSize = context?.size || size
    const effectiveVariant = context?.variant || variant
    const effectiveDisabled = context?.disabled || disabled
    const effectiveError = context?.error || error
    const effectiveName = context?.name || name
    const effectiveChecked = context?.value ? context.value === value : checked

    // Handle visual element click
    const handleVisualClick = useCallback(() => {
      if (!effectiveDisabled && finalRef.current) {
        finalRef.current.click()
      }
    }, [finalRef, effectiveDisabled])

    // Handle change with context
    const handleChange = useCallback((event: Event) => {
      if (effectiveDisabled) return
      
      // Call context onChange first (RadioGroup)
      if (context?.onChange) {
        context.onChange(value, event)
      }
      
      // Then call local onChange
      if (onChange) {
        onChange(event)
      }
    }, [context, onChange, value, effectiveDisabled])

    // Handle keyboard navigation
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
      if (e.key === ' ') {
        e.preventDefault()
        if (!effectiveDisabled && finalRef.current) {
          finalRef.current.click()
        }
      }
    }, [finalRef, effectiveDisabled])

    // Build radio classes
    const radioClasses = cn(
      radioStyles.base,
      radioStyles.sizes[effectiveSize],
      radioStyles.variants[effectiveVariant][effectiveChecked ? 'checked' : 'unchecked'],
      radioStyles.focus,
      effectiveError && radioStyles.error,
      className
    )

    const labelContent = children || label

    const labelElement = labelContent && (
      <label
        htmlFor={radioId}
        className={cn(
          labelStyles.base,
          labelStyles.sizes[effectiveSize],
          effectiveDisabled && labelStyles.disabled,
          effectiveError && labelStyles.error
        )}
      >
        {labelContent}
        {/* Only show description visually if there's no error message */}
        {description && !effectiveError && (
          <div
            className={cn(
              descriptionStyles.base,
              descriptionStyles.sizes[effectiveSize]
            )}
          >
            {description}
          </div>
        )}
      </label>
    )

    const radioElement = (
      <div className="relative">
        <input
          {...props}
          ref={finalRef}
          id={radioId}
          type="radio"
          value={value}
          name={effectiveName}
          checked={effectiveChecked}
          disabled={effectiveDisabled}
          className="sr-only"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          aria-describedby={
            description || errorMessage 
              ? `${radioId}-description` 
              : undefined
          }
          aria-invalid={effectiveError}
        />
        <div className={radioClasses} onClick={handleVisualClick}>
          <RadioIndicator size={effectiveSize} checked={effectiveChecked || false} />
        </div>
      </div>
    )

    return (
      <div className={cn('flex flex-col', labelPosition === 'left' && 'items-end')}>
        <div
          className={cn(
            'flex items-start gap-2',
            labelPosition === 'left' && 'flex-row-reverse'
          )}
        >
          {radioElement}
          {labelElement}
        </div>
        
        {/* Hidden description for screen readers */}
        {(description || errorMessage) && (
          <div
            id={`${radioId}-description`}
            className="sr-only"
          >
            {description && description}
            {description && errorMessage && ' '}
            {errorMessage && errorMessage}
          </div>
        )}
      </div>
    )
  }
)

Radio.displayName = 'Radio'
