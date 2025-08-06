import type { ComponentChild } from 'preact'

export interface TransferItem {
  key: string
  title: string
  description?: string
  disabled?: boolean
  className?: string
  data?: any
}

export interface TransferProps {
  /** All available items */
  dataSource: TransferItem[]
  
  /** Keys of selected items in target list (controlled) */
  targetKeys?: string[]
  
  /** Default target keys (uncontrolled) */
  defaultTargetKeys?: string[]
  
  /** Keys of selected items in both lists (controlled) */
  selectedKeys?: string[]
  
  /** Default selected keys (uncontrolled) */
  defaultSelectedKeys?: string[]
  
  /** Enable search functionality */
  searchable?: boolean
  
  /** Left panel title */
  leftTitle?: string
  
  /** Right panel title */
  rightTitle?: string
  
  /** Custom item renderer */
  render?: (item: TransferItem) => ComponentChild
  
  /** Filter function for search */
  filterOption?: (inputValue: string, item: TransferItem) => boolean
  
  /** Show select all checkbox */
  showSelectAll?: boolean
  
  /** Pagination settings */
  pagination?: boolean | {
    pageSize?: number
  }
  
  /** Height of the transfer panels */
  height?: number | string
  
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  
  /** Disabled state */
  disabled?: boolean
  
  /** Loading state */
  loading?: boolean
  
  /** Custom operation labels */
  operations?: [string, string] // [toRight, toLeft]
  
  /** Show search input */
  showSearch?: boolean
  
  /** Search placeholder */
  searchPlaceholder?: string
  
  /** Custom list footer */
  footer?: (props: {
    direction: 'left' | 'right'
    filteredItems: TransferItem[]
    selectedKeys: string[]
    onSelectAll: (selected: boolean) => void
    onClear: () => void
  }) => ComponentChild
  
  /** Event handlers */
  onChange?: (targetKeys: string[], direction: 'left' | 'right', moveKeys: string[]) => void
  onSelectChange?: (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => void
  onSearch?: (direction: 'left' | 'right', value: string) => void
  onScroll?: (direction: 'left' | 'right', e: Event) => void
  
  /** Accessibility */
  'aria-label'?: string
  'aria-labelledby'?: string
  'aria-describedby'?: string
  
  /** Custom CSS classes */
  className?: string
  
  /** Custom styles */
  style?: Record<string, any>
}

export interface TransferListProps {
  /** List direction */
  direction: 'left' | 'right'
  
  /** Items to display */
  items: TransferItem[]
  
  /** Selected item keys */
  selectedKeys: string[]
  
  /** Transfer configuration */
  config: {
    searchable: boolean
    showSelectAll: boolean
    render?: (item: TransferItem) => ComponentChild
    filterOption?: (inputValue: string, item: TransferItem) => boolean
    height?: number | string
    size: 'sm' | 'md' | 'lg'
    disabled: boolean
    loading: boolean
    searchPlaceholder?: string
    footer?: TransferProps['footer']
  }
  
  /** List title */
  title?: string
  
  /** Search value */
  searchValue: string
  
  /** Event handlers */
  onSelect: (keys: string[]) => void
  onSelectAll: (selected: boolean) => void
  onSearch: (value: string) => void
  onScroll?: (e: Event) => void
}

export interface UseTransferOptions {
  dataSource: TransferItem[]
  targetKeys?: string[]
  defaultTargetKeys?: string[]
  selectedKeys?: string[]
  defaultSelectedKeys?: string[]
  onChange?: TransferProps['onChange']
  onSelectChange?: TransferProps['onSelectChange']
}

export interface UseTransferReturn {
  /** Items in left list */
  leftItems: TransferItem[]
  
  /** Items in right list */
  rightItems: TransferItem[]
  
  /** Selected keys in left list */
  leftSelectedKeys: string[]
  
  /** Selected keys in right list */
  rightSelectedKeys: string[]
  
  /** Current target keys */
  targetKeys: string[]
  
  /** Move items to right */
  moveToRight: () => void
  
  /** Move items to left */
  moveToLeft: () => void
  
  /** Select items in left list */
  selectLeft: (keys: string[]) => void
  
  /** Select items in right list */
  selectRight: (keys: string[]) => void
  
  /** Select all items in left list */
  selectAllLeft: (selected: boolean) => void
  
  /** Select all items in right list */
  selectAllRight: (selected: boolean) => void
  
  /** Clear selections */
  clearSelections: () => void
  
  /** Check if move operations are disabled */
  canMoveToRight: boolean
  canMoveToLeft: boolean
}
