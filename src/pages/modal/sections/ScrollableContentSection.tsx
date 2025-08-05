import { useState } from 'preact/hooks'
import { Button, Modal } from '../../../../nebula/components'

export function ScrollableContentSection() {
  const [scrollableOpen, setScrollableOpen] = useState(false)

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Scrollable Content</h2>
      <p className="text-gray-600 dark:text-gray-400">
        Modal with scrollable content for large amounts of information.
      </p>
      
      <Button onClick={() => setScrollableOpen(true)}>
        Open Scrollable Modal
      </Button>

      <Modal isOpen={scrollableOpen} onClose={() => setScrollableOpen(false)} scrollable={true}>
        <div className="p-6">
          <h3 className="text-lg font-medium mb-4">Scrollable Modal</h3>
          <div className="text-gray-600 dark:text-gray-400 space-y-4">
            {Array.from({ length: 20 }, (_, i) => (
              <p key={i}>
                This is paragraph {i + 1} of the scrollable content. When content exceeds the modal height, 
                it becomes scrollable within the modal body while keeping the header and footer in view.
              </p>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
            <Button onClick={() => setScrollableOpen(false)}>Close</Button>
          </div>
        </div>
      </Modal>
    </section>
  )
}
