import { Image } from '../../../../nebula/components/Image'

export function ImageZoom() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Zoom Enabled</h3>
        <p className="text-gray-600 mb-4">
          Click and drag to pan, scroll to zoom, or double-click to zoom in/out.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-2">Default Zoom Settings</h4>
            <Image
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400"
              alt="Mountain landscape with zoom"
              size="lg"
              zoom={true}
            />
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Custom Zoom Configuration</h4>
            <Image
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400"
              alt="Forest with custom zoom"
              size="lg"
              zoom={{
                enabled: true,
                maxZoom: 5,
                minZoom: 0.5,
                step: 0.3,
                wheelZoom: true,
                doubleClickZoom: true,
                pinchZoom: false
              }}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Zoom Disabled</h3>
        <p className="text-gray-600 mb-4">
          These images have zoom functionality disabled.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Image
            src="https://images.unsplash.com/photo-1502780402662-acc01917e9e6?w=600&h=400"
            alt="Ocean waves without zoom"
            size="lg"
            zoom={false}
          />
          <Image
            src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=400"
            alt="Desert landscape without zoom"
            size="lg"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">High Resolution Examples</h3>
        <p className="text-gray-600 mb-4">
          High resolution images perfect for detailed viewing with zoom.
        </p>
        <div className="grid grid-cols-1 gap-6">
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600"
            alt="High resolution mountain panorama"
            size="full"
            zoom={{
              enabled: true,
              maxZoom: 4,
              step: 0.2,
              wheelZoom: true,
              doubleClickZoom: true
            }}
            className="max-h-96"
          />
        </div>
      </div>
    </div>
  )
}
