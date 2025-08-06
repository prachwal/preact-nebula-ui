import { Image } from '../../../../nebula/components/Image'

export function ImageResponsive() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Responsive Images</h3>
        <p className="text-gray-600 mb-4">
          Examples demonstrating responsive image loading with srcSet and sizes attributes.
        </p>
      </div>

      <div>
        <h4 className="font-medium mb-4">Art Direction with srcSet</h4>
        <p className="text-gray-600 mb-4">
          Different image sizes loaded based on viewport width for optimal performance.
        </p>
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600"
          alt="Responsive mountain landscape"
          srcSet="
            https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200 400w,
            https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400 800w,
            https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600 1200w
          "
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          size="full"
          className="w-full max-w-4xl h-64 object-cover"
        />
      </div>

      <div>
        <h4 className="font-medium mb-4">Grid Layout with Responsive Images</h4>
        <p className="text-gray-600 mb-4">
          Images in a grid that adapt to different screen sizes.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Image
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400"
            alt="Forest landscape"
            srcSet="
              https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=200 300w,
              https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400 600w
            "
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            size="full"
            className="w-full h-48 object-cover"
          />
          <Image
            src="https://images.unsplash.com/photo-1502780402662-acc01917e9e6?w=600&h=400"
            alt="Ocean waves"
            srcSet="
              https://images.unsplash.com/photo-1502780402662-acc01917e9e6?w=300&h=200 300w,
              https://images.unsplash.com/photo-1502780402662-acc01917e9e6?w=600&h=400 600w
            "
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            size="full"
            className="w-full h-48 object-cover"
          />
          <Image
            src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=400"
            alt="Desert landscape"
            srcSet="
              https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=300&h=200 300w,
              https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=400 600w
            "
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            size="full"
            className="w-full h-48 object-cover"
          />
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-4">High DPI (Retina) Support</h4>
        <p className="text-gray-600 mb-4">
          Images optimized for high-resolution displays using pixel density descriptors.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500 mb-2">Standard resolution</p>
            <Image
              src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=300"
              alt="Standard resolution arctic landscape"
              size="lg"
            />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-2">High DPI optimized</p>
            <Image
              src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=300"
              alt="High DPI arctic landscape"
              srcSet="
                https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=300 1x,
                https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=600 2x,
                https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&h=900 3x
              "
              size="lg"
            />
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-4">Container Queries Example</h4>
        <p className="text-gray-600 mb-4">
          Images that respond to their container size rather than viewport size.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="w-full">
            <h5 className="text-sm font-medium mb-2">Large Container</h5>
            <div className="w-full">
              <Image
                src="https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=600"
                alt="Beach in large container"
                srcSet="
                  https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=300 400w,
                  https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=600 800w,
                  https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1200&h=900 1200w
                "
                sizes="100vw"
                size="full"
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
          
          <div className="w-full max-w-sm">
            <h5 className="text-sm font-medium mb-2">Small Container</h5>
            <div className="w-full">
              <Image
                src="https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=600"
                alt="Beach in small container"
                srcSet="
                  https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=300 400w,
                  https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=600 800w
                "
                sizes="(max-width: 400px) 100vw, 400px"
                size="full"
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-4">Aspect Ratio Preservation</h4>
        <p className="text-gray-600 mb-4">
          Different aspect ratios with responsive behavior.
        </p>
        <div className="space-y-6">
          <div>
            <h5 className="text-sm font-medium mb-2">Ultra-wide (21:9)</h5>
            <Image
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&h=600"
              alt="Ultra-wide mountain vista"
              srcSet="
                https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&h=300 700w,
                https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&h=600 1400w,
                https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2100&h=900 2100w
              "
              sizes="100vw"
              size="full"
              className="w-full aspect-[21/9] object-cover"
            />
          </div>
          
          <div>
            <h5 className="text-sm font-medium mb-2">Square (1:1)</h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Image
                  key={i}
                  src={`https://images.unsplash.com/photo-${
                    i === 1 ? '1441974231531-c6227db76b6e' :
                    i === 2 ? '1502780402662-acc01917e9e6' :
                    i === 3 ? '1518837695005-2083093ee35b' :
                    '1448375240586-882707db888b'
                  }?w=300&h=300&fit=crop`}
                  alt={`Square image ${i}`}
                  srcSet={`
                    https://images.unsplash.com/photo-${
                      i === 1 ? '1441974231531-c6227db76b6e' :
                      i === 2 ? '1502780402662-acc01917e9e6' :
                      i === 3 ? '1518837695005-2083093ee35b' :
                      '1448375240586-882707db888b'
                    }?w=150&h=150&fit=crop 150w,
                    https://images.unsplash.com/photo-${
                      i === 1 ? '1441974231531-c6227db76b6e' :
                      i === 2 ? '1502780402662-acc01917e9e6' :
                      i === 3 ? '1518837695005-2083093ee35b' :
                      '1448375240586-882707db888b'
                    }?w=300&h=300&fit=crop 300w
                  `}
                  sizes="(max-width: 768px) 50vw, 25vw"
                  size="full"
                  className="w-full aspect-square object-cover"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
        <h4 className="font-medium mb-2">Performance Benefits:</h4>
        <div className="text-sm text-green-700 dark:text-green-300 space-y-1">
          <p>• <strong>Bandwidth optimization:</strong> Load appropriate image sizes</p>
          <p>• <strong>Loading speed:</strong> Smaller images load faster on mobile</p>
          <p>• <strong>Quality scaling:</strong> High DPI displays get crisp images</p>
          <p>• <strong>Network efficiency:</strong> Avoid loading oversized images</p>
          <p>• <strong>User experience:</strong> Faster page loads improve engagement</p>
        </div>
      </div>
    </div>
  )
}
