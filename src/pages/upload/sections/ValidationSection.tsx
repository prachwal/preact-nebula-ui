import { useState } from 'preact/hooks'
import { Card } from '../../../../nebula/components/Card'
import { Upload } from '../../../../nebula/components/Upload'

export function ValidationSection() {
  const [validationErrors, setValidationErrors] = useState<string[]>([])

  const handleValidationError = (error: string) => {
    setValidationErrors(prev => [...prev, error])
    setTimeout(() => {
      setValidationErrors(prev => prev.slice(1))
    }, 5000)
  }

  const handleFilesSelect = (files: File[]) => {
    console.log('Valid files selected:', files.map(f => f.name))
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">File Validation</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Upload component includes comprehensive file validation with customizable rules and error handling.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-md font-medium mb-3">File Type Validation</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            Only allows specific file types (images in this example).
          </p>
          <Card>
            <Upload 
              accept="image/*"
              onFilesSelect={handleFilesSelect}
              onValidationError={handleValidationError}
              dropZoneText="Upload images only (PNG, JPG, GIF, etc.)"
            />
          </Card>
        </div>

        <div>
          <h4 className="text-md font-medium mb-3">File Size Limit</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            Maximum file size limit of 5MB per file.
          </p>
          <Card>
            <Upload 
              maxFileSize={5 * 1024 * 1024} // 5MB
              onFilesSelect={handleFilesSelect}
              onValidationError={handleValidationError}
              dropZoneText="Max 5MB per file"
            />
          </Card>
        </div>

        <div>
          <h4 className="text-md font-medium mb-3">Maximum File Count</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            Limit the number of files that can be uploaded (max 3 files).
          </p>
          <Card>
            <Upload 
              maxFiles={3}
              multiple
              onFilesSelect={handleFilesSelect}
              onValidationError={handleValidationError}
              dropZoneText="Upload up to 3 files"
            />
          </Card>
        </div>

        <div>
          <h4 className="text-md font-medium mb-3">Combined Validation</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            Multiple validation rules: PDFs only, max 2MB each, up to 2 files.
          </p>
          <Card>
            <Upload 
              accept=".pdf"
              maxFileSize={2 * 1024 * 1024} // 2MB
              maxFiles={2}
              multiple
              onFilesSelect={handleFilesSelect}
              onValidationError={handleValidationError}
              dropZoneText="PDFs only, max 2MB each, up to 2 files"
            />
          </Card>
        </div>

        <div>
          <h4 className="text-md font-medium mb-3">Custom Validation</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            Custom validation function to check file names and content.
          </p>
          <Card>
            <Upload 
              validate={(file: File) => {
                if (file.name.includes('temp')) {
                  return 'Temporary files are not allowed'
                }
                if (file.name.length > 50) {
                  return 'File name is too long (max 50 characters)'
                }
                return true
              }}
              onFilesSelect={handleFilesSelect}
              onValidationError={handleValidationError}
              dropZoneText="No temp files, file names max 50 chars"
            />
          </Card>
        </div>
      </div>

      {validationErrors.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-md font-medium text-red-600 dark:text-red-400">Validation Errors</h4>
          <div className="space-y-2">
            {validationErrors.map((error, index) => (
              <div key={index} className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h4 className="text-md font-medium mb-3">Validation Rules Overview</h4>
        <Card className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium text-blue-600 dark:text-blue-400 mb-2">Built-in Validations</h5>
              <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                <li>• <strong>File Type:</strong> accept prop with MIME types</li>
                <li>• <strong>File Size:</strong> maxFileSize in bytes</li>
                <li>• <strong>File Count:</strong> maxFiles number limit</li>
                <li>• <strong>Required:</strong> required prop validation</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-green-600 dark:text-green-400 mb-2">Custom Validations</h5>
              <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                <li>• <strong>validate Function:</strong> Custom validation logic</li>
                <li>• <strong>File Name:</strong> Name pattern validation</li>
                <li>• <strong>File Content:</strong> Content-based checks</li>
                <li>• <strong>Business Rules:</strong> Application-specific rules</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      <div>
        <h4 className="text-md font-medium mb-3">Error Handling</h4>
        <Card className="p-4">
          <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
            <p>
              <strong>onValidationError:</strong> Callback function receives error messages for custom handling
            </p>
            <p>
              <strong>Visual Feedback:</strong> Component shows error states with red borders and messages
            </p>
            <p>
              <strong>Accessibility:</strong> Error messages are announced to screen readers
            </p>
            <p>
              <strong>User Experience:</strong> Clear error messages help users understand validation failures
            </p>
          </div>
        </Card>
      </div>

      <div>
        <h4 className="text-md font-medium mb-3">Code Example</h4>
        <Card className="bg-gray-50 dark:bg-gray-800">
          <pre className="text-sm overflow-x-auto">
            <code>{`import { Upload } from '@nebula/components'

function ValidatedUpload() {
  const handleValidationError = (error: string) => {
    console.error('Validation error:', error)
    // Show error to user
  }

  const handleFilesSelect = (files: File[]) => {
    console.log('Valid files:', files)
    // Process valid files
  }

  return (
    <Upload 
      accept="image/*,.pdf"
      maxFileSize={5 * 1024 * 1024} // 5MB
      maxFiles={3}
      multiple
      required
      validate={(file) => {
        if (file.name.includes('temp')) {
          return 'Temporary files not allowed'
        }
        return null
      }}
      onFilesSelect={handleFilesSelect}
      onValidationError={handleValidationError}
      dropZoneText="Upload up to 3 images or PDFs (max 5MB each)"
    />
  )
}`}</code>
          </pre>
        </Card>
      </div>
    </div>
  )
}
