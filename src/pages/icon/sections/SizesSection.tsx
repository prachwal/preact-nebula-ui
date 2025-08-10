import { Icon } from '../../../../nebula/components'

export function SizesSection() {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Icon Sizes
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    The Icon component supports 6 different sizes from extra small to extra large.
                </p>
            </div>

            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Size Variants
                    </h3>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-end space-x-6">
                            {sizes.map((size) => (
                                <div key={size} className="text-center">
                                    <Icon name="star" size={size} />
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{size}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <pre className="mt-4 bg-gray-100 dark:bg-gray-800 p-4 rounded text-sm overflow-x-auto">
                        <code>{sizes.map(size => `<Icon name="star" size="${size}" />`).join('\n')}</code>
                    </pre>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Size Examples in Context
                    </h3>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <Icon name="user" size="xs" />
                                <span className="text-sm text-gray-600 dark:text-gray-300">Extra small icon in small text</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Icon name="home" size="sm" />
                                <span className="text-base text-gray-700 dark:text-gray-200">Small icon in normal text</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Icon name="heart" size="md" />
                                <span className="text-lg text-gray-800 dark:text-gray-100">Medium icon in large text</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Icon name="star" size="lg" />
                                <span className="text-xl text-gray-900 dark:text-white font-medium">Large icon in heading</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Size Specifications
                    </h3>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200 dark:border-gray-600">
                                    <th className="text-left py-2 text-gray-900 dark:text-white">Size</th>
                                    <th className="text-left py-2 text-gray-900 dark:text-white">Dimensions</th>
                                    <th className="text-left py-2 text-gray-900 dark:text-white">Use Case</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-100 dark:border-gray-700">
                                    <td className="py-2 text-gray-600 dark:text-gray-300">xs</td>
                                    <td className="py-2 text-gray-600 dark:text-gray-300">12×12px</td>
                                    <td className="py-2 text-gray-600 dark:text-gray-300">Small badges, indicators</td>
                                </tr>
                                <tr className="border-b border-gray-100 dark:border-gray-700">
                                    <td className="py-2 text-gray-600 dark:text-gray-300">sm</td>
                                    <td className="py-2 text-gray-600 dark:text-gray-300">16×16px</td>
                                    <td className="py-2 text-gray-600 dark:text-gray-300">Inline with text, buttons</td>
                                </tr>
                                <tr className="border-b border-gray-100 dark:border-gray-700">
                                    <td className="py-2 text-gray-600 dark:text-gray-300">md</td>
                                    <td className="py-2 text-gray-600 dark:text-gray-300">20×20px</td>
                                    <td className="py-2 text-gray-600 dark:text-gray-300">Default size, navigation</td>
                                </tr>
                                <tr className="border-b border-gray-100 dark:border-gray-700">
                                    <td className="py-2 text-gray-600 dark:text-gray-300">lg</td>
                                    <td className="py-2 text-gray-600 dark:text-gray-300">24×24px</td>
                                    <td className="py-2 text-gray-600 dark:text-gray-300">Larger buttons, headers</td>
                                </tr>
                                <tr className="border-b border-gray-100 dark:border-gray-700">
                                    <td className="py-2 text-gray-600 dark:text-gray-300">xl</td>
                                    <td className="py-2 text-gray-600 dark:text-gray-300">32×32px</td>
                                    <td className="py-2 text-gray-600 dark:text-gray-300">Feature highlights</td>
                                </tr>
                                <tr>
                                    <td className="py-2 text-gray-600 dark:text-gray-300">2xl</td>
                                    <td className="py-2 text-gray-600 dark:text-gray-300">40×40px</td>
                                    <td className="py-2 text-gray-600 dark:text-gray-300">Hero sections, logos</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
