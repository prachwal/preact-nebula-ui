import { Input } from '@/components/Input'
import { Label } from '@/components/Label'
import { useState } from 'preact/hooks'


export function BasicUsageSection() {
    const [value, setValue] = useState('')

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
                    Basic Usage
                </h2>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200">
                            Simple Input
                        </h3>
                        <div className="grid gap-4 max-w-md">
                            <Input
                                placeholder="Enter your name..."
                                value={value}
                                onInput={(e) => setValue((e.target as HTMLInputElement).value)}
                            />
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Current value: "{value}"
                            </p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200">
                            With Label
                        </h3>
                        <div className="grid gap-2 max-w-md">
                            <Label htmlFor="email-input">Email Address</Label>
                            <Input
                                id="email-input"
                                type="email"
                                placeholder="user@example.com"
                            />
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200">
                            Different Input Types
                        </h3>
                        <div className="grid gap-4 max-w-md">
                            <div className="space-y-2">
                                <Label htmlFor="password-input">Password</Label>
                                <Input
                                    id="password-input"
                                    type="password"
                                    placeholder="Enter password"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="number-input">Number</Label>
                                <Input
                                    id="number-input"
                                    type="number"
                                    placeholder="0"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="url-input">URL</Label>
                                <Input
                                    id="url-input"
                                    type="url"
                                    placeholder="https://example.com"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200">
                            Controlled vs Uncontrolled
                        </h3>
                        <div className="grid gap-4 max-w-md">
                            <div className="space-y-2">
                                <Label htmlFor="controlled-input">Controlled Input</Label>
                                <Input
                                    id="controlled-input"
                                    value={value}
                                    onInput={(e) => setValue((e.target as HTMLInputElement).value)}
                                    placeholder="Controlled state"
                                />
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    State managed by React
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="uncontrolled-input">Uncontrolled Input</Label>
                                <Input
                                    id="uncontrolled-input"
                                    defaultValue="Initial value"
                                    placeholder="Uncontrolled state"
                                />
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    State managed by DOM
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
