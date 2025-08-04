export interface NavigationTabsProps {
  sections: Array<{ id: string; label: string }>
  activeSection: string
  onSectionChange: (sectionId: string) => void
}

export function NavigationTabs({ sections, activeSection, onSectionChange }: NavigationTabsProps) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <nav className="-mb-px flex space-x-8" aria-label="Table sections">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeSection === section.id
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            aria-current={activeSection === section.id ? 'page' : undefined}
          >
            {section.label}
          </button>
        ))}
      </nav>
    </div>
  )
}
