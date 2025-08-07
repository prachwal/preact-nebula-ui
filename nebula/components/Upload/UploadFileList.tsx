import { forwardRef } from 'preact/compat'
import { cn } from '../../utils/cn'
import type { UploadFileProps, UploadFileData } from './Upload.types'

const UploadFileItem = forwardRef<HTMLDivElement, UploadFileProps>(({
  file,
  progress = 0,
  status,
  error,
  onRemove,
  showProgress = true,
  className,
  ...props
}, ref) => {
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getProgressClass = (progress: number) => {
    const rounded = Math.round(progress / 5) * 5 // Round to nearest 5
    return `w-progress-${Math.min(rounded, 100)}`
  }

  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return 'text-green-600 dark:text-green-400'
      case 'error':
        return 'text-red-600 dark:text-red-400'
      case 'uploading':
        return 'text-blue-600 dark:text-blue-400'
      default:
        return 'text-gray-600 dark:text-gray-300'
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case 'completed':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )
      case 'error':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )
      case 'uploading':
        return (
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )
      default:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        )
    }
  }

  return (
    <div
      ref={ref}
      className={cn(
        'flex items-center p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-200',
        status === 'error' && 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/10',
        status === 'completed' && 'border-green-300 dark:border-green-600 bg-green-50 dark:bg-green-900/10',
        className
      )}
      {...props}
    >
      {/* File icon and status */}
      <div className={cn('flex-shrink-0 mr-3', getStatusColor())}>
        {getStatusIcon()}
      </div>

      {/* File info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
            {file.name}
          </p>
          {onRemove && (
            <button
              onClick={onRemove}
              className="ml-2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              aria-label={`Remove ${file.name}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        
        <div className="flex items-center justify-between mt-1">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {formatFileSize(file.size)}
          </p>
          
          {status === 'uploading' && showProgress && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {progress}%
            </span>
          )}
        </div>

        {/* Progress bar */}
        {status === 'uploading' && showProgress && (
          <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
            <div
              className={cn(
                'bg-blue-600 h-1.5 rounded-full transition-all duration-300',
                getProgressClass(progress)
              )}
            />
          </div>
        )}

        {/* Error message */}
        {status === 'error' && error && (
          <p className="text-xs text-red-600 dark:text-red-400 mt-1">
            {error}
          </p>
        )}
      </div>
    </div>
  )
})

UploadFileItem.displayName = 'UploadFileItem'

interface UploadFileListProps {
  files: UploadFileData[]
  onRemove?: (fileId: string) => void
  onRetry?: (fileId: string) => void
  onUpload?: (fileId: string) => void
  showUploadButton?: boolean
  className?: string
}

const UploadFileList = forwardRef<HTMLDivElement, UploadFileListProps>(({
  files,
  onRemove,
  onRetry,
  onUpload,
  showUploadButton = false,
  className,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn('space-y-2', className)}
      {...props}
    >
      {files.map((fileData) => (
        <div key={fileData.id} className="flex items-center space-x-2">
          <div className="flex-1">
            <UploadFileItem
              file={fileData.file}
              progress={fileData.progress}
              status={fileData.status}
              error={fileData.error}
              onRemove={() => onRemove?.(fileData.id)}
            />
          </div>
          
          {/* Action buttons */}
          <div className="flex-shrink-0 flex space-x-1">
            {fileData.status === 'error' && onRetry && (
              <button
                onClick={() => onRetry(fileData.id)}
                className="p-1.5 text-xs bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors"
                aria-label={`Retry upload ${fileData.file.name}`}
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            )}
            
            {fileData.status === 'pending' && showUploadButton && onUpload && (
              <button
                onClick={() => onUpload(fileData.id)}
                className="p-1.5 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                aria-label={`Upload ${fileData.file.name}`}
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
})

UploadFileList.displayName = 'UploadFileList'

export { UploadFileItem, UploadFileList }
