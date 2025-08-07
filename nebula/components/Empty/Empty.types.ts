import type { ComponentChild } from 'preact'
import type { CSSProperties } from 'preact/compat'

export type EmptySize = 'small' | 'default' | 'large'

export type EmptyImageType = 
  | 'default'
  | 'simple' 
  | 'search'
  | 'error'
  | 'network'
  | 'data'
  | 'success'

export interface EmptyProps {
  // Content configuration
  image?: ComponentChild | EmptyImageType
  imageStyle?: CSSProperties
  description?: ComponentChild
  children?: ComponentChild
  
  // Styling
  className?: string
  style?: CSSProperties
  size?: EmptySize
  
  // Semantic variants
  variant?: EmptyImageType
  
  // Accessibility
  'aria-label'?: string
}

export interface EmptyImageProps {
  variant?: EmptyImageType
  size?: EmptySize
  animated?: boolean
  color?: string
  style?: CSSProperties
}

// Default messages for different variants
export const defaultMessages: Record<EmptyImageType, string> = {
  default: 'No Data',
  simple: 'No Data',
  search: 'No search results',
  error: 'Something went wrong',
  network: 'Network error',
  data: 'No data available',
  success: 'All done!'
}
