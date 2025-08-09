import { forwardRef } from 'preact/compat';
import { useState, useEffect, useCallback } from 'preact/hooks';
import { cn } from '../../utils/cn';
import type { BackTopProps } from './BackTop.types';

// Debug flag - set to true to enable debugging
const DEBUG_BACKTOP = false

// Debug utility
const debug = (...args: any[]) => {
  if (DEBUG_BACKTOP) {
    console.log('[BACKTOP DEBUG]', ...args)
  }
}

// Default chevron up icon
const ChevronUpIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
  >
    <path
      d="M18 15L12 9L6 15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const BackTop = forwardRef<HTMLButtonElement, BackTopProps>((props, ref) => {
  const {
    children,
    icon = <ChevronUpIcon />,
    visibilityHeight = 400,
    target,
    duration = 300,
    size = 'md',
    shape = 'circle',
    variant = 'primary',
    right = 24,
    bottom = 24,
    className,
    style,
    onClick,
    'aria-label': ariaLabel,
    ...rest
  } = props

  const [visible, setVisible] = useState(false)

  // Get scroll container
  const getTarget = useCallback(() => {
    return target?.() ?? window
  }, [target])

  // Handle scroll to show/hide button
  const handleScroll = useCallback(() => {
    const scrollContainer = getTarget()
    let scrollTop = 0

    if (scrollContainer === window) {
      scrollTop = window.pageYOffset || document.documentElement.scrollTop
    } else if (scrollContainer instanceof HTMLElement) {
      scrollTop = scrollContainer.scrollTop
    } else if (scrollContainer && typeof (scrollContainer as any).scrollTop === 'number') {
      // Handle mock objects in tests that have scrollTop property
      scrollTop = (scrollContainer as any).scrollTop
    }

    const shouldShow = scrollTop > visibilityHeight

    debug('🔝 BackTop handleScroll:', {
      scrollContainer: scrollContainer === window ? 'window' : (scrollContainer as HTMLElement)?.tagName,
      scrollTop,
      visibilityHeight,
      shouldShow,
      currentVisible: visible
    })

    if (shouldShow !== visible) {
      debug('👀 BackTop visibility changing from', visible, 'to', shouldShow)
      setVisible(shouldShow)
    }
  }, [getTarget, visibilityHeight, visible])

  // Setup scroll listener
  useEffect(() => {
    const scrollContainer = getTarget()

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll)
      handleScroll() // Initial check
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll)
      }
    }
  }, [getTarget, handleScroll])

  // Handle click to scroll to top
  const handleClick = useCallback((e: MouseEvent) => {
    debug('🔝 BackTop handleClick triggered')
    e.preventDefault()
    onClick?.(e)

    const scrollContainer = getTarget()
    debug('🎯 BackTop scroll target:', {
      container: scrollContainer === window ? 'window' : (scrollContainer as HTMLElement)?.tagName,
      scrollContainer
    })

    if (scrollContainer === window) {
      debug('🚀 Scrolling window to top')
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    } else if (scrollContainer instanceof HTMLElement) {
      debug('🚀 Scrolling element to top:', {
        currentScrollTop: scrollContainer.scrollTop,
        scrollHeight: scrollContainer.scrollHeight,
        clientHeight: scrollContainer.clientHeight
      })
      scrollContainer.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    } else if (scrollContainer && typeof (scrollContainer as any).scrollTo === 'function') {
      // Handle mock objects in tests that have scrollTo method
      debug('🚀 Scrolling mock target to top')
        ; (scrollContainer as any).scrollTo({
          top: 0,
          behavior: 'smooth'
        })
    }
  }, [getTarget, onClick])

  // Don't render if not visible
  if (!visible) {
    debug('❌ BackTop not rendering - not visible')
    return null
  }

  debug('✅ BackTop rendering - visible:', visible)

  // Base classes with positioning
  const baseClasses = cn(
    'back-top',
    'transition-all duration-200',
    'flex items-center justify-center',
    'cursor-pointer select-none',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    // Size variants
    {
      'w-8 h-8 text-xs': size === 'sm',
      'w-10 h-10 text-sm': size === 'md',
      'w-12 h-12 text-base': size === 'lg'
    },
    // Shape variants
    {
      'rounded-full': shape === 'circle',
      'rounded-md': shape === 'square'
    },
    // Color variants
    {
      'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500': variant === 'primary',
      'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500': variant === 'secondary',
      'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-blue-500': variant === 'outline',
      'bg-white/80 text-gray-600 hover:bg-white hover:text-gray-900 focus:ring-blue-500': variant === 'ghost'
    },
    // Dark mode variants
    {
      'dark:bg-blue-500 dark:hover:bg-blue-600': variant === 'primary',
      'dark:bg-gray-700 dark:hover:bg-gray-600': variant === 'secondary',
      'dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700': variant === 'outline',
      'dark:bg-gray-800/80 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200': variant === 'ghost'
    },
    className
  )

  // Custom inline styles for positioning - use absolute when target is provided, fixed for window
  const positionValue = target ? 'absolute' : 'fixed'
  const inlineStyles = {
    position: positionValue,
    right: `${right}px`,
    bottom: `${bottom}px`,
    zIndex: 1000,
    ...style
  }

  return (
    <button
      ref={ref}
      type="button"
      className={baseClasses}
      style={inlineStyles}
      onClick={handleClick as any}
      aria-label={ariaLabel || 'Back to top'}
      {...rest}
    >
      {children || icon}
    </button>
  )
})

BackTop.displayName = 'BackTop'
