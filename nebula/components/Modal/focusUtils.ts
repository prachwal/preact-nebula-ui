import { useEffect, useRef } from 'preact/hooks'
import { RefObject } from 'preact'

interface FocusTrapOptions {
  /**
   * Whether the focus trap is active
   */
  isActive: boolean
  
  /**
   * Initial focus element selector or element
   */
  initialFocus?: string | HTMLElement
  
  /**
   * Element to return focus to when trap is deactivated
   */
  returnFocus?: HTMLElement
}

/**
 * Hook for managing focus trap within a container
 */
export function useFocusTrap(containerRef: RefObject<HTMLElement>, options: FocusTrapOptions) {
  const { isActive, initialFocus, returnFocus } = options
  const previousActiveElement = useRef<HTMLElement>()

  useEffect(() => {
    if (!isActive || !containerRef.current) return

    // Store the previously focused element
    previousActiveElement.current = document.activeElement as HTMLElement

    // Get all focusable elements within the container
    const getFocusableElements = () => {
      if (!containerRef.current) return []
      
      const focusableSelectors = [
        'button:not([disabled])',
        'input:not([disabled])',
        'textarea:not([disabled])',
        'select:not([disabled])',
        'a[href]',
        '[tabindex]:not([tabindex="-1"])',
        '[contenteditable]:not([contenteditable="false"])'
      ].join(', ')

      return Array.from(containerRef.current.querySelectorAll(focusableSelectors)) as HTMLElement[]
    }

    // Set initial focus
    const setInitialFocus = () => {
      let elementToFocus: HTMLElement | null = null

      if (typeof initialFocus === 'string') {
        elementToFocus = containerRef.current?.querySelector(initialFocus) as HTMLElement
      } else if (initialFocus instanceof HTMLElement) {
        elementToFocus = initialFocus
      }

      if (!elementToFocus) {
        const focusableElements = getFocusableElements()
        elementToFocus = focusableElements[0]
      }

      if (elementToFocus) {
        elementToFocus.focus()
      }
    }

    // Handle Tab key navigation
    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !containerRef.current) return

      const focusableElements = getFocusableElements()
      if (focusableElements.length === 0) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey) {
        // Shift + Tab: move focus to last element if currently on first
        if (document.activeElement === firstElement) {
          event.preventDefault()
          lastElement.focus()
        }
      } else {
        // Tab: move focus to first element if currently on last
        if (document.activeElement === lastElement) {
          event.preventDefault()
          firstElement.focus()
        }
      }
    }

    // Set initial focus after a brief delay to allow for rendering
    const timeoutId = setTimeout(setInitialFocus, 10)

    // Add event listener for Tab key
    document.addEventListener('keydown', handleTabKey)

    return () => {
      clearTimeout(timeoutId)
      document.removeEventListener('keydown', handleTabKey)
      
      // Return focus to previously focused element
      if (returnFocus) {
        returnFocus.focus()
      } else if (previousActiveElement.current) {
        previousActiveElement.current.focus()
      }
    }
  }, [isActive, initialFocus, returnFocus, containerRef])
}

/**
 * Hook for managing body scroll lock
 */
export function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (isLocked) {
      // Store original body style
      const originalStyle = window.getComputedStyle(document.body)
      const originalOverflow = originalStyle.overflow
      const originalPaddingRight = originalStyle.paddingRight

      // Calculate scrollbar width
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

      // Apply scroll lock styles
      document.body.style.overflow = 'hidden'
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`
      }

      return () => {
        // Restore original styles
        document.body.style.overflow = originalOverflow
        document.body.style.paddingRight = originalPaddingRight
      }
    }
  }, [isLocked])
}
