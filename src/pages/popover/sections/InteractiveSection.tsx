import { Popover, Button } from '../../../../nebula/components'

export function InteractiveSection() {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Rich Content
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Popovers can contain complex layouts with images, forms, lists, and interactive elements.
        </p>
      </div>
      
      <div className="flex flex-wrap gap-6">
        <Popover
          trigger={<Button>User Profile</Button>}
          position="bottom-start"
        >
          <div className="w-64">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                JD
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">John Doe</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">john@example.com</p>
              </div>
            </div>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                View Profile
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                Account Settings
              </button>
              <hr className="border-gray-200 dark:border-gray-600" />
              <button className="w-full text-left px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                Sign Out
              </button>
            </div>
          </div>
        </Popover>

        <Popover
          trigger={<Button variant="outline">Shopping Cart</Button>}
          position="bottom-end"
        >
          <div className="w-80">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-900 dark:text-white">Shopping Cart</h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">3 items</span>
            </div>
            <div className="space-y-3 mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded"></div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">Product 1</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">$29.99</p>
                </div>
                <span className="text-sm text-gray-900 dark:text-white">×1</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded"></div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">Product 2</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">$19.99</p>
                </div>
                <span className="text-sm text-gray-900 dark:text-white">×2</span>
              </div>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
              <div className="flex justify-between items-center mb-3">
                <span className="font-medium text-gray-900 dark:text-white">Total:</span>
                <span className="font-bold text-gray-900 dark:text-white">$69.97</span>
              </div>
              <div className="space-y-2">
                <Button size="sm" className="w-full">Checkout</Button>
                <Button size="sm" variant="outline" className="w-full">View Cart</Button>
              </div>
            </div>
          </div>
        </Popover>

        <Popover
          trigger={<Button variant="ghost">Quick Actions</Button>}
        >
          <div className="w-56">
            <h3 className="font-medium text-gray-900 dark:text-white mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              <button className="p-3 text-center text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                <div className="text-lg mb-1">📝</div>
                New Note
              </button>
              <button className="p-3 text-center text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                <div className="text-lg mb-1">📁</div>
                New Folder
              </button>
              <button className="p-3 text-center text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                <div className="text-lg mb-1">🖼️</div>
                Upload Image
              </button>
              <button className="p-3 text-center text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                <div className="text-lg mb-1">⚙️</div>
                Settings
              </button>
            </div>
          </div>
        </Popover>
      </div>
    </section>
  )
}
