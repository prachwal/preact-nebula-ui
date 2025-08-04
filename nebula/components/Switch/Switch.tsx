import {useState, useRef, useCallback} from 'preact/hooks'
import {cn} from '../../utils/cn'
import type {SwitchProps} from './Switch.types'

/**
 * Switch Component - A toggle control for binary states
 * 
 * Features:
 * - Controlled and uncontrolled modes
 * - Multiple sizes (sm, md, lg)
 * - Color variants for checked state
 * - Label positioning (left, right)
 * - Custom icons for states
 * - Error states with messages
 * - Smooth animations
 * - Full accessibility support
 * - Form integration
 * - Touch-friendly interaction
 */
export function Switch({
  checked: controlledChecked,
  disabled = false,
  size = 'md',
  color = 'primary',
  label,
  description,
  labelPosition = 'right',
  icons,
  error = false,
  errorMessage,
  name,
  value,
  className,
  onChange,
  children,
  ...props
}: SwitchProps) {
  const [uncontrolledChecked, setUncontrolledChecked] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  
  const isControlled = controlledChecked !== undefined
  const checked = isControlled ? controlledChecked : uncontrolledChecked

  const handleChange = useCallback((event: Event) => {
    const target = event.target as HTMLInputElement
    const newChecked = target.checked

    if (!isControlled) {
      setUncontrolledChecked(newChecked)
    }

    onChange?.(newChecked, event)
  }, [onChange, isControlled])

  const handleClick = useCallback(() => {
    if (disabled) return
    inputRef.current?.click()
  }, [disabled])

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (disabled) return
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault()
      // Create a synthetic event that matches what the onChange expects
      const target = event.target as HTMLInputElement
      const newChecked = !target.checked
      
      if (!isControlled) {
        setUncontrolledChecked(newChecked)
      }

      // Create a synthetic change event
      const syntheticEvent = new Event('change', { bubbles: true })
      Object.defineProperty(syntheticEvent, 'target', {
        value: { ...target, checked: newChecked },
        enumerable: true
      })
      
      onChange?.(newChecked, syntheticEvent)
    }
  }, [disabled, isControlled, onChange])

  // Size-based styling
  const sizeStyles = {
    sm: {
      track: 'h-4 w-7',
      thumb: 'h-3 w-3',
      translate: 'translate-x-3',
      text: 'text-sm',
      gap: 'gap-2'
    },
    md: {
      track: 'h-5 w-9',
      thumb: 'h-4 w-4',
      translate: 'translate-x-4',
      text: 'text-base',
      gap: 'gap-2.5'
    },
    lg: {
      track: 'h-6 w-11',
      thumb: 'h-5 w-5',
      translate: 'translate-x-5',
      text: 'text-lg',
      gap: 'gap-3'
    }
  }

  // Color-based styling for checked state
  const colorStyles = {
    primary: 'bg-blue-600 dark:bg-blue-500',
    secondary: 'bg-gray-600 dark:bg-gray-500',
    success: 'bg-green-600 dark:bg-green-500',
    warning: 'bg-yellow-600 dark:bg-yellow-500',
    error: 'bg-red-600 dark:bg-red-500'
  }

  const currentSize = sizeStyles[size]
  const checkedColor = colorStyles[color]

  // Content (label or children)
  const content = children || label

  // Error styling
  const errorStyles = error ? 'text-red-600 dark:text-red-400' : ''

  const switchElement = (
    <div class="relative inline-block">
      {/* Hidden checkbox input for form integration and accessibility */}
      <input
        ref={inputRef}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        name={name}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        class="sr-only"
        aria-describedby={
          description || errorMessage 
            ? `switch-${name || 'default'}-description`
            : undefined
        }
        {...props}
      />
      
      {/* Visual switch track */}
      <div
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        class={cn(
          // Base styles
          'relative inline-flex items-center rounded-full transition-colors duration-200 ease-in-out cursor-pointer focus-within:ring-2 focus-within:ring-offset-2',
          // Size
          currentSize.track,
          // State colors
          checked 
            ? checkedColor
            : 'bg-gray-200 dark:bg-gray-700',
          // Disabled state
          disabled && 'opacity-50 cursor-not-allowed',
          // Error state
          error && 'ring-2 ring-red-500 ring-offset-2',
          // Focus ring color
          `focus-within:ring-${color}-500`,
          className
        )}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-checked={checked}
        {...(disabled && { 'aria-disabled': true })}
      >
        {/* Switch thumb */}
        <div
          class={cn(
            // Base styles
            'inline-block rounded-full bg-white shadow-lg transform transition-transform duration-200 ease-in-out',
            // Size
            currentSize.thumb,
            // Position based on checked state
            checked ? currentSize.translate : 'translate-x-0.5',
            // Disabled state
            disabled && 'shadow-none'
          )}
        >
          {/* Icons */}
          {icons && (
            <div class="flex items-center justify-center h-full w-full">
              {checked ? icons.checked : icons.unchecked}
            </div>
          )}
        </div>
      </div>
    </div>
  )

  // If no content, return just the switch
  if (!content && !description && !errorMessage) {
    return switchElement
  }

  // With content, return wrapped layout
  return (
    <div 
      class={cn(
        'flex items-start',
        currentSize.gap,
        labelPosition === 'left' ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      {switchElement}
      
      {(content || description || errorMessage) && (
        <div class="flex flex-col">
          {content && (
            <label
              class={cn(
                'font-medium cursor-pointer',
                currentSize.text,
                disabled ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed' : 'text-gray-900 dark:text-gray-100',
                errorStyles
              )}
              onClick={!disabled ? handleClick : undefined}
            >
              {content}
            </label>
          )}
          
          {(description || errorMessage) && (
            <div
              id={`switch-${name || 'default'}-description`}
              class={cn(
                'text-sm mt-1',
                error && errorMessage 
                  ? 'text-red-600 dark:text-red-400' 
                  : 'text-gray-500 dark:text-gray-400'
              )}
            >
              {error && errorMessage ? errorMessage : description}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
