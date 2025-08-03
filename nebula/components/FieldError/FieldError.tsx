import { cn } from '@/utils/cn'
import type { FieldErrorProps } from './FieldError.types'

export const FieldError = ({
  children,
  id,
  className,
  'data-testid': testId,
  ...props
}: FieldErrorProps) => {
  if (children == null || children === false) {
    return null
  }

  // Check for empty strings but allow whitespace
  if (typeof children === 'string' && children.length === 0) {
    return null
  }

  const baseClasses = cn(
    'mt-1 text-sm text-red-600',
    className
  )

  return (
    <div
      id={id}
      className={baseClasses}
      role="alert"
      aria-live="polite"
      data-testid={testId}
      {...props}
    >
      {children}
    </div>
  )
}

FieldError.displayName = 'FieldError'
