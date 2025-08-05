interface Tab {
  key: string
  label: string
}

interface DemoTabsProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tab: string) => void
  className?: string
}

export function DemoTabs({ tabs, activeTab, onTabChange, className = "" }: DemoTabsProps) {
  return (
    <div className={`flex space-x-1 mt-6 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg ${className}`}>
      {tabs.map(tab => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === tab.key
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

export type { Tab }
