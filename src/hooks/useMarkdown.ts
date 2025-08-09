import { useState, useEffect } from 'preact/hooks'
import { marked } from 'marked'

interface UseMarkdownReturn {
    content: string
    loading: boolean
    error: string | null
}

export function useMarkdown(filePath: string): UseMarkdownReturn {
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

        if (filePath) {
            loadMarkdown()
        }

        return () => {
            mounted = false
        }
    }, [filePath])

    return { content, loading, error }
}
