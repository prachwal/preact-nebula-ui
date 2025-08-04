import { useState } from 'preact/hooks'
import { Pagination } from '../../../../nebula/components'

export function VariantsSection() {
  const [smallPage, setSmallPage] = useState(1)
  const [mediumPage, setMediumPage] = useState(1)
  const [largePage, setLargePage] = useState(1)
  const [compactPage, setCompactPage] = useState(1)
  const [pageSizePage, setPageSizePage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [quickJumpPage, setQuickJumpPage] = useState(1)

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Variants & Features
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Explore different sizes, layouts, and features available for the pagination component.
        </p>

        <div className="space-y-8">
          {/* Sizes */}
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100">
              Sizes
            </h3>
            
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                Small
              </h4>
              <div className="flex justify-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Pagination
                  size="sm"
                  currentPage={smallPage}
                  totalPages={8}
                  totalItems={80}
                  onPageChange={setSmallPage}
                />
              </div>
            </div>

            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                Medium (Default)
              </h4>
              <div className="flex justify-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Pagination
                  size="md"
                  currentPage={mediumPage}
                  totalPages={8}
                  totalItems={80}
                  onPageChange={setMediumPage}
                />
              </div>
            </div>

            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                Large
              </h4>
              <div className="flex justify-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Pagination
                  size="lg"
                  currentPage={largePage}
                  totalPages={8}
                  totalItems={80}
                  onPageChange={setLargePage}
                />
              </div>
            </div>
          </div>

          {/* Compact Mode */}
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-4">
              Compact Layout
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Stacks elements vertically for smaller screens or constrained spaces.
            </p>
            <div className="flex justify-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Pagination
                compact={true}
                currentPage={compactPage}
                totalPages={12}
                totalItems={120}
                showPageSizeSelector={true}
                pageSize={pageSize}
                onPageChange={setCompactPage}
                onPageSizeChange={setPageSize}
              />
            </div>
          </div>

          {/* Page Size Selector */}
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-4">
              Page Size Selector
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Allow users to change how many items are displayed per page.
            </p>
            <div className="flex justify-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Pagination
                currentPage={pageSizePage}
                totalPages={Math.ceil(500 / pageSize)}
                totalItems={500}
                pageSize={pageSize}
                showPageSizeSelector={true}
                pageSizeOptions={[10, 25, 50, 100]}
                onPageChange={setPageSizePage}
                onPageSizeChange={(newSize) => {
                  setPageSize(newSize)
                  setPageSizePage(1) // Reset to first page when page size changes
                }}
              />
            </div>
          </div>

          {/* Quick Jump */}
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-4">
              Quick Jump to Page
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Provide an input field for users to quickly jump to a specific page.
            </p>
            <div className="flex justify-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Pagination
                currentPage={quickJumpPage}
                totalPages={50}
                totalItems={1000}
                showQuickJump={true}
                showFirstLast={true}
                onPageChange={setQuickJumpPage}
              />
            </div>
          </div>
        </div>

        {/* Code Examples */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Code Examples
          </h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-gray-900 dark:bg-gray-800 rounded-lg overflow-x-auto">
              <pre className="text-sm text-gray-100">
                <code>{`// Different sizes
<Pagination size="sm" currentPage={1} totalPages={8} onPageChange={handlePageChange} />
<Pagination size="md" currentPage={1} totalPages={8} onPageChange={handlePageChange} />
<Pagination size="lg" currentPage={1} totalPages={8} onPageChange={handlePageChange} />

// Compact layout
<Pagination 
  compact={true}
  currentPage={page}
  totalPages={totalPages}
  onPageChange={setPage}
/>`}</code>
              </pre>
            </div>

            <div className="p-4 bg-gray-900 dark:bg-gray-800 rounded-lg overflow-x-auto">
              <pre className="text-sm text-gray-100">
                <code>{`// With page size selector and quick jump
<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  totalItems={totalItems}
  pageSize={pageSize}
  showPageSizeSelector={true}
  showQuickJump={true}
  showFirstLast={true}
  pageSizeOptions={[10, 25, 50, 100]}
  onPageChange={setCurrentPage}
  onPageSizeChange={setPageSize}
/>`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
