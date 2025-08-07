import { forwardRef } from 'preact/compat'
import { useState, useEffect, useCallback } from 'preact/hooks'
import { cn } from '../../utils/cn'
import type { AnchorProps, AnchorItem } from './Anchor.types'

// Helper function to get all anchor elements in the page
const getAnchorElements = (items: AnchorItem[]): Array<{ key: string; href: string; element: HTMLElement | null }> => {
  const elements: Array<{ key: string; href: string; element: HTMLElement | null }> = []
  
  const collectElements = (anchorItems: AnchorItem[]) => {
    anchorItems.forEach(item => {
      const element = document.querySelector(item.href) as HTMLElement
      elements.push({
        key: item.key,
        href: item.href,
        element: element
      })
      if (item.children) {
        collectElements(item.children)
      }
    })
  }
  
  collectElements(items)
  return elements
}

// Helper function to get the active anchor based on scroll position
const getActiveAnchor = (
  elements: { [key: string]: HTMLElement },
  scrollContainer: HTMLElement | Window,
  offsetTop = 0,
  bounds = 5
): string => {
  let scrollTop = 0
  
  if (scrollContainer === window) {
    scrollTop = window.pageYOffset || document.documentElement.scrollTop
  } else if (scrollContainer instanceof HTMLElement) {
    scrollTop = scrollContainer.scrollTop
  }
  
  let activeKey = ''
  let minDistance = Infinity
  
  Object.entries(elements).forEach(([key, element]) => {
    let elementTop = 0
    
    if (scrollContainer === window) {
      const rect = element.getBoundingClientRect()
      elementTop = rect.top + scrollTop
    } else if (scrollContainer instanceof HTMLElement) {
      // For custom containers, calculate relative position
      const containerRect = scrollContainer.getBoundingClientRect()
      const elementRect = element.getBoundingClientRect()
      elementTop = elementRect.top - containerRect.top + scrollContainer.scrollTop
    }
    
    const distance = Math.abs(elementTop - scrollTop - offsetTop)
    
    if (distance < minDistance) {
      minDistance = distance
      activeKey = key
    }
  })
  
  return activeKey
}

export const Anchor = forwardRef<HTMLDivElement, AnchorProps>((props, ref) => {
  const {
    items = [],
    activeKey: controlledActiveKey,
    targetOffset = 0,
    bounds = 5,
    offsetTop = 0,
    target,
    size = 'md',
    variant = 'default',
    direction = 'vertical',
    affix = true,
    showInkInFixed = false,
    clickable = true,
    className,
    style,
    wrapperClassName,
    wrapperStyle,
    onChange,
    onClick,
    children,
    'aria-label': ariaLabel,
    ...rest
  } = props

  const [activeKey, setActiveKey] = useState(controlledActiveKey || '')
  const [isFixed, setIsFixed] = useState(false)

  // Handle scroll to update active anchor
  const handleScroll = useCallback(() => {
    console.log('📜 Anchor handleScroll triggered:', {
      controlledActiveKey,
      currentActiveKey: activeKey,
      offsetTop,
      bounds,
      hasTarget: !!target
    })
    
    if (controlledActiveKey !== undefined) {
      console.log('ℹ️ Using controlled activeKey, skipping scroll spy')
      return
    }
    
    const scrollContainer = target ? target() : window
    console.log('🎯 Scroll container:', scrollContainer === window ? 'window' : (scrollContainer as HTMLElement)?.tagName || 'unknown')
    
    const elements = getAnchorElements(items)
    console.log('🔍 Found anchor elements:', elements.map(el => ({
      key: el.key,
      href: el.href,
      exists: !!el.element
    })))
    
    const elementsMap: { [key: string]: HTMLElement } = {}
    elements.forEach(el => {
      if (el.element) {
        elementsMap[el.key] = el.element
      }
    })
    
    const newActiveKey = getActiveAnchor(elementsMap, scrollContainer, offsetTop, bounds)
    console.log('🎯 Calculated new active key:', {
      previous: activeKey,
      new: newActiveKey,
      changed: newActiveKey !== activeKey
    })
    
    if (newActiveKey !== activeKey) {
      setActiveKey(newActiveKey)
      onChange?.(newActiveKey)
      console.log('🔄 Active key updated from', activeKey, 'to', newActiveKey)
    }

    // Handle affix behavior
    if (affix && offsetTop) {
      const shouldFix = window.pageYOffset > offsetTop
      if (shouldFix !== isFixed) {
        setIsFixed(shouldFix)
        console.log('📌 Affix state changed to:', shouldFix)
      }
    }
  }, [items, activeKey, controlledActiveKey, offsetTop, bounds, affix, isFixed, onChange, target])

  // Setup scroll listener
  useEffect(() => {
    const scrollContainer = target ? target() : window
    console.log('🎧 Setting up scroll listener on:', scrollContainer === window ? 'window' : (scrollContainer as HTMLElement)?.tagName || 'unknown')
    
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll)
      handleScroll() // Initial check
    }
    
    return () => {
      if (scrollContainer) {
        console.log('🗑️ Removing scroll listener from:', scrollContainer === window ? 'window' : (scrollContainer as HTMLElement)?.tagName || 'unknown')
        scrollContainer.removeEventListener('scroll', handleScroll)
      }
    }
  }, [handleScroll, target])

  // Update active key when controlled prop changes
  useEffect(() => {
    if (controlledActiveKey !== undefined) {
      setActiveKey(controlledActiveKey)
    }
  }, [controlledActiveKey])

  // Handle anchor click
  const handleClick = useCallback((e: MouseEvent, item: AnchorItem) => {
    console.log('🔗 Anchor handleClick triggered:', {
      href: item.href,
      key: item.key,
      title: item.title,
      clickable,
      offsetTop
    })
    
    e.preventDefault()
    
    if (!clickable) {
      console.log('❌ Click ignored - clickable is false')
      return
    }
    
    console.log('✅ Clickable is true, proceeding...')
    
    onClick?.(e, item)
    
    const element = document.querySelector(item.href) as HTMLElement
    console.log('🎯 Target element found:', {
      selector: item.href,
      element: element,
      exists: !!element
    })
    
    if (element) {
      const scrollContainer = target ? target() : window
      console.log('🚀 Using scroll container:', scrollContainer === window ? 'window' : (scrollContainer as HTMLElement)?.tagName || 'unknown')
      
      if (scrollContainer === window) {
        const elementRect = element.getBoundingClientRect()
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        const targetTop = elementRect.top + scrollTop - offsetTop
        
        console.log('📏 Window scroll calculation:', {
          elementRect: {
            top: elementRect.top,
            bottom: elementRect.bottom,
            height: elementRect.height
          },
          currentScrollTop: scrollTop,
          offsetTop: offsetTop,
          calculatedTargetTop: targetTop,
          finalScrollTop: Math.max(0, targetTop)
        })
        
        window.scrollTo({
          top: Math.max(0, targetTop),
          behavior: 'smooth'
        })
        
        console.log('🚀 Window scroll initiated to:', Math.max(0, targetTop))
      } else if (scrollContainer instanceof HTMLElement) {
        // For custom scroll containers
        const containerRect = scrollContainer.getBoundingClientRect()
        const elementRect = element.getBoundingClientRect()
        const relativeTop = elementRect.top - containerRect.top + scrollContainer.scrollTop - offsetTop
        
        console.log('📏 Container scroll calculation:', {
          containerRect: {
            top: containerRect.top,
            height: containerRect.height
          },
          elementRect: {
            top: elementRect.top,
            height: elementRect.height
          },
          currentScrollTop: scrollContainer.scrollTop,
          offsetTop: offsetTop,
          calculatedRelativeTop: relativeTop,
          finalScrollTop: Math.max(0, relativeTop)
        })
        
        scrollContainer.scrollTo({
          top: Math.max(0, relativeTop),
          behavior: 'smooth'
        })
        
        console.log('🚀 Container scroll initiated to:', Math.max(0, relativeTop))
      }
      
      // Update active key immediately for better UX
      if (controlledActiveKey === undefined) {
        setActiveKey(item.key)
        onChange?.(item.key)
        console.log('🔄 Active key updated to:', item.key)
      } else {
        console.log('ℹ️ Active key is controlled, not updating internally')
      }
    } else {
      console.error('❌ Element not found for selector:', item.href)
    }
  }, [clickable, offsetTop, onClick, controlledActiveKey, onChange, target])

  // Render anchor items recursively
  const renderItems = useCallback((anchorItems: AnchorItem[], level = 0) => {
    return anchorItems.map(item => {
      const isActive = item.key === activeKey
      const hasChildren = item.children && item.children.length > 0
      
      return (
        <div key={item.key} className={cn('anchor-item', `level-${level}`)}>
          <a
            href={item.href}
            onClick={(e) => handleClick(e as any, item)}
            className={cn(
              'block py-1 px-2 text-sm transition-colors duration-200',
              // Size variants
              {
                'text-xs py-0.5 px-1': size === 'sm',
                'text-sm py-1 px-2': size === 'md',
                'text-base py-1.5 px-3': size === 'lg'
              },
              // Variant styles
              {
                'text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400': variant === 'default' && !isActive,
                'text-blue-600 dark:text-blue-400': variant === 'default' && isActive,
                'text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-300': variant === 'subtle' && !isActive,
                'text-gray-900 dark:text-white': variant === 'subtle' && isActive,
                'text-gray-400 hover:text-gray-600 dark:text-gray-600 dark:hover:text-gray-400': variant === 'ghost' && !isActive,
                'text-gray-600 dark:text-gray-400': variant === 'ghost' && isActive
              },
              // Level indentation for vertical layout
              {
                [`ml-${level * 4}`]: direction === 'vertical' && level > 0
              }
            )}
          >
            {item.title}
          </a>
          
          {hasChildren && direction === 'vertical' && (
            <div className="ml-2">
              {renderItems(item.children!, level + 1)}
            </div>
          )}
        </div>
      )
    })
  }, [activeKey, size, variant, direction, handleClick])

  // Base classes
  const baseClasses = cn(
    'anchor',
    {
      'anchor-vertical': direction === 'vertical',
      'anchor-horizontal flex space-x-4': direction === 'horizontal',
      'anchor-fixed': affix && isFixed,
      'anchor-ink-fixed': affix && isFixed && showInkInFixed
    },
    className
  )

  // Wrapper classes for affix behavior
  const wrapperClasses = cn(
    'anchor-wrapper',
    {
      'fixed top-20 right-4 z-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3': affix && isFixed,
      'relative': !affix || !isFixed
    },
    wrapperClassName
  )

  // Calculate the active item index for proper positioning
  const getActiveItemIndex = useCallback((anchorItems: AnchorItem[], targetKey: string, currentIndex = 0): number => {
    for (let i = 0; i < anchorItems.length; i++) {
      const item = anchorItems[i]
      if (item.key === targetKey) {
        return currentIndex + i
      }
      if (item.children) {
        const childIndex = getActiveItemIndex(item.children, targetKey, currentIndex + i + 1)
        if (childIndex !== -1) {
          return childIndex
        }
      }
    }
    return -1
  }, [])

  const activeItemIndex = activeKey ? getActiveItemIndex(items, activeKey) : -1

  const content = (
    <div
      ref={ref}
      className={baseClasses}
      aria-label={ariaLabel || 'Page navigation'}
      style={style}
      {...rest}
    >
      {/* Active indicator line for vertical layout */}
      {direction === 'vertical' && activeKey && activeItemIndex >= 0 && (
        <div 
          className="absolute left-0 w-0.5 bg-blue-500 dark:bg-blue-400 transition-all duration-300 h-6"
          style={{
            top: `${activeItemIndex * 32 + 4}px`
          }}
        />
      )}
      
      <div className={cn('relative', direction === 'vertical' ? 'pl-4' : '')}>
        {children || renderItems(items)}
      </div>
    </div>
  )

  return affix ? (
    <div className={wrapperClasses} style={wrapperStyle}>
      {content}
    </div>
  ) : content
})

Anchor.displayName = 'Anchor'
