import type { ComponentChildren, JSX } from 'preact'
import type { CommonProps } from '../../types/common'

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type AvatarShape = 'circle' | 'square' | 'rounded'
export type AvatarBadgePlacement = 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'

export interface AvatarProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'size'> {
  /** Image source URL */
  src?: string
  /** Alt text for the image */
  alt?: string
  /** Name to generate initials from if no image */
  name?: string
  /** Manual initials override */
  initials?: string
  /** Size of the avatar */
  size?: AvatarSize
  /** Shape of the avatar */
  shape?: AvatarShape
  /** Fallback content when image fails to load */
  children?: ComponentChildren
  /** Called when image fails to load */
  onError?: JSX.GenericEventHandler<HTMLImageElement>
  /** Loading state */
  loading?: 'eager' | 'lazy'
  /** CSS class name */
  className?: string
  /** Test ID for testing */
  'data-testid'?: string
}

export interface AvatarGroupProps extends CommonProps {
  /** Maximum number of avatars to show */
  max?: number
  /** Size for all avatars in the group */
  size?: AvatarSize
  /** Shape for all avatars in the group */
  shape?: AvatarShape
  /** Spacing between avatars */
  spacing?: 'tight' | 'normal' | 'loose'
  /** Children should be Avatar components */
  children: ComponentChildren
}

export interface AvatarBadgeProps extends CommonProps {
  /** Placement of the badge */
  placement?: AvatarBadgePlacement
  /** Status indicator (online, offline, busy, away) */
  status?: 'online' | 'offline' | 'busy' | 'away'
  /** Count number to display */
  count?: number
  /** Badge content - optional when using status or count */
  children?: ComponentChildren
}
