import { useState } from 'preact/hooks'
import { Button, Modal } from '../../../../nebula/components'

export function BasicUsageSection() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Basic Modal</h2>
      <p className="text-gray-600 dark:text-gray-400">
        Simple modal dialog with standard functionality.
      </p>
      
      <Button onClick={() => setIsOpen(true)}>
        Open Basic Modal
      </Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Basic Modal</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            This is a basic modal dialog. Click the backdrop or press Escape to close it.
          </p>
          <div className="flex justify-end space-x-3">
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsOpen(false)}>
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  )
}
