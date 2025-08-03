import { forwardRef } from 'preact/compat'
import { cn } from '../../utils/cn'
import { sizeTokens } from '../../utils/sizeTokens'
import type { ContainerProps, ContainerSize, ContainerPadding, ContainerBackground } from './Container.types'

// Container size variants with responsive max-widths - using standardized tokens
const containerSizes: Record<ContainerSize, string> = {
  sm: sizeTokens.container.sm,     // max-w-sm (384px)
  md: sizeTokens.container.md,     // max-w-md (448px)
  lg: sizeTokens.container.lg,     // max-w-2xl (672px)
  xl: sizeTokens.container.xl,     // max-w-4xl (896px)
  '2xl': sizeTokens.container['2xl'], // max-w-6xl (1152px)
  full: 'max-w-full'               // 100%
}

// Container padding variants
const containerPadding: Record<ContainerPadding, string> = {
  none: 'px-0',
  sm: 'px-4',
  md: 'px-6 sm:px-8',
  lg: 'px-8 sm:px-12'
}

// Container background variants
const containerBackgrounds: Record<ContainerBackground, string> = {
  none: '',
  white: 'bg-white dark:bg-gray-800',
  'gray-50': 'bg-gray-50 dark:bg-gray-700',
  'gray-100': 'bg-gray-100 dark:bg-gray-600'
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ 
    size = 'lg',
    padding = 'md',
    centered = true,
    background = 'none',
    className,
    children,
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base container styles
          'w-full',
          
          // Size variant
          containerSizes[size],
          
          // Padding variant
          containerPadding[padding],
          
          // Background variant
          containerBackgrounds[background],
          
          // Centering
          centered && 'mx-auto',
          
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

Container.displayName = 'Container'
