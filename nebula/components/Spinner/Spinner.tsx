import { cn } from '../../utils/cn'
import type { SpinnerProps, SpinnerSize, SpinnerColor } from './Spinner.types'

// Size variants for spinner dimensions - corrected pixel mapping
const spinnerSizes: Record<SpinnerSize, string> = {
  xs: 'w-2 h-2',       // 8px × 8px - closest to 10px request  
  sm: 'w-4 h-4',       // 16px × 16px - Small for compact components  
  md: 'w-6 h-6',       // 24px × 24px - Medium (default)
  lg: 'w-8 h-8',       // 32px × 32px - Large
  xl: 'w-10 h-10',     // 40px × 40px - Extra large
  '2xl': 'w-12 h-12'   // 48px × 48px - Largest
}

// Color variants for spinner
const spinnerColors: Record<SpinnerColor, string> = {
  current: 'text-current',
  blue: 'text-blue-600',
  gray: 'text-gray-600',
  white: 'text-white',
  red: 'text-red-600',
  green: 'text-green-600',
  yellow: 'text-yellow-600'
}

export function Spinner({
  size = 'md',
  color = 'current',
  className,
  'aria-label': ariaLabel = 'Loading...',
  ...props
}: SpinnerProps) {
  return (
    <svg
      className={cn(
        'animate-spin',
        spinnerSizes[size],
        spinnerColors[color],
        className
      )}
      fill="none"
      viewBox="0 0 24 24"
      aria-label={ariaLabel}
      role="status"
      {...props}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}

Spinner.displayName = 'Spinner'
