import type { ComponentChild } from 'preact'

export interface StepItem {
  key?: string
  title: string
  description?: string
  icon?: ComponentChild
  status?: StepStatus
  disabled?: boolean
}

export type StepStatus = 'wait' | 'process' | 'finish' | 'error'

export type StepDirection = 'horizontal' | 'vertical'

export interface StepsProps {
  // Core props
  current?: number
  steps?: StepItem[]
  children?: ComponentChild[]
  
  // Appearance
  direction?: StepDirection
  size?: 'default' | 'small'
  status?: StepStatus
  progressDot?: boolean | ((index: number, status: StepStatus) => ComponentChild)
  
  // Interaction
  onChange?: (current: number) => void
  
  // Styling
  className?: string
  style?: React.CSSProperties
  
  // Accessibility
  'aria-label'?: string
  'aria-labelledby'?: string
  'aria-describedby'?: string
}

export interface StepProps {
  // Content
  title: string
  description?: string
  icon?: ComponentChild
  
  // State
  status?: StepStatus
  disabled?: boolean
  
  // Internal props (passed by Steps component)
  index?: number
  isLast?: boolean
  direction?: StepDirection
  size?: 'default' | 'small'
  progressDot?: boolean | ((index: number, status: StepStatus) => ComponentChild)
  
  // Interaction
  onClick?: (index: number) => void
  
  // Styling
  className?: string
  style?: React.CSSProperties
}

export interface StepsRef {
  goTo: (step: number) => void
  next: () => void
  prev: () => void
  getCurrentStep: () => number
  getTotalSteps: () => number
}

export interface UseStepsOptions {
  current?: number
  total: number
  onChange?: (current: number) => void
}

export interface UseStepsReturn {
  current: number
  goTo: (step: number) => void
  next: () => void
  prev: () => void
  canGoNext: boolean
  canGoPrev: boolean
  isFirst: boolean
  isLast: boolean
  progress: number
}
