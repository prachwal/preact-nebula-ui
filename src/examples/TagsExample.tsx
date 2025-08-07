import { useState } from 'preact/hooks'
import { Tags, Tag } from '../../nebula/components/Tags'

export function TagsExample() {
  const [basicTags, setBasicTags] = useState(['Design', 'Development'])
  const [editableTags, setEditableTags] = useState(['Edit me', 'Double click'])

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Tags Component Examples</h1>
      
      <div className="space-y-12">
        {/* Individual Tags */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Individual Tags</h2>
          <div className="bg-white p-6 rounded-lg border">
            <div className="flex flex-wrap gap-4">
              <Tag>Default Tag</Tag>
              <Tag color="primary">Primary Tag</Tag>
              <Tag color="success">Success Tag</Tag>
              <Tag color="warning">Warning Tag</Tag>
              <Tag color="error">Error Tag</Tag>
              <Tag color="info">Info Tag</Tag>
            </div>
          </div>
        </section>

        {/* Tag Variants */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Tag Variants</h2>
          <div className="bg-white p-6 rounded-lg border space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Filled (Default)</h3>
              <div className="flex flex-wrap gap-2">
                <Tag variant="filled" color="primary">Filled Primary</Tag>
                <Tag variant="filled" color="success">Filled Success</Tag>
                <Tag variant="filled" color="warning">Filled Warning</Tag>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Outlined</h3>
              <div className="flex flex-wrap gap-2">
                <Tag variant="outlined" color="primary">Outlined Primary</Tag>
                <Tag variant="outlined" color="success">Outlined Success</Tag>
                <Tag variant="outlined" color="warning">Outlined Warning</Tag>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Subtle</h3>
              <div className="flex flex-wrap gap-2">
                <Tag variant="subtle" color="primary">Subtle Primary</Tag>
                <Tag variant="subtle" color="success">Subtle Success</Tag>
                <Tag variant="subtle" color="warning">Subtle Warning</Tag>
              </div>
            </div>
          </div>
        </section>

        {/* Tag Sizes */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Tag Sizes</h2>
          <div className="bg-white p-6 rounded-lg border">
            <div className="flex items-center gap-4">
              <Tag size="sm" color="primary">Small Tag</Tag>
              <Tag size="md" color="primary">Medium Tag</Tag>
              <Tag size="lg" color="primary">Large Tag</Tag>
            </div>
          </div>
        </section>

        {/* Closable Tags */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Closable Tags</h2>
          <div className="bg-white p-6 rounded-lg border">
            <div className="flex flex-wrap gap-2">
              <Tag closable color="primary" onClose={() => console.log('Tag closed')}>
                Closable Primary
              </Tag>
              <Tag closable color="success" onClose={() => console.log('Tag closed')}>
                Closable Success
              </Tag>
              <Tag closable color="error" onClose={() => console.log('Tag closed')}>
                Closable Error
              </Tag>
            </div>
          </div>
        </section>

        {/* Tags Container - Basic */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Basic Tags Container</h2>
          <div className="bg-white p-6 rounded-lg border">
            <Tags
              value={basicTags}
              onChange={setBasicTags}
              placeholder="Add a tag..."
            />
            <p className="text-sm text-gray-600 mt-2">
              Current tags: {JSON.stringify(basicTags)}
            </p>
          </div>
        </section>

        {/* Tags Container - With Limits */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Tags with Limits</h2>
          <div className="bg-white p-6 rounded-lg border">
            <Tags
              defaultValue={['Tag 1', 'Tag 2']}
              maxTags={5}
              maxLength={10}
              placeholder="Max 5 tags, 10 chars each..."
            />
            <p className="text-sm text-gray-600 mt-2">
              Maximum 5 tags, 10 characters each
            </p>
          </div>
        </section>

        {/* Tags Container - No Duplicates */}
        <section>
          <h2 className="text-xl font-semibold mb-4">No Duplicate Tags</h2>
          <div className="bg-white p-6 rounded-lg border">
            <Tags
              defaultValue={['Unique', 'Tags']}
              allowDuplicates={false}
              placeholder="Try adding 'Unique' again..."
            />
            <p className="text-sm text-gray-600 mt-2">
              Duplicate tags are not allowed
            </p>
          </div>
        </section>

        {/* Tags Container - With Validation */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Tags with Validation</h2>
          <div className="bg-white p-6 rounded-lg border">
            <Tags
              defaultValue={['validtag']}
              validator={(tag) => {
                if (tag.includes(' ')) return 'No spaces allowed'
                if (tag.length < 3) return 'Minimum 3 characters'
                return true
              }}
              placeholder="No spaces, min 3 chars..."
            />
            <p className="text-sm text-gray-600 mt-2">
              Tags must be at least 3 characters and contain no spaces
            </p>
          </div>
        </section>

        {/* Tags Container - Different Sizes */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Different Sizes</h2>
          <div className="bg-white p-6 rounded-lg border space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Small</h3>
              <Tags
                defaultValue={['Small', 'Tags']}
                size="sm"
                placeholder="Small tags..."
              />
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Medium (Default)</h3>
              <Tags
                defaultValue={['Medium', 'Tags']}
                size="md"
                placeholder="Medium tags..."
              />
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Large</h3>
              <Tags
                defaultValue={['Large', 'Tags']}
                size="lg"
                placeholder="Large tags..."
              />
            </div>
          </div>
        </section>

        {/* Editable Tags */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Editable Tags</h2>
          <div className="bg-white p-6 rounded-lg border">
            <Tags
              value={editableTags}
              onChange={setEditableTags}
              editable
              placeholder="Click tags to edit..."
            />
            <p className="text-sm text-gray-600 mt-2">
              Click on tags to edit them inline
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
