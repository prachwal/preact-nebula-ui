import { useState } from 'preact/hooks'
import { Rating } from '../../../../nebula'

export function CustomIconsSection() {
  const [value, setValue] = useState(3)

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Custom Icons</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Heart Icons</label>
            <Rating 
              value={value} 
              onChange={setValue}
              icon="❤️"
              emptyIcon="🤍"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Custom Rating Scale</label>
            <Rating 
              defaultValue={2}
              max={3}
              icon="🔥"
              emptyIcon="⚪"
              readOnly
            />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">3-point scale with fire icons</p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Food Rating</label>
            <Rating 
              defaultValue={4}
              icon="🍕"
              emptyIcon="🍽️"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Movie Rating</label>
            <Rating 
              defaultValue={3}
              icon="🎬"
              emptyIcon="📽️"
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  )
}
