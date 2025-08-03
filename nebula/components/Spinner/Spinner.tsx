import { cn } from '../../utils/cn'
import type { SpinnerProps, SpinnerSize, SpinnerColor } from './Spinner.types'

// Size variants for spinner dimensions
const spinnerSizes: Record<SpinnerSize, string> = {
  xs: 'h-2.5 w-2.5',
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
  xl: 'h-6 w-6',
  '2xl': 'h-8 w-8'
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
