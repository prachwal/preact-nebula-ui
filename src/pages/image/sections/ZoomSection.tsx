import { useState } from 'preact/hooks'
import { Image } from '../../../../nebula/components'

export function ZoomSection() {
  const [zoomEnabled, setZoomEnabled] = useState(true)
  const [zoomLevel, setZoomLevel] = useState(1.5)

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Image Zoom
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Interactive zoom functionality allows users to magnify images for detailed viewing. The zoom feature supports both hover and click interactions with smooth animations and proper accessibility.
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Hover Zoom
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Images zoom in when hovered and return to normal size when the cursor leaves.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <Image
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300"
                alt="Mountain landscape with hover zoom"
                size="full"
                className="w-full h-48 object-cover rounded transition-transform duration-300 hover:scale-110"
                zoom={true}
              />
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 text-center">Subtle Zoom (1.1x)</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <Image
                src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300"
                alt="Forest path with moderate hover zoom"
                size="full"
                className="w-full h-48 object-cover rounded transition-transform duration-300 hover:scale-125"
                zoom={true}
              />
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 text-center">Moderate Zoom (1.25x)</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <Image
                src="https://images.unsplash.com/photo-1502780402662-acc01917e9e6?w=400&h=300"
                alt="Ocean waves with strong hover zoom"
                size="full"
                className="w-full h-48 object-cover rounded transition-transform duration-300 hover:scale-150"
                zoom={true}
              />
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 text-center">Strong Zoom (1.5x)</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Click to Zoom
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Click on images to toggle zoom state. Click again to return to normal size.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <Image
                src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=500&h=400"
                alt="Desert landscape - click to zoom"
                size="full"
                className="w-full h-64 object-cover rounded cursor-zoom-in"
                zoom={true}
              />
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 text-center">
                Click to zoom (2x) • Desert Landscape
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <Image
                src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=500&h=400"
                alt="Arctic ice - click to zoom"
                size="full"
                className="w-full h-64 object-cover rounded cursor-zoom-in"
                zoom={true}
              />
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 text-center">
                Click to zoom (1.8x) • Arctic Ice
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Modal Zoom
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Images open in a full-screen modal overlay for detailed viewing with zoom controls.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <Image
                src="https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=300"
                alt="Tropical beach - modal zoom"
                size="full"
                className="w-full h-32 object-cover rounded cursor-pointer hover:opacity-90 transition-opacity"
                zoom={true}
              />
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 text-center">Tropical Beach</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <Image
                src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300"
                alt="Waterfall - modal zoom"
                size="full"
                className="w-full h-32 object-cover rounded cursor-pointer hover:opacity-90 transition-opacity"
                zoom={true}
              />
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 text-center">Waterfall</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <Image
                src="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&h=300"
                alt="Prairie sunset - modal zoom"
                size="full"
                className="w-full h-32 object-cover rounded cursor-pointer hover:opacity-90 transition-opacity"
                zoom={true}
              />
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 text-center">Prairie Sunset</p>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div className="text-sm text-blue-800 dark:text-blue-200">
                <p className="font-medium mb-1">Modal Zoom Features:</p>
                <ul className="space-y-1">
                  <li>• Full-screen overlay with dark background</li>
                  <li>• Zoom in/out controls and pan functionality</li>
                  <li>• Keyboard navigation (ESC to close, arrow keys to navigate)</li>
                  <li>• Touch/gesture support on mobile devices</li>
                  <li>• Accessible with proper ARIA labels</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Interactive Zoom Controls
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Customize zoom behavior with interactive controls.
          </p>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Enable Zoom
                </label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="zoom-enabled"
                    checked={zoomEnabled}
                    onChange={(e) => setZoomEnabled((e.target as HTMLInputElement).checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="zoom-enabled" className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                    {zoomEnabled ? 'Zoom enabled' : 'Zoom disabled'}
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="zoom-level" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Zoom Level: {zoomLevel}x
                </label>
                <input
                  type="range"
                  id="zoom-level"
                  min="1"
                  max="3"
                  step="0.1"
                  value={zoomLevel}
                  onChange={(e) => setZoomLevel(parseFloat((e.target as HTMLInputElement).value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>1x</span>
                  <span>2x</span>
                  <span>3x</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Image
                src="https://images.unsplash.com/photo-1464822759844-d150ad6d9bd6?w=600&h=400"
                alt="Interactive zoom demo - snowy mountain"
                size="full"
                className={`w-full max-w-md mx-auto h-64 object-cover rounded transition-transform duration-300 ${
                  zoomEnabled ? 'hover:cursor-zoom-in' : 'cursor-default'
                }`}
                zoom={zoomEnabled ? true : false}
                style={zoomEnabled ? { transform: `scale(1)` } : undefined}
              />
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                Interactive Demo • Hover to zoom
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Zoom Types Comparison
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Zoom Type</th>
                  <th scope="col" className="px-6 py-3">Trigger</th>
                  <th scope="col" className="px-6 py-3">Best Use Case</th>
                  <th scope="col" className="px-6 py-3">Accessibility</th>
                  <th scope="col" className="px-6 py-3">Performance</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Hover</td>
                  <td className="px-6 py-4">Mouse enter/leave</td>
                  <td className="px-6 py-4">Product galleries, previews</td>
                  <td className="px-6 py-4">Keyboard accessible</td>
                  <td className="px-6 py-4">High (CSS transforms)</td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Click</td>
                  <td className="px-6 py-4">Click/tap</td>
                  <td className="px-6 py-4">Touch devices, intentional zoom</td>
                  <td className="px-6 py-4">Screen reader friendly</td>
                  <td className="px-6 py-4">High (CSS transforms)</td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Modal</td>
                  <td className="px-6 py-4">Click to open overlay</td>
                  <td className="px-6 py-4">Detailed viewing, pan/zoom</td>
                  <td className="px-6 py-4">Full keyboard navigation</td>
                  <td className="px-6 py-4">Medium (portal rendering)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-3">
            Zoom Best Practices
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Do:</h4>
              <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                <li>• Use subtle zoom (1.05-1.2x) for hover effects</li>
                <li>• Provide visual feedback with cursor changes</li>
                <li>• Include keyboard accessibility for zoom controls</li>
                <li>• Use high-resolution images for zoom functionality</li>
                <li>• Add smooth transitions for better UX</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Don't:</h4>
              <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                <li>• Use excessive zoom levels (&gt;3x) without modal</li>
                <li>• Apply zoom to low-resolution images</li>
                <li>• Forget touch device considerations</li>
                <li>• Overuse zoom effects on every image</li>
                <li>• Ignore reduced motion preferences</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
