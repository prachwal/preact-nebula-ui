import type { ComponentChild, ComponentProps } from 'preact'

export interface UploadProps extends Omit<ComponentProps<'div'>, 'onDrop'> {
  // Size variants (required pattern)
  size?: 'sm' | 'md' | 'lg'
  
  // Core upload props
  children?: ComponentChild
  className?: string
  
  // Upload-specific props
  accept?: string
  multiple?: boolean
  maxFiles?: number
  maxFileSize?: number // in bytes (alias for maxSize)
  maxSize?: number // in bytes  
  disabled?: boolean
  
  // Drag and drop
  dragActive?: boolean
  showDropZone?: boolean
  dropZoneText?: string
  
  // Upload behavior
  autoUpload?: boolean
  uploadUrl?: string
  uploadHeaders?: Record<string, string>
  
  // Validation
  validateFile?: (file: File) => boolean | string
  validate?: (file: File) => boolean | string // alias for validateFile
  
  // Event handlers
  onFilesSelect?: (files: File[]) => void
  onDrop?: (files: File[]) => void
  onUploadStart?: (file: File) => void
  onUploadProgress?: (file: File, progress: number) => void
  onUploadComplete?: (file: File, response?: any) => void
  onUploadError?: (file: File, error: Error) => void
  onFileRemove?: (file: File) => void
  onValidationError?: (error: string) => void
  
  // Accessibility props
  'aria-label'?: string
  'aria-describedby'?: string
}

export interface UploadFileProps {
  file: File
  progress?: number
  status: 'pending' | 'uploading' | 'completed' | 'error'
  error?: string
  onRemove?: () => void
  showProgress?: boolean
  className?: string
}

export interface UseUploadOptions {
  maxFiles?: number
  maxSize?: number
  accept?: string
  multiple?: boolean
  autoUpload?: boolean
  uploadUrl?: string
  uploadHeaders?: Record<string, string>
  validateFile?: (file: File) => boolean | string
  onFilesSelect?: (files: File[]) => void
  onUploadStart?: (file: File) => void
  onUploadProgress?: (file: File, progress: number) => void
  onUploadComplete?: (file: File, response?: any) => void
  onUploadError?: (file: File, error: Error) => void
  onValidationError?: (error: string) => void
}

export interface UploadState {
  files: UploadFileData[]
  isDragging: boolean
  isUploading: boolean
  totalProgress: number
}

export interface UploadActions {
  addFiles: (files: File[]) => void
  removeFile: (fileId: string) => void
  uploadFile: (fileId: string) => Promise<void>
  uploadAll: () => Promise<void>
  clearAll: () => void
  retryUpload: (fileId: string) => Promise<void>
}

export interface UploadFileData {
  id: string
  file: File
  progress: number
  status: 'pending' | 'uploading' | 'completed' | 'error'
  error?: string
  response?: any
}
