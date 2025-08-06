import { Tags } from '../../../../nebula/components/Tags'

export function ColorsSection() {
  const tagColors = ['default', 'primary', 'success', 'warning', 'error', 'info'] as const

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Colors</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Tags support different color schemes to convey meaning and importance.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Color Variants</h3>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="space-y-4">
              {tagColors.map(color => (
                <div key={color} className="flex items-center gap-4">
                  <span className="w-20 text-sm text-gray-600 dark:text-gray-300 capitalize">
                    {color}:
                  </span>
                  <Tags
                    tags={[{ key: color, label: color, color }]}
                    removable={false}
                    addable={false}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mt-4">
            <h4 className="font-medium mb-2">Usage:</h4>
            <pre className="text-sm overflow-x-auto">
              <code>{`<Tags
  tags={[
    { key: 'success', label: 'Success', color: 'success' },
    { key: 'warning', label: 'Warning', color: 'warning' },
    { key: 'error', label: 'Error', color: 'error' }
  ]}
/>`}</code>
            </pre>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Mixed Colors</h3>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap gap-2">
              <Tags
                tags={[
                  { key: 'bug', label: 'Bug', color: 'error' },
                  { key: 'feature', label: 'Feature', color: 'primary' },
                  { key: 'docs', label: 'Documentation', color: 'info' },
                  { key: 'enhancement', label: 'Enhancement', color: 'success' },
                  { key: 'question', label: 'Question', color: 'warning' }
                ]}
                removable={false}
                addable={false}
              />
            </div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mt-4">
            <h4 className="font-medium mb-2">Usage:</h4>
            <pre className="text-sm overflow-x-auto">
              <code>{`<Tags
  tags={[
    { key: 'bug', label: 'Bug', color: 'error' },
    { key: 'feature', label: 'Feature', color: 'primary' },
    { key: 'docs', label: 'Documentation', color: 'info' }
  ]}
/>`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
