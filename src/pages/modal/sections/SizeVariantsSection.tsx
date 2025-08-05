import { useState } from 'preact/hooks'
import { Button, Modal } from '../../../../nebula/components'

export function SizeVariantsSection() {
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const sizes = ['sm', 'md', 'lg', 'xl'] as const

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Size Variants</h2>
      <p className="text-gray-600 dark:text-gray-400">
        Different modal sizes to accommodate various content types.
      </p>
      
      <div className="flex gap-4">
        {sizes.map(size => (
          <Button key={size} onClick={() => setActiveModal(size)}>
            {size.toUpperCase()} Modal
          </Button>
        ))}
      </div>

      {sizes.map(size => (
        <Modal 
          key={size}
          isOpen={activeModal === size} 
          onClose={() => setActiveModal(null)}
          size={size}
        >
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
              {size.charAt(0).toUpperCase() + size.slice(1)} Modal
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              This is a {size} sized modal. Notice how the width adjusts based on the size variant.
            </p>
            <Button onClick={() => setActiveModal(null)}>Close</Button>
          </div>
        </Modal>
      ))}
    </section>
  )
}
