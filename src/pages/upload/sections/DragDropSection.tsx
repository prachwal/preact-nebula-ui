import { useState } from 'preact/hooks'
import { Card } from '../../../../nebula/components/Card'
import { Upload } from '../../../../nebula/components/Upload'

export function DragDropSection() {
  const [lastDroppedFiles, setLastDroppedFiles] = useState<string[]>([])

  const handleDrop = (files: File[]) => {
    setLastDroppedFiles(files.map(f => f.name))
    console.log('Dropped files:', files)
  }

  const handleFilesSelect = (files: File[]) => {
    console.log('Selected files:', files.map(f => f.name))
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Drag & Drop Upload</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Upload component supports drag and drop functionality with visual feedback and proper event handling.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-md font-medium mb-3">Standard Drag & Drop</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            Drag files from your computer and drop them onto the upload area.
          </p>
          <Card>
            <Upload 
              onDrop={handleDrop}
              onFilesSelect={handleFilesSelect}
              dropZoneText="Drag & drop files here or click to browse"
            />
          </Card>
          {lastDroppedFiles.length > 0 && (
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Last dropped files: {lastDroppedFiles.join(', ')}
              </p>
            </div>
          )}
        </div>

        <div>
          <h4 className="text-md font-medium mb-3">Large Drop Zone</h4>
          <Card>
            <Upload 
              size="lg"
              onDrop={handleDrop}
              onFilesSelect={handleFilesSelect}
              dropZoneText="Large drop zone for easier targeting"
            />
          </Card>
        </div>

        <div>
          <h4 className="text-md font-medium mb-3">Custom Drop Zone Content</h4>
          <Card>
            <Upload onDrop={handleDrop} onFilesSelect={handleFilesSelect}>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Upload Your Documents
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  Drag and drop your files here
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  or click to browse from your computer
                </p>
              </div>
            </Upload>
          </Card>
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium mb-3">Drag & Drop Features</h4>
        <Card className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium text-green-600 dark:text-green-400 mb-2">Visual Feedback</h5>
              <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                <li>• Border color changes on drag over</li>
                <li>• Background highlight during drag</li>
                <li>• Smooth transitions and animations</li>
                <li>• Clear drop target indication</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-blue-600 dark:text-blue-400 mb-2">Event Handling</h5>
              <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                <li>• Proper drag event prevention</li>
                <li>• File validation on drop</li>
                <li>• Support for multiple files</li>
                <li>• Error handling for invalid files</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      <div>
        <h4 className="text-md font-medium mb-3">Browser Compatibility</h4>
        <Card className="p-4">
          <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
            <p>
              <strong>Modern Browsers:</strong> Full drag and drop support with visual feedback
            </p>
            <p>
              <strong>Older Browsers:</strong> Graceful fallback to click-to-browse functionality
            </p>
            <p>
              <strong>Mobile Devices:</strong> Click/tap to browse files (drag not supported on most mobile browsers)
            </p>
          </div>
        </Card>
      </div>

      <div>
        <h4 className="text-md font-medium mb-3">Code Example</h4>
        <Card className="bg-gray-50 dark:bg-gray-800">
          <pre className="text-sm overflow-x-auto">
            <code>{`import { Upload } from '@nebula/components'

function DragDropUpload() {
  const handleDrop = (files: File[]) => {
    console.log('Dropped files:', files)
    // Handle dropped files
  }

  const handleFilesSelect = (files: File[]) => {
    console.log('Selected files:', files)
    // Handle selected files
  }

  return (
    <Upload 
      onDrop={handleDrop}
      onFilesSelect={handleFilesSelect}
      dropZoneText="Drag & drop files here or click to browse"
    />
  )
}

// Custom drop zone content
<Upload onDrop={handleDrop}>
  <div className="text-center">
    <Icon name="upload" size="large" />
    <h4>Upload Your Files</h4>
    <p>Drag and drop or click to browse</p>
  </div>
</Upload>`}</code>
          </pre>
        </Card>
      </div>
    </div>
  )
}
