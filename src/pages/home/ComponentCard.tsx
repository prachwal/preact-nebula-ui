import { route } from 'preact-router'
import type { Component } from '../../data/components'

interface ComponentCardProps {
  component: Component
}

export function ComponentCard({ component }: ComponentCardProps) {
  const statusConfig = {
    completed: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-200 dark:border-green-800',
      text: 'text-green-800 dark:text-green-200',
      badge: 'bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200',
      icon: '✅'
    },
    'in-progress': {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      border: 'border-yellow-200 dark:border-yellow-800',
      text: 'text-yellow-800 dark:text-yellow-200',
      badge: 'bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200',
      icon: '🚧'
    },
    planned: {
      bg: 'bg-gray-50 dark:bg-gray-800/50',
      border: 'border-gray-200 dark:border-gray-700',
      text: 'text-gray-800 dark:text-gray-200',
      badge: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200',
      icon: '📋'
    }
  }

  const config = statusConfig[component.status]

  return (
    <div 
      className={`${config.bg} ${config.border} border rounded-lg p-6 cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02]`}
      onClick={() => component.status === 'completed' && route(component.path)}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className={`text-lg font-semibold ${config.text}`}>
          {component.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 text-xs rounded-full ${config.badge}`}>
            {config.icon} {component.status === 'in-progress' ? 'In Progress' : component.status === 'planned' ? 'Planned' : 'Ready'}
          </span>
          {component.testCoverage !== undefined && component.testCoverage > 0 && (
            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200">
              {component.testCoverage}% tested
            </span>
          )}
        </div>
      </div>
      
      <p className={`text-sm mb-4 ${config.text.replace('800', '600').replace('200', '300')}`}>
        {component.description}
      </p>
      
      <div className="flex items-center justify-between text-xs">
        <span className={`${config.text.replace('800', '500').replace('200', '400')}`}>
          {component.category}
        </span>
        {component.status === 'completed' ? (
          <span className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200">
            View Demo →
          </span>
        ) : (
          <span className={`${config.text.replace('800', '500').replace('200', '400')}`}>
            Coming Soon
          </span>
        )}
      </div>
    </div>
  )
}
