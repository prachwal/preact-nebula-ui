import { useState } from 'preact/hooks'
import { Button, Modal } from '../../../../nebula/components'

export function BackdropBehaviorSection() {
  const [clickableOpen, setClickableOpen] = useState(false)
  const [staticOpen, setStaticOpen] = useState(false)
  const [noKeyboardOpen, setNoKeyboardOpen] = useState(false)

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Backdrop Behavior</h2>
      <p className="text-gray-600 dark:text-gray-400">
        Different backdrop interaction behaviors.
      </p>
      
      <div className="flex gap-4">
        <Button onClick={() => setClickableOpen(true)}>
          Clickable Backdrop
        </Button>
        <Button onClick={() => setStaticOpen(true)}>
          Static Backdrop
        </Button>
        <Button onClick={() => setNoKeyboardOpen(true)}>
          No Keyboard Close
        </Button>
      </div>

      <Modal isOpen={clickableOpen} onClose={() => setClickableOpen(false)}>
        <div className="p-6">
          <h3 className="text-lg font-medium mb-4">Clickable Backdrop</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Click the backdrop (dark area) or press Escape to close this modal.
          </p>
          <Button onClick={() => setClickableOpen(false)}>Close</Button>
        </div>
      </Modal>

      <Modal 
        isOpen={staticOpen} 
        onClose={() => setStaticOpen(false)}
        backdrop="static"
      >
        <div className="p-6">
          <h3 className="text-lg font-medium mb-4">Static Backdrop</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            This modal cannot be closed by clicking the backdrop. Use the button or Escape key.
          </p>
          <Button onClick={() => setStaticOpen(false)}>Close</Button>
        </div>
      </Modal>

      <Modal 
        isOpen={noKeyboardOpen} 
        onClose={() => setNoKeyboardOpen(false)}
        keyboard={false}
      >
        <div className="p-6">
          <h3 className="text-lg font-medium mb-4">No Keyboard Close</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            This modal cannot be closed with the Escape key. Click backdrop or use the button.
          </p>
          <Button onClick={() => setNoKeyboardOpen(false)}>Close</Button>
        </div>
      </Modal>
    </section>
  )
}
