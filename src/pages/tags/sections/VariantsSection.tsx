import { Tags } from '../../../../nebula/components/Tags'

export function VariantsSection() {
  const variants = ['filled', 'outlined', 'subtle'] as const

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Variants</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Tags support different visual styles to match your design system.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Style Variants</h3>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="space-y-6">
              {variants.map(variant => (
                <div key={variant} className="space-y-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300 capitalize font-medium">
                    {variant}:
                  </span>
                  <Tags
                    variant={variant}
                    tags={[
                      { key: `${variant}-1`, label: 'JavaScript' },
                      { key: `${variant}-2`, label: 'TypeScript' },
                      { key: `${variant}-3`, label: 'React' }
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
  variant="filled"
  tags={[{ key: 'js', label: 'JavaScript' }]}
/>

<Tags
  variant="outlined"
  tags={[{ key: 'js', label: 'JavaScript' }]}
/>

<Tags
  variant="subtle"
  tags={[{ key: 'js', label: 'JavaScript' }]}
/>`}</code>
            </pre>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Variants with Colors</h3>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="space-y-6">
              {variants.map(variant => (
                <div key={variant} className="space-y-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300 capitalize font-medium">
                    {variant} with colors:
                  </span>
                  <Tags
                    variant={variant}
                    tags={[
                      { key: `${variant}-success`, label: 'Success', color: 'success' },
                      { key: `${variant}-warning`, label: 'Warning', color: 'warning' },
                      { key: `${variant}-error`, label: 'Error', color: 'error' },
                      { key: `${variant}-info`, label: 'Info', color: 'info' }
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
  variant="outlined"
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
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Mixed Variants</h3>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap gap-2">
              <Tags
                variant="filled"
                tags={[{ key: 'filled-tag', label: 'Filled' }]}
                removable={false}
                addable={false}
              />
              <Tags
                variant="outlined"
                tags={[{ key: 'outlined-tag', label: 'Outlined' }]}
                removable={false}
                addable={false}
              />
              <Tags
                variant="subtle"
                tags={[{ key: 'subtle-tag', label: 'Subtle' }]}
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
