import { Label } from '@/components/Label'
import { Textarea } from '@/components/Textarea'
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
                            Simple Textarea
                        </h3>
                        <div className="grid gap-4 max-w-md">
                            <Textarea
                                placeholder="Enter your message..."
                                value={value}
                                onInput={(e) => setValue((e.target as HTMLTextAreaElement).value)}
                                rows={3}
                            />
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Current length: {value.length} characters
                            </p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200">
                            With Label
                        </h3>
                        <div className="grid gap-2 max-w-md">
                            <Label htmlFor="message-textarea">Message</Label>
                            <Textarea
                                id="message-textarea"
                                placeholder="Type your message here..."
                                rows={4}
                            />
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200">
                            Different Row Heights
                        </h3>
                        <div className="grid gap-4 max-w-md">
                            <div className="space-y-2">
                                <Label htmlFor="small-textarea">Small (2 rows)</Label>
                                <Textarea
                                    id="small-textarea"
                                    placeholder="2 rows textarea"
                                    rows={2}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="medium-textarea">Medium (4 rows)</Label>
                                <Textarea
                                    id="medium-textarea"
                                    placeholder="4 rows textarea"
                                    rows={4}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="large-textarea">Large (6 rows)</Label>
                                <Textarea
                                    id="large-textarea"
                                    placeholder="6 rows textarea"
                                    rows={6}
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
                                <Label htmlFor="controlled-textarea">Controlled Textarea</Label>
                                <Textarea
                                    id="controlled-textarea"
                                    value={value}
                                    onInput={(e) => setValue((e.target as HTMLTextAreaElement).value)}
                                    placeholder="Controlled state"
                                    rows={3}
                                />
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    State managed by React
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="uncontrolled-textarea">Uncontrolled Textarea</Label>
                                <Textarea
                                    id="uncontrolled-textarea"
                                    defaultValue="Initial content"
                                    placeholder="Uncontrolled state"
                                    rows={3}
                                />
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    State managed by DOM
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200">
                            Auto-resize Textarea
                        </h3>
                        <div className="grid gap-4 max-w-md">
                            <div className="space-y-2">
                                <Label htmlFor="auto-resize">Auto-resize</Label>
                                <Textarea
                                    id="auto-resize"
                                    placeholder="This textarea will grow as you type more content..."
                                    autoResize
                                    minRows={2}
                                    maxRows={8}
                                />
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Automatically adjusts height based on content
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
