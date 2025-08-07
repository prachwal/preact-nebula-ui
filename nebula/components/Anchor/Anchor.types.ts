import type { ComponentChildren } from 'preact'
import type { CSSProperties } from 'preact/compat'

export type AnchorSize = 'sm' | 'md' | 'lg'
export type AnchorVariant = 'default' | 'subtle' | 'ghost'

export interface AnchorItem {
  key: string
  href: string
  title: string
  children?: AnchorItem[]
}

export interface AnchorProps {
  // Content
  items?: AnchorItem[]
  children?: ComponentChildren
  
  // Navigation
  activeKey?: string
  targetOffset?: number
  bounds?: number
  offsetTop?: number
  target?: () => HTMLElement | Window
  
  // Appearance
  size?: AnchorSize
  variant?: AnchorVariant
  direction?: 'horizontal' | 'vertical'
  
  // Behavior
  affix?: boolean
  showInkInFixed?: boolean
  clickable?: boolean
  
  // Styling
  className?: string
  style?: CSSProperties
  wrapperClassName?: string
  wrapperStyle?: CSSProperties
  
  // Callbacks
  onChange?: (currentActiveLink: string) => void
  onClick?: (
    e: MouseEvent,
    link: { title: string; href: string }
  ) => void
  
  // Accessibility
  'aria-label'?: string
}

export interface AnchorLinkProps {
  href: string
  title: string
  children?: ComponentChildren
  className?: string
  style?: CSSProperties
}

// Default messages for internationalization
export const defaultMessages = {
  'anchor.backToTop': 'Back to top',
  'anchor.jumpTo': 'Jump to {title}'
}
