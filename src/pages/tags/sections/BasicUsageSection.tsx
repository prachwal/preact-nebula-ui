import { useState } from 'preact/hooks'
import { Tags } from '../../../../nebula/components/Tags'
import type { TagItem } from '../../../../nebula/components/Tags/types'

export function BasicUsageSection() {
  const [tags, setTags] = useState<TagItem[]>([
    { key: 'react', label: 'React' },
    { key: 'typescript', label: 'TypeScript' },
    { key: 'preact', label: 'Preact' }
  ])

  const handleRemove = (key: string) => {
    setTags(tags.filter(t => t.key !== key))
  }

  const handleAdd = (label: string) => {
    if (label && !tags.find(t => t.label === label)) {
      const key = label.toLowerCase().replace(/\s+/g, '-')
      setTags([...tags, { key, label }])
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Basic Usage</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Tags are used to label, categorize, or organize items using keywords.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Default Tags</h3>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap gap-2">
              <Tags
                tags={[
                  { key: 'js', label: 'JavaScript' },
                  { key: 'css', label: 'CSS' },
                  { key: 'html', label: 'HTML' }
                ]}
                removable={false}
              />
            </div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mt-4">
            <h4 className="font-medium mb-2">Usage:</h4>
            <pre className="text-sm overflow-x-auto">
              <code>{`<Tags
  tags={[
    { key: 'js', label: 'JavaScript' },
    { key: 'css', label: 'CSS' },
    { key: 'html', label: 'HTML' }
  ]}
  removable={false}
/>`}</code>
            </pre>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Interactive Tags</h3>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Tags
                  tags={tags}
                  onRemove={handleRemove}
                  removable
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleAdd('Vue')}
                  className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                >
                  Add Vue
                </button>
                <button
                  onClick={() => handleAdd('Angular')}
                  className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                >
                  Add Angular
                </button>
              </div>
            </div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mt-4">
            <h4 className="font-medium mb-2">Usage:</h4>
            <pre className="text-sm overflow-x-auto">
              <code>{`const [tags, setTags] = useState([
  { key: 'react', label: 'React' },
  { key: 'typescript', label: 'TypeScript' },
  { key: 'preact', label: 'Preact' }
])

const handleRemove = (key: string) => {
  setTags(tags.filter(t => t.key !== key))
}

<Tags
  tags={tags}
  onRemove={handleRemove}
  removable
/>`}</code>
            </pre>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Read-only Tags</h3>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap gap-2">
              <Tags
                tags={[
                  { key: 'frontend', label: 'Frontend' },
                  { key: 'backend', label: 'Backend' },
                  { key: 'devops', label: 'DevOps' }
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
    { key: 'frontend', label: 'Frontend' },
    { key: 'backend', label: 'Backend' },
    { key: 'devops', label: 'DevOps' }
  ]}
  removable={false}
  addable={false}
/>`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
