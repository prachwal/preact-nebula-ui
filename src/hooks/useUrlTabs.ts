import { useState, useEffect } from 'preact/hooks'

interface UseUrlTabsOptions {
    defaultTab: string
    validTabs?: string[]
}

export function useUrlTabs({ defaultTab, validTabs }: UseUrlTabsOptions) {
    const [activeTab, setActiveTab] = useState<string>(defaultTab)

    // Read tab from URL on mount
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const tabFromUrl = urlParams.get('tab')

        if (tabFromUrl && (!validTabs || validTabs.includes(tabFromUrl))) {
            setActiveTab(tabFromUrl)
        }
    }, [validTabs])

    // Update URL when tab changes
    const changeTab = (newTab: string) => {
        setActiveTab(newTab)

        const url = new URL(window.location.href)
        url.searchParams.set('tab', newTab)

        // Update URL without page reload
        window.history.replaceState({}, '', url.toString())
    }

    return {
        activeTab,
        setActiveTab: changeTab
    }
}
