import { ComponentCard } from './ComponentCard'
import type { Component } from '../../data/components'

interface ComponentGroupProps {
  title: string
  components: Component[]
}

export function ComponentGroup({ title, components }: ComponentGroupProps) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
        {title}
        <span className="ml-3 text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
          {components.length} component{components.length !== 1 ? 's' : ''}
        </span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {components.map((component) => (
          <ComponentCard key={component.name} component={component} />
        ))}
      </div>
    </div>
  )
}
