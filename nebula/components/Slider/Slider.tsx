import { forwardRef } from 'preact/compat'
import { useState, useRef, useCallback } from 'preact/hooks'
import type { SliderProps } from './types'
import { cn } from '../../utils/cn'

const Slider = forwardRef<HTMLDivElement, SliderProps>(({
  value,
  defaultValue,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  size = 'md',
  orientation = 'horizontal',
  range = false,
  marks,
  minDistance = 0,
  disabled = false,
  tooltip,
  thumb,
  error = false,
  errorMessage,
  className,
  trackClassName,
  thumbClassName,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  ...props
}, ref) => {
  // Internal state for uncontrolled mode
  const [internalValue, setInternalValue] = useState<number | [number, number]>(() => {
    if (value !== undefined) return value
    if (defaultValue !== undefined) return defaultValue
    return range ? [min, min] : min
  })

  // Use controlled value if provided, otherwise use internal value
  const currentValue = value !== undefined ? value : internalValue

  // Refs for DOM elements
  const trackRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const activeThumbIndex = useRef<number>(0)

  // Normalize value to always be an array for easier handling
  const normalizedValue = Array.isArray(currentValue) ? currentValue : [currentValue, currentValue]
  const [lowerValue, upperValue] = normalizedValue

  // Size classes
  const sizeClasses = {
    sm: {
      track: orientation === 'horizontal' ? 'h-1' : 'w-1',
      thumb: 'w-3 h-3',
      container: orientation === 'horizontal' ? 'h-6' : 'w-6'
    },
    md: {
      track: orientation === 'horizontal' ? 'h-2' : 'w-2',
      thumb: 'w-4 h-4',
      container: orientation === 'horizontal' ? 'h-8' : 'w-8'
    },
    lg: {
      track: orientation === 'horizontal' ? 'h-3' : 'w-3',
      thumb: 'w-5 h-5',
      container: orientation === 'horizontal' ? 'h-10' : 'w-10'
    }
  }

  // Convert pixel position to value
  const pixelToValue = useCallback((pixel: number, rect: DOMRect) => {
    const percentage = orientation === 'horizontal' 
      ? pixel / rect.width 
      : 1 - pixel / rect.height

    let newValue = min + percentage * (max - min)

    // Apply step if specified
    if (step !== null && step > 0) {
      newValue = Math.round(newValue / step) * step
    }

    // Constrain to bounds
    return Math.max(min, Math.min(max, newValue))
  }, [min, max, step, orientation])

  // Convert value to percentage for positioning
  const valueToPercentage = useCallback((val: number) => {
    return ((val - min) / (max - min)) * 100
  }, [min, max])

  // Handle mouse/touch events
  const handlePointerDown = useCallback((event: PointerEvent, thumbIndex: number) => {
    if (disabled) return

    event.preventDefault()
    isDragging.current = true
    activeThumbIndex.current = thumbIndex

    const handlePointerMove = (moveEvent: PointerEvent) => {
      if (!isDragging.current || !trackRef.current) return

      const rect = trackRef.current.getBoundingClientRect()
      const pixel = orientation === 'horizontal' 
        ? moveEvent.clientX - rect.left 
        : moveEvent.clientY - rect.top

      const newValue = pixelToValue(pixel, rect)

      if (range) {
        const newValues: [number, number] = [...normalizedValue] as [number, number]
        newValues[thumbIndex] = newValue

        // Ensure minimum distance and proper order
        if (thumbIndex === 0) {
          // Lower thumb
          newValues[0] = Math.min(newValues[0], newValues[1] - minDistance)
        } else {
          // Upper thumb
          newValues[1] = Math.max(newValues[1], newValues[0] + minDistance)
        }

        // Ensure bounds
        newValues[0] = Math.max(min, newValues[0])
        newValues[1] = Math.min(max, newValues[1])

        if (value === undefined) setInternalValue(newValues)
        onChange?.(newValues)
      } else {
        if (value === undefined) setInternalValue(newValue)
        onChange?.(newValue)
      }
    }

    const handlePointerUp = () => {
      isDragging.current = false
      document.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('pointerup', handlePointerUp)
    }

    document.addEventListener('pointermove', handlePointerMove)
    document.addEventListener('pointerup', handlePointerUp)
  }, [disabled, range, normalizedValue, minDistance, min, max, value, onChange, pixelToValue, orientation])

  // Handle track clicks
  const handleTrackClick = useCallback((event: PointerEvent) => {
    if (disabled || !trackRef.current) return

    const rect = trackRef.current.getBoundingClientRect()
    const pixel = orientation === 'horizontal' 
      ? event.clientX - rect.left 
      : event.clientY - rect.top

    const newValue = pixelToValue(pixel, rect)

    if (range) {
      // Find closest thumb
      const distanceToLower = Math.abs(newValue - lowerValue)
      const distanceToUpper = Math.abs(newValue - upperValue)
      const thumbIndex = distanceToLower <= distanceToUpper ? 0 : 1

      const newValues: [number, number] = [...normalizedValue] as [number, number]
      newValues[thumbIndex] = newValue

      // Apply constraints
      if (thumbIndex === 0) {
        newValues[0] = Math.min(newValues[0], newValues[1] - minDistance)
      } else {
        newValues[1] = Math.max(newValues[1], newValues[0] + minDistance)
      }

      newValues[0] = Math.max(min, newValues[0])
      newValues[1] = Math.min(max, newValues[1])

      if (value === undefined) setInternalValue(newValues)
      onChange?.(newValues)
    } else {
      if (value === undefined) setInternalValue(newValue)
      onChange?.(newValue)
    }
  }, [disabled, range, lowerValue, upperValue, normalizedValue, minDistance, min, max, value, onChange, pixelToValue, orientation])

  // Keyboard navigation
  const handleKeyDown = useCallback((event: KeyboardEvent, thumbIndex: number) => {
    if (disabled) return

    let delta = 0
    const stepValue = step || 1

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        delta = stepValue
        break
      case 'ArrowLeft':
      case 'ArrowDown':
        delta = -stepValue
        break
      case 'PageUp':
        delta = stepValue * 10
        break
      case 'PageDown':
        delta = -stepValue * 10
        break
      case 'Home':
        delta = min - normalizedValue[thumbIndex]
        break
      case 'End':
        delta = max - normalizedValue[thumbIndex]
        break
      default:
        return
    }

    event.preventDefault()

    if (range) {
      const newValues: [number, number] = [...normalizedValue] as [number, number]
      const newValue = Math.max(min, Math.min(max, newValues[thumbIndex] + delta))
      
      // Skip if value wouldn't change
      if (newValue === newValues[thumbIndex]) return
      
      newValues[thumbIndex] = newValue

      // Apply constraints
      if (thumbIndex === 0) {
        newValues[0] = Math.min(newValues[0], newValues[1] - minDistance)
      } else {
        newValues[1] = Math.max(newValues[1], newValues[0] + minDistance)
      }

      if (value === undefined) setInternalValue(newValues)
      onChange?.(newValues)
    } else {
      const newValue = Math.max(min, Math.min(max, normalizedValue[0] + delta))
      
      // Skip if value wouldn't change
      if (newValue === normalizedValue[0]) return
      
      if (value === undefined) setInternalValue(newValue)
      onChange?.(newValue)
    }
  }, [disabled, step, min, max, range, normalizedValue, minDistance, value, onChange])

  // Preact event handlers
  const handleThumbPointerDown = useCallback((thumbIndex: number) => (e: any) => {
    const event = e as PointerEvent
    handlePointerDown(event, thumbIndex)
  }, [handlePointerDown])

  const handleThumbKeyDown = useCallback((thumbIndex: number) => (e: any) => {
    const event = e as KeyboardEvent
    handleKeyDown(event, thumbIndex)
  }, [handleKeyDown])

  const handleTrackPointerDown = useCallback((e: any) => {
    const event = e as PointerEvent
    handleTrackClick(event)
  }, [handleTrackClick])

  // Render marks
  const renderMarks = () => {
    if (!marks || marks.length === 0) return null

    return marks.map((mark, index) => {
      const markValue = typeof mark === 'number' ? mark : mark.value
      const markLabel = typeof mark === 'number' ? undefined : mark.label
      const percentage = valueToPercentage(markValue)

      return (
        <div
          key={index}
          className={cn(
            'absolute flex items-center justify-center',
            orientation === 'horizontal' 
              ? 'top-1/2 -translate-y-1/2 -translate-x-1/2' 
              : 'left-1/2 -translate-x-1/2 translate-y-1/2'
          )}
          style={{
            [orientation === 'horizontal' ? 'left' : 'bottom']: `${percentage}%`
          }}
        >
          <div className={cn(
            'bg-gray-400 rounded-full',
            size === 'sm' ? 'w-1 h-1' : size === 'md' ? 'w-1.5 h-1.5' : 'w-2 h-2'
          )} />
          {markLabel && (
            <div className={cn(
              'absolute text-xs text-gray-600 whitespace-nowrap',
              orientation === 'horizontal' 
                ? 'top-full mt-1' 
                : 'left-full ml-2'
            )}>
              {markLabel}
            </div>
          )}
        </div>
      )
    })
  }

  // Component classes
  const containerClasses = cn(
    'relative flex items-center justify-center select-none',
    orientation === 'horizontal' ? 'w-full' : 'h-full flex-col',
    sizeClasses[size].container,
    disabled && 'opacity-50 cursor-not-allowed',
    error && 'text-red-600',
    className
  )

  const trackClasses = cn(
    'relative bg-gray-200 rounded-full',
    orientation === 'horizontal' ? 'w-full' : 'h-full',
    sizeClasses[size].track,
    disabled ? 'bg-gray-100' : 'bg-gray-200',
    error && 'bg-red-100',
    trackClassName
  )

  const fillClasses = cn(
    'absolute bg-blue-600 rounded-full',
    sizeClasses[size].track,
    disabled ? 'bg-gray-300' : 'bg-blue-600',
    error && 'bg-red-500'
  )

  const thumbClasses = cn(
    'absolute bg-white border-2 border-blue-600 rounded-full cursor-pointer',
    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
    'transition-all duration-75 ease-out',
    'flex items-center justify-center',
    sizeClasses[size].thumb,
    disabled ? 'border-gray-300 cursor-not-allowed' : 'border-blue-600 hover:border-blue-700',
    error && 'border-red-500',
    thumb?.className,
    thumbClassName
  )

  // Calculate fill style
  const fillStyle = (() => {
    if (range) {
      const lowerPercentage = valueToPercentage(lowerValue)
      const upperPercentage = valueToPercentage(upperValue)
      
      if (orientation === 'horizontal') {
        return {
          left: `${lowerPercentage}%`,
          width: `${upperPercentage - lowerPercentage}%`
        }
      } else {
        return {
          bottom: `${lowerPercentage}%`,
          height: `${upperPercentage - lowerPercentage}%`
        }
      }
    } else {
      const percentage = valueToPercentage(lowerValue)
      
      if (orientation === 'horizontal') {
        return { width: `${percentage}%` }
      } else {
        return { height: `${percentage}%` }
      }
    }
  })()

  return (
    <div ref={ref} className={containerClasses} {...props}>
      <div
        ref={trackRef}
        className={trackClasses}
        onPointerDown={handleTrackPointerDown}
      >
        {/* Fill */}
        <div className={fillClasses} style={fillStyle} />
        
        {/* Marks */}
        {renderMarks()}
        
        {/* Thumbs */}
        <div
          className={thumbClasses}
          style={{
            [orientation === 'horizontal' ? 'left' : 'bottom']: `${valueToPercentage(lowerValue)}%`,
            transform: orientation === 'horizontal' ? 'translateX(-50%) translateY(-50%)' : 'translateX(-50%) translateY(50%)',
            [orientation === 'horizontal' ? 'top' : 'left']: '50%'
          }}
          onPointerDown={handleThumbPointerDown(0)}
          onKeyDown={handleThumbKeyDown(0)}
          tabIndex={disabled ? -1 : 0}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={range ? upperValue - minDistance : max}
          aria-valuenow={lowerValue}
          aria-label={range ? `Lower value: ${lowerValue}` : ariaLabel}
        >
          {thumb?.content || (
            <div className={cn(
              'w-2 h-2 bg-blue-600 rounded-full',
              disabled && 'bg-gray-400',
              error && 'bg-red-500'
            )} />
          )}
        </div>
        
        {range && (
          <div
            className={thumbClasses}
            style={{
              [orientation === 'horizontal' ? 'left' : 'bottom']: `${valueToPercentage(upperValue)}%`,
              transform: orientation === 'horizontal' ? 'translateX(-50%) translateY(-50%)' : 'translateX(-50%) translateY(50%)',
              [orientation === 'horizontal' ? 'top' : 'left']: '50%'
            }}
            onPointerDown={handleThumbPointerDown(1)}
            onKeyDown={handleThumbKeyDown(1)}
            tabIndex={disabled ? -1 : 0}
            role="slider"
            aria-valuemin={lowerValue + minDistance}
            aria-valuemax={max}
            aria-valuenow={upperValue}
            aria-label={`Upper value: ${upperValue}`}
          >
            {thumb?.content || (
              <div className={cn(
                'w-2 h-2 bg-blue-600 rounded-full',
                disabled && 'bg-gray-400',
                error && 'bg-red-500'
              )} />
            )}
          </div>
        )}
      </div>
      
      {error && errorMessage && (
        <div className="mt-1 text-sm text-red-600">
          {errorMessage}
        </div>
      )}
    </div>
  );
});

Slider.displayName = 'Slider';

export { Slider };
