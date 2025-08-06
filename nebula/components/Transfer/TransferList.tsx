import { useMemo } from 'preact/hooks'
import { Checkbox } from '../Checkbox'
import { Input } from '../Input'
import { Spinner } from '../Spinner'
import { cn } from '../../utils/cn'
import type { TransferListProps, TransferItem } from './types'

// Debug flag - set to true to enable debugging
const DEBUG_TRANSFER = false

// Debug utility
const debug = (...args: any[]) => {
  if (DEBUG_TRANSFER) {
    console.log('[TRANSFER DEBUG]', ...args)
  }
}

export function TransferList({
  direction,
  items,
  selectedKeys,
  config,
  title,
  searchValue,
  onSelect,
  onSelectAll,
  onSearch,
  onScroll
}: TransferListProps) {
  debug('🎯 TransferList initialized with props:', {
    direction,
    itemsCount: items.length,
    selectedKeysCount: selectedKeys.length,
    title,
    searchValue,
    config
  })

  const {
    searchable,
    showSelectAll,
    render,
    filterOption,
    height,
    size,
    disabled,
    loading,
    searchPlaceholder,
    footer
  } = config

  debug('📊 Config values:', {
    searchable,
    showSelectAll,
    height,
    size,
    disabled,
    loading
  })

  // Filter items based on search
  const filteredItems = useMemo(() => {
    debug('🔍 Filtering items with search value:', searchValue)
    
    if (!searchValue || !searchable) {
      debug('🔍 No filtering needed, returning all items:', items.length)
      return items
    }
    
    let filtered: TransferItem[]
    
    if (filterOption) {
      debug('🔍 Using custom filterOption function')
      filtered = items.filter(item => filterOption(searchValue, item))
    } else {
      // Default filter: search in title and description
      const searchLower = searchValue.toLowerCase()
      debug('🔍 Using default filter with search term:', searchLower)
      filtered = items.filter(item => 
        item.title.toLowerCase().includes(searchLower) ||
        (item.description && item.description.toLowerCase().includes(searchLower))
      )
    }
    
    debug('🔍 Filtered items result:', {
      originalCount: items.length,
      filteredCount: filtered.length,
      filtered: filtered.map(item => ({ key: item.key, title: item.title }))
    })
    
    return filtered
  }, [items, searchValue, searchable, filterOption])

  // Check if all items are selected
  const selectableItems = filteredItems.filter(item => !item.disabled)
  const isAllSelected = selectableItems.length > 0 && selectableItems.every(item => selectedKeys.includes(item.key))
  const isIndeterminate = selectedKeys.length > 0 && !isAllSelected

  debug('✅ Selection state analysis:', {
    selectableItemsCount: selectableItems.length,
    selectedKeysCount: selectedKeys.length,
    isAllSelected,
    isIndeterminate,
    selectableItems: selectableItems.map(item => ({ key: item.key, title: item.title, disabled: item.disabled })),
    selectedKeys
  })

  // Handle select all
  const handleSelectAll = (checked: boolean) => {
    debug('🔘 handleSelectAll triggered:', { checked, selectableItemsCount: selectableItems.length })
    
    if (checked) {
      const newKeys = [...selectedKeys]
      let addedCount = 0
      selectableItems.forEach(item => {
        if (!newKeys.includes(item.key)) {
          newKeys.push(item.key)
          addedCount++
        }
      })
      debug('🔘 Select all - adding keys:', { addedCount, newKeys })
      onSelect(newKeys)
    } else {
      const itemKeys = selectableItems.map(item => item.key)
      const filteredKeys = selectedKeys.filter(key => !itemKeys.includes(key))
      debug('🔘 Deselect all - removing keys:', { 
        originalCount: selectedKeys.length,
        filteredCount: filteredKeys.length,
        filteredKeys 
      })
      onSelect(filteredKeys)
    }
    onSelectAll(checked)
  }

  // Handle item selection
  const handleItemSelect = (item: TransferItem, checked: boolean) => {
    debug('🔘 handleItemSelect triggered:', { 
      itemKey: item.key, 
      itemTitle: item.title,
      checked, 
      disabled: item.disabled,
      currentSelectedKeys: selectedKeys 
    })
    
    if (item.disabled) {
      debug('❌ Item selection blocked - item is disabled')
      return
    }
    
    if (checked) {
      const newKeys = [...selectedKeys, item.key]
      debug('🔘 Adding item to selection:', { itemKey: item.key, newKeys })
      onSelect(newKeys)
    } else {
      const newKeys = selectedKeys.filter(key => key !== item.key)
      debug('🔘 Removing item from selection:', { itemKey: item.key, newKeys })
      onSelect(newKeys)
    }
  }

  // Size-based classes
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }

  const itemSizeClasses = {
    sm: 'px-3 py-2',
    md: 'px-4 py-3',
    lg: 'px-5 py-4'
  }

  return (
    <div className={cn(
      'flex flex-col border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800',
      disabled && 'opacity-50 pointer-events-none',
      sizeClasses[size]
    )}>
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-900 dark:text-white">
            {title}
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {selectedKeys.length}/{filteredItems.length}
          </span>
        </div>
        
        {showSelectAll && (
          <div className="mt-2">
            <Checkbox
              checked={isAllSelected}
              indeterminate={isIndeterminate}
              onChange={(e) => {
                debug('🔘 Select All checkbox change event:', {
                  checked: (e.target as HTMLInputElement).checked,
                  isAllSelected,
                  isIndeterminate,
                  selectableItemsCount: selectableItems.length,
                  event: e
                })
                handleSelectAll((e.target as HTMLInputElement).checked)
              }}
              disabled={disabled || selectableItems.length === 0}
              size={size}
            >
              Select all
            </Checkbox>
          </div>
        )}
      </div>

      {/* Search */}
      {searchable && (
        <div className="border-b border-gray-200 dark:border-gray-700 p-3">
          <Input
            type="text"
            value={searchValue}
            onChange={(e) => onSearch((e.target as HTMLInputElement).value)}
            placeholder={searchPlaceholder || 'Search...'}
            size={size}
            disabled={disabled}
            className="w-full"
          />
        </div>
      )}

      {/* Content */}
      <div 
        className="flex-1 overflow-y-auto"
        style={height ? { height: typeof height === 'number' ? `${height}px` : height } : undefined}
        onScroll={onScroll}
      >
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Spinner size={size} />
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="flex items-center justify-center py-8 text-gray-500 dark:text-gray-400">
            {searchValue ? 'No matching items' : 'No data'}
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {filteredItems.map(item => (
              <div
                key={item.key}
                className={cn(
                  'flex items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors',
                  itemSizeClasses[size],
                  item.disabled && 'opacity-50 cursor-not-allowed',
                  selectedKeys.includes(item.key) && 'bg-blue-50 dark:bg-blue-900/20'
                )}
              >
                <Checkbox
                  checked={selectedKeys.includes(item.key)}
                  onChange={(e) => {
                    debug('🔘 Item checkbox change event:', {
                      itemKey: item.key,
                      itemTitle: item.title,
                      checked: (e.target as HTMLInputElement).checked,
                      isCurrentlySelected: selectedKeys.includes(item.key),
                      disabled: disabled || item.disabled,
                      event: e
                    })
                    handleItemSelect(item, (e.target as HTMLInputElement).checked)
                  }}
                  disabled={disabled || item.disabled}
                  size={size}
                  className="mr-3"
                  aria-label={`Select ${item.title}`}
                />
                
                <div className="flex-1 min-w-0">
                  {render ? (
                    render(item)
                  ) : (
                    <div>
                      <div className={cn(
                        'font-medium text-gray-900 dark:text-white truncate',
                        item.className
                      )}>
                        {item.title}
                      </div>
                      {item.description && (
                        <div className="text-sm text-gray-500 dark:text-gray-400 truncate mt-1">
                          {item.description}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {footer && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-3">
          {footer({
            direction,
            filteredItems,
            selectedKeys,
            onSelectAll: handleSelectAll,
            onClear: () => onSelect([])
          })}
        </div>
      )}
    </div>
  )
}
