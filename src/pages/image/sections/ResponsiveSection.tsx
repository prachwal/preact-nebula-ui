import { Image } from '../../../../nebula/components'

export function ResponsiveSection() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Responsive Images
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Responsive images automatically adapt to different screen sizes and device capabilities, improving performance and user experience across all devices.
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Basic Responsive Images
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Images that scale fluidly with their container while maintaining aspect ratio.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Landscape Image</h4>
              <Image
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600"
                alt="Mountain landscape - responsive"
                size="full"
                className="w-full h-auto rounded"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                16:9 aspect ratio
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Portrait Image</h4>
              <Image
                src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=800"
                alt="Forest path - responsive"
                size="full"
                className="w-full h-auto rounded"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                3:4 aspect ratio
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Square Image</h4>
              <Image
                src="https://images.unsplash.com/photo-1502780402662-acc01917e9e6?w=600&h=600"
                alt="Ocean waves - responsive"
                size="full"
                className="w-full h-auto rounded"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                1:1 aspect ratio
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            srcSet for High-DPI Displays
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Serve different image resolutions based on device pixel density for crisp images on all screens.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Standard Resolution</h4>
              <Image
                src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=300"
                alt="Desert landscape - standard resolution"
                size="full"
                className="w-full h-48 object-cover rounded"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Single resolution (400x300)
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">High-DPI Optimized</h4>
              <Image
                src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=300"
                alt="Arctic ice - high-DPI optimized"
                size="full"
                className="w-full h-48 object-cover rounded"
                srcSet="https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=300 1x, https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=600 2x, https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&h=900 3x"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Multiple resolutions (1x, 2x, 3x)
              </p>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div className="text-sm text-blue-800 dark:text-blue-200">
                <p className="font-medium mb-1">High-DPI Benefits:</p>
                <ul className="space-y-1">
                  <li>• Crisp images on Retina/high-DPI displays</li>
                  <li>• Automatic selection based on device capabilities</li>
                  <li>• Better user experience on modern devices</li>
                  <li>• Bandwidth efficient - only loads what's needed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Viewport-Based Sizing
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Load different image sizes based on viewport width to optimize performance.
          </p>
          
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">Full-Width Hero Image</h4>
              <Image
                src="https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1200&h=400"
                alt="Tropical beach hero - responsive"
                size="full"
                className="w-full h-48 md:h-64 lg:h-80 object-cover rounded"
                srcSet="
                  https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=640&h=213 640w,
                  https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=768&h=256 768w,
                  https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1024&h=341 1024w,
                  https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1280&h=427 1280w,
                  https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1920&h=640 1920w
                "
                sizes="100vw"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Full viewport width with multiple breakpoints
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Article Image</h4>
                <Image
                  src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&h=400"
                  alt="Waterfall - article image"
                  size="full"
                  className="w-full h-32 object-cover rounded"
                  srcSet="
                    https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=320&h=213 320w,
                    https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=480&h=320 480w,
                    https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&h=400 600w,
                    https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=533 800w
                  "
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Responsive content image
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Thumbnail Grid</h4>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=150&h=150",
                    "https://images.unsplash.com/photo-1464822759844-d150ad6d9bd6?w=150&h=150",
                    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150"
                  ].map((src, index) => (
                    <Image
                      key={index}
                      src={src}
                      alt={`Thumbnail ${index + 1}`}
                      size="full"
                      className="w-full aspect-square object-cover rounded"
                      srcSet={`${src} 1x, ${src.replace('w=150&h=150', 'w=300&h=300')} 2x`}
                      sizes="(max-width: 768px) 33vw, (max-width: 1024px) 16vw, 12vw"
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Optimized thumbnail sizes
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Art Direction with Different Crops
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Show different image crops for different screen sizes to maintain visual impact.
          </p>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">Adaptive Crop Example</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Mobile Crop (Portrait)</h5>
                <div className="w-40 mx-auto">
                  <Image
                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=400&fit=crop&crop=center"
                    alt="Mountain landscape - mobile crop"
                    size="full"
                    className="w-full h-48 object-cover rounded"
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                  3:4 ratio for mobile screens
                </p>
              </div>
              <div>
                <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Desktop Crop (Landscape)</h5>
                <Image
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=300&fit=crop&crop=center"
                  alt="Mountain landscape - desktop crop"
                  size="full"
                  className="w-full h-32 object-cover rounded"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                  2:1 ratio for desktop screens
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Performance Optimization
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">Sizes Attribute</h4>
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded text-xs font-mono mb-3">
                sizes="(max-width: 768px) 100vw, 50vw"
              </div>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Tells browser expected image display size</li>
                <li>• Enables optimal image selection</li>
                <li>• Improves performance by loading right size</li>
                <li>• Works with srcSet for best results</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">Bandwidth Savings</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Mobile (320px):</span>
                  <span className="font-medium text-green-600 dark:text-green-400">~20KB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Tablet (768px):</span>
                  <span className="font-medium text-green-600 dark:text-green-400">~45KB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Desktop (1200px):</span>
                  <span className="font-medium text-green-600 dark:text-green-400">~80KB</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-gray-600 dark:text-gray-300">vs. Fixed size:</span>
                  <span className="font-medium text-red-600 dark:text-red-400">~150KB</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3">
            Responsive Images Best Practices
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Implementation:</h4>
              <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                <li>• Always provide a base src for fallback</li>
                <li>• Use appropriate breakpoints in srcSet</li>
                <li>• Include sizes attribute for optimal selection</li>
                <li>• Consider art direction for different viewports</li>
                <li>• Test across different devices and connections</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Performance:</h4>
              <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                <li>• Generate multiple sizes during build process</li>
                <li>• Use WebP/AVIF formats when supported</li>
                <li>• Implement lazy loading for below-fold images</li>
                <li>• Monitor Core Web Vitals metrics</li>
                <li>• Use CDN with automatic image optimization</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
