import { Image } from '../../../../nebula/components'

export function BasicUsageSection() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Basic Usage
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Basic implementation examples for the Image component with different configurations and use cases.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Default Configuration
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Basic image with default settings - medium size, lazy loading enabled.
          </p>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <Image
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300"
              alt="Beautiful mountain landscape"
            />
          </div>
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <code className="text-sm text-gray-800 dark:text-gray-200">
{`<Image
  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300"
  alt="Beautiful mountain landscape"
/>`}
            </code>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            With Placeholder
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Image with a base64 placeholder that shows while the main image loads.
          </p>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <Image
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300"
              alt="Forest path with placeholder"
              placeholder="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNGM0Y0RjYiLz48dGV4dCB4PSIyMDAiIHk9IjE1MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2QjdCODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlBsYWNlaG9sZGVyPC90ZXh0Pjwvc3ZnPgo="
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Progressive Loading
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Image with low-quality placeholder that loads first, then gets replaced with high-quality version.
          </p>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <Image
              src="https://images.unsplash.com/photo-1502780402662-acc01917e9e6?w=800&h=600&q=80"
              alt="Ocean waves with progressive loading"
              lowQualitySrc="https://images.unsplash.com/photo-1502780402662-acc01917e9e6?w=100&h=75&q=20"
              size="lg"
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Immediate Loading
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Image with lazy loading disabled - loads immediately without waiting for viewport intersection.
          </p>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <Image
              src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=300"
              alt="Desert landscape - immediate loading"
              lazy={false}
              loading="eager"
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Custom Styling
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Image with custom CSS classes and styling applied.
          </p>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <Image
              src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=300"
              alt="Arctic landscape with custom styling"
              className="rounded-full border-4 border-blue-500 shadow-lg"
              size="md"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
