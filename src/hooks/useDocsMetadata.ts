import { useState, useEffect } from 'preact/hooks'

export interface DocFile {
    name: string
    path: string
    category: 'Components' | 'Milestones' | 'Project' | 'Reports'
    description: string
    size: 'small' | 'medium' | 'large'
    tags: string[]
    hasTests?: boolean
    hasStories?: boolean
    lastModified: string
}

export interface DocsMetadata {
    components: DocFile[]
    milestones: DocFile[]
    project: DocFile[]
    reports: DocFile[]
    generated: string
    totalFiles: number
}

/**
 * Hook to load documentation metadata
 */
export function useDocsMetadata() {
    const [metadata, setMetadata] = useState<DocsMetadata | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let isMounted = true

        const loadMetadata = async () => {
            try {
                setLoading(true)
                setError(null)

                const response = await fetch('/docs/docs-metadata.json')
                if (!response.ok) {
                    throw new Error(`Failed to load metadata: ${response.statusText}`)
                }

                const data = await response.json()

                if (isMounted) {
                    setMetadata(data)
                }
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err.message : 'Unknown error')
                    console.error('Failed to load docs metadata:', err)
                }
            } finally {
                if (isMounted) {
                    setLoading(false)
                }
            }
        }

        loadMetadata()

        return () => {
            isMounted = false
        }
    }, [])

    return {
        metadata,
        loading,
        error,
        allFiles: metadata ? [
            ...metadata.components,
            ...metadata.milestones,
            ...metadata.project,
            ...metadata.reports
        ] : []
    }
}
