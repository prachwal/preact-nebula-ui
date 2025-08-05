export function PropsDocumentation() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Props Documentation</h3>
        
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">RatingProps</h4>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="font-mono text-sm text-blue-600 dark:text-blue-400">value?</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">number</div>
              <div className="text-sm text-gray-900 dark:text-white">Current rating value (controlled)</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="font-mono text-sm text-blue-600 dark:text-blue-400">defaultValue?</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">number</div>
              <div className="text-sm text-gray-900 dark:text-white">Initial value for uncontrolled mode</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="font-mono text-sm text-blue-600 dark:text-blue-400">onChange?</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">(value: number) =&gt; void</div>
              <div className="text-sm text-gray-900 dark:text-white">Callback fired when rating changes</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="font-mono text-sm text-blue-600 dark:text-blue-400">max?</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">number</div>
              <div className="text-sm text-gray-900 dark:text-white">Maximum rating value (default: 5)</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="font-mono text-sm text-blue-600 dark:text-blue-400">size?</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">'sm' | 'md' | 'lg'</div>
              <div className="text-sm text-gray-900 dark:text-white">Size variant (default: 'md')</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="font-mono text-sm text-blue-600 dark:text-blue-400">allowHalf?</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">boolean</div>
              <div className="text-sm text-gray-900 dark:text-white">Allow half-star ratings (default: false)</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="font-mono text-sm text-blue-600 dark:text-blue-400">readOnly?</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">boolean</div>
              <div className="text-sm text-gray-900 dark:text-white">Read-only mode - no interaction (default: false)</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="font-mono text-sm text-blue-600 dark:text-blue-400">disabled?</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">boolean</div>
              <div className="text-sm text-gray-900 dark:text-white">Disabled state (default: false)</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="font-mono text-sm text-blue-600 dark:text-blue-400">icon?</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">ComponentChildren</div>
              <div className="text-sm text-gray-900 dark:text-white">Custom icon for filled state</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="font-mono text-sm text-blue-600 dark:text-blue-400">emptyIcon?</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">ComponentChildren</div>
              <div className="text-sm text-gray-900 dark:text-white">Custom icon for empty state</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="font-mono text-sm text-blue-600 dark:text-blue-400">halfIcon?</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">ComponentChildren</div>
              <div className="text-sm text-gray-900 dark:text-white">Custom icon for half-filled state</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="font-mono text-sm text-blue-600 dark:text-blue-400">color?</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">string</div>
              <div className="text-sm text-gray-900 dark:text-white">Color for filled icons (default: '#facc15')</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="font-mono text-sm text-blue-600 dark:text-blue-400">emptyColor?</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">string</div>
              <div className="text-sm text-gray-900 dark:text-white">Color for empty icons (default: '#d1d5db')</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="font-mono text-sm text-blue-600 dark:text-blue-400">showValue?</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">boolean</div>
              <div className="text-sm text-gray-900 dark:text-white">Show rating value as text (default: false)</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="font-mono text-sm text-blue-600 dark:text-blue-400">valueFormatter?</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">(value: number, max: number) =&gt; string</div>
              <div className="text-sm text-gray-900 dark:text-white">Custom formatter for value display</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="font-mono text-sm text-blue-600 dark:text-blue-400">error?</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">boolean</div>
              <div className="text-sm text-gray-900 dark:text-white">Error state (default: false)</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="font-mono text-sm text-blue-600 dark:text-blue-400">errorMessage?</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">string</div>
              <div className="text-sm text-gray-900 dark:text-white">Error message to display</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
