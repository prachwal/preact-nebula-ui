import { useState } from 'preact/hooks'
import { Icon } from '../../../../nebula/components'

export function AdvancedSection() {
    const [isSpinning, setIsSpinning] = useState(false)

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Advanced Features
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Advanced Icon component features including animations, custom styling, accessibility, and complex use cases.
                </p>
            </div>

            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Spinning Animation
                    </h3>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-6">
                            <Icon name="settings" spin size="lg" />
                            <Icon name="arrow-right" spin size="lg" />
                            <button
                                onClick={() => setIsSpinning(!isSpinning)}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                <Icon name="play" spin={isSpinning} className="mr-2" />
                                {isSpinning ? 'Stop' : 'Start'} Animation
                            </button>
                        </div>
                    </div>
                    <pre className="mt-4 bg-gray-100 dark:bg-gray-800 p-4 rounded text-sm overflow-x-auto">
                        <code>{`<Icon name="settings" spin />
<Icon name="arrow-right" spin />

// Controlled spinning
<Icon name="play" spin={isSpinning} />`}</code>
                    </pre>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Filled vs Outlined Icons
                    </h3>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-8">
                            <div className="text-center">
                                <Icon name="star" size="xl" />
                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Outlined (default)</p>
                            </div>
                            <div className="text-center">
                                <Icon name="star" size="xl" filled />
                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Filled</p>
                            </div>
                            <div className="text-center">
                                <Icon size="xl" filled color="warning">
                                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                                </Icon>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Custom filled</p>
                            </div>
                        </div>
                    </div>
                    <pre className="mt-4 bg-gray-100 dark:bg-gray-800 p-4 rounded text-sm overflow-x-auto">
                        <code>{`<Icon name="star" />           {/* Outlined */}
<Icon name="star" filled />    {/* Filled */}

{/* Custom filled icon */}
<Icon filled color="warning">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
</Icon>`}</code>
                    </pre>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Custom Stroke Width
                    </h3>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-6">
                            <div className="text-center">
                                <Icon name="heart" size="xl" strokeWidth={1} />
                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Thin (1)</p>
                            </div>
                            <div className="text-center">
                                <Icon name="heart" size="xl" strokeWidth={2} />
                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Normal (2)</p>
                            </div>
                            <div className="text-center">
                                <Icon name="heart" size="xl" strokeWidth={3} />
                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Bold (3)</p>
                            </div>
                        </div>
                    </div>
                    <pre className="mt-4 bg-gray-100 dark:bg-gray-800 p-4 rounded text-sm overflow-x-auto">
                        <code>{`<Icon name="heart" strokeWidth={1} />
<Icon name="heart" strokeWidth={2} />
<Icon name="heart" strokeWidth={3} />`}</code>
                    </pre>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Custom ViewBox and Complex Icons
                    </h3>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-6">
                            <Icon viewBox="0 0 100 100" size="xl">
                                <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="none" />
                                <text x="50" y="56" textAnchor="middle" className="fill-current text-xs font-bold">100</text>
                            </Icon>
                            <Icon viewBox="0 0 32 32" size="xl">
                                <path d="M16 2L20 12L30 12L22 18L26 28L16 22L6 28L10 18L2 12L12 12Z" fill="currentColor" />
                            </Icon>
                        </div>
                    </div>
                    <pre className="mt-4 bg-gray-100 dark:bg-gray-800 p-4 rounded text-sm overflow-x-auto">
                        <code>{`<Icon viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="none"/>
    <text x="50" y="56" textAnchor="middle" className="fill-current text-xs font-bold">100</text>
</Icon>

<Icon viewBox="0 0 32 32">
    <path d="M16 2L20 12L30 12L22 18L26 28L16 22L6 28L10 18L2 12L12 12Z" fill="currentColor" />
</Icon>`}</code>
                    </pre>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Accessibility Features
                    </h3>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <Icon name="info" data-testid="info-icon" />
                                <span className="text-gray-700 dark:text-gray-200">Icon with test ID for testing</span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                All icons automatically include <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">aria-hidden="true"</code>{' '}
                                and <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">focusable="false"</code> for proper screen reader support.
                            </p>
                        </div>
                    </div>
                    <pre className="mt-4 bg-gray-100 dark:bg-gray-800 p-4 rounded text-sm overflow-x-auto">
                        <code>{`<Icon name="info" data-testid="info-icon" />

{/* Icons automatically have: */}
// aria-hidden="true"
// focusable="false"`}</code>
                    </pre>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Priority System: Children vs Name
                    </h3>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-6">
                            <div className="text-center">
                                <Icon name="star">
                                    <circle cx="12" cy="12" r="8" />
                                </Icon>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Custom children override name</p>
                            </div>
                            <div className="text-center">
                                <Icon name="star" />
                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Built-in star icon</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-4">
                            When both <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">children</code>{' '}
                            and <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">name</code> are provided,
                            custom children take priority over the built-in icon.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
