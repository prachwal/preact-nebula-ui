import { Icon } from '../../../../nebula/components'

export function BuiltInIconsSection() {
    // Get built-in icons from the Icon component
    const iconCategories = {
        'Navigation': [
            'chevron-up', 'chevron-down', 'chevron-left', 'chevron-right',
            'arrow-up', 'arrow-down', 'arrow-left', 'arrow-right'
        ],
        'Actions': [
            'plus', 'minus', 'x', 'check', 'edit', 'trash', 'copy'
        ],
        'Communication': [
            'mail', 'phone', 'message'
        ],
        'Media': [
            'play', 'pause', 'stop', 'volume', 'mute'
        ],
        'Status': [
            'info', 'warning', 'error', 'success'
        ],
        'UI': [
            'search', 'filter', 'sort', 'settings', 'home', 'user',
            'heart', 'star', 'download', 'upload', 'external-link'
        ],
        'Time': [
            'clock', 'calendar'
        ]
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Built-in Icons
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    The Icon component comes with 50+ pre-built icons organized by category. All icons are optimized SVG paths with consistent styling.
                </p>
            </div>

            <div className="space-y-8">
                {Object.entries(iconCategories).map(([category, icons]) => (
                    <div key={category}>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            {category}
                        </h3>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                                {icons.map((iconName) => (
                                    <div
                                        key={iconName}
                                        className="flex flex-col items-center p-3 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group cursor-pointer"
                                        title={iconName}
                                    >
                                        <Icon name={iconName} size="lg" className="mb-2" />
                                        <span className="text-xs text-gray-500 dark:text-gray-400 text-center break-all group-hover:text-gray-700 dark:group-hover:text-gray-200">
                                            {iconName}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Usage Examples
                    </h3>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <Icon name="home" />
                                <span className="text-gray-700 dark:text-gray-200">Dashboard</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Icon name="user" />
                                <span className="text-gray-700 dark:text-gray-200">Profile</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Icon name="settings" />
                                <span className="text-gray-700 dark:text-gray-200">Settings</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Icon name="search" />
                                <span className="text-gray-700 dark:text-gray-200">Search</span>
                            </div>
                        </div>
                    </div>
                    <pre className="mt-4 bg-gray-100 dark:bg-gray-800 p-4 rounded text-sm overflow-x-auto">
                        <code>{`<Icon name="home" />
<Icon name="user" />
<Icon name="settings" />
<Icon name="search" />`}</code>
                    </pre>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Icon Quick Reference
                    </h3>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            All built-in icons are accessible via the <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">name</code> prop:
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm font-mono">
                            {Object.values(iconCategories).flat().map((iconName) => (
                                <div key={iconName} className="text-gray-600 dark:text-gray-400">
                                    "{iconName}"
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
