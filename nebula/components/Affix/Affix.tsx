import { forwardRef } from 'preact/compat'
import { useEffect, useRef } from 'preact/hooks'
import { useAffix } from './useAffix'
import type { AffixProps } from './Affix.types'
import './Affix.css'

const Affix = forwardRef<HTMLDivElement, AffixProps>(({
  size = 'md',
  offsetTop = 0,
  offsetBottom = 0,
  target,
  position = 'top',
  disabled = false,
  threshold = 0,
  onAffix,
  onScroll,
  className,
  children,
  ...restProps
}, ref) => {
  const elementRef = useRef<HTMLDivElement>(null)
  const placeholderRef = useRef<HTMLDivElement>(null)

  const {
    affixed,
    affixedTop,
    affixedBottom,
    // targetRect,
    placeholderRect,
    setElementRef,
    setPlaceholderRef,
    updatePosition,
    reset
  } = useAffix({
    offsetTop,
    offsetBottom,
    target,
    position,
    threshold,
    onAffix,
    onScroll,
    disabled
  })

  // Set refs for the hook
  useEffect(() => {
    setElementRef(elementRef.current)
    setPlaceholderRef(placeholderRef.current)
  }, [setElementRef, setPlaceholderRef])

  // Handle disabled state
  useEffect(() => {
    if (disabled) {
      reset()
    } else {
      updatePosition()
    }
  }, [disabled, reset, updatePosition])

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }

  // Calculate affix classes and data attributes
  const getAffixProps = () => {
    // Always merge custom className, size, and transition classes
    const classes = [
      'transition-all duration-200',
      sizeClasses[size],
      affixed && 'shadow-lg',
      affixed && 'affix-fixed',
      affixedTop && 'affix-top',
      affixedBottom && 'affix-bottom',
      className
    ].filter(Boolean).join(' ')

    const dataAttrs: Record<string, string | number> = {}
    if (affixedTop) {
      dataAttrs['data-affix-offset-top'] = offsetTop
    }
    if (affixedBottom) {
      dataAttrs['data-affix-offset-bottom'] = offsetBottom
    }
    if (affixed && placeholderRect) {
      const transform = `translateX(${placeholderRect.left}px)`
      dataAttrs['data-transform'] = transform
    }
    return {
      className,
      ...dataAttrs,
      mergedClassName: classes
    }
  }

  // Placeholder classes
  const getPlaceholderClasses = () => {
    if (disabled || !affixed) {
      return 'affix-placeholder-hidden'
    }
    return 'affix-placeholder'
  }

  const affixProps = getAffixProps()

  return (
    <>
      {/* Placeholder to maintain layout when affixed */}
      <div
        ref={placeholderRef}
        className={getPlaceholderClasses()}
        aria-hidden="true"
      />

      {/* Main affix element */}
      <div
        ref={(node) => {
          elementRef.current = node
          if (typeof ref === 'function') {
            ref(node)
          } else if (ref) {
            ref.current = node
          }
        }}
        className={(affixProps as any).mergedClassName}
        {...Object.fromEntries(Object.entries(affixProps).filter(([k]) => k !== 'className' && k !== 'mergedClassName'))}
        {...restProps}
      >
        {children}
      </div>
    </>
  )
})

Affix.displayName = 'Affix'

export { Affix }
