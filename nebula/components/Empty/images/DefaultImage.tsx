import type { EmptyImageProps } from '../Empty.types'
import { cn } from '../../../utils/cn'

export function DefaultImage({ size = 'default', color = '#d9d9d9' }: EmptyImageProps) {
  const sizeClasses = {
    small: 'w-15 h-15',
    default: 'w-20 h-20',
    large: 'w-25 h-25'
  }

  return (
    <svg
      className={cn('nebula-empty-default-image', sizeClasses[size])}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="No data illustration"
    >
      <rect x="16" y="20" width="32" height="24" rx="2" fill={color} opacity="0.3"/>
      <rect x="20" y="24" width="8" height="2" fill={color} opacity="0.6"/>
      <rect x="20" y="28" width="12" height="2" fill={color} opacity="0.6"/>
      <rect x="20" y="32" width="10" height="2" fill={color} opacity="0.6"/>
      <rect x="20" y="36" width="14" height="2" fill={color} opacity="0.6"/>
      <circle cx="32" cy="12" r="4" fill={color} opacity="0.4"/>
      <path d="M28 16h8v4h-8z" fill={color} opacity="0.5"/>
    </svg>
  )
}
