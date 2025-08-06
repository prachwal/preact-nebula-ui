import { forwardRef } from 'preact/compat'
import { useState, useMemo, useCallback } from 'preact/hooks'
import { cn } from '../../utils/cn'
import type { PaginationProps, PaginationButtonProps } from './Pagination.types'

const paginationStyles = {
  container: {
    base: 'flex items-center justify-between gap-4 text-sm text-gray-700 dark:text-gray-300',
    compact: 'flex-col gap-2'
  },
  navigation: {
    base: 'flex items-center gap-1',
    sizes: {
      sm: 'gap-0.5',
      md: 'gap-1',
      lg: 'gap-1.5'
    }
  },
  button: {
    base: 'inline-flex items-center justify-center border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white dark:disabled:hover:bg-gray-800 transition-colors rounded-md font-medium',
    active: 'bg-blue-600 border-blue-600 text-white hover:bg-blue-700 hover:border-blue-700 dark:bg-blue-500 dark:border-blue-500 dark:hover:bg-blue-600',
    sizes: {
      sm: 'px-2 py-1 text-xs min-w-[28px] h-7',
      md: 'px-3 py-2 text-sm min-w-[36px] h-9',
      lg: 'px-4 py-2 text-base min-w-[44px] h-11'
    }
  },
  ellipsis: {
    base: 'inline-flex items-center justify-center text-gray-400 dark:text-gray-500',
    sizes: {
      sm: 'px-2 py-1 text-xs min-w-[28px] h-7',
      md: 'px-3 py-2 text-sm min-w-[36px] h-9',
      lg: 'px-4 py-2 text-base min-w-[44px] h-11'
    }
  },
  info: {
    base: 'text-gray-600 dark:text-gray-400',
    sizes: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base'
    }
  },
  select: {
    base: 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800',
    sizes: {
      sm: 'px-2 py-1 text-xs h-7',
      md: 'px-3 py-1 text-sm h-8',
      lg: 'px-3 py-2 text-base h-10'
    }
  },
  input: {
    base: 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 text-center',
    sizes: {
      sm: 'px-2 py-1 text-xs h-7 w-12',
      md: 'px-3 py-1 text-sm h-8 w-16',
      lg: 'px-3 py-2 text-base h-10 w-20'
    }
  }
}

const PaginationButton = forwardRef<HTMLButtonElement, PaginationButtonProps>(
  ({ children, active = false, disabled = false, size = 'md', variant = 'default', className, ...props }, ref) => {
    if (variant === 'ellipsis') {
      return (
        <span className={cn(paginationStyles.ellipsis.base, paginationStyles.ellipsis.sizes[size], className)}>
          {children || '...'}
        </span>
      )
    }

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          paginationStyles.button.base,
          paginationStyles.button.sizes[size],
          active && paginationStyles.button.active,
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

PaginationButton.displayName = 'PaginationButton'

export const Pagination = forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      currentPage,
      totalPages,
      totalItems,
      pageSize = 10,
      pageSizeOptions = [10, 20, 50, 100],
      size = 'md',
      maxPageButtons = 7,
      showPageSizeSelector = false,
      showQuickJump = false,
      showTotalItems = true,
      showPrevNext = true,
      showFirstLast = false,
      disabled = false,
      compact = false,
      ariaLabel = 'Pagination Navigation',
      labels = {},
      onPageChange,
      onPageSizeChange,
      className,
      ...props
    },
    ref
  ) => {
    const [jumpToPage, setJumpToPage] = useState('')

    const defaultLabels = {
      previous: 'Previous',
      next: 'Next',
      first: 'First',
      last: 'Last',
      jumpTo: 'Jump to page',
      pageSize: 'Items per page',
      totalItems: totalItems ? `${totalItems} items total` : '',
      ...labels
    }

    // Generate page numbers to display
    const pageNumbers = useMemo(() => {
      if (totalPages <= maxPageButtons) {
        return Array.from({ length: totalPages }, (_, i) => i + 1)
      }

      const half = Math.floor(maxPageButtons / 2)
      let start = Math.max(currentPage - half, 1)
      let end = Math.min(start + maxPageButtons - 1, totalPages)

      if (end - start + 1 < maxPageButtons) {
        start = Math.max(end - maxPageButtons + 1, 1)
      }

      const pages: (number | 'ellipsis')[] = []

      // Always show first page
      if (start > 1) {
        pages.push(1)
        if (start > 2) {
          pages.push('ellipsis')
        }
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      // Always show last page
      if (end < totalPages) {
        if (end < totalPages - 1) {
          pages.push('ellipsis')
        }
        pages.push(totalPages)
      }

      return pages
    }, [currentPage, totalPages, maxPageButtons])

    const handlePageChange = useCallback(
      (page: number) => {
        if (page >= 1 && page <= totalPages && page !== currentPage && !disabled) {
          onPageChange(page)
        }
      },
      [currentPage, totalPages, disabled, onPageChange]
    )

    const handlePageSizeChange = useCallback(
      (newPageSize: number) => {
        if (onPageSizeChange && !disabled) {
          onPageSizeChange(newPageSize)
        }
      },
      [disabled, onPageSizeChange]
    )

    const handleJumpToPage = useCallback(
      (e: Event) => {
        e.preventDefault()
        const page = parseInt(jumpToPage, 10)
        if (!isNaN(page)) {
          handlePageChange(page)
          setJumpToPage('')
        }
      },
      [jumpToPage, handlePageChange]
    )

    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        if (disabled) return

        switch (e.key) {
          case 'ArrowLeft':
            e.preventDefault()
            if (currentPage > 1) {
              handlePageChange(currentPage - 1)
            }
            break
          case 'ArrowRight':
            e.preventDefault()
            if (currentPage < totalPages) {
              handlePageChange(currentPage + 1)
            }
            break
          case 'Home':
            e.preventDefault()
            handlePageChange(1)
            break
          case 'End':
            e.preventDefault()
            handlePageChange(totalPages)
            break
        }
      },
      [disabled, currentPage, totalPages, handlePageChange]
    )

    // Don't render if no pages
    if (totalPages <= 1 && !showPageSizeSelector && !showTotalItems) {
      return null
    }

    return (
      <div
        ref={ref}
        className={cn(
          paginationStyles.container.base,
          compact && paginationStyles.container.compact,
          className
        )}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {/* Info section */}
        {(showTotalItems || showPageSizeSelector) && (
          <div className="flex items-center gap-4">
            {showTotalItems && totalItems && (
              <span className={cn(paginationStyles.info.base, paginationStyles.info.sizes[size])}>
                {defaultLabels.totalItems}
              </span>
            )}
            
            {showPageSizeSelector && onPageSizeChange && (
              <div className="flex items-center gap-2">
                <label 
                  htmlFor="page-size-select" 
                  className={cn(paginationStyles.info.base, paginationStyles.info.sizes[size])}
                >
                  {defaultLabels.pageSize}:
                </label>
                <select
                  id="page-size-select"
                  value={pageSize}
                  onChange={(e) => handlePageSizeChange(parseInt(e.currentTarget.value, 10))}
                  disabled={disabled}
                  className={cn(paginationStyles.select.base, paginationStyles.select.sizes[size])}
                >
                  {pageSizeOptions.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        {totalPages > 1 && (
          <nav
            className={cn(paginationStyles.navigation.base, paginationStyles.navigation.sizes[size])}
            aria-label={ariaLabel}
            role="navigation"
          >
            {/* First button */}
            {showFirstLast && (
              <PaginationButton
                size={size}
                disabled={disabled || currentPage === 1}
                onClick={() => handlePageChange(1)}
                aria-label={defaultLabels.first}
              >
                {defaultLabels.first}
              </PaginationButton>
            )}

            {/* Previous button */}
            {showPrevNext && (
              <PaginationButton
                size={size}
                disabled={disabled || currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                aria-label={defaultLabels.previous}
              >
                {defaultLabels.previous}
              </PaginationButton>
            )}

            {/* Page numbers */}
            {pageNumbers.map((page, index) =>
              page === 'ellipsis' ? (
                <PaginationButton key={`ellipsis-${index}`} size={size} variant="ellipsis" />
              ) : (
                <PaginationButton
                  key={page}
                  size={size}
                  active={page === currentPage}
                  disabled={disabled}
                  onClick={() => handlePageChange(page)}
                  aria-label={`Page ${page}`}
                  aria-current={page === currentPage ? 'page' : undefined}
                >
                  {page}
                </PaginationButton>
              )
            )}

            {/* Next button */}
            {showPrevNext && (
              <PaginationButton
                size={size}
                disabled={disabled || currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                aria-label={defaultLabels.next}
              >
                {defaultLabels.next}
              </PaginationButton>
            )}

            {/* Last button */}
            {showFirstLast && (
              <PaginationButton
                size={size}
                disabled={disabled || currentPage === totalPages}
                onClick={() => handlePageChange(totalPages)}
                aria-label={defaultLabels.last}
              >
                {defaultLabels.last}
              </PaginationButton>
            )}
          </nav>
        )}

        {/* Quick jump */}
        {showQuickJump && (
          <div className="flex items-center gap-2">
            <label 
              htmlFor="jump-to-page" 
              className={cn(paginationStyles.info.base, paginationStyles.info.sizes[size])}
            >
              {defaultLabels.jumpTo}:
            </label>
            <form onSubmit={handleJumpToPage} className="flex items-center gap-1">
              <input
                id="jump-to-page"
                type="number"
                min="1"
                max={totalPages}
                value={jumpToPage}
                onChange={(e) => setJumpToPage(e.currentTarget.value)}
                disabled={disabled}
                placeholder="1"
                className={cn(paginationStyles.input.base, paginationStyles.input.sizes[size])}
              />
              <PaginationButton
                type="submit"
                size={size}
                disabled={disabled || !jumpToPage}
              >
                Go
              </PaginationButton>
            </form>
          </div>
        )}

        {/* Live region for screen readers */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          Page {currentPage} of {totalPages}
        </div>
      </div>
    )
  }
)

Pagination.displayName = 'Pagination'
