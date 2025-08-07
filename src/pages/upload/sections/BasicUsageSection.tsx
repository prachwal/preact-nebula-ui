import { Card } from '../../../../nebula/components/Card'
import { Upload } from '../../../../nebula/components/Upload'

export function BasicUsageSection() {
  const handleFilesSelect = (files: File[]) => {
    console.log('Selected files:', files.map(f => f.name))
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Basic Upload</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          A simple file upload component with click-to-browse functionality.
        </p>
        
        <Card>
          <Upload onFilesSelect={handleFilesSelect} />
        </Card>
      </div>

      <div>
        <h4 className="text-md font-medium mb-3">With Custom Text</h4>
        <Card>
          <Upload 
            dropZoneText="Click here to select your files"
            onFilesSelect={handleFilesSelect}
          />
        </Card>
      </div>

      <div>
        <h4 className="text-md font-medium mb-3">Single File Upload</h4>
        <Card>
          <Upload 
            multiple={false}
            dropZoneText="Select a single file"
            onFilesSelect={handleFilesSelect}
          />
        </Card>
      </div>

      <div>
        <h4 className="text-md font-medium mb-3">Code Example</h4>
        <Card className="bg-gray-50 dark:bg-gray-800">
          <pre className="text-sm overflow-x-auto">
            <code>{`import { Upload } from '@nebula/components'

function BasicUpload() {
  const handleFilesSelect = (files: File[]) => {
    console.log('Selected files:', files)
  }

  return (
    <Upload 
      onFilesSelect={handleFilesSelect}
      dropZoneText="Click to browse files"
    />
  )
}

// Single file upload
<Upload 
  multiple={false}
  onFilesSelect={handleFilesSelect}
/>`}</code>
          </pre>
        </Card>
      </div>
    </div>
  )
}
