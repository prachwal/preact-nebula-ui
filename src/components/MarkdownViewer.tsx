import { useState, useEffect } from 'preact/hooks'
import { marked } from 'marked'
import hljs from 'highlight.js'
import { route } from 'preact-router'
import 'highlight.js/styles/github-dark.css'
import '../styles/markdown.css'

interface MarkdownViewerProps {
    readonly filePath: string
    readonly className?: string
}

// Configure marked with highlight.js renderer
const renderer = new marked.Renderer()

// Custom link renderer for proper routing
renderer.link = function ({ href, title, text }) {
    // Handle special file references like #file:BackTop.tsx
    if (href?.startsWith('#file:')) {
        const fileName = href.substring(6) // Remove '#file:'
        const defaultTitle = `View file: ${fileName}`
        return `<a href="${href}" title="${title || defaultTitle}" class="file-link" data-file="${fileName}">${text}</a>`
    }

    // Handle .md files - route them properly to /documentation
    if (href?.endsWith('.md')) {
        let cleanHref = href.replace(/^\.\//, '/').replace(/\.md$/, '.md')
        // Transform /docs paths to /documentation paths
        if (cleanHref.startsWith('/docs/')) {
            cleanHref = cleanHref.replace('/docs/', '/documentation/')
        } else if (cleanHref.startsWith('/')) {
            // Add /documentation prefix for root-relative .md files
            cleanHref = `/documentation${cleanHref}`
        }
        return `<a href="${cleanHref}" title="${title || ''}" class="markdown-link" data-route="true">${text}</a>`
    }

    // Handle external links
    if (href && (href.startsWith('http') || href.startsWith('//') || href.startsWith('mailto:'))) {
        return `<a href="${href}" title="${title || ''}" target="_blank" rel="noopener noreferrer" class="external-link">${text}</a>`
    }

    // Handle internal links - also transform /docs to /documentation
    if (href?.startsWith('/docs/')) {
        const transformedHref = href.replace('/docs/', '/documentation/')
        return `<a href="${transformedHref}" title="${title || ''}" class="internal-link" data-route="true">${text}</a>`
    }

    // Handle internal links
    return `<a href="${href}" title="${title || ''}" class="internal-link">${text}</a>`
}
renderer.code = function ({ text, lang }) {
    const validLanguage = lang && hljs.getLanguage(lang) ? lang : ''
    const generateId = () => `copy-${Math.random().toString(36).substring(2, 11)}`

    if (validLanguage) {
        try {
            const highlighted = hljs.highlight(text, { language: validLanguage }).value
            const copyButtonId = generateId()
            return `<div class="code-block-wrapper">
                <div class="code-header">
                    <span class="code-language">${validLanguage}</span>
                    <button class="copy-button" data-copy="${copyButtonId}" data-text="${encodeURIComponent(text)}">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                        </svg>
                        Kopiuj
                    </button>
                </div>
                <pre class="hljs"><code class="hljs language-${validLanguage}" id="${copyButtonId}">${highlighted}</code></pre>
            </div>`
        } catch (err) {
            console.warn('Highlight.js error:', err)
        }
    }

    // Fallback to auto-detect
    const fallbackId = generateId()
    try {
        const highlighted = hljs.highlightAuto(text).value
        const detectedLang = hljs.highlightAuto(text).language || 'text'
        return `<div class="code-block-wrapper">
            <div class="code-header">
                <span class="code-language">${detectedLang}</span>
                <button class="copy-button" data-copy="${fallbackId}" data-text="${encodeURIComponent(text)}">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                    </svg>
                    Kopiuj
                </button>
            </div>
            <pre class="hljs"><code class="hljs" id="${fallbackId}">${highlighted}</code></pre>
        </div>`
    } catch (err) {
        console.warn('Highlight.js auto-detect error:', err)
        const errorId = generateId()
        return `<div class="code-block-wrapper">
            <div class="code-header">
                <span class="code-language">text</span>
                <button class="copy-button" data-copy="${errorId}" data-text="${encodeURIComponent(text)}">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                    </svg>
                    Kopiuj
                </button>
            </div>
            <pre><code id="${errorId}">${text}</code></pre>
        </div>`
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

    // Handle link clicks for routing
    useEffect(() => {
        const handleLinkClick = (event: Event) => {
            const target = event.target as HTMLElement
            const link = target.closest('a')

            if (link?.getAttribute('data-route') === 'true') {
                event.preventDefault()
                const href = link.getAttribute('href')
                if (href) {
                    // Navigate using preact-router
                    import('preact-router').then(({ route }) => {
                        route(href)
                    })
                }
            } else if (link?.classList.contains('file-link')) {
                event.preventDefault()
                const fileName = link.getAttribute('data-file')
                if (fileName) {
                    console.log('File reference clicked:', fileName)

                    // Try to construct file path
                    let filePath = fileName

                    // Handle different file paths
                    if (fileName.includes('/')) {
                        // Already has path
                        filePath = fileName
                    } else if (fileName.endsWith('.tsx') || fileName.endsWith('.ts')) {
                        // TypeScript files - try common locations
                        const possiblePaths = [
                            `nebula/components/${fileName.replace('.tsx', '')}/${fileName}`,
                            `src/components/${fileName}`,
                            `src/${fileName}`,
                            fileName
                        ]
                        filePath = possiblePaths[0] // Use first as default
                    }

                    // Create GitHub URL for file viewing
                    const githubUrl = `https://github.com/prachwal/preact-nebula-ui/blob/master/${filePath}`

                    // Open in new tab
                    window.open(githubUrl, '_blank', 'noopener,noreferrer')
                }
            }
        }

        document.addEventListener('click', handleLinkClick)

        return () => {
            document.removeEventListener('click', handleLinkClick)
        }
    }, [content])

    // Handle fragment scrolling after content loads
    useEffect(() => {
        if (content && typeof window !== 'undefined') {
            const hash = window.location.hash
            if (hash) {
                // Small delay to ensure content is rendered
                setTimeout(() => {
                    try {
                        const element = document.querySelector(hash)
                        if (element) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        }
                    } catch (error) {
                        console.warn('Error scrolling to fragment:', error)
                    }
                }, 100)
            }
        }
    }, [content])

    // Handle copy button clicks
    useEffect(() => {
        const handleCopyClick = async (event: Event) => {
            const target = event.target as HTMLElement
            const button = target.closest('.copy-button') as HTMLButtonElement

            if (button) {
                event.preventDefault()

                try {
                    const encodedText = button.getAttribute('data-text')
                    if (encodedText) {
                        const text = decodeURIComponent(encodedText)
                        await navigator.clipboard.writeText(text)

                        // Visual feedback
                        const originalText = button.innerHTML
                        button.innerHTML = `
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                            </svg>
                            Skopiowano!
                        `
                        button.classList.add('copied')

                        setTimeout(() => {
                            button.innerHTML = originalText
                            button.classList.remove('copied')
                        }, 2000)
                    }
                } catch (err) {
                    console.error('Failed to copy text:', err)

                    // Fallback visual feedback
                    const originalText = button.innerHTML
                    button.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                        Błąd
                    `

                    setTimeout(() => {
                        button.innerHTML = originalText
                    }, 2000)
                }
            }
        }

        document.addEventListener('click', handleCopyClick)

        return () => {
            document.removeEventListener('click', handleCopyClick)
        }
    }, [content])

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

    // BackTop button visibility
    const [showBackTop, setShowBackTop] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop
            setShowBackTop(scrollTop > 400)
        }
        window.addEventListener('scroll', handleScroll)
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            <div className={`markdown-viewer ${className}`} dangerouslySetInnerHTML={{ __html: content }} />
            {showBackTop && (
                <button
                    type="button"
                    className="fixed bottom-8 right-8 z-50 backtop-btn transition-all duration-200 flex items-center justify-center cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-offset-2 w-10 h-10 rounded-full bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-lg"
                    aria-label="Przewiń do góry"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    style={{ boxShadow: '0 4px 16px 0 rgba(30, 64, 175, 0.15)' }}
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                        <path d="M18 15L12 9L6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            )}
        </>
    )
}
