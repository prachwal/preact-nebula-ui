import { useState } from 'preact/hooks'
import { Tooltip, Button } from '../../../../nebula/components'

export function VariantsSection() {
  const [manualVisible, setManualVisible] = useState(false)

  return (
    <div className="space-y-12">
      {/* Positioning */}
      <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            Positioning
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Tooltips can be positioned in various directions with smart collision detection.
          </p>
        </div>
        
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          {/* Top row */}
          <Tooltip content="Top start" position="top-start">
            <Button size="sm">Top Start</Button>
          </Tooltip>
          <Tooltip content="Top center" position="top">
            <Button size="sm">Top</Button>
          </Tooltip>
          <Tooltip content="Top end" position="top-end">
            <Button size="sm">Top End</Button>
          </Tooltip>
          
          {/* Middle row */}
          <Tooltip content="Left side" position="left">
            <Button size="sm">Left</Button>
          </Tooltip>
          <Tooltip content="Auto positioning" position="auto">
            <Button size="sm">Auto</Button>
          </Tooltip>
          <Tooltip content="Right side" position="right">
            <Button size="sm">Right</Button>
          </Tooltip>
          
          {/* Bottom row */}
          <Tooltip content="Bottom start" position="bottom-start">
            <Button size="sm">Bottom Start</Button>
          </Tooltip>
          <Tooltip content="Bottom center" position="bottom">
            <Button size="sm">Bottom</Button>
          </Tooltip>
          <Tooltip content="Bottom end" position="bottom-end">
            <Button size="sm">Bottom End</Button>
          </Tooltip>
        </div>
      </section>

      {/* Trigger Types */}
      <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            Trigger Types
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Different ways to trigger tooltip display for various interaction patterns.
          </p>
        </div>
        
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-4">
            <Tooltip content="Shows on hover (default)" trigger="hover">
              <Button>Hover Trigger</Button>
            </Tooltip>
            
            <Tooltip content="Shows on focus" trigger="focus">
              <Button>Focus Trigger</Button>
            </Tooltip>
            
            <Tooltip content="Shows on click, click again to hide" trigger="click">
              <Button>Click Trigger</Button>
            </Tooltip>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Manual Control</h3>
            <div className="flex items-center gap-4">
              <Tooltip 
                content="Manually controlled tooltip" 
                trigger="manual"
                // Note: Manual trigger would need custom implementation
              >
                <span className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-md">
                  Manual tooltip target
                </span>
              </Tooltip>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setManualVisible(!manualVisible)}
              >
                {manualVisible ? 'Hide' : 'Show'} Manual Tooltip
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Sizes */}
      <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            Sizes
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Different tooltip sizes for various content types and contexts.
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-6">
          <Tooltip content="Small tooltip" size="sm">
            <Button size="sm">Small</Button>
          </Tooltip>
          
          <Tooltip content="Medium tooltip (default)" size="md">
            <Button>Medium</Button>
          </Tooltip>
          
          <Tooltip content="Large tooltip with more space for content" size="lg">
            <Button size="lg">Large</Button>
          </Tooltip>
        </div>
      </section>

      {/* Color Schemes */}
      <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            Color Schemes
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Different color themes to match your design system or convey meaning.
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <Tooltip content="Default gray theme" colorScheme="gray">
            <Button variant="outline">Gray</Button>
          </Tooltip>
          
          <Tooltip content="Primary blue theme" colorScheme="primary">
            <Button variant="outline">Primary</Button>
          </Tooltip>
          
          <Tooltip content="Secondary purple theme" colorScheme="secondary">
            <Button variant="outline">Secondary</Button>
          </Tooltip>
          
          <Tooltip content="Success green theme" colorScheme="success">
            <Button variant="outline">Success</Button>
          </Tooltip>
          
          <Tooltip content="Warning yellow theme" colorScheme="warning">
            <Button variant="outline">Warning</Button>
          </Tooltip>
          
          <Tooltip content="Error red theme" colorScheme="error">
            <Button variant="outline">Error</Button>
          </Tooltip>
        </div>
      </section>

      {/* Arrow Options */}
      <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            Arrow Options
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Control arrow visibility and positioning for better visual connection.
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-6">
          <Tooltip content="Tooltip with arrow (default)" hasArrow={true}>
            <Button>With Arrow</Button>
          </Tooltip>
          
          <Tooltip content="Tooltip without arrow" hasArrow={false}>
            <Button variant="outline">No Arrow</Button>
          </Tooltip>
        </div>
      </section>

      {/* Timing Options */}
      <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            Timing Options
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Configure delays for better user experience and reduced flickering.
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-6">
          <Tooltip content="No delay" delay={0} closeDelay={0}>
            <Button>No Delay</Button>
          </Tooltip>
          
          <Tooltip content="Quick show, slow hide" delay={100} closeDelay={500}>
            <Button variant="outline">Quick Show</Button>
          </Tooltip>
          
          <Tooltip content="Slow show, quick hide" delay={500} closeDelay={100}>
            <Button variant="outline">Slow Show</Button>
          </Tooltip>
          
          <Tooltip content="Long delays for testing" delay={1000} closeDelay={1000}>
            <Button variant="outline">Long Delays</Button>
          </Tooltip>
        </div>
      </section>

      {/* Disabled State */}
      <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            Disabled State
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Conditionally disable tooltips based on application state.
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-6">
          <Tooltip content="This tooltip is enabled" disabled={false}>
            <Button>Enabled Tooltip</Button>
          </Tooltip>
          
          <Tooltip content="This tooltip is disabled" disabled={true}>
            <Button variant="outline">Disabled Tooltip</Button>
          </Tooltip>
        </div>
      </section>
    </div>
  )
}
