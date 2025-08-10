import { MarkdownViewer } from './MarkdownViewer'
import { useDocsMetadata } from '../hooks/useDocsMetadata'

interface DocumentationTabProps {
    readonly componentName: string
    readonly customPath?: string
    readonly title?: string
}

export function DocumentationTab({
    componentName,
    customPath,
    title = 'Dokumentacja'
}: DocumentationTabProps) {
    const { metadata } = useDocsMetadata()

    // Ścieżki do różnych typów dokumentacji
    const getDocumentationPath = () => {
        if (customPath) return customPath

        // Wyszukaj komponent w metadanych
        const component = metadata?.components.find(comp =>
            comp.component?.toLowerCase() === componentName.toLowerCase() ||
            comp.name?.toLowerCase() === componentName.toLowerCase()
        )

        return component?.path || null
    }

    const documentationPath = getDocumentationPath()

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {title} - {componentName}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                    Szczegółowa dokumentacja komponentu {componentName} wraz z przykładami implementacji i najlepszymi praktykami.
                </p>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                {documentationPath ? (
                    <MarkdownViewer
                        filePath={documentationPath}
                        className="documentation-content"
                    />
                ) : (
                    <div className="text-center py-12">
                        <div className="text-gray-500 dark:text-gray-400">
                            <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <h3 className="text-lg font-medium mb-2">Dokumentacja niedostępna</h3>
                            <p className="text-sm">
                                Dokumentacja dla komponentu <span className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">{componentName}</span> nie została jeszcze utworzona.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
