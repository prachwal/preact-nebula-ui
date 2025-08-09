import { useState } from 'preact/hooks'
import { Input, Button, Badge } from '../../../../nebula'

// Define icons as simple SVG components
const SearchIcon = ({ className }: { className?: string }) => (
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className={className}>
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
    </svg>
)

const FilterIcon = ({ className }: { className?: string }) => (
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className={className}>
        <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
    </svg>
)

export interface SearchPanelProps {
    searchQuery: string
    onSearchChange: (query: string) => void
    totalFiles: number
    filteredCount: number
    documentTitle?: string
    onResetFilters?: () => void
}

export function SearchPanel({
    searchQuery,
    onSearchChange,
    totalFiles,
    filteredCount,
    documentTitle,
    onResetFilters
}: Readonly<SearchPanelProps>) {
    const [isFocused, setIsFocused] = useState(false)

    return (
        <>
            {/* Modern Search Panel */}
            <div className="sticky top-16 bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700 p-4 z-30 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        {/* Search Input */}
                        <div className="flex-1 max-w-2xl w-full">
                            <div className="relative group">
                                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                <Input
                                    size="lg"
                                    placeholder="Search documentation... (try: 'checkbox', 'form', 'milestone')"
                                    value={searchQuery}
                                    onChange={(e) => onSearchChange((e.target as HTMLInputElement).value)}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                    className={`pl-10 transition-all duration-300 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 ${isFocused ? 'shadow-lg' : 'shadow-sm'
                                        }`}
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => onSearchChange('')}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                        title="Clear search"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Stats and Actions */}
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600 dark:text-gray-300">Results:</span>
                                <Badge variant={filteredCount === totalFiles ? 'primary' : 'warning'}>
                                    {filteredCount} / {totalFiles}
                                </Badge>
                            </div>

                            {searchQuery && (
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={onResetFilters}
                                    className="whitespace-nowrap"
                                >
                                    <FilterIcon className="mr-1 h-4 w-4" />
                                    Reset
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Active Document Indicator */}
                    {documentTitle && (
                        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-full">
                                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                                        📖 {documentTitle}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
