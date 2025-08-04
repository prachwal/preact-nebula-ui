type DemoType = 'direction' | 'spacing' | 'alignment' | 'examples'

interface NavigationTabsProps {
  activeDemo: DemoType
  onDemoChange: (demo: DemoType) => void
}

export function NavigationTabs({ activeDemo, onDemoChange }: NavigationTabsProps) {
  const tabs = [
    { key: 'direction' as const, label: 'Direction & Spacing' },
    { key: 'spacing' as const, label: 'Spacing Variants' },
    { key: 'alignment' as const, label: 'Alignment Options' },
    { key: 'examples' as const, label: 'Layout Examples' }
  ]

  return (
    <div className="flex space-x-1 mt-6 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
      {tabs.map(tab => (
        <button
          key={tab.key}
          onClick={() => onDemoChange(tab.key)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeDemo === tab.key
              ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow'
              : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export { type DemoType }
