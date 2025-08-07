import type { ComponentChild, ComponentProps } from 'preact'

export interface AffixProps extends Omit<ComponentProps<'div'>, 'onScroll'> {
  // Size variants (required pattern)
  size?: 'sm' | 'md' | 'lg'
  
  // Core props
  children?: ComponentChild
  className?: string
  
  // Affix-specific props
  offsetTop?: number
  offsetBottom?: number
  target?: HTMLElement | Window | string | (() => HTMLElement | Window)
  position?: 'top' | 'bottom'
  
  // Behavior
  disabled?: boolean
  threshold?: number
  
  // Event handlers
  onAffix?: (affixed: boolean) => void
  onScroll?: (scrollTop: number, affixed: boolean) => void
  
  // Accessibility props
  'aria-label'?: string
  'aria-describedby'?: string
}

export interface UseAffixOptions {
  offsetTop?: number
  offsetBottom?: number
  target?: HTMLElement | Window | string | (() => HTMLElement | Window)
  position?: 'top' | 'bottom'
  threshold?: number
  onAffix?: (affixed: boolean) => void
  onScroll?: (scrollTop: number, affixed: boolean) => void
  disabled?: boolean
}

export interface AffixState {
  affixed: boolean
  affixedTop: boolean
  affixedBottom: boolean
  scrollTop: number
  targetRect: DOMRect | null
  placeholderRect: DOMRect | null
}

export interface AffixActions {
  updatePosition: () => void
  reset: () => void
  setElementRef: (element: HTMLElement | null) => void
  setPlaceholderRef: (element: HTMLElement | null) => void
}
