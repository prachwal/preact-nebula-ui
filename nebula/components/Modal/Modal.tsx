import type { JSX } from 'preact'
import { useRef, useEffect, useContext } from 'preact/hooks'
import { createContext } from 'preact'
import { cn } from '../../utils/cn'
import type { ModalProps, ModalHeaderProps, ModalBodyProps, ModalFooterProps, ModalSize, ModalCloseReason } from './Modal.types'
import { Portal } from './Portal'
import { useFocusTrap, useBodyScrollLock } from './focusUtils'

// Context for sharing close function with child components
const ModalContext = createContext<{
  onClose: (reason: ModalCloseReason) => void
} | null>(null)

/**
 * Modal component for displaying content in an overlay
 */
export function Modal({
  isOpen,
  onClose,
  size = 'md',
  backdrop = true,
  keyboard = true,
  scrollable = false,
  centered = true,
  initialFocus,
  returnFocus,
  className,
  children,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  ...props
}: ModalProps): JSX.Element | null {
  const modalRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)

  // Handle focus trap
  useFocusTrap(modalRef, {
    isActive: isOpen,
    initialFocus,
    returnFocus
  })

  // Handle body scroll lock
  useBodyScrollLock(isOpen)

  // Handle escape key
  useEffect(() => {
    if (!isOpen || !keyboard) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose('escape')
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, keyboard, onClose])

  // Handle backdrop click
  const handleBackdropClick = (event: MouseEvent) => {
    if (backdrop === true && event.target === backdropRef.current) {
      onClose('backdrop')
    }
  }

  if (!isOpen) return null

  const sizeClasses: Record<ModalSize, string> = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full mx-4'
  }

  return (
    <Portal>
      <div
        ref={backdropRef}
        className={cn(
          'fixed inset-0 z-50 flex items-center justify-center p-4',
          centered ? 'items-center' : 'items-start pt-16',
          backdrop !== false && 'bg-black bg-opacity-50'
        )}
        onClick={handleBackdropClick}
        data-testid="modal-backdrop"
      >
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          aria-describedby={ariaDescribedby}
          className={cn(
            'relative w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl',
            'transform transition-all duration-200 ease-out',
            'max-h-full',
            scrollable ? 'flex flex-col' : '',
            sizeClasses[size],
            className
          )}
          onClick={(e) => e.stopPropagation()}
          data-testid="modal-content"
          {...props}
        >
          <ModalContext.Provider value={{ onClose }}>
            {children}
          </ModalContext.Provider>
        </div>
      </div>
    </Portal>
  )
}

/**
 * Modal header component
 */
export function ModalHeader({
  showCloseButton = true,
  className,
  children,
  ...props
}: ModalHeaderProps): JSX.Element {
  const modalContext = useContext(ModalContext)

  const handleCloseClick = () => {
    modalContext?.onClose('close-button')
  }

  return (
    <div
      className={cn(
        'flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700',
        className
      )}
      data-testid="modal-header"
      {...props}
    >
      <div className="flex-1">{children}</div>
      {showCloseButton && (
        <button
          type="button"
          className={cn(
            'ml-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
            'dark:focus:ring-offset-gray-800 rounded-sm transition-colors duration-200'
          )}
          onClick={handleCloseClick}
          aria-label="Close modal"
          data-testid="modal-close-button"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}

/**
 * Modal body component
 */
export function ModalBody({
  className,
  children,
  ...props
}: ModalBodyProps): JSX.Element {
  return (
    <div
      className={cn(
        'flex-1 p-6 overflow-y-auto',
        className
      )}
      data-testid="modal-body"
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * Modal footer component
 */
export function ModalFooter({
  className,
  children,
  ...props
}: ModalFooterProps): JSX.Element {
  return (
    <div
      className={cn(
        'flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700',
        className
      )}
      data-testid="modal-footer"
      {...props}
    >
      {children}
    </div>
  )
}
