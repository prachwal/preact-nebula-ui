import { useState, useEffect, useMemo } from 'preact/hooks'
import { DocumentationLayout } from './components'
import type { TreeNode } from '../../../nebula/components/TreeView/types'

interface DocsPageProps {
    path?: string
}

interface DocFile {
    name: string
    path: string
    category: string
    description?: string
    size?: 'small' | 'medium' | 'large'
    lastModified?: string
    tags?: string[]
}

export function DocsPage(_props: Readonly<DocsPageProps>) {
    const [selectedFile, setSelectedFile] = useState<string | null>(null)
    const [docFiles, setDocFiles] = useState<DocFile[]>([])
    const [searchQuery, setSearchQuery] = useState('')
    const [loading, setLoading] = useState(false)
    const [documentTitle, setDocumentTitle] = useState('')
    const [selectedTreeKeys, setSelectedTreeKeys] = useState<string[]>([])
    const [expandedTreeKeys, setExpandedTreeKeys] = useState<string[]>(['Components'])

    // Enhanced document files with metadata
    useEffect(() => {
        const files: DocFile[] = [
            // Component Documentation
            { name: 'Alert', path: '/docs/alert.md', category: 'Components', description: 'Alert messages and notifications', size: 'medium', tags: ['feedback', 'ui'] },
            { name: 'Button', path: '/docs/button.md', category: 'Components', description: 'Interactive button components', size: 'large', tags: ['form', 'interactive'] },
            { name: 'Card', path: '/docs/card.md', category: 'Components', description: 'Card containers and layouts', size: 'medium', tags: ['layout', 'container'] },
            { name: 'Input', path: '/docs/input.md', category: 'Components', description: 'Form input controls', size: 'large', tags: ['form', 'input'] },
            { name: 'Modal', path: '/docs/modal.md', category: 'Components', description: 'Modal dialogs and overlays', size: 'medium', tags: ['overlay', 'dialog'] },
            { name: 'Table', path: '/docs/table.md', category: 'Components', description: 'Data tables and grids', size: 'large', tags: ['data', 'table'] },
            { name: 'Form', path: '/docs/form.md', category: 'Components', description: 'Form layouts and validation', size: 'large', tags: ['form', 'validation'] },
            { name: 'Navigation', path: '/docs/navigation.md', category: 'Components', description: 'Navigation components', size: 'medium', tags: ['navigation', 'menu'] },
            { name: 'Layout', path: '/docs/layout.md', category: 'Components', description: 'Layout and grid systems', size: 'large', tags: ['layout', 'grid'] },
            { name: 'Typography', path: '/docs/typography.md', category: 'Components', description: 'Text and typography styles', size: 'medium', tags: ['text', 'styling'] },

            // Milestone Documentation  
            { name: 'Milestone 1: Foundation', path: '/docs/milestone-1/README.md', category: 'Milestones', description: 'Project setup and basic components', size: 'large', tags: ['foundation', 'setup'] },
            { name: 'Milestone 2: Core Components', path: '/docs/milestone-2/README.md', category: 'Milestones', description: 'Core UI components implementation', size: 'large', tags: ['components', 'core'] },
            { name: 'Milestone 3: Forms & Validation', path: '/docs/milestone-3/README.md', category: 'Milestones', description: 'Form components and validation', size: 'large', tags: ['forms', 'validation'] },
            { name: 'Milestone 4: Advanced Components', path: '/docs/milestone-4/README.md', category: 'Milestones', description: 'Advanced UI components', size: 'large', tags: ['advanced', 'components'] },
            { name: 'Milestone 5: Data Components', path: '/docs/milestone-5/README.md', category: 'Milestones', description: 'Data display and interaction', size: 'large', tags: ['data', 'interaction'] },
            { name: 'Milestone 6: Layout & Navigation', path: '/docs/milestone-6/README.md', category: 'Milestones', description: 'Layout systems and navigation', size: 'large', tags: ['layout', 'navigation'] },
            { name: 'Milestone 7: Feedback Components', path: '/docs/milestone-7/README.md', category: 'Milestones', description: 'User feedback and notifications', size: 'large', tags: ['feedback', 'notifications'] },
            { name: 'Milestone 8: Advanced Features', path: '/docs/milestone-8/README.md', category: 'Milestones', description: 'Advanced functionality and features', size: 'large', tags: ['advanced', 'features'] },

            // Project Documentation
            { name: 'README', path: '/README.md', category: 'Project', description: 'Main project documentation', size: 'large', tags: ['overview', 'setup'] },
            { name: 'Implementation Plan', path: '/docs/IMPLEMENTATION_PLAN.md', category: 'Project', description: 'Detailed implementation roadmap', size: 'large', tags: ['planning', 'roadmap'] },
            { name: 'Component Architecture', path: '/docs/COMPONENT_ARCHITECTURE_SUMMARY.md', category: 'Project', description: 'Architecture and design patterns', size: 'medium', tags: ['architecture', 'design'] },
            { name: 'Import Guide', path: '/docs/IMPORT_GUIDE.md', category: 'Project', description: 'How to import and use components', size: 'small', tags: ['usage', 'guide'] },
            { name: 'Size Standardization', path: '/docs/SIZE_STANDARDIZATION_CHECKLIST.md', category: 'Project', description: 'Component size standards', size: 'small', tags: ['standards', 'sizes'] },

            // Reports and Analysis
            { name: 'Project Status', path: '/docs/PROJECT_STATUS.md', category: 'Reports', description: 'Current project status and progress', size: 'medium', tags: ['status', 'progress'] },
            { name: 'Component Coverage', path: '/docs/COMPONENT_COVERAGE_REPORT.md', category: 'Reports', description: 'Test coverage and quality metrics', size: 'medium', tags: ['testing', 'coverage'] },
            { name: 'Final Report', path: '/docs/FINAL_PROJECT_REPORT.md', category: 'Reports', description: 'Complete project summary', size: 'large', tags: ['summary', 'final'] },
            { name: 'Production Ready', path: '/PRODUCTION_READY.md', category: 'Reports', description: 'Production readiness checklist', size: 'medium', tags: ['production', 'checklist'] }
        ]

        setDocFiles(files)
    }, [])

    // Filter files based on search query
    const filteredFiles = useMemo(() => {
        if (!searchQuery) return docFiles

        return docFiles.filter(file =>
            file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            file.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            file.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        )
    }, [docFiles, searchQuery])

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

    const totalFiles = docFiles.length
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
