import { useState, useEffect } from 'preact/hooks'
import { route } from 'preact-router'

interface UsePathTabsOptions {
    basePath: string
    defaultTab: string
    validTabs?: string[]
}

export function usePathTabs({ basePath, defaultTab, validTabs }: UsePathTabsOptions) {
    const [activeTab, setActiveTab] = useState<string>(defaultTab)

    // Read tab from URL path on mount
    useEffect(() => {
        const currentPath = window.location.pathname
        const basePathWithSlash = basePath.endsWith('/') ? basePath : basePath + '/'

        if (currentPath.startsWith(basePathWithSlash)) {
            const tabFromPath = currentPath.replace(basePathWithSlash, '') || defaultTab

            if (!validTabs || validTabs.includes(tabFromPath)) {
                setActiveTab(tabFromPath)
            } else {
                setActiveTab(defaultTab)
            }
        }
    }, [basePath, defaultTab, validTabs])

    // Update URL when tab changes
    const changeTab = (newTab: string) => {
        setActiveTab(newTab)

        const newPath = newTab === defaultTab ? basePath : `${basePath}/${newTab}`
        route(newPath)
    }

    return {
        activeTab,
        setActiveTab: changeTab
    }
}
