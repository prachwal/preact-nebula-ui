import type { EmptyImageProps } from '../Empty.types'
import { cn } from '../../../utils/cn'

export function DataImage({ size = 'default', color = '#d9d9d9' }: EmptyImageProps) {
  const sizeClasses = {
    small: 'w-15 h-15',
    default: 'w-20 h-20',
    large: 'w-25 h-25'
  }

  return (
    <svg
      className={cn('nebula-empty-data-image', sizeClasses[size])}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="No data available"
    >
      <rect x="12" y="16" width="40" height="32" rx="2" stroke={color} strokeWidth="2" fill="none" opacity="0.6"/>
      <path d="M12 24h40M20 32h24M20 36h16M20 40h20" stroke={color} strokeWidth="1" opacity="0.4"/>
      <circle cx="32" cy="32" r="8" stroke={color} strokeWidth="1" fill="none" opacity="0.3"/>
      <path d="M29 32h6M32 29v6" stroke={color} strokeWidth="1" opacity="0.5"/>
    </svg>
  )
}
