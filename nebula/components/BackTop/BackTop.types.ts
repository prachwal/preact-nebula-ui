import type { ComponentChildren } from 'preact'
import type { CSSProperties } from 'preact/compat'

export type BackTopSize = 'sm' | 'md' | 'lg'
export type BackTopShape = 'circle' | 'square'
export type BackTopVariant = 'primary' | 'secondary' | 'outline' | 'ghost'

export interface BackTopProps {
  // Content
  children?: ComponentChildren
  icon?: ComponentChildren
  
  // Behavior  
  visibilityHeight?: number
  target?: () => HTMLElement | Window | Document
  duration?: number
  
  // Appearance
  size?: BackTopSize
  shape?: BackTopShape
  variant?: BackTopVariant
  
  // Positioning
  right?: number
  bottom?: number
  
  // Styling
  className?: string
  style?: CSSProperties
  
  // Callbacks
  onClick?: (event: MouseEvent) => void
  
  // Accessibility
  'aria-label'?: string
}
