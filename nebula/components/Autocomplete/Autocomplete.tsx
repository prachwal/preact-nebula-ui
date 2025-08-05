import { forwardRef } from 'preact/compat'
import { useState, useEffect, useRef, useCallback, useMemo, useImperativeHandle } from 'preact/hooks'
import type { AutocompleteProps, AutocompleteRef, AutocompleteOption } from './types'
import { cn } from '../../utils/cn'
import { Portal } from '../Portal'

const Autocomplete = forwardRef<AutocompleteRef, AutocompleteProps>(({
  value,
  defaultValue,
  options = [],
  groupedOptions,
  multiple = false,
  maxSelections,
  placeholder = 'Search...',
  size = 'md',
  disabled = false,
  readOnly = false,
  required = false,
  error = false,
  errorMessage,
  loading = false,
  noOptionsText = 'No options found',
  loadingText = 'Loading...',
  allowCreate = false,
  createText = 'Create',
  minSearchLength = 0,
  debounceMs = 300,
  maxDisplayOptions = 100,
  clearOnSelect = false,
  showClear = true,
  filterFn,
  onSearch,
  onChange,
  onSelect,
  onInputChange,
  onCreate,
  renderOption,
  renderTag,
  renderNoOptions,
  renderLoading,
  renderCreateOption,
  className,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  ...props
}, ref) => {
  // Internal state
  const [internalValue, setInternalValue] = useState<AutocompleteOption | AutocompleteOption[] | null>(() => {
    if (value !== undefined) return value
    if (defaultValue !== undefined) return defaultValue
    return multiple ? [] : null
  })

  // Use controlled value if provided, otherwise use internal value
  const currentValue = value !== undefined ? value : internalValue

  // Input and dropdown state
  const [inputValue, setInputValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [filteredOptions, setFilteredOptions] = useState<AutocompleteOption[]>([])
  const [asyncOptions, setAsyncOptions] = useState<AutocompleteOption[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 280 })

  // Refs
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const debounceRef = useRef<NodeJS.Timeout>()

  // Flatten grouped options if provided
  const allOptions = useMemo(() => {
    if (groupedOptions) {
      return groupedOptions.flatMap(group => group.options)
    }
    return [...options, ...asyncOptions]
  }, [options, asyncOptions, groupedOptions])

  // Get selected values as array
  const selectedValues = useMemo(() => {
    if (!currentValue) return []
    return Array.isArray(currentValue) ? currentValue : [currentValue]
  }, [currentValue])

  // Filter options based on search
  const getFilteredOptions = useCallback((searchTerm: string, optionsToFilter: AutocompleteOption[]) => {
    // If no search term and minSearchLength > 0, return empty array (unless we have groupedOptions)
    if (!searchTerm && minSearchLength > 0 && !groupedOptions) return []

    // Special case: show all grouped options if groupedOptions exist, searchTerm is empty, and minSearchLength is 0
    if (!searchTerm && minSearchLength === 0 && groupedOptions) {
      let allGrouped = groupedOptions.flatMap(group => group.options)
      if (multiple) {
        const selectedIds = selectedValues.map(v => v.value)
        allGrouped = allGrouped.filter(option => !selectedIds.includes(option.value))
      }
      return allGrouped.slice(0, maxDisplayOptions)
    }

    // If no search term and we have regular options and minSearchLength is 0, show all options
    if (!searchTerm && minSearchLength === 0) {
      let filtered = optionsToFilter.filter(option => !option.disabled)
      
      // Exclude already selected options in multiple mode
      if (multiple) {
        const selectedIds = selectedValues.map(v => v.value)
        filtered = filtered.filter(option => !selectedIds.includes(option.value))
      }
      
      return filtered.slice(0, maxDisplayOptions)
    }

    // If searchTerm is less than minSearchLength, return empty array
    if (searchTerm.length < minSearchLength) return []

    let filtered: AutocompleteOption[]

    if (filterFn) {
      filtered = filterFn(optionsToFilter, searchTerm)
    } else {
      const lowerSearch = searchTerm.toLowerCase()
      filtered = optionsToFilter.filter(option => 
        !option.disabled &&
        (option.label.toLowerCase().includes(lowerSearch) ||
         option.description?.toLowerCase().includes(lowerSearch))
      )
    }

    // Exclude already selected options in multiple mode
    if (multiple) {
      const selectedIds = selectedValues.map(v => v.value)
      filtered = filtered.filter(option => !selectedIds.includes(option.value))
    }

    return filtered.slice(0, maxDisplayOptions)
  }, [filterFn, minSearchLength, multiple, selectedValues, maxDisplayOptions, groupedOptions])

  // Handle async search with debouncing
  useEffect(() => {
    if (!onSearch || inputValue.length < minSearchLength) {
      setFilteredOptions(getFilteredOptions(inputValue, allOptions))
      return
    }

    // Clear previous timeout
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    setIsSearching(true)

    debounceRef.current = setTimeout(async () => {
      try {
        const searchResults = await onSearch(inputValue)
        setAsyncOptions(Array.isArray(searchResults) ? searchResults : [])
      } catch (error) {
        console.error('Autocomplete search error:', error)
        setAsyncOptions([])
      } finally {
        setIsSearching(false)
      }
    }, debounceMs)

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [inputValue, onSearch, minSearchLength, debounceMs])

  // Update filtered options when options change
  useEffect(() => {
    if (!onSearch) {
      setFilteredOptions(getFilteredOptions(inputValue, allOptions))
    }
  }, [allOptions, inputValue, getFilteredOptions, onSearch])

  // Update filtered options when async options change
  useEffect(() => {
    if (onSearch) {
      setFilteredOptions(getFilteredOptions(inputValue, asyncOptions))
    }
  }, [asyncOptions, inputValue, getFilteredOptions, onSearch])

  // Update dropdown position
  const updateDropdownPosition = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      
      setDropdownPosition({
        top: rect.bottom + 4,
        left: rect.left,
        width: Math.max(rect.width, 280)
      })
    }
  }, [])

  // Handle input change
  const handleInputChange = useCallback((event: Event) => {
    const target = event.target as HTMLInputElement
    const newValue = target.value

    setInputValue(newValue)
    setHighlightedIndex(-1)
    setIsOpen(true)

    onInputChange?.(newValue)
  }, [onInputChange])

  // Handle option selection
  const handleOptionSelect = useCallback((option: AutocompleteOption) => {
    if (option.disabled) return

    let newValue: AutocompleteOption | AutocompleteOption[] | null

    if (multiple) {
      const currentArray = Array.isArray(currentValue) ? currentValue : []
      
      // Check if already selected
      const isAlreadySelected = currentArray.some(v => v.value === option.value)
      if (isAlreadySelected) return

      // Check max selections
      if (maxSelections && currentArray.length >= maxSelections) return

      newValue = [...currentArray, option]
    } else {
      newValue = option
      setIsOpen(false)
      
      if (clearOnSelect) {
        setInputValue('')
      } else {
        setInputValue(option.label)
      }
    }

    setInternalValue(newValue)
    onChange?.(newValue)
    onSelect?.(option)

    if (multiple) {
      setInputValue('')
      inputRef.current?.focus()
    }
  }, [multiple, currentValue, maxSelections, clearOnSelect, onChange, onSelect])

  // Handle tag removal (multiple mode)
  const handleTagRemove = useCallback((optionToRemove: AutocompleteOption) => {
    if (!multiple || !Array.isArray(currentValue)) return

    const newValue = currentValue.filter(option => option.value !== optionToRemove.value)
    setInternalValue(newValue)
    onChange?.(newValue.length > 0 ? newValue : null)
  }, [multiple, currentValue, onChange])

  // Handle create option
  const handleCreateOption = useCallback(() => {
    if (!allowCreate || !inputValue.trim()) return

    onCreate?.(inputValue.trim())
    setInputValue('')
    setIsOpen(false)
  }, [allowCreate, inputValue, onCreate])

  // Handle keyboard navigation
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!isOpen) {
      if (event.key === 'Enter' || event.key === 'ArrowDown') {
        event.preventDefault()
        setIsOpen(true)
        setHighlightedIndex(0)
      }
      return
    }

    const optionsCount = filteredOptions.length + (allowCreate && inputValue ? 1 : 0)

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        setHighlightedIndex(prev => (prev + 1) % optionsCount)
        break
      case 'ArrowUp':
        event.preventDefault()
        setHighlightedIndex(prev => prev <= 0 ? optionsCount - 1 : prev - 1)
        break
      case 'Enter':
        event.preventDefault()
        if (highlightedIndex >= 0) {
          if (allowCreate && inputValue && highlightedIndex === filteredOptions.length) {
            handleCreateOption()
          } else if (filteredOptions[highlightedIndex]) {
            handleOptionSelect(filteredOptions[highlightedIndex])
          }
        }
        break
      case 'Escape':
        event.preventDefault()
        setIsOpen(false)
        setHighlightedIndex(-1)
        inputRef.current?.blur()
        break
      case 'Backspace':
        if (multiple && !inputValue && Array.isArray(currentValue) && currentValue.length > 0) {
          event.preventDefault()
          const lastOption = currentValue[currentValue.length - 1]
          handleTagRemove(lastOption)
        }
        break
    }
  }, [isOpen, filteredOptions, highlightedIndex, allowCreate, inputValue, multiple, currentValue, handleOptionSelect, handleCreateOption, handleTagRemove])

  // Handle clear
  const handleClear = useCallback(() => {
    const newValue = multiple ? [] : null
    setInternalValue(newValue)
    setInputValue('')
    setIsOpen(false)
    onChange?.(newValue)
    inputRef.current?.focus()
  }, [multiple, onChange])

  // Handle clicks outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setHighlightedIndex(-1)
      }
    }

    const handleScroll = () => {
      if (isOpen) {
        updateDropdownPosition()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    window.addEventListener('scroll', handleScroll, true)
    window.addEventListener('resize', updateDropdownPosition)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('scroll', handleScroll, true)
      window.removeEventListener('resize', updateDropdownPosition)
    }
  }, [isOpen, updateDropdownPosition])

  // Update position when dropdown opens
  useEffect(() => {
    if (isOpen) {
      updateDropdownPosition()
    }
  }, [isOpen, updateDropdownPosition])

  // Size classes
  const sizeClasses = {
    sm: 'text-sm px-2 py-1 h-8',
    md: 'text-sm px-3 py-2 h-10', 
    lg: 'text-base px-4 py-3 h-12'
  }

  // Expose ref methods
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur(),
    clear: handleClear,
    getInputValue: () => inputValue,
    setInputValue: (value: string) => setInputValue(value)
  }), [inputValue, handleClear])

  // Show clear button condition
  const shouldShowClear = showClear && !disabled && !readOnly && (
    (multiple && Array.isArray(currentValue) && currentValue.length > 0) ||
    (!multiple && currentValue) ||
    inputValue
  )

  return (
    <div className="inline-flex flex-col gap-1">
      <div
        ref={containerRef}
        className={cn(
          'relative',
          className
        )}
      >
        {/* Input container */}
        <div className={cn(
          'relative flex items-center w-full border rounded-md transition-colors',
          'bg-white dark:bg-gray-800',
          'text-gray-900 dark:text-white',
          'placeholder-gray-500 dark:placeholder-gray-400',
          {
            'border-gray-300 dark:border-gray-600 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-0': !error && !disabled,
            'border-red-500 dark:border-red-400 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500 focus-within:ring-offset-0': error && !disabled,
            'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 cursor-not-allowed': disabled,
            'focus-within:ring-blue-400 dark:focus-within:ring-blue-400 dark:focus-within:border-blue-400': !error && !disabled
          }
        )}>
          {/* Selected tags (multiple mode) */}
          {multiple && Array.isArray(currentValue) && currentValue.length > 0 && (
            <div className="flex flex-wrap gap-1 p-1 min-h-0">
              {currentValue.map((option) => (
                <div
                  key={option.value}
                  className={cn(
                    'inline-flex items-center gap-1 px-2 py-1 rounded text-xs',
                    'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
                    'border border-blue-200 dark:border-blue-700'
                  )}
                >
                  {renderTag ? renderTag(option, () => handleTagRemove(option)) : (
                    <>
                      <span>{option.label}</span>
                      {!disabled && !readOnly && (
                        <button
                          type="button"
                          onClick={() => handleTagRemove(option)}
                          className="hover:text-blue-600 dark:hover:text-blue-300"
                          aria-label={`Remove ${option.label}`}
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Input field */}
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsOpen(true)}
            onMouseDown={() => setIsOpen(true)}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            className={cn(
              'flex-1 outline-none bg-transparent border-none',
              sizeClasses[size],
              multiple && Array.isArray(currentValue) && currentValue.length > 0 && 'px-1'
            )}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-autocomplete="list"
            aria-activedescendant={highlightedIndex >= 0 ? `option-${highlightedIndex}` : undefined}
            role="combobox"
            {...props}
          />

          {/* Loading spinner */}
          {(loading || isSearching) && (
            <div className="absolute right-8 flex items-center">
              <svg className="w-4 h-4 animate-spin text-gray-400" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
          )}

          {/* Clear button */}
          {shouldShowClear && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-1 p-1 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
              aria-label="Clear selection"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Dropdown */}
        {isOpen && (
          <Portal>
            <div className="fixed inset-0 z-50 pointer-events-none">
              <div
                className="absolute bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg pointer-events-auto max-h-60 overflow-auto"
                style={{
                  top: dropdownPosition.top,
                  left: dropdownPosition.left,
                  width: dropdownPosition.width
                }}
              >
                <ul
                  ref={listRef}
                  role="listbox"
                  className="py-1"
                >
                  {/* Loading state */}
                  {(loading || isSearching) && (
                    <li className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                      {renderLoading ? renderLoading() : loadingText}
                    </li>
                  )}

                  {/* Options */}
                  {!loading && !isSearching && filteredOptions.map((option, index) => (
                    <li
                      key={option.value}
                      id={`option-${index}`}
                      role="option"
                      aria-selected={selectedValues.some(v => v.value === option.value)}
                      className={cn(
                        'px-3 py-2 cursor-pointer text-sm transition-colors',
                        {
                          'bg-blue-50 dark:bg-blue-900/50': index === highlightedIndex,
                          'text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700': !option.disabled && index !== highlightedIndex,
                          'text-gray-400 dark:text-gray-600 cursor-not-allowed': option.disabled
                        }
                      )}
                      onClick={() => handleOptionSelect(option)}
                    >
                      {renderOption ? renderOption(option, index === highlightedIndex) : (
                        <div>
                          <div>{option.label}</div>
                          {option.description && (
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {option.description}
                            </div>
                          )}
                        </div>
                      )}
                    </li>
                  ))}

                  {/* Create option */}
                  {!loading && !isSearching && allowCreate && inputValue && filteredOptions.length === 0 && (
                    <li
                      role="option"
                      className={cn(
                        'px-3 py-2 cursor-pointer text-sm transition-colors',
                        'text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/50',
                        {
                          'bg-blue-50 dark:bg-blue-900/50': highlightedIndex === filteredOptions.length
                        }
                      )}
                      onClick={handleCreateOption}
                    >
                      {renderCreateOption ? renderCreateOption(inputValue) : (
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          {createText} "{inputValue}"
                        </div>
                      )}
                    </li>
                  )}

                  {/* No options */}
                  {!loading && !isSearching && filteredOptions.length === 0 && (!allowCreate || !inputValue) && (
                    <li className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                      {renderNoOptions ? renderNoOptions(inputValue) : noOptionsText}
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </Portal>
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

Autocomplete.displayName = 'Autocomplete'

export { Autocomplete }
