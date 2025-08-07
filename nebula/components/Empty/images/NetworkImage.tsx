import type { EmptyImageProps } from '../Empty.types'
import { cn } from '../../../utils/cn'

export function NetworkImage({ size = 'default', color = '#faad14' }: EmptyImageProps) {
  const sizeClasses = {
    small: 'w-15 h-15',
    default: 'w-20 h-20',
    large: 'w-25 h-25'
  }

  return (
    <svg
      className={cn('nebula-empty-network-image', sizeClasses[size])}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Network error"
    >
      <rect x="16" y="24" width="32" height="20" rx="2" stroke={color} strokeWidth="2" fill="none" opacity="0.6"/>
      <path d="M32 16v8M28 12h8" stroke={color} strokeWidth="2" opacity="0.6"/>
      <circle cx="24" cy="34" r="2" fill={color} opacity="0.4"/>
      <circle cx="32" cy="34" r="2" fill={color} opacity="0.4"/>
      <circle cx="40" cy="34" r="2" fill={color} opacity="0.4"/>
      <path d="M20 48l24-24M44 48l-24-24" stroke={color} strokeWidth="1" opacity="0.5"/>
    </svg>
  )
}
