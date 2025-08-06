import { useState } from 'preact/hooks'
import { Image } from '../../../../nebula/components/Image'

export function ImageLazy() {
  const [showMore, setShowMore] = useState(false)

  const images = [
    {
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300",
      alt: "Mountain landscape",
      placeholder: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNGM0Y0RjYiLz48L3N2Zz4="
    },
    {
      src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300",
      alt: "Forest path",
      placeholder: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNGM0Y0RjYiLz48L3N2Zz4="
    },
    {
      src: "https://images.unsplash.com/photo-1502780402662-acc01917e9e6?w=400&h=300",
      alt: "Ocean waves",
      placeholder: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNGM0Y0RjYiLz48L3N2Zz4="
    },
    {
      src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=300",
      alt: "Desert landscape"
    },
    {
      src: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=300",
      alt: "Arctic ice"
    },
    {
      src: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=300",
      alt: "Tropical beach"
    }
  ]

  const additionalImages = [
    {
      src: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300",
      alt: "Waterfall"
    },
    {
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300",
      alt: "Canyon"
    },
    {
      src: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&h=300",
      alt: "Prairie"
    },
    {
      src: "https://images.unsplash.com/photo-1464822759844-d150ad6d9bd6?w=400&h=300",
      alt: "Snow mountain"
    }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Lazy Loading Demo</h3>
        <p className="text-gray-600 mb-4">
          Scroll down to see images load as they come into view. Open browser dev tools 
          to see network requests being made only when images become visible.
        </p>
      </div>

      <div>
        <h4 className="font-medium mb-4">Initial Images (Lazy Loading Enabled)</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div key={index} className="space-y-2">
              <Image
                src={image.src}
                alt={image.alt}
                size="md"
                lazy={true}
                placeholder={image.placeholder}
                className="w-full"
              />
              <p className="text-sm text-gray-500 text-center">{image.alt}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-4">Progressive Loading Example</h4>
        <p className="text-gray-600 mb-4">
          Images with low quality placeholder that loads first, then replaced by high quality version.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&q=80"
            alt="High quality mountain"
            size="lg"
            lazy={true}
            lowQualitySrc="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=75&q=20"
            placeholder="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNGM0Y0RjYiLz48L3N2Zz4="
          />
          <Image
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&q=80"
            alt="High quality forest"
            size="lg"
            lazy={true}
            lowQualitySrc="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=100&h=75&q=20"
          />
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-4">Eager Loading (No Lazy Loading)</h4>
        <p className="text-gray-600 mb-4">
          These images load immediately without waiting for viewport intersection.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Image
            src="https://images.unsplash.com/photo-1502780402662-acc01917e9e6?w=400&h=300"
            alt="Ocean waves - eager loading"
            size="md"
            lazy={false}
          />
          <Image
            src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=300"
            alt="Desert - eager loading"
            size="md"
            lazy={false}
          />
        </div>
      </div>

      <div className="space-y-4">
        <button
          onClick={() => setShowMore(!showMore)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          {showMore ? 'Hide Additional Images' : 'Load More Images'}
        </button>

        {showMore && (
          <div>
            <h4 className="font-medium mb-4">Additional Images (Dynamically Loaded)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {additionalImages.map((image, index) => (
                <div key={index} className="space-y-2">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    size="md"
                    lazy={true}
                    className="w-full"
                  />
                  <p className="text-sm text-gray-500 text-center">{image.alt}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-16 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h4 className="font-medium mb-2">Performance Notes:</h4>
        <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
          <li>• Lazy loading reduces initial page load time</li>
          <li>• Images only load when they come into viewport</li>
          <li>• Progressive loading shows low-quality placeholder first</li>
          <li>• Use browser dev tools to monitor network requests</li>
          <li>• Intersection Observer API provides smooth lazy loading</li>
        </ul>
      </div>
    </div>
  )
}
