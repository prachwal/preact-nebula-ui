import { forwardRef } from 'preact/compat'
import { cn } from '../../utils/cn'
import type { ImageProps, ZoomConfig } from './types'
import { useImage } from './useImage'

export const Image = forwardRef<HTMLDivElement, ImageProps>(
  ({
    src,
    alt,
    size = 'md',
    lazy = true,
    placeholder,
    lowQualitySrc,
    zoom = false,
    srcSet,
    sizes,
    fallback,
    onError,
    loading = 'lazy',
    decoding = 'async',
    className,
    style,
    onLoad,
    onClick,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedby,
    role,
    ...props
  }, ref) => {
    // Process zoom configuration
    const zoomConfig: ZoomConfig | undefined = zoom === true 
      ? {
          enabled: true,
          maxZoom: 3,
          minZoom: 1,
          step: 0.2,
          wheelZoom: true,
          doubleClickZoom: true,
          pinchZoom: false
        }
      : zoom === false 
        ? undefined
        : zoom

    const { state, imageRef, containerRef, handlers, actions } = useImage(src, {
      lazy,
      lowQualitySrc,
      zoomConfig
    })

    // Define size classes
    const sizeClasses = {
      sm: 'w-16 h-16',
      md: 'w-32 h-32',
      lg: 'w-64 h-64',
      xl: 'w-96 h-96',
      full: 'w-full h-full'
    }

    const handleLoad = (event: Event) => {
      handlers.onLoad(event)
      onLoad?.(event)
    }

    const handleError = (event: Event) => {
      handlers.onError(event)
      onError?.(event)
    }

    const handleClick = (event: MouseEvent) => {
      onClick?.(event)
    }

    const isZoomEnabled = zoomConfig?.enabled
    const isZoomActive = isZoomEnabled && state.loaded && state.zoom > 1

    // Determine what to render
    const shouldLoad = lazy ? state.inView : true
    const imageSource = shouldLoad ? src : (lowQualitySrc || placeholder)

    return (
      <div
        ref={(element) => {
          containerRef(element)
          if (typeof ref === 'function') {
            ref(element)
          } else if (ref) {
            ref.current = element
          }
        }}
        className={cn(
          'relative overflow-hidden',
          'bg-gray-100 dark:bg-gray-800',
          sizeClasses[size],
          isZoomEnabled && 'cursor-zoom-in',
          isZoomActive && 'cursor-move',
          className
        )}
        style={{
          ...(typeof style === 'object' && style !== null ? style : {}),
          ...(isZoomEnabled ? {
            '--image-zoom': state.zoom.toString(),
            '--image-translate-x': `${state.position.x}px`,
            '--image-translate-y': `${state.position.y}px`
          } as React.CSSProperties : {})
        }}
        {...props}
      >
        {/* Placeholder */}
        {!state.loaded && !state.error && (
          <div className="absolute inset-0 flex items-center justify-center">
            {placeholder ? (
              <img
                src={placeholder}
                alt=""
                className="w-full h-full object-cover opacity-50"
              />
            ) : (
              <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
            )}
          </div>
        )}

        {/* Main Image */}
        {shouldLoad && !state.error && (
          <img
            ref={imageRef}
            src={imageSource}
            alt={alt}
            srcSet={srcSet}
            sizes={sizes}
            loading={loading}
            decoding={decoding}
            className={cn(
              'w-full h-full object-cover transition-opacity duration-300',
              state.loaded ? 'opacity-100' : 'opacity-0',
              isZoomEnabled && 'transition-transform duration-200 ease-out',
              isZoomEnabled && '[transform:scale(var(--image-zoom,1))_translate(var(--image-translate-x,0),var(--image-translate-y,0))]'
            )}
            onLoad={handleLoad}
            onError={handleError}
            onClick={handleClick}
            onWheel={handlers.onWheel}
            onMouseDown={handlers.onMouseDown}
            onDblClick={handlers.onDoubleClick}
            aria-label={ariaLabel || alt}
            aria-describedby={ariaDescribedby}
          />
        )}

        {/* Error Fallback */}
        {state.error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            {typeof fallback === 'string' ? (
              <img
                src={fallback}
                alt={alt}
                className="w-full h-full object-cover"
              />
            ) : fallback ? (
              fallback
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400">
                <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm">Failed to load image</p>
              </div>
            )}
          </div>
        )}

        {/* Loading Indicator */}
        {state.loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Zoom Controls */}
        {isZoomActive && (
          <div className="absolute top-2 right-2 flex flex-col gap-1 bg-black bg-opacity-50 rounded p-1">
            <button
              onClick={(e) => {
                e.stopPropagation()
                actions.zoomIn()
              }}
              className="p-1 text-white hover:bg-white hover:bg-opacity-20 rounded transition-colors"
              aria-label="Zoom in"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                actions.zoomOut()
              }}
              className="p-1 text-white hover:bg-white hover:bg-opacity-20 rounded transition-colors"
              aria-label="Zoom out"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                actions.resetZoom()
              }}
              className="p-1 text-white hover:bg-white hover:bg-opacity-20 rounded transition-colors"
              aria-label="Reset zoom"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        )}
      </div>
    )
  }
)

Image.displayName = 'Image'
