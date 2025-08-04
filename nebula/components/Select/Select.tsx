import {useState, useRef, useCallback, useEffect} from 'preact/hooks'
import {cn} from '../../utils/cn'
import type {SelectProps, SelectOption} from './Select.types'

/**
 * Select Component - Dropdown selection with search and multi-select
 * 
 * Features:
 * - Single and multi-select modes
 * - Searchable options with filtering
 * - Custom options with icons and descriptions
 * - Clearable selection
 * - Loading states
 * - Keyboard navigation (arrow keys, enter, escape)
 * - ARIA combobox support
 * - Portal rendering for dropdown
 * - Form integration
 * - Error states with validation
 */
export function Select({
  options = [],
  value,
  multiple = false,
  searchable = false,
  placeholder = 'Select an option...',
  disabled = false,
  clearable = false,
  size = 'md',
  error,
  loading = false,
  maxHeight = 200,
  name,
  required = false,
  className,
  onChange,
  onSearch,
  onOpen,
  onClose,
  ...props
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [focusedIndex, setFocusedIndex] = useState(-1)
  
  const selectRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  // Normalize value to always be an array for internal use
  const normalizedValue = multiple 
    ? (Array.isArray(value) ? value : [])
    : (Array.isArray(value) ? value : (value ? [value] : []))

  // Filter options based on search query
  const filteredOptions = searchable && searchQuery
    ? options.filter(option => 
        option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        option.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options

  // Get selected options
  const selectedOptions = options.filter(option => normalizedValue.includes(option.value))

  // Size-based styling
  const sizeStyles = {
    sm: {
      trigger: 'h-8 px-2 text-sm',
      dropdown: 'text-sm',
      option: 'px-2 py-1 text-sm'
    },
    md: {
      trigger: 'h-10 px-3 text-base',
      dropdown: 'text-base', 
      option: 'px-3 py-2 text-base'
    },
    lg: {
      trigger: 'h-12 px-4 text-lg',
      dropdown: 'text-lg',
      option: 'px-4 py-3 text-lg'
    }
  }

  const currentSize = sizeStyles[size]

  const handleOpen = useCallback(() => {
    if (disabled) return
    setIsOpen(true)
    setFocusedIndex(-1)
    onOpen?.()
  }, [disabled, onOpen])

  const handleClose = useCallback(() => {
    setIsOpen(false)
    setSearchQuery('')
    setFocusedIndex(-1)
    onClose?.()
  }, [onClose])

  const handleToggle = useCallback(() => {
    if (isOpen) {
      handleClose()
    } else {
      handleOpen()
    }
  }, [isOpen, handleOpen, handleClose])

  const handleOptionSelect = useCallback((selectedOption: SelectOption) => {
    if (selectedOption.disabled) return

    if (multiple) {
      const currentValues = normalizedValue
      const newValues = currentValues.includes(selectedOption.value)
        ? currentValues.filter(v => v !== selectedOption.value)
        : [...currentValues, selectedOption.value]
      onChange?.(newValues)
    } else {
      onChange?.(selectedOption.value)
      handleClose()
    }
  }, [multiple, normalizedValue, onChange, handleClose])

  const handleClear = useCallback((e: Event) => {
    e.stopPropagation()
    onChange?.(multiple ? [] : '')
  }, [multiple, onChange])

  const handleSearchChange = useCallback((e: Event) => {
    const target = e.target as HTMLInputElement
    const query = target.value
    setSearchQuery(query)
    setFocusedIndex(-1)
    onSearch?.(query)
  }, [onSearch])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (disabled) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        if (!isOpen) {
          handleOpen()
        } else {
          setFocusedIndex(prev => 
            prev < filteredOptions.length - 1 ? prev + 1 : 0
          )
        }
        break

      case 'ArrowUp':
        e.preventDefault()
        if (isOpen) {
          setFocusedIndex(prev => 
            prev > 0 ? prev - 1 : filteredOptions.length - 1
          )
        }
        break

      case 'Enter':
        e.preventDefault()
        if (isOpen && focusedIndex >= 0) {
          handleOptionSelect(filteredOptions[focusedIndex])
        } else if (!isOpen) {
          handleOpen()
        }
        break

      case 'Escape':
        e.preventDefault()
        handleClose()
        break

      case ' ':
        if (!searchable) {
          e.preventDefault()
          handleToggle()
        }
        break

      case 'Backspace':
        if (multiple && Array.isArray(value) && value.length > 0 && searchQuery === '') {
          e.preventDefault()
          const newValues = [...value]
          newValues.pop()
          onChange?.(newValues)
        }
        break
    }
  }, [disabled, isOpen, focusedIndex, filteredOptions, handleOpen, handleClose, handleToggle, handleOptionSelect, multiple, value, searchQuery, searchable, onChange])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        handleClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, handleClose])

  // Scroll focused option into view
  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && listRef.current) {
      const focusedElement = listRef.current.children[focusedIndex] as HTMLElement
      if (focusedElement) {
        focusedElement.scrollIntoView({ block: 'nearest' })
      }
    }
  }, [isOpen, focusedIndex])

  // Display text for selected values
  const displayText = (() => {
    if (loading) return 'Loading...'
    if (selectedOptions.length === 0) return placeholder
    if (multiple) {
      return selectedOptions.length === 1 
        ? selectedOptions[0].label
        : `${selectedOptions.length} selected`
    }
    return selectedOptions[0]?.label || placeholder
  })()

  return (
    <div 
      ref={selectRef}
      class={cn('relative', className)}
      {...props}
    >
      {/* Hidden input for form integration */}
      <input
        type="hidden"
        name={name}
        value={Array.isArray(value) ? value.join(',') : value || ''}
        required={required}
      />

      {/* Trigger button */}
      <div
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={typeof placeholder === 'string' ? placeholder : 'Select option'}
        class={cn(
          // Base styles
          'relative w-full flex items-center justify-between bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer transition-colors',
          // Size
          currentSize.trigger,
          // States
          disabled 
            ? 'opacity-50 cursor-not-allowed bg-gray-50 dark:bg-gray-900'
            : 'hover:border-gray-400 dark:hover:border-gray-500',
          isOpen && 'border-blue-500 dark:border-blue-400 ring-1 ring-blue-500 dark:ring-blue-400',
          error && 'border-red-500 dark:border-red-400 ring-1 ring-red-500 dark:ring-red-400'
        )}
      >
        {/* Display area */}
        <div class="flex-1 flex items-center gap-2 min-w-0">
          {/* Multiple selection chips */}
          {multiple && Array.isArray(value) && value.length > 0 && (
            <div class="flex flex-wrap gap-1 min-w-0">
              {selectedOptions.slice(0, 3).map((option) => (
                <span 
                  key={option.value}
                  class="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded"
                >
                  {option.icon && <span class="flex-shrink-0">{option.icon}</span>}
                  <span class="truncate">{option.label}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleOptionSelect(option)
                    }}
                    class="flex-shrink-0 hover:bg-blue-200 dark:hover:bg-blue-800 rounded"
                  >
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              ))}
              {selectedOptions.length > 3 && (
                <span class="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded">
                  +{selectedOptions.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Single selection or search input */}
          {(!multiple || !value || (Array.isArray(value) && value.length === 0)) && (
            <>
              {searchable && isOpen ? (
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown}
                  placeholder={placeholder}
                  class="flex-1 bg-transparent border-none outline-none min-w-0"
                  autoFocus
                />
              ) : (
                <span class={cn(
                  'truncate',
                  selectedOptions.length === 0 && 'text-gray-500 dark:text-gray-400'
                )}>
                  {displayText}
                </span>
              )}
            </>
          )}
        </div>

        {/* Actions */}
        <div class="flex items-center gap-1 flex-shrink-0">
          {/* Loading spinner */}
          {loading && (
            <div class="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
          )}

          {/* Clear button */}
          {clearable && !loading && (selectedOptions.length > 0) && !disabled && (
            <button
              onClick={handleClear}
              class="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              tabIndex={-1}
            >
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          {/* Dropdown arrow */}
          <svg 
            class={cn(
              'w-4 h-4 text-gray-400 transition-transform',
              isOpen && 'rotate-180'
            )} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div class="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
          {filteredOptions.length === 0 ? (
            <div class={cn('py-6 text-center text-gray-500 dark:text-gray-400', currentSize.dropdown)}>
              {searchQuery ? 'No options found' : 'No options available'}
            </div>
          ) : (
            <ul
              ref={listRef}
              role="listbox"
              aria-multiselectable={multiple}
              class="max-h-60 overflow-auto"
              style={{ maxHeight: `${maxHeight}px` }}
            >
              {filteredOptions.map((option, index) => {
                const isSelected = multiple && Array.isArray(value)
                  ? value.includes(option.value)
                  : value === option.value
                const isFocused = index === focusedIndex

                return (
                  <li
                    key={option.value}
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={option.disabled}
                    onClick={() => handleOptionSelect(option)}
                    class={cn(
                      // Base styles
                      'cursor-pointer transition-colors flex items-center gap-2',
                      currentSize.option,
                      // States
                      option.disabled 
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700',
                      isFocused && 'bg-blue-50 dark:bg-blue-900/20',
                      isSelected && 'bg-blue-100 dark:bg-blue-900/40 text-blue-900 dark:text-blue-100'
                    )}
                  >
                    {/* Multiple selection checkbox */}
                    {multiple && (
                      <div class={cn(
                        'w-4 h-4 rounded border-2 flex items-center justify-center',
                        isSelected 
                          ? 'bg-blue-600 border-blue-600' 
                          : 'border-gray-300 dark:border-gray-600'
                      )}>
                        {isSelected && (
                          <svg class="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                          </svg>
                        )}
                      </div>
                    )}

                    {/* Option icon */}
                    {option.icon && (
                      <span class="flex-shrink-0">{option.icon}</span>
                    )}

                    {/* Option content */}
                    <div class="flex-1 min-w-0">
                      <div class="truncate">{option.label}</div>
                      {option.description && (
                        <div class="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {option.description}
                        </div>
                      )}
                    </div>

                    {/* Single selection indicator */}
                    {!multiple && isSelected && (
                      <svg class="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    )}
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
