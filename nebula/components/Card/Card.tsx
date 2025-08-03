import { cn } from '@/utils/cn'
import type { CardProps, CardHeaderProps, CardBodyProps, CardFooterProps } from './Card.types'

const cardVariants = {
  default: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm',
  elevated: 'bg-white dark:bg-gray-800 shadow-md border-0',
  outlined: 'bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 shadow-none'
}

const cardSizes = {
  sm: 'p-4',
  md: 'p-6', 
  lg: 'p-8'
}

const cardPaddings = {
  none: '',
  sm: 'p-4',
  md: 'p-6', 
  lg: 'p-8'
}

export const Card = ({
  variant = 'default',
  size = 'md',
  padding,
  hover = false,
  interactive = false,
  className,
  children,
  'data-testid': testId,
  ...props
}: CardProps) => {
  // Use padding prop if provided, otherwise fallback to size-based padding
  const paddingClass = padding !== undefined ? cardPaddings[padding] : cardSizes[size]
  
  const baseClasses = cn(
    // Base card styles
    'rounded-lg transition-all duration-200',
    
    // Variant styles
    cardVariants[variant],
    
    // Padding styles
    paddingClass,
    
    // Hover effects
    (hover || interactive) && [
      'cursor-pointer',
      'hover:shadow-lg hover:scale-[1.02]',
    ],
    
    // Interactive styles
    interactive && [
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
