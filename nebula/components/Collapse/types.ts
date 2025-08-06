import { ComponentChild } from 'preact'

export interface CollapseProps {
  /** Active panel key(s) - controlled */
  activeKey?: string | string[]
  /** Default active panel key(s) - uncontrolled */
  defaultActiveKey?: string | string[]
  /** Enable accordion mode (only one panel can be open) */
  accordion?: boolean
  /** Show border around panels */
  bordered?: boolean
  /** Custom expand icon renderer */
  expandIcon?: (props: { isActive: boolean; disabled?: boolean }) => ComponentChild
  /** Callback when panel expansion changes */
  onChange?: (key: string | string[]) => void
  /** Panel children */
  children: ComponentChild
  /** Additional CSS classes */
  className?: string
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Disable all panels */
  disabled?: boolean
}

export interface CollapsePanelProps {
  /** Unique panel key */
  key: string
  /** Panel header content */
  header: ComponentChild
  /** Disable this panel */
  disabled?: boolean
  /** Show expand arrow */
  showArrow?: boolean
  /** Extra content in header */
  extra?: ComponentChild
  /** Panel content */
  children: ComponentChild
  /** Additional CSS classes */
  className?: string
  /** Custom expand icon renderer */
  expandIcon?: (props: { isActive: boolean; disabled?: boolean }) => ComponentChild
  /** Force panel state (internal use) */
  isActive?: boolean
  /** Force animation state (internal use) */
  isAnimating?: boolean
  /** Panel toggle handler (internal use) */
  onToggle?: () => void
}

export interface CollapseState {
  activeKeys: string[]
  animating: Set<string>
}

export interface UseCollapseAnimationReturn {
  activeKeys: string[]
  isAnimating: (key: string) => boolean
  togglePanel: (key: string) => void
  setActiveKeys: (keys: string[]) => void
}
