import type { HTMLAttributes } from 'preact/compat'

export type PaginationSize = 'sm' | 'md' | 'lg'

export interface PaginationInfo {
  currentPage: number
  totalPages: number
  pageSize: number
  totalItems: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export interface PaginationCallbacks {
  onPageChange: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
}

export interface PaginationProps extends HTMLAttributes<HTMLDivElement>, PaginationCallbacks {
  /**
   * Current page number (1-indexed)
   */
  currentPage: number

  /**
   * Total number of pages
   */
  totalPages: number

  /**
   * Total number of items (for display)
   */
  totalItems?: number

  /**
   * Number of items per page
   */
  pageSize?: number

  /**
   * Available page size options for the selector
   */
  pageSizeOptions?: number[]

  /**
   * Size variant for the pagination component
   * @default 'md'
   */
  size?: PaginationSize

  /**
   * Maximum number of page buttons to show
   * @default 7
   */
  maxPageButtons?: number

  /**
   * Show page size selector
   * @default false
   */
  showPageSizeSelector?: boolean

  /**
   * Show quick jump input
   * @default false
   */
  showQuickJump?: boolean

  /**
   * Show total items count
   * @default true
   */
  showTotalItems?: boolean

  /**
   * Show previous/next buttons
   * @default true
   */
  showPrevNext?: boolean

  /**
   * Show first/last buttons
   * @default false
   */
  showFirstLast?: boolean

  /**
   * Disable the pagination component
   * @default false
   */
  disabled?: boolean

  /**
   * Compact mode for smaller screens
   * @default false
   */
  compact?: boolean

  /**
   * Custom aria-label for the pagination navigation
   */
  ariaLabel?: string

  /**
   * Custom labels for buttons
   */
  labels?: {
    previous?: string
    next?: string
    first?: string
    last?: string
    jumpTo?: string
    pageSize?: string
    totalItems?: string
  }
}

export interface PaginationButtonProps extends HTMLAttributes<HTMLButtonElement> {
  active?: boolean
  disabled?: boolean
  size?: PaginationSize
  variant?: 'default' | 'ellipsis'
  type?: 'button' | 'submit' | 'reset'
}
