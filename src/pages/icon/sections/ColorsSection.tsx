import { Icon } from '../../../../nebula/components'

export function ColorsSection() {
    const colors = [
        { key: 'inherit', label: 'Inherit', description: 'Inherits from parent' },
        { key: 'current', label: 'Current', description: 'Uses current text color' },
        { key: 'primary', label: 'Primary', description: 'Blue theme color' },
        { key: 'secondary', label: 'Secondary', description: 'Gray neutral color' },
        { key: 'success', label: 'Success', description: 'Green success color' },
        { key: 'warning', label: 'Warning', description: 'Yellow warning color' },
        { key: 'error', label: 'Error', description: 'Red error color' },
        { key: 'muted', label: 'Muted', description: 'Subtle gray color' }
    ] as const

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Icon Colors
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    The Icon component supports 8 different color variants with automatic dark mode support.
                </p>
            </div>

            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Color Variants
                    </h3>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {colors.map((color) => (
                                <div key={color.key} className="text-center">
                                    <Icon name="star" size="lg" color={color.key as any} />
                                    <p className="text-sm font-medium text-gray-900 dark:text-white mt-2">{color.label}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{color.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <pre className="mt-4 bg-gray-100 dark:bg-gray-800 p-4 rounded text-sm overflow-x-auto">
                        <code>{colors.map(color => `<Icon name="star" color="${color.key}" />`).join('\n')}</code>
                    </pre>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Contextual Usage
                    </h3>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded">
                                <Icon name="check" color="success" />
                                <span className="text-green-800 dark:text-green-200">Operation completed successfully</span>
                            </div>
                            <div className="flex items-center space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                                <Icon name="warning" color="warning" />
                                <span className="text-yellow-800 dark:text-yellow-200">Please review your settings</span>
                            </div>
                            <div className="flex items-center space-x-3 p-3 bg-red-50 dark:bg-red-900/20 rounded">
                                <Icon name="error" color="error" />
                                <span className="text-red-800 dark:text-red-200">An error occurred</span>
                            </div>
                            <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                                <Icon name="info" color="primary" />
                                <span className="text-blue-800 dark:text-blue-200">Additional information available</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Dark Mode Support
                    </h3>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            All icon colors automatically adapt to dark mode. The colors shown above will appear different in light and dark themes while maintaining accessibility and contrast ratios.
                        </p>
                        <div className="flex items-center space-x-4 p-4 bg-gray-100 dark:bg-gray-700 rounded">
                            <Icon name="star" color="primary" />
                            <Icon name="heart" color="error" />
                            <Icon name="check" color="success" />
                            <span className="text-gray-700 dark:text-gray-200">Automatic theme adaptation</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Inherit vs Current
                    </h3>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="space-y-4">
                            <div className="text-blue-600">
                                <Icon name="star" color="inherit" className="mr-2" />
                                <span>Icon with color="inherit" inherits blue from parent</span>
                            </div>
                            <div className="text-red-600">
                                <Icon name="heart" color="current" className="mr-2" />
                                <span>Icon with color="current" uses red text color</span>
                            </div>
                        </div>
                    </div>
                    <pre className="mt-4 bg-gray-100 dark:bg-gray-800 p-4 rounded text-sm overflow-x-auto">
                        <code>{`<div className="text-blue-600">
    <Icon name="star" color="inherit" />
    <span>Inherits blue from parent</span>
</div>

<div className="text-red-600">
    <Icon name="heart" color="current" />
    <span>Uses red text color</span>
</div>`}</code>
                    </pre>
                </div>
            </div>
        </div>
    )
}
