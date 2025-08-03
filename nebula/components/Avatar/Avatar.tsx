import { forwardRef } from 'preact/compat'
import { useState } from 'preact/hooks'
import { cn } from '../../utils/cn'
import type { AvatarProps, AvatarSize, AvatarShape } from './Avatar.types'

// Avatar size styles
const avatarSizes: Record<AvatarSize, string> = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
  xl: 'w-16 h-16 text-xl',
  '2xl': 'w-20 h-20 text-2xl'
}

// Avatar shape styles
const avatarShapes: Record<AvatarShape, string> = {
  circle: 'rounded-full',
  square: 'rounded-none',
  rounded: 'rounded-lg'
}

// Generate initials from name
const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .substring(0, 2)
    .toUpperCase()
}

// Generate background color from name
const getBackgroundColor = (name: string): string => {
  const colors = [
    'bg-red-500',
    'bg-orange-500',
    'bg-amber-500',
    'bg-yellow-500',
    'bg-lime-500',
    'bg-green-500',
    'bg-emerald-500',
    'bg-teal-500',
    'bg-cyan-500',
    'bg-sky-500',
    'bg-blue-500',
    'bg-indigo-500',
    'bg-violet-500',
    'bg-purple-500',
    'bg-fuchsia-500',
    'bg-pink-500',
    'bg-rose-500'
  ]
  
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  
  return colors[Math.abs(hash) % colors.length]
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ 
    src,
    alt,
    name,
    initials: providedInitials,
    size = 'md',
    shape = 'circle',
    children,
    onError,
    loading = 'lazy',
    className,
    'data-testid': testId,
    ...props 
  }, ref) => {
    const [imageError, setImageError] = useState(false)
    const [imageLoaded, setImageLoaded] = useState(false)

    const handleImageError = (event: Event) => {
      setImageError(true)
      onError?.(event as any)
    }

    const handleImageLoad = () => {
      setImageLoaded(true)
    }

    const shouldShowImage = src && !imageError
    const displayName = name || alt || ''
    const initials = providedInitials || (displayName ? getInitials(displayName) : '')
    const backgroundColor = displayName ? getBackgroundColor(displayName) : 'bg-gray-400'

    return (
      <div
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center font-medium text-white select-none overflow-hidden',
          avatarSizes[size],
          avatarShapes[shape],
          !shouldShowImage && backgroundColor,
          className
        )}
        data-testid={testId}
        {...props}
      >
        {shouldShowImage ? (
          <img
            src={src}
            alt={alt || name || 'Avatar'}
            loading={loading}
            onError={handleImageError}
            onLoad={handleImageLoad}
            className={cn(
              'w-full h-full object-cover',
              !imageLoaded && 'opacity-0',
              imageLoaded && 'opacity-100 transition-opacity duration-200'
            )}
            draggable={false}
          />
        ) : children ? (
          <div className="flex items-center justify-center w-full h-full">
            {children}
          </div>
        ) : initials ? (
          <span className="font-semibold leading-none">
            {initials}
          </span>
        ) : (
          <svg
            className="w-3/5 h-3/5 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        )}
        
        {/* Loading placeholder */}
        {shouldShowImage && !imageLoaded && (
          <div className={cn(
            'absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse',
            avatarShapes[shape]
          )} />
        )}
      </div>
    )
  }
)

Avatar.displayName = 'Avatar'
