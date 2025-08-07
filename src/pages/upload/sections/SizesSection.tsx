import { Card } from '../../../../nebula/components/Card'
import { Upload } from '../../../../nebula/components/Upload'

export function SizesSection() {
  const handleFilesSelect = (files: File[]) => {
    console.log('Selected files:', files.map(f => f.name))
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Size Variants</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Upload component supports three size variants: small (sm), medium (md), and large (lg).
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-md font-medium mb-3">Small (sm) - Compact upload area</h4>
          <Card>
            <Upload size="sm" onFilesSelect={handleFilesSelect} />
          </Card>
        </div>

        <div>
          <h4 className="text-md font-medium mb-3">Medium (md) - Standard size (default)</h4>
          <Card>
            <Upload size="md" onFilesSelect={handleFilesSelect} />
          </Card>
        </div>

        <div>
          <h4 className="text-md font-medium mb-3">Large (lg) - Prominent upload area</h4>
          <Card>
            <Upload size="lg" onFilesSelect={handleFilesSelect} />
          </Card>
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium mb-3">Size Comparison</h4>
        <Card className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <h5 className="font-medium text-blue-600 dark:text-blue-400 mb-2">Small (sm)</h5>
              <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                <li>• Minimum height: 96px (6rem)</li>
                <li>• Text size: small</li>
                <li>• Use in tight spaces</li>
                <li>• Secondary upload areas</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-green-600 dark:text-green-400 mb-2">Medium (md)</h5>
              <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                <li>• Minimum height: 128px (8rem)</li>
                <li>• Text size: base</li>
                <li>• Standard forms</li>
                <li>• Most common use case</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-purple-600 dark:text-purple-400 mb-2">Large (lg)</h5>
              <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                <li>• Minimum height: 160px (10rem)</li>
                <li>• Text size: large</li>
                <li>• Prominent placement</li>
                <li>• Main upload feature</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      <div>
        <h4 className="text-md font-medium mb-3">Code Example</h4>
        <Card className="bg-gray-50 dark:bg-gray-800">
          <pre className="text-sm overflow-x-auto">
            <code>{`// Small upload area
<Upload size="sm" onFilesSelect={handleFiles} />

// Medium upload area (default)
<Upload size="md" onFilesSelect={handleFiles} />

// Large upload area
<Upload size="lg" onFilesSelect={handleFiles} />

// Size selection based on context
function UploadComponent({ prominence }) {
  const size = prominence === 'high' ? 'lg' : 
               prominence === 'low' ? 'sm' : 'md'
  
  return <Upload size={size} onFilesSelect={handleFiles} />
}`}</code>
          </pre>
        </Card>
      </div>
    </div>
  )
}
