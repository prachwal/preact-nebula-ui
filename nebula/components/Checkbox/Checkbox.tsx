import { forwardRef } from 'preact/compat'
import { useEffect, useRef, useCallback } from 'preact/hooks'
import { cn } from '../../utils/cn'
import type { CheckboxProps } from './Checkbox.types'

// Debug flag - set to true to enable debugging
const DEBUG_CHECKBOX = false

// Debug utility
const debug = (...args: any[]) => {
  if (DEBUG_CHECKBOX) {
    console.log('[CHECKBOX DEBUG]', ...args)
  }
}

const checkboxStyles = {
  base: 'relative inline-flex items-center justify-center border-2 rounded transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
  sizes: {
    sm: 'w-4 h-4 text-xs',
    md: 'w-5 h-5 text-sm',
    lg: 'w-6 h-6 text-base'
  },
  variants: {
    default: {
      unchecked: 'border-gray-300 bg-white hover:border-gray-400 dark:border-gray-600 dark:bg-gray-800 dark:hover:border-gray-500',
      checked: 'border-blue-600 bg-blue-600 hover:bg-blue-700 dark:border-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600',
      indeterminate: 'border-blue-600 bg-blue-600 hover:bg-blue-700 dark:border-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600'
    },
    outlined: {
      unchecked: 'border-gray-300 bg-transparent hover:border-blue-600 dark:border-gray-600 dark:hover:border-blue-500',
      checked: 'border-blue-600 bg-transparent hover:bg-blue-50 dark:border-blue-500 dark:hover:bg-blue-950',
      indeterminate: 'border-blue-600 bg-transparent hover:bg-blue-50 dark:border-blue-500 dark:hover:bg-blue-950'
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

const errorStyles = {
  base: 'text-red-600 dark:text-red-400 mt-1',
  sizes: {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }
}

// Check icon for checked state
const CheckIcon = ({ size }: { size: 'sm' | 'md' | 'lg' }) => {
  const iconSize = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }[size]
  
  return (
    <svg
      className={cn('text-white fill-current', iconSize)}
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  )
}

// Indeterminate icon for indeterminate state
const IndeterminateIcon = ({ size }: { size: 'sm' | 'md' | 'lg' }) => {
  const iconSize = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }[size]
  
  return (
    <svg
      className={cn('text-white fill-current', iconSize)}
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      size = 'md',
      variant = 'default',
      indeterminate = false,
      label,
      description,
      error = false,
      errorMessage,
      children,
      labelPosition = 'right',
      className,
      disabled,
      checked,
      id,
      ...props
    },
    ref
  ) => {
    debug('🎯 Checkbox component initialized with props:', {
      size,
      variant,
      indeterminate,
      disabled,
      checked,
      id,
      hasOnChange: !!props.onChange,
      hasRef: !!ref
    })

    const inputRef = useRef<HTMLInputElement>(null)
    const finalRef = (ref as any) || inputRef

    // Handle indeterminate state
    useEffect(() => {
      debug('🔄 Setting indeterminate state:', { indeterminate, hasRef: !!finalRef.current })
      if (finalRef.current) {
        finalRef.current.indeterminate = indeterminate
      }
    }, [indeterminate, finalRef])

    // Generate unique ID if not provided
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`
    debug('🆔 Checkbox ID generated:', checkboxId)

    // Determine checkbox state for styling
    const getCheckboxState = () => {
      if (indeterminate) return 'indeterminate'
      if (checked) return 'checked'
      return 'unchecked'
    }

    const checkboxState = getCheckboxState()
    debug('🎨 Checkbox state determined:', { checkboxState, checked, indeterminate })
    
    // Build checkbox classes
    const checkboxClasses = cn(
      checkboxStyles.base,
      checkboxStyles.sizes[size],
      checkboxStyles.variants[variant][checkboxState],
      checkboxStyles.focus,
      error && checkboxStyles.error,
      className
    )

    // Handle keyboard navigation
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
      debug('⌨️ handleKeyDown triggered:', { key: e.key, disabled })
      
      if (e.key === ' ') {
        e.preventDefault()
        debug('⌨️ Space key pressed - triggering change')
        
        // Manually trigger the onChange event if provided
        if (props.onChange && !disabled) {
          debug('⌨️ Calling onChange manually')
          const syntheticEvent = {
            ...e,
            target: finalRef.current,
            currentTarget: finalRef.current
          } as any
          props.onChange(syntheticEvent)
        }
        // Also toggle the native checkbox
        if (finalRef.current && !disabled) {
          debug('⌨️ Clicking native checkbox')
          finalRef.current.click()
        }
      }
    }, [finalRef, props.onChange, disabled])

    const renderIcon = () => {
      if (indeterminate) {
        return <IndeterminateIcon size={size} />
      }
      if (checked) {
        return <CheckIcon size={size} />
      }
      if (variant === 'outlined' && (checked || indeterminate)) {
        return indeterminate ? <IndeterminateIcon size={size} /> : <CheckIcon size={size} />
      }
      return null
    }

    const labelContent = children || label

    const labelElement = labelContent && (
      <label
        htmlFor={checkboxId}
        className={cn(
          labelStyles.base,
          labelStyles.sizes[size],
          disabled && labelStyles.disabled,
          error && labelStyles.error
        )}
      >
        {labelContent}
        {/* Only show description visually if there's no error message */}
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
      </label>
    )

    const checkboxElement = (
      <div className="relative">
        <input
          {...props}
          ref={finalRef}
          id={checkboxId}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          className="sr-only"
          onKeyDown={handleKeyDown}
          onChange={(e) => {
            debug('🔘 Native input onChange triggered:', {
              checked: (e.target as HTMLInputElement).checked,
              disabled,
              event: e
            })
            if (props.onChange) {
              debug('🔘 Calling props.onChange')
              props.onChange(e)
            }
          }}
          onClick={(e) => {
            debug('🔘 Native input onClick triggered:', {
              checked: (e.target as HTMLInputElement).checked,
              disabled,
              event: e
            })
            if (props.onClick) {
              debug('🔘 Calling props.onClick')
              props.onClick(e)
            }
          }}
          aria-describedby={
            description || errorMessage 
              ? `${checkboxId}-description` 
              : undefined
          }
          aria-invalid={error ? 'true' : 'false'}
        />
        <div 
          className={checkboxClasses}
          onClick={(e) => {
            debug('🔘 Visual checkbox div clicked:', {
              disabled,
              event: e
            })
            if (!disabled && finalRef.current) {
              debug('🔘 Triggering native input click from visual div')
              finalRef.current.click()
            }
          }}
        >
          {renderIcon()}
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
          {checkboxElement}
          {labelElement}
        </div>
        
        {/* Hidden description for screen readers */}
        {(description || errorMessage) && (
          <div
            id={`${checkboxId}-description`}
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
              errorStyles.sizes[size]
            )}
            role="alert"
            aria-live="polite"
          >
            {errorMessage}
          </div>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'
