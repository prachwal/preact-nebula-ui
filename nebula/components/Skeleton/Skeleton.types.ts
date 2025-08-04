import type { ComponentProps, ComponentChildren } from 'preact'

export type SkeletonVariant = 'text' | 'avatar' | 'rectangular' | 'circular'
export type SkeletonAnimation = 'pulse' | 'wave' | 'none'

export interface SkeletonProps extends ComponentProps<'div'> {
  /** Skeleton variant shape */
  variant?: SkeletonVariant
  /** Custom width */
  width?: string | number
  /** Custom height */
  height?: string | number
  /** Animation type */
  animation?: SkeletonAnimation
  /** Number of lines for text variant */
  lines?: number
  /** Skeleton content (used for spacing) */
  children?: ComponentChildren
  /** Test ID for testing */
  'data-testid'?: string
}
