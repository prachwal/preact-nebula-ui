import { MarkdownViewer } from './MarkdownViewer'

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
    // Ścieżki do różnych typów dokumentacji
    const getDocumentationPath = () => {
        if (customPath) return customPath

        // Mapowanie nazw komponentów na odpowiednie pliki dokumentacji
        const docPaths: Record<string, string> = {
            'Button': '/docs/BUTTON_DOCUMENTATION.md',
            'Alert': '/docs/IMPLEMENTATION_PLAN.md',
            'Input': '/docs/PROJECT_STATUS.md',
            'Modal': '/docs/COMPONENT_COVERAGE_REPORT.md',
            // Dodaj więcej mapowań według potrzeb
        }

        // Zwróć specificzną ścieżkę lub domyślną
        return docPaths[componentName] || `/docs/COMPONENT_COVERAGE_REPORT.md`
    }

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
                <MarkdownViewer
                    filePath={getDocumentationPath()}
                    className="documentation-content"
                />
            </div>
        </div>
    )
}
