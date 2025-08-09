import { useState } from 'preact/hooks'
import { Input, Button, Badge, Affix } from '../../../../nebula'

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
            {/* Main Search Panel */}
            <Affix offsetTop={64} target={() => window}>
                <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 p-6 z-30">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center justify-between gap-6">
                            <div className="flex-1 max-w-2xl">
                                <div className="relative">
                                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <Input
                                        size="md"
                                        placeholder="Search documentation... (try: 'forms', 'layout', 'milestone')"
                                        value={searchQuery}
                                        onChange={(e) => onSearchChange((e.target as HTMLInputElement).value)}
                                        onFocus={() => setIsFocused(true)}
                                        onBlur={() => setIsFocused(false)}
                                        className={`pl-10 transition-all duration-300 ${isFocused ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
                                            }`}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-sm text-gray-600 dark:text-gray-300">
                                    <Badge>
                                        {filteredCount} of {totalFiles} docs
                                    </Badge>
                                </div>
                                {searchQuery && (
                                    <Button
                                        size="md"
                                        onClick={onResetFilters}
                                        title="Reset Filters"
                                    >
                                        <FilterIcon className="mr-2" />
                                        Reset Filters
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Affix>

            {/* Floating Document Title */}
            {documentTitle && (
                <Affix offsetTop={200} target={() => window}>
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 mb-4 z-40 inline-block">
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
                                <span className="font-medium text-gray-900 dark:text-white text-sm">
                                    📖 {documentTitle}
                                </span>
                                <Badge>{`${filteredCount}/${totalFiles}`}</Badge>
                            </div>
                        </div>
                    </div>
                </Affix>
            )}
        </>
    )
}
