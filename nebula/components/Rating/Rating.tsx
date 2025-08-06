import { forwardRef } from 'preact/compat'
import { useState, useCallback } from 'preact/hooks'
import type { RatingProps } from './types'
import { cn } from '../../utils/cn'

const Rating = forwardRef<HTMLDivElement, RatingProps>(({
  value,
  defaultValue,
  onChange,
  max = 5,
  size = 'md',
  allowHalf = false,
  readOnly = false,
  disabled = false,
  icon,
  emptyIcon,
  halfIcon,
  color = '#facc15', // yellow-400
  emptyColor = '#d1d5db', // gray-300
  showValue = false,
  valueFormatter,
  error = false,
  errorMessage,
  className,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  ...props
}, ref) => {
  // Internal state for uncontrolled mode
  const [internalValue, setInternalValue] = useState<number>(() => {
    if (value !== undefined) return value
    if (defaultValue !== undefined) return defaultValue
    return 0
  })

  // Use controlled value if provided, otherwise use internal value
  const currentValue = value !== undefined ? value : internalValue
  
  // Hover state for interactive mode
  const [hoverValue, setHoverValue] = useState<number | null>(null)
  
  // Display value (hover value takes precedence during interaction)
  const displayValue = hoverValue !== null ? hoverValue : currentValue

  // Size classes
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  // Default icons
  const defaultIcon = (
    <svg fill="currentColor" viewBox="0 0 20 20" className="w-full h-full">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )

  const defaultEmptyIcon = (
    <svg fill="none" stroke="currentColor" viewBox="0 0 20 20" className="w-full h-full">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )

  const defaultHalfIcon = (
    <svg fill="currentColor" viewBox="0 0 20 20" className="w-full h-full">
      <defs>
        <mask id="half-star-mask">
          <rect x="0" y="0" width="10" height="20" fill="white" />
        </mask>
      </defs>
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" mask="url(#half-star-mask)" />
    </svg>
  )

  // Handle click on star
  const handleClick = useCallback((starIndex: number, isHalf: boolean = false) => {
    if (readOnly || disabled) return

    const newValue = isHalf ? starIndex + 0.5 : starIndex + 1
    
    setInternalValue(newValue)
    onChange?.(newValue)
  }, [readOnly, disabled, onChange, setInternalValue])

  // Handle mouse events
  const handleMouseEnter = useCallback((starIndex: number, isHalf: boolean = false) => {
    if (readOnly || disabled) return
    setHoverValue(isHalf ? starIndex + 0.5 : starIndex + 1)
  }, [readOnly, disabled])

  const handleMouseLeave = useCallback(() => {
    if (readOnly || disabled) return
    setHoverValue(null)
  }, [readOnly, disabled])

  // Handle keyboard navigation
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (readOnly || disabled) return

    const step = allowHalf ? 0.5 : 1

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        event.preventDefault()
        setInternalValue(_prev => {
          const current = value !== undefined ? value : _prev
          const newValue = Math.min(max, current + step)
          onChange?.(newValue)
          return newValue
        })
        break
      case 'ArrowLeft':
      case 'ArrowDown':
        event.preventDefault()
        setInternalValue(_prev => {
          const current = value !== undefined ? value : _prev
          const newValue = Math.max(0, current - step)
          onChange?.(newValue)
          return newValue
        })
        break
      case 'Home':
        event.preventDefault()
        setInternalValue(_prev => {
          onChange?.(0)
          return 0
        })
        break
      case 'End':
        event.preventDefault()
        setInternalValue(_prev => {
          onChange?.(max)
          return max
        })
        break
      default:
        return
    }
  }, [readOnly, disabled, max, allowHalf, onChange, value])

  // Get icon state for a specific star
  const getStarState = (starIndex: number): 'empty' | 'half' | 'full' => {
    const starValue = starIndex + 1
    
    if (displayValue >= starValue) {
      return 'full'
    } else if (allowHalf && displayValue >= starValue - 0.5) {
      return 'half'
    } else {
      return 'empty'
    }
  }

  // Render a single star
  const renderStar = (starIndex: number) => {
    const state = getStarState(starIndex)
    const isInteractive = !readOnly && !disabled

    return (
      <div
        key={starIndex}
        className={cn(
          'relative cursor-pointer transition-colors duration-150',
          sizeClasses[size],
          !isInteractive && 'cursor-default'
        )}
        onMouseEnter={() => handleMouseEnter(starIndex)}
        onMouseLeave={handleMouseLeave}
      >
        {/* Full star clickable area */}
        <div
          className="absolute inset-0 z-10"
          onClick={() => handleClick(starIndex)}
        />
        
        {/* Half star clickable area (if allowHalf) */}
        {allowHalf && isInteractive && (
          <div
            className="absolute inset-0 w-1/2 z-20"
            onClick={() => handleClick(starIndex, true)}
          />
        )}

        {/* Star icon */}
        <div
          className="w-full h-full"
          style={{ 
            color: state === 'empty' ? emptyColor : color 
          }}
        >
          {state === 'empty' && (emptyIcon || defaultEmptyIcon)}
          {state === 'half' && (halfIcon || defaultHalfIcon)}
          {state === 'full' && (icon || defaultIcon)}
        </div>
      </div>
    )
  }

  // Container classes
  const containerClasses = cn(
    'inline-flex items-center gap-1',
    disabled && 'opacity-50 cursor-not-allowed',
    error && 'text-red-600 dark:text-red-400',
    className
  )

  // Format value for display
  const formatValue = (val: number) => {
    if (valueFormatter) {
      return valueFormatter(val, max)
    }
    return `${val}/${max}`
  }

  return (
    <div className="inline-flex flex-col gap-1">
      <div
        ref={ref}
        className={containerClasses}
        tabIndex={readOnly || disabled ? -1 : 0}
        role="radiogroup"
        aria-label={ariaLabel || `Rating: ${currentValue} out of ${max} stars`}
        aria-labelledby={ariaLabelledBy}
        aria-readonly={readOnly}
        aria-disabled={disabled}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {/* Stars */}
        {Array.from({ length: max }, (_, index) => renderStar(index))}
        
        {/* Value display */}
        {showValue && (
          <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            {formatValue(currentValue)}
          </span>
        )}
      </div>

      {/* Error message */}
      {error && errorMessage && (
        <div className="text-sm text-red-600 dark:text-red-400">
          {errorMessage}
        </div>
      )}
    </div>
  )
})

Rating.displayName = 'Rating'

export { Rating }
