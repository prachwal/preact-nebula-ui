import type { ReactNode } from 'preact/compat'

export interface BreadcrumbItem {
  /** Text to display for the breadcrumb item */
  label: string
  /** URL to navigate to when clicked (if not provided, item will be non-clickable) */
  href?: string
  /** Icon to display before the label */
  icon?: ReactNode
  /** Whether this is the current page (will be styled differently and non-clickable) */
  current?: boolean
}

export type BreadcrumbSeparatorType = 'arrow' | 'slash' | 'chevron'

export interface BreadcrumbProps {
  /** Array of breadcrumb items to display */
  items: BreadcrumbItem[]
  /** Separator to use between items (can be a predefined type or custom element) */
  separator?: BreadcrumbSeparatorType | ReactNode
  /** Maximum number of items to show before collapsing (0 = no limit) */
  maxItems?: number
  /** Whether to show a home icon at the beginning */
  showHome?: boolean
  /** URL for the home icon link */
  homeHref?: string
  /** Additional CSS classes */
  className?: string
}
