import { forwardRef } from 'preact/compat'
import { cn } from '../../utils/cn'
import type { StackProps, StackDirection, StackSpacing, StackAlign, StackJustify } from './Stack.types'

// Stack direction variants
const stackDirection: Record<StackDirection, string> = {
  vertical: 'flex-col',
  horizontal: 'flex-row'
}

// Stack spacing variants
const stackSpacing: Record<StackSpacing, string> = {
  none: 'gap-0',
  xs: 'gap-1',     // 4px
  sm: 'gap-2',     // 8px
  md: 'gap-4',     // 16px
  lg: 'gap-6',     // 24px
  xl: 'gap-8',     // 32px
  '2xl': 'gap-12'  // 48px
}

// Stack align variants (cross-axis)
const stackAlign: Record<StackAlign, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch'
}

// Stack justify variants (main-axis)
const stackJustify: Record<StackJustify, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly'
}

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ 
    direction = 'vertical',
    spacing = 'md',
    align = 'stretch',
    justify = 'start',
    wrap = false,
    className,
    children,
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base flex styles
          'flex',
          
          // Direction
          stackDirection[direction],
          
          // Spacing
          stackSpacing[spacing],
          
          // Alignment
          stackAlign[align],
          
          // Justification
          stackJustify[justify],
          
          // Wrap
          wrap && 'flex-wrap',
          
          // Custom className
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Stack.displayName = 'Stack'
