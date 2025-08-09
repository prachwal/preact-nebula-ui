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
        const docPaths = {
            input: 'INPUT_DOCUMENTATION.md',
            button: 'BUTTON_DOCUMENTATION.md',
            alert: 'ALERT_DOCUMENTATION.md',
            badge: 'BADGE_DOCUMENTATION.md',
            progress: 'PROGRESS_DOCUMENTATION.md',
            skeleton: 'SKELETON_DOCUMENTATION.md',
            spinner: 'SPINNER_DOCUMENTATION.md',
            toast: 'TOAST_DOCUMENTATION.md',
            modal: 'MODAL_DOCUMENTATION.md',
            card: 'CARD_DOCUMENTATION.md',
            tooltip: 'TOOLTIP_DOCUMENTATION.md',
            textarea: 'TEXTAREA_DOCUMENTATION.md',
            checkbox: 'CHECKBOX_DOCUMENTATION.md',
            radio: 'RADIO_DOCUMENTATION.md',
            switch: 'SWITCH_DOCUMENTATION.md',
            select: 'SELECT_DOCUMENTATION.md',
            datepicker: 'DATEPICKER_DOCUMENTATION.md',
            upload: 'UPLOAD_DOCUMENTATION.md',
            tags: 'TAGS_DOCUMENTATION.md',
            breadcrumb: 'BREADCRUMB_DOCUMENTATION.md',
            pagination: 'PAGINATION_DOCUMENTATION.md',
            tabs: 'TABS_DOCUMENTATION.md',
            steps: 'STEPS_DOCUMENTATION.md',
            // Phase 6 - Display Components
            avatar: 'AVATAR_DOCUMENTATION.md',
            image: 'IMAGE_DOCUMENTATION.md',
            empty: 'EMPTY_DOCUMENTATION.md',
            // Phase 7 - Advanced Interactive Components
            rating: 'RATING_DOCUMENTATION.md',
            slider: 'SLIDER_DOCUMENTATION.md',
            drawer: 'DRAWER_DOCUMENTATION.md',
            popover: 'POPOVER_DOCUMENTATION.md',
            // Phase 8 - Complex Data Components
            carousel: 'CAROUSEL_DOCUMENTATION.md',
            transfer: 'TRANSFER_DOCUMENTATION.md',
            treeview: 'TREEVIEW_DOCUMENTATION.md',
            autocomplete: 'AUTOCOMPLETE_DOCUMENTATION.md',
            timepicker: 'TIMEPICKER_DOCUMENTATION.md',
            // Additional Components
            table: 'TABLE_DOCUMENTATION.md',
            grid: 'GRID_DOCUMENTATION.md',
            divider: 'DIVIDER_DOCUMENTATION.md',
            container: 'CONTAINER_DOCUMENTATION.md',
            collapse: 'COLLAPSE_DOCUMENTATION.md',
            anchor: 'ANCHOR_DOCUMENTATION.md',
            backtop: 'BACKTOP_DOCUMENTATION.md',
            stack: 'STACK_DOCUMENTATION.md',
            // Utility Components
            affix: 'AFFIX_DOCUMENTATION.md',
            configprovider: 'CONFIGPROVIDER_DOCUMENTATION.md',
            fielderror: 'FIELDERROR_DOCUMENTATION.md',
            label: 'LABEL_DOCUMENTATION.md',
            // Infrastructure Components
            pagelayout: 'PAGELAYOUT_DOCUMENTATION.md',
            portal: 'PORTAL_DOCUMENTATION.md',
            heading: 'TYPOGRAPHY_DOCUMENTATION.md',
            text: 'TYPOGRAPHY_DOCUMENTATION.md',
        } as const;        // Zwróć specificzną ścieżkę lub domyślną
        return '/docs/' + (docPaths[componentName as keyof typeof docPaths] || `COMPONENT_COVERAGE_REPORT.md`)
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
