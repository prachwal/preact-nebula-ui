import { useState } from 'preact/hooks'
import { Image } from '../../../../nebula/components'

export function LazyLoadingSection() {
  const [showMore, setShowMore] = useState(false)

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Lazy Loading
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          The Image component uses Intersection Observer API for efficient lazy loading. Images only load when they enter the viewport, improving page performance and reducing bandwidth usage.
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Lazy Loading Demo
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Scroll down to see images load as they come into view. Open browser dev tools (Network tab) to see requests being made only when images become visible.
          </p>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Tip:</strong> Open DevTools → Network tab to monitor image loading behavior
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {/* Images that should be visible immediately */}
            <div>
              <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">Visible Images (Load Immediately)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <Image
                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300"
                    alt="Mountain landscape - visible immediately"
                    size="full"
                    className="w-full h-48 object-cover rounded"
                    placeholder="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNGM0Y0RjYiLz48dGV4dCB4PSIyMDAiIHk9IjE1MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2QjdCODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+"
                  />
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Mountain Landscape</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <Image
                    src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300"
                    alt="Forest path - visible immediately"
                    size="full"
                    className="w-full h-48 object-cover rounded"
                    placeholder="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNGM0Y0RjYiLz48dGV4dCB4PSIyMDAiIHk9IjE1MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2QjdCODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+"
                  />
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Forest Path</p>
                </div>
              </div>
            </div>

            {/* Spacer to push images below the fold */}
            <div className="h-96 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">Scroll down to see lazy loading in action</p>
                <div className="mt-4 animate-bounce">
                  <svg className="w-6 h-6 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Images that will be lazy loaded */}
            <div>
              <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">Lazy Loaded Images (Load on Scroll)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <Image
                    src="https://images.unsplash.com/photo-1502780402662-acc01917e9e6?w=400&h=300"
                    alt="Ocean waves - lazy loaded"
                    size="full"
                    className="w-full h-48 object-cover rounded"
                    lazy={true}
                    placeholder="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNGM0Y0RjYiLz48dGV4dCB4PSIyMDAiIHk9IjE1MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2QjdCODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkxhenkgTG9hZGluZzwvdGV4dD48L3N2Zz4K"
                  />
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Ocean Waves</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <Image
                    src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=300"
                    alt="Desert landscape - lazy loaded"
                    size="full"
                    className="w-full h-48 object-cover rounded"
                    lazy={true}
                    placeholder="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNGM0Y0RjYiLz48dGV4dCB4PSIyMDAiIHk9IjE1MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2QjdCODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkxhenkgTG9hZGluZzwvdGV4dD48L3N2Zz4K"
                  />
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Desert Landscape</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <Image
                  src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=300"
                  alt="Arctic landscape - lazy loaded"
                  size="full"
                  className="w-full h-48 object-cover rounded"
                  lazy={true}
                  lowQualitySrc="https://images.unsplash.com/photo-1448375240586-882707db888b?w=50&h=38&q=10"
                />
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Arctic Ice (with low-quality preview)</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <Image
                  src="https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=300"
                  alt="Tropical beach - lazy loaded"
                  size="full"
                  className="w-full h-48 object-cover rounded"
                  lazy={true}
                  lowQualitySrc="https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=50&h=38&q=10"
                />
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Tropical Beach (with low-quality preview)</p>
              </div>
            </div>

            {/* More images revealed on button click */}
            {showMore && (
              <div>
                <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">Additional Lazy Loaded Images</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <Image
                      src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=300&h=300"
                      alt="Waterfall - dynamically loaded"
                      size="full"
                      className="w-full h-32 object-cover rounded"
                      lazy={true}
                    />
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Waterfall</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <Image
                      src="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=300&h=300"
                      alt="Prairie - dynamically loaded"
                      size="full"
                      className="w-full h-32 object-cover rounded"
                      lazy={true}
                    />
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Prairie</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <Image
                      src="https://images.unsplash.com/photo-1464822759844-d150ad6d9bd6?w=300&h=300"
                      alt="Snow mountain - dynamically loaded"
                      size="full"
                      className="w-full h-32 object-cover rounded"
                      lazy={true}
                    />
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Snow Mountain</p>
                  </div>
                </div>
              </div>
            )}

            <div className="text-center">
              <button
                onClick={() => setShowMore(!showMore)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {showMore ? 'Hide Additional Images' : 'Load More Images'}
              </button>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Lazy Loading vs Eager Loading Comparison
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">Lazy Loading (Default)</h4>
              <div className="space-y-3">
                <Image
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200"
                  alt="Lazy loaded mountain"
                  size="full"
                  className="w-full h-32 object-cover rounded"
                  lazy={true}
                />
                <div className="text-sm space-y-1">
                  <p className="text-green-600 dark:text-green-400">✓ Loads when visible</p>
                  <p className="text-green-600 dark:text-green-400">✓ Saves bandwidth</p>
                  <p className="text-green-600 dark:text-green-400">✓ Improves page load speed</p>
                  <p className="text-gray-600 dark:text-gray-400">• Uses Intersection Observer</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">Eager Loading</h4>
              <div className="space-y-3">
                <Image
                  src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=200"
                  alt="Eager loaded forest"
                  size="full"
                  className="w-full h-32 object-cover rounded"
                  lazy={false}
                  loading="eager"
                />
                <div className="text-sm space-y-1">
                  <p className="text-blue-600 dark:text-blue-400">• Loads immediately</p>
                  <p className="text-blue-600 dark:text-blue-400">• Good for above-the-fold</p>
                  <p className="text-orange-600 dark:text-orange-400">⚠ Uses more bandwidth</p>
                  <p className="text-gray-600 dark:text-gray-400">• No intersection observer</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Performance Benefits</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-md font-medium text-gray-900 dark:text-white mb-2">Bandwidth Savings</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Only loads images that users actually see</li>
                <li>• Reduces initial page size by 50-80%</li>
                <li>• Particularly beneficial on mobile networks</li>
                <li>• Progressive loading for better perceived performance</li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-medium text-gray-900 dark:text-white mb-2">Performance Improvements</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Faster initial page load times</li>
                <li>• Reduced memory usage</li>
                <li>• Better Core Web Vitals scores</li>
                <li>• Smooth scrolling experience</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
