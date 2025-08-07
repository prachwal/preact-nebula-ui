import { Image } from '../../../../nebula/components'

export function SizesSection() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Size Variants
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          The Image component supports five predefined size variants for consistent sizing across your application.
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            All Size Variants
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                <Image
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200"
                  alt="Small mountain"
                  size="sm"
                />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Small (sm)</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">64×64px (w-16 h-16)</p>
                <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">size="sm"</code>
              </div>
            </div>

            <div className="space-y-2">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                <Image
                  src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=300"
                  alt="Medium forest"
                  size="md"
                />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Medium (md)</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">128×128px (w-32 h-32)</p>
                <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">size="md"</code>
              </div>
            </div>

            <div className="space-y-2">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                <Image
                  src="https://images.unsplash.com/photo-1502780402662-acc01917e9e6?w=400&h=400"
                  alt="Large ocean"
                  size="lg"
                />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Large (lg)</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">256×256px (w-64 h-64)</p>
                <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">size="lg"</code>
              </div>
            </div>

            <div className="space-y-2">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                <Image
                  src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=500&h=500"
                  alt="Extra large desert"
                  size="xl"
                />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Extra Large (xl)</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">384×384px (w-96 h-96)</p>
                <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">size="xl"</code>
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <Image
                  src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=400"
                  alt="Full width arctic"
                  size="full"
                  className="max-h-48 object-cover"
                />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Full (full)</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">100%×100% (w-full h-full)</p>
                <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">size="full"</code>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Use Cases by Size
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">Small & Medium</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Image
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                    alt="Profile avatar"
                    size="sm"
                    className="rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Profile Avatar</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Small size for user avatars</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Image
                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=150&fit=crop"
                    alt="Thumbnail"
                    size="md"
                    className="rounded"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Image Thumbnail</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Medium size for galleries</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">Large & Full</h4>
              <div className="space-y-3">
                <div>
                  <Image
                    src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=200&fit=crop"
                    alt="Hero image"
                    size="full"
                    className="w-full h-24 object-cover rounded"
                  />
                  <p className="text-sm font-medium text-gray-900 dark:text-white mt-2">Hero Banner</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Full width for hero sections</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Custom Sizing
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            While predefined sizes cover most use cases, you can override with custom classes.
          </p>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <Image
                  src="https://images.unsplash.com/photo-1502780402662-acc01917e9e6?w=200&h=300&fit=crop"
                  alt="Portrait aspect ratio"
                  size="full"
                  className="w-32 h-48 object-cover rounded"
                />
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Portrait (2:3)</p>
              </div>
              <div className="text-center">
                <Image
                  src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=300&h=200&fit=crop"
                  alt="Landscape aspect ratio"
                  size="full"
                  className="w-48 h-32 object-cover rounded"
                />
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Landscape (3:2)</p>
              </div>
              <div className="text-center">
                <Image
                  src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=200&h=200&fit=crop"
                  alt="Square aspect ratio"
                  size="full"
                  className="w-32 h-32 object-cover rounded-full"
                />
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Circle (1:1)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
