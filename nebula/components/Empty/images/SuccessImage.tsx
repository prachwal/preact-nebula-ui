import type { EmptyImageProps } from '../Empty.types'
import { cn } from '../../../utils/cn'

export function SuccessImage({ size = 'default', color = '#52c41a' }: EmptyImageProps) {
  const sizeClasses = {
    small: 'w-15 h-15',
    default: 'w-20 h-20',
    large: 'w-25 h-25'
  }

  return (
    <svg
      className={cn('nebula-empty-success-image', sizeClasses[size])}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Success completed"
    >
      <circle cx="32" cy="32" r="24" stroke={color} strokeWidth="2" fill="none" opacity="0.6"/>
      <path d="M22 32l8 8 16-16" stroke={color} strokeWidth="2" fill="none" opacity="0.8"/>
    </svg>
  )
}
