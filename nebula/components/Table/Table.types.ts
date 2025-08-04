import type { ComponentChildren, ComponentProps } from 'preact'

export interface TableProps extends Omit<ComponentProps<'table'>, 'size'> {
  /** Visual variant of the table */
  variant?: 'simple' | 'striped' | 'outline'
  /** Size of the table */
  size?: 'sm' | 'md' | 'lg'
  /** Color scheme for the table */
  colorScheme?: 'gray' | 'primary' | 'secondary'
  /** Custom CSS classes */
  className?: string
  /** Table content */
  children?: ComponentChildren
}

export interface TableContainerProps extends ComponentProps<'div'> {
  /** Custom CSS classes */
  className?: string
  /** Table container content */
  children?: ComponentChildren
}

export interface TableHeaderProps extends ComponentProps<'thead'> {
  /** Custom CSS classes */
  className?: string
  /** Header content */
  children?: ComponentChildren
}

export interface TableBodyProps extends ComponentProps<'tbody'> {
  /** Custom CSS classes */
  className?: string
  /** Body content */
  children?: ComponentChildren
}

export interface TableRowProps extends ComponentProps<'tr'> {
  /** Whether the row is selected */
  isSelected?: boolean
  /** Whether the row is hovered */
  isHovered?: boolean
  /** Custom CSS classes */
  className?: string
  /** Row content */
  children?: ComponentChildren
}

export interface TableCellProps extends ComponentProps<'td'> {
  /** Whether the cell contains numeric data */
  isNumeric?: boolean
  /** Custom CSS classes */
  className?: string
  /** Cell content */
  children?: ComponentChildren
}

export interface TableHeaderCellProps extends ComponentProps<'th'> {
  /** Whether the column is sortable */
  sortable?: boolean
  /** Current sort direction */
  sortDirection?: 'asc' | 'desc' | 'none'
  /** Sort callback function */
  onSort?: (direction: 'asc' | 'desc') => void
  /** Whether the cell contains numeric data */
  isNumeric?: boolean
  /** Custom CSS classes */
  className?: string
  /** Header cell content */
  children?: ComponentChildren
}

export interface TableCaptionProps extends ComponentProps<'caption'> {
  /** Custom CSS classes */
  className?: string
  /** Caption content */
  children?: ComponentChildren
}

export interface TableFooterProps extends ComponentProps<'tfoot'> {
  /** Custom CSS classes */
  className?: string
  /** Footer content */
  children?: ComponentChildren
}

// Compound component exports - using function components directly
export interface TableCompound {
  Container: typeof import('../Table').TableContainer
  Header: typeof import('../Table').TableHeader
  Body: typeof import('../Table').TableBody
  Row: typeof import('../Table').TableRow
  Cell: typeof import('../Table').TableCell
  HeaderCell: typeof import('../Table').TableHeaderCell
  Caption: typeof import('../Table').TableCaption
  Footer: typeof import('../Table').TableFooter
}
