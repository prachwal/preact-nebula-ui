import { cn } from '@/utils/cn'
import type { BadgeProps } from './Badge.types'

const badgeVariants = {
  default: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
  primary: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  secondary: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
  success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  error: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  info: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200'
}

const badgeSizes = {
  sm: 'px-2 py-0.5 text-xs font-medium',
  md: 'px-2.5 py-1 text-sm font-medium',
  lg: 'px-3 py-1.5 text-base font-medium'
}

const badgeShapes = {
  rounded: 'rounded-md',
  pill: 'rounded-full',
  square: 'rounded-none'
}

const dotSizes = {
  sm: 'w-2 h-2',
  md: 'w-2.5 h-2.5',
  lg: 'w-3 h-3'
}

export function Badge({
  variant = 'default',
  size = 'md',
  shape = 'rounded',
  dot = false,
  max = 99,
  children,
  className,
  'data-testid': testId,
  ...props
}: BadgeProps) {
  // Handle numeric content with max limit
  const formatContent = (content: any) => {
    if (typeof content === 'number') {
      return content > max ? `${max}+` : content.toString()
    }
    return content
  }

  // For dot mode, render minimal dot indicator
  if (dot) {
    return (
      <span
        className={cn(
          'inline-block rounded-full',
          badgeVariants[variant],
          dotSizes[size],
          className
        )}
        data-testid={testId}
        {...props}
      />
    )
  }

  // Regular badge with content
  return (
    <span
      className={cn(
        'inline-flex items-center',
        badgeVariants[variant],
        badgeSizes[size],
        badgeShapes[shape],
        className
      )}
      data-testid={testId}
      {...props}
    >
      {formatContent(children)}
    </span>
  )
}
