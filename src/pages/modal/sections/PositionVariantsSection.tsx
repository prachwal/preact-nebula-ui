import { useState } from 'preact/hooks'
import { Button, Modal } from '../../../../nebula/components'

export function PositionVariantsSection() {
  const [centeredOpen, setCenteredOpen] = useState(false)
  const [topOpen, setTopOpen] = useState(false)

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Position Variants</h2>
      <p className="text-gray-600 dark:text-gray-400">
        Different modal positioning options.
      </p>
      
      <div className="flex gap-4">
        <Button onClick={() => setCenteredOpen(true)}>
          Centered Modal
        </Button>
        <Button onClick={() => setTopOpen(true)}>
          Top Position
        </Button>
      </div>

      <Modal isOpen={centeredOpen} onClose={() => setCenteredOpen(false)} centered={true}>
        <div className="p-6">
          <h3 className="text-lg font-medium mb-4">Centered Modal</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            This modal is centered both horizontally and vertically.
          </p>
          <Button onClick={() => setCenteredOpen(false)}>Close</Button>
        </div>
      </Modal>

      <Modal isOpen={topOpen} onClose={() => setTopOpen(false)} centered={false}>
        <div className="p-6">
          <h3 className="text-lg font-medium mb-4">Top Positioned Modal</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            This modal appears near the top of the viewport.
          </p>
          <Button onClick={() => setTopOpen(false)}>Close</Button>
        </div>
      </Modal>
    </section>
  )
}
