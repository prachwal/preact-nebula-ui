import { useState, useMemo, useEffect } from 'preact/hooks'
import { route } from 'preact-router'
import { DocumentationLayout } from './components'
import { useDocsMetadata } from '../../hooks/useDocsMetadata'
import type { TreeNode } from '../../../nebula/components/TreeView/types'
import type { DocFile } from '../../hooks/useDocsMetadata'

interface DocsPageProps {
    path?: string
    file?: string
    category?: string
    hash?: string
}

export function DocsPage(props: Readonly<DocsPageProps>) {
    const { loading: metadataLoading, error, allFiles } = useDocsMetadata()
    const [selectedFile, setSelectedFile] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [loading, setLoading] = useState(false)
    const [documentTitle, setDocumentTitle] = useState('')
    const [selectedTreeKeys, setSelectedTreeKeys] = useState<string[]>([])
    const [expandedTreeKeys, setExpandedTreeKeys] = useState<string[]>(['Components'])
    const [documentFragment, setDocumentFragment] = useState<string | null>(null)

    // Handle file parameter from URL
    const fileFromUrl = props.file || props.path?.split('/').pop()?.replace('.md', '')
    const categoryFromUrl = props.category

    // Extract hash from current URL
    const currentHash = typeof window !== 'undefined' ? window.location.hash : ''

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

    const handleFileSelect = async (file: DocFile, fragment?: string) => {
        setLoading(true)
        setSelectedFile(file.path)
        setDocumentTitle(file.name)
        setSelectedTreeKeys([file.path])

        // Update URL to reflect selected file
        // Convert path like "/docs/components/avatar.md" to "/documentation/components/avatar.md"
        let cleanPath = file.path

        // Remove leading slash if present
        if (cleanPath.startsWith('/')) {
            cleanPath = cleanPath.substring(1)
        }

        // Remove 'docs/' prefix if present
        if (cleanPath.startsWith('docs/')) {
            cleanPath = cleanPath.substring(5) // Remove 'docs/'
        }

        let documentationPath = `/documentation/${cleanPath}`

        // Add fragment if provided
        if (fragment) {
            documentationPath += `#${fragment}`
            setDocumentFragment(fragment)
        } else if (currentHash) {
            // Preserve existing hash
            documentationPath += currentHash
            setDocumentFragment(currentHash.substring(1))
        }

        console.log('Navigating to:', {
            filePath: file.path,
            cleanPath,
            documentationPath,
            fragment,
            currentHash
        })

        route(documentationPath, true) // Replace current history entry

        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 300))
        setLoading(false)
    }

    const getCategoryIcon = (category: string) => {
        const icons: Record<string, string> = {
            'Form Controls': '📝',
            'Data Display': '📊',
            'Layout': '📐',
            'Feedback': '💬',
            'Navigation': '🧭',
            'Overlays': '🪟',
            'General': '🛠️',
            'Components': '🧩',
            'Milestones': '🎯',
            'Project': '📚',
            'Reports': '�',
            'Tests': '🧪',
            'Examples': '💡',
            'Config': '⚙️',
            'Other': '📄'
        }
        return icons[category] || '📄'
    }

    const handleResetFilters = () => {
        setSearchQuery('')
    }

    // Auto-select file if specified in URL
    useEffect(() => {
        if (fileFromUrl && allFiles.length > 0) {
            // Handle both file.md and file formats
            const cleanFileName = fileFromUrl.replace('.md', '')

            const targetFile = allFiles.find(file => {
                // Build expected paths with /docs/ prefix
                const expectedPaths = []

                if (categoryFromUrl) {
                    expectedPaths.push(`/docs/${categoryFromUrl}/${fileFromUrl}`)
                    expectedPaths.push(`/docs/${categoryFromUrl}/${cleanFileName}.md`)
                    expectedPaths.push(`${categoryFromUrl}/${fileFromUrl}`)
                    expectedPaths.push(`${categoryFromUrl}/${cleanFileName}.md`)
                }

                expectedPaths.push(`/docs/components/${fileFromUrl}`)
                expectedPaths.push(`/docs/components/${cleanFileName}.md`)
                expectedPaths.push(`components/${fileFromUrl}`)
                expectedPaths.push(`components/${cleanFileName}.md`)

                // Direct path matches
                for (const expectedPath of expectedPaths) {
                    if (file.path.toLowerCase() === expectedPath.toLowerCase()) {
                        return true
                    }
                }

                // Match by exact file name (without .md)
                if (file.name.toLowerCase() === cleanFileName.toLowerCase()) return true

                // Match by file path ending
                if (file.path.toLowerCase().endsWith(`/${fileFromUrl}`)) return true
                if (file.path.toLowerCase().endsWith(`/${cleanFileName}.md`)) return true

                // Fallback: check if path contains the filename
                if (file.path.toLowerCase().includes(cleanFileName.toLowerCase())) return true

                return false
            })

            if (targetFile) {
                console.log('Selected file from URL:', {
                    fileFromUrl,
                    categoryFromUrl,
                    cleanFileName,
                    targetFile: targetFile.path,
                    currentHash
                })
                setSelectedFile(targetFile.path)
                setDocumentTitle(targetFile.name)
                setSelectedTreeKeys([targetFile.path])

                // Handle hash fragment
                if (currentHash) {
                    const fragment = currentHash.substring(1) // Remove #
                    setDocumentFragment(decodeURIComponent(fragment))
                    console.log('Setting fragment from URL:', fragment)
                }

                // Expand the category containing the file
                const fileCategory = targetFile.category
                if (fileCategory && !expandedTreeKeys.includes(fileCategory)) {
                    setExpandedTreeKeys(prev => [...prev, fileCategory])
                }
            } else {
                console.log('No file found for URL:', {
                    fileFromUrl,
                    categoryFromUrl,
                    cleanFileName,
                    availableFiles: allFiles.map(f => f.path)
                })
            }
        }
    }, [fileFromUrl, categoryFromUrl, allFiles, expandedTreeKeys])

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
