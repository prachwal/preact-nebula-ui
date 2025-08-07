import { forwardRef } from 'preact/compat'
import { cn } from '../../utils/cn'
import { useTheme } from '../ConfigProvider'
import { DefaultImage } from './images/DefaultImage'
import { SimpleImage } from './images/SimpleImage'
import { SearchImage } from './images/SearchImage'
import { ErrorImage } from './images/ErrorImage'
import { NetworkImage } from './images/NetworkImage'
import { DataImage } from './images/DataImage'
import { SuccessImage } from './images/SuccessImage'
import type { EmptyProps, EmptyImageType } from './Empty.types'
import { defaultMessages } from './Empty.types'

// Image component mapping
const imageComponents = {
  default: DefaultImage,
  simple: SimpleImage,
  search: SearchImage,
  error: ErrorImage,
  network: NetworkImage,
  data: DataImage,
  success: SuccessImage
}

export const Empty = forwardRef<HTMLDivElement, EmptyProps>((props, ref) => {
  const {
    image = 'default',
    description,
    children,
    className,
    size = 'default',
    variant = 'default',
    'aria-label': ariaLabel,
    ...rest
  } = props

  const theme = useTheme()

  // Determine which image variant to use
  const imageVariant = (typeof image === 'string' ? image as EmptyImageType : variant)
  
  // Size classes
  const sizeClasses = {
    small: 'text-sm',
    default: 'text-base', 
    large: 'text-lg'
  }

  const emptyClasses = cn(
    'nebula-empty',
    'flex flex-col items-center justify-center text-center py-8 px-4',
    sizeClasses[size],
    className
  )

  const renderImage = () => {
    // If custom image component is provided
    if (typeof image !== 'string' && image) {
      return (
        <div className={cn(
          'nebula-empty-image mb-4',
          size === 'small' && 'w-15 h-15',
          size === 'default' && 'w-20 h-20', 
          size === 'large' && 'w-25 h-25'
        )}>
          {image}
        </div>
      )
    }

    // Use built-in image components
    const ImageComponent = imageComponents[imageVariant] || imageComponents.default
    
    return (
      <div className="nebula-empty-image mb-4">
        <ImageComponent
          size={size}
          color={theme.token.colorTextTertiary}
        />
      </div>
    )
  }

  const renderDescription = () => {
    if (description === false) return null
    
    const descriptionContent = description !== undefined 
      ? description 
      : defaultMessages[imageVariant] || defaultMessages.default

    return (
      <div className={cn(
        'nebula-empty-description mb-4',
        'text-gray-500 dark:text-gray-400'
      )}>
        {descriptionContent}
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className={emptyClasses}
      role="status"
      aria-label={ariaLabel || `Empty state: ${defaultMessages[imageVariant]}`}
      {...rest}
    >
      {renderImage()}
      {renderDescription()}
      {children && (
        <div className="nebula-empty-footer">
          {children}
        </div>
      )}
    </div>
  )
})

Empty.displayName = 'Empty'
