import { useState } from 'preact/hooks'
import { Pagination } from '../../../../nebula/components'

export function InteractiveSection() {
  const [currentPage, setCurrentPage] = useState(5)
  const [totalPages, setTotalPages] = useState(20)
  const [pageSize, setPageSize] = useState(10)
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md')
  const [showTotalItems, setShowTotalItems] = useState(true)
  const [showPageSizeSelector, setShowPageSizeSelector] = useState(true)
  const [showQuickJump, setShowQuickJump] = useState(false)
  const [showFirstLast, setShowFirstLast] = useState(false)
  const [showPrevNext, setShowPrevNext] = useState(true)
  const [compact, setCompact] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const totalItems = totalPages * pageSize

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Interactive Demo
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Customize the pagination component in real-time to see how different configurations affect its appearance and behavior.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls */}
          <div className="lg:col-span-1 space-y-6">
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                Controls
              </h3>

              {/* Current Page */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Current Page: {currentPage}
                </label>
                <input
                  type="range"
                  min="1"
                  max={totalPages}
                  value={currentPage}
                  onChange={(e) => setCurrentPage(Number(e.currentTarget.value))}
                  className="w-full"
                />
              </div>

              {/* Total Pages */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Total Pages: {totalPages}
                </label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={totalPages}
                  onChange={(e) => {
                    const newTotal = Number(e.currentTarget.value)
                    setTotalPages(newTotal)
                    if (currentPage > newTotal) {
                      setCurrentPage(newTotal)
                    }
                  }}
                  className="w-full"
                />
              </div>

              {/* Page Size */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Page Size
                </label>
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.currentTarget.value))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>

              {/* Size */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Size
                </label>
                <select
                  value={size}
                  onChange={(e) => setSize(e.currentTarget.value as 'sm' | 'md' | 'lg')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="sm">Small</option>
                  <option value="md">Medium</option>
                  <option value="lg">Large</option>
                </select>
              </div>
            </div>

            {/* Feature Toggles */}
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                Features
              </h3>

              {[
                { key: 'showTotalItems', label: 'Show Total Items', value: showTotalItems, setter: setShowTotalItems },
                { key: 'showPageSizeSelector', label: 'Page Size Selector', value: showPageSizeSelector, setter: setShowPageSizeSelector },
                { key: 'showQuickJump', label: 'Quick Jump', value: showQuickJump, setter: setShowQuickJump },
                { key: 'showFirstLast', label: 'First/Last Buttons', value: showFirstLast, setter: setShowFirstLast },
                { key: 'showPrevNext', label: 'Previous/Next Buttons', value: showPrevNext, setter: setShowPrevNext },
                { key: 'compact', label: 'Compact Layout', value: compact, setter: setCompact },
                { key: 'disabled', label: 'Disabled', value: disabled, setter: setDisabled }
              ].map(({ key, label, value, setter }) => (
                <label key={key} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setter(e.currentTarget.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="lg:col-span-2">
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-6">
                Live Preview
              </h3>
              
              <div className="flex justify-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={showTotalItems ? totalItems : undefined}
                  pageSize={pageSize}
                  size={size}
                  showPageSizeSelector={showPageSizeSelector}
                  showQuickJump={showQuickJump}
                  showFirstLast={showFirstLast}
                  showPrevNext={showPrevNext}
                  showTotalItems={showTotalItems}
                  compact={compact}
                  disabled={disabled}
                  pageSizeOptions={[5, 10, 20, 50, 100]}
                  onPageChange={setCurrentPage}
                  onPageSizeChange={showPageSizeSelector ? setPageSize : undefined}
                />
              </div>

              {/* Generated Props */}
              <div className="mt-6">
                <h4 className="text-md font-medium text-gray-900 dark:text-gray-100 mb-3">
                  Generated Code
                </h4>
                <div className="p-4 bg-gray-900 dark:bg-gray-800 rounded-lg overflow-x-auto">
                  <pre className="text-sm text-gray-100">
                    <code>{`<Pagination
  currentPage={${currentPage}}
  totalPages={${totalPages}}${showTotalItems ? `
  totalItems={${totalItems}}` : ''}${pageSize !== 10 ? `
  pageSize={${pageSize}}` : ''}${size !== 'md' ? `
  size="${size}"` : ''}${showPageSizeSelector ? `
  showPageSizeSelector={true}` : ''}${showQuickJump ? `
  showQuickJump={true}` : ''}${showFirstLast ? `
  showFirstLast={true}` : ''}${!showPrevNext ? `
  showPrevNext={false}` : ''}${!showTotalItems ? `
  showTotalItems={false}` : ''}${compact ? `
  compact={true}` : ''}${disabled ? `
  disabled={true}` : ''}${showPageSizeSelector ? `
  pageSizeOptions={[5, 10, 20, 50, 100]}` : ''}
  onPageChange={setCurrentPage}${showPageSizeSelector ? `
  onPageSizeChange={setPageSize}` : ''}
/>`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
