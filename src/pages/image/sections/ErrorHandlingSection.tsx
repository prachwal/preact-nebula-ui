import { useState } from 'preact/hooks'
import { Image } from '../../../../nebula/components'

export function ErrorHandlingSection() {
  const [retryCount, setRetryCount] = useState(0)
  const [showBrokenImages, setShowBrokenImages] = useState(true)

  const handleRetry = () => {
    setRetryCount(count => count + 1)
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Error Handling
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          The Image component provides robust error handling with customizable fallbacks, retry mechanisms, and graceful degradation when images fail to load.
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Basic Error Fallbacks
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            When an image fails to load, the component can display various types of fallbacks.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Text Fallback</h4>
              <Image
                src="https://invalid-url.example.com/broken-image.jpg"
                alt="Broken image with text fallback"
                size="full"
                className="w-full h-32 object-cover rounded"
                fallback="Image not available"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Shows text when image fails
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Icon Fallback</h4>
              <Image
                src="https://invalid-url.example.com/broken-image.jpg"
                alt="Broken image with icon fallback"
                size="full"
                className="w-full h-32 object-cover rounded"
                fallback={
                  <div className="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-700 rounded">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                }
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Shows icon when image fails
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Default Fallback</h4>
              <Image
                src="https://invalid-url.example.com/broken-image.jpg"
                alt="Broken image with default fallback"
                size="full"
                className="w-full h-32 object-cover rounded"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Uses component default fallback
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Fallback Image
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Provide a reliable fallback image that loads when the primary image fails.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">User Avatar Fallback</h4>
              <div className="flex items-center space-x-4">
                <Image
                  src="https://invalid-url.example.com/user-avatar.jpg"
                  alt="User profile picture"
                  size="sm"
                  className="w-16 h-16 rounded-full"
                  fallback="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=facearea&facepad=2"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">John Doe</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Software Engineer</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Falls back to default avatar
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Product Image Fallback</h4>
              <Image
                src="https://invalid-url.example.com/product.jpg"
                alt="Product image"
                size="full"
                className="w-full h-32 object-cover rounded"
                fallback="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNGM0Y0RjYiLz48cGF0aCBkPSJNMTUwIDgwQzE2MS4wNDYgODAgMTcwIDg4Ljk1NCAxNzAgMTAwQzE3MCAxMTEuMDQ2IDE2MS4wNDYgMTIwIDE1MCAxMjBDMTM4Ljk1NCAxMjAgMTMwIDExMS4wNDYgMTMwIDEwMEMxMzAgODguOTU0IDEzOC45NTQgODAgMTUwIDgwWiIgZmlsbD0iIzlDQTNBRiIvPjx0ZXh0IHg9IjE1MCIgeT0iMTUwIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzZCN0I4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UHJvZHVjdCBJbWFnZTwvdGV4dD48L3N2Zz4K"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Falls back to placeholder SVG
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Interactive Error Testing
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Test error handling behavior with broken URLs and retry mechanisms.
          </p>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-md font-medium text-gray-900 dark:text-white">Error Simulation Controls</h4>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={showBrokenImages}
                    onChange={(e) => setShowBrokenImages((e.target as HTMLInputElement).checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                    Use broken URLs
                  </span>
                </label>
                <button
                  onClick={handleRetry}
                  className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                >
                  Retry ({retryCount})
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded border border-gray-200 dark:border-gray-700">
                <Image
                  src={showBrokenImages ? 
                    `https://invalid-url.example.com/image1.jpg?retry=${retryCount}` : 
                    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150"
                  }
                  alt="Test image 1"
                  size="full"
                  className="w-full h-24 object-cover rounded"
                  fallback="❌ Failed to load"
                  onError={(event) => {
                    console.log('Image 1 failed to load:', event)
                  }}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">Test Image 1</p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded border border-gray-200 dark:border-gray-700">
                <Image
                  src={showBrokenImages ? 
                    `https://invalid-url.example.com/image2.jpg?retry=${retryCount}` : 
                    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&h=150"
                  }
                  alt="Test image 2"
                  size="full"
                  className="w-full h-24 object-cover rounded"
                  fallback={
                    <div className="flex items-center justify-center h-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Error
                    </div>
                  }
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">Test Image 2</p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded border border-gray-200 dark:border-gray-700">
                <Image
                  src={showBrokenImages ? 
                    `https://invalid-url.example.com/image3.jpg?retry=${retryCount}` : 
                    "https://images.unsplash.com/photo-1502780402662-acc01917e9e6?w=200&h=150"
                  }
                  alt="Test image 3"
                  size="full"
                  className="w-full h-24 object-cover rounded"
                  fallback={
                    <div className="flex flex-col items-center justify-center h-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs">
                      <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>No Image</span>
                    </div>
                  }
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">Test Image 3</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Error State Variations
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">Network Error</h4>
              <Image
                src="https://httpstat.us/500"
                alt="Network error simulation"
                size="full"
                className="w-full h-32 object-cover rounded mb-3"
                fallback={
                  <div className="flex flex-col items-center justify-center h-full bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded text-orange-600 dark:text-orange-400">
                    <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium">Network Error</span>
                    <span className="text-xs">Check your connection</span>
                  </div>
                }
              />
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Handles server errors and network issues gracefully
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">Not Found Error</h4>
              <Image
                src="https://httpstat.us/404"
                alt="404 error simulation"
                size="full"
                className="w-full h-32 object-cover rounded mb-3"
                fallback={
                  <div className="flex flex-col items-center justify-center h-full bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-red-600 dark:text-red-400">
                    <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m6 5H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-sm font-medium">Image Not Found</span>
                    <span className="text-xs">404 Error</span>
                  </div>
                }
              />
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Shows meaningful error messages for missing content
              </p>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-200 mb-3">
            Error Handling Best Practices
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-2">Fallback Strategy:</h4>
              <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                <li>• Always provide meaningful fallbacks</li>
                <li>• Use placeholder images for critical content</li>
                <li>• Show error messages that help users understand the issue</li>
                <li>• Consider context-appropriate fallbacks (avatars, products, etc.)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-2">Error Prevention:</h4>
              <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                <li>• Validate image URLs before using them</li>
                <li>• Use reliable image hosting services</li>
                <li>• Implement retry logic for temporary failures</li>
                <li>• Monitor image load success rates</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
