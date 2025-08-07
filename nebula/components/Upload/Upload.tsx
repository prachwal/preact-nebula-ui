import { forwardRef } from 'preact/compat'
import { useRef, useCallback } from 'preact/hooks'
import type { JSX } from 'preact'
import { cn } from '../../utils/cn'
import { useUpload } from './useUpload'
import { UploadFileList } from './UploadFileList'
import type { UploadProps } from './Upload.types'
import './Upload.css'

const Upload = forwardRef<HTMLDivElement, UploadProps>(({
  size = 'md',
  accept = '*',
  multiple = true,
  maxFiles = 10,
  maxSize = 10 * 1024 * 1024, // 10MB
  maxFileSize, // alias for maxSize
  disabled = false,
  showDropZone = true,
  dropZoneText = 'Drop files here or click to browse',
  autoUpload = false,
  uploadUrl,
  uploadHeaders,
  validateFile,
  validate, // alias for validateFile
  onFilesSelect,
  onDrop,
  onUploadStart,
  onUploadProgress,
  onUploadComplete,
  onUploadError,
  onFileRemove,
  onValidationError,
  className,
  children,
  ...props
}, ref) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Calculate the actual max size to use consistently
  const actualMaxSize = maxFileSize || maxSize
  
  const {
    files,
    isDragging,
    isUploading,
    totalProgress,
    addFiles,
    removeFile,
    uploadFile,
    uploadAll,
    clearAll,
    retryUpload
  } = useUpload({
    maxFiles,
    maxSize: actualMaxSize,
    accept,
    multiple,
    autoUpload,
    uploadUrl,
    uploadHeaders,
    validateFile: validate || validateFile,
    onFilesSelect,
    onUploadStart,
    onUploadProgress,
    onUploadComplete,
    onUploadError,
    onValidationError
  })

  const getProgressClass = (progress: number) => {
    const rounded = Math.round(progress / 5) * 5 // Round to nearest 5
    return `w-progress-${Math.min(rounded, 100)}`
  }

  const sizeClasses = {
    sm: 'min-h-24 text-sm',
    md: 'min-h-32 text-base',
    lg: 'min-h-40 text-lg'
  }

  const handleFileInputChange = useCallback((event: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    const target = event.target as HTMLInputElement
    const selectedFiles = Array.from(target.files || [])
    if (selectedFiles.length > 0) {
      addFiles(selectedFiles)
      // Do not call onFilesSelect here, addFiles already calls it
    }
    // Reset input value to allow selecting same files again
    target.value = ''
  }, [addFiles])

  const handleClick = useCallback(() => {
    if (!disabled) {
      fileInputRef.current?.click()
    }
  }, [disabled])

  const handleDragOver = useCallback((event: DragEvent) => {
    event.preventDefault()
    event.stopPropagation()
  }, [])

  const handleDragEnter = useCallback((event: DragEvent) => {
    event.preventDefault()
    event.stopPropagation()
  }, [])

  const handleDragLeave = useCallback((event: DragEvent) => {
    event.preventDefault()
    event.stopPropagation()
  }, [])

  const handleDrop = useCallback((event: DragEvent) => {
    event.preventDefault()
    event.stopPropagation()
    
    if (disabled) return

    const droppedFiles = Array.from(event.dataTransfer?.files || [])
    if (droppedFiles.length > 0) {
      addFiles(droppedFiles)
      onDrop?.(droppedFiles)
    }
  }, [disabled, addFiles, onDrop])

  const handleFileRemove = useCallback((fileId: string) => {
    const fileToRemove = files.find(f => f.id === fileId)
    if (fileToRemove) {
      removeFile(fileId)
      onFileRemove?.(fileToRemove.file)
    }
  }, [files, removeFile, onFileRemove])

  return (
    <div
      ref={ref}
      className={cn('space-y-4', className)}
      {...Object.fromEntries(Object.entries(props).filter(([key]) => key !== 'aria-label'))}
    >
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={handleFileInputChange}
        className="hidden"
        aria-hidden="true"
      />

      {/* Drop zone */}
      {showDropZone && (
        <div
          className={cn(
            'border-2 border-dashed rounded-lg transition-all duration-200 cursor-pointer',
            'flex flex-col items-center justify-center',
            'bg-gray-50 dark:bg-gray-800/50',
            'hover:bg-gray-100 dark:hover:bg-gray-700/50',
            'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
            sizeClasses[size],
            isDragging 
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-300 dark:border-gray-600',
            disabled && 'opacity-50 cursor-not-allowed pointer-events-none'
          )}
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-label={props['aria-label'] || 'Upload files'}
          aria-disabled={disabled}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              handleClick()
            }
          }}
        >
          {children || (
            <>
              <svg
                className="w-8 h-8 mb-2 text-gray-400 dark:text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                {dropZoneText}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {accept !== '*' && `Accepted types: ${accept}`}
                {actualMaxSize && ` • Max size: ${(actualMaxSize / (1024 * 1024)).toFixed(1)}MB`}
                {maxFiles > 1 && ` • Max files: ${maxFiles}`}
              </p>
            </>
          )}
          {/* Show error messages for files */}
          {files.some(f => f.status === 'error') && (
            <div className="mt-2 w-full">
              {files.filter(f => f.status === 'error').map(f => (
                <p key={f.id} className="text-xs text-red-600 dark:text-red-400 mt-1">
                  {f.error}
                </p>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Upload controls */}
      {files.length > 0 && !autoUpload && (
        <div className="flex items-center gap-2">
          <button
            onClick={uploadAll}
            disabled={disabled || isUploading || !uploadUrl}
            className={cn(
              'px-4 py-2 rounded-md text-sm font-medium transition-colors',
              'bg-blue-600 text-white hover:bg-blue-700',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
          >
            {isUploading ? 'Uploading...' : 'Upload All'}
          </button>
          
          <button
            onClick={clearAll}
            disabled={disabled || isUploading}
            className={cn(
              'px-4 py-2 rounded-md text-sm font-medium transition-colors',
              'bg-gray-600 text-white hover:bg-gray-700',
              'focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
          >
            Clear All
          </button>

          {isUploading && (
            <div className="flex items-center space-x-2">
              <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={cn(
                    'bg-blue-600 h-2 rounded-full transition-all duration-300',
                    getProgressClass(totalProgress)
                  )}
                />
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {Math.round(totalProgress)}%
              </span>
            </div>
          )}
        </div>
      )}

      {/* File list */}
      {files.length > 0 && (
        <UploadFileList
          files={files}
          onRemove={handleFileRemove}
          onRetry={retryUpload}
          onUpload={uploadFile}
          showUploadButton={!autoUpload && !!uploadUrl}
        />
      )}
    </div>
  )
})

Upload.displayName = 'Upload'

export { Upload }
