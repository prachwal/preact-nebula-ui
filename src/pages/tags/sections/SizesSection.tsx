import { Tags } from '../../../../nebula/components/Tags'

export function SizesSection() {
  const sizes = ['sm', 'md', 'lg'] as const

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Sizes</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Tags come in different sizes to fit various design contexts.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Size Variants</h3>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="space-y-6">
              {sizes.map(size => (
                <div key={size} className="flex items-center gap-4">
                  <span className="w-16 text-sm text-gray-600 dark:text-gray-300 uppercase">
                    {size}:
                  </span>
                  <Tags
                    size={size}
                    tags={[
                      { key: `${size}-1`, label: 'React' },
                      { key: `${size}-2`, label: 'TypeScript' },
                      { key: `${size}-3`, label: 'Preact' }
                    ]}
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
  size="sm"
  tags={[
    { key: 'react', label: 'React' },
    { key: 'ts', label: 'TypeScript' }
  ]}
/>

<Tags
  size="md"
  tags={[
    { key: 'react', label: 'React' },
    { key: 'ts', label: 'TypeScript' }
  ]}
/>

<Tags
  size="lg"
  tags={[
    { key: 'react', label: 'React' },
    { key: 'ts', label: 'TypeScript' }
  ]}
/>`}</code>
            </pre>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Responsive Sizing</h3>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Small tags are ideal for dense layouts and metadata:
              </p>
              <Tags
                size="sm"
                tags={[
                  { key: 'frontend', label: 'Frontend' },
                  { key: 'backend', label: 'Backend' },
                  { key: 'fullstack', label: 'Full Stack' },
                  { key: 'mobile', label: 'Mobile' },
                  { key: 'web', label: 'Web' },
                  { key: 'desktop', label: 'Desktop' }
                ]}
                removable={false}
                addable={false}
              />
              
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-6">
                Large tags work well for primary categories and filters:
              </p>
              <Tags
                size="lg"
                tags={[
                  { key: 'development', label: 'Development' },
                  { key: 'design', label: 'Design' },
                  { key: 'marketing', label: 'Marketing' }
                ]}
                removable={false}
                addable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
