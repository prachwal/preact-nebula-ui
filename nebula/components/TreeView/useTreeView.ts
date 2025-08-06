import { useState, useCallback, useMemo } from 'preact/hooks'
import type { TreeNode, UseTreeViewOptions, UseTreeViewReturn } from './types'

// Debug flag - set to true to enable debugging
const DEBUG_USETREEVIEW = false

// Debug utility
const debug = (...args: any[]) => {
  if (DEBUG_USETREEVIEW) {
    console.log('[USETREEVIEW DEBUG]', ...args)
  }
}

export function useTreeView({
  data,
  selectedKeys: controlledSelectedKeys,
  defaultSelectedKeys = [],
  expandedKeys: controlledExpandedKeys,
  defaultExpandedKeys = [],
  checkedKeys: controlledCheckedKeys,
  defaultCheckedKeys = [],
  selectable = true,
  checkable = false,
  onSelect,
  onExpand,
  onCheck
}: UseTreeViewOptions): UseTreeViewReturn {
  debug('🎯 useTreeView initialized with options:', {
    dataCount: data.length,
    controlledSelectedKeys,
    defaultSelectedKeys,
    controlledExpandedKeys,
    defaultExpandedKeys,
    controlledCheckedKeys,
    defaultCheckedKeys,
    selectable,
    checkable,
    hasCallbacks: {
      onSelect: !!onSelect,
      onExpand: !!onExpand,
      onCheck: !!onCheck
    }
  })

  // Internal state for uncontrolled mode
  const [internalSelectedKeys, setInternalSelectedKeys] = useState<string[]>(defaultSelectedKeys)
  const [internalExpandedKeys, setInternalExpandedKeys] = useState<string[]>(defaultExpandedKeys)
  const [internalCheckedKeys, setInternalCheckedKeys] = useState<string[]>(defaultCheckedKeys)

  // Use controlled values if provided, otherwise use internal state
  const selectedKeys = controlledSelectedKeys !== undefined ? controlledSelectedKeys : internalSelectedKeys
  const expandedKeys = controlledExpandedKeys !== undefined ? controlledExpandedKeys : internalExpandedKeys
  const checkedKeys = controlledCheckedKeys !== undefined ? controlledCheckedKeys : internalCheckedKeys

  debug('📊 Current state:', {
    selectedKeys,
    expandedKeys,
    checkedKeys,
    isControlled: {
      selectedKeys: controlledSelectedKeys !== undefined,
      expandedKeys: controlledExpandedKeys !== undefined,
      checkedKeys: controlledCheckedKeys !== undefined
    }
  })

  // Flatten tree nodes for easier lookup
  const flattenNodes = useMemo(() => {
    const flattened: (TreeNode & { level: number })[] = []
    
    function flatten(nodes: TreeNode[], level = 0) {
      nodes.forEach(node => {
        flattened.push({ ...node, level })
        if (node.children && node.children.length > 0) {
          flatten(node.children, level + 1)
        }
      })
    }
    
    flatten(data)
    return flattened
  }, [data])

  // Get node by key
  const getNodeByKey = useCallback((key: string): TreeNode | undefined => {
    return flattenNodes.find(node => node.key === key)
  }, [flattenNodes])

  // Handle node selection
  const handleSelect = useCallback((key: string, node: TreeNode) => {
    if (!selectable || node.disabled) return

    let newSelectedKeys: string[]

    if (selectable === 'multiple') {
      if (selectedKeys.includes(key)) {
        newSelectedKeys = selectedKeys.filter(k => k !== key)
      } else {
        newSelectedKeys = [...selectedKeys, key]
      }
    } else {
      // Single selection
      newSelectedKeys = selectedKeys.includes(key) ? [] : [key]
    }

    if (controlledSelectedKeys === undefined) {
      setInternalSelectedKeys(newSelectedKeys)
    }

    onSelect?.(newSelectedKeys, node, !selectedKeys.includes(key))
  }, [selectedKeys, selectable, controlledSelectedKeys, onSelect])

  // Handle node expansion
  const handleExpand = useCallback((key: string, node: TreeNode) => {
    if (node.disabled) return

    let newExpandedKeys: string[]

    if (expandedKeys.includes(key)) {
      newExpandedKeys = expandedKeys.filter(k => k !== key)
    } else {
      newExpandedKeys = [...expandedKeys, key]
    }

    if (controlledExpandedKeys === undefined) {
      setInternalExpandedKeys(newExpandedKeys)
    }

    onExpand?.(newExpandedKeys, node, !expandedKeys.includes(key))
  }, [expandedKeys, controlledExpandedKeys, onExpand])

  // Get parent keys for a given node
  const getParentKeys = useCallback((nodeKey: string): string[] => {
    const parentKeys: string[] = []
    
    function findParents(nodes: TreeNode[], targetKey: string, currentPath: string[] = []): boolean {
      for (const node of nodes) {
        const newPath = [...currentPath, node.key]
        
        if (node.key === targetKey) {
          parentKeys.push(...currentPath)
          return true
        }
        
        if (node.children && findParents(node.children, targetKey, newPath)) {
          return true
        }
      }
      return false
    }
    
    findParents(data, nodeKey)
    return parentKeys
  }, [data])

  // Get all descendant keys for a given node
  const getDescendantKeys = useCallback((nodeKey: string): string[] => {
    const node = getNodeByKey(nodeKey)
    if (!node || !node.children) return []
    
    const descendants: string[] = []
    
    function collectDescendants(nodes: TreeNode[]) {
      nodes.forEach(child => {
        descendants.push(child.key)
        if (child.children) {
          collectDescendants(child.children)
        }
      })
    }
    
    collectDescendants(node.children)
    return descendants
  }, [getNodeByKey])

  // Handle node checking (with cascade logic)
  const handleCheck = useCallback((key: string, node: TreeNode, checked: boolean) => {
    debug('🔘 handleCheck called:', {
      key,
      nodeTitle: node.title,
      checked,
      checkable,
      nodeDisabled: node.disabled,
      currentCheckedKeys: checkedKeys
    })

    if (!checkable) {
      debug('❌ Check blocked - checkable is false')
      return
    }
    
    if (node.disabled) {
      debug('❌ Check blocked - node is disabled')
      return
    }

    let newCheckedKeys = [...checkedKeys]
    debug('🔘 Starting with checked keys:', newCheckedKeys)

    if (checked) {
      // Add the node
      if (!newCheckedKeys.includes(key)) {
        newCheckedKeys.push(key)
        debug('🔘 Added node to checked keys:', key)
      }
      
      // Add all descendants
      const descendants = getDescendantKeys(key)
      debug('🔘 Found descendants:', descendants)
      descendants.forEach(descendant => {
        if (!newCheckedKeys.includes(descendant)) {
          newCheckedKeys.push(descendant)
          debug('🔘 Added descendant to checked keys:', descendant)
        }
      })
    } else {
      // Remove the node and all descendants
      newCheckedKeys = newCheckedKeys.filter(k => k !== key)
      debug('🔘 Removed node from checked keys:', key)
      const descendants = getDescendantKeys(key)
      newCheckedKeys = newCheckedKeys.filter(k => !descendants.includes(k))
      debug('🔘 Removed descendants from checked keys:', descendants)
    }

    // Check parent nodes if all siblings are checked
    const parentKeys = getParentKeys(key)
    debug('🔘 Found parent keys:', parentKeys)
    parentKeys.forEach(parentKey => {
      const parent = getNodeByKey(parentKey)
      if (parent && parent.children) {
        const allChildrenChecked = parent.children.every(child => 
          newCheckedKeys.includes(child.key) || child.disabled
        )
        
        debug('🔘 Parent check analysis:', {
          parentKey,
          parentTitle: parent.title,
          allChildrenChecked,
          childrenStates: parent.children.map(child => ({
            key: child.key,
            title: child.title,
            checked: newCheckedKeys.includes(child.key),
            disabled: child.disabled
          }))
        })
        
        if (allChildrenChecked && !newCheckedKeys.includes(parentKey)) {
          newCheckedKeys.push(parentKey)
          debug('🔘 Added parent to checked keys:', parentKey)
        } else if (!allChildrenChecked && newCheckedKeys.includes(parentKey)) {
          newCheckedKeys = newCheckedKeys.filter(k => k !== parentKey)
          debug('🔘 Removed parent from checked keys:', parentKey)
        }
      }
    })

    debug('🔘 Final checked keys:', newCheckedKeys)

    if (controlledCheckedKeys === undefined) {
      debug('🔘 Updating internal checked keys state')
      setInternalCheckedKeys(newCheckedKeys)
    } else {
      debug('🔘 Using controlled checked keys - not updating internal state')
    }

    debug('🔘 Calling onCheck callback')
    onCheck?.(newCheckedKeys, node, checked)
  }, [checkedKeys, checkable, controlledCheckedKeys, onCheck, getDescendantKeys, getParentKeys, getNodeByKey])

  return {
    selectedKeys,
    expandedKeys,
    checkedKeys,
    handleSelect,
    handleExpand,
    handleCheck,
    flattenNodes,
    getNodeByKey
  }
}
