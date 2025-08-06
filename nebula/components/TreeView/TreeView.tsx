import { forwardRef } from 'preact/compat'
import { useState, useMemo } from 'preact/hooks'
import { cn } from '../../utils/cn'
import { TreeNode } from './TreeNode'
import { useTreeView } from './useTreeView'
import type { TreeViewProps, TreeNode as TreeNodeType } from './types'

// Debug flag - set to true to enable debugging
const DEBUG_TREEVIEW = false

// Debug utility
const debug = (...args: any[]) => {
  if (DEBUG_TREEVIEW) {
    console.log('[TREEVIEW DEBUG]', ...args)
  }
}

export const TreeView = forwardRef<HTMLDivElement, TreeViewProps>(({
  data,
  selectedKeys,
  defaultSelectedKeys,
  expandedKeys,
  defaultExpandedKeys,
  checkedKeys,
  defaultCheckedKeys,
  selectable = true,
  checkable = false,
  searchable = false,
  searchValue: controlledSearchValue,
  searchPlaceholder = 'Search...',
  virtual = false,
  height = 300,
  showLine = false,
  showIcon = true,
  draggable = false,
  expandAll = false,
  autoExpandParent = true,
  size = 'md',
  loading = false,
  emptyText = 'No data',
  renderNode,
  renderIcon,
  onSelect,
  onExpand,
  onCheck,
  onSearch,
  onLoadData,
  onDrop,
  filterTreeNode,
  className,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  id,
  ...props
}, ref) => {
  debug('🎯 TreeView initialized with props:', {
    dataCount: data.length,
    selectedKeys,
    defaultSelectedKeys,
    expandedKeys,
    defaultExpandedKeys,
    checkedKeys,
    defaultCheckedKeys,
    selectable,
    checkable,
    searchable,
    size,
    loading
  })
  // Internal search state
  const [internalSearchValue, setInternalSearchValue] = useState('')
  const searchValue = controlledSearchValue !== undefined ? controlledSearchValue : internalSearchValue

  // Tree state management
  const {
    selectedKeys: currentSelectedKeys,
    expandedKeys: currentExpandedKeys,
    checkedKeys: currentCheckedKeys,
    handleSelect,
    handleExpand,
    handleCheck,
    getNodeByKey
  } = useTreeView({
    data,
    selectedKeys,
    defaultSelectedKeys,
    expandedKeys,
    defaultExpandedKeys,
    checkedKeys,
    defaultCheckedKeys,
    selectable,
    checkable,
    onSelect,
    onExpand,
    onCheck
  })

  debug('📊 TreeView state:', {
    currentSelectedKeys,
    currentExpandedKeys,
    currentCheckedKeys,
    handlersAvailable: {
      handleSelect: !!handleSelect,
      handleExpand: !!handleExpand,
      handleCheck: !!handleCheck
    }
  })

  // Filter nodes based on search
  const filteredData = useMemo(() => {
    if (!searchValue.trim()) return data

    const filterNode = filterTreeNode || ((node: TreeNodeType, search: string) => {
      return node.title.toLowerCase().includes(search.toLowerCase())
    })

    function filterNodes(nodes: TreeNodeType[]): TreeNodeType[] {
      return nodes.reduce((filtered: TreeNodeType[], node) => {
        const isMatch = filterNode(node, searchValue.trim())
        const filteredChildren = node.children ? filterNodes(node.children) : []
        
        if (isMatch || filteredChildren.length > 0) {
          filtered.push({
            ...node,
            children: filteredChildren.length > 0 ? filteredChildren : node.children
          })
        }
        
        return filtered
      }, [])
    }

    return filterNodes(data)
  }, [data, searchValue, filterTreeNode])

  // Auto-expand parent nodes when searching
  const expandedKeysWithSearch = useMemo(() => {
    if (!searchValue.trim() || !autoExpandParent) return currentExpandedKeys

    const expandedSet = new Set(currentExpandedKeys)
    
    function hasMatchingDescendant(nodes: TreeNodeType[]): boolean {
      return nodes.some(node => {
        const isMatch = filterTreeNode ? 
          filterTreeNode(node, searchValue.trim()) : 
          node.title.toLowerCase().includes(searchValue.toLowerCase().trim())
          
        if (isMatch) return true
        
        if (node.children) {
          return hasMatchingDescendant(node.children)
        }
        
        return false
      })
    }
    
    function addParentKeys(nodes: TreeNodeType[]) {
      nodes.forEach(node => {
        if (node.children && hasMatchingDescendant(node.children)) {
          expandedSet.add(node.key)
        }
        
        if (node.children) {
          addParentKeys(node.children)
        }
      })
    }
    
    addParentKeys(data)
    return Array.from(expandedSet)
  }, [data, searchValue, currentExpandedKeys, autoExpandParent, filterTreeNode])

  // Handle search input change
  const handleSearchChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    const value = target.value
    
    if (controlledSearchValue === undefined) {
      setInternalSearchValue(value)
    }
    
    onSearch?.(value)
  }

  // Render tree nodes recursively
  const renderTreeNodes = (nodes: TreeNodeType[], level = 0): any[] => {
    return nodes.map(node => {
      const isExpanded = expandedKeysWithSearch.includes(node.key)
      const isSelected = currentSelectedKeys.includes(node.key)
      const isChecked = currentCheckedKeys.includes(node.key)
      
      // Calculate indeterminate state for checkboxes
      const getIndeterminate = (nodeKey: string): boolean => {
        const nodeData = getNodeByKey(nodeKey)
        if (!nodeData || !nodeData.children || !checkable) return false
        
        const childKeys = nodeData.children.map(child => child.key)
        const checkedChildren = childKeys.filter(key => currentCheckedKeys.includes(key))
        
        return checkedChildren.length > 0 && checkedChildren.length < childKeys.length
      }
      
      const isIndeterminate = getIndeterminate(node.key)

      return (
        <div key={node.key}>
          <TreeNode
            {...node}
            level={level}
            expanded={isExpanded}
            selected={isSelected}
            checked={isChecked}
            indeterminate={isIndeterminate}
            onSelect={(key) => handleSelect(key, node)}
            onExpand={(key) => handleExpand(key, node)}
            onCheck={(key, checked) => handleCheck(key, node, checked)}
            renderNode={renderNode}
            renderIcon={renderIcon}
            showLine={showLine}
            showIcon={showIcon}
            checkable={checkable}
            selectable={selectable !== false}
            size={size}
          />
          
          {/* Render children if expanded */}
          {node.children && isExpanded && (
            <div className="tree-children">
              {renderTreeNodes(node.children, level + 1)}
            </div>
          )}
        </div>
      )
    })
  }

  // Empty state
  if (!loading && filteredData.length === 0) {
    return (
      <div
        ref={ref}
        className={cn(
          'tree-view border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800',
          className
        )}
        {...props}
      >
        {searchable && (
          <div className="p-3 border-b border-gray-200 dark:border-gray-700">
            <input
              type="text"
              value={searchValue}
              onChange={handleSearchChange}
              placeholder={searchPlaceholder}
              className={cn(
                'w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md',
                'bg-white dark:bg-gray-800 text-gray-900 dark:text-white',
                'placeholder-gray-500 dark:placeholder-gray-400',
                'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                'dark:focus:ring-blue-400 dark:focus:border-blue-400'
              )}
            />
          </div>
        )}
        
        <div className="p-8 text-center text-gray-500 dark:text-gray-400">
          <svg className="w-12 h-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v0a2 2 0 01-2 2H10a2 2 0 01-2-2v0z" />
          </svg>
          <p>{searchValue.trim() ? 'No matching results' : emptyText}</p>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className={cn(
        'tree-view border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800',
        className
      )}
      role="tree"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      id={id}
      {...props}
    >
      {/* Search input */}
      {searchable && (
        <div className="p-3 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <input
              type="text"
              value={searchValue}
              onChange={handleSearchChange}
              placeholder={searchPlaceholder}
              className={cn(
                'w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md',
                'bg-white dark:bg-gray-800 text-gray-900 dark:text-white',
                'placeholder-gray-500 dark:placeholder-gray-400',
                'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                'dark:focus:ring-blue-400 dark:focus:border-blue-400'
              )}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Tree content */}
      <div 
        className={cn(
          'tree-content overflow-auto',
          { 'p-2': filteredData.length > 0 }
        )}
        style={virtual ? { height: `${height}px` } : undefined}
      >
        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
              Loading...
            </div>
          </div>
        ) : (
          renderTreeNodes(filteredData)
        )}
      </div>
    </div>
  )
})

TreeView.displayName = 'TreeView'
