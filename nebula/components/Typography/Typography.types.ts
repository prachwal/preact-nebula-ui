import type { ComponentChildren, JSX } from 'preact'

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6
export type HeadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
export type HeadingWeight = 'normal' | 'medium' | 'semibold' | 'bold'

export interface HeadingProps extends Omit<JSX.HTMLAttributes<HTMLHeadingElement>, 'size'> {
  /** Semantic heading level (h1-h6) */
  level?: HeadingLevel
  /** Visual size (independent of semantic level) */
  size?: HeadingSize
  /** Font weight */
  weight?: HeadingWeight
  /** Text color */
  color?: 'default' | 'muted' | 'accent' | 'success' | 'warning' | 'error'
  /** Center align text */
  centered?: boolean
  /** Truncate long text */
  truncate?: boolean
  /** Children content */
  children: ComponentChildren
  /** CSS class name */
  className?: string
  /** Test ID for testing */
  'data-testid'?: string
}

export type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl'
export type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold'

export interface TextProps extends JSX.HTMLAttributes<HTMLParagraphElement> {
  /** Text size */
  size?: TextSize
  /** Font weight */
  weight?: TextWeight
  /** Text color */
  color?: 'default' | 'muted' | 'accent' | 'success' | 'warning' | 'error'
  /** Center align text */
  centered?: boolean
  /** Truncate long text */
  truncate?: boolean
  /** Render as different HTML element */
  as?: 'p' | 'span' | 'div'
  /** Children content */
  children: ComponentChildren
  /** CSS class name */
  className?: string
  /** Test ID for testing */
  'data-testid'?: string
}
