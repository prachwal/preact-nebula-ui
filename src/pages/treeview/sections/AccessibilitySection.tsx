import { TreeView } from '../../../../nebula/components'
import type { TreeNode } from '../../../../nebula/components/TreeView/types'

const accessibilityData: TreeNode[] = [
  {
    key: '1',
    title: 'Navigation',
    children: [
      { key: '1-1', title: 'Arrow Keys - Navigate between nodes' },
      { key: '1-2', title: 'Enter/Space - Toggle expand/collapse' },
      { key: '1-3', title: 'Tab - Move to next focusable element' }
    ]
  },
  {
    key: '2',
    title: 'Screen Reader',
    children: [
      { key: '2-1', title: 'ARIA labels for each node' },
      { key: '2-2', title: 'Level information (aria-level)' },
      { key: '2-3', title: 'Expansion state (aria-expanded)' },
      { key: '2-4', title: 'Selection state (aria-selected)' }
    ]
  },
  {
    key: '3',
    title: 'Visual Indicators',
    children: [
      { key: '3-1', title: 'Focus outline on keyboard navigation' },
      { key: '3-2', title: 'High contrast support' },
      { key: '3-3', title: 'Color contrast meets WCAG AA' }
    ]
  }
]

const disabledData: TreeNode[] = [
  {
    key: '1',
    title: 'Available Features',
    children: [
      { key: '1-1', title: 'Documentation' },
      { key: '1-2', title: 'Examples' },
      { key: '1-3', title: 'Support' }
    ]
  },
  {
    key: '2',
    title: 'Premium Features',
    disabled: true,
    children: [
      { key: '2-1', title: 'Advanced Analytics', disabled: true },
      { key: '2-2', title: 'Custom Themes', disabled: true },
      { key: '2-3', title: 'Priority Support', disabled: true }
    ]
  },
  {
    key: '3',
    title: 'Beta Features',
    children: [
      { key: '3-1', title: 'AI Assistant' },
      { key: '3-2', title: 'Real-time Collaboration', disabled: true }
    ]
  }
]

export function AccessibilitySection() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Keyboard Navigation
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Full keyboard support with arrow keys, Enter/Space for expansion, and Tab navigation. 
          Try using your keyboard to navigate the tree below.
        </p>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <TreeView
            data={accessibilityData}
            defaultExpandedKeys={['1']}
            defaultSelectedKeys={['1-1']}
            showIcon
            aria-label="Keyboard navigation demonstration tree"
          />
          
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
            <h4 className="text-blue-800 dark:text-blue-200 text-sm font-medium mb-2">
              Keyboard Shortcuts:
            </h4>
            <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1">
              <li>• <kbd className="bg-blue-100 dark:bg-blue-800 px-1 rounded">↑↓</kbd> Navigate up/down</li>
              <li>• <kbd className="bg-blue-100 dark:bg-blue-800 px-1 rounded">←→</kbd> Collapse/expand nodes</li>
              <li>• <kbd className="bg-blue-100 dark:bg-blue-800 px-1 rounded">Enter</kbd> or <kbd className="bg-blue-100 dark:bg-blue-800 px-1 rounded">Space</kbd> Toggle selection</li>
              <li>• <kbd className="bg-blue-100 dark:bg-blue-800 px-1 rounded">Home</kbd>/<kbd className="bg-blue-100 dark:bg-blue-800 px-1 rounded">End</kbd> First/last node</li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Screen Reader Support
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Comprehensive ARIA attributes ensure proper screen reader announcements for hierarchy, 
          state, and interactions.
        </p>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <TreeView
            data={accessibilityData}
            defaultExpandedKeys={['2']}
            showIcon
            aria-label="Screen reader optimized tree"
            aria-describedby="screen-reader-info"
          />
          
          <div id="screen-reader-info" className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
            <h4 className="text-green-800 dark:text-green-200 text-sm font-medium mb-2">
              Screen Reader Features:
            </h4>
            <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
              <li>• Each node announces its level in the hierarchy</li>
              <li>• Expansion state is clearly communicated</li>
              <li>• Selection state is announced on change</li>
              <li>• Meaningful labels and descriptions provided</li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Disabled States
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Disabled nodes are properly marked with aria-disabled and have reduced opacity. 
          They cannot be selected or interacted with.
        </p>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <TreeView
            data={disabledData}
            defaultExpandedKeys={['1', '2', '3']}
            showIcon
            aria-label="Tree with disabled nodes demonstration"
          />
          
          <div className="mt-4 p-3 bg-orange-50 dark:bg-orange-900/20 rounded border border-orange-200 dark:border-orange-800">
            <p className="text-orange-800 dark:text-orange-200 text-sm">
              <strong>Note:</strong> Disabled nodes (Premium Features) cannot be selected or expanded. 
              They are announced as disabled to screen readers and have visual indicators.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          High Contrast Support
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Tree components maintain proper contrast ratios and work well with high contrast themes 
          and reduced motion preferences.
        </p>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <TreeView
            data={accessibilityData.slice(0, 2)}
            defaultExpandedKeys={['1']}
            showIcon
            className="contrast-more:border-2 contrast-more:border-black dark:contrast-more:border-white"
            aria-label="High contrast compatible tree"
          />
          
          <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded border border-purple-200 dark:border-purple-800">
            <h4 className="text-purple-800 dark:text-purple-200 text-sm font-medium mb-2">
              Accessibility Compliance:
            </h4>
            <ul className="text-purple-700 dark:text-purple-300 text-sm space-y-1">
              <li>• WCAG 2.1 AA compliant color contrast</li>
              <li>• Respects prefers-reduced-motion settings</li>
              <li>• Works with high contrast mode</li>
              <li>• Keyboard and screen reader tested</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
