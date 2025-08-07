export function PropsDocumentation() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Props Documentation
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Complete reference for all Image component props, their types, default values, and usage examples.
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Core Props
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Prop</th>
                  <th scope="col" className="px-6 py-3">Type</th>
                  <th scope="col" className="px-6 py-3">Default</th>
                  <th scope="col" className="px-6 py-3">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">src</td>
                  <td className="px-6 py-4">
                    <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs">string</code>
                  </td>
                  <td className="px-6 py-4">-</td>
                  <td className="px-6 py-4">The image source URL (required)</td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">alt</td>
                  <td className="px-6 py-4">
                    <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs">string</code>
                  </td>
                  <td className="px-6 py-4">-</td>
                  <td className="px-6 py-4">Alternative text for accessibility (required)</td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">size</td>
                  <td className="px-6 py-4">
                    <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs">'sm' | 'md' | 'lg' | 'xl' | 'full'</code>
                  </td>
                  <td className="px-6 py-4">'md'</td>
                  <td className="px-6 py-4">Predefined size variant</td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">className</td>
                  <td className="px-6 py-4">
                    <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs">string</code>
                  </td>
                  <td className="px-6 py-4">''</td>
                  <td className="px-6 py-4">Additional CSS classes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Loading & Performance Props
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Prop</th>
                  <th scope="col" className="px-6 py-3">Type</th>
                  <th scope="col" className="px-6 py-3">Default</th>
                  <th scope="col" className="px-6 py-3">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">lazy</td>
                  <td className="px-6 py-4">
                    <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs">boolean</code>
                  </td>
                  <td className="px-6 py-4">true</td>
                  <td className="px-6 py-4">Enable lazy loading with Intersection Observer</td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">loading</td>
                  <td className="px-6 py-4">
                    <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs">'lazy' | 'eager'</code>
                  </td>
                  <td className="px-6 py-4">'lazy'</td>
                  <td className="px-6 py-4">Native loading attribute</td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">decoding</td>
                  <td className="px-6 py-4">
                    <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs">'async' | 'sync' | 'auto'</code>
                  </td>
                  <td className="px-6 py-4">'async'</td>
                  <td className="px-6 py-4">Image decoding strategy</td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">placeholder</td>
                  <td className="px-6 py-4">
                    <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs">string</code>
                  </td>
                  <td className="px-6 py-4">-</td>
                  <td className="px-6 py-4">Placeholder image or data URL shown while loading</td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">lowQualitySrc</td>
                  <td className="px-6 py-4">
                    <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs">string</code>
                  </td>
                  <td className="px-6 py-4">-</td>
                  <td className="px-6 py-4">Low quality image for progressive loading</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Responsive Props
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Prop</th>
                  <th scope="col" className="px-6 py-3">Type</th>
                  <th scope="col" className="px-6 py-3">Default</th>
                  <th scope="col" className="px-6 py-3">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">srcSet</td>
                  <td className="px-6 py-4">
                    <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs">string</code>
                  </td>
                  <td className="px-6 py-4">-</td>
                  <td className="px-6 py-4">Set of image sources for different screen densities</td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">sizes</td>
                  <td className="px-6 py-4">
                    <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs">string</code>
                  </td>
                  <td className="px-6 py-4">-</td>
                  <td className="px-6 py-4">Media query information for responsive images</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Zoom & Interaction Props
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Prop</th>
                  <th scope="col" className="px-6 py-3">Type</th>
                  <th scope="col" className="px-6 py-3">Default</th>
                  <th scope="col" className="px-6 py-3">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-gray-800">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">zoom</td>
                  <td className="px-6 py-4">
                    <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs">boolean | ZoomConfig</code>
                  </td>
                  <td className="px-6 py-4">false</td>
                  <td className="px-6 py-4">Enable zoom functionality</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h4 className="text-md font-medium text-gray-900 dark:text-white mb-2">ZoomConfig Interface</h4>
            <pre className="text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded overflow-x-auto">
              <code>{`interface ZoomConfig {
  enabled: boolean
  maxZoom?: number      // Maximum zoom level (default: 3)
  minZoom?: number      // Minimum zoom level (default: 1)
  step?: number         // Zoom step increment (default: 0.1)
  wheelZoom?: boolean   // Enable mouse wheel zoom (default: true)
  doubleClickZoom?: boolean // Enable double-click zoom (default: true)
  pinchZoom?: boolean   // Enable pinch zoom on touch devices (default: true)
}`}</code>
            </pre>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Error Handling Props
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Prop</th>
                  <th scope="col" className="px-6 py-3">Type</th>
                  <th scope="col" className="px-6 py-3">Default</th>
                  <th scope="col" className="px-6 py-3">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">fallback</td>
                  <td className="px-6 py-4">
                    <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs">string | ComponentChild</code>
                  </td>
                  <td className="px-6 py-4">-</td>
                  <td className="px-6 py-4">Content to show when image fails to load</td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">onError</td>
                  <td className="px-6 py-4">
                    <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs">(event: Event) =&gt; void</code>
                  </td>
                  <td className="px-6 py-4">-</td>
                  <td className="px-6 py-4">Callback fired when image fails to load</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Event Props
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Prop</th>
                  <th scope="col" className="px-6 py-3">Type</th>
                  <th scope="col" className="px-6 py-3">Default</th>
                  <th scope="col" className="px-6 py-3">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">onLoad</td>
                  <td className="px-6 py-4">
                    <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs">(event: Event) =&gt; void</code>
                  </td>
                  <td className="px-6 py-4">-</td>
                  <td className="px-6 py-4">Callback fired when image loads successfully</td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">onClick</td>
                  <td className="px-6 py-4">
                    <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs">(event: MouseEvent) =&gt; void</code>
                  </td>
                  <td className="px-6 py-4">-</td>
                  <td className="px-6 py-4">Callback fired when image is clicked</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Accessibility Props
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Prop</th>
                  <th scope="col" className="px-6 py-3">Type</th>
                  <th scope="col" className="px-6 py-3">Default</th>
                  <th scope="col" className="px-6 py-3">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">aria-label</td>
                  <td className="px-6 py-4">
                    <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs">string</code>
                  </td>
                  <td className="px-6 py-4">-</td>
                  <td className="px-6 py-4">Accessible label for screen readers</td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">aria-describedby</td>
                  <td className="px-6 py-4">
                    <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs">string</code>
                  </td>
                  <td className="px-6 py-4">-</td>
                  <td className="px-6 py-4">ID of element that describes the image</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Size Variants
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { size: 'sm', dimensions: '64px × 64px', description: 'Small avatars, thumbnails' },
              { size: 'md', dimensions: '128px × 128px', description: 'Profile pictures, cards' },
              { size: 'lg', dimensions: '192px × 192px', description: 'Featured images, headers' },
              { size: 'xl', dimensions: '256px × 256px', description: 'Large previews, galleries' },
              { size: 'full', dimensions: '100% width', description: 'Hero images, full-width content' }
            ].map((variant) => (
              <div key={variant.size} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">{variant.size}</h4>
                  <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs">{variant.dimensions}</code>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300">{variant.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Usage Examples
          </h3>
          
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <h4 className="text-md font-medium text-gray-900 dark:text-white mb-2">Basic Usage</h4>
              <pre className="text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded overflow-x-auto">
                <code>{`<Image
  src="https://example.com/image.jpg"
  alt="Example image"
  size="md"
/>`}</code>
              </pre>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <h4 className="text-md font-medium text-gray-900 dark:text-white mb-2">With Lazy Loading & Placeholder</h4>
              <pre className="text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded overflow-x-auto">
                <code>{`<Image
  src="https://example.com/high-res.jpg"
  alt="High resolution image"
  size="lg"
  lazy={true}
  placeholder="data:image/svg+xml;base64,..."
  lowQualitySrc="https://example.com/low-res.jpg"
/>`}</code>
              </pre>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <h4 className="text-md font-medium text-gray-900 dark:text-white mb-2">Responsive with srcSet</h4>
              <pre className="text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded overflow-x-auto">
                <code>{`<Image
  src="https://example.com/image-800w.jpg"
  alt="Responsive image"
  size="full"
  srcSet="
    https://example.com/image-400w.jpg 400w,
    https://example.com/image-800w.jpg 800w,
    https://example.com/image-1200w.jpg 1200w
  "
  sizes="(max-width: 768px) 100vw, 50vw"
/>`}</code>
              </pre>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <h4 className="text-md font-medium text-gray-900 dark:text-white mb-2">With Zoom & Error Handling</h4>
              <pre className="text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded overflow-x-auto">
                <code>{`<Image
  src="https://example.com/image.jpg"
  alt="Zoomable image with fallback"
  size="lg"
  zoom={{
    enabled: true,
    maxZoom: 3,
    wheelZoom: true
  }}
  fallback="Image not available"
  onError={(event) => console.log('Image failed to load', event)}
  onLoad={(event) => console.log('Image loaded successfully', event)}
/>`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
