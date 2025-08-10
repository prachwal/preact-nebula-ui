import { Icon } from '../../../../nebula/components'

export function BasicUsageSection() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Basic Usage
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    The Icon component provides a flexible way to display SVG icons with built-in icons or custom SVG content.
                </p>
            </div>

            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Built-in Icons
                    </h3>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-4">
                            <Icon name="home" />
                            <Icon name="user" />
                            <Icon name="search" />
                            <Icon name="settings" />
                            <Icon name="heart" />
                        </div>
                    </div>
                    <pre className="mt-4 bg-gray-100 dark:bg-gray-800 p-4 rounded text-sm overflow-x-auto">
                        <code>{`<Icon name="home" />
<Icon name="user" />
<Icon name="search" />
<Icon name="settings" />
<Icon name="heart" />`}</code>
                    </pre>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Custom SVG Content
                    </h3>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-4">
                            <Icon>
                                <circle cx="12" cy="12" r="10" />
                                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                                <line x1="9" y1="9" x2="9.01" y2="9" />
                                <line x1="15" y1="9" x2="15.01" y2="9" />
                            </Icon>
                            <Icon filled>
                                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                            </Icon>
                        </div>
                    </div>
                    <pre className="mt-4 bg-gray-100 dark:bg-gray-800 p-4 rounded text-sm overflow-x-auto">
                        <code>{`<Icon>
    <circle cx="12" cy="12" r="10" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    <line x1="9" y1="9" x2="9.01" y2="9" />
    <line x1="15" y1="9" x2="15.01" y2="9" />
</Icon>

<Icon filled>
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
</Icon>`}</code>
                    </pre>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Basic Configuration
                    </h3>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-6">
                            <div className="text-center">
                                <Icon name="check" color="success" />
                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Success</p>
                            </div>
                            <div className="text-center">
                                <Icon name="warning" color="warning" />
                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Warning</p>
                            </div>
                            <div className="text-center">
                                <Icon name="error" color="error" />
                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Error</p>
                            </div>
                            <div className="text-center">
                                <Icon name="info" color="primary" />
                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Info</p>
                            </div>
                        </div>
                    </div>
                    <pre className="mt-4 bg-gray-100 dark:bg-gray-800 p-4 rounded text-sm overflow-x-auto">
                        <code>{`<Icon name="check" color="success" />
<Icon name="warning" color="warning" />
<Icon name="error" color="error" />
<Icon name="info" color="primary" />`}</code>
                    </pre>
                </div>
            </div>
        </div>
    )
}
