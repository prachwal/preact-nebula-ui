import { BackTop } from '../../../../nebula'
import { PageHeader } from '../../../components/layout'
import { SearchPanel, DocumentationSidebar, DocumentationContent } from '.'
import type { SearchPanelProps, DocumentationSidebarProps, DocumentationContentProps } from '.'

export interface DocumentationLayoutProps extends
    Pick<SearchPanelProps, 'searchQuery' | 'onSearchChange' | 'totalFiles' | 'filteredCount' | 'documentTitle' | 'onResetFilters'>,
    Pick<DocumentationSidebarProps, 'data' | 'selectedKeys' | 'expandedKeys' | 'onSelect' | 'onExpand'>,
    Pick<DocumentationContentProps, 'loading' | 'selectedFile' | 'groupedFiles'> {
    title: string
    description: string
}

export function DocumentationLayout({
    title,
    description,
    // Search props
    searchQuery,
    onSearchChange,
    totalFiles,
    filteredCount,
    documentTitle,
    onResetFilters,
    // Sidebar props
    data,
    selectedKeys,
    expandedKeys,
    onSelect,
    onExpand,
    // Content props
    loading,
    selectedFile,
    groupedFiles
}: Readonly<DocumentationLayoutProps>) {
    return (
        <div className="docs-page relative min-h-screen bg-gray-50 dark:bg-gray-900">
            <PageHeader
                title={title}
                description={description}
            />

            <SearchPanel
                searchQuery={searchQuery}
                onSearchChange={onSearchChange}
                totalFiles={totalFiles}
                filteredCount={filteredCount}
                documentTitle={documentTitle}
                onResetFilters={onResetFilters}
            />

            <div className="max-w-7xl mx-auto px-4 py-8 mt-4">
                <div className="grid grid-cols-12 gap-6">
                    {/* Sidebar */}
                    <aside className="col-span-12 lg:col-span-3">
                        <div className="sticky top-32">
                            <DocumentationSidebar
                                data={data}
                                selectedKeys={selectedKeys}
                                expandedKeys={expandedKeys}
                                onSelect={onSelect}
                                onExpand={onExpand}
                            />
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="col-span-12 lg:col-span-9">
                        <DocumentationContent
                            loading={loading}
                            selectedFile={selectedFile}
                            groupedFiles={groupedFiles}
                        />
                    </main>
                </div>
            </div>

            {/* Back to Top Button */}
            <BackTop
                visibilityHeight={400}
                duration={800}
                style={{
                    right: '32px',
                    bottom: '32px'
                }}
            />
        </div>
    )
}
