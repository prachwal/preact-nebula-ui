import { forwardRef } from 'preact/compat'
import { cn } from '../../utils/cn'
import type { AvatarBadgeProps, AvatarBadgePlacement } from './Avatar.types'

// Badge placement styles
const badgePlacements: Record<AvatarBadgePlacement, string> = {
  'top-start': 'top-0 left-0 -translate-x-1/2 -translate-y-1/2',
  'top-end': 'top-0 right-0 translate-x-1/2 -translate-y-1/2',
  'bottom-start': 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2',
  'bottom-end': 'bottom-0 right-0 translate-x-1/2 translate-y-1/2'
}

export const AvatarBadge = forwardRef<HTMLDivElement, AvatarBadgeProps>(
  ({ 
    placement = 'bottom-end',
    status,
    count,
    children,
    className,
    'data-testid': testId,
    ...props 
  }, ref) => {
    // Determine content to display
    let content = children
    if (count !== undefined) {
      content = count > 99 ? '99+' : count.toString()
    } else if (status && !children) {
      content = null // Status badges are typically just colored dots
    }

    // Status-based styling
    const statusStyles = {
      online: 'bg-green-500',
      offline: 'bg-gray-400',
      away: 'bg-yellow-500',
      busy: 'bg-red-500'
    }

    const bgColor = status ? statusStyles[status] : 'bg-red-500'

    return (
      <div
        ref={ref}
        className={cn(
          'absolute inline-flex items-center justify-center text-xs font-medium text-white border-2 border-white dark:border-gray-800 rounded-full',
          content ? 'px-1.5 py-0.5 min-w-[1.25rem] h-5' : 'w-3 h-3', // Smaller for status dots
          bgColor,
          badgePlacements[placement],
          className
        )}
        data-testid={testId}
        {...props}
      >
        {content}
      </div>
    )
  }
)

AvatarBadge.displayName = 'AvatarBadge'
