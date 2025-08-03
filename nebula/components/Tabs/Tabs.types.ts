import type { ComponentChildren } from 'preact'

export type TabsOrientation = 'horizontal' | 'vertical'
export type TabsVariant = 'line' | 'enclosed' | 'soft-rounded'
export type TabsSize = 'sm' | 'md' | 'lg'
export type TabsColorScheme = 'primary' | 'secondary' | 'success' | 'warning' | 'error'

export interface TabsProps {
  defaultValue?: string
  value?: string
  orientation?: TabsOrientation
  variant?: TabsVariant
  size?: TabsSize
  colorScheme?: TabsColorScheme
  onChange?: (value: string) => void
  children: ComponentChildren
  className?: string
  'data-testid'?: string
}

export interface TabListProps {
  children: ComponentChildren
  className?: string
}

export interface TabProps {
  value: string
  disabled?: boolean
  children: ComponentChildren
  className?: string
  'data-testid'?: string
}

export interface TabPanelsProps {
  children: ComponentChildren
  className?: string
}

export interface TabPanelProps {
  value: string
  children: ComponentChildren
  className?: string
  'data-testid'?: string
}
