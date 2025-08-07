import { useState, useCallback, useEffect } from 'preact/hooks'
import type { CollapseState, UseCollapseAnimationReturn } from './types'

export const useCollapseAnimation = (
  accordion: boolean = false,
  defaultActiveKey?: string | string[],
  activeKey?: string | string[],
  onChange?: (key: string | string[]) => void
): UseCollapseAnimationReturn => {
  const [state, setState] = useState<CollapseState>(() => {
    const initial = activeKey ?? defaultActiveKey ?? (accordion ? '' : [])
    const initialKeys = Array.isArray(initial) ? initial : initial ? [initial] : []
    
    return {
      activeKeys: initialKeys,
      animating: new Set(),
    }
  })

  // Handle controlled mode
  useEffect(() => {
    if (activeKey !== undefined) {
      const keys = Array.isArray(activeKey) ? activeKey : activeKey ? [activeKey] : []
      setState(prev => ({
        ...prev,
        activeKeys: keys,
      }))
    }
  }, [activeKey])

  const setActiveKeys = useCallback((keys: string[]) => {
    setState(prev => ({
      ...prev,
      activeKeys: keys,
    }))
    
    if (onChange) {
      const result = accordion ? (keys[0] || '') : keys
      onChange(result)
    }
  }, [accordion, onChange])

  const togglePanel = useCallback((key: string) => {
    setState(prev => {
      const isActive = prev.activeKeys.includes(key)
      
      let newActiveKeys: string[]
      if (accordion) {
        // Accordion mode: only one panel open
        newActiveKeys = isActive ? [] : [key]
      } else {
        // Multi-panel mode
        newActiveKeys = isActive 
          ? prev.activeKeys.filter(k => k !== key)
          : [...prev.activeKeys, key]
      }
      
      // Trigger animation
      const newState = {
        activeKeys: newActiveKeys,
        animating: new Set([...prev.animating, key]),
      }
      
      return newState
    })
    
    // Call onChange callback
    if (onChange) {
      const currentActive = state.activeKeys.includes(key)
      let newActiveKeys: string[]
      
      if (accordion) {
        newActiveKeys = currentActive ? [] : [key]
      } else {
        newActiveKeys = currentActive 
          ? state.activeKeys.filter(k => k !== key)
          : [...state.activeKeys, key]
      }
      
      const result = accordion ? (newActiveKeys[0] || '') : newActiveKeys
      onChange(result)
    }
    
    // Clear animating state after animation completes
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        animating: new Set([...prev.animating].filter(k => k !== key)),
      }))
    }, 300) // Match CSS transition duration
  }, [accordion, onChange, state.activeKeys])

  const isAnimating = useCallback((key: string) => {
    return state.animating.has(key)
  }, [state.animating])

  return {
    activeKeys: state.activeKeys,
    isAnimating,
    togglePanel,
    setActiveKeys,
  }
}
