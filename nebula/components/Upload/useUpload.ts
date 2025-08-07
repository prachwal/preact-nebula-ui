import { useState, useCallback, useRef } from 'preact/hooks'
import type { UseUploadOptions, UploadState, UploadActions, UploadFileData } from './Upload.types'

export function useUpload(options: UseUploadOptions = {}): UploadState & UploadActions & { setIsDragging: (dragging: boolean) => void } {
  const {
    maxFiles = 10,
    maxSize = 10 * 1024 * 1024, // 10MB
    accept = '*',
    autoUpload = false,
    uploadUrl,
    uploadHeaders = {},
    validateFile,
    onFilesSelect,
    onUploadStart,
    onUploadProgress,
    onUploadComplete,
    onUploadError,
    onValidationError
  } = options

  const [files, setFiles] = useState<UploadFileData[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const abortControllers = useRef<Map<string, AbortController>>(new Map())

  // Generate unique file ID
  const generateFileId = useCallback(() => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }, [])

  // Validate file type
  const validateFileType = useCallback((file: File): boolean => {
    if (accept === '*') return true
    
    const acceptedTypes = accept.split(',').map(type => type.trim())
    return acceptedTypes.some(type => {
      if (type.startsWith('.')) {
        return file.name.toLowerCase().endsWith(type.toLowerCase())
      }
      if (type.includes('/*')) {
        const [mainType] = type.split('/')
        return file.type.startsWith(mainType + '/')
      }
      return file.type === type
    })
  }, [accept])

  // Validate single file
  const validateSingleFile = useCallback((file: File): boolean | string => {
    // File size validation
    if (file.size > maxSize) {
      return `File size exceeds ${(maxSize / (1024 * 1024)).toFixed(1)}MB`
    }

    // File type validation
    if (!validateFileType(file)) {
      return `File type not accepted. Accepted types: ${accept}`
    }

    // Custom validation
    if (validateFile) {
      const customValidation = validateFile(file)
      if (customValidation !== true) {
        return customValidation
      }
    }

    return true
  }, [maxSize, validateFileType, accept, validateFile])

  // Upload single file
  const uploadFile = useCallback(async (fileId: string): Promise<void> => {
    if (!uploadUrl) {
      console.warn('Upload URL not provided')
      return
    }

    // Get current file from state and update status atomically
    let currentFileData: UploadFileData | undefined
    setFiles(prevFiles => {
      const fileIndex = prevFiles.findIndex(f => f.id === fileId)
      if (fileIndex === -1 || prevFiles[fileIndex].status !== 'pending') {
        return prevFiles
      }
      
      currentFileData = prevFiles[fileIndex]
      return prevFiles.map(f => 
        f.id === fileId 
          ? { ...f, status: 'uploading' as const }
          : f
      )
    })

    if (!currentFileData) {
      return
    }

    // Create abort controller
    const controller = new AbortController()
    abortControllers.current.set(fileId, controller)

    setIsUploading(true)
    onUploadStart?.(currentFileData.file)

    // Store the file for use in callbacks
    const fileToUpload = currentFileData.file

    try {
      const formData = new FormData()
      formData.append('file', fileToUpload)

      // Create XMLHttpRequest for progress tracking
      const xhr = new XMLHttpRequest()
      
      // Progress handler
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100)
          setFiles(prev => prev.map(f => 
            f.id === fileId 
              ? { ...f, progress }
              : f
          ))
          onUploadProgress?.(fileToUpload, progress)
        }
      })

      // Completion handler
      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          let response
          try {
            response = JSON.parse(xhr.responseText)
          } catch {
            response = xhr.responseText
          }

          setFiles(prev => prev.map(f => 
            f.id === fileId 
              ? { ...f, status: 'completed' as const, progress: 100, response }
              : f
          ))
          onUploadComplete?.(fileToUpload, response)
        } else {
          throw new Error(`Upload failed with status ${xhr.status}`)
        }
      })

      // Error handler
      xhr.addEventListener('error', () => {
        throw new Error('Upload failed due to network error')
      })

      // Abort handler
      xhr.addEventListener('abort', () => {
        setFiles(prev => prev.map(f => 
          f.id === fileId 
            ? { ...f, status: 'pending' as const, progress: 0 }
            : f
        ))
      })

      // Set up request
      xhr.open('POST', uploadUrl)
      
      // Add headers
      Object.entries(uploadHeaders).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value)
      })

      // Handle abort signal
      controller.signal.addEventListener('abort', () => {
        xhr.abort()
      })

      // Send request
      xhr.send(formData)

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed'
      
      setFiles(prev => prev.map(f => 
        f.id === fileId 
          ? { ...f, status: 'error' as const, error: errorMessage }
          : f
      ))
      
      onUploadError?.(fileToUpload, error instanceof Error ? error : new Error(errorMessage))
    } finally {
      abortControllers.current.delete(fileId)
      
      // Check if all uploads are complete by examining current state
      setFiles(currentFiles => {
        const hasUploading = currentFiles.some(f => f.status === 'uploading' && f.id !== fileId)
        if (!hasUploading) {
          setIsUploading(false)
        }
        return currentFiles
      })
    }
  }, [uploadUrl, uploadHeaders, onUploadStart, onUploadProgress, onUploadComplete, onUploadError])

  // Add files
  const addFiles = useCallback((newFiles: File[]) => {
    setFiles(prevFiles => {
      const validFiles: UploadFileData[] = []
      
      for (const file of newFiles) {
        // Check file limit
        if (prevFiles.length + validFiles.length >= maxFiles) {
          break
        }
        
        // Validate file
        const validation = validateSingleFile(file)
        if (validation === true) {
          const fileData: UploadFileData = {
            id: generateFileId(),
            file,
            progress: 0,
            status: 'pending'
          }
          validFiles.push(fileData)
        } else {
          // Handle validation error
          const errorMessage = typeof validation === 'string' ? validation : 'Invalid file'
          if (onValidationError) {
            onValidationError(errorMessage)
          }
          // Create error file entry
          const fileData: UploadFileData = {
            id: generateFileId(),
            file,
            progress: 0,
            status: 'error',
            error: errorMessage
          }
          validFiles.push(fileData)
        }
      }
      
      // Call onFilesSelect for valid files
      const validFilesList = validFiles.filter(f => f.status === 'pending').map(f => f.file)
      if (onFilesSelect && validFilesList.length > 0) {
        onFilesSelect(validFilesList)
      }
      
      // Auto upload valid files
      if (autoUpload && uploadUrl && validFiles.some(f => f.status === 'pending')) {
        setTimeout(() => {
          validFiles.filter(f => f.status === 'pending').forEach(f => {
            uploadFile(f.id)
          })
        }, 0)
      }
      
      return [...prevFiles, ...validFiles]
    })
  }, [maxFiles, validateSingleFile, generateFileId, onFilesSelect, onValidationError, autoUpload, uploadUrl, uploadFile])

  // Calculate total progress
  const totalProgress = files.length > 0 
    ? files.reduce((sum, file) => sum + file.progress, 0) / files.length 
    : 0

  // Remove file
  const removeFile = useCallback((fileId: string) => {
    // Cancel upload if in progress
    const controller = abortControllers.current.get(fileId)
    if (controller) {
      controller.abort()
      abortControllers.current.delete(fileId)
    }

    setFiles(prev => prev.filter(f => f.id !== fileId))
  }, [])

  // Upload all pending files
  const uploadAll = useCallback(async (): Promise<void> => {
    const pendingFiles = files.filter(f => f.status === 'pending')
    await Promise.all(pendingFiles.map(f => uploadFile(f.id)))
  }, [files, uploadFile])

  // Clear all files
  const clearAll = useCallback(() => {
    // Cancel all uploads
    abortControllers.current.forEach(controller => controller.abort())
    abortControllers.current.clear()
    
    setFiles([])
    setIsUploading(false)
  }, [])

  // Retry upload
  const retryUpload = useCallback(async (fileId: string): Promise<void> => {
    setFiles(prev => prev.map(f => 
      f.id === fileId 
        ? { ...f, status: 'pending' as const, progress: 0, error: undefined }
        : f
    ))
    
    await uploadFile(fileId)
  }, [uploadFile])

  return {
    files,
    isDragging,
    isUploading,
    totalProgress,
    addFiles,
    removeFile,
    uploadFile,
    uploadAll,
    clearAll,
    retryUpload,
    setIsDragging
  }
}
