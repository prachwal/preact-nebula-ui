import { forwardRef, useImperativeHandle, useRef, useState, useCallback, useEffect } from 'preact/compat'
import { cn } from '../../utils/cn'
import { sizeTokens } from '../../utils/sizeTokens'
import type { SliderProps, SliderRef, SliderState } from './types'

export const Slider = forwardRef<SliderRef, SliderProps>(({
  value: controlledValue,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  size = 'md',
  orientation = 'horizontal',
  disabled = false,
  className,
  style,
  marks,
  dots = false,
  included = true,
  tooltip = false,
  onChange,
  onChangeComplete,
  onBeforeChange,
  range = false,
  reverse = false,
  keyboard = true,
  tabIndex = 0,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  ...props
}, ref) => {
  // Stan komponentu
  const [state, setState] = useState<SliderState>(() => ({
    value: controlledValue ?? defaultValue,
    dragging: false,
    focused: false,
    activeHandle: undefined
  }))

  // Referencje do elementów DOM
  const trackRef = useRef<HTMLDivElement>(null)
  const handleRefs = useRef<(HTMLDivElement | null)[]>([])

  // Wartość kontrolowana vs niekontrolowana
  const value = controlledValue ?? state.value
  const isControlled = controlledValue !== undefined

  // Obliczenia pozycji
  const getPositionFromValue = useCallback((val: number) => {
    const percentage = ((val - min) / (max - min)) * 100
    return reverse ? 100 - percentage : percentage
  }, [min, max, reverse])

  const getValueFromPosition = useCallback((position: number) => {
    const percentage = reverse ? 100 - position : position
    const rawValue = min + (percentage / 100) * (max - min)
    const steppedValue = Math.round(rawValue / step) * step
    return Math.max(min, Math.min(max, steppedValue))
  }, [min, max, step, reverse])

  // Obsługa zdarzeń
  const handleValueChange = useCallback((newValue: number | [number, number]) => {
    if (!isControlled) {
      setState(prev => ({ ...prev, value: newValue }))
    }
    onChange?.(newValue)
  }, [isControlled, onChange])

  const handleMouseDown = useCallback((event: MouseEvent) => {
    if (disabled) return
    
    event.preventDefault()
    onBeforeChange?.(value)
    
    setState(prev => ({ ...prev, dragging: true }))
    
    // Dodaj globalne listenery
    const handleMouseMove = (e: MouseEvent) => {
      if (!trackRef.current) return
      
      const rect = trackRef.current.getBoundingClientRect()
      const isVertical = orientation === 'vertical'
      const trackSize = isVertical ? rect.height : rect.width
      const trackStart = isVertical ? rect.top : rect.left
      const pointer = isVertical ? e.clientY : e.clientX
      
      const position = ((pointer - trackStart) / trackSize) * 100
      const newValue = getValueFromPosition(Math.max(0, Math.min(100, position)))
      
      handleValueChange(newValue)
    }
    
    const handleMouseUp = () => {
      setState(prev => ({ ...prev, dragging: false }))
      onChangeComplete?.(value)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    
    // Natychmiast ustaw wartość na pozycji kliknięcia
    handleMouseMove(event)
  }, [disabled, value, orientation, getValueFromPosition, handleValueChange, onBeforeChange, onChangeComplete])

  // Obsługa klawiatury
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!keyboard || disabled) return
    
    let newValue: number
    const currentValue = Array.isArray(value) ? value[0] : value
    
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        event.preventDefault()
        newValue = Math.max(min, currentValue - step)
        break
      case 'ArrowRight':
      case 'ArrowUp':
        event.preventDefault()
        newValue = Math.min(max, currentValue + step)
        break
      case 'Home':
        event.preventDefault()
        newValue = min
        break
      case 'End':
        event.preventDefault()
        newValue = max
        break
      case 'PageDown':
        event.preventDefault()
        newValue = Math.max(min, currentValue - step * 10)
        break
      case 'PageUp':
        event.preventDefault()
        newValue = Math.min(max, currentValue + step * 10)
        break
      default:
        return
    }
    
    handleValueChange(newValue)
  }, [keyboard, disabled, value, min, max, step, handleValueChange])

  // Imperative API
  useImperativeHandle(ref, () => ({
    focus: () => handleRefs.current[0]?.focus(),
    blur: () => handleRefs.current[0]?.blur(),
    getValue: () => value,
    setValue: handleValueChange
  }), [value, handleValueChange])

  // Obliczenia renderowania
  const currentValue = Array.isArray(value) ? value[0] : value
  const position = getPositionFromValue(currentValue)
  
  const sliderClasses = cn(
    'relative w-full touch-none select-none',
    orientation === 'vertical' && 'h-full flex-col',
    disabled && 'opacity-50 cursor-not-allowed',
    className
  )
  
  const trackClasses = cn(
    'relative bg-gray-200 rounded-full',
    orientation === 'horizontal' ? `h-${sizeTokens.slider[size]} w-full` : `w-${sizeTokens.slider[size]} h-full`,
    !disabled && 'hover:bg-gray-300 transition-colors'
  )
  
  const railClasses = cn(
    'absolute bg-blue-500 rounded-full',
    orientation === 'horizontal' 
      ? `h-full` 
      : `w-full`,
    included && (orientation === 'horizontal' 
      ? `left-0 top-0` 
      : `bottom-0 left-0`)
  )
  
  const handleClasses = cn(
    'absolute bg-white border-2 border-blue-500 rounded-full shadow-sm',
    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1',
    'transform -translate-x-1/2 -translate-y-1/2',
    sizeTokens.sliderHandle[size],
    !disabled && 'hover:border-blue-600 hover:shadow-md transition-all',
    state.dragging && 'scale-110 shadow-lg',
    disabled && 'cursor-not-allowed'
  )

  const railStyle = orientation === 'horizontal'
    ? { width: `${position}%` }
    : { height: `${position}%` }
    
  const handleStyle = orientation === 'horizontal'
    ? { left: `${position}%`, top: '50%' }
    : { bottom: `${position}%`, left: '50%' }

  return (
    <div
      className={sliderClasses}
      style={style}
      {...props}
    >
      <div
        ref={trackRef}
        className={trackClasses}
        onMouseDown={handleMouseDown}
      >
        {/* Rail (filled part) */}
        {included && (
          <div
            className={railClasses}
            style={railStyle}
          />
        )}
        
        {/* Handle */}
        <div
          ref={el => handleRefs.current[0] = el}
          className={handleClasses}
          style={handleStyle}
          tabIndex={disabled ? -1 : tabIndex}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={currentValue}
          aria-orientation={orientation}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedBy}
          aria-disabled={disabled}
          onKeyDown={handleKeyDown}
          onFocus={() => setState(prev => ({ ...prev, focused: true }))}
          onBlur={() => setState(prev => ({ ...prev, focused: false }))}
        />
        
        {/* Marks */}
        {marks && (
          <div className="absolute inset-0">
            {Object.entries(typeof marks === 'boolean' ? {} : marks).map(([markValue, label]) => {
              const markPosition = getPositionFromValue(Number(markValue))
              const markStyle = orientation === 'horizontal'
                ? { left: `${markPosition}%` }
                : { bottom: `${markPosition}%` }
                
              return (
                <div
                  key={markValue}
                  className={cn(
                    'absolute w-1 h-1 bg-gray-400 rounded-full transform',
                    orientation === 'horizontal' ? '-translate-x-1/2 top-1/2 -translate-y-1/2' : '-translate-y-1/2 left-1/2 -translate-x-1/2'
                  )}
                  style={markStyle}
                >
                  {label && (
                    <span className={cn(
                      'absolute text-xs text-gray-600 whitespace-nowrap',
                      orientation === 'horizontal' ? 'top-full mt-1 left-1/2 -translate-x-1/2' : 'left-full ml-1 top-1/2 -translate-y-1/2'
                    )}>
                      {label}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        )}
        
        {/* Tooltip */}
        {tooltip && (state.dragging || state.focused || tooltip === 'always') && (
          <div
            className={cn(
              'absolute bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg pointer-events-none z-10',
              orientation === 'horizontal' 
                ? 'bottom-full mb-2 left-1/2 -translate-x-1/2' 
                : 'right-full mr-2 top-1/2 -translate-y-1/2'
            )}
            style={handleStyle}
          >
            {currentValue}
            <div className={cn(
              'absolute w-1 h-1 bg-gray-900 transform rotate-45',
              orientation === 'horizontal' ? 'top-full left-1/2 -translate-x-1/2 -mt-0.5' : 'left-full top-1/2 -translate-y-1/2 -ml-0.5'
            )} />
          </div>
        )}
      </div>
    </div>
  )
})

Slider.displayName = 'Slider'
