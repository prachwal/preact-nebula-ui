import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { DocumentationTab } from '../../components/DocumentationTab'
import { usePathTabPage, PathTabPageConfigs } from '../../hooks'
import {
    BasicUsageSection,
    SizesSection,
    ColorsSection,
    BuiltInIconsSection,
    AdvancedSection,
    PropsDocumentation
} from './sections'

interface PageProps {
    readonly path?: string
}

export function IconPage(_props: PageProps) {
    const { activeTab, setActiveTab, tabs } = usePathTabPage(
        PathTabPageConfigs.withDocumentation('/icon', [
            { key: 'sizes', label: 'Sizes' },
            { key: 'colors', label: 'Colors' },
            { key: 'builtin', label: 'Built-in Icons' },
            { key: 'advanced', label: 'Advanced' }
        ])
    )

    const renderSection = () => {
        switch (activeTab) {
            case 'basic':
                return <BasicUsageSection />
            case 'sizes':
                return <SizesSection />
            case 'colors':
                return <ColorsSection />
            case 'builtin':
                return <BuiltInIconsSection />
            case 'advanced':
                return <AdvancedSection />
            case 'props':
                return <PropsDocumentation />
            case 'documentation':
                return <DocumentationTab componentName="icon" />
            default:
                return <BasicUsageSection />
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <PageHeader
                    title="🔧 Icon Component"
                    description="Flexible SVG icon system with built-in icons, custom SVG support, multiple sizes, colors, and accessibility features. Perfect for UI elements, navigation, and visual communication."
                />

                <DemoTabs
                    tabs={tabs}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                />

                <div className="mt-8">
                    {renderSection()}
                </div>
            </div>
        </div>
    )
}
