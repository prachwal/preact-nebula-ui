import { useUrlTabs } from './useUrlTabs'
import { usePathTabs } from './usePathTabs'

/**
 * Configuration for tab-enabled pages with URL integration
 */
export interface TabPageConfig {
    /** Default tab to show when no URL parameter is present */
    defaultTab: string
    /** Valid tab values that can be set via URL */
    validTabs: string[]
    /** Tab definitions for DemoTabs component */
    tabs: Array<{ key: string; label: string }>
}

/**
 * Configuration for path-based tab routing
 */
export interface PathTabPageConfig extends TabPageConfig {
    /** Base path for the component (e.g., '/config-provider') */
    basePath: string
}

/**
 * Hook for component pages that need URL-integrated tabs
 * Provides consistent URL tab behavior across all component pages
 * 
 * @param config - Configuration object with tab settings
 * @returns Object with activeTab and setActiveTab for DemoTabs component
 * 
 * @example
 * ```tsx
 * const tabConfig: TabPageConfig = {
 *   defaultTab: 'basic',
 *   validTabs: ['basic', 'variants', 'props', 'documentation'],
 *   tabs: [
 *     { key: 'basic', label: 'Basic Usage' },
 *     { key: 'variants', label: 'Variants' },
 *     { key: 'props', label: 'Props' },
 *     { key: 'documentation', label: 'Documentation' }
 *   ]
 * }
 * 
 * const { activeTab, setActiveTab, tabs } = useTabPage(tabConfig)
 * 
 * <DemoTabs
 *   tabs={tabs}
 *   activeTab={activeTab}
 *   onTabChange={setActiveTab}
 * />
 * ```
 */
export function useTabPage(config: TabPageConfig) {
    const { activeTab, setActiveTab } = useUrlTabs({
        defaultTab: config.defaultTab,
        validTabs: config.validTabs
    })

    return {
        activeTab,
        setActiveTab,
        tabs: config.tabs
    }
}

/**
 * Hook for component pages that need path-based tab routing
 * Uses URL paths like /config-provider/documentation instead of query parameters
 * 
 * @param config - Configuration object with tab settings and base path
 * @returns Object with activeTab and setActiveTab for DemoTabs component
 * 
 * @example
 * ```tsx
 * const tabConfig: PathTabPageConfig = {
 *   basePath: '/config-provider',
 *   defaultTab: 'basic',
 *   validTabs: ['basic', 'theme', 'documentation'],
 *   tabs: [
 *     { key: 'basic', label: 'Basic Usage' },
 *     { key: 'theme', label: 'Theme' },
 *     { key: 'documentation', label: 'Documentation' }
 *   ]
 * }
 * 
 * const { activeTab, setActiveTab, tabs } = usePathTabPage(tabConfig)
 * ```
 */
export function usePathTabPage(config: PathTabPageConfig) {
    const { activeTab, setActiveTab } = usePathTabs({
        basePath: config.basePath,
        defaultTab: config.defaultTab,
        validTabs: config.validTabs
    })

    return {
        activeTab,
        setActiveTab,
        tabs: config.tabs
    }
}

/**
 * Pre-configured tab configs for common component page patterns
 */
export const TabPageConfigs = {
    /**
     * Standard component page with documentation
     */
    withDocumentation: (additionalTabs: Array<{ key: string; label: string }> = []): TabPageConfig => ({
        defaultTab: 'basic',
        validTabs: [...additionalTabs.map(t => t.key), 'basic', 'props', 'documentation'],
        tabs: [
            { key: 'basic', label: 'Basic Usage' },
            ...additionalTabs,
            { key: 'props', label: 'Props' },
            { key: 'documentation', label: 'Documentation' }
        ]
    }),

    /**
     * Advanced component page with multiple sections
     */
    advanced: (tabs: Array<{ key: string; label: string }>): TabPageConfig => ({
        defaultTab: tabs[0]?.key || 'basic',
        validTabs: tabs.map(t => t.key),
        tabs
    })
}

/**
 * Pre-configured tab configs for path-based routing
 */
export const PathTabPageConfigs = {
    /**
     * Standard component page with path-based documentation routing
     */
    withDocumentation: (basePath: string, additionalTabs: Array<{ key: string; label: string }> = []): PathTabPageConfig => ({
        basePath,
        defaultTab: 'basic',
        validTabs: [...additionalTabs.map(t => t.key), 'basic', 'props', 'documentation'],
        tabs: [
            { key: 'basic', label: 'Basic Usage' },
            ...additionalTabs,
            { key: 'props', label: 'Props' },
            { key: 'documentation', label: 'Documentation' }
        ]
    }),

    /**
     * Advanced component page with path-based routing
     */
    advanced: (basePath: string, tabs: Array<{ key: string; label: string }>): PathTabPageConfig => ({
        basePath,
        defaultTab: tabs[0]?.key || 'basic',
        validTabs: tabs.map(t => t.key),
        tabs
    })
}
