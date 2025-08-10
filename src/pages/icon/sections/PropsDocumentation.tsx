import { Icon } from '../../../../nebula/components'

export function PropsDocumentation() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Icon Props
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Complete reference for all Icon component properties and their usage.
                </p>
            </div>

            <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200 dark:border-gray-600">
                                    <th className="text-left py-3 px-4 text-gray-900 dark:text-white font-semibold">Prop</th>
                                    <th className="text-left py-3 px-4 text-gray-900 dark:text-white font-semibold">Type</th>
                                    <th className="text-left py-3 px-4 text-gray-900 dark:text-white font-semibold">Default</th>
                                    <th className="text-left py-3 px-4 text-gray-900 dark:text-white font-semibold">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-100 dark:border-gray-700">
                                    <td className="py-3 px-4 font-mono text-sm text-blue-600 dark:text-blue-400">size</td>
                                    <td className="py-3 px-4 font-mono text-sm text-gray-600 dark:text-gray-300">'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'</td>
                                    <td className="py-3 px-4 font-mono text-sm text-gray-600 dark:text-gray-300">'md'</td>
                                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">Icon size variant</td>
                                </tr>
                                <tr className="border-b border-gray-100 dark:border-gray-700">
                                    <td className="py-3 px-4 font-mono text-sm text-blue-600 dark:text-blue-400">color</td>
                                    <td className="py-3 px-4 font-mono text-sm text-gray-600 dark:text-gray-300">'inherit' | 'current' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'muted'</td>
                                    <td className="py-3 px-4 font-mono text-sm text-gray-600 dark:text-gray-300">'current'</td>
                                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">Icon color variant</td>
                                </tr>
                                <tr className="border-b border-gray-100 dark:border-gray-700">
                                    <td className="py-3 px-4 font-mono text-sm text-blue-600 dark:text-blue-400">name</td>
                                    <td className="py-3 px-4 font-mono text-sm text-gray-600 dark:text-gray-300">string</td>
                                    <td className="py-3 px-4 font-mono text-sm text-gray-600 dark:text-gray-300">undefined</td>
                                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">Predefined icon name for built-in icons</td>
                                </tr>
                                <tr className="border-b border-gray-100 dark:border-gray-700">
                                    <td className="py-3 px-4 font-mono text-sm text-blue-600 dark:text-blue-400">children</td>
                                    <td className="py-3 px-4 font-mono text-sm text-gray-600 dark:text-gray-300">ComponentChildren</td>
                                    <td className="py-3 px-4 font-mono text-sm text-gray-600 dark:text-gray-300">undefined</td>
                                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">Custom SVG path or content</td>
                                </tr>
                                <tr className="border-b border-gray-100 dark:border-gray-700">
                                    <td className="py-3 px-4 font-mono text-sm text-blue-600 dark:text-blue-400">spin</td>
                                    <td className="py-3 px-4 font-mono text-sm text-gray-600 dark:text-gray-300">boolean</td>
                                    <td className="py-3 px-4 font-mono text-sm text-gray-600 dark:text-gray-300">false</td>
                                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">Whether the icon should spin continuously</td>
                                </tr>
                                <tr className="border-b border-gray-100 dark:border-gray-700">
                                    <td className="py-3 px-4 font-mono text-sm text-blue-600 dark:text-blue-400">filled</td>
                                    <td className="py-3 px-4 font-mono text-sm text-gray-600 dark:text-gray-300">boolean</td>
                                    <td className="py-3 px-4 font-mono text-sm text-gray-600 dark:text-gray-300">false</td>
                                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">Whether icon is filled or outlined</td>
                                </tr>
                                <tr className="border-b border-gray-100 dark:border-gray-700">
                                    <td className="py-3 px-4 font-mono text-sm text-blue-600 dark:text-blue-400">viewBox</td>
                                    <td className="py-3 px-4 font-mono text-sm text-gray-600 dark:text-gray-300">string</td>
                                    <td className="py-3 px-4 font-mono text-sm text-gray-600 dark:text-gray-300">'0 0 24 24'</td>
                                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">Custom viewBox for the SVG</td>
                                </tr>
                                <tr className="border-b border-gray-100 dark:border-gray-700">
                                    <td className="py-3 px-4 font-mono text-sm text-blue-600 dark:text-blue-400">strokeWidth</td>
                                    <td className="py-3 px-4 font-mono text-sm text-gray-600 dark:text-gray-300">number</td>
                                    <td className="py-3 px-4 font-mono text-sm text-gray-600 dark:text-gray-300">2</td>
                                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">Stroke width for outline icons</td>
                                </tr>
                                <tr className="border-b border-gray-100 dark:border-gray-700">
                                    <td className="py-3 px-4 font-mono text-sm text-blue-600 dark:text-blue-400">className</td>
                                    <td className="py-3 px-4 font-mono text-sm text-gray-600 dark:text-gray-300">string</td>
                                    <td className="py-3 px-4 font-mono text-sm text-gray-600 dark:text-gray-300">undefined</td>
                                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">Additional CSS classes</td>
                                </tr>
                                <tr>
                                    <td className="py-3 px-4 font-mono text-sm text-blue-600 dark:text-blue-400">data-testid</td>
                                    <td className="py-3 px-4 font-mono text-sm text-gray-600 dark:text-gray-300">string</td>
                                    <td className="py-3 px-4 font-mono text-sm text-gray-600 dark:text-gray-300">undefined</td>
                                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">Test ID for testing purposes</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Usage Examples
                    </h3>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Basic Usage</h4>
                                <div className="flex items-center space-x-4 mb-2">
                                    <Icon name="star" />
                                    <code className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{`<Icon name="star" />`}</code>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-medium text-gray-900 dark:text-white mb-2">With Size and Color</h4>
                                <div className="flex items-center space-x-4 mb-2">
                                    <Icon name="heart" size="lg" color="error" />
                                    <code className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{`<Icon name="heart" size="lg" color="error" />`}</code>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Spinning Animation</h4>
                                <div className="flex items-center space-x-4 mb-2">
                                    <Icon name="settings" spin />
                                    <code className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{`<Icon name="settings" spin />`}</code>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Custom SVG Content</h4>
                                <div className="flex items-center space-x-4 mb-2">
                                    <Icon size="lg" color="primary">
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                                        <line x1="9" y1="9" x2="9.01" y2="9" />
                                        <line x1="15" y1="9" x2="15.01" y2="9" />
                                    </Icon>
                                    <code className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">Custom SVG</code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        TypeScript Interface
                    </h3>
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                        <pre className="text-sm overflow-x-auto">
                            <code>{`interface IconProps extends Omit<ComponentProps<'svg'>, 'size' | 'color'> {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
    color?: 'inherit' | 'current' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'muted'
    children?: ComponentChildren
    name?: string
    spin?: boolean
    viewBox?: string
    strokeWidth?: number
    filled?: boolean
    className?: string
    'data-testid'?: string
}`}</code>
                        </pre>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Accessibility Notes
                    </h3>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                        <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                            <li>• Icons are automatically marked with <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">aria-hidden="true"</code></li>
                            <li>• Icons have <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">focusable="false"</code> for proper screen reader behavior</li>
                            <li>• When using icons for interactive elements, provide proper labels on the parent element</li>
                            <li>• Use semantic colors (success, warning, error) for better context</li>
                            <li>• All color variants meet WCAG contrast requirements in both light and dark modes</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
