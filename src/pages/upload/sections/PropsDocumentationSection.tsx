import { Card } from '../../../../nebula/components/Card'

export function PropsDocumentationSection() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Upload Props</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Complete reference for all Upload component props with types, default values, and descriptions.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-md font-medium mb-3">Core Props</h4>
          <Card>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Prop</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Type</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Default</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">size</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">'sm' | 'md' | 'lg'</td>
                    <td className="py-3 px-4 text-gray-500 dark:text-gray-400">'md'</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">Size variant of the upload component</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">children</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">ComponentChild</td>
                    <td className="py-3 px-4 text-gray-500 dark:text-gray-400">undefined</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">Custom content for the drop zone</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">className</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">string</td>
                    <td className="py-3 px-4 text-gray-500 dark:text-gray-400">undefined</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">Additional CSS classes</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">disabled</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">boolean</td>
                    <td className="py-3 px-4 text-gray-500 dark:text-gray-400">false</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">Disable the upload functionality</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div>
          <h4 className="text-md font-medium mb-3">File Handling Props</h4>
          <Card>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Prop</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Type</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Default</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">accept</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">string</td>
                    <td className="py-3 px-4 text-gray-500 dark:text-gray-400">undefined</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">Accepted file types (MIME types or extensions)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">multiple</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">boolean</td>
                    <td className="py-3 px-4 text-gray-500 dark:text-gray-400">false</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">Allow multiple file selection</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">maxFiles</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">number</td>
                    <td className="py-3 px-4 text-gray-500 dark:text-gray-400">undefined</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">Maximum number of files allowed</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">maxSize</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">number</td>
                    <td className="py-3 px-4 text-gray-500 dark:text-gray-400">undefined</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">Maximum file size in bytes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div>
          <h4 className="text-md font-medium mb-3">Drag & Drop Props</h4>
          <Card>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Prop</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Type</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Default</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">dragActive</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">boolean</td>
                    <td className="py-3 px-4 text-gray-500 dark:text-gray-400">false</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">Controlled drag active state</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">showDropZone</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">boolean</td>
                    <td className="py-3 px-4 text-gray-500 dark:text-gray-400">true</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">Show the drop zone interface</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">dropZoneText</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">string</td>
                    <td className="py-3 px-4 text-gray-500 dark:text-gray-400">'Drag files here or click to browse'</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">Text displayed in the drop zone</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div>
          <h4 className="text-md font-medium mb-3">Upload Behavior Props</h4>
          <Card>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Prop</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Type</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Default</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">autoUpload</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">boolean</td>
                    <td className="py-3 px-4 text-gray-500 dark:text-gray-400">false</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">Automatically start upload when files are selected</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">uploadUrl</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">string</td>
                    <td className="py-3 px-4 text-gray-500 dark:text-gray-400">undefined</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">URL endpoint for file uploads</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">uploadHeaders</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">Record&lt;string, string&gt;</td>
                    <td className="py-3 px-4 text-gray-500 dark:text-gray-400">undefined</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">Custom headers for upload requests</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div>
          <h4 className="text-md font-medium mb-3">Validation Props</h4>
          <Card>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Prop</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Type</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Default</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">validateFile</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">(file: File) =&gt; boolean | string</td>
                    <td className="py-3 px-4 text-gray-500 dark:text-gray-400">undefined</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">Custom validation function for files</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div>
          <h4 className="text-md font-medium mb-3">Event Handler Props</h4>
          <Card>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Prop</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Type</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">onFilesSelect</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">(files: File[]) =&gt; void</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">Called when files are selected</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">onDrop</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">(files: File[]) =&gt; void</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">Called when files are dropped</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">onUploadStart</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">(file: File) =&gt; void</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">Called when an upload starts</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">onUploadProgress</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">(file: File, progress: number) =&gt; void</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">Called with upload progress updates</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">onUploadComplete</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">(file: File, response?: any) =&gt; void</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">Called when an upload completes</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">onUploadError</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">(file: File, error: Error) =&gt; void</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">Called when an upload fails</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">onFileRemove</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">(file: File) =&gt; void</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">Called when a file is removed</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div>
          <h4 className="text-md font-medium mb-3">Accessibility Props</h4>
          <Card>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Prop</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Type</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Default</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">aria-label</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">string</td>
                    <td className="py-3 px-4 text-gray-500 dark:text-gray-400">undefined</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">Accessible label for the upload area</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">aria-describedby</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">string</td>
                    <td className="py-3 px-4 text-gray-500 dark:text-gray-400">undefined</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">ID of element describing the upload area</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium mb-3">UploadFile Props</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
          Props for individual file components in the upload list.
        </p>
        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Prop</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Required</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">file</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">File</td>
                  <td className="py-3 px-4 text-green-600 dark:text-green-400">Yes</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">The file object to display</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">progress</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">number</td>
                  <td className="py-3 px-4 text-gray-500 dark:text-gray-400">No</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">Upload progress (0-100)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">status</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">'pending' | 'uploading' | 'completed' | 'error'</td>
                  <td className="py-3 px-4 text-green-600 dark:text-green-400">Yes</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">Current upload status</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">error</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">string</td>
                  <td className="py-3 px-4 text-gray-500 dark:text-gray-400">No</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">Error message if upload failed</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">onRemove</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">() =&gt; void</td>
                  <td className="py-3 px-4 text-gray-500 dark:text-gray-400">No</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">Callback to remove the file</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <div>
        <h4 className="text-md font-medium mb-3">Usage Notes</h4>
        <Card className="p-4">
          <div className="text-sm text-gray-600 dark:text-gray-300 space-y-3">
            <div>
              <strong className="text-gray-900 dark:text-white">File Types:</strong>
              <p>Use standard MIME types (image/*, application/pdf) or file extensions (.jpg, .png, .pdf) for the accept prop.</p>
            </div>
            <div>
              <strong className="text-gray-900 dark:text-white">File Size:</strong>
              <p>maxSize is specified in bytes. For example: 5 * 1024 * 1024 for 5MB limit.</p>
            </div>
            <div>
              <strong className="text-gray-900 dark:text-white">Validation:</strong>
              <p>validateFile should return true for valid files, false for invalid, or a string error message.</p>
            </div>
            <div>
              <strong className="text-gray-900 dark:text-white">Event Handling:</strong>
              <p>All event handlers are optional. Use onFilesSelect for basic file handling, upload events for progress tracking.</p>
            </div>
          </div>
        </Card>
      </div>

      <div>
        <h4 className="text-md font-medium mb-3">TypeScript Interface</h4>
        <Card className="bg-gray-50 dark:bg-gray-800">
          <pre className="text-sm overflow-x-auto">
            <code>{`interface UploadProps extends Omit<ComponentProps<'div'>, 'onDrop'> {
  // Size variants
  size?: 'sm' | 'md' | 'lg'
  
  // Core props
  children?: ComponentChild
  className?: string
  
  // Upload-specific props
  accept?: string
  multiple?: boolean
  maxFiles?: number
  maxSize?: number
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
  
  // Event handlers
  onFilesSelect?: (files: File[]) => void
  onDrop?: (files: File[]) => void
  onUploadStart?: (file: File) => void
  onUploadProgress?: (file: File, progress: number) => void
  onUploadComplete?: (file: File, response?: any) => void
  onUploadError?: (file: File, error: Error) => void
  onFileRemove?: (file: File) => void
  
  // Accessibility
  'aria-label'?: string
  'aria-describedby'?: string
}`}</code>
          </pre>
        </Card>
      </div>
    </div>
  )
}
