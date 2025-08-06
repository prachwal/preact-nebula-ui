import { useState, useMemo, useCallback } from 'preact/hooks'
import type { UseTransferOptions, UseTransferReturn, TransferItem } from './types'

export function useTransfer(options: UseTransferOptions): UseTransferReturn {
  const {
    dataSource,
    targetKeys: controlledTargetKeys,
    defaultTargetKeys = [],
    selectedKeys: controlledSelectedKeys,
    defaultSelectedKeys = [],
    onChange,
    onSelectChange
  } = options

  // Target keys state (which items are in the right list)
  const [internalTargetKeys, setInternalTargetKeys] = useState<string[]>(defaultTargetKeys)
  const targetKeys = controlledTargetKeys ?? internalTargetKeys

  // Selected keys state (which items are selected in both lists)
  const [internalSelectedKeys, setInternalSelectedKeys] = useState<string[]>(defaultSelectedKeys)
  const selectedKeys = controlledSelectedKeys ?? internalSelectedKeys

  // Split items into left and right lists
  const { leftItems, rightItems } = useMemo(() => {
    const left: TransferItem[] = []
    const right: TransferItem[] = []

    dataSource.forEach(item => {
      if (targetKeys.includes(item.key)) {
        right.push(item)
      } else {
        left.push(item)
      }
    })

    return { leftItems: left, rightItems: right }
  }, [dataSource, targetKeys])

  // Split selected keys by list
  const { leftSelectedKeys, rightSelectedKeys } = useMemo(() => {
    const leftKeys = leftItems.map(item => item.key)
    const rightKeys = rightItems.map(item => item.key)

    return {
      leftSelectedKeys: selectedKeys.filter(key => leftKeys.includes(key)),
      rightSelectedKeys: selectedKeys.filter(key => rightKeys.includes(key))
    }
  }, [selectedKeys, leftItems, rightItems])

  // Update target keys
  const updateTargetKeys = useCallback((newTargetKeys: string[], direction: 'left' | 'right', moveKeys: string[]) => {
    if (controlledTargetKeys === undefined) {
      setInternalTargetKeys(newTargetKeys)
    }
    onChange?.(newTargetKeys, direction, moveKeys)
  }, [controlledTargetKeys, onChange])

  // Update selected keys
  const updateSelectedKeys = useCallback((newSelectedKeys: string[]) => {
    if (controlledSelectedKeys === undefined) {
      setInternalSelectedKeys(newSelectedKeys)
    }
    
    const leftKeys = leftItems.map(item => item.key)
    const rightKeys = rightItems.map(item => item.key)
    
    onSelectChange?.(
      newSelectedKeys.filter(key => leftKeys.includes(key)),
      newSelectedKeys.filter(key => rightKeys.includes(key))
    )
  }, [controlledSelectedKeys, onSelectChange, leftItems, rightItems])

  // Move items to right
  const moveToRight = useCallback(() => {
    const availableKeys = leftSelectedKeys.filter(key => {
      const item = leftItems.find(item => item.key === key)
      return item && !item.disabled
    })
    
    if (availableKeys.length === 0) return

    const newTargetKeys = [...targetKeys, ...availableKeys]
    const newSelectedKeys = selectedKeys.filter(key => !availableKeys.includes(key))
    
    updateTargetKeys(newTargetKeys, 'right', availableKeys)
    updateSelectedKeys(newSelectedKeys)
  }, [leftSelectedKeys, leftItems, targetKeys, selectedKeys, updateTargetKeys, updateSelectedKeys])

  // Move items to left
  const moveToLeft = useCallback(() => {
    const availableKeys = rightSelectedKeys.filter(key => {
      const item = rightItems.find(item => item.key === key)
      return item && !item.disabled
    })
    
    if (availableKeys.length === 0) return

    const newTargetKeys = targetKeys.filter(key => !availableKeys.includes(key))
    const newSelectedKeys = selectedKeys.filter(key => !availableKeys.includes(key))
    
    updateTargetKeys(newTargetKeys, 'left', availableKeys)
    updateSelectedKeys(newSelectedKeys)
  }, [rightSelectedKeys, rightItems, targetKeys, selectedKeys, updateTargetKeys, updateSelectedKeys])

  // Select items in left list
  const selectLeft = useCallback((keys: string[]) => {
    const otherKeys = selectedKeys.filter(key => !leftItems.some(item => item.key === key))
    updateSelectedKeys([...otherKeys, ...keys])
  }, [selectedKeys, leftItems, updateSelectedKeys])

  // Select items in right list
  const selectRight = useCallback((keys: string[]) => {
    const otherKeys = selectedKeys.filter(key => !rightItems.some(item => item.key === key))
    updateSelectedKeys([...otherKeys, ...keys])
  }, [selectedKeys, rightItems, updateSelectedKeys])

  // Select all items in left list
  const selectAllLeft = useCallback((selected: boolean) => {
    const leftKeys = leftItems.filter(item => !item.disabled).map(item => item.key)
    const otherKeys = selectedKeys.filter(key => !leftItems.some(item => item.key === key))
    
    if (selected) {
      updateSelectedKeys([...otherKeys, ...leftKeys])
    } else {
      updateSelectedKeys(otherKeys)
    }
  }, [leftItems, selectedKeys, updateSelectedKeys])

  // Select all items in right list
  const selectAllRight = useCallback((selected: boolean) => {
    const rightKeys = rightItems.filter(item => !item.disabled).map(item => item.key)
    const otherKeys = selectedKeys.filter(key => !rightItems.some(item => item.key === key))
    
    if (selected) {
      updateSelectedKeys([...otherKeys, ...rightKeys])
    } else {
      updateSelectedKeys(otherKeys)
    }
  }, [rightItems, selectedKeys, updateSelectedKeys])

  // Clear all selections
  const clearSelections = useCallback(() => {
    updateSelectedKeys([])
  }, [updateSelectedKeys])

  // Check if move operations are available
  const canMoveToRight = leftSelectedKeys.length > 0 && leftSelectedKeys.some(key => {
    const item = leftItems.find(item => item.key === key)
    return item && !item.disabled
  })

  const canMoveToLeft = rightSelectedKeys.length > 0 && rightSelectedKeys.some(key => {
    const item = rightItems.find(item => item.key === key)
    return item && !item.disabled
  })

  return {
    leftItems,
    rightItems,
    leftSelectedKeys,
    rightSelectedKeys,
    targetKeys,
    moveToRight,
    moveToLeft,
    selectLeft,
    selectRight,
    selectAllLeft,
    selectAllRight,
    clearSelections,
    canMoveToRight,
    canMoveToLeft
  }
}
