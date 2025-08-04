import { useState } from 'preact/hooks'
import { 
  StatsCards, 
  GroupingControls, 
  ComponentGroup, 
  TestCoverageSection,
  type GroupBy 
} from '.'
import { 
  getComponentsByMilestone, 
  getComponentsByCategory, 
  getAllComponentsAlphabetically 
} from '../../data/components'

interface PageProps {
  path?: string
}

export function HomePage(_props: PageProps) {
  const [groupBy, setGroupBy] = useState<GroupBy>('milestone')

  const getGroupedComponents = () => {
    switch (groupBy) {
      case 'milestone':
        return getComponentsByMilestone()
      case 'category':
        return getComponentsByCategory()
      case 'alphabetical':
        return getAllComponentsAlphabetically()
      default:
        return []
    }
  }

  const groupedComponents = getGroupedComponents()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🌟 Nebula UI Component Library
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A comprehensive collection of modern, accessible, and customizable UI components built with Preact and Tailwind CSS.
          </p>
        </div>

        {/* Stats Cards */}
        <StatsCards />

        {/* Grouping Controls */}
        <GroupingControls groupBy={groupBy} onGroupByChange={setGroupBy} />

        {/* Grouped Components */}
        {groupedComponents.map((group) => (
          <ComponentGroup 
            key={group.title} 
            title={group.title} 
            components={group.components} 
          />
        ))}

        {/* Test Coverage Section */}
        <TestCoverageSection />
      </div>
    </div>
  )
}
