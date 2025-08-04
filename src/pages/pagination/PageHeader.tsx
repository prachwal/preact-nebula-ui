export function PageHeader() {
  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
        Pagination
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
        Navigate through paginated content with accessible controls, keyboard support, and flexible configuration options. 
        Perfect for data tables, search results, and content lists.
      </p>
      
      <div className="flex flex-wrap gap-2 text-sm">
        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full font-medium">
          Navigation Component
        </span>
        <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full font-medium">
          Fully Accessible
        </span>
        <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full font-medium">
          Keyboard Support
        </span>
        <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-full font-medium">
          Responsive
        </span>
      </div>
    </div>
  )
}
