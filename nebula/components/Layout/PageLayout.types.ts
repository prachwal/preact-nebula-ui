import type { ComponentChildren } from 'preact'

export type PageType = 'home' | 'component-demo' | 'documentation'

export interface PageLayoutProps {
  /** Type of page for different layouts */
  type?: PageType
  /** Page title */
  title?: string
  /** Page description */
  description?: string
  /** Show back navigation */
  showBack?: boolean
  /** Back navigation URL */
  backUrl?: string
  /** Back navigation label */
  backLabel?: string
  /** Page content */
  children: ComponentChildren
  /** CSS class name */
  className?: string
  /** Test ID for testing */
  'data-testid'?: string
}

export interface SectionProps {
  /** Section title */
  title?: string
  /** Section description */
  description?: string
  /** Section content */
  children: ComponentChildren
  /** CSS class name */
  className?: string
  /** Test ID for testing */
  'data-testid'?: string
}
