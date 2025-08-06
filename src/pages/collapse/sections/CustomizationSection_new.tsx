import { useState } from 'preact/hooks'
import { Collapse } from '../../../../nebula/components/Collapse'

export function CustomizationSection() {
  const [activeKey, setActiveKey] = useState<string | string[]>('1')

  const customExpandIcon = ({ isActive }: { isActive: boolean }) => (
    <div className={`transition-transform duration-200 ${isActive ? 'rotate-180' : ''}`}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2z"/>
      </svg>
    </div>
  )

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Customization</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Customize the appearance and behavior of collapse panels with different styles, icons, and interactions.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Different Sizes</h3>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Small Size</h4>
              <Collapse size="sm" defaultActiveKey="sm1">
                <Collapse.Panel key="sm1" header="Small Panel 1">
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    This is a small-sized collapse panel with compact spacing.
                  </p>
                </Collapse.Panel>
                <Collapse.Panel key="sm2" header="Small Panel 2">
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Perfect for dense layouts where space is limited.
                  </p>
                </Collapse.Panel>
              </Collapse>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Medium Size (Default)</h4>
              <Collapse size="md" defaultActiveKey="md1">
                <Collapse.Panel key="md1" header="Medium Panel 1">
                  <p className="text-gray-600 dark:text-gray-300">
                    This is the default medium-sized collapse panel with standard spacing.
                  </p>
                </Collapse.Panel>
                <Collapse.Panel key="md2" header="Medium Panel 2">
                  <p className="text-gray-600 dark:text-gray-300">
                    Ideal for most common use cases and general content organization.
                  </p>
                </Collapse.Panel>
              </Collapse>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Large Size</h4>
              <Collapse size="lg" defaultActiveKey="lg1">
                <Collapse.Panel key="lg1" header="Large Panel 1">
                  <p className="text-gray-600 dark:text-gray-300 text-lg">
                    This is a large-sized collapse panel with generous spacing and larger text.
                  </p>
                </Collapse.Panel>
                <Collapse.Panel key="lg2" header="Large Panel 2">
                  <p className="text-gray-600 dark:text-gray-300 text-lg">
                    Great for important content that needs more visual prominence.
                  </p>
                </Collapse.Panel>
              </Collapse>
            </div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mt-4">
            <h4 className="font-medium mb-2">Usage:</h4>
            <pre className="text-sm overflow-x-auto">
              <code>{`<Collapse size="sm">
  <Collapse.Panel key="1" header="Small Panel">Content</Collapse.Panel>
</Collapse>

<Collapse size="md">
  <Collapse.Panel key="1" header="Medium Panel">Content</Collapse.Panel>
</Collapse>

<Collapse size="lg">
  <Collapse.Panel key="1" header="Large Panel">Content</Collapse.Panel>
</Collapse>`}</code>
            </pre>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Custom Icons</h3>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <Collapse 
              activeKey={activeKey} 
              onChange={setActiveKey}
              expandIcon={customExpandIcon}
            >
              <Collapse.Panel key="1" header="⭐ Featured Content">
                <p className="text-gray-600 dark:text-gray-300">
                  This panel uses a custom expand icon that rotates when the panel is opened.
                </p>
              </Collapse.Panel>
              <Collapse.Panel key="2" header="🎨 Custom Styling">
                <p className="text-gray-600 dark:text-gray-300">
                  You can provide your own expand icon component to match your design system.
                </p>
              </Collapse.Panel>
              <Collapse.Panel key="3" header="🔧 Advanced Options">
                <p className="text-gray-600 dark:text-gray-300">
                  The expand icon receives the current active state as a prop for custom animations.
                </p>
              </Collapse.Panel>
            </Collapse>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mt-4">
            <h4 className="font-medium mb-2">Usage:</h4>
            <pre className="text-sm overflow-x-auto">
              <code>{`const customIcon = ({ isActive }) => (
  <div className={\`transform transition-transform \${isActive ? 'rotate-180' : ''}\`}>
    <CustomIconComponent />
  </div>
)

<Collapse expandIcon={customIcon}>
  <Collapse.Panel key="1" header="Custom Icon Panel">
    Content with custom expand icon
  </Collapse.Panel>
</Collapse>`}</code>
            </pre>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Borderless Style</h3>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <Collapse bordered={false} defaultActiveKey="border1">
              <Collapse.Panel key="border1" header="Clean Design">
                <p className="text-gray-600 dark:text-gray-300">
                  Remove borders for a cleaner, minimal appearance that works well with custom styling.
                </p>
              </Collapse.Panel>
              <Collapse.Panel key="border2" header="Minimal Style">
                <p className="text-gray-600 dark:text-gray-300">
                  Borderless panels are perfect for integration into existing layouts without visual conflicts.
                </p>
              </Collapse.Panel>
            </Collapse>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mt-4">
            <h4 className="font-medium mb-2">Usage:</h4>
            <pre className="text-sm overflow-x-auto">
              <code>{`<Collapse bordered={false}>
  <Collapse.Panel key="1" header="Borderless Panel">
    Clean content without borders
  </Collapse.Panel>
</Collapse>`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
