import type { ComponentChildren } from 'preact'

export type TabsOrientation = 'horizontal' | 'vertical'
export type TabsVariant = 'line' | 'enclosed' | 'soft-rounded'
export type TabsSize = 'sm' | 'md' | 'lg'
export type TabsColorScheme = 'primary' | 'secondary' | 'success' | 'warning' | 'error'

export interface TabsProps {
  /** Default selected tab value (uncontrolled) */
  defaultValue?: string
  /** Selected tab value (controlled) */
  value?: string
  /** Tab orientation */
  orientation?: TabsOrientation
  /** Visual variant */
  variant?: TabsVariant
  /** Size of tabs */
  size?: TabsSize
  /** Color scheme */
  colorScheme?: TabsColorScheme
  /** Called when tab changes */
  onChange?: (value: string) => void
  /** Children should be TabList and TabPanels */
  children: ComponentChildren
  /** CSS class name */
  className?: string
  /** Test ID for testing */
  'data-testid'?: string
}

export interface TabListProps {
  /** Tab list items */
  children: ComponentChildren
  /** CSS class name */
  className?: string
  /** Test ID for testing */
  'data-testid'?: string
}

export interface TabProps {
  /** Unique value for this tab */
  value: string
  /** Whether tab is disabled */
  disabled?: boolean
  /** Tab content */
  children: ComponentChildren
  /** CSS class name */
  className?: string
  /** Test ID for testing */
  'data-testid'?: string
}

export interface TabPanelsProps {
  /** Tab panels */
  children: ComponentChildren
  /** CSS class name */
  className?: string
  /** Test ID for testing */
  'data-testid'?: string
}

export interface TabPanelProps {
  /** Tab value this panel corresponds to */
  value: string
  /** Panel content */
  children: ComponentChildren
  /** CSS class name */
  className?: string
  /** Test ID for testing */
  'data-testid'?: string
}
