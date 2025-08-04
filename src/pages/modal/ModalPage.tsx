import { useState } from 'preact/hooks'
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../../nebula/components/Modal'
import { Button } from '../../../nebula/components/Button'
import { Input } from '../../../nebula/components/Input'
import { Label } from '../../../nebula/components/Label'
import { Textarea } from '../../../nebula/components/Textarea'
import type { ModalCloseReason } from '../../../nebula/components/Modal/Modal.types'

interface PageProps {
  path?: string
}

export default function ModalPage(_props: PageProps) {
  const [basicModal, setBasicModal] = useState(false)
  const [sizesModal, setSizesModal] = useState<{sm: boolean, md: boolean, lg: boolean, xl: boolean, full: boolean}>({
    sm: false,
    md: false,
    lg: false,
    xl: false,
    full: false
  })
  const [behaviorModal, setBehaviorModal] = useState<{backdrop: boolean, static: boolean, noKeyboard: boolean}>({
    backdrop: false,
    static: false,
    noKeyboard: false
  })
  const [positionModal, setPositionModal] = useState<{centered: boolean, top: boolean}>({
    centered: false,
    top: false
  })
  const [scrollableModal, setScrollableModal] = useState(false)
  const [formModal, setFormModal] = useState(false)
  const [confirmModal, setConfirmModal] = useState(false)
  const [stackedModal, setStackedModal] = useState<{first: boolean, second: boolean}>({
    first: false,
    second: false
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleModalClose = (reason: ModalCloseReason) => {
    console.log('Modal closed with reason:', reason)
  }

  const handleSizeModalClose = (size: keyof typeof sizesModal) => (reason: ModalCloseReason) => {
    setSizesModal(prev => ({ ...prev, [size]: false }))
    console.log(`${size} modal closed with reason:`, reason)
  }

  const handleBehaviorModalClose = (type: keyof typeof behaviorModal) => (reason: ModalCloseReason) => {
    setBehaviorModal(prev => ({ ...prev, [type]: false }))
    console.log(`${type} modal closed with reason:`, reason)
  }

  const handlePositionModalClose = (type: keyof typeof positionModal) => (reason: ModalCloseReason) => {
    setPositionModal(prev => ({ ...prev, [type]: false }))
    console.log(`${type} modal closed with reason:`, reason)
  }

  const handleFormSubmit = (e: Event) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setFormModal(false)
    setFormData({ name: '', email: '', message: '' })
  }

  const handleConfirm = () => {
    console.log('Action confirmed!')
    setConfirmModal(false)
  }

  const scrollableContent = Array.from({ length: 50 }, (_, i) => (
    <p key={i} className="mb-4">
      This is paragraph {i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </p>
  ))

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Modal</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Display content in a modal dialog overlay with backdrop, focus management, and accessibility features.
        </p>
      </div>

      {/* Basic Modal */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Basic Modal</h2>
        <div className="flex gap-3">
          <Button onClick={() => setBasicModal(true)}>
            Open Basic Modal
          </Button>
        </div>

        <Modal 
          isOpen={basicModal} 
          onClose={(reason: ModalCloseReason) => {
            setBasicModal(false)
            handleModalClose(reason)
          }}
        >
          <ModalHeader>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Basic Modal</h3>
          </ModalHeader>
          <ModalBody>
            <p className="text-gray-700 dark:text-gray-300">This is a basic modal example with header, body, and footer.</p>
            <p className="mt-2 text-gray-700 dark:text-gray-300">The modal can be closed by clicking the backdrop, pressing Escape, or clicking the close button.</p>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={() => setBasicModal(false)}>
              Cancel
            </Button>
            <Button onClick={() => setBasicModal(false)}>
              OK
            </Button>
          </ModalFooter>
        </Modal>
      </section>

      {/* Size Variants */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Size Variants</h2>
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => setSizesModal(prev => ({ ...prev, sm: true }))}>
            Small Modal
          </Button>
          <Button onClick={() => setSizesModal(prev => ({ ...prev, md: true }))}>
            Medium Modal
          </Button>
          <Button onClick={() => setSizesModal(prev => ({ ...prev, lg: true }))}>
            Large Modal
          </Button>
          <Button onClick={() => setSizesModal(prev => ({ ...prev, xl: true }))}>
            Extra Large Modal
          </Button>
          <Button onClick={() => setSizesModal(prev => ({ ...prev, full: true }))}>
            Full Width Modal
          </Button>
        </div>

        {Object.entries(sizesModal).map(([size, isOpen]) => (
          <Modal 
            key={size}
            isOpen={isOpen} 
            onClose={handleSizeModalClose(size as keyof typeof sizesModal)}
            size={size as any}
          >
            <ModalHeader>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{size.charAt(0).toUpperCase() + size.slice(1)} Modal</h3>
            </ModalHeader>
            <ModalBody>
              <p className="text-gray-700 dark:text-gray-300">This is a {size} sized modal. The width is controlled by the size prop.</p>
            </ModalBody>
            <ModalFooter>
              <Button onClick={() => setSizesModal(prev => ({ ...prev, [size]: false }))}>
                Close
              </Button>
            </ModalFooter>
          </Modal>
        ))}
      </section>

      {/* Backdrop Behavior */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Backdrop Behavior</h2>
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => setBehaviorModal(prev => ({ ...prev, backdrop: true }))}>
            Clickable Backdrop
          </Button>
          <Button onClick={() => setBehaviorModal(prev => ({ ...prev, static: true }))}>
            Static Backdrop
          </Button>
          <Button onClick={() => setBehaviorModal(prev => ({ ...prev, noKeyboard: true }))}>
            No Keyboard Close
          </Button>
        </div>

        <Modal 
          isOpen={behaviorModal.backdrop} 
          onClose={handleBehaviorModalClose('backdrop')}
          backdrop={true}
        >
          <ModalHeader>
            <h3 className="text-lg font-medium">Clickable Backdrop</h3>
          </ModalHeader>
          <ModalBody>
            <p>Click the backdrop (dark area) to close this modal.</p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setBehaviorModal(prev => ({ ...prev, backdrop: false }))}>
              Close
            </Button>
          </ModalFooter>
        </Modal>

        <Modal 
          isOpen={behaviorModal.static} 
          onClose={handleBehaviorModalClose('static')}
          backdrop="static"
        >
          <ModalHeader>
            <h3 className="text-lg font-medium">Static Backdrop</h3>
          </ModalHeader>
          <ModalBody>
            <p>Clicking the backdrop won't close this modal. Use the close button or Escape key.</p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setBehaviorModal(prev => ({ ...prev, static: false }))}>
              Close
            </Button>
          </ModalFooter>
        </Modal>

        <Modal 
          isOpen={behaviorModal.noKeyboard} 
          onClose={handleBehaviorModalClose('noKeyboard')}
          keyboard={false}
        >
          <ModalHeader>
            <h3 className="text-lg font-medium">No Keyboard Close</h3>
          </ModalHeader>
          <ModalBody>
            <p>The Escape key won't close this modal. Use the close button or click the backdrop.</p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setBehaviorModal(prev => ({ ...prev, noKeyboard: false }))}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </section>

      {/* Position Variants */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Position Variants</h2>
        <div className="flex gap-3">
          <Button onClick={() => setPositionModal(prev => ({ ...prev, centered: true }))}>
            Centered Modal
          </Button>
          <Button onClick={() => setPositionModal(prev => ({ ...prev, top: true }))}>
            Top Positioned Modal
          </Button>
        </div>

        <Modal 
          isOpen={positionModal.centered} 
          onClose={handlePositionModalClose('centered')}
          centered={true}
        >
          <ModalHeader>
            <h3 className="text-lg font-medium">Centered Modal</h3>
          </ModalHeader>
          <ModalBody>
            <p>This modal is vertically centered in the viewport.</p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setPositionModal(prev => ({ ...prev, centered: false }))}>
              Close
            </Button>
          </ModalFooter>
        </Modal>

        <Modal 
          isOpen={positionModal.top} 
          onClose={handlePositionModalClose('top')}
          centered={false}
        >
          <ModalHeader>
            <h3 className="text-lg font-medium">Top Positioned Modal</h3>
          </ModalHeader>
          <ModalBody>
            <p>This modal is positioned at the top of the viewport with some padding.</p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setPositionModal(prev => ({ ...prev, top: false }))}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </section>

      {/* Scrollable Content */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Scrollable Content</h2>
        <div className="flex gap-3">
          <Button onClick={() => setScrollableModal(true)}>
            Open Scrollable Modal
          </Button>
        </div>

        <Modal 
          isOpen={scrollableModal} 
          onClose={(reason: ModalCloseReason) => {
            setScrollableModal(false)
            handleModalClose(reason)
          }}
          scrollable={true}
          size="lg"
        >
          <ModalHeader>
            <h3 className="text-lg font-medium">Scrollable Modal</h3>
          </ModalHeader>
          <ModalBody>
            {scrollableContent}
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setScrollableModal(false)}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </section>

      {/* Form Modal */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Form Modal</h2>
        <div className="flex gap-3">
          <Button onClick={() => setFormModal(true)}>
            Open Form Modal
          </Button>
        </div>

        <Modal 
          isOpen={formModal} 
          onClose={(reason: ModalCloseReason) => {
            setFormModal(false)
            handleModalClose(reason)
          }}
          size="lg"
        >
          <form onSubmit={handleFormSubmit}>
            <ModalHeader>
              <h3 className="text-lg font-medium">Contact Form</h3>
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e: any) => setFormData(prev => ({ ...prev, name: (e.target as HTMLInputElement).value }))}
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e: any) => setFormData(prev => ({ ...prev, email: (e.target as HTMLInputElement).value }))}
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e: any) => setFormData(prev => ({ ...prev, message: (e.target as HTMLTextAreaElement).value }))}
                    placeholder="Enter your message"
                    rows={4}
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button 
                variant="ghost" 
                type="button"
                onClick={() => setFormModal(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                Send Message
              </Button>
            </ModalFooter>
          </form>
        </Modal>
      </section>

      {/* Confirmation Modal */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Confirmation Modal</h2>
        <div className="flex gap-3">
          <Button onClick={() => setConfirmModal(true)} variant="destructive">
            Delete Item
          </Button>
        </div>

        <Modal 
          isOpen={confirmModal} 
          onClose={(reason: ModalCloseReason) => {
            setConfirmModal(false)
            handleModalClose(reason)
          }}
          size="sm"
        >
          <ModalHeader>
            <h3 className="text-lg font-medium text-red-600">Confirm Deletion</h3>
          </ModalHeader>
          <ModalBody>
            <p>Are you sure you want to delete this item? This action cannot be undone.</p>
          </ModalBody>
          <ModalFooter>
            <Button 
              variant="ghost" 
              onClick={() => setConfirmModal(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleConfirm}
            >
              Delete
            </Button>
          </ModalFooter>
        </Modal>
      </section>

      {/* Stacked Modals */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Stacked Modals</h2>
        <div className="flex gap-3">
          <Button onClick={() => setStackedModal(prev => ({ ...prev, first: true }))}>
            Open Stacked Modals
          </Button>
        </div>

        <Modal 
          isOpen={stackedModal.first} 
          onClose={(reason: ModalCloseReason) => {
            setStackedModal(prev => ({ ...prev, first: false }))
            handleModalClose(reason)
          }}
        >
          <ModalHeader>
            <h3 className="text-lg font-medium">First Modal</h3>
          </ModalHeader>
          <ModalBody>
            <p>This is the first modal. You can open another modal on top of this one.</p>
          </ModalBody>
          <ModalFooter>
            <Button 
              variant="ghost" 
              onClick={() => setStackedModal(prev => ({ ...prev, first: false }))}
            >
              Close
            </Button>
            <Button onClick={() => setStackedModal(prev => ({ ...prev, second: true }))}>
              Open Second Modal
            </Button>
          </ModalFooter>
        </Modal>

        <Modal 
          isOpen={stackedModal.second} 
          onClose={(reason: ModalCloseReason) => {
            setStackedModal(prev => ({ ...prev, second: false }))
            handleModalClose(reason)
          }}
        >
          <ModalHeader>
            <h3 className="text-lg font-medium">Second Modal</h3>
          </ModalHeader>
          <ModalBody>
            <p>This is the second modal, stacked on top of the first one.</p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setStackedModal(prev => ({ ...prev, second: false }))}>
              Close This Modal
            </Button>
          </ModalFooter>
        </Modal>
      </section>

      {/* Accessibility */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Accessibility Features</h2>
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-2">
          <h3 className="font-medium text-gray-900 dark:text-gray-100">Built-in Accessibility:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
            <li>Focus trap - Tab navigation stays within modal</li>
            <li>Focus restoration - Returns focus to trigger element on close</li>
            <li>Escape key support - Press Escape to close</li>
            <li>ARIA attributes - Proper dialog role and labeling</li>
            <li>Body scroll lock - Prevents background scrolling</li>
            <li>Backdrop click handling - Optional click-to-close</li>
          </ul>
        </div>
      </section>
    </div>
  )
}
