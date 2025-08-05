import { useEffect, useRef } from 'preact/hooks'
import { cn } from '../../utils/cn'
import type { TimeWheelProps } from './types'

const sizeClasses = {
  sm: {
    container: 'h-24',
    wheel: 'py-2',
    item: 'h-8 text-xs'
  },
  md: {
    container: 'h-32',
    wheel: 'py-3',
    item: 'h-10 text-sm'
  },
  lg: {
    container: 'h-40',
    wheel: 'py-4',
    item: 'h-12 text-base'
  }
}

export function TimeWheel({
  values,
  selectedValue,
  onChange,
  disabledValues = [],
  size = 'md',
  'aria-label': ariaLabel
}: TimeWheelProps & { 'aria-label'?: string }) {
  const selectedRef = useRef<HTMLButtonElement>(null)

  // Scroll selected item into view
  useEffect(() => {
    if (selectedRef.current) {
      selectedRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    }
  }, [selectedValue])

  // Handle keyboard navigation
  const handleKeyDown = (event: KeyboardEvent) => {
    if (!values.length) return

    const currentIndex = values.indexOf(selectedValue)
    let newIndex = currentIndex

    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault()
        do {
          newIndex = newIndex <= 0 ? values.length - 1 : newIndex - 1
        } while (disabledValues.includes(values[newIndex]) && newIndex !== currentIndex)
        onChange?.(values[newIndex])
        break

      case 'ArrowDown':
        event.preventDefault()
        do {
          newIndex = newIndex >= values.length - 1 ? 0 : newIndex + 1
        } while (disabledValues.includes(values[newIndex]) && newIndex !== currentIndex)
        onChange?.(values[newIndex])
        break
    }
  }

  return (
    <div 
      className={cn(
        'relative overflow-hidden border-y border-gray-200 dark:border-gray-600',
        sizeClasses[size].container
      )}
    >
      {/* Scrollable items container */}
      <div
        role="listbox"
        aria-label={ariaLabel}
        className={cn(
          'h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600',
          sizeClasses[size].wheel
        )}
        style={{ scrollbarWidth: 'thin' }}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        {values.map((value) => {
          const isSelected = value === selectedValue
          const isDisabled = disabledValues?.includes(value)
          
          return (
            <button
              key={value}
              ref={isSelected ? selectedRef : undefined}
              role="option"
              aria-selected={isSelected}
              aria-disabled={isDisabled}
              className={cn(
                'w-full flex items-center justify-center transition-all duration-150',
                'focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-700',
                sizeClasses[size].item,
                isSelected 
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-900 dark:text-white',
                isDisabled 
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'hover:bg-gray-100 cursor-pointer'
              )}
              type="button"
              onClick={() => !isDisabled && onChange?.(value)}
            >
              {value}
            </button>
          )
        })}
      </div>
      
      {/* Selection indicator overlay */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none">
        <div className={cn(
          'mx-2 border-y-2 border-blue-500 dark:border-blue-400',
          sizeClasses[size].item
        )} />
      </div>
    </div>
  )
}
