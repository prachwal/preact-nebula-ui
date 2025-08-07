import { useState } from 'preact/hooks'
import { Card } from '../../../../nebula/components/Card'
import { Upload } from '../../../../nebula/components/Upload'

export function ProgressSection() {
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})
  const [uploadingFiles, setUploadingFiles] = useState<string[]>([])

  const simulateUpload = (files: File[]) => {
    setUploadingFiles(prev => [...prev, ...files.map(f => f.name)])
    
    files.forEach(file => {
      let progress = 0
      const interval = setInterval(() => {
        progress += Math.random() * 20
        if (progress >= 100) {
          progress = 100
          clearInterval(interval)
          setTimeout(() => {
            setUploadingFiles(prev => prev.filter(name => name !== file.name))
            setUploadProgress(prev => {
              const { [file.name]: _, ...rest } = prev
              return rest
            })
          }, 1000)
        }
        setUploadProgress(prev => ({ ...prev, [file.name]: Math.min(progress, 100) }))
      }, 200)
    })
  }

  const handleFilesSelect = (files: File[]) => {
    console.log('Starting upload simulation for:', files.map(f => f.name))
    simulateUpload(files)
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Upload Progress</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Upload component provides real-time progress tracking with visual indicators and status updates.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-md font-medium mb-3">Basic Upload Progress</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            Upload with progress tracking through event handlers.
          </p>
          <Card>
            <Upload 
              multiple
              onFilesSelect={handleFilesSelect}
              onUploadProgress={(file, progress) => {
                setUploadProgress(prev => ({ ...prev, [file.name]: progress }))
              }}
              dropZoneText="Upload files to see progress indicators"
            />
          </Card>
        </div>

        <div>
          <h4 className="text-md font-medium mb-3">Auto Upload</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            Automatically upload files when selected with progress tracking.
          </p>
          <Card>
            <Upload 
              multiple
              autoUpload
              onFilesSelect={handleFilesSelect}
              onUploadProgress={(file, progress) => {
                setUploadProgress(prev => ({ ...prev, [file.name]: progress }))
              }}
              dropZoneText="Files upload automatically with progress"
            />
          </Card>
        </div>

        <div>
          <h4 className="text-md font-medium mb-3">Upload Events</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            Complete upload lifecycle with start, progress, complete, and error events.
          </p>
          <Card>
            <Upload 
              multiple
              onFilesSelect={handleFilesSelect}
              onUploadStart={(file) => console.log('Upload started:', file.name)}
              onUploadProgress={(file, progress) => {
                setUploadProgress(prev => ({ ...prev, [file.name]: progress }))
              }}
              onUploadComplete={(file) => console.log('Upload complete:', file.name)}
              onUploadError={(file, error) => console.error('Upload error:', file.name, error)}
              dropZoneText="Upload with complete event tracking"
            />
          </Card>
        </div>

        <div>
          <h4 className="text-md font-medium mb-3">Custom Upload URL</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            Upload to a specific endpoint with custom headers.
          </p>
          <Card>
            <Upload 
              multiple
              autoUpload
              uploadUrl="/api/upload"
              uploadHeaders={{ 'Authorization': 'Bearer token' }}
              onFilesSelect={handleFilesSelect}
              onUploadProgress={(file, progress) => {
                setUploadProgress(prev => ({ ...prev, [file.name]: progress }))
              }}
              dropZoneText="Upload to custom endpoint"
            />
          </Card>
        </div>
      </div>

      {uploadingFiles.length > 0 && (
        <div>
          <h4 className="text-md font-medium mb-3">Current Uploads</h4>
          <Card className="p-4">
            <div className="space-y-3">
              {uploadingFiles.map(fileName => (
                <div key={fileName} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {fileName}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {Math.round(uploadProgress[fileName] || 0)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        uploadProgress[fileName] >= 100 
                          ? 'bg-green-600 dark:bg-green-400 w-full' 
                          : uploadProgress[fileName] >= 75 
                          ? 'bg-blue-600 dark:bg-blue-400 w-3/4'
                          : uploadProgress[fileName] >= 50 
                          ? 'bg-blue-600 dark:bg-blue-400 w-1/2'
                          : uploadProgress[fileName] >= 25 
                          ? 'bg-blue-600 dark:bg-blue-400 w-1/4'
                          : 'bg-blue-600 dark:bg-blue-400 w-1/12'
                      }`}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>
                      {uploadProgress[fileName] >= 100 ? 'Complete' : 'Uploading...'}
                    </span>
                    <span>
                      {uploadProgress[fileName] >= 100 ? '✓' : '⏳'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      <div>
        <h4 className="text-md font-medium mb-3">Progress Features</h4>
        <Card className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium text-blue-600 dark:text-blue-400 mb-2">Upload Events</h5>
              <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                <li>• onUploadStart - Upload begins</li>
                <li>• onUploadProgress - Progress updates</li>
                <li>• onUploadComplete - Upload finished</li>
                <li>• onUploadError - Error handling</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-green-600 dark:text-green-400 mb-2">Upload Options</h5>
              <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                <li>• autoUpload - Automatic upload</li>
                <li>• uploadUrl - Custom endpoint</li>
                <li>• uploadHeaders - Custom headers</li>
                <li>• Progress tracking integration</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      <div>
        <h4 className="text-md font-medium mb-3">Progress Implementation</h4>
        <Card className="p-4">
          <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
            <p>
              <strong>onUploadProgress:</strong> Callback receives file and progress percentage (0-100)
            </p>
            <p>
              <strong>Real-time Updates:</strong> Progress events fire during upload for responsive UI
            </p>
            <p>
              <strong>File Tracking:</strong> Individual progress tracking per file in multi-file uploads
            </p>
            <p>
              <strong>Custom Implementation:</strong> Build your own progress UI using the progress events
            </p>
          </div>
        </Card>
      </div>

      <div>
        <h4 className="text-md font-medium mb-3">Code Example</h4>
        <Card className="bg-gray-50 dark:bg-gray-800">
          <pre className="text-sm overflow-x-auto">
            <code>{`import { Upload } from '@nebula/components'

function ProgressUpload() {
  const [uploadProgress, setUploadProgress] = useState({})

  const handleUploadProgress = (file: File, progress: number) => {
    setUploadProgress(prev => ({
      ...prev,
      [file.name]: progress
    }))
  }

  const handleFilesSelect = (files: File[]) => {
    console.log('Files selected:', files.map(f => f.name))
  }

  const handleUploadComplete = (file: File, response: any) => {
    console.log('Upload complete:', file.name, response)
    // Remove from progress tracking
    setUploadProgress(prev => {
      const { [file.name]: _, ...rest } = prev
      return rest
    })
  }

  return (
    <Upload 
      multiple
      autoUpload
      uploadUrl="/api/upload"
      uploadHeaders={{ 'Authorization': 'Bearer token' }}
      onFilesSelect={handleFilesSelect}
      onUploadStart={(file) => console.log('Upload started:', file.name)}
      onUploadProgress={handleUploadProgress}
      onUploadComplete={handleUploadComplete}
      onUploadError={(file, error) => console.error('Upload error:', error)}
      dropZoneText="Upload files to track progress"
    />
  )
}

// Manual upload with progress tracking
function ManualUploadWithProgress() {
  const [files, setFiles] = useState<File[]>([])
  const [progress, setProgress] = useState<Record<string, number>>({})

  const uploadFile = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      
      // Simulate progress updates
      let currentProgress = 0
      const interval = setInterval(() => {
        currentProgress += 10
        setProgress(prev => ({ ...prev, [file.name]: currentProgress }))
        
        if (currentProgress >= 100) {
          clearInterval(interval)
        }
      }, 100)

      return await response.json()
    } catch (error) {
      console.error('Upload failed:', error)
    }
  }

  return (
    <Upload 
      multiple
      onFilesSelect={(selectedFiles) => {
        setFiles(selectedFiles)
        selectedFiles.forEach(uploadFile)
      }}
    />
  )
}`}</code>
          </pre>
        </Card>
      </div>
    </div>
  )
}
