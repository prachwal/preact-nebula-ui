import { forwardRef } from 'preact/compat'
import { cn } from '../../utils/cn'
import type { HeadingProps, HeadingLevel, HeadingSize, HeadingWeight } from './Typography.types'

// Heading size styles
const headingSizes: Record<HeadingSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm', 
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl'
}

// Default sizes for semantic levels
const defaultSizes: Record<HeadingLevel, HeadingSize> = {
  1: '4xl',
  2: '3xl',
  3: '2xl',
  4: 'xl',
  5: 'lg',
  6: 'md'
}

// Heading weights
const headingWeights: Record<HeadingWeight, string> = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold'
}

// Colors
const colors = {
  default: 'text-gray-900 dark:text-white',
  muted: 'text-gray-600 dark:text-gray-400',
  accent: 'text-blue-600 dark:text-blue-400',
  success: 'text-green-600 dark:text-green-400',
  warning: 'text-yellow-600 dark:text-yellow-400',
  error: 'text-red-600 dark:text-red-400'
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ 
    level = 1,
    size,
    weight = 'bold',
    color = 'default',
    centered = false,
    truncate = false,
    children,
    className,
    'data-testid': testId,
    ...props 
  }, ref) => {
    const actualSize = size || defaultSizes[level]

    const commonProps = {
      ref: ref as any,
      className: cn(
        headingSizes[actualSize],
        headingWeights[weight],
        colors[color],
        centered && 'text-center',
        truncate && 'truncate',
        className
      ),
      'data-testid': testId,
      ...props
    }

    switch (level) {
      case 1:
        return <h1 {...commonProps}>{children}</h1>
      case 2:
        return <h2 {...commonProps}>{children}</h2>
      case 3:
        return <h3 {...commonProps}>{children}</h3>
      case 4:
        return <h4 {...commonProps}>{children}</h4>
      case 5:
        return <h5 {...commonProps}>{children}</h5>
      case 6:
        return <h6 {...commonProps}>{children}</h6>
      default:
        return <h1 {...commonProps}>{children}</h1>
    }
  }
)

Heading.displayName = 'Heading'
