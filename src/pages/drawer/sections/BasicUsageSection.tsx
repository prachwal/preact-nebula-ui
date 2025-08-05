import { useState } from 'preact/hooks'
import { Drawer, Button } from '../../../../nebula/components'

export function BasicUsageSection() {
  const [leftOpen, setLeftOpen] = useState(false)
  const [rightOpen, setRightOpen] = useState(false)
  const [topOpen, setTopOpen] = useState(false)
  const [bottomOpen, setBottomOpen] = useState(false)

  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Basic Usage
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Simple drawers with different positions and smooth slide animations.
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button onClick={() => setLeftOpen(true)}>
          Left Drawer
        </Button>
        <Button onClick={() => setRightOpen(true)}>
          Right Drawer
        </Button>
        <Button onClick={() => setTopOpen(true)}>
          Top Drawer
        </Button>
        <Button onClick={() => setBottomOpen(true)}>
          Bottom Drawer
        </Button>
      </div>

      {/* Left Drawer */}
      <Drawer
        isOpen={leftOpen}
        onClose={() => setLeftOpen(false)}
        position="left"
      >
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Left Drawer
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            This drawer slides in from the left side. It includes proper focus management and smooth animations.
          </p>
          <Button onClick={() => setLeftOpen(false)}>Close</Button>
        </div>
      </Drawer>

      {/* Right Drawer */}
      <Drawer
        isOpen={rightOpen}
        onClose={() => setRightOpen(false)}
        position="right"
      >
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Right Drawer
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            This drawer slides in from the right side. Perfect for navigation menus or settings panels.
          </p>
          <Button onClick={() => setRightOpen(false)}>Close</Button>
        </div>
      </Drawer>

      {/* Top Drawer */}
      <Drawer
        isOpen={topOpen}
        onClose={() => setTopOpen(false)}
        position="top"
      >
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Top Drawer
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            This drawer slides down from the top. Great for notifications or important announcements.
          </p>
          <Button onClick={() => setTopOpen(false)}>Close</Button>
        </div>
      </Drawer>

      {/* Bottom Drawer */}
      <Drawer
        isOpen={bottomOpen}
        onClose={() => setBottomOpen(false)}
        position="bottom"
      >
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Bottom Drawer
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            This drawer slides up from the bottom. Commonly used on mobile for action sheets.
          </p>
          <Button onClick={() => setBottomOpen(false)}>Close</Button>
        </div>
      </Drawer>
    </section>
  )
}
