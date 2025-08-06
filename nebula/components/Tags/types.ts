import type { ComponentChild, JSX } from 'preact'

export interface TagItem {
  key: string
  label: string
  value?: string
  color?: TagColor
  disabled?: boolean
  closable?: boolean
  icon?: ComponentChild
}

export type TagColor = 
  | 'default' 
  | 'primary' 
  | 'success' 
  | 'warning' 
  | 'error'
  | 'info'

export type TagSize = 'sm' | 'md' | 'lg'

export type TagVariant = 'filled' | 'outlined' | 'subtle'

export interface TagProps {
  // Content
  children?: ComponentChild
  icon?: ComponentChild
  
  // Appearance
  color?: TagColor
  size?: TagSize
  variant?: TagVariant
  
  // State
  disabled?: boolean
  closable?: boolean
  
  // Events
  onClose?: () => void
  onClick?: () => void
  
  // Styling
  className?: string
  style?: JSX.CSSProperties
}

export interface TagsProps {
  // Data
  tags?: TagItem[]
  value?: string[]
  defaultValue?: string[]
  
  // Behavior
  addable?: boolean
  editable?: boolean
  removable?: boolean
  sortable?: boolean
  
  // Input
  placeholder?: string
  maxTags?: number
  maxLength?: number
  allowDuplicates?: boolean
  
  // Validation
  validator?: (tag: string) => boolean | string
  transformer?: (tag: string) => string
  
  // Appearance
  size?: TagSize
  variant?: TagVariant
  
  // Events
  onChange?: (tags: string[], tagItems: TagItem[]) => void
  onAdd?: (tag: string, tagItem: TagItem) => void
  onRemove?: (tag: string, tagItem: TagItem) => void
  onEdit?: (oldTag: string, newTag: string) => void
  onSort?: (tags: string[], tagItems: TagItem[]) => void
  
  // Styling
  className?: string
  style?: JSX.CSSProperties
  
  // Accessibility
  'aria-label'?: string
  'aria-labelledby'?: string
  'aria-describedby'?: string
}

export interface TagsRef {
  addTag: (tag: string) => void
  removeTag: (tag: string) => void
  editTag: (oldTag: string, newTag: string) => void
  clearTags: () => void
  getTags: () => string[]
  getTagItems: () => TagItem[]
  focus: () => void
  blur: () => void
}

export interface UseTagsOptions {
  tags?: TagItem[]
  value?: string[]
  defaultValue?: string[]
  addable?: boolean
  editable?: boolean
  removable?: boolean
  maxTags?: number
  allowDuplicates?: boolean
  validator?: (tag: string) => boolean | string
  transformer?: (tag: string) => string
  onChange?: (tags: string[], tagItems: TagItem[]) => void
  onAdd?: (tag: string, tagItem: TagItem) => void
  onRemove?: (tag: string, tagItem: TagItem) => void
  onEdit?: (oldTag: string, newTag: string) => void
}

export interface UseTagsReturn {
  tags: TagItem[]
  tagValues: string[]
  addTag: (tag: string) => void
  removeTag: (tag: string) => void
  editTag: (oldTag: string, newTag: string) => void
  clearTags: () => void
  canAddTag: (tag: string) => boolean
  validateTag: (tag: string) => boolean | string
  isAtMaxTags: boolean
  hasDuplicateTag: (tag: string) => boolean
}
