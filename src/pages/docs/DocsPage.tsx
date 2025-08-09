import { useState, useMemo } from 'preact/hooks'
import { DocumentationLayout } from './components'
import { useDocsMetadata } from '../../hooks/useDocsMetadata'
import type { TreeNode } from '../../../nebula/components/TreeView/types'
import type { DocFile } from '../../hooks/useDocsMetadata'

interface DocsPageProps {
    path?: string
}

export function DocsPage(_props: Readonly<DocsPageProps>) {
    const { loading: metadataLoading, error, allFiles } = useDocsMetadata()
    const [selectedFile, setSelectedFile] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [loading, setLoading] = useState(false)
    const [documentTitle, setDocumentTitle] = useState('')
    const [selectedTreeKeys, setSelectedTreeKeys] = useState<string[]>([])
    const [expandedTreeKeys, setExpandedTreeKeys] = useState<string[]>(['Components'])

    // Filter files based on search query
    const filteredFiles = useMemo(() => {
        if (!searchQuery) return allFiles

        return allFiles.filter(file =>
            file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            file.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            file.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        )
    }, [allFiles, searchQuery])

    // Group filtered files by category
    const groupedFiles = useMemo(() => {
        return filteredFiles.reduce((acc, file) => {
            if (!acc[file.category]) {
                acc[file.category] = []
            }
            acc[file.category].push(file)
            return acc
        }, {} as Record<string, DocFile[]>)
    }, [filteredFiles])

    const handleFileSelect = async (file: DocFile) => {
        setLoading(true)
        setSelectedFile(file.path)
        setDocumentTitle(file.name)
        setSelectedTreeKeys([file.path])

        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 300))
        setLoading(false)
    }

    const getCategoryIcon = (category: string) => {
        const icons: Record<string, string> = {
            'Components': '🧩',
            'Milestones': '🎯',
            'Project': '📚',
            'Reports': '📊',
            'Tests': '🐛',
            'Examples': '🧪',
            'Config': '⚙️'
        }
        return icons[category] || '❓'
    }

    const handleResetFilters = () => {
        setSearchQuery('')
    }

    // Generate tree data structure from grouped files
    const treeData: TreeNode[] = useMemo(() => {
        return Object.entries(groupedFiles).map(([category, files]) => ({
            key: category,
            title: category,
            icon: getCategoryIcon(category),
            children: files.map(file => ({
                key: file.path,
                title: file.name,
                icon: '📄',
                isLeaf: true,
                data: file
            }))
        }))
    }, [groupedFiles, getCategoryIcon])

    // TreeView handlers
    const handleTreeSelect = (_selectedKeys: string[], node: TreeNode) => {
        if (node.data && node.isLeaf) {
            handleFileSelect(node.data)
        }
    }

    const handleTreeExpand = (expandedKeys: string[]) => {
        setExpandedTreeKeys(expandedKeys)
    }

    // Show loading state while metadata is loading
    if (metadataLoading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        Loading Documentation...
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        Scanning components and generating metadata
                    </p>
                </div>
            </div>
        )
    }

    // Show error state if metadata failed to load
    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="text-center max-w-md">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        Failed to Load Documentation
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {error}
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        )
    }

    const totalFiles = allFiles.length
    const filteredCount = filteredFiles.length

    return (
        <DocumentationLayout
            title="📚 Interactive Documentation Browser"
            description="Explore all project documentation with advanced search, filtering, and navigation"
            // Search props
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            totalFiles={totalFiles}
            filteredCount={filteredCount}
            documentTitle={documentTitle}
            onResetFilters={handleResetFilters}
            // Sidebar props
            data={treeData}
            selectedKeys={selectedTreeKeys}
            expandedKeys={expandedTreeKeys}
            onSelect={handleTreeSelect}
            onExpand={handleTreeExpand}
            // Content props
            loading={loading}
            selectedFile={selectedFile}
            groupedFiles={groupedFiles}
        />
    )
}
