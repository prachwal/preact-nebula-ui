import { useState, useEffect } from 'preact/hooks'
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'

interface MarkdownViewerProps {
    readonly filePath: string
    readonly className?: string
}

// Configure marked with highlight.js
marked.setOptions({
    highlight: function (code, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(code, { language: lang }).value
            } catch (err) {
                console.warn('Highlight.js error:', err)
            }
        }
        return hljs.highlightAuto(code).value
    },
    langPrefix: 'hljs language-',
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
            className={`
        markdown-viewer prose prose-gray dark:prose-invert max-w-none
        prose-headings:text-gray-900 dark:prose-headings:text-white
        prose-p:text-gray-700 dark:prose-p:text-gray-300
        prose-strong:text-gray-900 dark:prose-strong:text-white
        prose-code:text-pink-600 dark:prose-code:text-pink-400
        prose-code:bg-gray-100 dark:prose-code:bg-gray-800
        prose-code:px-1 prose-code:py-0.5 prose-code:rounded
        prose-pre:bg-gray-900 dark:prose-pre:bg-gray-900
        prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-700
        prose-blockquote:border-l-blue-500 dark:prose-blockquote:border-l-blue-400
        prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-900/20
        prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r
        prose-a:text-blue-600 dark:prose-a:text-blue-400
        prose-a:hover:text-blue-800 dark:prose-a:hover:text-blue-300
        prose-table:text-sm
        prose-th:bg-gray-50 dark:prose-th:bg-gray-800
        prose-th:text-gray-900 dark:prose-th:text-white
        prose-td:text-gray-700 dark:prose-td:text-gray-300
        ${className}
      `}
            dangerouslySetInnerHTML={{ __html: content }}
        />
    )
}
