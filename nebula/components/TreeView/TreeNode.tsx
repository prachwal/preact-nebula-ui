import { forwardRef } from 'preact/compat'
import { cn } from '../../utils/cn'
import { Checkbox } from '../Checkbox'
import type { TreeNodeProps } from './types'

// Debug flag - set to true to enable debugging
const DEBUG_TREENODE = false

// Debug utility
const debug = (...args: any[]) => {
  if (DEBUG_TREENODE) {
    console.log('[TREENODE DEBUG]', ...args)
  }
}

export const TreeNode = forwardRef<HTMLDivElement, TreeNodeProps>(({
  key,
  title,
  children,
  icon,
  disabled = false,
  selectable: nodeSelectable = true,
  isLeaf = false,
  loading = false,
  className,
  level,
  expanded,
  selected,
  checked,
  indeterminate,
  onSelect,
  onExpand,
  onCheck,
  renderNode,
  renderIcon,
  showLine,
  showIcon,
  checkable,
  selectable,
  size = 'md',
  ...props
}, ref) => {
  debug('🎯 TreeNode initialized with props:', {
    key,
    title,
    disabled,
    nodeSelectable,
    level,
    expanded,
    selected,
    checked,
    indeterminate,
    checkable,
    selectable,
    size
  })

  const hasChildren = children && children.length > 0
  const isSelectable = selectable !== false && nodeSelectable && !disabled
  const canExpand = hasChildren && !isLeaf
  
  debug('📊 TreeNode computed state:', {
    hasChildren,
    isSelectable,
    canExpand,
    checkable
  })
  
  // Size-based padding and spacing
  const sizeClasses = {
    sm: 'py-1 text-sm',
    md: 'py-2 text-sm',
    lg: 'py-3 text-base'
  }

  // Handle node click
  const handleClick = () => {
    debug('👆 handleClick triggered:', { isSelectable, key, title })
    if (isSelectable) {
      debug('👆 Calling onSelect for node:', key)
      onSelect(key)
    } else {
      debug('❌ Node click blocked - not selectable')
    }
  }

  // Handle expand/collapse
  const handleToggle = (e: Event) => {
    e.stopPropagation()
    debug('🔄 handleToggle triggered:', { canExpand, disabled, key, expanded })
    if (canExpand && !disabled) {
      debug('🔄 Calling onExpand for node:', key)
      onExpand(key)
    } else {
      debug('❌ Toggle blocked - canExpand:', canExpand, 'disabled:', disabled)
    }
  }

  // Handle checkbox change
  const handleCheckboxChange = (e: Event) => {
    e.stopPropagation()
    const target = e.target as HTMLInputElement
    debug('🔘 handleCheckboxChange triggered:', {
      key,
      title,
      checked: target.checked,
      currentChecked: checked,
      disabled,
      checkable,
      event: e
    })
    debug('🔘 Calling onCheck for node:', { key, checked: target.checked })
    onCheck(key, target.checked)
  }

  // Render expand/collapse icon
  const renderExpandIcon = () => {
    if (!canExpand) {
      return showLine ? (
        <div className="w-4 h-4 flex items-center justify-center">
          <div className="w-2 h-px bg-gray-300 dark:bg-gray-600" />
        </div>
      ) : (
        <div className="w-4 h-4" />
      )
    }

    return (
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={cn(
          'w-4 h-4 flex items-center justify-center rounded transition-colors',
          'hover:bg-gray-100 dark:hover:bg-gray-700',
          'focus:outline-none focus:ring-2 focus:ring-blue-500',
          {
            'cursor-not-allowed opacity-50': disabled,
            'cursor-pointer': !disabled
          }
        )}
        aria-label={expanded ? 'Collapse' : 'Expand'}
      >
        {loading ? (
          <div className="w-3 h-3 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
        ) : (
          <svg
            className={cn(
              'w-3 h-3 transition-transform text-gray-500 dark:text-gray-400',
              { 'rotate-90': expanded }
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        )}
      </button>
    )
  }

  // Render node icon
  const renderNodeIcon = () => {
    if (!showIcon) return null

    if (renderIcon) {
      return renderIcon({ key, title, children, icon, disabled, selectable: nodeSelectable, isLeaf, loading }, {
        expanded,
        selected,
        level
      })
    }

    if (icon) {
      return <div className="w-4 h-4 flex items-center justify-center">{icon}</div>
    }

    // Default icons
    if (hasChildren) {
      return (
        <div className="w-4 h-4 flex items-center justify-center text-gray-500 dark:text-gray-400">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v0a2 2 0 01-2 2H10a2 2 0 01-2-2v0z" />
          </svg>
        </div>
      )
    }

    return (
      <div className="w-4 h-4 flex items-center justify-center text-gray-500 dark:text-gray-400">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
    )
  }

  // Render checkbox
  const renderCheckbox = () => {
    if (!checkable) {
      debug('🔘 Checkbox not rendered - checkable is false')
      return null
    }

    debug('🔘 Rendering checkbox with state:', {
      checked,
      indeterminate,
      disabled,
      key,
      title
    })

    return (
      <Checkbox
        checked={checked}
        indeterminate={indeterminate}
        disabled={disabled}
        size="sm"
        onChange={(e) => {
          debug('🔘 TreeNode Checkbox component onChange:', {
            key,
            title,
            checked: (e.target as HTMLInputElement).checked,
            currentChecked: checked,
            disabled,
            event: e
          })
          handleCheckboxChange(e)
        }}
        aria-label={`${checked ? 'Uncheck' : 'Check'} ${title}`}
      />
    )
  }

  // Custom node renderer
  if (renderNode) {
    return (
      <div
        ref={ref}
        className={cn('tree-node', className)}
        style={{ paddingLeft: `${level * 24}px` }}
        {...props}
      >
        {renderNode({ key, title, children, icon, disabled, selectable: nodeSelectable, isLeaf, loading }, {
          expanded,
          selected,
          checked,
          indeterminate,
          level
        })}
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className={cn(
        'tree-node flex items-center gap-2 w-full transition-colors',
        sizeClasses[size],
        {
          'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300': selected,
          'hover:bg-gray-50 dark:hover:bg-gray-800': isSelectable && !selected,
          'text-gray-500 dark:text-gray-400': disabled,
          'cursor-pointer': isSelectable,
          'cursor-not-allowed': disabled
        },
        className
      )}
      style={{ paddingLeft: `${level * 24 + 8}px` }}
      onClick={handleClick}
      role="treeitem"
      aria-selected={selected}
      aria-expanded={canExpand ? expanded : undefined}
      aria-level={level + 1}
      aria-disabled={disabled}
      tabIndex={selected ? 0 : -1}
      {...props}
    >
      {/* Expand/collapse icon */}
      {renderExpandIcon()}

      {/* Checkbox */}
      {renderCheckbox()}

      {/* Node icon */}
      {renderNodeIcon()}

      {/* Node title */}
      <span
        className={cn(
          'flex-1 truncate',
          {
            'font-medium': selected
          }
        )}
        title={title}
      >
        {title}
      </span>

      {/* Loading indicator */}
      {loading && (
        <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
      )}
    </div>
  )
})

TreeNode.displayName = 'TreeNode'
