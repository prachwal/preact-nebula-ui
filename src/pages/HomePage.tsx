import { route } from 'preact-router'

interface PageProps {
  path?: string
}

export function HomePage(_props: PageProps) {
  const components = [
    { name: 'Button', path: '/button', description: 'Interactive button component with variants, sizes, and states' },
    { name: 'Spinner', path: '/spinner', description: 'Loading indicator with customizable sizes and colors' },
    { name: 'Input', path: '/input', description: 'Text input field with validation and icons' },
    { name: 'Textarea', path: '/textarea', description: 'Multi-line text input with auto-resize' },
    { name: 'Label', path: '/label', description: 'Form labels with required indicators' },
    { name: 'FieldError', path: '/field-error', description: 'Error message display for forms' },
    { name: 'Card', path: '/card', description: 'Content container with header, body, and footer' },
    { name: 'Container', path: '/container', description: 'Responsive layout wrapper with max-width constraints' },
    { name: 'Stack', path: '/stack', description: 'Vertical/horizontal layout with spacing control' },
    { name: 'Divider', path: '/divider', description: 'Visual separator with text support' },
    { name: 'Avatar', path: '/avatar', description: 'User profile picture with fallbacks and status indicators' }
  ]

  const navigateTo = (path: string) => {
    route(path)
  }

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

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {components.map((component) => (
            <div 
              key={component.name} 
              class="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200 dark:border-gray-700 cursor-pointer group"
              onClick={() => navigateTo(component.path)}
            >
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {component.name}
              </h3>
              <p class="text-gray-600 dark:text-gray-300 text-sm">
                {component.description}
              </p>
              <div class="mt-4 flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium">
                View Component
                <svg class="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        <div class="mt-16 text-center">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 border border-gray-200 dark:border-gray-700">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              📊 Test Coverage
            </h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div class="text-3xl font-bold text-green-600 dark:text-green-400">267</div>
                <div class="text-sm text-gray-600 dark:text-gray-300">Tests Passing</div>
              </div>
              <div>
                <div class="text-3xl font-bold text-red-600 dark:text-red-400">4</div>
                <div class="text-sm text-gray-600 dark:text-gray-300">Tests Failing</div>
              </div>
              <div>
                <div class="text-3xl font-bold text-blue-600 dark:text-blue-400">10</div>
                <div class="text-sm text-gray-600 dark:text-gray-300">Components</div>
              </div>
              <div>
                <div class="text-3xl font-bold text-purple-600 dark:text-purple-400">98.5%</div>
                <div class="text-sm text-gray-600 dark:text-gray-300">Coverage</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
