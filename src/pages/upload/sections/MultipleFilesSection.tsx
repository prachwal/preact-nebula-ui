import { useState } from 'preact/hooks'
import { Card } from '../../../../nebula/components/Card'
import { Upload } from '../../../../nebula/components/Upload'

export function MultipleFilesSection() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [fileList, setFileList] = useState<File[]>([])

  const handleFilesSelect = (files: File[]) => {
    setSelectedFiles(files)
    console.log('Multiple files selected:', files.map(f => f.name))
  }

  const handleFileListChange = (files: File[]) => {
    setFileList(files)
  }

  const removeFile = (fileToRemove: File) => {
    setFileList(prev => prev.filter(file => file !== fileToRemove))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Multiple Files Upload</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Upload component supports multiple file selection with file list management and individual file handling.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-md font-medium mb-3">Basic Multiple Upload</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            Enable multiple file selection with the multiple prop.
          </p>
          <Card>
            <Upload 
              multiple
              onFilesSelect={handleFilesSelect}
              dropZoneText="Select or drop multiple files"
            />
          </Card>
          {selectedFiles.length > 0 && (
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-700 dark:text-blue-300 font-medium mb-2">
                Selected Files ({selectedFiles.length}):
              </p>
              <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1">
                {selectedFiles.map((file, index) => (
                  <li key={index}>
                    {file.name} ({formatFileSize(file.size)})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div>
          <h4 className="text-md font-medium mb-3">Limited File Count</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            Limit the number of files that can be selected (max 3 files).
          </p>
          <Card>
            <Upload 
              multiple
              maxFiles={3}
              onFilesSelect={handleFilesSelect}
              dropZoneText="Upload up to 3 files"
            />
          </Card>
        </div>

        <div>
          <h4 className="text-md font-medium mb-3">File List Management</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            Upload with file list display and individual file removal.
          </p>
          <Card>
            <Upload 
              multiple
              maxFiles={5}
              onFilesSelect={handleFileListChange}
              dropZoneText="Upload files and manage the list"
            />
          </Card>
          
          {fileList.length > 0 && (
            <Card className="mt-4">
              <div className="p-4">
                <h5 className="font-medium text-gray-900 dark:text-white mb-3">
                  Uploaded Files ({fileList.length})
                </h5>
                <div className="space-y-2">
                  {fileList.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded flex items-center justify-center">
                          <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {formatFileSize(file.size)} • {file.type || 'Unknown type'}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(file)}
                        className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                        aria-label={`Remove ${file.name}`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>
                    Total: {fileList.reduce((sum, file) => sum + file.size, 0) > 0 
                      ? formatFileSize(fileList.reduce((sum, file) => sum + file.size, 0))
                      : '0 Bytes'
                    }
                  </span>
                  <button
                    onClick={() => setFileList([])}
                    className="text-red-600 dark:text-red-400 hover:underline"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </Card>
          )}
        </div>

        <div>
          <h4 className="text-md font-medium mb-3">Auto Upload Multiple</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            Automatically upload multiple files when selected.
          </p>
          <Card>
            <Upload 
              multiple
              autoUpload
              maxFiles={4}
              uploadUrl="/api/upload"
              onFilesSelect={(files) => console.log('Auto uploading:', files.map(f => f.name))}
              onUploadStart={(file) => console.log('Started uploading:', file.name)}
              onUploadComplete={(file) => console.log('Completed uploading:', file.name)}
              dropZoneText="Files upload automatically when selected"
            />
          </Card>
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium mb-3">Multiple Files Features</h4>
        <Card className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium text-blue-600 dark:text-blue-400 mb-2">File Selection</h5>
              <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                <li>• Multiple file selection from file browser</li>
                <li>• Multiple file drag and drop</li>
                <li>• File count limitations (maxFiles)</li>
                <li>• Individual file validation</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-green-600 dark:text-green-400 mb-2">File Management</h5>
              <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                <li>• File list display and preview</li>
                <li>• Individual file removal</li>
                <li>• Batch operations (clear all)</li>
                <li>• File size and type information</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      <div>
        <h4 className="text-md font-medium mb-3">Best Practices</h4>
        <Card className="p-4">
          <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
            <p>
              <strong>Performance:</strong> Consider file size limits and count restrictions for large uploads
            </p>
            <p>
              <strong>User Experience:</strong> Provide clear feedback on file selection and upload progress
            </p>
            <p>
              <strong>Validation:</strong> Validate each file individually and provide specific error messages
            </p>
            <p>
              <strong>Memory:</strong> Process files in batches for large file collections
            </p>
          </div>
        </Card>
      </div>

      <div>
        <h4 className="text-md font-medium mb-3">Code Example</h4>
        <Card className="bg-gray-50 dark:bg-gray-800">
          <pre className="text-sm overflow-x-auto">
            <code>{`import { Upload } from '@nebula/components'

function MultipleFilesUpload() {
  const [files, setFiles] = useState<File[]>([])

  const handleFilesSelect = (selectedFiles: File[]) => {
    setFiles(prev => [...prev, ...selectedFiles])
    console.log('Files selected:', selectedFiles.map(f => f.name))
  }

  const removeFile = (fileToRemove: File) => {
    setFiles(prev => prev.filter(file => file !== fileToRemove))
  }

  const clearAllFiles = () => {
    setFiles([])
  }

  return (
    <div>
      <Upload 
        multiple
        maxFiles={10}
        maxSize={5 * 1024 * 1024} // 5MB per file
        accept="image/*,.pdf,.doc,.docx"
        onFilesSelect={handleFilesSelect}
        dropZoneText="Upload up to 10 files (images, PDFs, docs)"
      />
      
      {files.length > 0 && (
        <div className="mt-4">
          <h4>Selected Files ({files.length})</h4>
          <ul>
            {files.map((file, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{file.name} ({file.size} bytes)</span>
                <button onClick={() => removeFile(file)}>Remove</button>
              </li>
            ))}
          </ul>
          <button onClick={clearAllFiles}>Clear All</button>
        </div>
      )}
    </div>
  )
}

// Auto upload multiple files
<Upload 
  multiple
  autoUpload
  uploadUrl="/api/upload"
  onUploadComplete={(file, response) => {
    console.log('Upload complete:', file.name, response)
  }}
  onUploadError={(file, error) => {
    console.error('Upload failed:', file.name, error)
  }}
/>`}</code>
          </pre>
        </Card>
      </div>
    </div>
  )
}
