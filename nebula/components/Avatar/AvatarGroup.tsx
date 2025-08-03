import { forwardRef } from 'preact/compat'
import { Children, cloneElement, isValidElement } from 'preact/compat'
import { cn } from '../../utils/cn'
import type { AvatarGroupProps } from './Avatar.types'

// Spacing between avatars
const spacingStyles = {
  tight: '-space-x-1',
  normal: '-space-x-2',
  loose: '-space-x-3'
}

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ 
    max = 5,
    size = 'md',
    shape = 'circle',
    spacing = 'normal',
    children,
    className,
    'data-testid': testId,
    ...props 
  }, ref) => {
    const childrenArray = Children.toArray(children)
    const visibleChildren = childrenArray.slice(0, max)
    const remainingCount = Math.max(0, childrenArray.length - max)

    // Size classes for the overflow indicator
    const sizeClasses = {
      xs: 'w-6 h-6 text-xs',
      sm: 'w-8 h-8 text-sm', 
      md: 'w-10 h-10 text-base',
      lg: 'w-12 h-12 text-lg',
      xl: 'w-16 h-16 text-xl',
      '2xl': 'w-20 h-20 text-2xl'
    }

    const shapeClasses = {
      circle: 'rounded-full',
      square: 'rounded-none',
      rounded: 'rounded-lg'
    }

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center',
          spacingStyles[spacing],
          className
        )}
        data-testid={testId}
        {...props}
      >
        {visibleChildren.map((child, index) => {
          if (isValidElement(child)) {
            return cloneElement(child, {
              key: index,
              size,
              shape,
              className: cn(
                'ring-2 ring-white dark:ring-gray-800',
                (child.props as any).className
              )
            })
          }
          return child
        })}
        
        {remainingCount > 0 && (
          <div
            className={cn(
              'relative inline-flex items-center justify-center font-medium text-white bg-gray-500 dark:bg-gray-600 ring-2 ring-white dark:ring-gray-800',
              sizeClasses[size],
              shapeClasses[shape]
            )}
          >
            <span className="text-xs font-semibold leading-none">
              +{remainingCount}
            </span>
          </div>
        )}
      </div>
    )
  }
)

AvatarGroup.displayName = 'AvatarGroup'
