import { useState } from 'preact/hooks'
import { 
  StatsCards, 
  GroupingControls, 
  SearchControls,
  ComponentGroup, 
  TestCoverageSection,
  type GroupBy 
} from '.'
import { 
  getComponentsByMilestone, 
  getComponentsByCategory, 
  getAllComponentsAlphabetically,
  getFilteredComponentsByMilestone,
  getFilteredComponentsByCategory,
  getFilteredComponentsAlphabetically
} from '../../data/components'
import { Container, Stack } from '../../../nebula/components'

interface PageProps {
  path?: string
}

export function HomePage(_props: PageProps) {
  const [groupBy, setGroupBy] = useState<GroupBy>('milestone')
  const [searchTerm, setSearchTerm] = useState('')

  const getGroupedComponents = () => {
    // If there's a search term, use filtered functions
    if (searchTerm.trim()) {
      switch (groupBy) {
        case 'milestone':
          return getFilteredComponentsByMilestone(searchTerm)
        case 'category':
          return getFilteredComponentsByCategory(searchTerm)
        case 'alphabetical':
          return getFilteredComponentsAlphabetically(searchTerm)
        default:
          return []
      }
    }
    
    // Otherwise use regular functions
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
      <Container size="2xl" className="py-12">
        <Stack spacing="xl" align="center">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              🌟 Nebula UI Component Library
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A comprehensive collection of modern, accessible, and customizable UI components built with Preact and Tailwind CSS.
            </p>
          </div>

          {/* Stats Cards */}
          <StatsCards />

          {/* Search Controls */}
          <SearchControls searchTerm={searchTerm} onSearchChange={setSearchTerm} />

          {/* Grouping Controls */}
          <GroupingControls groupBy={groupBy} onGroupByChange={setGroupBy} />

          {/* Results Summary */}
          {searchTerm.trim() && (
            <div className="w-full bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-blue-800 dark:text-blue-200 text-center">
                Found {groupedComponents.reduce((total, group) => total + group.components.length, 0)} components 
                matching "{searchTerm}"
              </p>
            </div>
          )}

          {/* Grouped Components */}
          <div className="w-full space-y-8">
            {groupedComponents.map((group) => (
              <ComponentGroup 
                key={group.title} 
                title={group.title} 
                components={group.components} 
              />
            ))}
          </div>

          {/* Test Coverage Section */}
          <TestCoverageSection />
        </Stack>
      </Container>
    </div>
  )
}
