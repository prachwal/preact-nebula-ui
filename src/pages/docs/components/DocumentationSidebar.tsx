import { TreeView } from '../../../../nebula'
import type { TreeViewProps } from '../../../../nebula'

export interface DocumentationSidebarProps {
    data: any[] // TreeNode array
    selectedKeys: string[]
    expandedKeys: string[]
    onSelect?: TreeViewProps['onSelect']
    onExpand?: TreeViewProps['onExpand']
}

export function DocumentationSidebar({
    data,
    selectedKeys,
    expandedKeys,
    onSelect,
    onExpand
}: Readonly<DocumentationSidebarProps>) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 h-full">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    📚 Documentation Explorer
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Browse all documentation by category
                </p>
            </div>

            <div className="p-4 max-h-96 overflow-auto">
                <TreeView
                    data={data}
                    selectedKeys={selectedKeys}
                    expandedKeys={expandedKeys}
                    onSelect={onSelect}
                    onExpand={onExpand}
                    showLine
                    showIcon
                    className="documentation-tree"
                />
            </div>
        </div>
    )
}
