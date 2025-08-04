import { cn } from '@/utils/cn'
import type { SkeletonProps } from './Skeleton.types'

const skeletonVariants = {
  text: 'rounded',
  avatar: 'rounded-full',
  rectangular: 'rounded-md',
  circular: 'rounded-full'
}

const skeletonAnimations = {
  pulse: 'animate-pulse',
  wave: 'animate-pulse', // Can be enhanced with custom wave animation
  none: ''
}

const defaultSizes = {
  text: { width: '100%', height: '1rem' },
  avatar: { width: '2.5rem', height: '2.5rem' },
  rectangular: { width: '100%', height: '8rem' },
  circular: { width: '2.5rem', height: '2.5rem' }
}

export function Skeleton({
  variant = 'text',
  width,
  height,
  animation = 'pulse',
  lines = 1,
  children,
  className,
  'data-testid': testId,
  ...props
}: SkeletonProps) {
  // Get dimensions
  const getWidth = () => {
    if (width !== undefined) {
      return typeof width === 'number' ? `${width}px` : width
    }
    return defaultSizes[variant].width
  }

  const getHeight = () => {
    if (height !== undefined) {
      return typeof height === 'number' ? `${height}px` : height
    }
    return defaultSizes[variant].height
  }

  // For text variant with multiple lines (including zero lines)
  if (variant === 'text' && lines !== 1) {
    return (
      <div
        className={cn('space-y-2', className)}
        aria-hidden="true"
        data-testid={testId}
        {...props}
      >
        {lines > 0 && Array.from({ length: lines }, (_, index) => {
          // Make the last line slightly shorter for more realistic appearance
          const isLastLine = index === lines - 1
          const lineWidth = isLastLine && !width ? '75%' : getWidth()
          
          return (
            <div
              key={index}
              className={cn(
                'bg-gray-200 dark:bg-gray-700',
                skeletonVariants.text,
                skeletonAnimations[animation]
              )}
              style={{
                width: lineWidth,
                height: getHeight()
              }}
            />
          )
        })}
      </div>
    )
  }

  // Single skeleton element
  return (
    <div
      className={cn(
        'bg-gray-200 dark:bg-gray-700',
        skeletonVariants[variant],
        skeletonAnimations[animation],
        className
      )}
      style={{
        width: getWidth(),
        height: getHeight()
      }}
      aria-hidden="true"
      data-testid={testId}
      {...props}
    >
      {/* Invisible children for spacing purposes */}
      {children && (
        <div className="invisible">
          {children}
        </div>
      )}
    </div>
  )
}
