import { useState, useCallback } from 'preact/hooks'
import { cn } from '../../utils/cn'
import { RadioGroupProps } from './Radio.types'
import { RadioContext } from './Radio'

const errorStyles = {
  base: 'text-red-600 dark:text-red-400 mt-1',
  sizes: {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }
}

const groupStyles = {
  spacing: {
    xs: 'gap-1',
    sm: 'gap-2',
    md: 'gap-3',
    lg: 'gap-4'
  },
  orientation: {
    horizontal: 'flex-row flex-wrap',
    vertical: 'flex-col'
  }
}

const labelStyles = {
  base: 'text-gray-900 dark:text-gray-100 font-medium',
  sizes: {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  },
  disabled: 'text-gray-500 dark:text-gray-400',
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

export function RadioGroup({
  value,
  defaultValue,
  name,
  orientation = 'vertical',
  size = 'md',
  variant = 'default',
  disabled = false,
  error = false,
  errorMessage,
  label,
  description,
  spacing = 'md',
  id,
  className,
  children,
  onChange,
  ...props
}: RadioGroupProps) {
  // State for uncontrolled usage
  const [internalValue, setInternalValue] = useState<string | undefined>(defaultValue)
  
  // Determine if controlled or uncontrolled
  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  // Generate unique ID if not provided
  const groupId = id || `radiogroup-${Math.random().toString(36).substr(2, 9)}`

  // Handle value changes
  const handleChange = useCallback((newValue: string, event: Event) => {
    // Update internal state if uncontrolled
    if (!isControlled) {
      setInternalValue(newValue)
    }
    
    // Call onChange if provided
    if (onChange) {
      onChange(newValue, event)
    }
  }, [isControlled, onChange])

  // Handle keyboard navigation for radio groups
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (disabled) return

    const radioInputs = Array.from(
      (e.currentTarget as HTMLElement).querySelectorAll('input[type="radio"]:not(:disabled)')
    ) as HTMLInputElement[]

    if (radioInputs.length === 0) return

    const currentIndex = radioInputs.findIndex(input => input === document.activeElement)
    let nextIndex = currentIndex

    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        e.preventDefault()
        nextIndex = currentIndex === radioInputs.length - 1 ? 0 : currentIndex + 1
        break
      case 'ArrowUp':
      case 'ArrowLeft':
        e.preventDefault()
        nextIndex = currentIndex === 0 ? radioInputs.length - 1 : currentIndex - 1
        break
      case 'Home':
        e.preventDefault()
        nextIndex = 0
        break
      case 'End':
        e.preventDefault()
        nextIndex = radioInputs.length - 1
        break
      default:
        return
    }

    if (nextIndex !== currentIndex && radioInputs[nextIndex]) {
      radioInputs[nextIndex].focus()
      radioInputs[nextIndex].click()
    }
  }, [disabled])

  // Context value for child Radio components
  const contextValue = {
    value: currentValue,
    name,
    onChange: handleChange,
    disabled,
    size,
    variant,
    error
  }

  const labelElement = label && (
    <legend
      className={cn(
        labelStyles.base,
        labelStyles.sizes[size],
        disabled && labelStyles.disabled,
        error && labelStyles.error
      )}
    >
      {label}
      {/* Show description if provided and no error */}
      {description && !error && (
        <div
          className={cn(
            descriptionStyles.base,
            descriptionStyles.sizes[size]
          )}
        >
          {description}
        </div>
      )}
    </legend>
  )

  return (
    <RadioContext.Provider value={contextValue}>
      <fieldset
        {...props}
        id={groupId}
        className={cn('border-0 p-0 m-0', className)}
        onKeyDown={handleKeyDown}
        aria-invalid={error}
        aria-describedby={
          description || errorMessage 
            ? `${groupId}-description` 
            : undefined
        }
      >
        {labelElement}
        
        <div
          className={cn(
            'flex',
            groupStyles.orientation[orientation],
            groupStyles.spacing[spacing],
            label && 'mt-3'
          )}
          role="radiogroup"
          aria-labelledby={label ? `${groupId}-label` : undefined}
        >
          {children}
        </div>

        {/* Hidden description for screen readers */}
        {(description || errorMessage) && (
          <div
            id={`${groupId}-description`}
            className="sr-only"
          >
            {description && description}
            {description && errorMessage && ' '}
            {errorMessage && errorMessage}
          </div>
        )}

        {/* Visible error message */}
        {error && errorMessage && (
          <div
            className={cn(
              errorStyles.base,
              errorStyles.sizes[size],
              'mt-2'
            )}
            role="alert"
            aria-live="polite"
          >
            {errorMessage}
          </div>
        )}
      </fieldset>
    </RadioContext.Provider>
  )
}
