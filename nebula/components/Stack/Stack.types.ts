import type { ComponentProps } from 'preact'

export type StackDirection = 'horizontal' | 'vertical'

export type StackSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export type StackAlign = 'start' | 'center' | 'end' | 'stretch'

export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'

export interface StackProps extends ComponentProps<'div'> {
  /**
   * Direction of the stack
   * @default 'vertical'
   */
  direction?: StackDirection
  
  /**
   * Space between stack items
   * @default 'md'
   */
  spacing?: StackSpacing
  
  /**
   * Align items along the cross axis
   * @default 'stretch'
   */
  align?: StackAlign
  
  /**
   * Justify items along the main axis
   * @default 'start'
   */
  justify?: StackJustify
  
  /**
   * Whether items should wrap when they overflow
   * @default false
   */
  wrap?: boolean
  
  /**
   * Custom className to extend the stack styles
   */
  className?: string
  
  /**
   * Stack content
   */
  children?: preact.ComponentChildren
}
