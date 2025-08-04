import { useEffect, useRef } from 'preact/hooks'
import { forwardRef } from 'preact/compat'
import { createPortal } from 'preact/compat'
import { cn } from '../../utils/cn'
import type { DrawerProps } from './Drawer.types'

export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  ({
    isOpen,
    onClose,
    position = 'right',
    size = 'md',
    hasBackdrop = true,
    closeOnBackdropClick = true,
    closeOnEscape = true,
    lockBodyScroll = true,
    animationDuration = 300,
    backdropOpacity = 0.5,
    trapFocus = true,
    initialFocus,
    finalFocus,
    zIndex = 1000,
    className,
    backdropClassName,
    style,
    'data-testid': testId,
    children,
    onAnimationEnd,
    onBackdropClick,
    onEscapeKeyDown,
    ...props
  }, ref) => {
    const backdropRef = useRef<HTMLDivElement>(null)
    const drawerRef = useRef<HTMLDivElement>(null)
    const previousActiveElement = useRef<HTMLElement | null>(null)

    // Size mappings for different positions
    const sizeStyles = {
      horizontal: {
        sm: 'w-80',
        md: 'w-96',
        lg: 'w-[32rem]',
        xl: 'w-[40rem]',
        full: 'w-screen'
      },
      vertical: {
        sm: 'h-80',
        md: 'h-96',
        lg: 'h-[32rem]',
        xl: 'h-[40rem]',
        full: 'h-screen'
      }
    }

    // Position-specific styles
    const positionStyles = {
      left: {
        container: 'inset-y-0 left-0',
        transform: isOpen ? 'translate-x-0' : '-translate-x-full',
        sizes: sizeStyles.horizontal
      },
      right: {
        container: 'inset-y-0 right-0',
        transform: isOpen ? 'translate-x-0' : 'translate-x-full',
        sizes: sizeStyles.horizontal
      },
      top: {
        container: 'inset-x-0 top-0',
        transform: isOpen ? 'translate-y-0' : '-translate-y-full',
        sizes: sizeStyles.vertical
      },
      bottom: {
        container: 'inset-x-0 bottom-0',
        transform: isOpen ? 'translate-y-0' : 'translate-y-full',
        sizes: sizeStyles.vertical
      }
    }

    const currentPosition = positionStyles[position]

    // Handle escape key
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && isOpen && closeOnEscape) {
          onEscapeKeyDown?.()
          onClose()
        }
      }

      if (isOpen) {
        document.addEventListener('keydown', handleKeyDown)
      }

      return () => {
        document.removeEventListener('keydown', handleKeyDown)
      }
    }, [isOpen, closeOnEscape, onClose, onEscapeKeyDown])

    // Handle body scroll lock
    useEffect(() => {
      if (!lockBodyScroll) return

      if (isOpen) {
        // Store current scroll position
        const scrollY = window.scrollY
        document.body.style.position = 'fixed'
        document.body.style.top = `-${scrollY}px`
        document.body.style.width = '100%'
      } else {
        // Restore scroll position
        const scrollY = document.body.style.top
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.width = ''
        if (scrollY) {
          window.scrollTo(0, parseInt(scrollY || '0') * -1)
        }
      }

      return () => {
        // Cleanup on unmount
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.width = ''
      }
    }, [isOpen, lockBodyScroll])

    // Handle focus management
    useEffect(() => {
      if (!trapFocus) return

      if (isOpen) {
        // Store currently focused element
        previousActiveElement.current = document.activeElement as HTMLElement

        // Focus initial element or first focusable element
        setTimeout(() => {
          if (initialFocus) {
            const element = typeof initialFocus === 'function' ? initialFocus() : initialFocus
            element?.focus()
          } else {
            // Find first focusable element in drawer
            const focusableElements = drawerRef.current?.querySelectorAll(
              'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
            )
            const firstElement = focusableElements?.[0] as HTMLElement
            firstElement?.focus()
          }
        }, 50)
      } else {
        // Restore focus to previous element
        if (finalFocus) {
          const element = typeof finalFocus === 'function' ? finalFocus() : finalFocus
          element?.focus()
        } else if (previousActiveElement.current) {
          previousActiveElement.current.focus()
        }
      }
    }, [isOpen, trapFocus, initialFocus, finalFocus])

    // Handle focus trap
    useEffect(() => {
      if (!isOpen || !trapFocus) return

      const handleTabKey = (event: KeyboardEvent) => {
        if (event.key !== 'Tab') return

        const focusableElements = drawerRef.current?.querySelectorAll(
          'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        )
        
        if (!focusableElements || focusableElements.length === 0) return

        const firstElement = focusableElements[0] as HTMLElement
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

        if (event.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            event.preventDefault()
            lastElement.focus()
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            event.preventDefault()
            firstElement.focus()
          }
        }
      }

      document.addEventListener('keydown', handleTabKey)
      return () => document.removeEventListener('keydown', handleTabKey)
    }, [isOpen, trapFocus])

    // Handle backdrop click
    const handleBackdropClick = (event: MouseEvent) => {
      if (event.target === backdropRef.current && closeOnBackdropClick) {
        onBackdropClick?.()
        onClose()
      }
    }

    // Handle animation end
    const handleAnimationEnd = () => {
      onAnimationEnd?.()
    }

    const drawerElement = (
      <div
        ref={backdropRef}
        className={cn(
          'fixed inset-0 transition-opacity duration-300',
          hasBackdrop && 'bg-black',
          hasBackdrop && isOpen && 'opacity-50',
          hasBackdrop && !isOpen && 'opacity-0 pointer-events-none',
          !hasBackdrop && 'pointer-events-none',
          backdropClassName
        )}
        style={{
          zIndex,
          backgroundColor: hasBackdrop ? `rgba(0, 0, 0, ${isOpen ? backdropOpacity : 0})` : 'transparent'
        }}
        onClick={handleBackdropClick}
        data-testid={testId ? `${testId}-backdrop` : 'drawer-backdrop'}
      >
        <div
          ref={(element) => {
            if (ref) {
              if (typeof ref === 'function') {
                ref(element)
              } else {
                ref.current = element
              }
            }
            drawerRef.current = element
          }}
          role="dialog"
          aria-modal="true"
          className={cn(
            'fixed bg-white dark:bg-gray-800 shadow-xl transition-transform pointer-events-auto',
            `duration-${animationDuration}`,
            'ease-in-out',
            currentPosition.container,
            currentPosition.transform,
            currentPosition.sizes[size],
            className
          )}
          style={{
            transitionDuration: `${animationDuration}ms`,
            ...style
          }}
          onTransitionEnd={handleAnimationEnd}
          data-testid={testId}
          {...props}
        >
          {children}
        </div>
      </div>
    )

    // Only render when open or during closing animation
    if (!isOpen && !drawerRef.current) return null

    return typeof document !== 'undefined' && document.body ? (
      createPortal(drawerElement, document.body)
    ) : (
      drawerElement
    )
  }
)

Drawer.displayName = 'Drawer'
