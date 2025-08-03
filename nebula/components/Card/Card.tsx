import { cn } from '@/utils/cn'
import type { CardProps, CardHeaderProps, CardBodyProps, CardFooterProps } from './Card.types'

const cardVariants = {
  default: 'bg-white border border-gray-200 shadow-sm',
  elevated: 'bg-white shadow-md border-0',
  outlined: 'bg-white border-2 border-gray-300 shadow-none'
}

const cardSizes = {
  sm: 'p-4',
  md: 'p-6', 
  lg: 'p-8'
}

export const Card = ({
  variant = 'default',
  size = 'md',
  interactive = false,
  className,
  children,
  'data-testid': testId,
  ...props
}: CardProps) => {
  const baseClasses = cn(
    // Base card styles
    'rounded-lg transition-all duration-200',
    
    // Variant styles
    cardVariants[variant],
    
    // Size styles
    cardSizes[size],
    
    // Interactive styles
    interactive && [
      'cursor-pointer',
      'hover:shadow-lg hover:scale-[1.02]',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
    ],
    
    className
  )

  return (
    <div
      className={baseClasses}
      data-testid={testId}
      tabIndex={interactive ? 0 : undefined}
      role={interactive ? 'button' : undefined}
      {...props}
    >
      {children}
    </div>
  )
}

export const CardHeader = ({
  className,
  children,
  'data-testid': testId,
  ...props
}: CardHeaderProps) => {
  return (
    <div
      className={cn(
        'flex flex-col space-y-1.5 pb-6',
        className
      )}
      data-testid={testId}
      {...props}
    >
      {children}
    </div>
  )
}

export const CardBody = ({
  className,
  children,
  'data-testid': testId,
  ...props
}: CardBodyProps) => {
  return (
    <div
      className={cn('pt-0', className)}
      data-testid={testId}
      {...props}
    >
      {children}
    </div>
  )
}

export const CardFooter = ({
  className,
  children,
  'data-testid': testId,
  ...props
}: CardFooterProps) => {
  return (
    <div
      className={cn(
        'flex items-center pt-6',
        className
      )}
      data-testid={testId}
      {...props}
    >
      {children}
    </div>
  )
}

Card.displayName = 'Card'
CardHeader.displayName = 'CardHeader'
CardBody.displayName = 'CardBody'
CardFooter.displayName = 'CardFooter'
