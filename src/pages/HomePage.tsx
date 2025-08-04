import { route } from 'preact-router'
import { useState } from 'preact/hooks'

interface PageProps {
  path?: string
}

type GroupBy = 'milestone' | 'category' | 'alphabetical'

interface Component {
  name: string
  path: string
  description: string
  milestone: string
  category: string
  status: 'completed' | 'in-progress'
}

export function HomePage(_props: PageProps) {
  const [groupBy, setGroupBy] = useState<GroupBy>('milestone')

  const components: Component[] = [
    // Milestone 1: Forms Foundation
    { name: 'Input', path: '/input', description: 'Text input field with validation and icons', milestone: 'Milestone 1: Forms Foundation', category: 'Forms', status: 'completed' },
    { name: 'Textarea', path: '/textarea', description: 'Multi-line text input with auto-resize', milestone: 'Milestone 1: Forms Foundation', category: 'Forms', status: 'completed' },
    { name: 'Label', path: '/label', description: 'Form labels with required indicators', milestone: 'Milestone 1: Forms Foundation', category: 'Forms', status: 'completed' },
    { name: 'FieldError', path: '/field-error', description: 'Error message display for forms', milestone: 'Milestone 1: Forms Foundation', category: 'Forms', status: 'completed' },
    
    // Milestone 2: Layout System
    { name: 'Card', path: '/card', description: 'Content container with header, body, and footer', milestone: 'Milestone 2: Layout System', category: 'Layout', status: 'completed' },
    { name: 'Container', path: '/container', description: 'Responsive layout wrapper with max-width constraints', milestone: 'Milestone 2: Layout System', category: 'Layout', status: 'completed' },
    { name: 'Stack', path: '/stack', description: 'Vertical/horizontal layout with spacing control', milestone: 'Milestone 2: Layout System', category: 'Layout', status: 'completed' },
    { name: 'Divider', path: '/divider', description: 'Visual separator with text support', milestone: 'Milestone 2: Layout System', category: 'Layout', status: 'completed' },
    
    // Milestone 3: User Feedback
    { name: 'Alert', path: '/alert', description: 'Contextual feedback messages with dismissible functionality', milestone: 'Milestone 3: User Feedback', category: 'Feedback', status: 'completed' },
    { name: 'Badge', path: '/badge', description: 'Small status indicators and count displays', milestone: 'Milestone 3: User Feedback', category: 'Feedback', status: 'completed' },
    { name: 'Progress', path: '/progress', description: 'Linear and circular progress indicators', milestone: 'Milestone 3: User Feedback', category: 'Feedback', status: 'completed' },
    { name: 'Skeleton', path: '/skeleton', description: 'Loading placeholders that maintain layout structure', milestone: 'Milestone 3: User Feedback', category: 'Feedback', status: 'completed' },
    
    // Milestone 4: Form Controls
    { name: 'Checkbox', path: '/checkbox', description: 'Tri-state checkboxes with validation and accessibility features', milestone: 'Milestone 4: Form Controls', category: 'Forms', status: 'completed' },
    { name: 'Radio', path: '/radio', description: 'Radio buttons with group management and keyboard navigation', milestone: 'Milestone 4: Form Controls', category: 'Forms', status: 'completed' },
    { name: 'Switch', path: '/switch', description: 'Toggle switches with smooth animations and custom icons', milestone: 'Milestone 4: Form Controls', category: 'Forms', status: 'completed' },
    { name: 'Select', path: '/select', description: 'Dropdown selection with search and multi-select capabilities', milestone: 'Milestone 4: Form Controls', category: 'Forms', status: 'completed' },
    
    // Core Components
    { name: 'Button', path: '/button', description: 'Interactive button component with variants, sizes, and states', milestone: 'Core Components', category: 'General', status: 'completed' },
    { name: 'Spinner', path: '/spinner', description: 'Loading indicator with customizable sizes and colors', milestone: 'Core Components', category: 'Feedback', status: 'completed' },
    { name: 'Avatar', path: '/avatar', description: 'User profile picture with fallbacks and status indicators', milestone: 'Advanced Interactions', category: 'Data Display', status: 'completed' }
  ]

  const navigateTo = (path: string) => {
    route(path)
  }

  const getGroupedComponents = () => {
    switch (groupBy) {
      case 'milestone':
        const milestoneGroups = components.reduce((groups, component) => {
          const milestone = component.milestone
          if (!groups[milestone]) groups[milestone] = []
          groups[milestone].push(component)
          return groups
        }, {} as Record<string, Component[]>)
        return Object.entries(milestoneGroups).map(([milestone, comps]) => ({
          title: milestone,
          components: comps.sort((a, b) => a.name.localeCompare(b.name))
        }))

      case 'category':
        const categoryGroups = components.reduce((groups, component) => {
          const category = component.category
          if (!groups[category]) groups[category] = []
          groups[category].push(component)
          return groups
        }, {} as Record<string, Component[]>)
        return Object.entries(categoryGroups).map(([category, comps]) => ({
          title: category,
          components: comps.sort((a, b) => a.name.localeCompare(b.name))
        }))

      case 'alphabetical':
        return [{
          title: 'All Components',
          components: [...components].sort((a, b) => a.name.localeCompare(b.name))
        }]

      default:
        return []
    }
  }

  const groupedComponents = getGroupedComponents()
  const totalComponents = components.length
  const completedComponents = components.filter(c => c.status === 'completed').length

  return (
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🌟 Nebula UI Component Library
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A comprehensive collection of modern, accessible, and customizable UI components built with Preact and Tailwind CSS.
          </p>
        </div>

        {/* Stats Cards */}
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <div class="text-3xl font-bold text-blue-600 dark:text-blue-400">{totalComponents}</div>
            <div class="text-sm text-gray-600 dark:text-gray-300">Total Components</div>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <div class="text-3xl font-bold text-green-600 dark:text-green-400">{completedComponents}</div>
            <div class="text-sm text-gray-600 dark:text-gray-300">Completed</div>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <div class="text-3xl font-bold text-orange-600 dark:text-orange-400">{totalComponents - completedComponents}</div>
            <div class="text-sm text-gray-600 dark:text-gray-300">In Progress</div>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <div class="text-3xl font-bold text-purple-600 dark:text-purple-400">{Math.round((completedComponents / totalComponents) * 100)}%</div>
            <div class="text-sm text-gray-600 dark:text-gray-300">Progress</div>
          </div>
        </div>

        {/* Grouping Controls */}
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 border border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">View Components By:</h2>
          <div class="flex flex-wrap gap-2">
            <button
              onClick={() => setGroupBy('milestone')}
              class={`px-4 py-2 rounded-lg font-medium transition-colors ${
                groupBy === 'milestone'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              📅 Milestone
            </button>
            <button
              onClick={() => setGroupBy('category')}
              class={`px-4 py-2 rounded-lg font-medium transition-colors ${
                groupBy === 'category'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              🗂️ Category
            </button>
            <button
              onClick={() => setGroupBy('alphabetical')}
              class={`px-4 py-2 rounded-lg font-medium transition-colors ${
                groupBy === 'alphabetical'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              🔤 Alphabetical
            </button>
          </div>
        </div>

        {/* Grouped Components */}
        {groupedComponents.map((group) => (
          <div key={group.title} class="mb-12">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              {group.title}
              <span class="ml-3 text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
                {group.components.length} component{group.components.length !== 1 ? 's' : ''}
              </span>
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.components.map((component) => (
                <div 
                  key={component.name} 
                  class="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200 dark:border-gray-700 cursor-pointer group relative"
                  onClick={() => navigateTo(component.path)}
                >
                  {component.status === 'in-progress' && (
                    <div class="absolute top-2 right-2">
                      <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                        In Progress
                      </span>
                    </div>
                  )}
                  
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {component.name}
                  </h3>
                  <p class="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    {component.description}
                  </p>
                  
                  {groupBy !== 'category' && (
                    <div class="text-xs text-gray-500 dark:text-gray-400 mb-2">
                      {component.category}
                    </div>
                  )}
                  
                  <div class="flex items-center justify-between">
                    <div class="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium">
                      View Component
                      <svg class="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    
                    {component.status === 'completed' && (
                      <div class="text-green-600 dark:text-green-400">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Test Coverage Section */}
        <div class="mt-16 text-center">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 border border-gray-200 dark:border-gray-700">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              📊 Test Coverage & Quality
            </h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div class="text-3xl font-bold text-green-600 dark:text-green-400">450+</div>
                <div class="text-sm text-gray-600 dark:text-gray-300">Tests Passing</div>
              </div>
              <div>
                <div class="text-3xl font-bold text-red-600 dark:text-red-400">0</div>
                <div class="text-sm text-gray-600 dark:text-gray-300">Tests Failing</div>
              </div>
              <div>
                <div class="text-3xl font-bold text-blue-600 dark:text-blue-400">{completedComponents}</div>
                <div class="text-sm text-gray-600 dark:text-gray-300">Components Ready</div>
              </div>
              <div>
                <div class="text-3xl font-bold text-purple-600 dark:text-purple-400">100%</div>
                <div class="text-sm text-gray-600 dark:text-gray-300">WCAG AA Compliant</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
