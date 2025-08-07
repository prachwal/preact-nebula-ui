import { useState } from 'preact/hooks'
import { Pagination } from '../../../../nebula/components'

export function BasicUsageSection() {
  const [currentPage, setCurrentPage] = useState(1)
  const [currentPage2, setCurrentPage2] = useState(1)
  const [currentPage3, setCurrentPage3] = useState(1)

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Basic Usage
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Simple pagination with minimal configuration. Just provide the current page, total pages, and page change handler.
        </p>

        <div className="space-y-6">
          {/* Basic Example */}
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
              Basic Pagination
            </h3>
            <div className="flex justify-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Pagination
                currentPage={currentPage}
                totalPages={10}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>

          {/* With Total Items */}
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
              With Total Items Count
            </h3>
            <div className="flex justify-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Pagination
                currentPage={currentPage2}
                totalPages={25}
                totalItems={250}
                onPageChange={setCurrentPage2}
              />
            </div>
          </div>

          {/* With First/Last Buttons */}
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
              With First/Last Navigation
            </h3>
            <div className="flex justify-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Pagination
                currentPage={currentPage3}
                totalPages={15}
                totalItems={150}
                showFirstLast={true}
                onPageChange={setCurrentPage3}
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
                <code>{`// Basic pagination
import { Pagination } from 'preact-nebula-ui'

function DataList() {
  const [currentPage, setCurrentPage] = useState(1)
  
  return (
    <Pagination
      currentPage={currentPage}
      totalPages={10}
      onPageChange={setCurrentPage}
    />
  )
}`}</code>
              </pre>
            </div>

            <div className="p-4 bg-gray-900 dark:bg-gray-800 rounded-lg overflow-x-auto">
              <pre className="text-sm text-gray-100">
                <code>{`// With total items and first/last buttons
<Pagination
  currentPage={currentPage}
  totalPages={25}
  totalItems={250}
  showFirstLast={true}
  onPageChange={setCurrentPage}
/>`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
