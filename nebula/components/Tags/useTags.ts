import { useState, useCallback, useMemo } from 'preact/hooks'
import type { UseTagsOptions, UseTagsReturn, TagItem } from './types'

export function useTags(options: UseTagsOptions = {}): UseTagsReturn {
  const {
    tags: initialTags = [],
    value,
    defaultValue = [],
    addable = true,
    editable = true,
    removable = true,
    maxTags,
    allowDuplicates = false,
    validator,
    transformer,
    onChange,
    onAdd,
    onRemove,
    onEdit
  } = options

  // Convert initial tags to TagItem format
  const convertToTagItems = useCallback((tags: TagItem[] | string[]): TagItem[] => {
    return tags.map((tag, index) => {
      if (typeof tag === 'string') {
        return {
          key: `tag-${index}`,
          label: tag,
          value: tag
        }
      }
      return tag
    })
  }, [])

  // Initialize state
  const [internalTags, setInternalTags] = useState<TagItem[]>(() => {
    if (value) {
      return convertToTagItems(value.map(v => ({ key: v, label: v, value: v })))
    }
    if (initialTags.length > 0) {
      return convertToTagItems(initialTags)
    }
    return convertToTagItems(defaultValue.map(v => ({ key: v, label: v, value: v })))
  })

  // Controlled vs uncontrolled
  const isControlled = value !== undefined
  const currentTags = isControlled 
    ? convertToTagItems(value.map(v => ({ key: v, label: v, value: v })))
    : internalTags

  const tagValues = useMemo(() => {
    return currentTags.map(tag => tag.value || tag.label)
  }, [currentTags])

  // Validation helpers
  const validateTag = useCallback((tag: string): boolean | string => {
    if (!tag.trim()) {
      return 'Tag cannot be empty'
    }
    
    if (validator) {
      return validator(tag)
    }
    
    return true
  }, [validator])

  const hasDuplicateTag = useCallback((tag: string): boolean => {
    if (allowDuplicates) return false
    return tagValues.includes(tag)
  }, [tagValues, allowDuplicates])

  const canAddTag = useCallback((tag: string): boolean => {
    const validation = validateTag(tag)
    if (validation !== true) return false
    
    if (hasDuplicateTag(tag)) return false
    
    if (maxTags && currentTags.length >= maxTags) return false
    
    return addable
  }, [validateTag, hasDuplicateTag, maxTags, currentTags.length, addable])

  const isAtMaxTags = useMemo(() => {
    return maxTags ? currentTags.length >= maxTags : false
  }, [maxTags, currentTags.length])

  // Tag operations
  const addTag = useCallback((tag: string) => {
    if (!canAddTag(tag)) return

    const processedTag = transformer ? transformer(tag) : tag
    const newTagItem: TagItem = {
      key: `tag-${Date.now()}`,
      label: processedTag,
      value: processedTag
    }

    const newTags = [...currentTags, newTagItem]
    const newValues = newTags.map(t => t.value || t.label)

    if (!isControlled) {
      setInternalTags(newTags)
    }

    onAdd?.(processedTag, newTagItem)
    onChange?.(newValues, newTags)
  }, [canAddTag, transformer, currentTags, isControlled, onAdd, onChange])

  const removeTag = useCallback((tagToRemove: string) => {
    if (!removable) return

    const tagIndex = currentTags.findIndex(tag => 
      (tag.value || tag.label) === tagToRemove
    )
    
    if (tagIndex === -1) return

    const tagItem = currentTags[tagIndex]
    const newTags = currentTags.filter((_, index) => index !== tagIndex)
    const newValues = newTags.map(t => t.value || t.label)

    if (!isControlled) {
      setInternalTags(newTags)
    }

    onRemove?.(tagToRemove, tagItem)
    onChange?.(newValues, newTags)
  }, [currentTags, removable, isControlled, onRemove, onChange])

  const editTag = useCallback((oldTag: string, newTag: string) => {
    if (!editable) return

    const validation = validateTag(newTag)
    if (validation !== true) return

    if (oldTag !== newTag && hasDuplicateTag(newTag)) return

    const tagIndex = currentTags.findIndex(tag => 
      (tag.value || tag.label) === oldTag
    )
    
    if (tagIndex === -1) return

    const processedTag = transformer ? transformer(newTag) : newTag
    const newTags = [...currentTags]
    newTags[tagIndex] = {
      ...newTags[tagIndex],
      label: processedTag,
      value: processedTag
    }
    
    const newValues = newTags.map(t => t.value || t.label)

    if (!isControlled) {
      setInternalTags(newTags)
    }

    onEdit?.(oldTag, processedTag)
    onChange?.(newValues, newTags)
  }, [editable, validateTag, hasDuplicateTag, currentTags, transformer, isControlled, onEdit, onChange])

  const clearTags = useCallback(() => {
    if (!isControlled) {
      setInternalTags([])
    }
    onChange?.([], [])
  }, [isControlled, onChange])

  return {
    tags: currentTags,
    tagValues,
    addTag,
    removeTag,
    editTag,
    clearTags,
    canAddTag,
    validateTag,
    isAtMaxTags,
    hasDuplicateTag
  }
}
