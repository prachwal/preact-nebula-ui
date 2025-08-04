import { forwardRef } from 'preact/compat'
import { cn } from '../../utils/cn'
import type {
  TableProps,
  TableContainerProps,
  TableHeaderProps,
  TableBodyProps,
  TableRowProps,
  TableCellProps,
  TableHeaderCellProps,
  TableCaptionProps,
  TableFooterProps
} from './Table.types'

// Main Table component
const TableRoot = forwardRef<HTMLTableElement, TableProps>(
  ({ variant = 'simple', size = 'md', colorScheme = 'gray', className, children, ...props }, ref) => {
    return (
      <table
        ref={ref}
        className={cn(
          // Base styles
          'w-full border-collapse',
          
          // Variant styles
          {
            'border-separate border-spacing-0': variant === 'outline',
            '[&_tr:nth-child(even)]:bg-muted/50': variant === 'striped',
          },
          
          // Size styles
          {
            'text-xs': size === 'sm',
            'text-sm': size === 'md', 
            'text-base': size === 'lg',
          },
          
          // Color scheme styles (applied via CSS variables)
          {
            '[--table-primary-color:theme(colors.gray.900)] dark:[--table-primary-color:theme(colors.gray.100)]': colorScheme === 'gray',
            '[--table-primary-color:theme(colors.blue.900)] dark:[--table-primary-color:theme(colors.blue.100)]': colorScheme === 'primary',
            '[--table-primary-color:theme(colors.purple.900)] dark:[--table-primary-color:theme(colors.purple.100)]': colorScheme === 'secondary',
          },
          
          className
        )}
        {...props}
      >
        {children}
      </table>
    )
  }
)

TableRoot.displayName = 'Table'

// Table Container component
const TableContainer = forwardRef<HTMLDivElement, TableContainerProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative w-full overflow-auto',
          'border border-border rounded-md',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

TableContainer.displayName = 'TableContainer'

// Table Header component
const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <thead
        ref={ref}
        className={cn(
          'bg-muted/50 [&_tr]:border-b',
          className
        )}
        {...props}
      >
        {children}
      </thead>
    )
  }
)

TableHeader.displayName = 'TableHeader'

// Table Body component
const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <tbody
        ref={ref}
        className={cn(
          '[&_tr:last-child]:border-0',
          className
        )}
        {...props}
      >
        {children}
      </tbody>
    )
  }
)

TableBody.displayName = 'TableBody'

// Table Row component
const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ isSelected = false, isHovered = false, className, children, ...props }, ref) => {
    return (
      <tr
        ref={ref}
        className={cn(
          'border-b border-border transition-colors',
          'hover:bg-muted/50 data-[state=selected]:bg-muted',
          {
            'bg-muted': isSelected,
            'bg-muted/50': isHovered && !isSelected,
          },
          className
        )}
        data-state={isSelected ? 'selected' : undefined}
        {...props}
      >
        {children}
      </tr>
    )
  }
)

TableRow.displayName = 'TableRow'

// Table Cell component
const TableCell = forwardRef<HTMLTableDataCellElement, TableCellProps>(
  ({ isNumeric = false, className, children, ...props }, ref) => {
    return (
      <td
        ref={ref}
        className={cn(
          'p-4 align-middle [&:has([role=checkbox])]:pr-0',
          {
            'text-right': isNumeric,
          },
          className
        )}
        {...props}
      >
        {children}
      </td>
    )
  }
)

TableCell.displayName = 'TableCell'

// Table Header Cell component
const TableHeaderCell = forwardRef<HTMLTableHeaderCellElement, TableHeaderCellProps>(
  ({ sortable = false, sortDirection = 'none', onSort, isNumeric = false, className, children, ...props }, ref) => {
    const handleSort = () => {
      if (!sortable || !onSort) return
      
      const nextDirection = sortDirection === 'asc' ? 'desc' : 'asc'
      onSort(nextDirection)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!sortable || !onSort) return
      
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        handleSort()
      }
    }

    return (
      <th
        ref={ref}
        className={cn(
          'h-12 px-4 font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
          {
            'text-right': isNumeric,
            'cursor-pointer select-none hover:text-foreground': sortable,
          },
          className
        )}
        role="columnheader"
        tabIndex={sortable ? 0 : undefined}
        aria-sort={
          sortable
            ? sortDirection === 'asc'
              ? 'ascending'
              : sortDirection === 'desc'
              ? 'descending'
              : 'none'
            : undefined
        }
        onClick={sortable ? handleSort : undefined}
        onKeyDown={sortable ? handleKeyDown : undefined}
        {...props}
      >
        <div className={cn('flex items-center gap-2', { 'justify-end': isNumeric })}>
          {children}
          {sortable && (
            <div className="flex flex-col ml-1">
              <svg
                className={cn(
                  'h-3 w-3 transition-colors',
                  sortDirection === 'asc' ? 'text-foreground' : 'text-muted-foreground/50'
                )}
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                className={cn(
                  'h-3 w-3 transition-colors -mt-1',
                  sortDirection === 'desc' ? 'text-foreground' : 'text-muted-foreground/50'
                )}
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>
      </th>
    )
  }
)

TableHeaderCell.displayName = 'TableHeaderCell'

// Table Caption component
const TableCaption = forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <caption
        ref={ref}
        className={cn(
          'mt-4 text-sm text-muted-foreground',
          className
        )}
        {...props}
      >
        {children}
      </caption>
    )
  }
)

TableCaption.displayName = 'TableCaption'

// Table Footer component
const TableFooter = forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <tfoot
        ref={ref}
        className={cn(
          'bg-muted/50 font-medium [&>tr]:last:border-b-0',
          className
        )}
        {...props}
      >
        {children}
      </tfoot>
    )
  }
)

TableFooter.displayName = 'TableFooter'

// Create compound component
const TableWithSubComponents = Object.assign(TableRoot, {
  Container: TableContainer,
  Header: TableHeader,
  Body: TableBody,
  Row: TableRow,
  Cell: TableCell,
  HeaderCell: TableHeaderCell,
  Caption: TableCaption,
  Footer: TableFooter,
})

export default TableWithSubComponents
export { TableWithSubComponents as Table }
export {
  TableContainer,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHeaderCell,
  TableCaption,
  TableFooter,
}
