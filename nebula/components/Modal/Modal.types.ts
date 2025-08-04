import { ComponentChildren } from 'preact'

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

export type ModalCloseReason = 'backdrop' | 'escape' | 'close-button' | 'manual'

export interface ModalProps {
  /**
   * Whether the modal is open
   */
  isOpen: boolean
  
  /**
   * Callback fired when the modal should close
   */
  onClose: (reason: ModalCloseReason) => void
  
  /**
   * Size variant of the modal
   * @default 'md'
   */
  size?: ModalSize
  
  /**
   * Whether to show backdrop or how backdrop behaves
   * true: clickable backdrop closes modal
   * false: no backdrop
   * 'static': backdrop doesn't close modal
   * @default true
   */
  backdrop?: boolean | 'static'
  
  /**
   * Whether to close modal on Escape key
   * @default true
   */
  keyboard?: boolean
  
  /**
   * Whether modal content is scrollable
   * @default false
   */
  scrollable?: boolean
  
  /**
   * Whether to center modal vertically
   * @default true
   */
  centered?: boolean
  
  /**
   * Initial focus element selector or ref
   */
  initialFocus?: string | HTMLElement
  
  /**
   * Element to focus when modal closes
   */
  returnFocus?: HTMLElement
  
  /**
   * Additional CSS classes
   */
  className?: string
  
  /**
   * Modal content
   */
  children: ComponentChildren
  
  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string
  
  /**
   * ARIA labelledby for accessibility
   */
  'aria-labelledby'?: string
  
  /**
   * ARIA describedby for accessibility
   */
  'aria-describedby'?: string
}

export interface ModalHeaderProps {
  /**
   * Whether to show close button
   * @default true
   */
  showCloseButton?: boolean
  
  /**
   * Additional CSS classes
   */
  className?: string
  
  /**
   * Header content
   */
  children: ComponentChildren
}

export interface ModalBodyProps {
  /**
   * Additional CSS classes
   */
  className?: string
  
  /**
   * Body content
   */
  children: ComponentChildren
}

export interface ModalFooterProps {
  /**
   * Additional CSS classes
   */
  className?: string
  
  /**
   * Footer content
   */
  children: ComponentChildren
}
