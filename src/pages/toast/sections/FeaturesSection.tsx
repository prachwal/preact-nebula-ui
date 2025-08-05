import { Section } from './Section'

export function FeaturesSection() {
  return (
    <Section
      title="Features"
      description="Comprehensive toast notification features and capabilities."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Core Features
          </h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li>• Auto-dismiss with configurable duration</li>
            <li>• Manual dismiss with close button</li>
            <li>• Multiple variants (success, error, warning, info)</li>
            <li>• Customizable positions</li>
            <li>• Responsive design</li>
            <li>• Animation support</li>
          </ul>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Advanced Features
          </h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li>• Toast stacking</li>
            <li>• Programmatic control</li>
            <li>• Custom icons</li>
            <li>• Accessibility support</li>
            <li>• Theme integration</li>
            <li>• TypeScript support</li>
          </ul>
        </div>
      </div>
    </Section>
  )
}
