import type { ComponentProps } from 'preact'

export type DividerVariant = 'solid' | 'dashed' | 'dotted'
export type DividerOrientation = 'horizontal' | 'vertical'
export type DividerSize = 'sm' | 'md' | 'lg'

export interface DividerProps extends Omit<ComponentProps<'div'>, 'size'> {
  /**
   * Visual variant of the divider
   * @default 'solid'
   */
  variant?: DividerVariant
  
  /**
   * Orientation of the divider
   * @default 'horizontal'
   */
  orientation?: DividerOrientation
  
  /**
   * Size/thickness of the divider
   * @default 'md'
   */
  size?: DividerSize
  
  /**
   * Text to display in the center of the divider
   */
  text?: string
  
  /**
   * Custom className to extend the divider styles
   */
  className?: string
  
  /**
   * Test ID for testing
   */
  'data-testid'?: string
}
