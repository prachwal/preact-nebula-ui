import { Skeleton, Empty } from '../../../../nebula'
import { MarkdownViewer } from '../../../components/MarkdownViewer'

export interface DocumentationContentProps {
    loading: boolean
    selectedFile: string | null
    groupedFiles: Record<string, any[]>
}

export function DocumentationContent({
    loading,
    selectedFile,
    groupedFiles
}: Readonly<DocumentationContentProps>) {
    if (loading) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
                <Skeleton lines={5} />
                <div className="mt-4">
                    <Skeleton lines={3} />
                </div>
            </div>
        )
    }

    if (selectedFile) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <MarkdownViewer filePath={selectedFile} />
            </div>
        )
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-12">
            <Empty
                size="large"
                description={
                    <div className="space-y-4 max-w-md mx-auto text-center">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Welcome to Documentation Browser
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Discover comprehensive documentation for all project components,
                            milestones, and technical guides. Use the tree navigation
                            on the left to browse by category.
                        </p>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <div className="font-medium text-blue-900 dark:text-blue-100">
                                    📱 {groupedFiles.Components?.length || 0} Components
                                </div>
                                <div className="text-blue-700 dark:text-blue-300">UI component docs</div>
                            </div>
                            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                <div className="font-medium text-purple-900 dark:text-purple-100">
                                    🎯 {groupedFiles.Milestones?.length || 0} Milestones
                                </div>
                                <div className="text-purple-700 dark:text-purple-300">Project milestones</div>
                            </div>
                            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                <div className="font-medium text-green-900 dark:text-green-100">
                                    🚀 {groupedFiles.Project?.length || 0} Project Docs
                                </div>
                                <div className="text-green-700 dark:text-green-300">Setup & guides</div>
                            </div>
                            <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                                <div className="font-medium text-orange-900 dark:text-orange-100">
                                    📊 {groupedFiles.Reports?.length || 0} Reports
                                </div>
                                <div className="text-orange-700 dark:text-orange-300">Analysis & stats</div>
                            </div>
                        </div>
                    </div>
                }
            />
        </div>
    )
}
