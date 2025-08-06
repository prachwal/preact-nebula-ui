import { Image } from '../../../../nebula/components/Image'

export function ImageBasic() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Basic Image</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300"
            alt="Mountain landscape"
            size="md"
          />
          <Image
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300"
            alt="Forest path"
            size="md"
          />
          <Image
            src="https://images.unsplash.com/photo-1502780402662-acc01917e9e6?w=400&h=300"
            alt="Ocean waves"
            size="md"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Different Sizes</h3>
        <div className="flex flex-wrap items-end gap-4">
          <div className="text-center">
            <Image
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200"
              alt="Small mountain"
              size="sm"
            />
            <p className="text-sm text-gray-600 mt-2">Small (sm)</p>
          </div>
          <div className="text-center">
            <Image
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300"
              alt="Medium mountain"
              size="md"
            />
            <p className="text-sm text-gray-600 mt-2">Medium (md)</p>
          </div>
          <div className="text-center">
            <Image
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400"
              alt="Large mountain"
              size="lg"
            />
            <p className="text-sm text-gray-600 mt-2">Large (lg)</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">With Placeholder</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300"
            alt="Mountain with placeholder"
            size="lg"
            placeholder="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTUwQzIwMCAxNjEuMDQ2IDE5MS4wNDYgMTcwIDE4MCAxNzBDMTY4Ljk1NCAxNzAgMTYwIDE2MS4wNDYgMTYwIDE1MEMxNjAgMTM4Ljk1NCAxNjguOTU0IDEzMCAxODAgMTMwQzE5MS4wNDYgMTMwIDIwMCAxMzguOTU0IDIwMCAxNTBaIiBmaWxsPSIjOUI5QkExIi8+Cjwvc3ZnPgo="
          />
          <Image
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300"
            alt="Forest without placeholder"
            size="lg"
          />
        </div>
      </div>
    </div>
  )
}
