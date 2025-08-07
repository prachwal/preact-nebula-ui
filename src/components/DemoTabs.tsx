import { useState } from 'preact/hooks'
import type { ComponentChildren } from 'preact'

interface TabSection {
  id: string
  label: string
  content: ComponentChildren
}

interface DemoTabsProps {
  tabs: TabSection[]
  className?: string
}

export function DemoTabs({ tabs, className = "" }: DemoTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || '')

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content

  return (
    <div className={className}>
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg mb-8">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {activeTabContent}
      </div>
    </div>
  )
}
