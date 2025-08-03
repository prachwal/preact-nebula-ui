import type { ComponentProps } from 'preact'
import type { ComponentChildren } from 'preact'

export type CardVariant = 'default' | 'elevated' | 'outlined'
export type CardSize = 'sm' | 'md' | 'lg'

export interface CardProps extends Omit<ComponentProps<'div'>, 'size'> {
  /** Card variant style */
  variant?: CardVariant
  /** Card size */
  size?: CardSize
  /** Card padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg'
  /** Whether card is interactive (hoverable) */
  interactive?: boolean
  /** Enable hover effects */
  hover?: boolean
  /** Card content */
  children?: ComponentChildren
  /** Test ID for testing */
  'data-testid'?: string
}

export interface CardHeaderProps extends ComponentProps<'div'> {
  /** Header content */
  children?: ComponentChildren
  /** Test ID for testing */
  'data-testid'?: string
}

export interface CardBodyProps extends ComponentProps<'div'> {
  /** Body content */
  children?: ComponentChildren
  /** Test ID for testing */
  'data-testid'?: string
}

export interface CardFooterProps extends ComponentProps<'div'> {
  /** Footer content */
  children?: ComponentChildren
  /** Test ID for testing */
  'data-testid'?: string
}
