import { useState, useEffect } from 'preact/hooks'
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'
import '../styles/markdown.css'

interface MarkdownViewerProps {
    readonly filePath: string
    readonly className?: string
}

// Configure marked with highlight.js renderer
const renderer = new marked.Renderer()

// Custom code renderer for highlight.js
renderer.code = function ({ text, lang }) {
    const validLanguage = lang && hljs.getLanguage(lang) ? lang : ''
    if (validLanguage) {
        try {
            const highlighted = hljs.highlight(text, { language: validLanguage }).value
            return `<pre class="hljs"><code class="hljs language-${validLanguage}">${highlighted}</code></pre>`
        } catch (err) {
            console.warn('Highlight.js error:', err)
        }
    }

    // Fallback to auto-detect
    try {
        const highlighted = hljs.highlightAuto(text).value
        return `<pre class="hljs"><code class="hljs">${highlighted}</code></pre>`
    } catch (err) {
        console.warn('Highlight.js auto-detect error:', err)
        return `<pre><code>${text}</code></pre>`
    }
}

// Set marked options
marked.setOptions({
    renderer,
    breaks: true,
    gfm: true,
})

export function MarkdownViewer({ filePath, className = '' }: MarkdownViewerProps) {
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let mounted = true

        const loadMarkdown = async () => {
            setLoading(true)
            setError(null)

            try {
                const response = await fetch(filePath)

                if (!response.ok) {
                    throw new Error(`Failed to load ${filePath}: ${response.status} ${response.statusText}`)
                }

                const markdownText = await response.text()

                if (mounted) {
                    const htmlContent = await marked.parse(markdownText)
                    setContent(htmlContent)
                }
            } catch (err) {
                if (mounted) {
                    setError(err instanceof Error ? err.message : 'Failed to load markdown file')
                }
            } finally {
                if (mounted) {
                    setLoading(false)
                }
            }
        }

        loadMarkdown()

        return () => {
            mounted = false
        }
    }, [filePath])

    if (loading) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400"></div>
                <span className="ml-3 text-gray-600 dark:text-gray-300">Ładowanie dokumentacji...</span>
            </div>
        )
    }

    if (error) {
        return (
            <div className="p-8 text-center">
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-red-800 dark:text-red-300 mb-2">
                        Błąd ładowania dokumentacji
                    </h3>
                    <p className="text-red-600 dark:text-red-400">{error}</p>
                </div>
            </div>
        )
    }

    return (
        <div
            className={`markdown-viewer ${className}`}
            dangerouslySetInnerHTML={{ __html: content }}
        />
    )
}
