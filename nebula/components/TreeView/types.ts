import type { ComponentChild } from 'preact'

export interface TreeNode {
  key: string
  title: string
  children?: TreeNode[]
  icon?: ComponentChild
  disabled?: boolean
  selectable?: boolean
  isLeaf?: boolean
  expanded?: boolean
  selected?: boolean
  checked?: boolean
  indeterminate?: boolean
  loading?: boolean
  className?: string
  data?: any
}

export interface TreeViewProps {
  /** Tree data */
  data: TreeNode[]
  
  /** Selected node keys (controlled) */
  selectedKeys?: string[]
  
  /** Default selected keys (uncontrolled) */
  defaultSelectedKeys?: string[]
  
  /** Expanded node keys (controlled) */
  expandedKeys?: string[]
  
  /** Default expanded keys (uncontrolled) */
  defaultExpandedKeys?: string[]
  
  /** Checked node keys (controlled) - only for checkable trees */
  checkedKeys?: string[]
  
  /** Default checked keys (uncontrolled) - only for checkable trees */
  defaultCheckedKeys?: string[]
  
  /** Selection mode */
  selectable?: boolean | 'single' | 'multiple'
  
  /** Show checkboxes */
  checkable?: boolean
  
  /** Enable search functionality */
  searchable?: boolean
  
  /** Search value (controlled) */
  searchValue?: string
  
  /** Search placeholder */
  searchPlaceholder?: string
  
  /** Virtual scrolling for large trees */
  virtual?: boolean
  
  /** Tree height for virtual scrolling */
  height?: number
  
  /** Show tree lines */
  showLine?: boolean
  
  /** Show tree icons */
  showIcon?: boolean
  
  /** Allow drag and drop */
  draggable?: boolean
  
  /** Expand all nodes */
  expandAll?: boolean
  
  /** Auto expand parent nodes when searching */
  autoExpandParent?: boolean
  
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  
  /** Loading state */
  loading?: boolean
  
  /** Empty state message */
  emptyText?: string
  
  /** Custom node renderer */
  renderNode?: (node: TreeNode, options: {
    expanded: boolean
    selected: boolean
    checked: boolean
    indeterminate: boolean
    level: number
  }) => ComponentChild
  
  /** Custom icon renderer */
  renderIcon?: (node: TreeNode, options: {
    expanded: boolean
    selected: boolean
    level: number
  }) => ComponentChild
  
  /** Callback when node is selected */
  onSelect?: (selectedKeys: string[], node: TreeNode, selected: boolean) => void
  
  /** Callback when node is expanded */
  onExpand?: (expandedKeys: string[], node: TreeNode, expanded: boolean) => void
  
  /** Callback when node is checked */
  onCheck?: (checkedKeys: string[], node: TreeNode, checked: boolean) => void
  
  /** Callback when search value changes */
  onSearch?: (value: string) => void
  
  /** Callback for async data loading */
  onLoadData?: (node: TreeNode) => Promise<void>
  
  /** Callback for drag and drop */
  onDrop?: (info: {
    dragNode: TreeNode
    node: TreeNode
    dropPosition: number
    dropToGap: boolean
  }) => void
  
  /** Custom filter function for search */
  filterTreeNode?: (node: TreeNode, searchValue: string) => boolean
  
  /** Additional CSS classes */
  className?: string
  
  /** ARIA label */
  'aria-label'?: string
  
  /** ARIA labelledby */
  'aria-labelledby'?: string
  
  /** Component ID */
  id?: string
}

export interface TreeNodeProps extends Omit<TreeNode, 'selectable'> {
  level: number
  expanded: boolean
  selected: boolean
  checked: boolean
  indeterminate: boolean
  onSelect: (key: string) => void
  onExpand: (key: string) => void
  onCheck: (key: string, checked: boolean) => void
  renderNode?: TreeViewProps['renderNode']
  renderIcon?: TreeViewProps['renderIcon']
  showLine: boolean
  showIcon: boolean
  checkable: boolean
  selectable: boolean
  size: 'sm' | 'md' | 'lg'
}

export interface UseTreeViewOptions {
  data: TreeNode[]
  selectedKeys?: string[]
  defaultSelectedKeys?: string[]
  expandedKeys?: string[]
  defaultExpandedKeys?: string[]
  checkedKeys?: string[]
  defaultCheckedKeys?: string[]
  selectable?: boolean | 'single' | 'multiple'
  checkable?: boolean
  onSelect?: TreeViewProps['onSelect']
  onExpand?: TreeViewProps['onExpand']
  onCheck?: TreeViewProps['onCheck']
}

export interface UseTreeViewReturn {
  selectedKeys: string[]
  expandedKeys: string[]
  checkedKeys: string[]
  handleSelect: (key: string, node: TreeNode) => void
  handleExpand: (key: string, node: TreeNode) => void
  handleCheck: (key: string, node: TreeNode, checked: boolean) => void
  flattenNodes: TreeNode[]
  getNodeByKey: (key: string) => TreeNode | undefined
}
