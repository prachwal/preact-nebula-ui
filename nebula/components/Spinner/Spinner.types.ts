export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type SpinnerColor = 'current' | 'blue' | 'gray' | 'white' | 'red' | 'green' | 'yellow'

export interface SpinnerProps {
  /** Size of the spinner */
  size?: SpinnerSize
  /** Color of the spinner */
  color?: SpinnerColor
  /** Custom className */
  className?: string
  /** Accessibility label */
  'aria-label'?: string
}
