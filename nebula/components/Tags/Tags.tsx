import { forwardRef, useImperativeHandle, useRef, useState } from 'preact/compat'
import { cn } from '../../utils/cn'
import { Tag } from './Tag'
import { useTags } from './useTags'
import type { TagsProps, TagsRef } from './types'

export const Tags = forwardRef<TagsRef, TagsProps>((props, ref) => {
  const {
    tags = [],
    value,
    defaultValue = [],
    addable = true,
    editable = false,
    removable = true,
    sortable = false,
    placeholder = 'Add tag...',
    maxTags,
    maxLength,
    allowDuplicates = false,
    validator,
    transformer,
    size = 'md',
    variant = 'filled',
    onChange,
    onAdd,
    onRemove,
    onEdit,
    onSort,
    className,
    ...rest
  } = props

  const [inputValue, setInputValue] = useState('')
  const [editingTag, setEditingTag] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const {
    tags: tagItems,
    tagValues,
    addTag,
    removeTag,
    editTag,
    clearTags,
    canAddTag,
    isAtMaxTags
  } = useTags({
    tags,
    value,
    defaultValue,
    addable,
    editable,
    removable,
    maxTags,
    allowDuplicates,
    validator,
    transformer,
    onChange,
    onAdd,
    onRemove,
    onEdit
  })

  useImperativeHandle(ref, () => ({
    addTag,
    removeTag,
    editTag,
    clearTags,
    getTags: () => tagValues,
    getTagItems: () => tagItems,
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur()
  }), [addTag, removeTag, editTag, clearTags, tagValues, tagItems])

  const handleInputKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault()
      const trimmedValue = inputValue.trim()
      
      if (maxLength && trimmedValue.length > maxLength) {
        return
      }
      
      if (canAddTag(trimmedValue)) {
        addTag(trimmedValue)
        setInputValue('')
      }
    } else if (e.key === 'Backspace' && !inputValue && tagItems.length > 0) {
      // Remove last tag when backspace on empty input
      const lastTag = tagItems[tagItems.length - 1]
      if (lastTag && removable) {
        removeTag(lastTag.value || lastTag.label)
      }
    }
  }

  const handleInputChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    setInputValue(target.value)
  }

  const handleTagRemove = (tagValue: string) => {
    removeTag(tagValue)
  }

  const handleTagEdit = (tagValue: string) => {
    if (editable) {
      setEditingTag(tagValue)
    }
  }

  const handleEditConfirm = (oldTag: string, newTag: string) => {
    if (newTag.trim() && newTag !== oldTag) {
      editTag(oldTag, newTag.trim())
    }
    setEditingTag(null)
  }

  const handleEditCancel = () => {
    setEditingTag(null)
  }

  const tagsClasses = cn(
    'nebula-tags',
    'inline-flex flex-wrap items-center gap-2 p-2',
    'border border-gray-300 rounded-md',
    'focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500',
    'bg-white',
    className
  )

  const inputClasses = cn(
    'nebula-tags-input',
    'border-none outline-none bg-transparent',
    'flex-1 min-w-32',
    {
      'text-sm': size === 'sm',
      'text-base': size === 'md',
      'text-lg': size === 'lg'
    }
  )

  return (
    <div
      className={tagsClasses}
      {...rest}
    >
      {(maxTags && tagItems.length > maxTags 
        ? tagItems.slice(0, maxTags) 
        : tagItems
      ).map((tag) => (
        <TagItem
          key={tag.key}
          tag={tag}
          size={size}
          variant={variant}
          editable={editable}
          removable={removable}
          editing={editingTag === (tag.value || tag.label)}
          onRemove={handleTagRemove}
          onEdit={handleTagEdit}
          onEditConfirm={handleEditConfirm}
          onEditCancel={handleEditCancel}
        />
      ))}
      
      {maxTags && tagItems.length > maxTags && (
        <span className={cn(
          'nebula-tag',
          'inline-flex items-center justify-center border rounded-md font-medium',
          'bg-gray-100 text-gray-600 border-gray-200',
          'text-sm px-3 py-1.5'
        )}>
          +{tagItems.length - maxTags}
        </span>
      )}
      
      {addable && !isAtMaxTags && (
        <input
          ref={inputRef}
          type="text"
          className={inputClasses}
          placeholder={tagItems.length === 0 ? placeholder : ''}
          value={inputValue}
          maxLength={maxLength}
          onKeyDown={handleInputKeyDown}
          onInput={handleInputChange}
        />
      )}
    </div>
  )
})

// Internal component for individual tag rendering
interface TagItemProps {
  tag: { key: string; label: string; value?: string; color?: any; disabled?: boolean }
  size: 'sm' | 'md' | 'lg'
  variant: 'filled' | 'outlined' | 'subtle'
  editable: boolean
  removable: boolean
  editing: boolean
  onRemove: (value: string) => void
  onEdit: (value: string) => void
  onEditConfirm: (oldValue: string, newValue: string) => void
  onEditCancel: () => void
}

function TagItem({
  tag,
  size,
  variant,
  editable,
  removable,
  editing,
  onRemove,
  onEdit,
  onEditConfirm,
  onEditCancel
}: TagItemProps) {
  const [editValue, setEditValue] = useState(tag.label)
  const editInputRef = useRef<HTMLInputElement>(null)

  const tagValue = tag.value || tag.label

  const handleEditKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      onEditConfirm(tagValue, editValue)
    } else if (e.key === 'Escape') {
      e.preventDefault()
      setEditValue(tag.label)
      onEditCancel()
    }
  }

  const handleEditChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    setEditValue(target.value)
  }

  const handleEditBlur = () => {
    onEditConfirm(tagValue, editValue)
  }

  if (editing) {
    return (
      <input
        ref={editInputRef}
        type="text"
        className={cn(
          'nebula-tag-edit',
          'px-2 py-1 border border-blue-500 rounded',
          'text-sm bg-white',
          'focus:outline-none focus:ring-1 focus:ring-blue-500'
        )}
        value={editValue}
        onKeyDown={handleEditKeyDown}
        onInput={handleEditChange}
        onBlur={handleEditBlur}
        autoFocus
      />
    )
  }

  return (
    <Tag
      color={tag.color}
      size={size}
      variant={variant}
      disabled={tag.disabled}
      closable={removable}
      onClick={editable ? () => onEdit(tagValue) : undefined}
      onClose={() => onRemove(tagValue)}
    >
      {tag.label}
    </Tag>
  )
}

Tags.displayName = 'Tags'
