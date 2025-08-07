import type { EmptyImageProps } from '../Empty.types'
import { cn } from '../../../utils/cn'

export function ErrorImage({ size = 'default', color = '#ff4d4f' }: EmptyImageProps) {
  const sizeClasses = {
    small: 'w-15 h-15',
    default: 'w-20 h-20',
    large: 'w-25 h-25'
  }

  return (
    <svg
      className={cn('nebula-empty-error-image', sizeClasses[size])}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Error occurred"
    >
      <circle cx="32" cy="32" r="24" stroke={color} strokeWidth="2" fill="none" opacity="0.6"/>
      <path d="M24 24l16 16M40 24l-16 16" stroke={color} strokeWidth="2" opacity="0.8"/>
    </svg>
  )
}
