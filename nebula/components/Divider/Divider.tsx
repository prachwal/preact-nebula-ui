import { forwardRef } from 'preact/compat'
import { cn } from '../../utils/cn'
import type { DividerProps, DividerVariant, DividerOrientation, DividerSize } from './Divider.types'

// Divider variant styles
const dividerVariants: Record<DividerVariant, string> = {
  solid: 'border-solid',
  dashed: 'border-dashed',
  dotted: 'border-dotted'
}

// Divider size variants
const dividerSizes: Record<DividerSize, { horizontal: string; vertical: string }> = {
  sm: {
    horizontal: 'border-t',
    vertical: 'border-l'
  },
  md: {
    horizontal: 'border-t-2',
    vertical: 'border-l-2'
  },
  lg: {
    horizontal: 'border-t-4',
    vertical: 'border-l-4'
  }
}

// Divider orientation styles
const dividerOrientations: Record<DividerOrientation, { base: string; withText: string }> = {
  horizontal: {
    base: 'w-full',
    withText: 'flex items-center w-full'
  },
  vertical: {
    base: 'h-full',
    withText: 'flex flex-col items-center h-full'
  }
}

export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  ({ 
    variant = 'solid',
    orientation = 'horizontal',
    size = 'md',
    text,
    className,
    'data-testid': testId,
    ...props 
  }, ref) => {
    const isHorizontal = orientation === 'horizontal'
    const hasText = text && text.trim().length > 0
    
    if (hasText) {
      return (
        <div
          ref={ref}
          className={cn(
            dividerOrientations[orientation].withText,
            className
          )}
          role="separator"
          data-testid={testId}
          {...props}
        >
          <div
            className={cn(
              'flex-1',
              dividerVariants[variant],
              'border-gray-300',
              isHorizontal ? dividerSizes[size].horizontal : dividerSizes[size].vertical
            )}
          />
          <span
            className={cn(
              'text-sm text-gray-500 bg-white',
              isHorizontal ? 'px-3' : 'py-3'
            )}
          >
            {text}
          </span>
          <div
            className={cn(
              'flex-1',
              dividerVariants[variant],
              'border-gray-300',
              isHorizontal ? dividerSizes[size].horizontal : dividerSizes[size].vertical
            )}
          />
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(
          dividerOrientations[orientation].base,
          dividerVariants[variant],
          'border-gray-300',
          isHorizontal ? dividerSizes[size].horizontal : dividerSizes[size].vertical,
          className
        )}
        role="separator"
        data-testid={testId}
        {...props}
      />
    )
  }
)

Divider.displayName = 'Divider'
