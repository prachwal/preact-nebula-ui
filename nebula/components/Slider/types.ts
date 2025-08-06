import type { HTMLAttributes } from 'preact/compat'
import type { ComponentChildren } from 'preact'

export type SliderSize = 'sm' | 'md' | 'lg'
export type SliderOrientation = 'horizontal' | 'vertical'

export interface SliderMark {
  value: number
  label?: string
}

export interface SliderTooltip {
  formatter?: (value: number) => string
  placement?: 'top' | 'bottom' | 'left' | 'right'
}

export interface SliderThumb {
  /** Custom thumb content (defaults to solid circle) */
  content?: string | ComponentChildren
  /** Custom thumb className */
  className?: string
}

export interface SliderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Current value(s) of the slider */
  value?: number | [number, number]
  
  /** Default value for uncontrolled mode */
  defaultValue?: number | [number, number]
  
  /** Callback fired when value changes */
  onChange?: (value: number | [number, number]) => void
  
  /** Minimum value */
  min?: number
  
  /** Maximum value */
  max?: number
  
  /** Step increment (null allows only marked values) */
  step?: number | null
  
  /** Size variant */
  size?: SliderSize
  
  /** Orientation */
  orientation?: SliderOrientation
  
  /** Enable range mode with two handles */
  range?: boolean
  
  /** Marks to display on track */
  marks?: number[] | SliderMark[]
  
  /** Minimum distance between handles in range mode */
  minDistance?: number
  
  /** Disabled state */
  disabled?: boolean
  
  /** Tooltip configuration */
  tooltip?: SliderTooltip
  
  /** Custom thumb configuration */
  thumb?: SliderThumb
  
  /** Error state */
  error?: boolean
  
  /** Error message */
  errorMessage?: string
  
  /** Additional class for container */
  className?: string
  
  /** Additional class for track */
  trackClassName?: string
  
  /** Additional class for thumb */
  thumbClassName?: string
  
  /** ARIA label */
  'aria-label'?: string
  
  /** ARIA labelledby */
  'aria-labelledby'?: string
}
