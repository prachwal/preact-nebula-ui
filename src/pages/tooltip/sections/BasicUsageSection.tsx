import { Tooltip, Button } from '../../../../nebula/components'

export function BasicUsageSection() {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Basic Usage
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Simple tooltips with hover trigger and different content types.
        </p>
      </div>
      
      <div className="flex flex-wrap items-center gap-6">
        <Tooltip content="This is a simple tooltip">
          <Button>Hover me</Button>
        </Tooltip>
        
        <Tooltip content="This tooltip has a longer text content that will wrap nicely within the maximum width constraints.">
          <Button variant="outline">Long content</Button>
        </Tooltip>
        
        <Tooltip 
          content={
            <div className="space-y-1">
              <div className="font-semibold">Rich Content</div>
              <div className="text-sm">With multiple elements</div>
            </div>
          }
        >
          <Button variant="ghost">Rich tooltip</Button>
        </Tooltip>
      </div>
    </section>
  )
}
