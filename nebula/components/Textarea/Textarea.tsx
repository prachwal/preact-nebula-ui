import { forwardRef, useEffect, useRef } from 'preact/compat'
import type { Ref } from 'preact'
import { cn } from '@/utils/cn'
import type { TextareaProps } from './Textarea.types'

const textareaVariants = {
  default: 'border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400',
  error: 'border-red-500 dark:border-red-400 focus:border-red-500 dark:focus:border-red-400 focus:ring-red-500 dark:focus:ring-red-400',
  success: 'border-green-500 dark:border-green-400 focus:border-green-500 dark:focus:border-green-400 focus:ring-green-500 dark:focus:ring-green-400',
  filled: 'border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400 bg-gray-50 dark:bg-gray-700'
}

const textareaSizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-3 py-2 text-base',
  lg: 'px-4 py-3 text-lg'
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      variant = 'default',
      size = 'md',
      disabled = false,
      required = false,
      error,
      helperText,
      isInvalid,
      isValid,
      autoResize = false,
      maxLength,
      showCharCount = false,
      minRows = 3,
      maxRows = 8,
      className,
      'data-testid': testId,
      onChange,
      onInput,
      onFocus,
      onBlur,
      value,
      defaultValue,
      ...restProps
    },
    ref: Ref<HTMLTextAreaElement>
  ) => {
    const internalRef = useRef<HTMLTextAreaElement>(null)
    const textareaRef = (ref as any) || internalRef

    // Auto-resize functionality
    const handleAutoResize = () => {
      if (!autoResize || !textareaRef.current) return

      const textarea = textareaRef.current
      
      // Reset height to calculate scrollHeight
      textarea.style.height = 'auto'
      
      // Calculate new height
      const scrollHeight = textarea.scrollHeight
      const lineHeight = parseInt(getComputedStyle(textarea).lineHeight)
      const minHeight = lineHeight * minRows
      const maxHeight = lineHeight * maxRows
      
      const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight)
      
      textarea.style.height = `${newHeight}px`
      textarea.style.overflowY = scrollHeight > maxHeight ? 'auto' : 'hidden'
    }

    // Handle input changes
    const handleInput = (event: Event) => {
      handleAutoResize()
      onInput?.(event)
    }

    const handleChange = (event: Event) => {
      handleAutoResize()
      onChange?.(event)
    }

    // Initialize auto-resize on mount and value changes
    useEffect(() => {
      if (autoResize) {
        handleAutoResize()
      }
    }, [value, defaultValue, autoResize])

    // Determine actual variant based on props
    const actualVariant = error || isInvalid ? 'error' : isValid ? 'success' : variant

    const baseClasses = cn(
      // Base textarea styles
      'block w-full rounded-md border shadow-sm transition-colors duration-200 resize-none',
      'focus:outline-none focus:ring-1',
      'disabled:cursor-not-allowed disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-500 dark:disabled:text-gray-400',
      'placeholder:text-gray-400 dark:placeholder:text-gray-500',
      'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100',
      
      // Size styles
      textareaSizes[size],
      
      // Variant styles
      textareaVariants[actualVariant],
      
      // Auto-resize styles
      autoResize && 'overflow-hidden',
      
      className
    )

    // Calculate character count
    const currentLength = value?.length ?? defaultValue?.length ?? 0
    const showCount = showCharCount

    return (
      <div className="space-y-1">
        <textarea
          ref={textareaRef}
          disabled={disabled}
          required={required}
          rows={autoResize ? minRows : restProps.rows || minRows}
          maxLength={maxLength}
          className={baseClasses}
          aria-invalid={error || isInvalid ? 'true' : 'false'}
          aria-describedby={
            error || helperText || showCount
              ? `${restProps.id || 'textarea'}-description`
              : undefined
          }
          data-testid={testId}
          onChange={handleChange}
          onInput={handleInput}
          onFocus={onFocus}
          onBlur={onBlur}
          {...restProps}
          {...(value !== undefined ? { value } : { defaultValue })}
        />
        
        {(error || helperText || showCount) && (
          <div className="flex justify-between items-start">
            {(error || helperText) && (
              <div
                id={`${restProps.id || 'textarea'}-description`}
                className={cn(
                  'text-sm',
                  error ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'
                )}
                role={error ? 'alert' : undefined}
                aria-live={error ? 'polite' : undefined}
              >
                {error || helperText}
              </div>
            )}
            
            {showCount && (
              <div
                className={cn(
                  'text-sm tabular-nums',
                  maxLength != null && currentLength > maxLength
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-gray-500 dark:text-gray-400'
                )}
                aria-label={`Character count: ${currentLength}${maxLength != null ? ` of ${maxLength}` : ''}`}
              >
                {maxLength != null ? `${currentLength}/${maxLength}` : currentLength}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
