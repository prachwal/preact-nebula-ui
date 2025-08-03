import { forwardRef } from 'preact/compat'
import { cn } from '../../utils/cn'
import type { DividerProps, DividerOrientation, DividerSize } from './Divider.types'

// Divider size styles for thickness
const dividerSizes: Record<DividerSize, { horizontal: string; vertical: string }> = {
  sm: { horizontal: 'h-px', vertical: 'w-px' },
  md: { horizontal: 'h-0.5', vertical: 'w-0.5' },
  lg: { horizontal: 'h-1', vertical: 'w-1' }
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
    const sizeClasses = dividerSizes[size]
    
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
              variant === 'solid' 
                ? 'bg-gray-500 dark:bg-gray-400'
                : variant === 'dashed'
                  ? 'border-t border-dashed border-gray-500 dark:border-gray-400'
                  : 'border-t border-dotted border-gray-500 dark:border-gray-400',
              isHorizontal ? sizeClasses.horizontal : sizeClasses.vertical
            )}
          />
          <span
            className={cn(
              'text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800',
              isHorizontal ? 'px-3' : 'py-3'
            )}
          >
            {text}
          </span>
          <div
            className={cn(
              'flex-1',
              variant === 'solid' 
                ? 'bg-gray-500 dark:bg-gray-400'
                : variant === 'dashed'
                  ? 'border-t border-dashed border-gray-500 dark:border-gray-400'
                  : 'border-t border-dotted border-gray-500 dark:border-gray-400',
              isHorizontal ? sizeClasses.horizontal : sizeClasses.vertical
            )}
          />
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(
          // Base styling for divider with better contrast
          variant === 'solid' 
            ? (isHorizontal ? `w-full ${sizeClasses.horizontal} bg-gray-500 dark:bg-gray-400` : `${sizeClasses.vertical} h-full bg-gray-500 dark:bg-gray-400`)
            : variant === 'dashed'
              ? (isHorizontal ? `w-full ${sizeClasses.horizontal} border-t border-dashed border-gray-500 dark:border-gray-400` : `${sizeClasses.vertical} h-full border-l border-dashed border-gray-500 dark:border-gray-400`)
              : (isHorizontal ? `w-full ${sizeClasses.horizontal} border-t border-dotted border-gray-500 dark:border-gray-400` : `${sizeClasses.vertical} h-full border-l border-dotted border-gray-500 dark:border-gray-400`),
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
