import { ComponentChild, RefObject } from 'preact'
import { CSSProperties } from 'preact/compat'

export interface SliderProps {
  // Wartości
  value?: number | [number, number]
  defaultValue?: number | [number, number]
  min?: number
  max?: number
  step?: number
  
  // Wygląd
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  orientation?: 'horizontal' | 'vertical'
  disabled?: boolean
  className?: string
  style?: CSSProperties
  
  // Znaczniki i etykiety
  marks?: Record<number, string | ComponentChild> | boolean
  dots?: boolean
  included?: boolean
  tooltip?: boolean | 'hover' | 'always'
  
  // Obsługa zdarzeń
  onChange?: (value: number | [number, number]) => void
  onChangeComplete?: (value: number | [number, number]) => void
  onBeforeChange?: (value: number | [number, number]) => void
  
  // Dostępność
  'aria-label'?: string
  'aria-labelledby'?: string
  'aria-describedby'?: string
  
  // Zaawansowane
  range?: boolean
  reverse?: boolean
  keyboard?: boolean
  tabIndex?: number
}

export interface SliderRef {
  focus: () => void
  blur: () => void
  getValue: () => number | [number, number]
  setValue: (value: number | [number, number]) => void
}

export interface SliderMarkProps {
  value: number
  label?: string | ComponentChild
  included?: boolean
  style?: CSSProperties
}

export interface SliderState {
  value: number | [number, number]
  dragging: boolean
  focused: boolean
  activeHandle?: number
}

export interface SliderHandle {
  value: number
  position: number
  dragging: boolean
  focused: boolean
}
