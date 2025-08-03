import type { ComponentProps } from 'preact'

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'

export type ContainerPadding = 'none' | 'sm' | 'md' | 'lg'

export interface ContainerProps extends ComponentProps<'div'> {
  /**
   * Maximum width of the container
   * @default 'lg'
   */
  size?: ContainerSize
  
  /**
   * Horizontal padding of the container
   * @default 'md'
   */
  padding?: ContainerPadding
  
  /**
   * Whether to center the container horizontally
   * @default true
   */
  centered?: boolean
  
  /**
   * Custom className to extend the container styles
   */
  className?: string
  
  /**
   * Container content
   */
  children?: preact.ComponentChildren
}
