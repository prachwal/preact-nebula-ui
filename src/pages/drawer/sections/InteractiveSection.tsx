import { useState } from 'preact/hooks'
import { Drawer, Button, Input } from '../../../../nebula/components'

export function InteractiveSection() {
  const [isOpen, setIsOpen] = useState(false)
  const [persistentDrawer, setPersistentDrawer] = useState(true)
  const [title, setTitle] = useState('Interactive Drawer')

  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Interactive Features
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Interactive drawer with customizable content and settings.
        </p>
      </div>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Drawer Title
          </label>
          <Input
            value={title}
            onChange={(e) => setTitle((e.target as HTMLInputElement).value)}
            placeholder="Enter drawer title"
          />
        </div>
        
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={persistentDrawer}
              onChange={(e) => setPersistentDrawer(e.currentTarget.checked)}
              className="mr-2"
            />
            Persistent (no overlay)
          </label>
        </div>
        
        <Button onClick={() => setIsOpen(true)}>
          Open Interactive Drawer
        </Button>
      </div>

      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position="right"
      >
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            This drawer demonstrates interactive features and customizable content.
          </p>
          <div className="space-y-4">
            <Input placeholder="Type something here..." />
            <div className="flex space-x-2">
              <Button size="sm">Action 1</Button>
              <Button size="sm" variant="secondary">Action 2</Button>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
            <Button onClick={() => setIsOpen(false)}>Close Drawer</Button>
          </div>
        </div>
      </Drawer>
    </section>
  )
}
