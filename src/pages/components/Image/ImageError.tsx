import { useState } from 'preact/hooks'
import { Image } from '../../../../nebula/components/Image'

export function ImageError() {
  const [errorCount, setErrorCount] = useState(0)

  const handleError = () => {
    setErrorCount(prev => prev + 1)
  }

  const CustomErrorFallback = () => (
    <div className="flex flex-col items-center justify-center h-full bg-red-50 border-2 border-red-200 rounded-lg p-4">
      <svg className="w-8 h-8 text-red-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
      <p className="text-red-600 text-sm font-medium">Custom Error UI</p>
      <p className="text-red-500 text-xs mt-1">Image failed to load</p>
    </div>
  )

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Error Handling</h3>
        <p className="text-gray-600 mb-4">
          Examples of how the Image component handles various error scenarios and fallbacks.
        </p>
      </div>

      <div>
        <h4 className="font-medium mb-4">Default Error Fallback</h4>
        <p className="text-gray-600 mb-4">
          When an image fails to load, the component shows a default error UI.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500 mb-2">Broken image URL</p>
            <Image
              src="https://invalid-url-that-will-fail.com/image.jpg"
              alt="This image will fail to load"
              size="md"
              onError={handleError}
            />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-2">Another broken image</p>
            <Image
              src="/non-existent-image.jpg"
              alt="Another broken image"
              size="md"
              onError={handleError}
            />
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-4">Custom Fallback Image</h4>
        <p className="text-gray-600 mb-4">
          You can provide a fallback image that displays when the main image fails.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500 mb-2">With fallback image</p>
            <Image
              src="https://invalid-url.com/broken.jpg"
              alt="Image with fallback"
              size="md"
              fallback="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300"
              onError={handleError}
            />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-2">Another fallback example</p>
            <Image
              src="/missing-image.png"
              alt="Another fallback example"
              size="md"
              fallback="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300"
              onError={handleError}
            />
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-4">Custom Error Component</h4>
        <p className="text-gray-600 mb-4">
          For more control, you can provide a custom React component as the fallback.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500 mb-2">Custom error component</p>
            <Image
              src="https://broken-link.invalid/image.jpg"
              alt="Custom error fallback"
              size="md"
              fallback={<CustomErrorFallback />}
              onError={handleError}
            />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-2">Another custom fallback</p>
            <Image
              src="/definitely-missing.jpg"
              alt="Another custom error"
              size="md"
              fallback={
                <div className="flex items-center justify-center h-full bg-yellow-50 border border-yellow-200 rounded">
                  <div className="text-center">
                    <span className="text-2xl">🖼️</span>
                    <p className="text-yellow-700 text-sm mt-1">Image not available</p>
                  </div>
                </div>
              }
              onError={handleError}
            />
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-4">Network Issues Simulation</h4>
        <p className="text-gray-600 mb-4">
          These examples simulate various network conditions and slow loading.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500 mb-2">Very slow loading (with timeout)</p>
            <Image
              src="https://httpstat.us/200?sleep=10000"
              alt="Slow loading image"
              size="md"
              placeholder="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNGM0Y0RjYiLz48dGV4dCB4PSIyMDAiIHk9IjE1MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2QjdCODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+"
              fallback="https://images.unsplash.com/photo-1502780402662-acc01917e9e6?w=400&h=300"
              onError={handleError}
            />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-2">404 Error</p>
            <Image
              src="https://httpstat.us/404"
              alt="404 error image"
              size="md"
              fallback={
                <div className="flex items-center justify-center h-full bg-gray-100 border border-gray-300 rounded">
                  <div className="text-center text-gray-500">
                    <span className="text-3xl">404</span>
                    <p className="text-sm mt-1">Image not found</p>
                  </div>
                </div>
              }
              onError={handleError}
            />
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-4">Mixed Success and Failure</h4>
        <p className="text-gray-600 mb-4">
          A mix of working and broken images to demonstrate the difference.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500 mb-2">Working image</p>
            <Image
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200"
              alt="Working mountain image"
              size="md"
            />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-2">Broken image with fallback</p>
            <Image
              src="https://broken-url.test/image.jpg"
              alt="Broken image"
              size="md"
              fallback="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=200"
              onError={handleError}
            />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-2">Another working image</p>
            <Image
              src="https://images.unsplash.com/photo-1502780402662-acc01917e9e6?w=300&h=200"
              alt="Working ocean image"
              size="md"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 className="font-medium mb-2">Error Handling Stats:</h4>
        <p className="text-sm text-blue-700 dark:text-blue-300">
          Total errors caught: <span className="font-medium">{errorCount}</span>
        </p>
        <div className="mt-3 text-xs text-blue-600 dark:text-blue-400 space-y-1">
          <p>• onError callback is triggered for each failed image</p>
          <p>• Fallback images can be static URLs or custom components</p>
          <p>• Graceful degradation ensures UI remains functional</p>
          <p>• Loading states are handled separately from error states</p>
        </div>
      </div>
    </div>
  )
}
