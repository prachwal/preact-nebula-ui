import { useState } from 'preact/hooks'
import { Pagination } from '../../../../nebula/components'

export function AccessibilitySection() {
  const [currentPage, setCurrentPage] = useState(5)
  const [keyboardPage, setKeyboardPage] = useState(8)

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Accessibility Features
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The Pagination component is built with accessibility in mind, following WCAG guidelines and providing comprehensive keyboard support.
        </p>

        <div className="space-y-8">
          {/* ARIA Labels and Structure */}
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-4">
              ARIA Labels and Semantic Structure
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              The component uses proper semantic HTML and ARIA attributes for screen reader accessibility.
            </p>
            
            <div className="flex justify-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mb-4">
              <Pagination
                currentPage={currentPage}
                totalPages={15}
                totalItems={150}
                showFirstLast={true}
                ariaLabel="Product listing pagination"
                onPageChange={setCurrentPage}
              />
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                Accessibility Features:
              </h4>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>• Uses semantic <code>&lt;nav&gt;</code> element with role="navigation"</li>
                <li>• Current page marked with <code>aria-current="page"</code></li>
                <li>• Each button has descriptive <code>aria-label</code></li>
                <li>• Live region announces page changes to screen readers</li>
                <li>• Form controls have proper labels and associations</li>
                <li>• Focus management with visible focus indicators</li>
              </ul>
            </div>
          </div>

          {/* Keyboard Navigation */}
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-4">
              Keyboard Navigation
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Full keyboard support for navigation. Click in the pagination area below and try the keyboard shortcuts.
            </p>
            
            <div className="flex justify-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mb-4">
              <Pagination
                currentPage={keyboardPage}
                totalPages={20}
                totalItems={400}
                showQuickJump={true}
                showFirstLast={true}
                onPageChange={setKeyboardPage}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Keyboard Shortcuts
                </h4>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li><kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">←</kbd> Previous page</li>
                  <li><kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">→</kbd> Next page</li>
                  <li><kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">Home</kbd> First page</li>
                  <li><kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">End</kbd> Last page</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Focus Management
                </h4>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li><kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">Tab</kbd> Navigate through controls</li>
                  <li><kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">Space</kbd> Activate buttons</li>
                  <li><kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">Enter</kbd> Submit forms</li>
                  <li>Visible focus indicators on all interactive elements</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Custom Labels */}
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-4">
              Custom Labels for Internationalization
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              All text labels can be customized to support different languages and contexts.
            </p>
            
            <div className="flex justify-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mb-4">
              <Pagination
                currentPage={3}
                totalPages={10}
                totalItems={100}
                showFirstLast={true}
                showPageSizeSelector={true}
                showQuickJump={true}
                ariaLabel="Navegación de paginación"
                labels={{
                  previous: 'Anterior',
                  next: 'Siguiente',
                  first: 'Primero',
                  last: 'Último',
                  jumpTo: 'Saltar a página',
                  pageSize: 'Elementos por página',
                  totalItems: '100 elementos en total'
                }}
                onPageChange={() => {}}
                onPageSizeChange={() => {}}
              />
            </div>

            <div className="p-4 bg-gray-900 dark:bg-gray-800 rounded-lg overflow-x-auto">
              <pre className="text-sm text-gray-100">
                <code>{`<Pagination
  currentPage={3}
  totalPages={10}
  showFirstLast={true}
  ariaLabel="Navegación de paginación"
  labels={{
    previous: 'Anterior',
    next: 'Siguiente',
    first: 'Primero',
    last: 'Último',
    jumpTo: 'Saltar a página',
    pageSize: 'Elementos por página',
    totalItems: '100 elementos en total'
  }}
  onPageChange={handlePageChange}
/>`}</code>
              </pre>
            </div>
          </div>

          {/* Screen Reader Announcements */}
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-4">
              Screen Reader Support
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              The component includes live regions that announce page changes to screen readers.
            </p>
            
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">
                Screen Reader Features:
              </h4>
              <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
                <li>• Live region announces "Page X of Y" when page changes</li>
                <li>• Button labels include page numbers and states</li>
                <li>• Form controls have associated labels</li>
                <li>• Navigation structure is properly identified</li>
                <li>• Disabled states are announced</li>
                <li>• Current page state is clearly identified</li>
              </ul>
            </div>
          </div>

          {/* Testing with Screen Readers */}
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-4">
              Testing Guidelines
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Tips for testing pagination accessibility with assistive technologies.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900 dark:text-gray-100">
                  Screen Reader Testing
                </h4>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>• Test with NVDA, JAWS, or VoiceOver</li>
                  <li>• Verify page announcements work</li>
                  <li>• Check button labels are descriptive</li>
                  <li>• Ensure form controls are properly labeled</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900 dark:text-gray-100">
                  Keyboard Testing
                </h4>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>• All functions accessible via keyboard</li>
                  <li>• Focus indicators are visible</li>
                  <li>• Tab order is logical</li>
                  <li>• No keyboard traps</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
