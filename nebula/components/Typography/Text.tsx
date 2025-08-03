import { forwardRef } from 'preact/compat'
import { cn } from '../../utils/cn'
import type { TextProps, TextSize, TextWeight } from './Typography.types'

// Text size styles
const textSizes: Record<TextSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl'
}

// Text weights
const textWeights: Record<TextWeight, string> = {
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

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ 
    size = 'base',
    weight = 'normal',
    color = 'default',
    centered = false,
    truncate = false,
    as = 'p',
    children,
    className,
    'data-testid': testId,
    ...props 
  }, ref) => {
    const commonProps = {
      ref: ref as any,
      className: cn(
        textSizes[size],
        textWeights[weight],
        colors[color],
        centered && 'text-center',
        truncate && 'truncate',
        className
      ),
      'data-testid': testId,
      ...props
    }

    switch (as) {
      case 'span':
        return <span {...commonProps}>{children}</span>
      case 'div':
        return <div {...commonProps}>{children}</div>
      case 'p':
      default:
        return <p {...commonProps}>{children}</p>
    }
  }
)

Text.displayName = 'Text'
