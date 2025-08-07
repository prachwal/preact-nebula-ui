import type { EmptyImageProps } from '../Empty.types'
import { cn } from '../../../utils/cn'

export function SearchImage({ size = 'default', color = '#d9d9d9' }: EmptyImageProps) {
  const sizeClasses = {
    small: 'w-15 h-15',
    default: 'w-20 h-20',
    large: 'w-25 h-25'
  }

  return (
    <svg
      className={cn('nebula-empty-search-image', sizeClasses[size])}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="No search results"
    >
      <circle cx="28" cy="28" r="12" stroke={color} strokeWidth="2" fill="none" opacity="0.6"/>
      <path d="M38 38l8 8" stroke={color} strokeWidth="2" opacity="0.6"/>
      <path d="M25 28h6M28 25v6" stroke={color} strokeWidth="1" opacity="0.4"/>
    </svg>
  )
}
