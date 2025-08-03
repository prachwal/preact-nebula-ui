import { forwardRef } from 'preact/compat'
import { cn } from '../../utils/cn'
import type { ContainerProps, ContainerSize, ContainerPadding } from './Container.types'

// Container size variants with responsive max-widths
const containerSizes: Record<ContainerSize, string> = {
  sm: 'max-w-xs', // 320px (20rem) - smaller
  md: 'max-w-md', // 448px (28rem) - this works
  lg: 'max-w-2xl', // 672px (42rem) - larger than md  
  xl: 'max-w-4xl', // 896px (56rem) - larger than lg
  '2xl': 'max-w-6xl', // 1152px (72rem) - largest
  full: 'max-w-full'
}

// Container padding variants
const containerPadding: Record<ContainerPadding, string> = {
  none: 'px-0',
  sm: 'px-4',
  md: 'px-6 sm:px-8',
  lg: 'px-8 sm:px-12'
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ 
    size = 'lg',
    padding = 'md',
    centered = true,
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
