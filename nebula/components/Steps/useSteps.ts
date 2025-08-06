import { useState, useCallback } from 'preact/hooks'
import type { UseStepsOptions, UseStepsReturn } from './types'

export function useSteps(options: UseStepsOptions): UseStepsReturn {
  const { current: controlledCurrent, total, onChange } = options
  
  const [internalCurrent, setInternalCurrent] = useState(0)
  const current = controlledCurrent ?? internalCurrent
  const isControlled = controlledCurrent !== undefined
  
  const updateCurrent = useCallback((newCurrent: number) => {
    const clampedCurrent = Math.max(0, Math.min(total - 1, newCurrent))
    
    if (!isControlled) {
      setInternalCurrent(clampedCurrent)
    }
    
    onChange?.(clampedCurrent)
  }, [isControlled, total, onChange])
  
  const goTo = useCallback((step: number) => {
    updateCurrent(step)
  }, [updateCurrent])
  
  const next = useCallback(() => {
    if (current < total - 1) {
      updateCurrent(current + 1)
    }
  }, [current, total, updateCurrent])
  
  const prev = useCallback(() => {
    if (current > 0) {
      updateCurrent(current - 1)
    }
  }, [current, updateCurrent])
  
  const canGoNext = current < total - 1
  const canGoPrev = current > 0
  const isFirst = current === 0
  const isLast = current === total - 1
  const progress = total > 0 ? ((current + 1) / total) * 100 : 0
  
  return {
    current,
    goTo,
    next,
    prev,
    canGoNext,
    canGoPrev,
    isFirst,
    isLast,
    progress
  }
}
