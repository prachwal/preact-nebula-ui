import type { ComponentChild, ComponentProps } from 'preact'

export interface ImageProps extends Omit<ComponentProps<'div'>, 'onLoad' | 'onError' | 'onClick'> {
  // Core image props
  src: string
  alt: string
  
  // Size variants (required pattern)
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  
  // Lazy loading
  lazy?: boolean
  placeholder?: string
  
  // Progressive loading
  lowQualitySrc?: string
  
  // Zoom functionality
  zoom?: boolean | ZoomConfig
  
  // Responsive images
  srcSet?: string
  sizes?: string
  
  // Fallback handling
  fallback?: string | ComponentChild
  onError?: (event: Event) => void
  
  // Performance
  loading?: 'lazy' | 'eager'
  decoding?: 'async' | 'sync' | 'auto'
  
  // Events
  onLoad?: (event: Event) => void
  onClick?: (event: MouseEvent) => void
  
  // Accessibility
  'aria-label'?: string
  'aria-describedby'?: string
}

export interface ZoomConfig {
  enabled: boolean
  maxZoom?: number
  minZoom?: number
  step?: number
  wheelZoom?: boolean
  doubleClickZoom?: boolean
  pinchZoom?: boolean
}

export interface ImageState {
  loaded: boolean
  error: boolean
  loading: boolean
  inView: boolean
  zoom: number
  position: { x: number; y: number }
}

export interface UseImageReturn {
  state: ImageState
  imageRef: (element: HTMLImageElement | null) => void
  containerRef: (element: HTMLDivElement | null) => void
  handlers: {
    onLoad: (event: Event) => void
    onError: (event: Event) => void
    onWheel: (event: WheelEvent) => void
    onMouseDown: (event: MouseEvent) => void
    onDoubleClick: (event: MouseEvent) => void
  }
  actions: {
    zoomIn: () => void
    zoomOut: () => void
    resetZoom: () => void
    setPosition: (x: number, y: number) => void
  }
}
