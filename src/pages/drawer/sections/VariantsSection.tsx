import { useState } from 'preact/hooks'
import { Drawer, Button } from '../../../../nebula/components'

export function VariantsSection() {
  const [sizeDrawer, setSizeDrawer] = useState<'sm' | 'md' | 'lg' | 'xl' | 'full' | false>(false)

  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Sizes
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Different drawer sizes to accommodate various content types and use cases.
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Button onClick={() => setSizeDrawer('sm')}>Small</Button>
        <Button onClick={() => setSizeDrawer('md')}>Medium</Button>
        <Button onClick={() => setSizeDrawer('lg')}>Large</Button>
        <Button onClick={() => setSizeDrawer('xl')}>Extra Large</Button>
        <Button onClick={() => setSizeDrawer('full')}>Full Screen</Button>
      </div>

      <Drawer
        isOpen={!!sizeDrawer}
        onClose={() => setSizeDrawer(false)}
        position="right"
        size={sizeDrawer || 'md'}
      >
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {sizeDrawer === 'sm' && 'Small Drawer'}
            {sizeDrawer === 'md' && 'Medium Drawer'}
            {sizeDrawer === 'lg' && 'Large Drawer'}
            {sizeDrawer === 'xl' && 'Extra Large Drawer'}
            {sizeDrawer === 'full' && 'Full Screen Drawer'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            This is a {sizeDrawer} sized drawer. The width/height adjusts based on the size variant.
          </p>
          <Button onClick={() => setSizeDrawer(false)}>Close</Button>
        </div>
      </Drawer>
    </section>
  )
}
