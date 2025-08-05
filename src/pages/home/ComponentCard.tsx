import { route } from 'preact-router'
import { Card, CardBody, Badge, Stack } from '../../../nebula/components'
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
    <Card 
      className={`${config.bg} ${config.border} cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02]`}
      onClick={() => component.status === 'completed' && route(component.path)}
    >
      <CardBody>
        <Stack spacing="md">
          {/* Header with title and badges */}
          <div className="flex items-start justify-between">
            <h3 className={`text-lg font-semibold ${config.text}`}>
              {component.name}
            </h3>
            <div className="flex items-center gap-2">
              <Badge
                variant={component.status === 'completed' ? 'success' : component.status === 'in-progress' ? 'warning' : 'default'}
                size="sm"
              >
                {config.icon} {component.status === 'in-progress' ? 'In Progress' : component.status === 'planned' ? 'Planned' : 'Ready'}
              </Badge>
              {component.testCoverage !== undefined && component.testCoverage > 0 && (
                <Badge variant="primary" size="sm">
                  {component.testCoverage}% tested
                </Badge>
              )}
            </div>
          </div>
          
          {/* Description */}
          <p className={`text-sm ${config.text.replace('800', '600').replace('200', '300')}`}>
            {component.description}
          </p>
          
          {/* Footer */}
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
        </Stack>
      </CardBody>
    </Card>
  )
}
