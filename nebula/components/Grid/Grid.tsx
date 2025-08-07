import { forwardRef } from 'preact/compat'
import { cn } from '../../utils/cn'
import type { GridProps, GridItemProps, GridBreakpoint } from './types'

/**
 * Generate responsive class names for breakpoint values
 */
function generateResponsiveClasses(
  prefix: string,
  value: number | string | Partial<Record<GridBreakpoint, number | string>> | undefined,
  suffix = ''
): string {
  if (!value) return ''
  
  if (typeof value === 'number' || typeof value === 'string') {
    return `${prefix}${value}${suffix}`
  }
  
  const breakpointPrefixes: Record<GridBreakpoint, string> = {
    xs: '',
    sm: 'sm:',
    md: 'md:',
    lg: 'lg:',
    xl: 'xl:',
    '2xl': '2xl:'
  }
  
  return Object.entries(value)
    .map(([breakpoint, val]) => {
      const bp = breakpoint as GridBreakpoint
      const prefix_with_bp = `${breakpointPrefixes[bp]}${prefix}`
      return `${prefix_with_bp}${val}${suffix}`
    })
    .join(' ')
}

/**
 * Advanced grid system with responsive breakpoints, gutters, and auto-layout
 */
export const Grid = forwardRef<HTMLDivElement, GridProps>(({
  cols = 12,
  gap,
  gapX,
  gapY,
  autoFit,
  autoFill,
  alignItems,
  justifyItems,
  alignContent,
  justifyContent,
  autoFlow = 'row',
  children,
  className,
  ...props
}, ref) => {
  const classes = cn(
    'grid',
    
    // Auto-fit/auto-fill or regular columns
    (() => {
      if (autoFit) {
        const min = typeof autoFit === 'object' ? autoFit.min : autoFit
        const max = typeof autoFit === 'object' ? autoFit.max || '1fr' : '1fr'
        const minPx = typeof min === 'number' ? `${min}px` : min
        return `grid-cols-[repeat(auto-fit,minmax(${minPx},${max}))]`
      }
      if (autoFill) {
        const min = typeof autoFill === 'object' ? autoFill.min : autoFill
        const max = typeof autoFill === 'object' ? autoFill.max || '1fr' : '1fr'
        const minPx = typeof min === 'number' ? `${min}px` : min
        return `grid-cols-[repeat(auto-fill,minmax(${minPx},${max}))]`
      }
      return generateResponsiveClasses('grid-cols-', cols)
    })(),
    
    // Gap
    generateResponsiveClasses('gap-', gap),
    generateResponsiveClasses('gap-x-', gapX),
    generateResponsiveClasses('gap-y-', gapY),
    
    // Alignment
    alignItems && `items-${alignItems}`,
    justifyItems && `justify-items-${justifyItems}`,
    alignContent && `content-${alignContent}`,
    justifyContent && (
      justifyContent === 'space-between' ? 'justify-between' :
      justifyContent === 'space-around' ? 'justify-around' :
      justifyContent === 'space-evenly' ? 'justify-evenly' :
      `justify-${justifyContent}`
    ),
    
    // Auto flow
    autoFlow === 'row' && 'grid-flow-row',
    autoFlow === 'column' && 'grid-flow-col',
    autoFlow === 'row dense' && 'grid-flow-row-dense',
    autoFlow === 'column dense' && 'grid-flow-col-dense',
    
    className
  )
  
  return (
    <div
      ref={ref}
      className={classes}
      {...props}
    >
      {children}
    </div>
  )
})

Grid.displayName = 'Grid'

/**
 * Grid item component with responsive positioning and spanning
 */
export const GridItem = forwardRef<HTMLDivElement, GridItemProps>(({
  colSpan,
  rowSpan,
  colStart,
  colEnd,
  rowStart,
  rowEnd,
  order,
  alignSelf,
  justifySelf,
  children,
  className,
  ...props
}, ref) => {
  const classes = cn(
    // Column span
    generateResponsiveClasses('col-span-', colSpan),
    
    // Row span
    generateResponsiveClasses('row-span-', rowSpan),
    
    // Column positioning
    generateResponsiveClasses('col-start-', colStart),
    generateResponsiveClasses('col-end-', colEnd),
    
    // Row positioning
    generateResponsiveClasses('row-start-', rowStart),
    generateResponsiveClasses('row-end-', rowEnd),
    
    // Order
    generateResponsiveClasses('order-', order),
    
    // Self alignment
    alignSelf && alignSelf !== 'auto' && `self-${alignSelf}`,
    justifySelf && justifySelf !== 'auto' && `justify-self-${justifySelf}`,
    
    className
  )
  
  return (
    <div
      ref={ref}
      className={classes}
      {...props}
    >
      {children}
    </div>
  )
})

GridItem.displayName = 'GridItem'

export default Grid
